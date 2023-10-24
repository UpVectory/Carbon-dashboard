import React, { useContext, useEffect, useState } from 'react';
import { MyGlobalContext, TableRowFlight } from "../../components/base";
import { Layout, TreeOffsets, BarChart } from "../../components/modules";
import { Autocomplete, TextField } from "@mui/material";
import { apiAirports } from '../../api'
import { Flights } from "../../types";
import { BarChartType} from "../../components/base/ctxProvider/context";
import data from '../../data/popular-flights.json'
import { ReactComponent as RefreshIcon } from "../../assets/refresh-outline_1.svg";
import { TableScore } from '../../components/modules/TableScore';
import {
  CustomButtonPrimary,
  CustomButtonSecondary,
} from '../../components/base/CustomButtons';

import { CustomDropdown } from '../../components/base/CustomDropdown';

import './Plane.scss';

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

  const AddNewHandleClick = () => {
    const newFlight = {
      id: `${flights.length + customFlights.length + 1}`,
      departure: '',
      arrival: '',
      distance: '0',
      carbon: '0'
    }

    setCustomFlights(currentCustomFlights => [
      ...currentCustomFlights,
      newFlight,
    ]);
  
    setQtyAir(qtyAir + 1);
  }

  const refreshCustomHandleClick = () => {
    setFlights(currentFlights => [...currentFlights].filter(flight => !flight.custom ))
  }

  return (
    <Layout>
      <section className="dashboard">
        <div className="dashboard__container">
          <div className="dashboard__table dashboard__item">
            <TableScore>
              <div className="table-score__wrapper">
                <div className="table-score__caption">
                  <h2 className="table-score__caption-title">
                    Fill up your flights
                  </h2>
                  <div className="table-score__actions">
                    <CustomButtonSecondary
                      variant="outlined"
                      onClick={refreshCustomHandleClick}
                    >
                      <RefreshIcon />
                    </CustomButtonSecondary>

                    <CustomButtonPrimary
                      onClick={AddNewHandleClick}
                      disabled={customFlights.length > 0 || flights.length >= 15}
                      variant="outlined"
                      className="button-primary"
                    >
                      Add new
                    </CustomButtonPrimary>

                  </div>
                </div>
                <table className="table-score__table">
                  <thead className="table-score__head">
                    <tr className="table-score__row table-score__row--head">
                      <th>#</th>
                      <th>Departure</th>
                      <th>Arrival</th>
                      <th>Distance, {length}</th>
                      <th>Amount</th>
                      <th>Carbon, {weight}</th>
                    </tr>
                  </thead>
                  <tbody className='table-score__body'>
                    {flights.map((flight, index) => (
                      <TableRowFlight
                        setFlights={(v) => setFlights(v)}
                        flights={flights}
                        item={flight}
                        key={index}
                      />
                    ))}
                    {customFlights.map((v) => (
                      <NewAirport
                        flights={flights}
                        setFlights={(v) => setFlights(v)}
                        customFlights={customFlights}
                        setCustomFlights={(v) => setCustomFlights(v)}
                        info={v}
                        key={v.id}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </TableScore>
          </div>

          <div className="dashboard__graph">
            <BarChart data={flightBarChartArr}/>
          </div>

          <div className="dashboard__scoreboard">
            <TreeOffsets carbon={carbonFl} />
          </div>
        </div>
      </section>
    </Layout>
  )
}


const NewAirport = ({
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