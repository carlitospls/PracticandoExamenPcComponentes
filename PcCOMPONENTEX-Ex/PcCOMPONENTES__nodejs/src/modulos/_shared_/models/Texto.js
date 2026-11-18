const { ValidationError }=require("./errors.js");

module.exports = class Texto {
    #texto='';
    get value(){ return this.#texto; }
    set value(value){
        if(typeof value !== 'string' || value.trim().length === 0){
            throw new ValidationError('Texto es requerido');
        }
        if(value.trim().length < this.minLength){
            throw new ValidationError(`Texto debe tener al menos ${this.minLength} caracteres`);
        }
        if(value.trim().length > this.maxLength){
            throw new ValidationError(`Texto debe tener máximo ${this.maxLength} caracteres`);
        }
        this.#texto = String(value).trim();
    }
    constructor(value, minLength=1, maxLength=255){
        this.value=value;
        this.minLength=minLength;
        this.maxLength=maxLength;
        Object.freeze(this); // Inmutable
    }
}