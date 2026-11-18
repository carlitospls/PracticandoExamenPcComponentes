import  Email  from "./Email.js";
import  Password  from "./Password.js";
import Fecha  from "../../../_shared_/models/Fechas.js  ";

export default class Cuenta {
    constructor({ email, password, fechaCreacion, imagenAvatar='', telefono='', tipoCuenta='particular', activada=false }) {
        this.email = new Email(email).value;
        this.password = password; //new Password(password).value; <--- esta el hash
        this.fechaCreacion = fechaCreacion || Date.now();  //new Fecha(fechaCreacion).value : new Fecha().value;
        this.activada=activada;
        this.imagenAvatar = String(imagenAvatar ?? '').trim();
        this.telefono = String(telefono ?? '').trim();
        this.tipoCuenta = String(tipoCuenta ?? 'particular').trim().toLowerCase();
    }
    //hay q diferenciar entre la devolucion de la cuenta con passwrod o sin ella hasehada
    static fromPrimitives({ email, password, fechaCreacion, imagenAvatar, telefono, tipoCuenta, activada }) {
        return new Cuenta({ email, password, fechaCreacion, imagenAvatar, telefono, tipoCuenta, activada });
    }
    toPrimitives() {
        return {
            email: this.email,
            password: this.password,
            fechaCreacion: this.fechaCreacion,
            imagenAvatar: this.imagenAvatar,
            telefono: this.telefono,
            tipoCuenta: this.tipoCuenta,
            activada: this.activada
        };
    }
}