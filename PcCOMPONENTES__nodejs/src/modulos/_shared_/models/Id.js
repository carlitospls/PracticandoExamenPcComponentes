const crypto =require( "node:crypto");
const { ObjectId } = require("mongodb");
const { ValidationError }=require("./errors.js");

module.exports = class Id {
    #id='';
    get id(){ return this.#id; }

    constructor(value){
        if(typeof value !== 'string' || value.trim().length === 0){
            throw new ValidationError('Id es requerido');
        }
        this.#id = value;
    }
    
    static generateRandomUUID(){
        const id = crypto.randomUUID();
        return new Id(id);
    }

    static generateObjectId(tipo='random'){
        /*
        campo _id----> https://www.mongodb.com/es/docs/manual/core/document/#the-_id-field
        ObjectId ----> https://www.mongodb.com/es/docs/manual/reference/bson-types/#std-label-objectid

        Según la documentación oficial de especificación de BSON, un ObjectId se compone de:
        1. 4 bytes para representar las marcas de tiempo (timestamp) en segundos.
        2. 5 bytes de valor aleatorio único por proceso.
        3. 3 bytes para un contador incremental, que se incrementa con cada nuevo ObjectId generado por el mismo proceso.

        Esto da un total de 12 bytes (96 bits) para un ObjectId. 
        Cuando se representa en formato hexadecimal, cada byte se representa con dos caracteres hexadecimales, 
        lo que da como resultado una cadena de 24 caracteres hexadecimales.
        
        1. Timestamp (4 bytes): Representa la fecha y hora en segundos desde la época Unix (1 de enero de 1970). Esto permite que los ObjectId sean únicos en el tiempo y también proporciona información sobre cuándo se creó el documento.
        
            const timestamp = Math.floor(Date.now() / 1000); // Obtener el timestamp en segundos
            const timeBuffer = Buffer.alloc(4);
            timeBuffer.writeUInt32BE(timestamp, 0); // Escribir el timestamp en el buffer

        2. Random Value (5 bytes): Es un valor aleatorio generado por el proceso que crea el ObjectId. Esto ayuda a garantizar la unicidad entre diferentes procesos que generan ObjectId al mismo tiempo.
            
            const randomValue = crypto.randomBytes(5); // Generar 5 bytes aleatorios

        3. Counter (3 bytes): Es un contador incremental que se incrementa con cada nuevo ObjectId generado por el mismo proceso. Esto asegura que incluso si dos ObjectId se generan en el mismo segundo y por el mismo proceso, serán únicos debido al contador.
            maximo valor 0xFFFFFF (16777215 en decimal).
        
            let counter = crypto.randomBytes(3).readUIntBE(0, 3); // Generar 3 bytes aleatorios para el contador
            counter = (counter + 1) % 0xFFFFFF; // Incrementar el contador para el próximo ObjectId;Asegurarse de que el contador no exceda el valor máximo        
            const counterBuffer = Buffer.alloc(3);
            counterBuffer.writeUIntBE(counter, 0, 3); // Escribir el contador en el buffer

        Finalmente, se concatenan estos tres componentes (timestamp, random value y counter) para formar un ObjectId completo de 12 bytes.
        
            const objectIdBuffer = Buffer.concat([timeBuffer, randomValue, counterBuffer]);
            const objectIdHex = objectIdBuffer.toString('hex'); // Convertir a formato hexadecimal de 24 caracteres
            return new Id(objectIdHex);
        */


        //la forma rapida si no necesitas ordenar cronologicamente los documentos mediante el _id
        // y solo requieres un id q "parezca" un ObjectId, es generar un string hexadecimal de 12 bytes (24 caracteres hexadecimales)
        return tipo==='random' ? new Id(crypto.randomBytes(12).toString('hex')) : new ObjectId().toString();
    }


}