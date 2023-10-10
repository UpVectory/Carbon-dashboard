import {useContext, useState} from "react";
import {BarChartType, MyGlobalContext} from "./ctxProvider/context";
import {apiAirports} from '../../api'
import {Button} from "@mui/material";
import {Flights} from "../../types";

type TableRowProps = {
    item: {
        id: string
        departure: string
        arrival: string
        distance: string
        carbon: string
        custom?: boolean
    }
    flights: Flights[],
    setFlights: (c: Flights[]) => void
}
export const TableRowFlight = ({item, flights, setFlights}: TableRowProps) => {
    const {
        length,
        weight,
        carbon,
        setCarbon,
        setCarbonFl,
        carbonFl,
        setFlightBarChartArr,
        flightBarChartArr
    } = useContext(MyGlobalContext)

    const [qtyFlights, setQtyFlights] = useState<number>(flightBarChartArr[+item.id-1].distance)


    const increase = () => {

        setQtyFlights(qtyFlights + 1)
        setCarbonFl(carbonFl + (parseInt(item.carbon)))
        setCarbon(carbon + (parseInt(item.carbon)))

        let newFlightBarChartArr: BarChartType[] = Object.assign(flightBarChartArr)
        newFlightBarChartArr.map((value, index, array) => {
                if (`${value.id + 1}` === item.id) {
                    array[index].carbon = +item.carbon * (qtyFlights + 1)
                    array[index].distance += 1

                }
            }
        )
        setFlightBarChartArr(newFlightBarChartArr)
    }
    const decrease = () => {
        setQtyFlights(qtyFlights - 1)
        setCarbonFl((carbonFl - (parseInt(item.carbon))))
        setCarbon((carbon - (parseInt(item.carbon))))

        let newFlightBarChartArr: BarChartType[] = Object.assign(flightBarChartArr)
        newFlightBarChartArr.map((value, index, array) => {
                if (`${value.id + 1}` === item.id) {
                    array[index].carbon = +item.carbon * (qtyFlights - 1)
                    array[index].distance -= 1
                }
            }
        )
        setFlightBarChartArr(newFlightBarChartArr)
    }

    const departure = apiAirports.filter((v) => v.iata_code === item.departure)
    const arrival = apiAirports.filter((v) => v.iata_code === item.arrival)

    console.log(flightBarChartArr)
    return <tr>
        <th>{item.id}</th>
        <th>{`${departure[0].municipality} / ${item.departure}`}</th>
        <th>{`${arrival[0].municipality} / ${item.arrival}`}</th>
        <th>{length === 'km' ? item.distance : `${(+item.distance * 0.621371).toFixed(2)}`}</th>
        <th>
            <button disabled={qtyFlights <= 0} onClick={decrease}>-</button>
            <input type="number" onChange={(event) => {
                setQtyFlights(+event.target.value)
                setCarbon(carbon)
            }} value={qtyFlights}/>
            <button disabled={qtyFlights >= 99} onClick={increase}>+</button>
        </th>
        <th style={{position: "relative"}}>{weight === 'kg' ? `${(+item.carbon * qtyFlights).toFixed(2)}` : `${(+item.carbon * 2.20462 * qtyFlights).toFixed(2)}`}
            {item.custom && <span style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: '-60px'

            }}><Button onClick={() => {
                const fliIdexDash = flights.findIndex((v) => {
                    console.log('v: ',v)
                    console.log('item: ',item)
                    return v.id === item.id
                })
                const fliIndexBarChart = flightBarChartArr.findIndex((v) => v.id === (+item.id-1))

                const updFl:Flights[] = Object.assign(flights)
                const updFlBar:BarChartType[] = Object.assign(flightBarChartArr)

                updFl.splice(fliIdexDash , 1)
                flightBarChartArr.splice(fliIndexBarChart,1)

                setFlights(updFl)
                setFlightBarChartArr(updFlBar)

            }} variant={"outlined"} style={{
                width: '20px',
                padding: 0,
                height: '100%',

            }}>x</Button></span>}</th>
    </tr>
}