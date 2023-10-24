import React from "react";
import {useContext, useState} from "react";
import {BarChartType, MyGlobalContext} from "../ctxProvider/context";
import {apiAirports} from '../../../api'
import { IconButton } from "@mui/material";
import { ReactComponent as DeleteIcon } from "../../../assets/close.svg";
import { Flights } from "../../../types";
import { CustomNumInput } from "../CustomNumInput";

import "./TableRowFlight.scss";


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
const MemoTableRowFlight = ({item, flights, setFlights}: TableRowProps) => {
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

  const [qtyFlights, setQtyFlights] = useState<number>(flightBarChartArr[+item.id - 1].distance)

  const increase = () => {

    setQtyFlights(qtyFlights + 1)
    setCarbonFl(carbonFl + (parseInt(item.carbon)))
    setCarbon(carbon + (parseInt(item.carbon)))

    let newFlightBarChartArr: BarChartType[] = Object.assign(flightBarChartArr)
    newFlightBarChartArr.forEach((value, index, array) => {
      if (`${value.id + 1}` === item.id) {
        array[index].carbon = +item.carbon * (qtyFlights + 1);
        array[index].distance += 1;
      }
    });

    setFlightBarChartArr(newFlightBarChartArr)
  }

  const decrease = () => {
      setQtyFlights(qtyFlights - 1)
      setCarbonFl((carbonFl - (parseInt(item.carbon))))
      setCarbon((carbon - (parseInt(item.carbon))))

      let newFlightBarChartArr: BarChartType[] = Object.assign(flightBarChartArr)
      newFlightBarChartArr.forEach((value, index, array):void => {
              if (`${value.id + 1}` === item.id) {
                  array[index].carbon = +item.carbon * (qtyFlights - 1)
                  array[index].distance -= 1
              }
          }
      )
      setFlightBarChartArr(newFlightBarChartArr)
  }

  const handlerDeleteCustomFlight = () => {
    setFlights([...flights].filter(flight => flight.id !== item.id))
    setFlightBarChartArr([...flightBarChartArr].filter(
      flight => flight.id !== (+item.id - 1)
    ))
  }

  const handlerChangeAmountFlight = (flights: number) => {
    setQtyFlights(flights);
    setCarbonFl(carbonFl + (parseInt(item.carbon)));
    setCarbon(carbon + (parseInt(item.carbon)));

    let newFlightBarChartArr: BarChartType[] = Object.assign(flightBarChartArr);
    newFlightBarChartArr.forEach((value, index, array) => {
      if (`${value.id + 1}` === item.id) {
        array[index].carbon = +item.carbon * flights;
        array[index].distance = flights;
      }
    });

    setFlightBarChartArr(newFlightBarChartArr);
  }
 
  const carbonWeight = weight === 'kg'
    ? Math.round((+item.carbon * qtyFlights))
    : Math.round((+item.carbon * 2.20462 * qtyFlights));

  const departure = apiAirports.filter((v) => v.iata_code === item.departure);
  const arrival = apiAirports.filter((v) => v.iata_code === item.arrival);

    // return <tr>
    //     <th>{item.id}</th>
    //     <td>{`${departure[0].municipality}  (${item.departure})`}</td>
    //     <td>{`${arrival[0].municipality}  (${item.arrival})`}</td>
    //     <td>{length === 'km' ? item.distance : `${(+item.distance * 0.621371).toFixed(2)}`}</td>
    //     <td>
    //         <span className={'input'}>
    //             <button disabled={qtyFlights <= 0} onClick={decrease}>-</button>
    //             {/*<input type="number"  value={qtyFlights}/>*/}
    //             <TextField
    //                 variant="standard"
    //                 sx={{
    //                     border: 'none',
    //                     width: '20px',
    //                     textAlign: 'center',
    //                     '& .MuiInputBase-root': {
    //                         '&:after': {
    //                             borderBottom: 'none'
    //                         },
    //                         '&:before': {
    //                             borderBottom: 'none'
    //                         }
    //                     }
    //             }}
    //                 onChange={(event) => {
    //                     setQtyFlights(+event.target.value)
    //                     setCarbon(carbon)
    //                 }}
    //                 type={"number"}
    //                 value={qtyFlights}
    //             />
    //             <button disabled={qtyFlights >= 99} onClick={increase}>+</button>
    //         </span>
    //     </td>
    //     <td style={{position: "relative"}}>{weight === 'kg' ? `${(+item.carbon * qtyFlights).toFixed(2)}` : `${(+item.carbon * 2.20462 * qtyFlights).toFixed(2)}`}
    //         {item.custom && <span style={{
    //             position: "absolute",
    //             top: 0,
    //             bottom: 0,
    //             right: '-60px'

    //         }}><Button onClick={() => {
    //             const fliIdexDash = flights.findIndex((v) => {
    //                 return v.id === item.id
    //             })
    //             const fliIndexBarChart = flightBarChartArr.findIndex((v) => v.id === (+item.id - 1))

    //             const updFl: Flights[] = Object.assign(flights)
    //             const updFlBar: BarChartType[] = Object.assign(flightBarChartArr)

    //             updFl.splice(fliIdexDash, 1)
    //             flightBarChartArr.splice(fliIndexBarChart, 1)

    //             setFlights(updFl)
    //             setFlightBarChartArr(updFlBar)

    //         }} variant={"outlined"} style={{
    //             width: '20px',
    //             padding: 0,
    //             height: '100%',
    //         }}>x1</Button></span>}
    //     </td>
    // </tr>
  return (
    <tr className="table-row-flight">
      <th className="table-row-flight__item table-row-flight__item--head">
        {item.id}
      </th>
      <td className="table-row-flight__item">
        {`${departure[0].municipality}  (${item.departure})`}
      </td>
      <td className="table-row-flight__item">
        {`${arrival[0].municipality}  (${item.arrival})`}
      </td>
      <td className="table-row-flight__item">
        {length === 'km' ? item.distance : `${(+item.distance * 0.621371).toFixed(2)}`}
      </td>
      <td className="table-row-flight__item">
        <CustomNumInput
          id={item.id}
          min={0}
          max={99}
          starFrom={0}
          onChangeValue={(v) => handlerChangeAmountFlight(v)}
        />
        
      </td>
      <td className="table-row-flight__item table-row-flight__item--delete">
        <span>{carbonWeight}</span>
        {item.custom && (
          <IconButton
            onClick={() => handlerDeleteCustomFlight()}
            style={{ marginLeft: 0 }}
            aria-label="delete"
            size="small"
            className="table-row-flight__delete"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </td>
    </tr>
  )
}

export const TableRowFlight = React.memo(MemoTableRowFlight);
