import {createContext, useContext} from "react";

export type Length = 'km' | 'mi'
export type Weight = 'kg' | 'lb'
export type BarChartType = {
    id : number
    carbon : number
    distance: number
}

export type GlobalContext = {
    length : Length
    setLength : (c:Length)=>void
    weight : Weight
    setWeight: (c:Weight)=>void
    carbon : number
    setCarbon : (c:number)=>void
    carbonFl : number
    setCarbonFl : (c:number)=>void
    carbonCar: number
    setCarbonCar: (c:number)=>void
    flightBarChartArr: BarChartType[]
    setFlightBarChartArr: (c: BarChartType[])=>void
    carsBarChartArr: BarChartType[]
    setCarsBarChartArr: (c: BarChartType[])=>void
}

export const MyGlobalContext = createContext<GlobalContext>({
    length: 'km',
    setLength: c => {},
    weight: 'kg',
    setWeight: c=>{},
    carbonFl: 0,
    setCarbonFl:c=>{},
    carbon: 0,
    setCarbon:c=>{},
    carbonCar: 0,
    setCarbonCar:c=>{},
    flightBarChartArr: [],
    setFlightBarChartArr: (c:BarChartType[]) => {},
    carsBarChartArr: [],
    setCarsBarChartArr: (c:BarChartType[]) => {},
})

export const useGlobalContext = () => useContext(MyGlobalContext)