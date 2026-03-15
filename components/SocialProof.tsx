'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SocialProof() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-card', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 border-y border-white/5 overflow-hidden relative">
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <h2 className="text-4xl md:text-5xl text-ghost-white mb-6">
          {t.proof.title}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 relative">
        <div className="cards-glow left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-60" />
        {/* Card 1 */}
        <div className="stat-card xtract-card flex flex-col items-start md:items-center text-left md:text-center">
          <div className="font-inter-tight text-[56px] font-[700] text-plasma-purple leading-none mb-2">
            +5
          </div>
          <div className="font-body text-[14px] font-[600] uppercase tracking-[0.1em] text-[#7A7F8E] mb-4">
            Years
          </div>
          <p className="font-body text-[16px] text-[#7A7F8E] leading-relaxed">
            Optimizing digital experiences
          </p>
        </div>

        {/* Card 2 */}
        <div className="stat-card xtract-card flex flex-col items-start md:items-center text-left md:text-center">
          <div className="font-body text-[12px] font-[600] uppercase tracking-[0.15em] text-[#4A4F62] mb-4">
            TRUSTED BY
          </div>
          <div className="font-inter-tight text-[20px] font-[600] text-ghost-white leading-tight mb-4">
            Arturo Calle · Bata · Payless
          </div>
          <p className="font-body text-[15px] text-[#7A7F8E] leading-relaxed">
            Former design lead for recognized brands
          </p>
        </div>

        {/* Card 3 */}
        <div className="stat-card xtract-card flex flex-col items-start md:items-center text-left md:text-center">
          <div className="font-inter-tight text-[56px] font-[700] text-plasma-purple leading-none mb-2">
            100%
          </div>
          <div className="font-body text-[14px] font-[600] uppercase tracking-[0.1em] text-[#7A7F8E] mb-4">
            Digital
          </div>
          <p className="font-body text-[16px] text-[#7A7F8E] leading-relaxed">
            Remote consultancy — Hollywood, FL
          </p>
        </div>
      </div>
    </section>
  );
}
