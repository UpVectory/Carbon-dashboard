import React, {useContext} from "react";
import {Layout, TreeOffsets} from "../../components/modules";
import {MyGlobalContext} from "../../components/base";
import anchor from '../../assets/anchor.png'
import house from '../../assets/house.png'
import styles from './Total.module.scss'
import {PieChart, pieArcLabelClasses} from "@mui/x-charts";

const items = {
    anchor: 11500,
    house: 156000,
}

export const Total = () => {
    const {carbon, weight, carbonFl, carbonCar} = useContext(MyGlobalContext)
    const img = carbon > 100000 ? house : anchor
    const currentItem = carbon > 100000 ? items.house : items.anchor
    const currentRate = carbon / currentItem * 100

    return <Layout>
        <div className={styles.wrap}>
            <div className={styles.right}>
                <h2>Your total carbon emission </h2>
                <PieChart
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
            </div>
            <div className={styles.left}>
                {/*<BarChart data={carsBarChartArr}/>*/}
                <div>
                    <h2>Your carbon emissions in {weight}</h2>
                    <div style={{display: 'flex', justifyContent: "center", alignItems: "center", width: '100%'}}>
                        <div style={{
                            position: 'relative',
                            background: '#fff',

                        }}>
                            <img src={img} alt="anchor" style={{
                                position: "relative", display: "block", width: '100%', height: '100%', zIndex: 2
                            }}/>
                            <div style={{
                                position: "absolute",
                                background: "rgba(97, 183, 102, .6)",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 1,
                                height: `${currentRate < 100 ? currentRate : 100}%`
                            }}/>

                        </div>
                        <div style={{
                            color: '#61B766',
                            fontSize: '60px',
                            fontWeight: 700,
                        }}>{carbon > currentItem ? `x${(currentRate / 100).toFixed()}` : ''}
                        </div>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <p>Your carbon emission is {getWeight(weight, carbon)} {weight}</p>
                        <p>1 {findKeyByValue(items, currentItem)} ≈ {getWeight(weight, currentItem)} {weight}</p>
                    </div>
                </div>
                <TreeOffsets carbon={carbon}/>
            </div>
        </div>
    </Layout>
}

//function find key by value
function findKeyByValue<T extends Record<string, any>>(object: T, value: T[keyof T]): keyof T | undefined {
    return Object.keys(object).find((key) => object[key] === value) as keyof T | undefined;
}

//function if weight === 'kg' then carbon else carbon * 2.20462
function getWeight(weight: string, carbon: number) {
    const resp = weight === 'kg' ? carbon : carbon * 2.20462
    return resp.toFixed(2)
}

// function if length === 'km' then distance else distance * 0.621371

function getLength(length: string, distance: number) {
    const resp = length === 'km' ? distance : distance * 0.621371
    return resp.toFixed(2)
}