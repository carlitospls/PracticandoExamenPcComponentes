export default class DashBoardOption{
    constructor({label, path, icono, subOpciones}){
        this.label=label;
        this.path=path;
        this.icono=icono;
        this.subOpciones=subOpciones;
    }
    toPrimitive(){
        return {
            label:this.label,
            path:this.path,
            icono:this.icono,
            subOpciones:this.subOpciones
        }
    }
    static fromPrimitive(obj){
        return new DashBoardOption({
            label:obj.label,
            path:obj.path,
            icono:obj.icono,
            subOpciones:obj.subOpciones
        })
    }
}