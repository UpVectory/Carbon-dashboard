import React, {useContext} from "react";
import {MyGlobalContext} from "../../components/base";
import {
    Layout,
    TreeOffsets,
    Dashboard,
    DashboardGraph,
    DashboardTable,
    DashboarScoreboard,
    PieChart,
    ComparativeInfo
} from "../../components/modules";


export const Total = () => {
    const {carbon} = useContext(MyGlobalContext)

    return <Layout>
        <Dashboard>
            <DashboardTable>
                <PieChart/>
            </DashboardTable>
            <DashboardGraph>
                <ComparativeInfo/>
            </DashboardGraph>
            <DashboarScoreboard>
                <TreeOffsets carbon={carbon}/>
            </DashboarScoreboard>
        </Dashboard>
    </Layout>
}