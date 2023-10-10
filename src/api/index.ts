import allAirports from '../data/airports.json'
import {Airport} from "../types";

const myAirports = allAirports as Airport[]

const apiAirports = myAirports.filter((value, index, array)=>{
    return value.iata_code !== ''
})



export {apiAirports};