import {useContext, useEffect, useState} from "react";
import {BarChartType, MyGlobalContext} from "./ctxProvider/context";
import {Cars} from "../../types";

type TableRowProps = {
    item: Cars,
    key: number
}

export const TableRowCars = ({item, key}: TableRowProps) => {
    const {
        weight,
        setCarbon,
        setCarbonCar,
        setCarsBarChartArr,
        carsBarChartArr,
        flightBarChartArr
    } = useContext(MyGlobalContext)
    const [distance, setDistance] = useState<number>(carsBarChartArr[item.id-1].distance)
    const [curFuelType, setCurFuelType] = useState<string>('gas')
    const carbonCur = curFuelType === 'gas' ? item.gasCarbon : item.dieselCarbon

    useEffect(()=>{
        let flCarbonSum:number = 0
        let carbonSum:number=0
        flightBarChartArr.map(v=>flCarbonSum+=v.carbon)
        carsBarChartArr.map(v=>carbonSum+=v.carbon)
        setCarbon(flCarbonSum + carbonSum)
        setCarbonCar(carbonSum)
    },[distance, curFuelType, carsBarChartArr , flightBarChartArr , setCarbon , setCarbonCar])

    const handleInputChange = (dis:number) => {
        setDistance(dis)
        let newCarsBarChartArr: BarChartType[] = Object.assign(carsBarChartArr)
        // eslint-disable-next-line array-callback-return
        newCarsBarChartArr.map((value, index, array) => {
                if (value.id + 1 === item.id) {
                    array[index].carbon = carbonCur*dis
                    array[index].distance = dis
                }
            }
        )
        setCarsBarChartArr(newCarsBarChartArr)
    }

    const handleSelectChange = (val: string) => {
        setCurFuelType(val)
        let newCarsBarChartArr: BarChartType[] = Object.assign(carsBarChartArr)
        // eslint-disable-next-line array-callback-return
        newCarsBarChartArr.map((value, index, array) => {
                if (value.id + 1 === item.id) {
                    array[index].carbon = carbonCur*distance
                }
            }
        )
        setCarsBarChartArr(newCarsBarChartArr)
    }
    return <tr key={key}>
        <th>{item.id}</th>
        <th>{item.type}</th>
        <th>
            <select onChange={(e) => {
                handleSelectChange(e.target.value)
            }} name="fuel type" id="">
                <option value="gas">gas</option>
                <option value="diesel">diesel</option>
            </select>
        </th>
        <th>
            <input type="number" onChange={(event) => {
                handleInputChange(+event.target.value)
            }} value={distance}/>
        </th>
        <th style={{position: "relative"}}>
            {weight === 'kg' ? `${(carbonCur * distance).toFixed(2)}` : `${(carbonCur * 2.20462 * distance).toFixed(2)}`}
        </th>
    </tr>
}