const express=require('express');
const AuthController=require('../../auth/controllers/AuthController.js');
const GeoApiController=require('./geoApiController.js');

module.exports=function createGeoApiRouter(dbService,config){
    const router=express.Router();
    const geoApiCtrl=new GeoApiController(dbService);
    
    const { jwtSecret, jwtExpiresIn, clientId, clientSecret }=config;
    const authCtrl=new AuthController(dbService,{ jwtSecret, jwtExpiresIn, clientId, clientSecret });

    router.post('/GetAccessToken', authCtrl.getAccessToken());
    router.get('/Provincias', authCtrl.verifyAccessToken(), geoApiCtrl.listaProvincias());
    router.get('/Poblaciones', authCtrl.verifyAccessToken(), geoApiCtrl.listaPoblaciones());

    return router;
}