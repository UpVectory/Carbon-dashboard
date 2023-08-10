import {useContext, useState} from "react";
import {BarChartType, MyGlobalContext} from "./ctxProvider/context";

type TableRowProps = {
    item: {
        id: string
        departure: string
        arrival: string
        distance: string
        carbon: string
    }
}
export const TableRow = ({item}: TableRowProps) => {


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

    const [qtyFlights, setQtyFlights] = useState<number>(0)


    const increase = () => {
        setQtyFlights(qtyFlights + 1)
        setCarbonFl(carbonFl + (parseInt(item.carbon)))
        setCarbon(carbon + (parseInt(item.carbon)))

        let newFlightBarChartArr: BarChartType[] = Object.assign(flightBarChartArr)
        newFlightBarChartArr.map((value, index, array) => {
                if (`${value.id + 1}` === item.id) {
                    array[index].carbon = +item.carbon * (qtyFlights+1)
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
                    array[index].carbon = +item.carbon * (qtyFlights-1)
                }
            }
        )
        setFlightBarChartArr(newFlightBarChartArr)
    }


    return <tr>
        <th>{item.id}</th>
        <th>{item.departure}</th>
        <th>{item.arrival}</th>
        <th>{length === 'km' ? item.distance : `${(+item.distance * 0.621371).toFixed(2)}`}</th>
        <th>
            <button disabled={qtyFlights <= 0} onClick={decrease}>-</button>
            <input type="number" onChange={(event) => {
                setQtyFlights(+event.target.value)
                setCarbon(carbon)
            }} value={qtyFlights}/>
            <button disabled={qtyFlights >= 99} onClick={increase}>+</button>
        </th>
        <th>{weight === 'kg' ? `${(+item.carbon * qtyFlights).toFixed(2)}` : `${(+item.carbon * 2.20462 * qtyFlights).toFixed(2)}`}</th>
    </tr>
}