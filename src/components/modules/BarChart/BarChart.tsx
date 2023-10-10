import {BarChartType} from "../../base/ctxProvider/context";

const chart = [1, 2, 3, 4, 5, 6, 7, 8]

type BarChartProps = {
    data : BarChartType[]
}
export const BarChart = ({data}:BarChartProps) => {

    return <div>
        <div style={{
            display: "flex",
            position: "relative",
            height: '500px',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'end',
            borderBottom: `1px solid #000`,
            padding: '10px 0 10px 10px ',
            borderLeft: `1px solid #000`,
            background:'#FFFFFF'
        }}>

            {data.map(({id, carbon}, i, arr) => {
                const maxObj = arr.reduce((prev, cur) => cur?.carbon > prev.carbon ? cur : prev, {carbon: -1})

                return <>
                    <div key={i} style={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'end',
                        transition: '0.3s',
                        width: `calc(${100 / data.length}% - 5px)`,
                        borderRadius: '4px 4px 0 0',
                        background: '#F7B32B',
                        height: `${maxObj.carbon > 0 ? carbon / maxObj.carbon * 100 : 0}%`
                    }}>{id + 1}</div>

                    <div key={`${id}${carbon}${i}`} style={{
                        position: "absolute",
                        left: '-45px',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        {chart.map((v, index) => <span key={`${v}${index}`} style={{
                            display: "block", width: '100%',
                            borderBottom:'1px solid #ECF5ED',marginTop:'-10px'
                        }}>{Math.floor(maxObj.carbon > 0 ? maxObj.carbon / v : 100 / v)}</span>)}
                    </div>
                </>
            })}
        </div>
    </div>
}