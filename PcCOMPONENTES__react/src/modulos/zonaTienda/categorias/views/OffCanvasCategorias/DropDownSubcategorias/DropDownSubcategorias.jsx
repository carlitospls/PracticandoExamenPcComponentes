import './DropDownSubcategorias.css'

import useGetCategorias from '../../../controllers/hooks/FetchCategorias.Hook.js';

export default function DropDownSubcategorias({ subcategoria, abierta, onClick }) {
    const hijas = useGetCategorias(subcategoria.pathCat);

    return (
        <li className="panel-subcategorias-grupo">
            <div className={`panel-subcategorias-item ${abierta ? 'abierto' : ''}`}
                 role="button"
                 aria-expanded={abierta}
                 onClick={onClick}>
                <span>{subcategoria.nombre}</span>
                { hijas.length > 0 && <i className="fa-solid fa-chevron-down panel-subcategorias-chevron"></i> }
            </div>

            {/* contenedor que anima su altura de 0 a auto con css grid (ver .css) */}
            <div className={`panel-tercer-nivel ${abierta ? 'abierto' : ''}`}>
                <div className="panel-tercer-nivel-contenido">
                    <ul className="dropdown-menu show position-static w-100 shadow-sm">
                        { hijas.length === 0 && <li><span className="dropdown-item-text text-muted">No hay subcategorías</span></li> }
                        {
                            hijas.map(
                                hija => (
                                        <li key={hija._id}>
                                            <button type="button"
                                                    className="dropdown-item"
                                                    onClick={() => console.log(`Subcategoria de tercer nivel seleccionada: ${hija.nombre} (${hija.pathCat})`)}>
                                                {hija.nombre}
                                            </button>
                                        </li>
                                        )
                                    )
                        }
                    </ul>
                </div>
            </div>
        </li> 
    )
}