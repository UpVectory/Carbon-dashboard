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
                        The worldwide carbon footprint affects numerous environmental processes, global warming, and
                        climate change. Thus, we created the carbon dashboard to emphasize the importance of making
                        environmentally considered choices.
                        Carbon dashboard is a demo project built on the data from <a href="https://rapidapi.com/carbonsutra/api/carbonsutra1">CarbonSutra API</a>. All calculations were
                        done to show approximate emissions and do not pretend to be 100% valid.
                    </p>
                    <p>
                        This dashboard aims to calculate the emissions you cause traveling by planes and cars. Simply
                        filling up your flight destinations/the number of flights and your car trip specifications, you
                        can roughly count your carbon footprint, the number of trees needed to offset your footprint,
                        and if possible think over your next journeys more consciously. Let’s go low-carbon!
                    </p>
                    <p>
                        The project was created by the Ukrainian web design studio UpVectory. All design solutions are
                        made in Figma and Adobe Illustrator, while the tech stack is React + Typescript,
                        React Router Dom, Material UI, Styled Components, Axios.
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
