import Cuenta from "../../auth/domain/Cuenta.js";
import Texto from "../../../../shared/domain/Texto.js";
import Id from "../../../../shared/domain/Id.js";


export default class Cliente {
    constructor( datosCliente ){
        const { nombre, apellidos, cuenta, _id, direcciones, pedidos, opiniones, favoritos } = datosCliente;
        this._id= _id || Id.generateObjectId().id;
        this.nombre = String(nombre || '').trim(); //new Texto(nombre).value;
        this.apellidos = String(apellidos || '').trim(); //new Texto(apellidos).value;
        this.cuenta = new Cuenta(cuenta);//({ email, password, fechaCreacion: new Date() });
        this.direcciones=direcciones || [];
        this.pedidos=pedidos || [];
        this.opiniones=opiniones || [];
        this.favoritos=favoritos || [];
    }
    
    static fromPrimitives(datosCliente){
        return new Cliente(datosCliente);
    }

    toPrimitives(){
        return {
            _id: this._id,
            nombre: this.nombre,
            apellidos: this.apellidos,
            cuenta: this.cuenta.toPrimitives(),
            direcciones: this.direcciones,
            pedidos: this.pedidos,
            opiniones: this.opiniones,
            favoritos: this.favoritos
        };
    }
}