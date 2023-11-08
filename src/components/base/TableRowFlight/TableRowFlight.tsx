import React, {useEffect} from "react";
import {useContext, useState} from "react";
import {MyGlobalContext} from "../ctxProvider";
import {apiAirports} from '../../../api'
import { IconButton } from "@mui/material";
import { ReactComponent as DeleteIcon } from "../../../assets/close.svg";
import { Flights } from "../../../types";
import { CustomNumInput } from "../CustomNumInput";

import styles from "./TableRowFlight.module.scss";

import { getNumbersWithCommaSeparate } from "../../../utils";

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
  isRefresh: boolean;
}

const MemoTableRowFlight = ({item, onDeleteFlight, isRefresh}: TableRowProps) => {
  const {
    length,
    weight,
    carbon,
    setCarbon,
    setCarbonFl,
    carbonFl,
    setFlightBarChartArr,
    flightBarChartArr
  } = useContext(MyGlobalContext);

  const [qtyFlights, setQtyFlights] = useState<number>(flightBarChartArr[+item.id - 1].distance);

  useEffect(() => {
    setQtyFlights(flightBarChartArr[+item.id - 1].distance);
  }, [flightBarChartArr]);

  const handlerChangeAmountFlight = (flights: number) => {
    const newFlightBarChartArr = [...flightBarChartArr].map(flight => {
      if (`${flight.id + 1}` === item.id) {
        return {
          ...flight,
          carbon: +item.carbon * flights,
          distance: flights,
        }
      }

      return flight;
    });

    const carbonFlightsNew = newFlightBarChartArr.reduce((acc, item) => acc + item.carbon, 0);

    if (carbonFlightsNew === carbonFl) {
      setCarbon(carbon);
    }

    if (carbonFlightsNew > carbonFl) {
      setCarbon(carbon + (carbonFlightsNew - carbonFl));
    }

    if (carbonFlightsNew < carbonFl) {
      setCarbon(carbon - (carbonFl - carbonFlightsNew));
    }

    setCarbonFl(carbonFlightsNew);
    setQtyFlights(flights);

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
    <tr className={styles.row}>
      <th>
        {item.id}
      </th>

      <td>
        {`${departure[0].municipality}  (${item.departure})`}
      </td>

      <td>
        {`${arrival[0].municipality}  (${item.arrival})`}
      </td>

      <td>
        {flightDistance}
      </td>

      <td>
        <CustomNumInput
          id={item.id}
          min={0}
          max={99}
          starFrom={qtyFlights}
          onChangeValue={(v) => handlerChangeAmountFlight(v)}
        />
      </td>

      <td className={styles.deleteCell}>
        <span>{getNumbersWithCommaSeparate(carbonWeight)}</span>
        {item.custom && (
          <IconButton
            onClick={() => onDeleteFlight(+item.id)}
            style={{ marginLeft: 0 }}
            aria-label="delete"
            size="small"
            className={styles.deleteButton}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </td>
    </tr>
  )
}

export const TableRowFlight = React.memo(MemoTableRowFlight);
