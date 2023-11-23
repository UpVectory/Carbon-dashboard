import {Layout} from "../../components/modules";

import {ReactComponent as BehanceIcon} from "../../assets/behance.svg";
import {ReactComponent as GitIcon} from "../../assets/git.svg";
import {ReactComponent as DribbbleIcon} from "../../assets/dribbble.svg";

import styles from './About.module.scss';

export const About = () => {
    return (
        <Layout>
            <div className={styles.about}>
                <div className={styles.left}>
                    <h1>About Carbon Dashboard</h1>
                    <p>
                        The global average energy-related carbon footprint in 2021 according
                        to IEA report is around 4.7 tonnes of CO2 per person – the equivalent
                        of taking two round-trip flights between Singapore and New York, or of
                        driving an average SUV for 18 months. It affects a wide range of
                        environmental processes, global warming and climate change in
                        particular. To emphasize the importance of making environmentally
                        considered choices while traveling, we created the carbon dashboard.
                    </p>
                    <p>
                        Simply filling up your flight destinations/the number of flights and
                        your car trips specifications , you can count the carbon emissions you
                        produce, the number of trees needed to offset your footprint, and if
                        possible think over your next journeys more consciously. Let’s go
                        low-carbon!
                    </p>
                    <p>
                        The carbon dashboard was created by the Ukrainian web design studio
                        UpVectory. All design solutions are made in Figma and Adobe
                        Illustrator, while the tech stack is React + Typescript, React Hooks, React Hook "useContext" as
                        state, React Router Dom as routing, Material UI as UI kit, Material UI X-Charts for charts,
                        Styled Components as helper for Material UI, Axios for API requests.
                    </p>
                    <p>If you’d like to review more our projects, please visit:</p>

                    <div className={styles.icons}>
                        <a href="https://www.behance.net/upvectory" rel="noreferrer" target="_blank">
                            <BehanceIcon/>
                        </a>

                        <a href="https://github.com/upvectory" rel="noreferrer" target="_blank">
                            <GitIcon/>
                        </a>

                        <a href="https://dribbble.com/UpVectory" rel="noreferrer" target="_blank">
                            <DribbbleIcon/>
                        </a>
                    </div>

                    <a href="https://www.upvectory.com/" rel="noreferrer" target="_blank">upvectory.com</a>
                </div>
                <div className={styles.right}>
                    <img src="./about-1.png" alt="About"/>
                </div>
            </div>
        </Layout>
    );
};
