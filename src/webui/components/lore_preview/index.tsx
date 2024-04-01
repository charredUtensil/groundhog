import React, { useState } from "react";
import PREMISE from "../../../core/lore/graphs/premise";
import PhraseGraphPreview from "./phrase_graph";
import "./style.scss";
import ORDERS from "../../../core/lore/graphs/orders";
import { FOUND_HOARD } from "../../../core/lore/graphs/events";
import { Cavern } from "../../../core/models/cavern";
import { FAILURE, SUCCESS } from "../../../core/lore/graphs/conclusions";

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
    <div className="lorePreview">
      <div className="tabs">
        {tabs.map(({ name }, i) => (
          <button
            className={`tab ${i === activeTab ? "active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="pgWrapper">
        <PhraseGraphPreview
          lore={cavern?.lore}
          pg={tabs[activeTab].pg}
          results={tabs[activeTab].results}
        />
      </div>
    </div>
  );
}
