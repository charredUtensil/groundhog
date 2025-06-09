import wrap from "word-wrap";
import { Point } from "../../common/geometry";
import { Grid } from "../../common/grid";
import { serializeBuilding } from "../../models/building";
import { serializeCreature } from "../../models/creature";
import { Erosion, Landslide } from "../../models/hazards";
import { serializeMiner } from "../../models/miner";
import { serializeObjectives } from "../../models/objectives";
import { serializePosition } from "../../models/position";
import { Tile } from "../../models/tiles";
import { serializeVehicle } from "../../models/vehicle";
import { ProgrammedCavern } from "./04_program";
import GROUNDHOG_VERSION from "../../common/version";

export type SerializedCavern = ProgrammedCavern & {
  serialized: string;
};

function indent(it: string, prefix: string) {
  return it
    .split(/\r?\n/)
    .map((line) => `${prefix}${line}`)
    .join("\n");
}

function comments(cavern: ProgrammedCavern) {
  const groundhogVersion = GROUNDHOG_VERSION;
  const data = {
    groundhogVersion,
    initialContext: cavern.initialContext,
  };
  // Base64 encoded because Manic Miners is bad at parsing curly braces.
  const provenance = wrap(`Provenance: ${btoa(JSON.stringify(data))}`, {
    width: 116,
    indent: "",
    cut: true,
  });
  return `Made with groundHog v${groundhogVersion}
https://github.com/charredUtensil/groundhog

${provenance}`;
}

/**
 * Coordinate data for anything that uses 'x,y/' or 'y,x/' format.
 * Unfortunately, MM is inconsistent and uses both.
 */
function pointSet(points: Point[], [ox, oy]: Point, mode: "xy" | "yx"): string {
  return points
    .map(([x, y]) => {
      const xs = (x + ox).toFixed();
      const ys = (y + oy).toFixed();
      return mode === "xy" ? `${xs},${ys}/` : `${ys},${xs}/`;
    })
    .join("");
}

function grid(
  cavern: ProgrammedCavern,
  fencepost: 0 | 1,
  fn: (x: number, y: number) => string,
): string {
  const result: string[] = [];
  for (let y = cavern.top; y < cavern.bottom + fencepost; y++) {
    const row: string[] = [];
    for (let x = cavern.left; x < cavern.right + fencepost; x++) {
      row.push(`${fn(x, y)},`);
    }
    result.push(row.join(""));
  }
  return result.join("\n");
}

export function serializeHazards(
  hazards: Grid<Erosion | Landslide>,
  offset: Point,
): string {
  const out = new Map<string, Point[]>();
  hazards.forEach((h, x, y) => {
    const key = h.key;
    if (out.has(key)) {
      out.get(key)!.push([x, y]);
    } else {
      out.set(key, [[x, y]]);
    }
  });
  return Array.from(out.entries())
    .sort(([a], [b]) => parseInt(b) - parseInt(a))
    .map(([key, points]) => `${key}:${pointSet(points, offset, "xy")}`)
    .join("\n");
}

class SerializeError extends Error {}

// If any of these are found in the level output, assume JavaScript did
// something stupid.
const RESTRICTED_STRINGS = [
  "[object Object]",
  "undefined",
  "NaN",
  "FAIL!!",
] as const;

function performErrorChecking(serialized: string) {
  serialized.split("\n").forEach((line, i) => {
    RESTRICTED_STRINGS.forEach((restricted) => {
      if (line.includes(restricted)) {
        throw new SerializeError(
          `Unexpected ${JSON.stringify(restricted)} on line ${i}:\n${line}`,
        );
      }
    });

    /*
     * Manic Miners' parser doesn't handle curly braces correctly under specific
     * cases I haven't been able to identify. The error that appears is:
     *
     * (LoadDataField): Case doesn't exist!
     */
    if (line.includes("{") && !/^\w+\{$/.test(line)) {
      throw new SerializeError(`Unexpected '{' on line ${i}:\n${line}`);
    }
    if (line.includes("}") && line !== "}") {
      throw new SerializeError(`Unexpected '}' on line ${i}:\n${line}`);
    }
  });
}

export default function serialize(cavern: ProgrammedCavern): SerializedCavern {
  const tileOffset: Point = [-cavern.left, -cavern.top];

  const serialized = `comments{
${indent(comments(cavern), "  ")}
}
info{
rowcount:${(cavern.right - cavern.left).toFixed()}
colcount:${(cavern.bottom - cavern.top).toFixed()}
camerapos:${serializePosition({ position: cavern.cameraPosition, tileOffset, heightMap: cavern.height })}
biome:${cavern.context.biome}
creator:groundHog
levelname:${cavern.levelName}
opencaves:${pointSet(
    cavern.openCaveFlags.map((_, x, y) => [x, y]),
    tileOffset,
    "yx",
  )}
${cavern.oxygen ? `oxygen:${cavern.oxygen.join("/")}` : ""}
spiderrate:10
spidermin:2
spidermax:4
${
  // Version is the version of MM the level was "made by".
  (() => "version:2023-08-14-1")()
}
}
tiles{
${grid(cavern, 0, (x, y) => {
  const tile = cavern.tiles.get(x, y) ?? Tile.SOLID_ROCK;
  const offset =
    !tile.isWall && !cavern.discoveryZones.get(x, y)?.openOnSpawn ? 100 : 0;
  return (tile.id + offset).toFixed();
})}
}
height{
${grid(cavern, 1, (x, y) => cavern.height.get(x, y)!.toFixed())}
}
resources{
crystals:
${grid(cavern, 0, (x, y) => (cavern.crystals.get(x, y) ?? 0).toFixed())}
ore:
${grid(cavern, 0, (x, y) => (cavern.ore.get(x, y) ?? 0).toFixed())}
}
objectives{
${serializeObjectives(cavern.objectives)}
}
buildings{
${cavern.buildings.map((b) => serializeBuilding(b, tileOffset, cavern.height)).join("\n")}
}
landslidefrequency{
${serializeHazards(cavern.landslides, tileOffset)}
}
lavaspread{
${serializeHazards(cavern.erosion, tileOffset)}
}
creatures{
${cavern.creatures.map((c) => serializeCreature(c, tileOffset, cavern.height)).join("\n")}
}
miners{
${cavern.miners.map((m) => serializeMiner(m, tileOffset, cavern.height)).join("\n")}
}
vehicles{
${cavern.vehicles.map((v) => serializeVehicle(v, tileOffset, cavern.height)).join("\n")}
}
briefing{
${cavern.briefing.intro}
}
briefingsuccess{
${cavern.briefing.success}
}
briefingfailure{
${cavern.briefing.failure}
}
blocks{
}
script{
${
  // Script is done after fence, so it doesn't need any offsetting.
  cavern.script
}

}`;

  performErrorChecking(serialized);
  return { ...cavern, serialized };
}
