import {PieChart as Pie, pieArcLabelClasses} from "@mui/x-charts";
import React, {useContext} from "react";
import {MyGlobalContext} from "../../base";

export const PieChart = () => {
    const {carbon, carbonFl, carbonCar} = useContext(MyGlobalContext)

    return <>
        <h2>Your total carbon emission </h2>
        <Pie
            series={[
                {
                    arcLabel: (item) => `${item.label} (${item.value})`,
                    arcLabelMinAngle: 45,
                    data: [
                        { id: 0, value: carbonFl, label: 'Flights' },
                        { id: 1, value: carbonCar, label: 'Car trips' },
                        { id: 2, value: carbon ? 0 : 100, label: 'enter your emission' },
                    ],
                },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                },
            }}
            width={500}
            height={500}
        />
    </>
}