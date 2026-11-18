const ResponseApi = require("../../../../_shared_/models/ResponseAPI.js");

class DireccionesController {
  constructor(dbService) {
    this.dbService = dbService;
  }

  operarDireccion() {
    return async (req, res) => {
      console.log("[DIRECCIONES] me ha llegado:", req.body);
      res
        .status(200)
        .json(new ResponseApi(0, "Comanda recibida", req.body).toPrimitives());
    };
  }
}

module.exports = DireccionesController;
