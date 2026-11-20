const PasswordHasherService = require("./services/PasswordHasherService.js");
const JwtTokenService = require("./services/JwtTokenService.js");
const GoogleoAuthService = require("./services/GoogleoAuthService.js");

const ResponseApi = require("../../../_shared_/models/ResponseAPI.js");
const Cliente = require("../../_shared_/models/Cliente.js");

class AuthController {
  constructor(
    dbService,
    { jwtSecret, jwtExpiresIn, clientId, clientSecret, redirectUri },
  ) {
    this.dbService = dbService;
    this.passwordHasherService = new PasswordHasherService();
    this.jwtTokenService = new JwtTokenService({ jwtSecret, jwtExpiresIn });
    this.googleoAuthService = new GoogleoAuthService({
      clientId,
      clientSecret,
      redirectUri,
    });
  }

  login() {
    return async (req, res) => {
      const { email, password } = req.body;
      console.log("[PASO 3] Node · AuthController: me ha llegado", req.body);
      console.log(
        `AuthController.login - email: ${email}, password: ${password}`,
      );

      try {
        const cliente = await this.dbService.selectOne("clientes", {
          "cuenta.email": email,
        });
        console.log(
          "[PASO 4] Node · Mongo me devuelve el cliente:",
          cliente?.nombre,
        );
        if (!cliente)
          throw new Error("Cliente no encontrado con el email proporcionado");
        if (!cliente.cuenta.activada)
          throw new Error("La cuenta del cliente no está activada");

        const isMatch = await this.passwordHasherService.verifyPassword(
          password,
          cliente.cuenta.password,
        );
        if (!isMatch) throw new Error("Contraseña incorrecta");

        const tokenPayload = { _id: cliente._id, email: cliente.cuenta.email };
        const token = this.jwtTokenService.generateToken(tokenPayload);

        console.log(
          `AuthController.login - datos a devolver: ${JSON.stringify({ token, cliente })}`,
        );
        const response = new ResponseApi(0, "Login exitoso", {
          token,
          cliente,
        });
        console.log(
          `AuthController.login - response.toPrimitives(): ${JSON.stringify(response.toPrimitives())}`,
        );

        res.status(200).json(response.toPrimitives());
      } catch (error) {
        console.log(`Error en AuthController.login: ${error.message}`);
        res
          .status(200)
          .json(
            new ResponseApi(
              1,
              `Error en login: ${error.message}`,
              null,
            ).toPrimitives(),
          );
      }
    };
  }

  registro() {
    return async (req, res) => {
      const { nombre, email, password } = req.body;
      try {
        const existingCliente = await this.dbService.selectOne("clientes", {
          email,
        });
        if (existingCliente)
          throw new Error("Ya existe un cliente con este email");

        const hashedPassword =
          await this.passwordHasherService.hashPassword(password);
        const datosCliente = new Cliente({
          nombre,
          cuenta: { email, password: hashedPassword, activada: false },
        });

        const newCliente = await this.dbService.insertOne(
          "clientes",
          datosCliente.toPrimitives(),
        );

        res.status(200).json(
          new ResponseApi(0, "Registro exitoso", {
            cliente: newCliente,
          }).toPrimitives(),
        );
      } catch (error) {
        console.log(`Error en AuthController.registro: ${error.message}`);
        res
          .status(200)
          .json(
            new ResponseApi(
              1,
              `Error en registro: ${error.message}`,
              null,
            ).toPrimitives(),
          );
      }
    };
  }

  loginGoogle() {
    return async (req, res) => {
      try {
        const url = await this.googleoAuthService.getAuthUrl();
        res
          .status(200)
          .json(
            new ResponseApi(0, "URL de login con Google obtenida", { url }),
          );
      } catch (error) {
        console.log(`Error en AuthController.loginGoogle: ${error.message}`);
        res
          .status(200)
          .json(
            new ResponseApi(
              1,
              `Error al obtener la URL de login con Google: ${error.message}`,
              null,
            ).toPrimitives(),
          );
      }
    };
  }

  loginGoogleCallback() {
    return async (req, res) => {
      try {
        const { code } = req.query;

        const {
          email,
          telefonoContacto,
          apellidos,
          nombre,
          direccion,
          genero,
        } = await this.googleoAuthService.getUserInfo(code);

        let cliente = await this.dbService.selectOne("clientes", {
          "cuenta.email": email,
        });
        if (!cliente) {
          const datosCliente = new Cliente({
            nombre,
            apellidos,
            cuenta: {
              email,
              password: null,
              activada: true,
              telefono: telefonoContacto,
            },
            direcciones: direccion !== "No disponible" ? [direccion] : [],
            opiniones: [],
            favoritos: [],
            pedidos: [],
          });
          cliente = await this.dbService.insertOne(
            "clientes",
            datosCliente.toPrimitives(),
          );
        }
        const token = this.jwtTokenService.generateToken({
          _id: cliente._id,
          email: cliente.cuenta.email,
        });

        res.status(200).send(`
                    <html>
                        <body>
                            <script>
                                window.opener.postMessage({ codigo:0, mensaje:'Login con Google correcto', datos: ${JSON.stringify({ token, cliente })} }, '*');
                                window.close();
                            </script>
                        </body>
                    </html>
                `);
      } catch (error) {
        console.log(
          `Error en AuthController.loginGoogleCallback: ${error.message}`,
        );
        res.status(200).send(`
                        <html>
                            <body>
                                <script>
                                    window.opener.postMessage({ codigo:1, mensaje:'Error en login con Google' }, '*');
                                    window.close();
                                </script>
                            </body>
                        </html>
                    `);
      }
    };
  }
  verificarToken() {
    // ← NUEVO
    return (req, res, next) => {
      const cabecera = req.headers.authorization || ""; // "Bearer eyJhbGci..."
      const token = cabecera.split(" ")[1]; // parte el texto por el espacio y coge lo de detrás
      const payload = toke ? this.jwtTokenService.verifyToken(token) : null;

      if (!payload) {
        // no hay token, o es falso o caducado
        return res
          .status(401)
          .json(
            new ResponseApi(
              1,
              "Operación no permitida: inicia sesión de nuevo",
              null,
            ).toPrimitives(),
          );
      }

      req.idCliente = payload._id; // apunta en la comanda quién es
      next(); // deja pasar al cocinero
    };
  }
}

module.exports = AuthController;
