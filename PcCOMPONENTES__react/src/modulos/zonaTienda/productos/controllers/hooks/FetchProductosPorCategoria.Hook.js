import { useState, useEffect } from 'react';
import TiendaService from '../../../_shared_/controllers/servicios/tiendaService.js';



export default function useProductosPorCategoria(pathCat) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!pathCat) { return; }
        async function fetchProductos() {
            try {
                setCargando(true);
                setError(null);

                const productos=await TiendaService.getProductosByCategoria(pathCat);
                
                setProductos(productos);
                setCargando(false);

            } catch (error) {
                console.error('Error al obtener los productos por categoría:', error);
    
                setError(error.message);
                setCargando(false);
                setProductos([]);
            }
        }
        fetchProductos();
    }, [pathCat]);

   return { productos, cargando, error };
}