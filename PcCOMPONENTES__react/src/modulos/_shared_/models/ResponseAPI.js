export default class ResponseAPI {
    constructor(codigo, mensaje, datos = null) {
        this.codigo = codigo;
        this.mensaje = mensaje;
        this.datos = datos;
    }
    static success(mensaje, datos = null) {
        return new ResponseAPI(0, mensaje, datos);
    }
    static error(codigo=1, mensaje, datos = null) {
        return new ResponseAPI(codigo, mensaje, datos);
    }
    
    static fromPrimitives(json) {
        return new ResponseAPI({
            codigo: json.codigo,
            mensaje: json.mensaje,
            datos: json.datos
        });
    }

    toPrimitives() {
        return {
            codigo: this.codigo,
            mensaje: this.mensaje,
            datos: this.datos
        };
    }

}