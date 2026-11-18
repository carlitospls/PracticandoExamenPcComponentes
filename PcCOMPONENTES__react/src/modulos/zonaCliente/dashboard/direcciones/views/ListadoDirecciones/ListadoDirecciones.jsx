import './ListadoDirecciones.css';
import ModalDirecciones from '../ModalDirecciones/ModalDirecciones';
import MiniDireccion from '../MiniDireccion/MiniDireccion';

export default function ListadoDirecciones() {

    return (
        <div className="container">
            <div className="row m-4">
                <div className="col-12">
                    <h2>Mis Direcciones</h2>
                </div>
            </div>

            <div className="row m-5">
                <div className="col-12 d-flex flex-column  justify-content-start">
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Direcciones de envío</span>
                    <MiniDireccion />
                      <button type="button" className="btn btn-outline-secondary w-25 m-2" data-bs-toggle="modal" data-bs-target="#modalDirecciones">
                        <i className="fa-solid fa-plus"></i> Añade una direccion
                    </button>
                </div>
            </div>

            <div className="row m-5">
                <div className="col-12 d-flex flex-column  justify-content-start">
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Datos de facturación</span>
                    <MiniDireccion />
                    <button type="button" className="btn btn-outline-secondary w-25 m-2" data-bs-toggle="modal" data-bs-target="#modalDirecciones">
                        <i className="fa-solid fa-plus"></i> Añadir datos de facturación
                    </button>
                </div>
            </div>


            <ModalDirecciones />                

        </div>                
    )

}