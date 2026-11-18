module.exports = class Categoria {
    constructor({ _id, nombre, pathCat, icon }) {
        this._id = _id;
        this.nombre = nombre;
        this.pathCat = pathCat;
        this.icon = icon;
    }
    fromPrimitives({ _id, nombre, pathCat, icon }) {
        return new Categoria({ _id, nombre, pathCat, icon });
    }
    toPrimitives() {
        return {
            _id: this._id,
            nombre: this.nombre,
            pathCat: this.pathCat,
            icon: this.icon
        };
    }
}
