import './OffCanvasCarrito.css';
import useStore from '../../../_shared_/controllers/hooks/zustandState/zustandGlobalState.Hook.js';
import MiniProductoOffCanvas from './MiniProductoOffCanvas/MiniProductoOffCanvas';

export default function OffCanvasCarrito(){

    const { carrito, setCarrito } = useStore();

    return (
        <div className="offcanvas offcanvas-end" 
            tabIndex="-1" 
            id="offcanvasCarrito"
            aria-labelledby="offcanvasRightLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Mi Cesta</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <hr></hr>
                <div className="offcanvas-body">
                    {
                        carrito.itemsPedido.length > 0 ? (
                            <>                            
                                {
                                    carrito.itemsPedido.map( 
                                                            (itemPedido, posicion) => <MiniProductoOffCanvas key={itemPedido.producto._id} 
                                                                                                            producto={itemPedido.producto} 
                                                                                                            cantidad={itemPedido.cantidad}
                                                                                                            setCarrito={setCarrito} />
                                                            )
                                }
                                <hr></hr>     
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <p><small>Unidades:</small></p>
                                    <p><small><strong>{carrito.unidadesPedido}</strong></small></p>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <p><small>Total:</small></p>
                                    <p><strong>{carrito.total}€</strong></p>
                                </div>
                            </>
                                )  : (
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <h5 className="text-center">Tu carrito está vacío</h5>
                                        <p className="text-center">Explora multitud de artículos a buen precio</p>
                                        <p className="text-center">desde nuestra página principal</p>
                                        <button type="button" className="btn btn-outline-primary" data-bs-dismiss="offcanvas" aria-label="Close">Explora artículos</button>
                                    </div>
                                )                                 
                    }
                </div>
        </div>                    

    )



}