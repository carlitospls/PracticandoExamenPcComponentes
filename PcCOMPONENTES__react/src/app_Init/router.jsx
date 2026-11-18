import { createBrowserRouter, RouterProvider } from "react-router";

import routerObjectCliente from '../modulos/zonaCliente/_shared_/controllers/routerObjectsCliente.jsx';
import routerObjectsTienda from '../modulos/zonaTienda/_shared_/controllers/routerObjectsTienda.jsx';

const routerObject = [...routerObjectCliente, ...routerObjectsTienda];


const router = createBrowserRouter(routerObject);

export const Router = () => {
  return <RouterProvider router={router} />;
};
