import React from "react";
import {useContext, useState} from "react";
import {BarChartType, MyGlobalContext} from "../ctxProvider/context";
import {apiAirports} from '../../../api'
import { IconButton } from "@mui/material";
import { ReactComponent as DeleteIcon } from "../../../assets/close.svg";
import { Flights } from "../../../types";
import { CustomNumInput } from "../CustomNumInput";

import "./TableRowFlight.scss";

import { getNumbersWithCommaSeparate } from "../../../utils/utils";

type TableRowProps = {
  item: {
    id: string,
    departure: string,
    arrival: string,
    distance: string,
    carbon: string,
    custom?: boolean,
  };
  flights: Flights[];
  onDeleteFlight: (idx: number) => void;
}

const MemoTableRowFlight = ({item, onDeleteFlight}: TableRowProps) => {
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

  const [qtyFlights, setQtyFlights] = useState<number>(flightBarChartArr[+item.id - 1].distance);

  const handlerChangeAmountFlight = (flights: number) => {
  
    if (flights > qtyFlights) {
      setCarbonFl(carbonFl + (parseInt(item.carbon)));
      setCarbon(carbon + (parseInt(item.carbon)));
    }

    if (flights < qtyFlights) {
      setCarbonFl(carbonFl - (parseInt(item.carbon)));
      setCarbon(carbon - (parseInt(item.carbon)));
    }

    setQtyFlights(flights);

    let newFlightBarChartArr: BarChartType[] = Object.assign(flightBarChartArr);
    newFlightBarChartArr.forEach((value, index, array) => {
      if (`${value.id + 1}` === item.id) {
        array[index].carbon = +item.carbon * flights;
        array[index].distance = flights;
      }
    });

    setFlightBarChartArr(newFlightBarChartArr);
  }

  const flightDistance = length === 'km'
    ? getNumbersWithCommaSeparate(Math.ceil(+item.distance))
    : getNumbersWithCommaSeparate(Math.ceil(+item.distance * 0.621371));
 
  const carbonWeight = weight === 'kg'
    ? Math.round((+item.carbon * qtyFlights))
    : Math.round((+item.carbon * 2.20462 * qtyFlights));

  const departure = apiAirports.filter((v) => v.iata_code === item.departure);
  const arrival = apiAirports.filter((v) => v.iata_code === item.arrival);


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
        {flightDistance}
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
            onClick={() => onDeleteFlight(+item.id)}
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
