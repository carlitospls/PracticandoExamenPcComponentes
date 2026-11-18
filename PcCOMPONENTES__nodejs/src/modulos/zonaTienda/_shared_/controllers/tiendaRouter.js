const express = require('express');
const CategoriasController = require('../../categorias/controllers/CategoriasController.js');
const ProductosController = require('../../productos/controllers/ProductosController.js');

module.exports = function createRouterTienda(dbService,config) {
    const router = express.Router();
    const categoriasController = new CategoriasController(dbService);
    const productosController = new ProductosController(dbService);

    router.get('/Categorias', categoriasController.getCategorias() );
    router.get('/Producto/:id', productosController.getProductoById() );
    router.get('/Productos', productosController.getProductosByCategoria() );

    return router;
}
