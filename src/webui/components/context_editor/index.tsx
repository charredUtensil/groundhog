import React, { useEffect, useReducer, useState } from "react";
import { CavernContext, inferContextDefaults } from "../../../core/common";
import { MAX_PLUS_ONE } from "../../../core/common/prng";
import styles from "./style.module.scss";
import { Choice, CurveSliders, Slider } from "./controls";
import { ArchitectsInput } from "./architects";

const INITIAL_SEED = Date.now() % MAX_PLUS_ONE;

function parseSeed(v: string) {
  const s = v.replace(/[^0-9a-fA-F]+/g, "");
  const seed = s === "" ? -1 : parseInt(s, 16);
  return seed >= 0 && seed < MAX_PLUS_ONE ? seed : undefined;
}

function unparseSeed(v: number, split: boolean) {
  const s = v.toString(16).padStart(8, "0").toUpperCase();
  return split ? `${s.substring(0, 3)} ${s.substring(3, 6)} ${s.substring(6)}` : s;
}

const expectedTotalPlans = (contextWithDefaults: CavernContext) => {
  const caves = contextWithDefaults.caveCount;
  const spanHalls = contextWithDefaults.caveCount - 1;
  const auxHalls =
    contextWithDefaults.optimalAuxiliaryPathCount +
    contextWithDefaults.randomAuxiliaryPathCount;
  return caves + spanHalls + auxHalls;
};

type PartialContext = Partial<CavernContext> & Pick<CavernContext, "seed">;

