'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

import HeroBackground from './HeroBackground';
import HeroStars from './HeroStars';
import HeroAI3D from './HeroAI3D';

export default function Hero() {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Stagger entrance
      gsap.fromTo('.hero-animate', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative w-full min-h-[100dvh] hero-gradient overflow-hidden flex items-end justify-center pt-32 pb-24">
      <HeroBackground />
      <HeroStars />
      <HeroAI3D />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-end">
        {/* Left: badge + headline */}
        <div className="flex flex-col items-start text-left">
          <div className="hero-animate badge-glass inline-flex items-center gap-2 rounded-full p-1 pr-4 mb-8">
            <span className="bg-[#3E63E0] text-white rounded-full px-3 py-1 text-xs font-bold leading-none">
              {t.hero.badge.split(']')[0] + ']'}
            </span>
            <span className="text-sm font-body text-ghost-white">
              {t.hero.badge.split('] ')[1]}
            </span>
          </div>

          <h1 className="hero-animate font-body font-[500] text-[clamp(40px,6.4vw,73px)] leading-[1.05] tracking-[-0.02em] mb-6 flex flex-col items-start">
            <span className="text-ghost-white">{t.hero.h1L1}</span>
            <span className="text-plasma-light">{t.hero.h1L2}</span>
          </h1>

          <p className="hero-animate text-[13px] text-ash font-body">
            {t.hero.subCta}
          </p>
        </div>

        {/* Right: subtitle + CTAs */}
        <div className="hero-animate flex flex-col items-start lg:items-end text-left lg:text-right gap-6 pb-2">
          <p className="font-body text-[17px] text-mist max-w-[420px] leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <Link
              href="/score"
              className="magnetic-btn btn-pill-primary px-8 py-4 w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                {t.hero.cta.replace(' ↗', '')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </span>
            </Link>
            <a
              href="#services"
              className="magnetic-btn btn-pill-secondary px-8 py-4 w-full sm:w-auto"
            >
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
