import React, {useContext, useEffect, useState} from "react";
import {CustomDropdown, MyGlobalContext} from "../../base";
import {Flights} from "../../../types";
import {BarChartType} from "../../base/ctxProvider/context";
import {apiAirports} from "../../../api";

type NewAirportProps = {
    info: Flights,
    flights: Flights[],
    setFlights: (c: Flights[]) => void,
    customFlights: Flights[],
    setCustomFlights: (c: Flights[]) => void,
}


const iataCodeArray: string[] = []
apiAirports.map((v) => {
    return iataCodeArray.push(`${v.municipality} ${v.iata_code}`)
});

export const NewAirport = ({
                               info,
                               flights,
                               setFlights,
                               setCustomFlights
                           }: NewAirportProps) => {
    const [dep, setDep] = useState('');
    const [arriv, setArriv] = useState('');
    const {
        setFlightBarChartArr,
        flightBarChartArr
    } = useContext(MyGlobalContext);

    const onSelectDeparture = (val: string) => {
        if (val) {
            setDep(val);
        }
    }

    const onSelectArrival = (val: string) => {
        if (val) {
            setArriv(val);
        }
    }


    useEffect(() => {
            if (dep && arriv) {
                const addFlights: Flights[] = Object.assign(flights);
                const clearCustFl: Flights[] = [];
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
        },
        [
            dep,
            arriv,
            flightBarChartArr,
            flights,
            info.id,
            setCustomFlights,
            setFlightBarChartArr,
            setFlights
        ]
    );

    return (
        <tr className="table-score__new">
            <th>{info.id}</th>
            <td className="table-score__new-select">
                <CustomDropdown
                    dataArray={iataCodeArray}
                    id='combo-box-demo'
                    onSelectValue={onSelectDeparture}
                    label="Departure"
                />

            </td>
            <td className="table-score__new-select">
                <CustomDropdown
                    dataArray={iataCodeArray}
                    id='combo-box-demo'
                    onSelectValue={onSelectArrival}
                    label="Arrival"
                />
            </td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
    )
}