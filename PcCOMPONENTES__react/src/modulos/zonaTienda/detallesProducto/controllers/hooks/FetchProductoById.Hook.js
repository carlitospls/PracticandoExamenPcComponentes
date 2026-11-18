import { useState, useEffect } from 'react';
import TiendaService from '../../../_shared_/controllers/servicios/tiendaService.js';



export default function useProductoById(id) {
    const [producto, setProducto] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) { return; }
        async function fetchProducto() {
            try {
                setCargando(true);
                setError(null);

                const _producto=await TiendaService.getProductosById(id);
                
                setProducto(_producto);
                setCargando(false);

            } catch (error) {
                console.error('Error al obtener los productos por categoría:', error);
    
                setError(error.message);
                setCargando(false);
                setProducto(null);
            }
        }
        fetchProducto();
    }, [id]);

   return { producto, cargando, error };
}