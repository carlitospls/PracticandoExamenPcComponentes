const express=require('express');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const cors=require('cors');

const createGeoApiRouter=require('../../modulos/geoApi/controllers/geoaApiRouter.js');

module.exports=function(serverExpress,config,mongoDbService){
        serverExpress.use( cookieParser() );

        serverExpress.use( express.json()) ; 
        serverExpress.use( express.urlencoded({extended:true}) );        

        serverExpress.use( cors() );

        serverExpress.use('/api/GeoApi', createGeoApiRouter(mongoDbService,config) );

}