// Feluda dotted-sphere mark, rebuilt from the design's circle grid.
const rows: [number, (number | [number, number])[]][] = [
  [24, [72, 88, 104, 120, 136]],
  [32, [64, 80, 96, 104, 112, 128, 144]],
  [40, [56, [72, 136], 152]],
  [48, [48, [64, 144], 160]],
  [56, [40, [56, 152], 168]],
  [64, [32, [48, 96], 152, 160, 176]],
  [72, [24, [40, 96], 152, 160, 168, 184]],
  [80, [[32, 96], 152, 160, 168, 176]],
  [88, [24, [40, 96], 152, 160, 168, 184]],
  [96, [[32, 96], 152, 160, 168, 176]],
  [104, [[24, 96], [152, 184]]],
  [112, [[32, 176]]],
  [120, [24, [40, 168], 184]],
  [128, [[32, 176]]],
  [136, [24, [40, 168], 184]],
  [144, [32, [48, 160], 176]],
  [152, [40, [56, 152], 168]],
  [160, [48, [64, 144], 160]],
  [168, [56, [72, 136], 152]],
  [176, [64, 80, 96, 104, 112, 128, 144]],
  [184, [72, 88, 104, 120, 136]],
];
const dots = rows.flatMap(([y, xs]) =>
  xs.flatMap((x) => (Array.isArray(x) ? Array.from({ length: (x[1] - x[0]) / 8 + 1 }, (_, i) => x[0] + i * 8) : [x])).map((x) => ({ x, y, r: 3.6 - 0.01215 * x })),
);

export default function Logo({ size = 30, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 208 208" aria-hidden className="shrink-0">
      {dots.map((d) => <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r={d.r.toFixed(2)} fill={color} />)}
    </svg>
  );
}
