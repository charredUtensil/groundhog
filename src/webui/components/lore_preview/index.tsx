import React, { useState } from "react";
import PREMISE from "../../../core/lore/graphs/premise";
import PhraseGraphPreview from "./phrase_graph";
import "./style.scss"
import ORDERS from "../../../core/lore/graphs/orders";
import { FOUND_HOARD } from "../../../core/lore/graphs/events";
import { Cavern } from "../../../core/models/cavern";

export default function LorePreview({cavern}: {cavern: Cavern | null}) {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = [
    {name: 'Premise', pg: PREMISE},
    {name: 'Orders', pg: ORDERS},
    {name: 'Found Hoard', pg: FOUND_HOARD},
  ]
  return (
    <div className="lorePreview">
      <div className="tabs">
        {tabs.map(({name}, i) => (
          <button 
            className={`tab ${i === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="pgWrapper">
        <PhraseGraphPreview lore={cavern?.lore} pg={tabs[activeTab].pg} />
      </div>
    </div>
  )
}