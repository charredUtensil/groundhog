import React, { useCallback, useEffect, useState } from "react";
import { CavernContext, inferContextDefaults } from "../../../core/common";
import { MAX_PLUS_ONE } from "../../../core/common/prng";
import styles from "./style.module.scss";
import { Choice, CurveSliders, ExponentialSlider, Slider } from "./controls";
import { ArchitectsInput } from "./architects";
import { PartialCavernContext } from "../../../core/common/context";
import { Cavern } from "../../../core/models/cavern";

const INITIAL_SEED = Date.now() % MAX_PLUS_ONE;

export function getInitialSeed() {
  return parseSeed(window.location.hash) ?? INITIAL_SEED;
}

function parseSeed(v: string) {
  const s = v.replace(/[^0-9a-fA-F]+/g, "");
  const seed = s === "" ? -1 : parseInt(s, 16);
  return seed >= 0 && seed < MAX_PLUS_ONE ? seed : undefined;
}

function unparseSeed(v: number, split: boolean) {
  const s = v.toString(16).padStart(8, "0").toUpperCase();
  return split
    ? `${s.substring(0, 3)} ${s.substring(3, 6)} ${s.substring(6)}`
    : s;
}

const expectedTotalPlans = (contextWithDefaults: CavernContext) => {
  const caves = contextWithDefaults.caveCount;
  const spanHalls = contextWithDefaults.caveCount - 1;
  const auxHalls =
    contextWithDefaults.optimalAuxiliaryPathCount +
    contextWithDefaults.randomAuxiliaryPathCount;
  return caves + spanHalls + auxHalls;
};

export function CavernContextInput({
  initialContext,
  cavern,
  setInitialContext,
}: {
  initialContext: PartialCavernContext;
  cavern: Cavern | undefined;
  setInitialContext: React.Dispatch<React.SetStateAction<PartialCavernContext>>;
}) {
  return (
    <CavernContextInputInner
      initialContext={initialContext}
      context={cavern?.context ?? inferContextDefaults(initialContext)}
      cavern={cavern}
      setInitialContext={setInitialContext}
    />
  );
}

function CavernContextInputInner({
  initialContext,
  context,
  cavern,
  setInitialContext,
}: {
  initialContext: PartialCavernContext;
  context: CavernContext;
  cavern: Cavern | undefined;
  setInitialContext: React.Dispatch<React.SetStateAction<PartialCavernContext>>;
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const resetContext = useCallback(
    () => setInitialContext((was) => ({ seed: was.seed })),
    [setInitialContext],
  );
  const update = useCallback(
    (args: Partial<CavernContext>) =>
      setInitialContext((was: PartialCavernContext) => {
        const r = { ...was, ...args };
        for (const key of Object.keys(r) as (keyof typeof r)[]) {
          if (r[key] === undefined) {
            if (key in r) {
              delete r[key];
            }
          }
        }
        return r;
      }),
    [setInitialContext],
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
  }, [update]);

  useEffect(() => {
    window.location.hash = unparseSeed(initialContext.seed, false);
  }, [initialContext.seed]);

  const rest = { update, initialContext, context };

  return (
    <div className={styles.contextInput}>
      <div className={styles.inputRow}>
        <input
          type="text"
          className={styles.seed}
          value={unparseSeed(initialContext.seed, true)}
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
          className={`${styles.showAdvanced} ${Object.keys(initialContext).length > 1 && !showAdvanced ? styles.override : ""}`}
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
                {Object.keys(initialContext).length > 1 ? (
                  <button className={styles.override} onClick={resetContext}>
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
                max={context.caveCount}
                {...rest}
              />
              <Slider
                of="randomAuxiliaryPathCount"
                min={0}
                max={context.caveCount}
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
                max={expectedTotalPlans(context)}
                {...rest}
              />
              <Slider
                of="lavaPlans"
                min={0}
                max={expectedTotalPlans(context)}
                {...rest}
              />
              <Slider
                of="waterLakes"
                min={1}
                max={context.caveCount}
                {...rest}
              />
              <Slider
                of="lavaLakes"
                min={1}
                max={context.caveCount}
                {...rest}
              />
              <Slider
                of="erosionPlans"
                min={0}
                max={expectedTotalPlans(context)}
                {...rest}
              />
            </div>
            <div className={styles.subsection}>
              <h3>Anchor</h3>
              <ExponentialSlider
                of={"anchorGravity"}
                min={-7}
                max={7}
                step={0.5}
                {...rest}
              />
              <ExponentialSlider
                of={"anchorWhimsy"}
                min={-7}
                max={7}
                step={0.5}
                {...rest}
              />
            </div>
            <div className={styles.subsection}>
              <h3>Establish</h3>
              <ExponentialSlider
                of={"planWhimsy"}
                min={-7}
                max={7}
                step={0.5}
                {...rest}
              />
              <ArchitectsInput {...rest} cavern={cavern} />
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
            </div>
            <div className={styles.subsection}>
              <h3>Pearl</h3>
              <Slider
                of="caveBaroqueness"
                min={0}
                max={0.8}
                percent
                {...rest}
              />
              <Slider
                of="hallBaroqueness"
                min={0}
                max={0.8}
                percent
                {...rest}
              />
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
                  initialContext={initialContext}
                  context={context}
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
                  initialContext={initialContext}
                  context={context}
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
              <Slider
                of="crystalGoalRatio"
                min={0}
                max={0.9}
                percent
                {...rest}
              />
            </div>
            <div className={styles.subsection}>
              <h3>Enscribe</h3>
              <Slider of="globalHostilesCooldown" min={0} max={20} {...rest} />
              <Slider
                of="globalHostilesCap"
                min={0}
                max={40}
                zeroLabel="disabled"
                {...rest}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
