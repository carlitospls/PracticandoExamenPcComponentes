class DbService {
    constructor() {
        if(this.constructor === DbService) {
            throw new Error("Cannot instantiate abstract class DbService");
        }
    }
    selectOne(tableOrCollection, query, projection) {
        throw new Error("Method selectOne must be implemented");
    }
    
    selectMany(tableOrCollection, query, projection) {
        throw new Error("Method selectMany must be implemented");
    }

    insertOne(tableOrCollection, data) {
        throw new Error("Method insertOne must be implemented");
    }

    updateOne(tableOrCollection, query, update) {
        throw new Error("Method updateOne must be implemented");
    }
}

module.exports = DbService;