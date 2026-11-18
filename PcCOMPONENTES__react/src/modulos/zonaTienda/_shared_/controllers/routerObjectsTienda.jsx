import Layout from '../../_shared_/views/Layout/Layout'
import Home from '../../home/views/Home'
import ProductosCat from '../../productos/views/ProductosCat'
import DetallesProducto from '../../detallesProducto/views/DetallesProducto'

import FetchProductoLoader from '../../detallesProducto/controllers/loaders/FetchProducto.Loader.js'
import { productoCacheMiddleware } from '../../detallesProducto/controllers/middlewares/ProductoCache.middleware.js'


const  routerObjectsTienda=[
    {
      element: <Layout/> ,
      children:[
        { path:'/' , element: <Home/> },
        { path: 'Productos', element: <ProductosCat/> },
        { 
          path: 'Producto/:idproducto',
          middleware: [productoCacheMiddleware],
          loader: FetchProductoLoader,
          element: <DetallesProducto/>
        },

      ]
    } 
]

export default routerObjectsTienda;