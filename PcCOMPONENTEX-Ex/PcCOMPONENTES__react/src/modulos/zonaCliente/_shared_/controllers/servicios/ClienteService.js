import { createHttpClient } from "../../../../_shared_/controllers/httpClient.js";
import useStore from "../../../../_shared_/controllers/hooks/zustandState/zustandGlobalState.Hook.js";



const fetchEndPointsCliente=createHttpClient({
    baseUrl: 'http://localhost:3000/api/Cliente',
    getToken: ()=>useStore.getState().accessToken,
    onUnauthorized: ()=>useStore.getState().resetSesion()
});

export default class ClienteService {
    static async login(email, password) {
        try {
            const {codigo, mensaje, datos} = await fetchEndPointsCliente.post('/Login', { email, password });
            if (codigo !== 0) throw new Error(`Error en la respuesta de la API: ${mensaje}`);
            return datos || null;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return null;
        }
    }

    static async registro(nombre, email, password) {
        try {
            const {codigo, mensaje, datos} = await fetchEndPointsCliente.post('/Registro', { nombre, email, password });
            if (codigo !== 0) throw new Error(`Error en la respuesta de la API: ${mensaje}`);
            return datos || null;
        } catch (error) {
            console.error('Error al registrar:', error);
            return null;
        }
    }

    static async getGoogleUrlCallBack() {
        try {
            const {codigo, mensaje, datos} = await fetchEndPointsCliente.get('/LoginGoogle');
            if (codigo !== 0) throw new Error(`Error en la respuesta de la API: ${mensaje}`);
            return datos.url || null;
        } catch (error) {
            console.error('Error al obtener la URL de callback de Google:', error);
            return null;
        }
    }

}