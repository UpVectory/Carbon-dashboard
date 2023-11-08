import React from 'react';
import { useContext, useEffect, useRef, useState} from 'react';
import { clsx } from 'clsx';
import { BarChartType, MyGlobalContext } from "../../base/ctxProvider/context";
import "./BarChart.module.scss";
import styles from "./BarChart.module.scss";
import {useLocation} from "react-router-dom";
import {getWeightByLength} from "../../../utils";
import {routesPath} from "../../../routes";

const rangeInervalQty = 8;

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

type BarChartProps = {
  data: BarChartType[];
  label?: string;
  customBgActive?: Color;
}



export const BarChart = ({
  data,
  label,
  customBgActive,
}: BarChartProps) => {
  const chartRow = useRef<HTMLDivElement | null>(null);
  const [chartRowHeight, setChartRowHeight] = useState<number>(0);
  const { weight, length } = useContext(MyGlobalContext);
  const pathname = useLocation().pathname
  const customBgColorActiveBar = customBgActive ? customBgActive : '';

  const dataWorking
    = weight === 'kg'
      ? [...data]
      : [...data].map(item => {
        return {
          ...item,
          carbon: item.carbon * 2.20462,
        }
      });

  
  const maxCarbonEmissionItem
    = dataWorking.reduce((acc, item) => item.carbon > acc.carbon ? item : acc);
  
  const totalCarbonEmission = Math.ceil(dataWorking.reduce((acc, item) => item.carbon + acc, 0));
  
  const chart = Array(rangeInervalQty + 1).fill(0).map((_, index) => {
    const maxCarbonValue = maxCarbonEmissionItem.carbon || 100; // max value will 100 by default
    const interval = Math.ceil(maxCarbonValue / rangeInervalQty);

    if (index === rangeInervalQty) {
      return Math.ceil(maxCarbonValue);
    }

    return index * interval;
  });

  useEffect(() => {
    if (chartRow.current) {
      setChartRowHeight(chartRow.current.clientHeight);
    }
  }, [])

  return (
    <div className={styles.barchart}>
      {label && (
        <h3 className={styles.title}>
          {label}
        </h3>
      )}
      <div className={styles.graph}>
        <div className={styles.y}>
          <div className={styles.yValues}>
            {chart.map((intervalPoint, index) => (
              <div
                key={index}
                className={styles.yValue}
                style={{
                  order: -index
                }}
              >
                {intervalPoint}
              </div>
              ))}
          </div>

          <div className={styles.yField}>
            {chart.map((_, index) => (
              <div
                key={index}
                className={styles.yLine}
                ref={element => {
                  if (index === chart.length - 1) {
                    chartRow.current = element
                  }
                }}
              ></div>
            ))}
            <div className={styles.bars}>
              {dataWorking.map(dataItem => (
                <li
                  key={dataItem.id}
                  className={styles.bar}
                  style={{
                    width: `calc(${100 / data.length}% - 5px)`,
                  }}
                >
                  <div
                    className={clsx(
                      styles.barBg,
                      dataItem.carbon > 0 && styles.barBgActive,
                    )}
                    style={{
                      height: `${Math.floor(dataItem.carbon / maxCarbonEmissionItem.carbon * 100) || 1}%`,
                      maxHeight: `calc(100% - ${chartRowHeight}px)`,
                      backgroundColor:  dataItem.carbon > 0 ? customBgColorActiveBar : '',
                    }}
                  ></div>

                  <div className={styles.barValue}>
                    {dataItem.id < 10
                      ? String(dataItem.id + 1).padStart(2, '0')
                      : dataItem.id + 1
                    }
                  </div>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className={styles.label}>
        Your carbon emission is {pathname === routesPath.cars ? getWeightByLength(length, totalCarbonEmission) : totalCarbonEmission} {weight === 'kg' ? 'kg' : 'lb'}
      </p>
    </div>
  )
}
