import React, {useContext, useState} from 'react';
import {
    MyGlobalContext,
    TableRowFlight,
    CustomButtonPrimary,
    CustomButtonSecondary,
} from "../../components/base";
import {
    Layout,
    TreeOffsets,
    BarChart,
    TableScore,
    TableScoreCaption,
    TableScoreContentTable,
    TableScoreContentTableHead,
    TableScoreContentTableBody,
    Dashboard,
    DashboardTable,
    DashboardGraph,
    DashboarScoreboard,
    NewAirport,
} from "../../components/modules";
import {Flights} from "../../types";
import data from '../../data/popular-flights.json'
import { ReactComponent as RefreshIcon } from "../../assets/refresh-outline_1.svg";

import './Plane.scss';
import { Link, Stack } from '@mui/material';

export const Plane = () => {
    const {
        length,
        weight,
        carbon,
        setCarbon,
        carbonFl,
        setCarbonFl,
        flightBarChartArr,
        setFlightBarChartArr,
    } = useContext(MyGlobalContext)
    const [flights, setFlights] = useState<Flights[]>(data.flights);
    const [qtyAir, setQtyAir] = useState<number>(0)
    const [customFlights, setCustomFlights] = useState<Flights[]>([]);

    const AddNewHandleClick = () => {
        const newFlight = {
            id: `${flights.length + customFlights.length + 1}`,
            departure: '',
            arrival: '',
            distance: '0',
            carbon: '0',
        }

        setCustomFlights(currentCustomFlights => [
            ...currentCustomFlights,
            newFlight,
        ]);

        setQtyAir(qtyAir + 1);
    }

    const deleteFlight = (idx: number) => {
        setFlights([...flights].filter(flight => +flight.id !== idx));
        setFlightBarChartArr([...flightBarChartArr].filter(bar => bar.id !== (idx - 1)));
    }

    const refreshCustomHandleClick = () => {
        setCarbon(carbon-carbonFl);
        setCarbonFl(0);
        setFlightBarChartArr([...flightBarChartArr]
            .filter(flight => flight.id <= 9)
            .map(flight => {
            return {
                ...flight,
                distance: 0,
                carbon: 0,
            }
        }));
        setFlights(currentFlights => [...currentFlights]
            .map(flight => ({
                ...flight,
                amount: 0,
            }))
            .filter(flight=>!flight.custom)
        );
    }

    return (
        <Layout>
            <Dashboard>
                <DashboardTable>
                    <TableScore className='plane'>
                        <TableScoreCaption>
                            <h2>
                                Fill up your flights
                            </h2>
                            <Stack direction='row' height={46}>
                                <CustomButtonSecondary
                                    variant="outlined"
                                    onClick={refreshCustomHandleClick}
                                >
                                    <RefreshIcon/>
                                </CustomButtonSecondary>

                                <CustomButtonPrimary
                                    onClick={AddNewHandleClick}
                                    disabled={customFlights.length > 0 || flights.length >= 15}
                                    variant="outlined"
                                    className="button-primary"
                                >
                                    Add new
                                </CustomButtonPrimary>
                            </Stack>
                        </TableScoreCaption>

                        <TableScoreContentTable>
                            <TableScoreContentTableHead>
                                <tr>
                                    <th>#</th>
                                    <th>Departure</th>
                                    <th>Arrival</th>
                                    <th>Distance, {length}</th>
                                    <th>Amount</th>
                                    <th>Carbon, {weight}</th>
                                </tr>
                            </TableScoreContentTableHead>

                            <TableScoreContentTableBody>
                                {flights.map((flight, index) => (
                                    <TableRowFlight
                                        flights={flights}
                                        item={flight}
                                        onDeleteFlight={(idx) => deleteFlight(idx)}
                                        key={index}
                                        
                                    />
                                ))}
                                {customFlights.map((v) => (
                                  <NewAirport
                                      className='plane--new'
                                      flights={flights}
                                      setFlights={(v) => setFlights(v)}
                                      customFlights={customFlights}
                                      setCustomFlights={(v) => setCustomFlights(v)}
                                      info={v}
                                      key={v.id}
                                  />
                                ))}
                            </TableScoreContentTableBody>

                        </TableScoreContentTable>
                    </TableScore>
                    <Link
                      href="https://en.wikipedia.org/wiki/List_of_busiest_passenger_air_routes"
                      sx={{
                        position: 'absolute',
                        left: 29,
                        bottom: -8,
                        transform: 'translateY(100%)',
                        display: {
                          xs: 'none',
                          md: 'block',
                        },
                        fontSize: 10,
                        lineHeight: 1.4,
                        fontWeight: 400,
                        color: '#61463A',
                      }}
                      target="_blank"
                      rel="noopener"
                    >
                      List of busiest passenger air routes on Wikipedia
                    </Link>
                </DashboardTable>
                <DashboardGraph>
                  <BarChart data={flightBarChartArr} label={'Your carbon emission per flight'} />
                </DashboardGraph>
                <DashboarScoreboard>
                    <TreeOffsets carbon={carbonFl}/>
                </DashboarScoreboard>
            </Dashboard>
        </Layout>
    )
}