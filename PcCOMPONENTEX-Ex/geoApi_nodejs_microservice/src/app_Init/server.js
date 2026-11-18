require('dotenv').config();

const config={
    port: process.env.PORT || 3003,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
    mongoUri: process.env.MONGODB_URL,
    mongoDbName: process.env.MONGODB_DBNAME,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
}

const MongodbService=require('../modulos/_shared_/controllers/mongodb/MongodbService.js');
const mongoDbService=new MongodbService({uri: config.mongoUri, dbName: config.mongoDbName});

const express=require('express');
const configPipeline=require('./config_pipeline_express/configPipeline');

const serverMicroService=express();
configPipeline(serverMicroService, config, mongoDbService);

serverMicroService.listen(
    config.port, 
    (err)=> {
        if (err) {
            console.error('❌❌=== Error al iniciar el microservicio GEOAPI:', err);
        } else {
            console.log('✅✅=== servidor donde corre microservicio GEOAPI listo y escuchando peticiones en puerto 3003....');
        }
    });