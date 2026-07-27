'use client';

// ponytail: CSS-only volumetric backdrop (blurred radial arcs + slats + grain).
// No WebGL/three.js — swap only if the design ever needs real light transport.
export default function HeroVeil() {
  return (
    <div className="veil" aria-hidden="true">
      <div className="veil-layer veil-layer-a" />
      <div className="veil-layer veil-layer-b" />
      <div className="veil-ripples" />
      <div className="veil-slats" />
      <div className="veil-grain" />
      <div className="veil-vignette" />
    </div>
  );
}
