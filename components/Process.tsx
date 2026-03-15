'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  const steps = [t.process.s1, t.process.s2, t.process.s3, t.process.s4, t.process.s5];

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      gsap.set('.process-step', { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo('.process-step',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsContainerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="pt-[120px] pb-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl text-ghost-white mb-6">
            {t.process.title}
          </h2>
          <p className="font-body text-mist text-[15px] tracking-[0.2em] uppercase">
            {t.process.sub}
          </p>
        </div>

        <div ref={stepsContainerRef} className="relative">
          {/* Desktop Timeline Line - Positioned below titles */}
          <div className="hidden md:block absolute top-[100px] left-0 w-full h-[1px] bg-white/10 z-0">
             <div className="timeline-pulse" />
          </div>

          {/* Steps Container */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="process-step group flex flex-col items-start md:items-center text-left md:text-center transition-all">
                
                {/* 1. Step Number */}
                <span className="font-mono text-[14px] font-[600] text-plasma-purple mb-4">
                  0{i + 1}
                </span>

                {/* 2. Step Title */}
                <h3 className="font-[700] text-2xl text-ghost-white mb-8 min-h-[3.5rem] flex items-center">
                  {step.title}
                </h3>

                {/* 3. Visual Indicator (Circle) */}
                <div className="relative mb-8 flex items-center justify-center w-full md:w-auto">
                   {/* Vertical Line (Mobile) - Positioned on the left */}
                   <div className="md:hidden absolute top-[-40px] left-[5px] w-[1px] h-[calc(100%+80px)] bg-white/10 -z-10">
                      <div className="timeline-pulse-v" />
                   </div>
                   
                   <div className="w-[10px] h-[10px] rounded-full bg-plasma-purple shadow-[0_0_10px_rgba(123,97,255,0.5)] z-10" />
                </div>

                {/* 4. Description */}
                <div className="md:px-4 pl-8 md:pl-4">
                  <p className="font-body text-[15px] text-mist leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
