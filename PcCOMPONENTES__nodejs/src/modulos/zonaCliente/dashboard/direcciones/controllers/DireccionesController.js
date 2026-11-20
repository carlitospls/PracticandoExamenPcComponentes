const ResponseApi = require("../../../../_shared_/models/ResponseAPI.js");
const Direccion = require("../models/Direccion.js");
const { ObjectId } = require("mongodb");
class DireccionesController {
  constructor(dbService) {
    this.dbService = dbService;
  }

  operarDireccion() {
    return async (req, res) => {
      const { operacion, direccion } = req.body;
      const direccionLimpia = new Direccion(direccion);
      const idCliente = "6aca83402bf2cd4c6e9e1669"; //Temporal, se sustituirá por el token
      if (operacion === "alta") {
        await this.dbService.updateOne(
          "clientes",
          { _id: new ObjectId(idCliente) },
          { $push: { direcciones: direccionLimpia.toPrimitives() } },
        );
      }

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
