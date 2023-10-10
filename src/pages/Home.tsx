import {Layout} from "../components/modules";

export const Home = () => {
    return <Layout>
        <main style={{
            display: "flex",
            justifyContent: 'space-between',
            alignItems: "center",
            width: '100%',
            height: '100%'
        }}>
            <div style={{
                maxWidth: '500px'
            }}>
                <h1>
                    Travel smart, reduce carbon emissions
                </h1>
                <p>
                    By calculating the number of your carbon emissions caused by flights and car trips, you can start
                    planning your traveling more consciously and help mitigate climate change.
                </p>
                <p>
                    You can do the calculation for flights, car trips, or both. The carbon calculator will sum your
                    carbon
                    emissions in total and count how many trees are needed to offset your footprint. Additionally, you
                    can
                    easily switch between km-mi and kg-lb in the side menu. Wish you a low-carbon journey!
                </p>
            </div>
            <div style={{
                height: '100%'
            }}>
                <img src="/Mask%20group.png" alt="plane and town"/>
            </div>
        </main>
    </Layout>

}
