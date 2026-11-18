import ResponseApi from '../models/ResponseAPI.js';

export class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = 'HttpError';
    }
}

export function createHttpClient( { baseUrl='/api', getToken=()=>null, onUnauthorized=()=>{} }={} ){
    async function request(method, path, body){
        try {
            const headers = { Accept: 'application/json' };

            const token = getToken();
            if(token) headers['Authorization'] = `Bearer ${token}`;
            if(body) headers['Content-Type'] = 'application/json';
        
        const response = await fetch(`${baseUrl}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        });
        
        const {codigo, mensaje, datos}=await response.json();
        if(!response.ok) {
            if(response.status === 401 && token) onUnauthorized(); // token caducado ---> cerrar sesion o usar refresh token
            throw new HttpError(response.status, mensaje || 'Unknown error');
        }
        
        return codigo==0 ? ResponseApi.success(mensaje,datos) : ResponseApi.error(codigo,mensaje,datos);

        } catch (error) {
            throw new HttpError(error.status || 500, error.message || 'Unknown error');
        }

    }

    return {
        get: (path) => request('GET', path),
        post: (path, body) => request('POST', path, body),
        put: (path, body) => request('PUT', path, body),
        delete: (path) => request('DELETE', path)
    }
}