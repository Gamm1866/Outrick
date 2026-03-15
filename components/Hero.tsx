'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

import HeroBackground from './HeroBackground';
import HeroStars from './HeroStars';

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
    <section ref={container} className="relative w-full h-[100dvh] hero-gradient overflow-hidden flex items-center justify-center pt-20">
      <HeroBackground />
      <HeroStars />

      <div className="relative z-10 flex flex-col items-center max-w-[800px] px-6 text-center">
        {/* Badge */}
        <div className="hero-animate badge-glass inline-flex items-center gap-2 rounded-full p-1 pr-4 mb-8">
          <span className="bg-plasma-purple text-white rounded-full px-3 py-1 text-xs font-bold leading-none">
            {t.hero.badge.split(']')[0] + ']'}
          </span>
          <span className="text-sm font-body text-ghost-white">
            {t.hero.badge.split('] ')[1]}
          </span>
        </div>

        {/* Title */}
        <h1 className="hero-animate font-inter-tight font-[700] text-[clamp(46px,7vw,82px)] leading-[1.1] tracking-[-0.03em] mb-6 flex flex-col items-center">
          <span className="text-ghost-white">{t.hero.h1L1}</span>
          <span className="text-plasma-purple">{t.hero.h1L2}</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-animate font-body text-[17px] text-mist max-w-[560px] leading-relaxed mb-10">
          {t.hero.subtitle}
        </p>

        {/* Buttons */}
        <div className="hero-animate flex flex-col sm:flex-row items-center gap-4 mb-6">
          <a
            href="#contact"
            className="magnetic-btn btn-pill-primary px-8 py-4 w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              {t.hero.cta.replace(' ↗', '')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </span>
          </a>
          <a
            href="#services"
            className="magnetic-btn btn-pill-secondary px-8 py-4 w-full sm:w-auto"
          >
            {t.hero.cta2}
          </a>
        </div>

        {/* Sub text */}
        <p className="hero-animate text-[13px] text-ash font-body">
          {t.hero.subCta}
        </p>
      </div>
    </section>
  );
}
