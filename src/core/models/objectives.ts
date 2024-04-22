export type Objectives = {
  readonly crystals: number;
  readonly ore: number;
  readonly studs: number;
  readonly variables: readonly {
    readonly condition: string;
    readonly description: string;
  }[];
};

export function serializeObjectives({
  crystals,
  ore,
  studs,
  variables,
}: Objectives): string {
  const result = [];
  if (crystals || ore || studs) {
    result.push(
      `resources: ${crystals.toFixed()},${ore.toFixed()},${studs.toFixed()}`,
    );
  }
  result.push(
    ...variables.map(
      ({ condition, description }) => `${condition}/${description}`,
    ),
  );
  return result.join("\n");
}
