import LoginRegistro from '../../auth/views/LoginRegistro/LoginRegistro';
import LayoutDashBoard from '../../dashboard/_shared_/views/LayoutDashBoard.jsx';
import ListadoDireccionres from '../../dashboard/direcciones/views/ListadoDirecciones/ListadoDirecciones.jsx';
const  routerObjectsCliente=[
    {
      path: 'Cliente',
      children:[
        { path:'LoginRegistro', element: <LoginRegistro /> },
        {
          path:'DashBoard',
          element: <LayoutDashBoard/>,
          children:[
            { path: 'Pedidos', 
              children:[
                { path:'MisPedidos', element: <div>Mis Pedidos...</div> },
                { path:'Devoluciones', element: <div>Historia de devoluciones del usuario...</div> },
              ] 
            },
            { path: 'MiCuenta', 
              children:[
                { path:'MisDatos', element: <div>DatosPersonales...</div> },
                { path:'MisDirecciones', element: <ListadoDireccionres /> },
              ] 
            },

          ]
        }        
      ]

    }
]

export default routerObjectsCliente;