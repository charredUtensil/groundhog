import React from "react";
import styles from "./styles.module.scss";
import GROUNDHOG_VERSION from "../../../core/common/version";

const About = () => (
  <div className={styles.popoverWrapper}>
    <div className={styles.about}>
      <h2>groundHog v{GROUNDHOG_VERSION}</h2>
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
      <h2>Special Thanks</h2>
      <ul>
        <li>
          <em>AAdonaac</em> for writing up their{" "}
          <a href="https://www.gamedeveloper.com/programming/procedural-dungeon-generation-algorithm">
            dungeon generation algorithm
          </a>
        </li>
        <li>
          <em>
            <a href="https://baraklava.itch.io">Klavvy (Baraklava)</a>
          </em>{" "}
          for making Manic Miners
        </li>
        <li>
          <em>ICsleep (Script Maniac)</em>, <em>Ruinae Retroque Rursus</em>, and{" "}
          <em>
            <a href="https://github.com/tyabnet">Tyab</a>
          </em>{" "}
          for help with scripting and level design
        </li>
        <li>
          <em>
            <a href="https://github.com/vyldr">Vyldr</a>
          </em>{" "}
          for making the original{" "}
          <a href="https://vyldr.github.io/">
            Manic Miners Random Map Generator
          </a>
        </li>
        <li>Everyone else on the Manic Miners Discord server</li>
      </ul>
    </div>
  </div>
);
export default About;
