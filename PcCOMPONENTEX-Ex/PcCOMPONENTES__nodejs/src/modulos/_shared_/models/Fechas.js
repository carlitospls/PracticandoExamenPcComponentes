const { ValidationError }=require("./errors.js");

module.exports= class Fecha {

    #fecha;
    get value(){ return this.#fecha; }
    set value(value){ //<---- no debes preguntar q solo el tipo sea string, puede ser timestamp o date, lo q importa es q sea un valor q pueda ser convertido a date...esta mal el if
        // if(typeof value !== 'string' && !(value instanceof Date)){
        //     throw new ValidationError('Fecha debe ser una instancia de Date');
        // }
        const _fecha = new Date(value);
        if(isNaN(_fecha.getTime())){
            throw new ValidationError('Fecha inválida');
        }
        this.#fecha = new Date(value).valueOf();
    }
    constructor(value){
        this.value = value;
        Object.freeze(this); // Inmutable
    }
}