import './MiniProductoOffCanvas.css';

export default function MiniProductoOffCanvas({ producto,cantidad,setCarrito }) {

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={ producto.imagenes[0]} className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">

                        <div className="container">
                            <div className="row">
                                <div className="col-9">
                                    {/* <h6 className="card-title">{producto.nombre}</h6> */}
                                    <p className="card-text"><small>{producto.nombre}</small> </p>
                                    <p className="card-text"><strong>{producto.precio}€</strong> </p>
                                    <p className="card-text"><small className="text-body-secondary">Unidades: {cantidad }</small></p>
                                </div>

                                <div className="col-3">
                                    <button type="button" 
                                            className="btn btn-outline-ligth btn-sm"
                                            onClick={() => setCarrito('eliminar', { producto, cantidad })}>
                                        <i class="bi bi-trash"></i>                                        
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>        
    )

}