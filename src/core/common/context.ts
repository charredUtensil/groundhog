export type Biome = 'rock' | 'ice' | 'lava';
export type Curve = {
  readonly base: number,
  readonly hops: number,
  readonly completion: number,
}
export type CavernContext = {
  seed: number,
  biome: Biome,
}