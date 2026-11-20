import "./ModalDirecciones.css";

export default function ModalDirecciones() {
  return (
    <div
      className="modal fade"
      id="modalDirecciones"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="modalDireccionesLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title fs-5" id="modalDireccionesLabel">
              Añadir/Editar dirección envio -- Añadir/Editar datos de
              facturación
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              {/*
                                ---------------------- esta fila solo aparece si estamos añadiendo/editando dirección de facturación ----------------------
                                - si seleccionas Particular o Autonomo pides el NIF junto con el nombre y apellidos
                                - si seleccionas Empresa pides el CIF junto con el nombre de la empresa
                                ----------------------------------------------------------------------------------------------------------------------------
                                */}
              <div className="row mt-3 mb-3">
                <div className="col-12">
                  {["Particular", "Autonomo", "Empresa"].map((label, index) => (
                    <div key={index} className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id={`inlineRadio${index}`}
                        value={label}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`inlineRadio${index}`}
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* ------------------------------------------------------------------------------------------------------------------------------ */}

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre<em> *</em>
                    </label>
                    <input type="text" className="form-control" id="nombre" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label">
                      Apellidos<em> *</em>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="apellidos"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="empresa" className="form-label">
                      Empresa
                    </label>
                    <input type="text" className="form-control" id="empresa" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="nifcif" className="form-label">
                      NIF/CIF<em> *</em>
                    </label>
                    <input type="text" className="form-control" id="nifcif" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">
                      Telefono<em> *</em>
                    </label>
                    <input type="text" className="form-control" id="telefono" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="direccionNumero" className="form-label">
                      Direccion y número<em> *</em>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="direccionNumero"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="datosAdicionales" className="form-label">
                      Datos adicionales (piso, puerta, escalera...)<em> *</em>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="datosAdicionales"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="provincia" className="form-label">
                      Provincia:<em> *</em>
                    </label>
                    <select className="form-select" id="provincia">
                      <option value="">Selecciona una provincia</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="municipio" className="form-label">
                      Población:<em> *</em>
                    </label>
                    <select className="form-select" id="municipio">
                      <option value="">Selecciona una población</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="cp" className="form-label">
                      Codigo Postal<em> *</em>
                    </label>
                    <input type="text" className="form-control" id="cp" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="pais" className="form-label">
                      Pais<em> *</em>
                    </label>
                    <input type="text" className="form-control" id="pais" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="checkEnvio"
                      style={{
                        opacity: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    />
                    <label className="form-check-label" htmlFor="checkEnvio">
                      Marcar como predeterminada (para futuras compras)
                    </label>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-12 d-flex justify-content-end mb-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn pccomponentes-primary"
                    data-bs-dismiss="modal"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
