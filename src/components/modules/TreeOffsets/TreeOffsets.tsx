import {useContext} from "react";
import {MyGlobalContext} from "../../base";

type TreeOffsetsProps = {
    carbon: number
}

export const TreeOffsets = ({carbon}: TreeOffsetsProps) => {
    const {weight} = useContext(MyGlobalContext)
    return <div>
        <h3>Trees needed to offset your emissions</h3>

        <div><span style={{color: '#61B766', fontSize: '60px'}}>{(carbon / 20).toFixed()}</span><span><img
            src="/ph_tree-duotone.png" alt="tree"/></span></div>

        <p>1 tree offsets ≈ {weight === 'kg' ? 20 : (20 * 2.20462).toFixed()} {weight} of carbon each year</p>
    </div>
}