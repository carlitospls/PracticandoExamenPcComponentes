const { MongoClient, ObjectId } = require('mongodb');
const DbService = require('../DbService.js');

class MongodbService extends DbService 
{
    constructor({ uri, dbName }) {
        super();
        this.uri = uri;
        this.dbName = dbName;
        this.client = new MongoClient(this.uri);
    }

    async selectOne(tableOrCollection, query, projection) {
        try {
            await this.client.connect();
            const db = this.client.db(this.dbName);
            const collection = db.collection(tableOrCollection);
            return await collection.findOne(query, { projection });
        } catch (error) {
            throw new Error(`Error en MongodbService.selectOne: ${error.message}`);
        }
    }
    
    async selectMany(tableOrCollection, query, projection) {
        try {
            await this.client.connect();
            const db = this.client.db(this.dbName);
            const collection = db.collection(tableOrCollection);
            return await collection.find(query, { projection }).toArray();
        } catch (error) {
            throw new Error(`Error en MongodbService.selectMany: ${error.message}`);
        }
    }

    async insertOne(tableOrCollection, data) {
        try {
            await this.client.connect();
            const db = this.client.db(this.dbName);
            const collection = db.collection(tableOrCollection);
            const result = await collection.insertOne(data);
            
            if ( !result.acknowledged || !result.insertedId )  throw new Error('Fallo al insertar el documento en la colección');
            
            const clienteInsertado = await collection.findOne({ _id: result.insertedId });
            if (!clienteInsertado) throw new Error('No se pudo recuperar el documento insertado');
            return clienteInsertado;
            
        } catch (error) {
            throw new Error(`Error en MongodbService.insertOne: ${error.message}`);
        } 
    }

    async updateOne(tableOrCollection, query, update) {
        try {
            await this.client.connect();
            const db = this.client.db(this.dbName);
            const collection = db.collection(tableOrCollection);
            const result = await collection.updateOne(query, update);
            
            if ( !result.acknowledged )  throw new Error('Fallo al actualizar el documento en la colección');
            return result;

        } catch (error) {
            throw new Error(`Error en MongodbService.updateOne: ${error.message}`);
        } 
    }   
}

module.exports = MongodbService;