import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import ClienteService from "../../../_shared_/controllers/servicios/ClienteService.js";
import useStore from "../../../../_shared_/controllers/hooks/zustandState/zustandGlobalState.Hook.js";

function toLoadingState(previous) {
  return { ...previous, isLoading: true, error: null };
}

function toLoadedState(previous, { nombre, email, password, repetirPassword }) {
  return {
    ...previous,
    formData: { nombre, email, password, repetirPassword },
    isLoading: false,
  };
}

function toErrorState(previous, error) {
  return { ...previous, error: error.message, isLoading: false };
}

export function useLoginRegistro() {
  const [state, setState] = useState({
    enLogin: false,
    formData: { nombre: "", email: "", password: "", repetirPassword: "" },
  });
  const navigate = useNavigate();
  const store = useStore();

  const switchLoginRegistro = useCallback(() => {
    setState((previous) => ({ ...previous, enLogin: !previous.enLogin }));
  }, []);

  const changeFormData = useCallback((field, value) => {
    setState((previous) => ({
      ...previous,
      formData: { ...previous.formData, [field]: value },
    }));
  }, []);

  const submitForm = useCallback(
    async (dataForm) => {
      console.log("[PASO 1] React · hook: has pulsado el botón", dataForm);
      try {
        setState(toLoadingState);

        if (!state.enLogin && dataForm.password !== dataForm.repetirPassword) {
          throw new Error("Las contraseñas no coinciden");
        }

        const { token, cliente } = await (state.enLogin
          ? ClienteService.login(dataForm.email, dataForm.password)
          : ClienteService.registro(
              dataForm.nombre,
              dataForm.email,
              dataForm.password,
            ));
        console.log(
          "[PASO 5] React · hook: me ha llegado la respuesta. Token:",
          token,
        );
        setState((previous) => toLoadedState(previous, dataForm));

        console.log(
          "LoginRegistro.Hook.js - submitForm - token sesion:",
          token,
          "datosCliente:",
          cliente,
        );
        //navigate(`${state.enLogin} ? '/Cliente/Panel' : '/'`, { state: { sesion, datosCliente } });
        if (state.enLogin && token && cliente) {
          store.setAccessToken(token);
          store.setCliente(cliente);
          store.setSesionIniciada(true);
        }
        navigate("/");
      } catch (error) {
        console.error("LoginRegistro.Hook.js - submitForm - error:", error);
        setState((previous) => toErrorState(previous, error));
      }
    },
    [store, navigate, state.enLogin],
  );

  const loginWithGoogle = useCallback(async () => {
    setState(toLoadingState);
    try {
      const url = await ClienteService.getGoogleUrlCallBack();
      setState((previous) => ({ ...previous, isLoading: false }));
      return url;
    } catch (error) {
      console.error("LoginRegistro.Hook.js - loginWithGoogle - error:", error);
      setState((previous) => toErrorState(previous, error));
      return null;
    }
  }, []);

  return {
    ...state,
    switchLoginRegistro,
    submitForm,
    changeFormData,
    loginWithGoogle,
  };
}
