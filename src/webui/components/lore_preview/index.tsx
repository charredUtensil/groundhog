import React, { useState } from "react";
import PREMISE from "../../../core/lore/graphs/premise";
import PhraseGraphPreview from "./phrase_graph";
import ORDERS from "../../../core/lore/graphs/orders";
import { FOUND_HOARD } from "../../../core/lore/graphs/events";
import { Cavern } from "../../../core/models/cavern";
import { FAILURE, SUCCESS } from "../../../core/lore/graphs/conclusions";
import styles from "./style.module.scss"

export default function LorePreview({ cavern }: { cavern: Cavern | null }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { name: "Premise", pg: PREMISE, results: cavern?.lore?.results?.premise },
    { name: "Orders", pg: ORDERS, results: cavern?.lore?.results?.orders },
    { name: "Success", pg: SUCCESS, results: cavern?.lore?.results?.success },
    { name: "Failure", pg: FAILURE, results: cavern?.lore?.results?.failure },
    { name: "Found Hoard", pg: FOUND_HOARD, results: undefined },
  ];
  return (
    <div className={styles.lorePreview}>
      <div className={styles.tabs}>
        {tabs.map(({ name }, i) => (
          <button
            className={`${styles.tab} ${i === activeTab ? styles.active : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className={styles.pgWrapper}>
        <PhraseGraphPreview
          lore={cavern?.lore}
          pg={tabs[activeTab].pg}
          results={tabs[activeTab].results}
        />
      </div>
    </div>
  );
}
