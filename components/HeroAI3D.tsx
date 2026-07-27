'use client';

// ponytail: CSS 3D (perspective + preserve-3d), no three.js. Swap to WebGL only if
// the design ever needs real geometry/lighting.
const RINGS = [
  { rx: 72, ry: 0, size: 100, dur: '18s' },
  { rx: 72, ry: 60, size: 100, dur: '22s' },
  { rx: 72, ry: 120, size: 100, dur: '26s' },
  { rx: 20, ry: 0, size: 78, dur: '30s' },
  { rx: 90, ry: 30, size: 60, dur: '14s' },
];

const NODES = [
  { dur: '9s', delay: '0s', radius: 190 },
  { dur: '13s', delay: '-3s', radius: 150 },
  { dur: '17s', delay: '-7s', radius: 220 },
];

export default function HeroAI3D() {
  return (
    <div className="ai-core" aria-hidden="true">
      <div className="ai-core-stage">
        <div className="ai-core-nucleus" />
        {RINGS.map((r, i) => (
          <div
            key={i}
            className="ai-ring"
            style={
              {
                '--rx': `${r.rx}deg`,
                '--ry': `${r.ry}deg`,
                '--size': `${r.size}%`,
                '--dur': r.dur,
              } as React.CSSProperties
            }
          />
        ))}
        {NODES.map((n, i) => (
          <div
            key={i}
            className="ai-orbit"
            style={
              {
                '--dur': n.dur,
                '--delay': n.delay,
                '--radius': `${n.radius}px`,
              } as React.CSSProperties
            }
          >
            <span className="ai-node" />
          </div>
        ))}
      </div>
    </div>
  );
}
