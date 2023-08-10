import {useContext} from "react";
import {MyGlobalContext} from "../../base";

export const BarChart = () => {
  const {flightBarChartArr } = useContext(MyGlobalContext)


  return <div>
    <div style={{display:"flex" , height: '500px', width: '100%', justifyContent: 'space-between', alignItems: 'end'}}>

        {flightBarChartArr.map(({carbon}, i , arr)=>{
            const maxObj=arr.reduce((prev,cur) => cur?.carbon>prev.carbon?cur:prev,{carbon:-1})

            return  <div key={i} style={{
                transition: '0.3s',
                width : `${100/10-1}%`,
                background: 'red',
                height: `${maxObj.carbon > 0 ? carbon/maxObj.carbon*100 : 0}%`
            }}></div>
        })}
    </div>
  </div>
}