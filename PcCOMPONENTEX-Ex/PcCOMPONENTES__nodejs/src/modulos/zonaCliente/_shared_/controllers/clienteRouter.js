const express = require('express');
const AuthContoller  = require('../../auth/controllers/AuthController.js');

module.exports = function createRouterCliente(dbService,config) {
    const router = express.Router();
    const authController = new AuthContoller( dbService,{ 
                                                            jwtSecret: config.jwtSecret, 
                                                            jwtExpiresIn: config.jwtExpiresIn,
                                                            clientId: config.googleClientId,
                                                            clientSecret: config.googleClientSecret,
                                                            redirectUri: config.googleRedirectUri
                                                        } );
    
    router.post('/Login', authController.login() );
    router.post('/Registro', authController.registro() );
    router.get('/LoginGoogle', authController.loginGoogle() );
    router.get('/LoginGoogleCallback', authController.loginGoogleCallback() );

    return router;
}

