const ResponseAPI = require("../../_shared_/models/ResponseAPI");

class GeoApiController {
    constructor(dbService){
        this.dbService=dbService;
    }
    listaProvincias(){
        return async (req,res)=>{
            try{
                const provincias=await this.dbService.selectMany('provincias');
                const response=new ResponseAPI(0,'Lista de provincias obtenida correctamente',{provincias});
                res.status(200).json(response.toPrimitives());
            }
            catch(error){
                console.log(`Error en GeoApiController.listaProvincias: ${error.message}`);
                const response=new ResponseAPI(1,`Error al obtener la lista de provincias: ${error.message}`,null);
                res.status(200).json(response.toPrimitives());
            }
        };
    }

    listaPoblaciones(){
        return async (req,res)=>{
            const { codProv }=req.query;
            try{
                const provincia=await this.dbService.selectOne('provincias',{CPRO: codProv});
                if(!provincia) throw new Error(`No existe una provincia con el código: ${codProv}`);

                const poblaciones=await this.dbService.selectMany('poblaciones',{CPRO: codProv});
                const response=new ResponseAPI(0,`Lista de poblaciones de la provincia ${provincia.PRO} obtenida correctamente`,{poblaciones});

                res.status(200).json(response.toPrimitives());
            }
            catch(error){
                console.log(`Error en GeoApiController.listaPoblaciones: ${error.message}`);
                const response=new ResponseAPI(1,`Error al obtener la lista de poblaciones: ${error.message}`,null);
                res.status(200).json(response.toPrimitives());
            }
        };
    }
}
module.exports=GeoApiController;