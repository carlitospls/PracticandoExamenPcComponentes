import './SesionButton.css';


function SesionButton({funcNav:navigate, email, icono, sesionIniciada}){ 

    function handlerClickBotonSesion(){
        if (!sesionIniciada)  navigate('/Cliente/LoginRegistro');
        const offcanvasDashBoard=document.getElementById('offcanvasPanel');
        const bootstrapOffcanvas = new window.bootstrap.Offcanvas(offcanvasDashBoard);
        bootstrapOffcanvas.show();
    }

    return (
            <button className="btn btn-light btn-sm" onClick={ handlerClickBotonSesion }>
                {
                    sesionIniciada ? 
                    <div className="d-flex d-flex flex-row justify-content-between align-items-center">
                        { icono ? <img src={icono} alt="avatar" className="img-fluid rounded-circle" style={{ width: '20px', height: '20px' }} /> : <i className="fa-regular fa-user"></i> }
                        <span className="ms-2">{email}</span>
                    </div>
                    :
                    <>
                        <i className="fa-regular fa-user"></i> Mi Cuenta
                    </>
                }
            </button>
    )
}

export default SesionButton