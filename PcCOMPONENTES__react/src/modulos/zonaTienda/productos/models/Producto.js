
import Opinion from './Opinion.js';

class Descuento {
    constructor({ tieneDescuento=false, precioOriginal=0, porcentaje=0, tipo='', etiqueta='' }) {
        this.tieneDescuento = tieneDescuento;
        this.precioOriginal = precioOriginal;
        this.porcentaje = porcentaje;
        this.tipo = tipo;
        this.etiqueta = etiqueta;
    }
    static fromPrimitives({ tieneDescuento=false, precioOriginal, porcentaje=0, tipo='', etiqueta='' }) {
        return new Descuento({ tieneDescuento, precioOriginal, porcentaje, tipo, etiqueta });
    }
    toPrimitives() {
        return {
            tieneDescuento: this.tieneDescuento,
            precioOriginal: this.precioOriginal,
            porcentaje: this.porcentaje,
            tipo: this.tipo,
            etiqueta: this.etiqueta
        };
    }
}

export default class Producto {
    constructor( 
        { 
            _id, 
            nombre, 
            marca, 
            sku, 
            partNumber, 
            descripcion, 
            precio, 
            pathCategoria, 
            descuento={}, 
            disponible=true, 
            caracteristicas=[], 
            especificaciones={},
            valoracionMedia=0,
            numeroOpiniones=0,
            url='',
            imagenes=[],
            opiniones=[],
            preguntas=[]
        } ) {
        this._id = _id;
        this.nombre = nombre;
        this.marca = marca;
        this.sku = sku;
        this.partNumber = partNumber;
        this.descripcion = descripcion;
        this.precio = precio;
        this.pathCategoria = pathCategoria;
        this.descuento = descuento && typeof descuento === 'object' ? Descuento.fromPrimitives(descuento) : new Descuento({});
        this.disponible = disponible;
        this.caracteristicas = caracteristicas;
        this.especificaciones = especificaciones;
        this.valoracionMedia = valoracionMedia;
        this.numeroOpiniones = numeroOpiniones;
        this.url = url;
        this.imagenes = imagenes;
        this.opiniones = opiniones.length > 0 ? opiniones.map((opinion) => Opinion.fromPrimitives(opinion)) : [];
        this.preguntas = preguntas;
    }

    static fromPrimitives(
        { 
            _id, 
            nombre, 
            marca, 
            sku, 
            partNumber, 
            descripcion, 
            precio, 
            pathCategoria, 
            descuento={}, 
            disponible=true, 
            caracteristicas=[], 
            especificaciones={}, 
            valoracionMedia=0, 
            numeroOpiniones=0, 
            url='', 
            imagenes=[], 
            opiniones=[], 
            preguntas=[] 
        }
    ) {
        return new Producto({ _id, nombre, marca, sku, partNumber, descripcion, precio, pathCategoria, descuento, disponible, caracteristicas, especificaciones, valoracionMedia, numeroOpiniones, url, imagenes, opiniones, preguntas });
    }
    toPrimitives() {
        return {
            _id: this._id,
            nombre: this.nombre,
            marca: this.marca,
            sku: this.sku,
            partNumber: this.partNumber,
            descripcion: this.descripcion,
            precio: this.precio,
            pathCategoria: this.pathCategoria,
            descuento: this.descuento.toPrimitives(),
            disponible: this.disponible,
            caracteristicas: this.caracteristicas,
            especificaciones: this.especificaciones,
            valoracionMedia: this.valoracionMedia,
            numeroOpiniones: this.numeroOpiniones,
            url: this.url,
            imagenes: this.imagenes,
            opiniones: this.opiniones.map((opinion) => Opinion.fromPrimitives(opinion).toPrimitives()),
            preguntas: this.preguntas
        };
    }
}