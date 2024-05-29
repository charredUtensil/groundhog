import { MapOverlay } from "."
import { getTotalCrystals, getTotalOre } from "../../../core/architects/utils/resources"
import { Cavern } from "../../../core/models/cavern"
import React from "react"
import styles from "./style.module.scss";
import { Tile } from "../../../core/models/tiles";

export default function Stats({
  cavern, mapOverlay
}:{
  cavern: Cavern,
  mapOverlay: MapOverlay,
}) {
  return (
    <div className={styles.stats}>
      { (() => {
          switch (mapOverlay) {
            case "tiles":
              return (
                <ul>
                  <li>Playable area: {cavern.tiles?.size ?? 0}</li>
                  <li>Walls: {cavern.tiles?.reduce((r, t) => t.isWall ? r + 1 : r, 0)}</li>
                </ul>
              )
            case "entities":
              return (
                <ul>
                  <li>
                    Miners: {cavern.miners?.length ?? 0}
                  </li>
                  <li>
                    Buildings: ({cavern.buildings?.length ?? 0}){" "}
                    {cavern.buildings?.map(b => b.template.inspectAbbrev).join(" ")}
                  </li>
                  <li>
                    Creatures: ({cavern.creatures?.length ?? 0}){" "}
                    {cavern.creatures?.map(c => c.template.inspectAbbrev).join(" ")}
                  </li>
                </ul>
              )
            case "crystals":
              return (
                <ul>
                  <li>Total EC: {getTotalCrystals(cavern)}</li>
                  {cavern.objectives?.crystals ? (
                    <li>Goal: {cavern.objectives?.crystals}</li>
                  ): null}
                </ul>
              );
            case "ore":
              return (
                <ul>
                  <li>Total Ore: {getTotalOre(cavern)}</li>
                  {cavern.objectives?.ore ? (
                    <li>Goal: {cavern.objectives?.ore}</li>
                  ): null}
                </ul>
              );
            case "landslides":
              {
                if (!cavern.landslides?.size) {
                  return null;
                }
                const count = cavern.landslides.size;
                const avgCooldown = cavern.landslides.reduce(
                  (r, ls) => r + ls.cooldown, 0) / count;
                return (
                  <ul>
                    <li>Landslides: {count}</li>
                    { avgCooldown &&
                      <li>
                        Avg Cooldown: {(avgCooldown).toFixed(2)} seconds
                      </li>
                    }
                  </ul>
                );
              }
            case "erosion":
              {
                const count = cavern.erosion?.size ?? 0;
                const avgCooldown = cavern.erosion ? cavern.erosion.reduce(
                  (r, ls) => r + ls.cooldown, 0) / count : null;
                return (
                  <ul>
                    <li>
                      Water: {cavern.tiles?.reduce((r, t) => t === Tile.WATER ? r + 1 : r, 0)}
                    </li>
                    <li>
                      Lava: {cavern.tiles?.reduce((r, t) => t === Tile.LAVA ? r + 1 : r, 0)}
                    </li>
                    <li>
                      Erosion: {count}
                    </li>
                    { avgCooldown &&
                      <li>
                        Avg Cooldown: {(avgCooldown).toFixed(2)} seconds
                      </li>
                    }
                  </ul>
                );
              }
            case "height":
              {
                if (!cavern.height) {
                  return null;
                }
                return (
                  <ul>
                    <li>
                      min: {cavern.height.reduce((r, h) => h < r ? h : r, 0).toFixed()}
                    </li>
                    <li>
                      max: {cavern.height.reduce((r, h) => h > r ? h : r, 0).toFixed()}
                    </li>
                  </ul>
                )
              }
          }
        })()
      }
      {cavern.briefing?.intro && <p>Briefing: {cavern.briefing.intro}</p>}
    </div>
  )
}