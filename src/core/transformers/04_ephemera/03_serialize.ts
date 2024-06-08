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
import { ProgrammedCavern } from "./02_program";

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
  return `Cavern generated by groundHog v${process.env.REACT_APP_VERSION}
https://github.com/charredUtensil/groundhog
context = ${JSON.stringify(cavern.context, null, 2)}`;
}

/** Coordinate data for anything that uses 'x,y/' format. */
function pointSet(points: Point[], [ox, oy]: Point): string {
  return points
    .map(([x, y]) => `${(x + ox).toFixed()},${(y + oy).toFixed()}/`)
    .join();
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
    .map(([key, points]) => `${key}:${pointSet(points, offset)}`)
    .join("\n");
}

export default function serialize(cavern: ProgrammedCavern): SerializedCavern {
  const offset: Point = [-cavern.left, -cavern.top];

  const serialized = `comments{
${indent(comments(cavern), "  ")}
}
info{
rowcount:${(cavern.right - cavern.left).toFixed()}
colcount:${(cavern.bottom - cavern.top).toFixed()}
camerapos:${serializePosition(cavern.cameraPosition, offset, cavern.height, 0, "entity")}
biome:${cavern.context.biome}
creator:groundHog
levelname:${cavern.levelName}
opencaves:${pointSet(
    // Open cave flags are in the form 'y,x/' for some reason.
    cavern.openCaveFlags.map((_, x, y) => [y, x]),
    [-cavern.top, -cavern.left],
  )}
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
${cavern.buildings.map((b) => serializeBuilding(b, offset, cavern.height)).join("\n")}
}
landslidefrequency{
${serializeHazards(cavern.landslides, offset)}
}
lavaspread{
${serializeHazards(cavern.erosion, offset)}
}
creatures{
${cavern.creatures.map((c) => serializeCreature(c, offset, cavern.height)).join("\n")}
}
miners{
${cavern.miners.map((m) => serializeMiner(m, offset, cavern.height)).join("\n")}
}
vehicles{
${cavern.vehicles.map((v) => serializeVehicle(v, offset, cavern.height)).join("\n")}
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

  return { ...cavern, serialized };
}
