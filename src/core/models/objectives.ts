export type Objectives = {
  readonly crystals: number
  readonly ore: number
  readonly studs: number
  // public hq: {x: number, y: number, description: string} | null = null
  // public miners: {x: number, y: number, minersCount: number}[] = []
}

export function serializeObjectives({crystals, ore, studs}: Objectives): string {
  const result = []
  if (crystals || ore || studs) {
    result.push(`resources: ${crystals.toFixed()},${ore.toFixed()},${studs.toFixed()}`)
  }
  return result.join('\n')
}