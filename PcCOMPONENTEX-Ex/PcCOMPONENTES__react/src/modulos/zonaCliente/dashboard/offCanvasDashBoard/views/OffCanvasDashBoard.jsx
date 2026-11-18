import './OffCanvasDashBoard.css';
import { Fragment } from 'react';
import { useNavigate } from 'react-router';

import useDashBoardOptions from '../../_shared_/controllers/hooks/DashBoardOptions.Hook.js';

export default function OffCanvasDashBoard() {
    const navigate = useNavigate();
    const { dashBoardOptions, dashOptionSelected, toggleDashOption } = useDashBoardOptions();

    return (
        <div className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasPanel"
            aria-labelledby="offcanvasRightLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Mi Cuenta</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <hr></hr>
                <div className="offcanvas-body">
                    <ul className="list-group list-group-flush">
                        {
                            dashBoardOptions.map(
                                option => {
                                    const tieneSubOpciones = option.subOpciones.length > 0;
                                    const abierta = dashOptionSelected === option;

                                    return (
                                        <Fragment key={option.label}>
                                            <li className={ tieneSubOpciones ? "list-group-item d-flex justify-content-between align-items-center dash-option" : "list-group-item dash-option" }
                                                onClick={ () => tieneSubOpciones && toggleDashOption(option) }
                                                aria-expanded={ tieneSubOpciones ? abierta : undefined }
                                            >
                                                <span><i className={option.icono}></i> {option.label}</span>
                                                { tieneSubOpciones && <i className={ abierta ? "bi bi-chevron-up" : "bi bi-chevron-down" }></i> }
                                            </li>
                                            {
                                                tieneSubOpciones && abierta && (
                                                    <li className="list-group-item p-0">
                                                        <ul className="list-group list-group-flush ps-4">
                                                            {option.subOpciones.map((subOption) => (
                                                                <li className="list-group-item dash-option"
                                                                    style={{ border: 'none', padding: '0.5rem 1rem' }}
                                                                    key={subOption.label}
                                                                    onClick={() => navigate(subOption.path)}
                                                                >
                                                                    <span className="text-muted"><small>{subOption.label}</small></span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                )
                                            }
                                        </Fragment>
                                    );
                                }
                            )
                        }
                    </ul>

                </div>
        </div>
    )
}
