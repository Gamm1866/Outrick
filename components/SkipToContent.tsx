'use client';

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-plasma-purple text-white px-4 py-2 rounded-xl font-bold border-[3px] border-solid border-ghost-white focus:outline-none"
    >
      Skip to content
    </a>
  );
}
