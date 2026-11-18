const express=require('express');
const cookiesParser=require('cookie-parser'); //modulo para gestionar cookies en express
const cors=require('cors');

const createRouterCliente=require('../../modulos/zonaCliente/_shared_/controllers/clienteRouter.js');
const createRouterTienda=require('../../modulos/zonaTienda/_shared_/controllers/tiendaRouter.js');

module.exports = function configPipeLine(server, config, mongoDbService) {
    console.log('Configurando pipeline de express...');
    console.log('==== midlewares globales para todos los path ====');
    server.use(express.json());
    server.use(express.urlencoded({extended:true}));     
    server.use(cookiesParser());
    server.use(cors({
        exposedHeaders: ['x-access-token'],
        allowedHeaders: ['Content-Type','Authorization','x-refresh-token'],
        credentials: true
    }));

    console.log('==== midlewares especificos para un path ========');
    server.use('/api/Cliente', createRouterCliente(mongoDbService,config));
    server.use('/api/Tienda', createRouterTienda(mongoDbService,config));
}