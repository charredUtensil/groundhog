import React from "react";
import styles from "./about.module.scss";

const About = () => (
  <div className={styles.about}>
    <div>
      <h2>groundHog</h2>
      <p>By Christopher Dollard (aka charredUtensil)</p>
      <p>
        Report issues on <a href="https://github.com/charredUtensil/groundhog/issues" target="_blank">GitHub</a>.
      </p>
      <p>
        LEGO® is a trademark of the LEGO Group of companies which does not
        sponsor, authorize or endorse this site.
      </p>
    </div>
  </div>
);
export default About;
