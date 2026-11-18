const { ObjectId } = require('mongodb');
const ResponseApi=require('../../../_shared_/models/ResponseAPI.js');

module.exports = class ProductosController {
    constructor(dbService) {
        this.dbService = dbService;
    }

    getProductoById(){
        return async (req, res) => {
            try {
                const productoId = req.params.id;
                const producto = await this.dbService.selectOne('productos', { _id: new ObjectId(productoId) });
                if (!producto) throw new Error('Producto no encontrado');
                res.status(200).json(new ResponseApi(0, 'Producto obtenido con éxito', {producto}).toPrimitives());
            } catch (error) {
                console.log(`Error en ProductosController.getProductoById: ${error.message}`);
                res.status(200).json(new ResponseApi(1, `Error al obtener el producto: ${error.message}`, null).toPrimitives());
            }
        };
    }

    getProductosByCategoria(){
        return async (req, res) => {
            try {
                const pathCat = req.query.pathCat;
                const productos = await this.dbService.selectMany('productos', { pathCategoria: pathCat });
                res.status(200).json(new ResponseApi(0, 'Productos obtenidos con éxito', {productos}).toPrimitives());
            } catch (error) {
                console.log(`Error en ProductosController.getProductosByCategoria: ${error.message}`);
                res.status(200).json(new ResponseApi(1, `Error al obtener los productos: ${error.message}`, null).toPrimitives());
            }
        };
    }
}