import './MiniDireccion.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

function MiniDireccion() {

    function btnEliminarClick() {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Eliminar datos de facturacion/envio',
            text: "¿Seguro que desesas eliminar los datos de facturacion/envio? Esta accion no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff6a00',
            cancelButtonColor: '#000',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire(
                    'Eliminado!',
                    'La dirección ha sido eliminada.',
                    'success'
                );
            }
        });
    }

    return (
        <div className='card m-4'>
            <div className='card-body'>
                <div className="container">
                    <div className="row">
                        <div className="col-9">
                            <div className='d-flex flex-column justify-content-between mb-2'>
                                <button className='btn btn-outline-secondary btn-sm w-25' disabled>Predeterminada</button>                                
                                <p className='card-text mt-2'><strong>NOMBRE APELLIDOS</strong></p>
                                <p className='card-text'>...datos de direccion: Calle, numero, piso, puerta, etc ... CP POBLACION - PROVINCIA, Pais</p>
                            </div>
                        </div>

                        <div className="col-3">
                            <div className='d-flex justify-content-end gap-2'>
                                <button className='btn btn-outline-secondary btn-sm me-2' onClick={ btnEliminarClick}>Eliminar</button>
                                <button className='btn btn-outline-secondary btn-sm' data-bs-toggle="modal" data-bs-target="#modalDirecciones">Modificar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 

export default MiniDireccion;
