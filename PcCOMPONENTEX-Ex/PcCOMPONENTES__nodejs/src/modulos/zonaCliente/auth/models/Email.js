const { ValidationError } = require('../../../_shared_/models/errors.js');

module.exports = class Email {
    #email='';
    get value(){ return this.#email; }
    set value(value){
        if(typeof value !== 'string' || value.trim().length === 0){
            throw new ValidationError('Email es requerido');
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
            throw new ValidationError('Formato del email no válido');
        }
        this.#email = String(value).trim().toLowerCase()    ;
    }
    constructor(value){
        this.value=value;
        //String(value ?? '').trim().toLowerCase() ;
        Object.freeze(this); // Inmutable
    }
}