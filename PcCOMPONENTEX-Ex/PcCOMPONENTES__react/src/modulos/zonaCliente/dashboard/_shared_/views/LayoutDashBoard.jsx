import './LayoutDashBoard.css';
import { Outlet, useNavigate } from 'react-router';
import useDashBoardOptions from '../controllers/hooks/DashBoardOptions.Hook.js';
import IconPc from '../../../../_shared_/views/IconPc.jsx';

export default function LayoutDashBoard() {
    const navigate = useNavigate();
    const { dashBoardOptions } = useDashBoardOptions();

    return (
        <div className="container">
            <div className="row m-4">
                <div className="col-12 text-center">
                    <IconPc />
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    {
                        dashBoardOptions.map(
                            option => (
                                <ul className="list-group list-group-flush" key={option.label}>
                                    <li className="list-group-item dash-option">
                                        <span style={{ fontSize: '0.875rem', fontWeight: '600' }}><i className={option.icono}></i> {option.label}</span>
                                    </li>
                                    {
                                        option.subOpciones.map(
                                            subOption => (
                                                <li className="list-group-item dash-option"
                                                    style={{ border: 'none', padding: '0.5rem 1rem' }}
                                                    key={subOption.label}
                                                    onClick={() => navigate(subOption.path)}
                                                >
                                                    <span className="text-muted"><small>{subOption.label}</small></span>
                                                </li>
                                            )
                                        )
                                    }
                                </ul>
                            )
                        )
                    }
                </div>

                <div className="col-9">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}