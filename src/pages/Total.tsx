import { Layout, TreeOffsets} from "../components/modules";
import {useContext} from "react";
import {MyGlobalContext} from "../components/base";

export const Total = () => {
    const {carbon} = useContext(MyGlobalContext)
  return <Layout>
      <div style={{width: '40%'}}>
          {/*<BarChart data={carsBarChartArr}/>*/}
          <TreeOffsets carbon={carbon}/>
      </div>
  </Layout>
}