import {useState, useEffect} from 'react';
import TiendaService from '../../../_shared_/controllers/servicios/tiendaService.js';

export default function useGetCategorias(pathCat){

    const [ categorias, setCategorias] = useState([]);

    useEffect(
        ()=>{
            async function fetchCategorias(){
                try{
                    const categorias=await TiendaService.getCategorias(pathCat);
                    setCategorias(categorias);
                
                } catch(error){
                    console.error('Error al obtener las categorias:', error);
                    setCategorias([]);
                }            
            }
            
            fetchCategorias();

        },[pathCat]
    )

    return categorias
}