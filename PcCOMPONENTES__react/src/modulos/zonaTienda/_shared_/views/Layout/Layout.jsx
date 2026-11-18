import './Layout.css';
import { Outlet } from 'react-router';
import useStore from '../../../../_shared_/controllers/hooks/zustandState/zustandGlobalState.Hook.js';

import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import OffCanvasCarrito from '../../../carrito/views/OffCanvasCarrito.jsx';
import OffCanvasDashBoard from '../../../../zonaCliente/dashboard/offCanvasDashBoard/views/OffCanvasDashBoard.jsx';

function Layout(){
    const { sesionIniciada } = useStore();

    return <div className="container">
        <div className="row">
            <div className="col">
                {/*...header  ...*/}
                <Header />
            </div>
        </div>    

        <div className="row">
            <div className="col">
                {/*...contenido variable del layout en funcion de la ruta ...*/}
                <Outlet />
            </div>
        </div>

        <div className="row">
            <div className="col">
                {/*...footer ...*/}
                <Footer />
            </div>
        </div>    

        {/* .... offcanvas del carrito disponible para que pueda ser abierto por cualquier componente de la aplicacion */}
        <OffCanvasCarrito />
        
        {
            sesionIniciada && <OffCanvasDashBoard />
        }
        
    </div>
}

export default Layout;