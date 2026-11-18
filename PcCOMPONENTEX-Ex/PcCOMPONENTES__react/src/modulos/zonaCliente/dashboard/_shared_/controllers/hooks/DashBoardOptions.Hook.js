import {useState, useEffect} from 'react';
import DashBoardOption from '../../models/DashBoardOption.js';

const opcionesDashBoard=[
    { 
        label:'Pedidos y Devoluciones', 
        path:'/Cliente/Dashboard/Pedidos', 
        icono:'fa-solid fa-box', 
        subOpciones:[
            { label:'Pedidos, devoluciones y facturas', path:'/Cliente/Dashboard/Pedidos/MisPedidos', icono:'' },
            { label:'Historial de devoluciones', path:'/Cliente/Dashboard/Pedidos/Devoluciones', icono:'' },
            { label:'Plan renove', path:'', icono:'' },
            { label:'Productos digitales', path:'', icono:'' },
            { label:'Area de seguros', path:'', icono:'' },
        ]
    },
    { 
        label:'Mi Cuenta', 
        path:'/Cliente/Dashboard/MiCuenta', 
        icono:'fa-solid fa-user', 
        subOpciones:[
            { label:'Mis datos', path:'/Cliente/Dashboard/MiCuenta/MisDatos', icono:'' },
            { label:'Mis direcciones', path:'/Cliente/Dashboard/MiCuenta/MisDirecciones', icono:'' },
            { label:'Mis suscripciones', path:'', icono:'' },
            { label:'Mis documentos', path:'', icono:'' },
            { label:'Lista de deseos', path:'', icono:'' },
            { label:'Mis configuraciones de PC', path:'', icono:'' },
            { label:'Mensajes', path:'', icono:'' },
            { label:'Opiniones', path:'', icono:'' },
            { label:'Ranking de usuarios', path:'', icono:'' },
        ]
    },
    { 
        label:'Pago', 
        path:'/Cliente/Dashboard/Pago', 
        icono:'fa-solid fa-credit-card', 
        subOpciones:[
            { label:'Tarjetas vinculadas', path:'/Cliente/Dashboard/Pago/Tarjetas', icono:'' },
            { label:'Cupones descuento', path:'', icono:'' },
            { label:'Saldos a favor', path:'', icono:'' },
            { label:'Tarjetas regalo', path:'', icono:'' },
        ]
    },
    { 
        label:'¿Necesitas ayuda?', 
        path:'/Cliente/Dashboard/NecesitasAyuda', 
        icono:'fa-solid fa-circle-question', 
        subOpciones:[
            { label:'Devoluciones y garantias', path:'/Cliente/Dashboard/NecesitasAyuda/Devoluciones', icono:'' },
            { label:'Devolver un regalo', path:'', icono:'' },
            { label:'Servicio de reparaciones', path:'', icono:'' },
            { label:'Centro de soporte', path:'', icono:'' },
        ]
    },
    { 
        label:'Cerrar sesión', 
        path:'', 
        icono:'fa-solid fa-right-from-bracket', 
        subOpciones:[]
    },
];


export default function useDashBoardOptions(){
    const [dashBoardOptions, setDashBoardOptions]=useState(
            opcionesDashBoard.map(
                    (opcion)=>new DashBoardOption(opcion)
                )
        );
    const [ dashOptionSelected, setDashOptionSelected]=useState(null);

    //si se pulsa la opcion ya abierta se cierra, si no se abre la nueva
    const toggleDashOption=(option)=>{
        setDashOptionSelected( prev => prev === option ? null : option );
    };

    return { dashBoardOptions, dashOptionSelected, setDashOptionSelected, toggleDashOption };
}