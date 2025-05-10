export type Objectives = {
  readonly crystals: number;
  readonly ore: number;
  readonly studs: number;
  readonly tags: { readonly [K in string]?: true };
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
  const result = variables.map(
    ({ condition, description }) => `variable:${condition}/${description}`,
  );
  if (crystals || ore || studs) {
    result.push(
      `resources: ${crystals.toFixed()},${ore.toFixed()},${studs.toFixed()}`,
    );
  }
  return result.join("\n");
}
