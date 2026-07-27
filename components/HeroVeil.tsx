'use client';

// ponytail: CSS-only volumetric backdrop (blurred radial arcs + slats + grain).
// Fixed to the viewport so it stays continuous behind every section.
// Parallax runs on scroll-driven animations, no JS scroll listener.
export default function HeroVeil() {
  return (
    <div className="veil" aria-hidden="true">
      <div className="veil-stage">
        <div className="veil-layer veil-layer-a" />
        <div className="veil-layer veil-layer-b" />
        <div className="veil-ripples" />
      </div>
      <div className="veil-slats" />
      <div className="veil-grain" />
      <div className="veil-vignette" />
    </div>
  );
}
