import {Layout} from "../components/modules";
import data from '../data/popular-flights.json'
import {useContext, useEffect, useState} from "react";
import {MyGlobalContext} from "../components/base";
import {TableRowFlight} from "../components/base";
import {TreeOffsets} from "../components/modules";
import {BarChart} from "../components/modules";
import {Autocomplete, Button, TextField} from "@mui/material";
import {apiAirports} from '../api'
import {Flights} from "../types";
import {BarChartType} from "../components/base/ctxProvider/context";

const iataCodeArray: string[] = []
apiAirports.map((v) => {
    return iataCodeArray.push(`${v.municipality} ${v.iata_code}`)
})

type NewAirportProps = {
    info: Flights,
    flights: Flights[],
    setFlights: (c: Flights[]) => void,
    customFlights: Flights[],
    setCustomFlights: (c: Flights[]) => void,
}

export const Plane = () => {
    const {length, weight, carbonFl, flightBarChartArr} = useContext(MyGlobalContext)
    const [flights, setFlights] = useState<Flights[]>(data.flights)
    const [qtyAir, setQtyAir] = useState<number>(0)
    const [customFlights, setCustomFlights] = useState<Flights[]>([])

    function AddNewHandleClick() {
        const newFL = customFlights
        newFL.push({
            id: `${flights.length + customFlights.length + 1}`,
            departure: '',
            arrival: '',
            distance: '0',
            carbon: '0'
        })
        setCustomFlights(newFL)
        setQtyAir(qtyAir + 1)
    }

    return <Layout>
        <div><Button disabled={customFlights.length > 0 || flights.length >= 15} onClick={AddNewHandleClick}
                     variant={'outlined'}>Add New+</Button></div>
        <section style={{display: "flex"}}>
            <div style={{width: '60%'}}>
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Distance, {length}</th>
                        <th>Amount</th>
                        <th>Carbon, {weight}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {flights.map((flight, index) => {
                        return <TableRowFlight setFlights={(v) => setFlights(v)} flights={flights} item={flight}
                                               key={index}/>
                    })}
                    {customFlights.map((v) => {
                        return <NewAirport
                            flights={flights}
                            setFlights={(v) => setFlights(v)}
                            customFlights={customFlights}
                            setCustomFlights={(v) => setCustomFlights(v)}
                            info={v}
                            key={v.id}/>
                    })}
                    </tbody>
                </table>
            </div>
            <div style={{width: '40%'}}>
                <BarChart data={flightBarChartArr}/>
                <TreeOffsets carbon={carbonFl}/>
            </div>
        </section>
    </Layout>
}


const NewAirport = ({
                        info,
                        flights,
                        setFlights,
                        setCustomFlights
                    }: NewAirportProps) => {

    const [dep, setDep] = useState('')
    const [arriv, setArriv] = useState('')
    const {
        setFlightBarChartArr,
        flightBarChartArr
    } = useContext(MyGlobalContext)


    useEffect(() => {
        if (dep && arriv) {
            const addFlights: Flights[] = Object.assign(flights)
            const clearCustFl: Flights[] = []
            addFlights.push(
                {
                    id: info.id,
                    arrival: arriv.substr(arriv.length - 3, 3),
                    carbon: `${10 * (+info.id)}`, // add api for getting carbon
                    departure: dep.substr(dep.length - 3, 3),
                    distance: `${10 * (+info.id)}`, // add api for getting distance
                    custom: true
                }
            )

            let newFlightBarChartArr: BarChartType[] = Object.assign(flightBarChartArr)
            newFlightBarChartArr.push({
                carbon: 0,
                id: +(info.id) - 1,
                distance: 0
            })
            setFlightBarChartArr(newFlightBarChartArr)
            setCustomFlights(clearCustFl)
            setFlights(addFlights)
        }
    }, [dep, arriv, flightBarChartArr, flights, info.id, setCustomFlights, setFlightBarChartArr, setFlights])
    return <tr>
        <th>{info.id}</th>
        <th>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={iataCodeArray}
                sx={{width: 150}}
                onChange={(e: any) => {
                    const validate = (value: string) => {
                        if (iataCodeArray.findIndex((v) => v === value) >= 0) {
                            return value
                        } else return ''

                    }
                    setDep(validate(e.target.innerHTML))
                }}
                renderInput={(params) => <TextField {...params} label="Departure"/>}
            />
        </th>
        <th>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={iataCodeArray}
                sx={{width: 150}}
                onChange={(e: any) => {
                    setArriv(e.target.innerHTML)
                }}
                renderInput={(params) => <TextField {...params} label="Arrival"/>}
            />
        </th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
    </tr>
}