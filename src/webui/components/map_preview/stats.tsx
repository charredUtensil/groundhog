import { MapOverlay } from ".";
import {
  getTotalCrystals,
  getTotalOre,
} from "../../../core/architects/utils/resources";
import { Cavern } from "../../../core/models/cavern";
import React from "react";
import styles from "./style.module.scss";
import { Tile } from "../../../core/models/tiles";
import { Building } from "../../../core/models/building";
import { Vehicle } from "../../../core/models/vehicle";
import { Creature } from "../../../core/models/creature";
import { spellResourceGoal } from "../../../core/lore/lore";

function EntitySummary({
  entities,
}: {
  entities: readonly (Building | Vehicle | Creature)[] | undefined;
}) {
  const counts: { [K: string]: number } = {};
  entities?.forEach((e) => {
    const s = e.template.inspectAbbrev;
    counts[s] = (counts[s] ?? 0) + 1;
  });

  return (
    <>
      {!Object.entries(counts).length && "n/a"}
      {Object.entries(counts)
        .map(([k, v]) => `${k}${v > 1 ? `x${v}` : ""}`)
        .join(" ")}
    </>
  );
}

export default function Stats({
  cavern,
  mapOverlay,
}: {
  cavern: Cavern;
  mapOverlay: MapOverlay;
}) {
  const content = (() => {
    switch (mapOverlay) {
      case "overview":
        return (
          <>
            {cavern.levelName && <h1>{cavern.levelName}</h1>}
            <p>{cavern.fileName ?? cavern.initialContext.seed.toString(16)}</p>
            <p>{cavern.briefing?.intro ?? "No briefing yet..."}</p>
          </>
        );
      case "tiles":
        return (
          <ul>
            <li>Playable area: {cavern.tiles?.size ?? 0}</li>
            <li>
              Walls: {cavern.tiles?.reduce((r, t) => (t.isWall ? r + 1 : r), 0)}
            </li>
          </ul>
        );
      case "entities": {
        return (
          <ul>
            <li>Miners: {cavern.miners?.length ?? 0}</li>
            <li>
              Buildings: <EntitySummary entities={cavern.buildings} />
            </li>
            <li>
              Vehicles: <EntitySummary entities={cavern.vehicles} />
            </li>
            <li>
              Creatures: <EntitySummary entities={cavern.creatures} />
            </li>
          </ul>
        );
      }
      case "crystals":
        return (
          <ul>
            <li>Total EC: {getTotalCrystals(cavern)}</li>
            {cavern.objectives?.crystals ? (
              <li>Goal: {cavern.objectives?.crystals}</li>
            ) : null}
          </ul>
        );
      case "ore":
        return (
          <ul>
            <li>Total Ore: {getTotalOre(cavern)}</li>
            {cavern.objectives?.ore ? (
              <li>Goal: {cavern.objectives?.ore}</li>
            ) : null}
          </ul>
        );
      case "landslides": {
        if (!cavern.landslides?.size) {
          return null;
        }
        const count = cavern.landslides.size;
        const avgCooldown =
          cavern.landslides.reduce((r, ls) => r + ls.cooldown, 0) / count;
        return (
          <ul>
            <li>Landslides: {count}</li>
            {avgCooldown && (
              <li>Avg Cooldown: {avgCooldown.toFixed(2)} seconds</li>
            )}
          </ul>
        );
      }
      case "erosion": {
        const count = cavern.erosion?.size ?? 0;
        const avgCooldown = cavern.erosion
          ? cavern.erosion.reduce(
              (r, er) => r + (er === true ? -1 : er.cooldown),
              0,
            ) / count
          : null;
        return (
          <ul>
            <li>
              Water:{" "}
              {cavern.tiles?.reduce(
                (r, t) => (t === Tile.WATER ? r + 1 : r),
                0,
              )}
            </li>
            <li>
              Lava:{" "}
              {cavern.tiles?.reduce((r, t) => (t === Tile.LAVA ? r + 1 : r), 0)}
            </li>
            <li>Erosion: {count}</li>
            {avgCooldown && avgCooldown > 0 && (
              <li>Avg Cooldown: {avgCooldown.toFixed(2)} seconds</li>
            )}
          </ul>
        );
      }
      case "height": {
        if (!cavern.height) {
          return null;
        }
        return (
          <ul>
            <li>
              min:{" "}
              {cavern.height.reduce((r, h) => (h < r ? h : r), 0).toFixed()}
            </li>
            <li>
              mean:{" "}
              {(() => {
                let sum = 0;
                let count = 0;
                cavern.height.forEach((h) => {
                  sum += h;
                  count += 1;
                });
                return (sum / count).toFixed(1);
              })()}
            </li>
            <li>
              max:{" "}
              {cavern.height.reduce((r, h) => (h > r ? h : r), 0).toFixed()}
            </li>
          </ul>
        );
      }
      case "oxygen": {
        return <p>Oxygen: {cavern.oxygen?.join("/") ?? "Infinity"}</p>;
      }
      case "objectives": {
        if (!cavern.objectives) {
          return <p>No objectives yet...</p>;
        }
        const resourceGoal = spellResourceGoal(
          cavern.objectives,
        ).resourceGoalNumbers;
        return (
          <ul>
            {cavern.objectives.variables.map(({ description }) => (
              <li key={description}>{description}</li>
            ))}
            {resourceGoal && <li>Collect {resourceGoal}.</li>}
          </ul>
        );
      }
      default:
        return null;
    }
  })();
  return content && <div className={styles.stats}>{content}</div>;
}
