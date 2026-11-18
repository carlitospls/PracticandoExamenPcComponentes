function Spinner() {
    return (
            <div className="d-flex align-items-center">
                <strong role="status">Esperando respuesta del server...</strong>
                <div className="spinner-border ms-auto" aria-hidden="true"></div>
            </div>
    );
}
export default Spinner;