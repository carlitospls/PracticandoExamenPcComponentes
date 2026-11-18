import {useNavigate} from 'react-router';

function IconPc() {
    const navigate = useNavigate();
    return (
        <img src="/imagenes/logo_pccomponentes.png" className="rounded mx-auto d-block" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
    );
}
export default IconPc;