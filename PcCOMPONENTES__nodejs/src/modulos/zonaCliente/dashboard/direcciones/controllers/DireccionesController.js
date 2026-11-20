const ResponseApi = require("../../../../_shared_/models/ResponseAPI.js");
const Direccion = require("../models/Direccion.js");
class DireccionesController {
  constructor(dbService) {
    this.dbService = dbService;
  }

  operarDireccion() {
    return async (req, res) => {
      const { operacion, direccion } = req.body;
      const direccionLimpia = new Direccion(direccion);
      console.log("[DIRECCIONES] me ha llegado:", operacion, direccionLimpia);
      res
        .status(200)
        .json(
          new ResponseApi(
            0,
            "Comanda recibida",
            direccionLimpia.toPrimitives(),
          ).toPrimitives(),
        );
    };
  }
}

module.exports = DireccionesController;
