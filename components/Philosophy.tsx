'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<{ top: string, left: string, duration: string, delay: string }[]>([]);

  useEffect(() => {
    // Fixed positions for dots to prevent hydration mismatch
    const dotPositions = [
      { top: '10%', left: '15%', duration: '3s', delay: '0s' },
      { top: '25%', left: '45%', duration: '4s', delay: '1s' },
      { top: '40%', left: '72%', duration: '2.5s', delay: '0.5s' },
      { top: '55%', left: '28%', duration: '5s', delay: '2s' },
      { top: '70%', left: '85%', duration: '3.5s', delay: '1.5s' },
      { top: '15%', left: '60%', duration: '4.5s', delay: '0.8s' },
      { top: '80%', left: '40%', duration: '3s', delay: '2.5s' },
      { top: '35%', left: '90%', duration: '5s', delay: '0.3s' },
      { top: '60%', left: '10%', duration: '4s', delay: '1.8s' },
      { top: '45%', left: '55%', duration: '3.5s', delay: '3s' },
      { top: '20%', left: '80%', duration: '2.8s', delay: '0.7s' },
      { top: '75%', left: '25%', duration: '4.2s', delay: '2.2s' },
      { top: '50%', left: '68%', duration: '3.8s', delay: '1.2s' },
      { top: '30%', left: '35%', duration: '5s', delay: '0.4s' },
      { top: '85%', left: '55%', duration: '3.2s', delay: '2.8s' },
      { top: '12%', left: '92%', duration: '4.8s', delay: '1.6s' },
      { top: '65%', left: '18%', duration: '3.6s', delay: '0.9s' },
      { top: '42%', left: '78%', duration: '4.4s', delay: '2.4s' },
      { top: '58%', left: '42%', duration: '3.1s', delay: '3.2s' },
      { top: '22%', left: '52%', duration: '5.2s', delay: '0.6s' },
      { top: '78%', left: '65%', duration: '3.4s', delay: '1.4s' },
      { top: '48%', left: '8%', duration: '4.6s', delay: '2.6s' },
      { top: '32%', left: '22%', duration: '3.9s', delay: '0.2s' },
      { top: '68%', left: '48%', duration: '4.1s', delay: '1.9s' },
      { top: '18%', left: '38%', duration: '5.5s', delay: '3.5s' },
      { top: '52%', left: '82%', duration: '3.3s', delay: '0.1s' },
      { top: '88%', left: '72%', duration: '4.3s', delay: '2.1s' },
      { top: '38%', left: '58%', duration: '3.7s', delay: '1.1s' },
      { top: '72%', left: '32%', duration: '4.7s', delay: '2.9s' },
      { top: '28%', left: '88%', duration: '5.1s', delay: '0.5s' },
    ];
    setDots(dotPositions);

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.reveal-word');
      gsap.fromTo(words, 
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  const targetEn = 'scientific growth';
  const targetEs = 'crecimiento científico';
  const targetWord = language === 'en' ? targetEn : targetEs;

  const sentence2Words = t.philosophy.p2.split(' ').map((word, i) => {
    const isTarget = targetWord.includes(word.replace(/[^a-zA-Záéíóú]/g, ''));
    return (
      <span 
        key={i} 
        className={`reveal-word inline-block mr-[0.25em] ${isTarget ? 'text-plasma-purple font-drama [font-style:italic!important] [text-shadow:0_0_40px_rgba(123,97,255,0.3)]' : 'text-ghost-white font-inter-tight'}`}
      >
        {word}
      </span>
    );
  });

  return (
    <section 
      ref={sectionRef} 
      className="relative py-[140px] overflow-hidden flex items-center justify-center"
      style={{ background: 'rgba(5, 5, 10, 0.5)' }}
    >
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="philosophy-grid" />
        <div className="philosophy-scanline" />
        <div className="philosophy-glow" />
        {dots.map((dot, i) => (
          <div 
            key={i}
            className="philosophy-dot"
            style={{
              top: dot.top,
              left: dot.left,
              // @ts-ignore
              '--duration': dot.duration,
              '--delay': dot.delay
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div ref={textRef} className="relative z-[1] max-w-[900px] mx-auto px-6 text-center space-y-12">
        <p className="font-body text-mist text-[20px] max-w-2xl mx-auto leading-relaxed">
          {t.philosophy.p1.split(' ').map((word, i) => (
            <span key={i} className="reveal-word inline-block mr-[0.25em]">{word}</span>
          ))}
        </p>

        <h2 className="text-[clamp(36px,5vw,56px)] leading-[1.2] tracking-wide relative">
          {sentence2Words}
        </h2>
      </div>
    </section>
  );
}
