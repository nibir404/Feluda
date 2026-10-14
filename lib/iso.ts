const C = Math.cos(Math.PI / 6);
export const p = (u: number, v: number, z = 0, ox = 0, oy = 0) => [ox + (u - v) * C, oy + (u + v) * 0.5 - z] as const;
const pts = (a: readonly (readonly [number, number])[]) => a.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/** Returns top/left/right face point strings for an isometric box. */
export function box(u: number, v: number, z: number, w: number, d: number, h: number, ox = 0, oy = 0) {
  const P = (a: number, b: number, c: number) => p(a, b, c, ox, oy);
  return {
    top: pts([P(u, v, z + h), P(u + w, v, z + h), P(u + w, v + d, z + h), P(u, v + d, z + h)]),
    left: pts([P(u, v + d, z), P(u + w, v + d, z), P(u + w, v + d, z + h), P(u, v + d, z + h)]),
    right: pts([P(u + w, v, z), P(u + w, v + d, z), P(u + w, v + d, z + h), P(u + w, v, z + h)]),
  };
}
