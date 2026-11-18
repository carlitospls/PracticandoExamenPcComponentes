 const ResponseApi=require('../../../_shared_/models/ResponseAPI.js');

module.exports = class CategoriasController {
    constructor(dbService) {
        this.dbService = dbService;
    }
    getCategorias() {
        return async (req, res) => {
            try {
                const pathCat = req.query.pathCat || 'principales';
                const pattern=new RegExp(pathCat=='principales' ? '^\\d+$' : `^${pathCat}-\\d+$`); 

                const categorias = await this.dbService.selectMany('categorias', { pathCat: { $regex: pattern } }, { _id: 1, nombre: 1, pathCat: 1, icon: 1 });
                res.status(200).json(new ResponseApi(0, 'Categorías obtenidas con éxito', {categorias}).toPrimitives());
            } catch (error) {
                console.log(`Error en CategoriasController.getCategorias: ${error.message}`);
                res.status(500).json( new ResponseApi(1, `Error al obtener las categorías: ${error.message}`, null).toPrimitives());
            }
        };
    }
}