'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-animate',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative w-full min-h-[100dvh] flex items-end pt-32 pb-16 md:pb-20">
      <div className="relative z-10 w-full max-w-[1560px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-end">
        {/* Left: headline */}
        <div className="flex flex-col items-start text-left">
          <div className="hero-animate badge-glass inline-flex items-center gap-2 rounded-full p-1 pr-4 mb-10">
            <span className="bg-plasma-purple text-white rounded-full px-3 py-1 text-xs font-bold leading-none">
              {t.hero.badge.split(']')[0] + ']'}
            </span>
            <span className="text-sm font-body text-ghost-white">
              {t.hero.badge.split('] ')[1]}
            </span>
          </div>

          <h1 className="hero-animate display-xl text-[clamp(44px,7.2vw,100px)] mb-8 flex flex-col items-start">
            <span className="text-ghost-white">{t.hero.h1L1}</span>
            <span className="text-ghost-white">{t.hero.h1L2}</span>
          </h1>

          <p className="hero-animate text-[13px] text-mist font-body tracking-wide">
            {t.hero.subCta}
          </p>
        </div>

        {/* Right: subtitle + CTAs */}
        <div className="hero-animate flex flex-col items-start gap-8 lg:pb-3">
          <p className="font-body text-[17px] md:text-[19px] text-ghost-white/80 max-w-[460px] leading-[1.55]">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-row items-center gap-3 sm:gap-4">
            <Link href="/score" className="magnetic-btn btn-pill-light">
              {t.hero.cta}
              <span className="btn-pill-light-arrow">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </span>
            </Link>
            <a href="#services" className="magnetic-btn btn-pill-secondary px-7 py-3.5 whitespace-nowrap">
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
