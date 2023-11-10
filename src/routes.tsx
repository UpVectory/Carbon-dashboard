import {RouteType} from "./types";
import {About, Cars, Home, Plane, Total} from "./pages";


export const routesPath = {
    home: '/',
    cars: '/cars',
    plane: '/flights',
    total: '/total',
    about: '/about'
}

export const routes : RouteType[] = [
    {
        path: routesPath.home,
        component: <Home/>,
        name: 'Hello'
    },
    {
        path: routesPath.plane,
        component: <Plane/>,
        name: 'Flights'
    },
    {
        path: routesPath.cars,
        component: <Cars/>,
        name: 'Car trips'
    },

    {
        path: routesPath.total,
        component: <Total/>,
        name: 'Total'
    },
    {
        path: routesPath.about,
        component: <About/>,
        name: 'About'
    },
]