import React, { useEffect, useState } from "react";
import {
  CavernContext,
  DiceBox,
  inferContextDefaults,
} from "../../../core/common";
import { MAX_PLUS_ONE } from "../../../core/common/prng";
import styles from "./style.module.scss";
import { Choice, CurveSliders, Slider } from "./controls";
import { ArchitectsInput } from "./architects";

const INITIAL_SEED = Date.now() % MAX_PLUS_ONE;

const expectedCavePlans = (contextWithDefaults: CavernContext | undefined) => (
  contextWithDefaults ? contextWithDefaults.caveCount : 20
)

const expectedTotalPlans = (contextWithDefaults: CavernContext | undefined) => (
  contextWithDefaults
    ? contextWithDefaults.caveCount * 2 - 1 + contextWithDefaults.auxiliaryPathCount
    : 50
)

export function CavernContextInput({
  onChanged,
}: {
  onChanged: (v: CavernContext) => void;
}) {
  const [context, setContext] = useState<Partial<CavernContext> & Pick<CavernContext, 'seed'>>({seed: INITIAL_SEED});
  const [showAdvanced, setShowAdvanced] = useState(false);

  function update<K extends keyof CavernContext>(
    key: K,
    value: CavernContext[K] | undefined,
  ) {
    const r = { ...context };
    if (value === undefined) {
      if (key in r) {
        delete r[key];
      }
    } else {
      if (r[key] !== value) {
        r[key] = value;
      }
    }
    setContext(r);
  }

  const contextWithDefaults = inferContextDefaults(context)

  useEffect(() => onChanged(inferContextDefaults(context)), [context]);

  return (
    <div className={styles.contextInput}>
      <div className={styles.inputRow}>
        <input
          type="text"
          className={styles.seed}
          value={(context?.seed ?? INITIAL_SEED).toString(16).toUpperCase()}
          onChange={(ev) => {
            const seed = parseInt(ev.target.value, 16);
            if (seed >= 0 && seed < MAX_PLUS_ONE) {
              update("seed", seed);
            }
          }}
          spellCheck={false}
        />
        <button className={styles.icon} onClick={() => update("seed", Math.floor(Math.random() * MAX_PLUS_ONE))}>
          ifl
        </button>
      </div>
      <div className={styles.inputRow}>
        <button
          className={styles.showAdvanced}
          onClick={() => setShowAdvanced((v) => !v)}
        >
          <span>Advanced</span>
          <span className={styles.icon}>
            {showAdvanced ? 'expand_less' : 'expand_more'}
          </span>
        </button>
      </div>
      {showAdvanced && (
        <>
          <Choice
            of="biome"
            choices={["rock", "ice", "lava"]}
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <Choice
            of="hasMonsters"
            choices={[true, false]}
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <h2>
            Outlines
          </h2>
          <Slider
            of="targetSize"
            min={40}
            max={100}
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <Slider
            of="baseplateMaxRatioOfSize"
            min={0}
            max={1}
            percent
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <Slider
            of="caveCount"
            min={2}
            max={50}
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <Slider
            of="auxiliaryPathCount"
            min={0}
            max={50}
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <Slider
            of="auxiliaryPathMinAngle"
            min={0}
            max={Math.PI}
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <h2>
            Planning
          </h2>
          <Slider
            of="waterPlans"
            min={0}
            max={expectedTotalPlans(contextWithDefaults)}
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <Slider
            of="lavaPlans"
            min={0}
            max={expectedTotalPlans(contextWithDefaults)}
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <Slider
            of="waterLakes"
            min={0}
            max={expectedCavePlans(contextWithDefaults)}
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <Slider
            of="lavaLakes"
            min={0}
            max={expectedCavePlans(contextWithDefaults)}
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <Slider
            of="erosionPlans"
            min={0}
            max={expectedTotalPlans(contextWithDefaults)}
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <Slider
            of="caveBaroqueness"
            min={0}
            max={1}
            percent
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <Slider
            of="hallBaroqueness"
            min={0}
            max={1}
            percent
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          {
            ([
              "caveCrystalRichness",
              "hallCrystalRichness",
              "caveOreRichness",
              "hallOreRichness",
              "monsterSpawnRate",
            ] as const).map((of) => (
              <CurveSliders
                key={of}
                of={of}
                min={-0.5}
                max={1.5}
                step={0.01}
                update={update}
                context={context}
                contextWithDefaults={contextWithDefaults}
              />
            ))
          }
          <CurveSliders
            of="monsterWaveSize"
            min={-1}
            max={5}
            step={0.25}
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <h2>Architects</h2>
          <ArchitectsInput
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
          <h2>Plastic</h2>
          {
            ([
              "caveHasRechargeSeamChance",
              "hallHasRechargeSeamChance",
              "caveHasLandslidesChance",
              "hallHasLandslidesChance",
            ] as const).map((of) => (
              <Slider
                key={of}
                of={of}
                min={0}
                max={1}
                percent
                update={update}
                context={context}
                contextWithDefaults={contextWithDefaults}
              />
            ))
          }
          <Slider
            of="crystalGoalRatio"
            min={0}
            max={1}
            percent
            update={update}
            context={context}
            contextWithDefaults={contextWithDefaults}
          />
        </>
      )}
    </div>
  );
}
