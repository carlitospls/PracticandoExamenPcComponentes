const express = require("express");
const AuthContoller = require("../../auth/controllers/AuthController.js");
const DireccionesController = require("../../dashboard/direcciones/controllers/DireccionesController.js");

module.exports = function createRouterCliente(dbService, config) {
  const router = express.Router();
  const authController = new AuthContoller(dbService, {
    jwtSecret: config.jwtSecret,
    jwtExpiresIn: config.jwtExpiresIn,
    clientId: config.googleClientId,
    clientSecret: config.googleClientSecret,
    redirectUri: config.googleRedirectUri,
  });
  const direccionesController = new DireccionesController(dbService);

  router.post("/Login", authController.login());
  router.post("/Registro", authController.registro());
  router.get("/LoginGoogle", authController.loginGoogle());
  router.get("/LoginGoogleCallback", authController.loginGoogleCallback());
  router.post("/Direcciones", direccionesController.operarDireccion());

  return router;
};
