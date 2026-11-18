import './ProductosCat.css'
import { useSearchParams } from 'react-router' //<---- hook de react-router para interceptar valores variables por query string en url
import useProductosPorCategoria from '../controllers/hooks/FetchProductosPorCategoria.Hook.js'
import MiniProducto from './MiniProducto/MiniProducto.jsx'

function ProductosCat(){
    const [searchParams, setSearchParams] = useSearchParams();
    const { productos, cargando, error } = useProductosPorCategoria(searchParams.get('pathCat') );

    if (cargando) {
        return <div className="d-flex flex-column justify-content-center align-items-center ">Cargando...</div>
    }

    if (error) {
        return <div className="d-flex flex-column justify-content-center align-items-center ">Error: {error}</div>
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center ">
        {
            productos.length === 0 ? (
                <div className="text-muted">No hay productos en esta categoría</div>
            ) : (
                <div className="productos-cat-grid">
                    {
                        productos.map(
                            producto => (
                                    <div key={producto._id} className="producto-cat-item">
                                        <MiniProducto producto={producto} />
                                    </div>
                            )
                        )
                    }
                </div>
            )
        }
        </div>
    )
}

export default ProductosCat