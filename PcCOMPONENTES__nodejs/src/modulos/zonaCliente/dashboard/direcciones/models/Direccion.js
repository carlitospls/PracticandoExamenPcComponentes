const Id = require("../../../../_shared_/models/Id.js");

class Direccion {
  //la dirección llega de React, cuando el usuario pulsa "Guardar".
  constructor({
    //Al hacer new Direccion({}) le pasamos un objeto con las propiedades de la dirección.
    _id, // Son estas 15 siempre:
    tipo,
    tipoCliente,
    nombre,
    apellidos,
    empresa,
    nifcif,
    telefono,
    direccionNumero,
    datosAdicionales,
    provincia,
    poblacion,
    cp,
    pais,
    predeterminada,
  }) {
    this._id = _id || Id.generateObjectId().id;
    this.tipo = tipo || "";
    this.tipoCliente = tipoCliente || "";
    this.nombre = nombre || "";
    this.apellidos = apellidos || "";
    this.empresa = empresa || "";
    this.nifcif = nifcif || "";
    this.telefono = telefono || "";
    this.direccionNumero = direccionNumero || "";
    this.datosAdicionales = datosAdicionales || "";
    this.provincia = provincia || "";
    this.poblacion = poblacion || "";
    this.cp = cp || "";
    this.pais = pais || "España"; //por defecto España.
    this.predeterminada = predeterminada || false;
  }
  toPrimitives() {
    //sirve para convertir la instacia de la clase
    //  en un objeto plano, que es lo que espera React y lo que se guarda en la base de datos.
    return {
      _id: this._id,
      tipo: this.tipo,
      tipoCliente: this.tipoCliente,
      nombre: this.nombre,
      apellidos: this.apellidos,
      empresa: this.empresa,
      nifcif: this.nifcif,
      telefono: this.telefono,
      direccionNumero: this.direccionNumero,
      datosAdicionales: this.datosAdicionales,
      provincia: this.provincia,
      poblacion: this.poblacion,
      cp: this.cp,
      pais: this.pais,
      predeterminada: this.predeterminada,
    };
  }
}

module.exports = Direccion;
