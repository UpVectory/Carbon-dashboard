import React, {useContext, useEffect, useState} from "react";
import {CustomAutocomplete, MyGlobalContext} from "../../base";
import {Flights} from "../../../types";
import {BarChartType} from "../../base/ctxProvider/context";
import {apiAirports, getDistanceBetweenAirports, postFlightsTravelEstimate} from "../../../api";


type NewAirportProps = {
    info: Flights,
    flights: Flights[],
    setFlights: (c: Flights[]) => void,
    customFlights: Flights[],
  setCustomFlights: (c: Flights[]) => void,
    style?: {},
}


const iataCodeArray: string[] = []
apiAirports.map((v) => {
    return iataCodeArray.push(`${v.municipality} ${v.iata_code}`)
});

export const NewAirport = ({
                               info,
                               flights,
                               setFlights,
                               setCustomFlights,
                               style,
                           }: NewAirportProps) => {
    const [dep, setDep] = useState('');
    const [arriv, setArriv] = useState('');
    const [distance, setDistance] = useState<number | null>(null);
    const [carbon, setCarbon] = useState<number | null>(null);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

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
            setLoading(true);
            Promise.all([getDistanceBetweenAirports({
                iata_airport_to: dep.substr(dep.length - 3, 3),
                iata_airport_from: arriv.substr(arriv.length - 3, 3),
            }), postFlightsTravelEstimate({
                iata_airport_to: dep.substr(dep.length - 3, 3),
                iata_airport_from: arriv.substr(arriv.length - 3, 3),
            })])
                .then((res) => {
                    setDistance(res[0]!.data!.data!.distance);
                    setCarbon(res[1]!.data!.data!.co2e_kg);
                })
                .catch((err) => {
                    setError(err);
                    console.error('Error:', err);
                })
                .finally(() => setLoading(false));
        }
    }, [dep, arriv]);

    useEffect(() => {
            if (dep && arriv && distance) {
                const addFlights: Flights[] = Object.assign(flights);
                const clearCustFl: Flights[] = [];
                const newFlightBarChartArr: BarChartType[] = Object.assign(flightBarChartArr)

                newFlightBarChartArr.push({
                    carbon: 0,
                    id: +(info.id) - 1,
                    distance: 0
                })

                addFlights.push(
                    {
                        id: info.id,
                        arrival: arriv.substr(arriv.length - 3, 3),
                        carbon: `${carbon && +carbon}`, // add api for getting carbon
                        departure: dep.substr(dep.length - 3, 3),
                        distance: `${distance && +distance}`, // add api for getting distance
                        custom: true
                    }
                )

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
            setFlights,
            distance,
            carbon
        ]
    );

    return (
        <tr style={{...style}}>
            <th>{info.id}</th>
            <td>
                <CustomAutocomplete
                    shouldFocus
                    dataArray={iataCodeArray}
                    id='departureSelect'
                    onSelectValue={onSelectDeparture}
                    label="Enter airport..."
                />

            </td>
            <td>
                <CustomAutocomplete
                    dataArray={iataCodeArray}
                    id='arrivalSelect'
                    onSelectValue={onSelectArrival}
                    label="Enter airport..."
                />
            </td>
            <td>{loading ? 'Loading...' : error ? error.message : 0}</td>
            <td>0</td>
            <td>{loading ? 'Loading...' : error ? error.message : 0}</td>
        </tr>
    )
}