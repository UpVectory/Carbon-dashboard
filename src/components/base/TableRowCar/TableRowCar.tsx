import React, { useState, useContext, useEffect } from 'react';

import { MyGlobalContext } from '../ctxProvider/context';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';

import {
  getNumbersWithCommaSeparate,
} from '../../../utils';

import { Cars } from '../../../types';

import styles from './TableRowCar.module.scss';
import { carsIcons } from '../../../assets/car-icons';

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
    length,
    carbon,
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

  const handleChangeDistance = (v: React.ChangeEvent<HTMLInputElement>) => {
    const valueDistance = +v.target.value.replace(/\D/g, '');
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
        array[index].carbon = carbonCoef * distance;
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
    const totalCarbonCars = carsBarChartArr.reduce((total, item) => total + item.carbon, 0);
    const totalCarbon = carbon + totalCarbonCars;
    setCarbonCar(totalCarbonCars);
    setCarbon(totalCarbon);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distance, fuel]);

  const carbonWeight = weight === 'kg'
    ? Math.round((carbonCur * distance))
    : Math.round((carbonCur * 2.20462 * distance));
  
  const carDistance = length === 'km'
    ? getNumbersWithCommaSeparate(Math.ceil(distance))
    : getNumbersWithCommaSeparate(Math.ceil(distance * 0.621371));

  return (
    <tr className={styles.TableRowCar}>
      <th>{id}</th>
      <td>
        <TypeIcon />
        <p>{type}</p>
      </td>
      <td>
        <FormControl fullWidth size="small">
          <Select
            value={fuel}
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={e => handleChangeFuel(e.target.value as FuelType)}
            sx={{
              color: '#61463A',
              fontWeight: 500,

              '& fieldset': {
                border: '1px solid #ECF5ED',
                borderRadius: '8px',
                transition: 'all .3s ease',
              },

              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#61B766',
              },

              '& .MuiInputBase-input:hover ~ fieldset': {
                borderColor: '#61B766',
              },
            }}
          >
            {fuelKeys.map(keyFuel => (
              <MenuItem
                value={keyFuel}
                key={keyFuel}
              >
                {keyFuel}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </td>
      <td>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Enter distance..."
          value={distance ? carDistance : ''}
          onChange={handleChangeDistance}
          type="text"
          sx={{
            '& fieldset': {
              border: '1px solid #ECF5ED',
              borderRadius: '8px',
              transition: 'all .3s ease',
            },
            '& .MuiInputBase-root': {
              color: '#61463A',
            },
            
            '& .MuiInputBase-root:hover fieldset': {
              borderColor: '#61B766',
            },
            '& .MuiInputBase-root.Mui-focused fieldset': {
              borderColor: '#61B766',
            }
          }}
        />
      </td>
      <td>{getNumbersWithCommaSeparate(carbonWeight)}</td>
    </tr>
  );
};

export const TableRowCar = React.memo(MemoTableRowCar);
