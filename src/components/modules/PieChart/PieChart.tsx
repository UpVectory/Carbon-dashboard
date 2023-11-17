import {PieChart as Pie, pieArcLabelClasses} from "@mui/x-charts";
import React, {useContext} from "react";
import {MyGlobalContext} from "../../base";

import styles from './PieChart.module.scss';
import { useMediaQuery } from "@mui/material";

export const PieChart = () => {
  const { carbon, carbonFl, carbonCar } = useContext(MyGlobalContext);
  const widthMin600 = useMediaQuery('(min-width: 600px)');

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
                tooltip={{
                    trigger: 'none',
                }}
                series={[
                    {
                        arcLabel: (item) => {

                            if (item.label === undefined) {
                                return ''
                            }
                            return getPercentageString(item.value)
                        },
                        arcLabelMinAngle: 1,
                        data: [
                            {id: 0, value: carbonFl || carbonCar ? 0 : 1, color: '#a0d4a3'},
                            {id: 1, value: carbonFl, label: 'Flights', color: '#F7B32B'},
                            {id: 2, value: carbonCar, label: 'Car trips', color: '#F25F5C'},

                        ],
                        outerRadius: widthMin600 ? 250 : 150,
                        cy: widthMin600 ? 276 : 165,
                        startAngle: 90,
                        endAngle: 450,
                        paddingAngle: 0,
                    },
                ]}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: {vertical: 'bottom', horizontal: 'middle'},
                        itemMarkWidth: 24,
                        itemMarkHeight: 24,
                        markGap: 12,
                        itemGap: 24,
                        labelStyle: {
                            borderRadius: '4px',
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
                        [`&:not(:last-child)`]: {
                            fill: '#61463A'
                        },

                    },
                    '& .MuiChartsLegend-mark': {
                        ry: 4,
                        rx: 4,
                    },
                    '& .MuiResponsiveChart-container': {

                    },

                }}
                margin={{ right: 5 }}
                height={widthMin600 ? 600 : 400}
            />
        </div>
    );
};
