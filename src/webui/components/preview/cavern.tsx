import React from "react";
import { Cavern } from "../../../core/models/cavern";
import "./cavern.css";
import BaseplatePreview from "./baseplate";
import PathPreview from "./path";
import PlanPreview from "./plan";
import PearlPreview from "./pearl";
import { Pearled } from "../../../core/models/plan";
import DioramaPreview from "./diorama";

const SCALE = 6;
const SVG_WIDTH = 800;
const SVG_HEIGHT = 600;

export default function CavernPreview({ cavern }: { cavern: Cavern }) {
  return (
    <div className="cavernPreview">
      <div>seed: {cavern.context.seed}</div>
      <svg
        className="map"
        style={{ width: SVG_WIDTH, height: SVG_HEIGHT }}
        viewBox={`${SVG_WIDTH / -2} ${SVG_HEIGHT / -2} ${SVG_WIDTH} ${SVG_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {cavern.baseplates?.map((bp) => <BaseplatePreview baseplate={bp} />)}
        {cavern.paths?.map((pa) => <PathPreview path={pa} />)}
        {cavern.plans?.map((pl) => <PlanPreview plan={pl} />)}
        {cavern.plans
          ?.filter((pl) => pl.outerPearl)
          .map((pl) => (
            <PearlPreview plan={pl as Pearled} pearl={"outerPearl"} />
          ))}
        {cavern.plans
          ?.filter((pl) => pl.innerPearl)
          .map((pl) => (
            <PearlPreview plan={pl as Pearled} pearl={"innerPearl"} />
          ))}
        {cavern.diorama && <DioramaPreview diorama={cavern.diorama} />}
      </svg>
    </div>
  );
}
