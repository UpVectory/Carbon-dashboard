import { PieChart as Pie, pieArcLabelClasses } from "@mui/x-charts";
import React, { useContext } from "react";
import { MyGlobalContext } from "../../base";

import styles from './PieChart.module.scss';

export const PieChart = () => {
  const { carbon, carbonFl, carbonCar } = useContext(MyGlobalContext);

  const getPercentageString = (val: number): string => {
    const percent = Math.round(val / carbon * 100);
    
    if (isFinite(percent)) {
      return `${percent}%`;
    }

    return '';
  }

  return (
    <div className={styles.piechart}>
      <h2>Your total carbon emission</h2>
      <Pie
        series={[
          {
            arcLabel: (item) => getPercentageString(item.value),
            arcLabelMinAngle: 1,
            data: [
              { id: 0, value: carbonFl, label: 'Flights', color: '#F7B32B' },
              { id: 1, value: Math.floor(carbonCar), label: 'Car trips', color: '#F25F5C' },
              { id: 2, value: carbon ? 0 : 1, color: '#a0d4a3'},
            ],
            outerRadius: 250,
            cy: 276,
          },
        ]}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            itemMarkWidth: 24,
            itemMarkHeight: 24,
            markGap: 12,
            itemGap: 24,
            labelStyle: {
              fontSize: 16,
              fill: '#61463A',
              fontWeight: 500,
              fontFamily: 'inherit',
            },
          },
        }}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontSize: 24,
            fill: 'white',
            fontWeight: 'bold',
          },
        }}
        
        margin={{ right: 5 }}
      />
    </div>
  );
};
