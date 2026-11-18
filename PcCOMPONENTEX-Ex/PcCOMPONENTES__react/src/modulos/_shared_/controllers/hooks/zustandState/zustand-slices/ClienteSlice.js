const initialClienteState ={
    cliente: { 
                    nombre:'', 
                    apellidos:'', 
                    cuenta:{
                        email:'',
                        password:'',
                        activada:false,
                        telefono:'',
                        fechaCreacion: 0,
                        imagenAvatar:''  
                    }, 
                    direcciones:[], 
                    pedidos:[], 
                    opiniones:[],
                    favoritos:[]
                 },
    setCliente: ()=>{},
    resetCliente: ()=>{}
}

export const ClienteSlice = (set, get, store) =>{

    return {
        ...initialClienteState,
        setCliente: (nuevosDatos)=> set( stateAnterior => ({ ...stateAnterior, cliente: { ...stateAnterior.cliente, ...nuevosDatos } }) ),
        resetCliente: ()=> set( stateAnterior => ({ ...stateAnterior, ...initialClienteState }) )
    } //<--- objeto q devuelve el slice de Cliente  se incruta en store-global
}