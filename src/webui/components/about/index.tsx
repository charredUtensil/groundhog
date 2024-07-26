import React from "react";
import styles from "./styles.module.scss";

const About = () => (
  <div className={styles.popoverWrapper}>
    <div className={styles.about}>
      <h2>groundHog v{process.env.REACT_APP_VERSION}</h2>
      <p>By Christopher Dollard (aka charredUtensil)</p>
      <p>
        See{" "}
        <a
          href="https://github.com/charredUtensil/groundhog"
          target="_blank"
          rel="noreferrer"
        >
          documentation
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/charredUtensil/groundhog/issues"
          target="_blank"
          rel="noreferrer"
        >
          report issues
        </a>{" "}
        on GitHub.
      </p>
      <p>
        LEGO® is a trademark of the LEGO Group of companies which does not
        sponsor, authorize or endorse this site.
      </p>
    </div>
  </div>
);
export default About;
