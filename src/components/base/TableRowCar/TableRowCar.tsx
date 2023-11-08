import React, { useState, useContext, useEffect } from 'react';

import { MyGlobalContext } from '../ctxProvider';

import {
  getNumbersWithCommaSeparate, getWeightByLength,
} from '../../../utils';

import { Cars } from '../../../types';

import styles from './TableRowCar.module.scss';
import { carsIcons } from '../../../assets/car-icons';
import { CustomTextInput } from '../CustomTextInput';
import { CustomSelect } from '../CustomSelect';

enum FuelType {
  gas = 'gas',
  diesel = 'diesel',
}

type Props = {
  item: Cars,
};

const MemoTableRowCar: React.FC<Props> = ({
  item,
}) => {
  const {
    weight,
    carbon,
      length,
    carbonCar,
    setCarbon,
    setCarbonCar,
    setCarsBarChartArr,
    carsBarChartArr,
  } = useContext(MyGlobalContext);

  const { id, type } = item;
  const [fuel, setFuel] = useState<FuelType>(FuelType.gas);
  const [distance, setDistance] = useState<number>(carsBarChartArr[+item.id - 1].distance);
  const fuelKeys = Object.keys(FuelType).map(key => key as keyof typeof FuelType);
  const carbonCur = fuel === FuelType.gas ? item.gasCarbon : item.dieselCarbon;
  const carDistance = getNumbersWithCommaSeparate(Math.ceil(distance))
  const carbonWeight = weight === 'kg'
      ? Math.round((carbonCur * +getWeightByLength(length, distance)))
      : Math.round((carbonCur * 2.20462 * +getWeightByLength(length, distance)));

  useEffect(() => {
    setDistance(carsBarChartArr[+item.id - 1].distance)
  }, [carsBarChartArr])

  const handleChangeDistance = (v: string) => {
    const valueDistance = +v.replace(/\D/g, '');
    setDistance(valueDistance);

    const newCarsBarChartArr = [...carsBarChartArr].map((car, index, array) => {
      if (car.id + 1 === item.id) {
        array[index].carbon = carbonCur * valueDistance;
        array[index].distance = valueDistance;
      }

      return car;
    })

    setCarsBarChartArr(newCarsBarChartArr)
  }

  const handleChangeFuel = (type: FuelType) => {
    setFuel(type);
    const carbonCoef = type === FuelType.gas ? item.gasCarbon : item.dieselCarbon;

    const newCarsBarChartArr = [...carsBarChartArr].map((car, index, array) => {
      if (car.id + 1 === item.id) {
        array[index].carbon = carbonCoef * +getWeightByLength(length, distance);
      }

      return car;
    });

    setCarsBarChartArr(newCarsBarChartArr);
  }

  const findIcon = (key: string) => {
    const formattedKey = key.replace(/-/g, '').toLowerCase();

    switch (formattedKey) {
      case "asegment":
        return carsIcons.asegment;
      case "bsegment":
        return carsIcons.bsegment;
      case "csegment":
        return carsIcons.csegment;
      case "dsegment":
        return carsIcons.dsegment;
      case "esegment":
        return carsIcons.esegment;
      case "fsegment":
        return carsIcons.fsegment;
      case "sportscar":
        return carsIcons.sportscar;
      default:
        return carsIcons.offroad;
    }
  }

  const TypeIcon = findIcon(type);

  useEffect(() => {
    const totalCarbonCars = +getWeightByLength(length ,carsBarChartArr.reduce((total, item) => total + item.carbon, 0))
    if (totalCarbonCars === carbonCar) {
      return
    }

    if (totalCarbonCars > carbonCar) {
      setCarbon(carbon + (totalCarbonCars - carbonCar));
    }

    if (totalCarbonCars < carbonCar) {
      setCarbon(carbon - (carbonCar - totalCarbonCars));
    }

    setCarbonCar(totalCarbonCars);

  }, [distance, fuel, carbonCar, carbon, carsBarChartArr, length, setCarbon, setCarbonCar, setCarsBarChartArr]);

  return (
    <tr className={styles.TableRowCar}>
      <th>{id}</th>
      <td>
        <TypeIcon />
        <p>{type}</p>
      </td>
      <td>
        <CustomSelect
          selectedValue={fuel}
          values={fuelKeys}
          onSelectValue={(fuelType) => handleChangeFuel(fuelType as FuelType)}
        />
      </td>
      <td>
        <CustomTextInput
          placeholderText='Enter distance...'
          value={carDistance}
          onChangeValue={handleChangeDistance}
        />
      </td>
      <td>{getNumbersWithCommaSeparate(carbonWeight)}</td>
    </tr>
  );
};

export const TableRowCar = React.memo(MemoTableRowCar);
