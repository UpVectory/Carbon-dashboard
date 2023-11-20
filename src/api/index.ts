import allAirports from '../data/airports.json'
import {Airport} from "../types";
import axios, {AxiosHeaders, HeadersDefaults, RawAxiosRequestHeaders} from "axios";

const myAirports = allAirports as Airport[]

export const apiAirports = myAirports.filter((value, index, array)=> {
    return value.iata_code !== ''
})

export const apiParams = {
    apiV: 'v1',
    endpoints: {
        flight_estimate: '/flight_estimate',
        distance_between_airports: '/distance-between-airports'
    }
}

const ifError = (err: any) => {
    console.log('Error: \n', err)
    return err
}


const mainUrl = 'https://carbonsutra1.p.rapidapi.com'

export interface DistanceBetweenAirportsRequiredFilds {
    iata_airport_from:string,
    iata_airport_to:string,
}

export interface FlightsTravelEstimateRequiredFilds extends DistanceBetweenAirportsRequiredFilds {
    number_of_passengers?: number | 1,
}

const createAxiosConnection = (url: string, auth : boolean) => {
    const headers:RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults> = {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
    }
    if (auth) {
        headers.Authorization = `Bearer ${process.env.REACT_APP_API_KEY}`
        headers['content-type'] = 'application/x-www-form-urlencoded'
    }

    return axios.create({
        baseURL: url,
        timeout: 2000,
        headers : headers
    })
}


const FlightsTravelEstimateApi = createAxiosConnection(mainUrl!, true)
export const postFlightsTravelEstimate = async (data:FlightsTravelEstimateRequiredFilds ) => {
    try {
        const res = await FlightsTravelEstimateApi.post(apiParams.endpoints.flight_estimate , {...data,
        number_of_passengers: 1})
        return res
    } catch (err: any) {
        ifError(err)
    }
}

const DistanceBetweenAirportsApi = createAxiosConnection(mainUrl!, false)

export const getDistanceBetweenAirports = async (data:DistanceBetweenAirportsRequiredFilds ) => {
    try {
        const res = await DistanceBetweenAirportsApi.get(apiParams.endpoints.distance_between_airports , {params:data})
        return res
    } catch (err: any) {
        ifError(err)
    }
}