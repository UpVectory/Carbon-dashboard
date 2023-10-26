import React, {useContext} from "react";
import {MyGlobalContext} from "../../base";
import house from "../../../assets/house.png";
import anchor from "../../../assets/anchor.png";
import {findKeyByValue, getWeight} from "../../../utils";

const items = {
    anchor: 11500,
    house: 156000,
}

export const ComparativeInfo = () => {
    const {carbon, weight} = useContext(MyGlobalContext)
    const img = carbon > 100000 ? house : anchor
    const currentItem = carbon > 100000 ? items.house : items.anchor
    const currentRate = carbon / currentItem * 100
    return <div>
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
}