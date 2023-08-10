import * as React from "react";
import {ReactNode, useState} from "react";
import {BarChartType, Length, MyGlobalContext, Weight} from "./context";
import data from '../../../data/popular-flights.json'

const {flights} = data

let flightsCarbon:BarChartType[]=[];
flights.map((f, i )=>{
    if (flightsCarbon.findIndex(({id})=>id===i)<0) {
        flightsCarbon.push({
            id: i,
            carbon: 0
        })
    }
})

interface LayoutProps {
    children: ReactNode
}


export const CtxProvider = ({children} : LayoutProps) => {
    const [length, setLength] = useState<Length>("km");
    const [weight, setWeight] = useState<Weight>("kg");
    const [carbon, setCarbon] = useState<number>(0);
    const [carbonFl, setCarbonFl] = useState<number>(0);
    const [carbonCar, setCarbonCar] = useState<number>(0);
    const [flightBarChartArr, setFlightBarChartArr] = useState<BarChartType[]>(flightsCarbon);
    return (
        <MyGlobalContext.Provider
            value={{
                length,
                setLength,
                weight,
                setWeight,
                carbon,
                setCarbon,
                carbonFl,
                carbonCar,
                setCarbonFl,
                setCarbonCar,
                flightBarChartArr,
                setFlightBarChartArr
            }}
        >
            {children}
        </MyGlobalContext.Provider>
    );
};