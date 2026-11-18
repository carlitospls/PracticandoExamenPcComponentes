import './ListaCategorias.css'
import useGetCategorias  from '../../../controllers/hooks/FetchCategorias.Hook.js'

function ListaCategorias({ pathCat='principales', setCategoriaSeleccionada }) {

    const categorias = useGetCategorias(pathCat);

    return (
            <ul className="list-group list-group-flush">
                {
                    categorias.map((categoria, index) => (
                        // en el onClick de cada categoria padre deberemos cargar el correspondiente listado de subcats-2º orden
                        <li key={categoria._id} 
                            className="list-group-item"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setCategoriaSeleccionada(categoria)}
                        >

                            <div className="d-flex flex-row justify-content-between align-items-center">
                                {/* icono y nombre categoria */}
                                <div>
                                    { categoria.icon && <img src={categoria.icon}
                                                             alt={categoria.nombre} 
                                                             className="me-2"
                                                             style={{ width: '20px', height: '20px' }} /> }
                                    <span>{categoria.nombre}</span>
                                </div>

                                {/* flecha de navegación */}
                                 <i className="fa-solid fa-chevron-right"></i>

                            </div>

                        </li>
                    ))
                }
            </ul>
    )
}

export default ListaCategorias;