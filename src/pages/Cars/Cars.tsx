import {useContext} from "react";
import {Layout, BarChart, TreeOffsets} from "../../components/modules";
import {MyGlobalContext, TableRowCars} from "../../components/base";
import data from '../../data/cars.json'

export const Cars = () => {
    const {length , weight, carbonCar,carsBarChartArr} = useContext(MyGlobalContext)
    const {cars} = data

    return <Layout>
        <section style={{display: "flex"}}>
            <div style={{width: '60%'}}>
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Fuel type</th>
                        <th>Distance, {length}</th>
                        <th>Carbon, {weight}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cars.map((car, index) => {
                        return <TableRowCars item={car} key={index}/>
                    })}
                    </tbody>
                </table>
            </div>
        <div style={{width: '40%'}}>
            <BarChart data={carsBarChartArr}/>
            <TreeOffsets carbon={carbonCar}/>
        </div>
        </section>
    </Layout>
}