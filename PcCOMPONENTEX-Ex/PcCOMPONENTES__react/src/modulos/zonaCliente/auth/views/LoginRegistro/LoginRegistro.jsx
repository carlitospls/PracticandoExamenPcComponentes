import './LoginRegistro.css';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useLoginRegistro } from '../../controllers/hooks/LoginRegistro.Hook.js';
import IconPc from '../../../../_shared_/views/IconPc.jsx';
import Spinner from '../../../../_shared_/views/Spinner.jsx';
import ErrorMessage from '../../../../_shared_/views/ErrorMessage.jsx';

function LoginRegistro() {
    const navigate = useNavigate();
    const {  enLogin, formData, isLoading, error, switchLoginRegistro, submitForm,changeFormData, loginWithGoogle } = useLoginRegistro();
    const popupWindowRef = useRef(null);

    useEffect(
        ()=>{
            function handleMessage(event) {
                // if (event.origin !== window.location.origin) {
                //     console.log('LoginRegistro.jsx - handleMessage - origen no permitido:', event.origin);
                //     return;
                // }
                const { codigo, mensaje, datos } = event.data;
                if (codigo === 0) {
                    console.log('LoginRegistro.jsx - handleMessage - login con Google correcto:', datos);
                    //navegar a la pagina principal cargando los datos de sesion y token en el state-global...
                    navigate('/');
                } else {
                    console.log('LoginRegistro.jsx - handleMessage - error en login con Google:', mensaje);
                }
            }
            window.addEventListener('message', handleMessage);
            return () => {
                window.removeEventListener('message', handleMessage);
                if (popupWindowRef.current && !popupWindowRef.current.closed) {
                    popupWindowRef.current.close();
                }
            }
        }
        ,[]
    );
    console.log('LoginRegistro.jsx - enLogin:', enLogin, 'formData:', formData, 'isLoading:', isLoading, 'error:', error);

    const cajasTexto=[
        { placeholder: "Nombre", type: "text", id: "nombre", enLogin: false, enRegistro: true },
        { placeholder: "E-mail*", type: "email", id: "email", enLogin: true, enRegistro: true },
        { placeholder: "Contraseña*", type: "password", id: "password", enLogin: true, enRegistro: true },
        { placeholder: "Repetir Contraseña*", type: "password", id: "repassword", enLogin: false, enRegistro: true }
    ]
    
    async function handleLoginWithGoogle() {
        const url = await loginWithGoogle();
        if (!url) return;

        console.log('LoginRegistro.jsx - handleLoginWithGoogle - url:', url);
        popupWindowRef.current = window.open(url, 'Login with Google', 'width=600,height=600');
    }


    return (
        <div className="container">

            <div className="row m-4">
                <div className="col justify-content-center aling-items-center">
                    <IconPc />
                </div>
            </div>
            <div className="row">
                <div className="col-6"><img src="/imagenes/loginRegistro_info.png" className="img-fluid"/></div>
                <div className="col-4">
                    <div className="container">
                        {
                            error && <ErrorMessage message={error} />
                        }
                        <div className="row"><div className="col"><h4><strong>{ enLogin ? "Iniciar sesión" : "Crear cuenta" }</strong></h4></div></div>
                        <div className="row m-3">
                            <div className="col d-grid gap-1">
                                <button type="button" id="btnlogingmail"  className="btn btn-light btn-sm" onClick={ handleLoginWithGoogle }>
                                    <img  src="/imagenes/boton_login_GMAIL.png"/>
                                </button>
                            </div>
                        </div>
                        <div className="row"><div className="col m-4 d-flex flex-row align-items-center justify-content-center"><h6><span> O bien </span></h6></div></div>
                        
                        <div className="row">
                            <div className="col">

                                { 
                                    cajasTexto.filter( caja => caja.enLogin === enLogin || (caja.enLogin===true && caja.enRegistro === true))
                                            .map( caja =>                                 
                                                <div className="form-floating mb-3" key={caja.id}>
                                                    <input type={caja.type} className="form-control" id={caja.id} placeholder={caja.placeholder} onChange={(e) => changeFormData(caja.id, e.target.value)}/>
                                                    <label htmlFor={caja.id}>{caja.placeholder}</label>
                                                </div>
                                            )
                                }

                                {

                                ! enLogin &&
                                <>                           
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            He leido y acepto la <a href="">politica de privacidad</a>
                                        </label>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Recibir <strong>descuentos exclusivos</strong>, novedades y tendencias por e-mail. Me puedo dar de baja desde mi panel.
                                        </label>
                                    </div>                                
                                </>
                                }   

                                <div className="m-3">
                                    <div className="col d-grid gap-1">
                                        <button type="button"  className="btn pccomponentes-primary" onClick={() => submitForm(formData)}>
                                            <span> { ! enLogin ? 'Crear cuenta' : 'Iniciar Sesion' }</span>
                                        </button>
                                    </div>
                                </div> 
                            </div>
                        </div>    

                        <hr/>
                        <div className="row">
                            <div className="col m-4 d-flex flex-row align-items-center justify-content-center">
                                <h6><span> { enLogin ? '¿Eres nuevo cliente?':'Ya tengo una cuenta'} </span></h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col d-grid gap-1">
                                {
                                    isLoading ? 
                                        <Spinner /> 
                                    :                                                                     
                                    <button type="button"  className="btn btn-outline-secondary" onClick={() => switchLoginRegistro()}>
                                        <span> { enLogin ? 'Crear cuenta' : 'Iniciar Sesion' }</span>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRegistro;