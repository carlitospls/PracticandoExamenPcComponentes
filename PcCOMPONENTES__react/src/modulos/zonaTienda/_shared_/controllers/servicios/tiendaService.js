import { createHttpClient } from "../../../../_shared_/controllers/httpClient.js";
import useStore from "../../../../_shared_/controllers/hooks/zustandState/zustandGlobalState.Hook.js";


const fetchEndPointsTienda=createHttpClient({
    baseUrl: 'http://localhost:3000/api/Tienda',
    getToken: ()=>useStore.getState().accessToken,
    onUnauthorized: ()=>useStore.getState().resetSesion()
});

export default class TiendaService {
    static async getCategorias(pathCat='principales') {
        try {
            const {codigo, mensaje, datos} = await fetchEndPointsTienda.get(`/Categorias?pathCat=${pathCat}`);
            if (codigo !== 0) throw new Error(`Error en la respuesta de la API: ${mensaje}`);
            return datos.categorias || [];
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
            return [];
        }
    }

    static async getProductosByCategoria(pathCat) {
        try {
            const {codigo, mensaje, datos} = await fetchEndPointsTienda.get(`/Productos?pathCat=${pathCat}`);
            if (codigo !== 0) throw new Error(`Error en la respuesta de la API: ${mensaje}`);
            return datos.productos || [];
        } catch (error) {
            console.error('Error al obtener los productos por categoría:', error);
            return [];
        }
    }

    static async getProductosById(id) {
        try {
            const {codigo, mensaje, datos} = await fetchEndPointsTienda.get(`/Producto/${id}`);
            if (codigo !== 0) throw new Error(`Error en la respuesta de la API: ${mensaje}`);
            return datos.producto || null;
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error);
            return null;
        }
    }

}