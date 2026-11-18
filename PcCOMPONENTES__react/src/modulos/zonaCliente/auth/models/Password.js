import { ValidationError } from "../../../../shared/domain/errors.js";

export default class Password {
    #password='';
    get value(){ return this.#password; }
    set value(value){
        if(typeof value !== 'string' || value.trim().length === 0){
            throw new ValidationError('Password es requerido');
        }
        if(value.length < 8 || value.length > 20){
            throw new ValidationError('Password debe tener entre 8 y 20 caracteres');
        }
        if(!/[A-Z]/.test(value)){
            throw new ValidationError('Password debe contener al menos una letra mayúscula');
        }
        if(!/[a-z]/.test(value)){
            throw new ValidationError('Password debe contener al menos una letra minúscula');
        }
        if(!/[0-9]/.test(value)){
            throw new ValidationError('Password debe contener al menos un número');
        }
        if(!/[!@#$%^&*(),.?":{}|<>]/.test(value)){
            throw new ValidationError('Password debe contener al menos un carácter especial');
        }
        this.#password = String(value);
    }
    constructor(value){
        this.value=value;
        Object.freeze(this); // Inmutable
    }
}