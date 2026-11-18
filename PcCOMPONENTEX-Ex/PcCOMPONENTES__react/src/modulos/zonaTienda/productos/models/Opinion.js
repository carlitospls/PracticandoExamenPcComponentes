export default class Opinion {
    constructor(
        {
            _id,
            idUsuario,
            nombreUsuario,
            avatarUsuario,
            texto,
            valoracion=0,
            pros=[],
            contras=[],
            fecha
        }
    ){
        this._id = _id;
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.avatarUsuario = avatarUsuario;
        this.texto = texto;
        this.valoracion = valoracion;
        this.pros = pros;
        this.contras = contras;
        this.fecha = fecha;
    }

    static fromPrimitives({ _id, idUsuario, nombreUsuario, avatarUsuario, texto, valoracion=0, pros=[], contras=[], fecha }) {
        return new Opinion({ _id, idUsuario, nombreUsuario, avatarUsuario, texto, valoracion, pros, contras, fecha });
    }

    toPrimitives() {
        return {
            _id: this._id,
            idUsuario: this.idUsuario,
            nombreUsuario: this.nombreUsuario,
            avatarUsuario: this.avatarUsuario,
            texto: this.texto,
            valoracion: this.valoracion,
            pros: this.pros,
            contras: this.contras,
            fecha: new Date(this.fecha)
        };
    }
}