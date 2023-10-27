import {ReactNode} from "react";

export type RouteType = {
    path: string;
    component: ReactNode;
    name: string;
};

export type Airport = {
    "id": number,
    "ident": string,
    "type": string,
    "name": string,
    "latitude_deg": number,
    "longitude_deg": number,
    "elevation_ft": number,
    "continent": string,
    "iso_country": string,
    "iso_region": string,
    "municipality": string,
    "scheduled_service": string,
    "gps_code": string,
    "iata_code": string,
    "local_code": string,
    "home_link": string,
    "wikipedia_link": string,
    "keywords": string
}

export type Flights =   {
    "id": string,
    "departure": string,
    "arrival": string,
    "distance": string,
    "carbon": string
    "custom"?: boolean
}

export type Cars =   {
    "id": number,
    "type": string,
    "gasCarbon": number,
    "dieselCarbon": number,
}