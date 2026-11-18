import './PanelSubcategorias.css';
import { useState } from 'react';
import useGetCategorias from '../../../controllers/hooks/FetchCategorias.Hook.js';
import DropDownSubcategorias from '../DropDownSubcategorias/DropDownSubcategorias.jsx';


export default function PanelSubcategorias({ categoriaSeleccionada:categoriaPadre, onClose, navigate }) {
    
    const subcategorias = useGetCategorias(categoriaPadre?.pathCat);
    const [subcategoriaAbierta, setSubcategoriaAbierta] = useState(null)

    return (
        <aside className={`panel-subcategorias ${categoriaPadre ? 'abierto' : ''}`} aria-hidden={!categoriaPadre}>

            {
                categoriaPadre && (
                    <>
                        <div className="panel-subcategorias-header">
                            <h5>{categoriaPadre.nombre}</h5>
                            <button type="button"
                                    className="btn-close"
                                    aria-label="Cerrar subcategorias"
                                    onClick={onClose} />
                        </div>
                        <hr />
                        <div className="panel-subcategorias-body">
                                <ul className="list-unstyled m-0">
                                {subcategorias.map(subcategoria => (
                                    <DropDownSubcategorias
                                        key={subcategoria._id}
                                        subcategoria={subcategoria}
                                        abierta={subcategoriaAbierta?._id === subcategoria._id}
                                        onClick={
                                            () => {
                                                    setSubcategoriaAbierta(actual => (actual?._id === subcategoria._id ? null : subcategoria));
                                                    navigate(`/Productos?pathCat=${subcategoria.pathCat}`);
                                            }
                                        }
                                    />
                                ))}
                            </ul>

                        </div>
                    </>
                )
            }

        </aside>
    )
}

