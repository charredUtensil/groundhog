import React, { ReactElement } from "react";
import { CavernContext } from "../../core/common";

export function CavernContextInput(
  {get, set}: {get: Partial<CavernContext>, set: (v: Partial<CavernContext>) => void}): ReactElement {
  return (
    <div>
      <SeedInput />
    </div>
  )
}

function SeedInput(): ReactElement {
  return (
    <input type="text" />
  );
}