export function CavernContextInput({
  dispatchState,
}: {
  dispatchState: (args: { context: CavernContext }) => void;
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [context, update] = useReducer(
    (
      was: PartialContext,
      args:
        | { [K in keyof CavernContext]?: CavernContext[K] | undefined }
        | "reset",
    ): PartialContext => {
      if (args === "reset") {
        return { seed: was.seed };
      }
      const r = { ...was, ...args };
      for (const key of Object.keys(r) as (keyof typeof r)[]) {
        if (r[key] === undefined) {
          if (key in r) {
            delete r[key];
          }
        }
      }
      return r;
    },
    { seed: parseSeed(window.location.hash) ?? INITIAL_SEED },
  );

  useEffect(() => {
    const fn = () => {
      const seed = parseSeed(window.location.hash);
      if (seed !== undefined) {
        update({ seed: seed });
      }
    };
    window.addEventListener("hashchange", fn);
    return () => {
      window.removeEventListener("hashchange", fn);
    };
  }, []);

  useEffect(() => {
    window.location.hash = unparseSeed(context.seed, false);
  }, [context.seed]);

  useEffect(
    () => dispatchState({ context: inferContextDefaults(context) }),
    [context, dispatchState],
  );
  const contextWithDefaults = inferContextDefaults(context);
  const rest = { update, context, contextWithDefaults };

  return (
    <div className={styles.contextInput}>
      <div className={styles.inputRow}>
        <input
          type="text"
          className={styles.seed}
          value={unparseSeed(context?.seed, true)}
          onChange={(ev) => {
            const seed = parseSeed(ev.target.value);
            if (seed !== undefined) {
              update({ seed: seed });
            }
          }}
          spellCheck={false}
        />
        <button
          className={styles.icon}
          onClick={() =>
            update({ seed: Math.floor(Math.random() * MAX_PLUS_ONE) })
          }
        >
          ifl
        </button>
      </div>
      <div className={styles.inputRow}>
        <button
          className={`${styles.showAdvanced} ${Object.keys(context).length > 1 && !showAdvanced ? styles.override : ""}`}
          onClick={() => setShowAdvanced((v) => !v)}
        >
          <span>Advanced</span>
          <span className={styles.icon}>
            {showAdvanced ? "expand_less" : "expand_more"}
          </span>
        </button>
      </div>
      {showAdvanced && (
        <>
          <div className={styles.section}>
            <div className={styles.subsection}>
              <div className={styles.inputRow}>
                {contextWithDefaults.overrides.length ? (
                  <button
                    className={styles.override}
                    onClick={() => update("reset")}
                  >
                    Clear All Overrides
                  </button>
                ) : (
                  <div className={styles.invisible} />
                )}
              </div>
              <Choice of="biome" choices={["rock", "ice", "lava"]} {...rest} />
              <Choice of="hasMonsters" choices={[true, false]} {...rest} />
              <Choice of="hasSlugs" choices={[true, false]} {...rest} />
              <Choice of="hasAirLimit" choices={[true, false]} {...rest} />
            </div>
          </div>
          <div className={styles.section}>
            <h2>Outlines</h2>
            <div className={styles.subsection}>
              <h3>Partition</h3>
              <Slider of="targetSize" min={40} max={100} {...rest} />
              <Slider of="baseplateMaxOblongness" min={0} max={10} {...rest} />
              <Slider
                of="baseplateMaxRatioOfSize"
                min={0}
                max={1}
                percent
                {...rest}
              />
            </div>
            <div className={styles.subsection}>
              <h3>Discriminate</h3>
              <Slider of="caveCount" min={3} max={50} {...rest} />
            </div>
            <div className={styles.subsection}>
              <h3>Weave</h3>
              <Slider
                of="optimalAuxiliaryPathCount"
                min={0}
                max={contextWithDefaults.caveCount}
                {...rest}
              />
              <Slider
                of="randomAuxiliaryPathCount"
                min={0}
                max={contextWithDefaults.caveCount}
                {...rest}
              />
              <Slider
                of="auxiliaryPathMinAngle"
                min={0}
                max={Math.PI}
                angle
                {...rest}
              />
            </div>
          </div>
          <div className={styles.section}>
            <h2>Planning</h2>
            <div className={styles.subsection}>
              <h3>Flood</h3>
              <Slider
                of="waterPlans"
                min={0}
                max={expectedTotalPlans(contextWithDefaults)}
                {...rest}
              />
              <Slider
                of="lavaPlans"
                min={0}
                max={expectedTotalPlans(contextWithDefaults)}
                {...rest}
              />
              <Slider
                of="waterLakes"
                min={1}
                max={contextWithDefaults.caveCount}
                {...rest}
              />
              <Slider
                of="lavaLakes"
                min={1}
                max={contextWithDefaults.caveCount}
                {...rest}
              />
              <Slider
                of="erosionPlans"
                min={0}
                max={expectedTotalPlans(contextWithDefaults)}
                {...rest}
              />
            </div>
            <div className={styles.subsection}>
              <h3>Establish</h3>
              {(
                [
                  "caveCrystalRichness",
                  "hallCrystalRichness",
                  "caveOreRichness",
                  "hallOreRichness",
                  "monsterSpawnRate",
                ] as const
              ).map((of) => (
                <CurveSliders
                  key={of}
                  of={of}
                  min={-0.5}
                  max={1.5}
                  step={0.01}
                  {...rest}
                />
              ))}
              <CurveSliders
                of="monsterWaveSize"
                min={-1}
                max={5}
                step={0.25}
                {...rest}
              />
              <ArchitectsInput {...rest} />
            </div>
            <div className={styles.subsection}>
              <h3>Pearl</h3>
              <Slider of="caveBaroqueness" min={0} max={1} percent {...rest} />
              <Slider of="hallBaroqueness" min={0} max={1} percent {...rest} />
            </div>
          </div>
          <div className={styles.section}>
            <h2>Masonry</h2>
            <div className={styles.subsection}>
              <h3>Fine</h3>
              {(
                [
                  "caveHasRechargeSeamChance",
                  "hallHasRechargeSeamChance",
                  "caveCrystalSeamBias",
                  "hallCrystalSeamBias",
                  "caveOreSeamBias",
                  "hallOreSeamBias",
                  "caveHasSlugHoleChance",
                  "hallHasSlugHoleChance",
                ] as const
              ).map((of) => (
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
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <h2>Plastic</h2>
            <div className={styles.subsection}>
              <h3>Strataform</h3>
              <Slider
                of="heightTargetRange"
                min={0}
                max={600}
                step={5}
                {...rest}
              />
              <Slider of="stratascosity" min={0} max={20} step={1} {...rest} />
            </div>
            <div className={styles.subsection}>
              <h3>Strataflux</h3>
              <Slider of={"strataplanity"} min={0} max={10} {...rest} />
              {(
                [
                  "caveMaxSlope",
                  "hallMaxSlope",
                  "voidMaxSlope",
                  "borderMaxSlope",
                ] as const
              ).map((of) => (
                <Slider key={of} of={of} min={0} max={300} {...rest} />
              ))}
            </div>
            <div className={styles.subsection}>
              <h3>Populate</h3>
              {(
                ["caveHasLandslidesChance", "hallHasLandslidesChance"] as const
              ).map((of) => (
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
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <h2>Ephemera</h2>
            <div className={styles.subsection}>
              <h3>Aerate</h3>
              <Slider
                of="airSafetyFactor"
                min={1}
                max={5}
                step={0.1}
                {...rest}
              />
            </div>
            <div className={styles.subsection}>
              <h3>Adjure</h3>
              <Slider of="crystalGoalRatio" min={0} max={1} percent {...rest} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
