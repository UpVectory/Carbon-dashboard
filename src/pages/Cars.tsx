import {Layout} from "../components/modules/Layout";
import {useContext} from "react";
import {MyGlobalContext} from "../components/base/ctxProvider/context";

export const Cars = () => {
    const {length , weight} = useContext(MyGlobalContext)

    return <Layout>
        <h2>length: {length}</h2>
        <h2>weight : {weight}</h2>
        cars
    </Layout>
}