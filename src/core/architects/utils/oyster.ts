type _Layer<T> = {
  of: T;
  width: number;
  shrink: number;
  grow: number;
};

export type Layer<T> = {
  of: T;
  width?: number;
  shrink?: number;
  grow?: number;
};

export function fixLayers<T>(layers: Layer<T>[]): _Layer<T>[] {
  return layers.map((ly) => ({ width: 1, shrink: 0, grow: 0, ...ly }));
}

export function expand<T>(layers: readonly _Layer<T>[], radius: number): T[] {
  radius = radius + 1;
  const totalWidth = layers.reduce((t, { width }) => t + width, 0);
  const totalShrink = layers.reduce((t, { shrink }) => t + shrink, 0);
  const totalGrow = layers.reduce((t, { grow }) => t + grow, 0);
  let growFactor = 0;
  let shrinkFactor = 0;
  if (radius < totalWidth && totalShrink > 0) {
    // For the shrink case,
    // r = (w0 * (1 - s0 * sf)) + (w1 * (1 - s1 * sf)) + ...
    //     + (wn * (1 - sn * sf))

    // Solve for sf
    // r = w0 - w0 * s0 * sf + w1 - w1 * s1 * sf + ... + wn - wn * sn * sf
    // r = (w0 + w1 + ... + wn) - (w0 * s0 + w1 * s1 + ... + wn * sn) * sf
    // (w0 * s0 + w1 * s1 + ... + wn * sn) * sf = (w0 + w1 + ... + wn) - r
    // sf = ((w0 + w1 + ... + wn) - r) / (w0 * s0 + w1 * s1 + ... + wn * sn)

    shrinkFactor =
      (totalWidth - radius) /
      layers.reduce((t, { width, shrink }) => t + width * shrink, 0);
  } else if (radius > totalWidth && totalGrow > 0) {
    // For the growth case,
    // r = (w0 + g0 * gf) + (w1 + g1 * gf) + ... + (wn + gn * gf)

    // Solve for gf
    // r = (w0 + w1 + ... + wn) + (g0 + g1 + ... + gn) * gf
    // (r - (w0 + w1 + ... + wn)) /  (g0 + g1 + ... + gn) = gf
    growFactor = (radius - totalWidth) / totalGrow;
  }

  const result = [];
  let w = 0;
  for (const { of, width, shrink, grow } of layers) {
    w = w + width * Math.max(0, 1 - shrink * shrinkFactor) + grow * growFactor;
    while (Math.round(w) > 0) {
      result.push(of);
      w -= 1;
    }
  }

  return result;
}
