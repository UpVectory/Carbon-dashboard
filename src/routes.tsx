import {RouteType} from "./types";
import {About, Cars, Home, Plane, Total} from "./pages";


export const routesPath = {
    home: '/',
    cars: '/cars',
    plane: '/plane',
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
        path: routesPath.cars,
        component: <Cars/>,
        name: 'Car trips'
    },
    {
        path: routesPath.plane,
        component: <Plane/>,
        name: 'Flights'
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