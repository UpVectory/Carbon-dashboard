import {Layout} from "../components/modules";
import data from '../data/popular-flights.json'
import {useContext} from "react";
import {MyGlobalContext} from "../components/base";
import {TableRow} from "../components/base";
import {TreeOffsets} from "../components/modules";
import {BarChart} from "../components/modules";
import {Autocomplete, TextField} from "@mui/material";
import allAirports from '../data/airports.json'

export const Plane = () => {

    const {length, weight, carbonFl} = useContext(MyGlobalContext)
    const {flights} = data
    const customFlights = {}
    const airports = allAirports

    console.log(airports)

    return <Layout>
        <section style={{display: "flex"}}>
            <div style={{width: '60%'}}>
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Distance, {length}</th>
                        <th>Amount</th>
                        <th>Carbon, {weight}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {flights.map((flight, index) => {
                        return <TableRow item={flight} key={index}/>
                    })}
                    </tbody>
                    <tfoot>
                    <tr>
                        <th></th>
                        <th>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={[]}
                                sx={{width: 150}}
                                renderInput={(params) => <TextField {...params} label="Airport"/>}
                            />
                        </th>
                        <th>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={[]}
                                sx={{width: 150}}
                                renderInput={(params) => <TextField {...params} label="Airport"/>}
                            />
                        </th>
                        <th>0</th>
                        <th>0</th>
                        <th>0</th>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <div style={{width: '40%'}}>
                <BarChart/>
                <TreeOffsets carbon={carbonFl}/>
            </div>
        </section>
    </Layout>
}