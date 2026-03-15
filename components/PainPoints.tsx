'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PainPoints() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const funnelPositions = [20, 28, 36, 42, 25];

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.pain-card', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    { 
      icon: (
        <div className="w-16 h-16 relative">
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <path d="M8 8 L56 8 L38 32 L38 56 L26 56 L26 32 Z" fill="none" stroke="rgba(123,97,255,0.3)" strokeWidth="1.5"/>
            {[0,1,2,3,4].map((i) => (
              <circle key={i} r="3" fill="#7B61FF">
                <animate attributeName="cx" values={`${15 + i * 8};32;${funnelPositions[i]}`} dur={`${2 + i * 0.5}s`} repeatCount="indefinite"/>
                <animate attributeName="cy" values="4;28;60" dur={`${2 + i * 0.5}s`} repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.8;0.6;0" dur={`${2 + i * 0.5}s`} repeatCount="indefinite"/>
              </circle>
            ))}
            <circle r="3" fill="#00E87B">
              <animate attributeName="cx" values="32;32;32" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="4;32;58" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;1;0.5" dur="3s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      ), 
      text: t.pain.p1, 
      number: '01' 
    },
    { 
      icon: (
        <div className="w-16 h-16 relative">
          <svg viewBox="0 0 64 64" className="w-full h-full">
            {[12, 28, 44].map((x, i) => (
              <rect key={i} x={x} width="8" rx="2" fill={i === 1 ? "#7B61FF" : "rgba(123,97,255,0.25)"}>
                <animate attributeName="height" values={`${20 + i * 10};${35 - i * 5};${20 + i * 10}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite"/>
                <animate attributeName="y" values={`${44 - i * 10};${29 + i * 5};${44 - i * 10}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite"/>
              </rect>
            ))}
            <text x="32" y="18" textAnchor="middle" fill="#7B61FF" fontSize="16" fontFamily="JetBrains Mono" fontWeight="700">
              ?
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </text>
          </svg>
        </div>
      ), 
      text: t.pain.p2, 
      number: '02' 
    },
    { 
      icon: (
        <div className="w-16 h-16 relative">
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(123,97,255,0.25)" strokeWidth="1.5"/>
            {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => {
              const angle = (i * 30 - 90) * Math.PI / 180;
              return <circle key={i} cx={32 + 22 * Math.cos(angle)} cy={32 + 22 * Math.sin(angle)} r="1.5" fill="rgba(123,97,255,0.3)"/>;
            })}
            <line x1="32" y1="32" x2="32" y2="12" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="3s" repeatCount="indefinite"/>
            </line>
            <line x1="32" y1="32" x2="32" y2="18" stroke="rgba(123,97,255,0.5)" strokeWidth="2.5" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="8s" repeatCount="indefinite"/>
            </line>
            <circle cx="32" cy="32" r="3" fill="#7B61FF"/>
          </svg>
        </div>
      ), 
      text: t.pain.p3, 
      number: '03' 
    },
    { 
      icon: (
        <div className="w-16 h-16 relative">
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <polyline points="4,40 12,20 20,45 28,15 36,38 44,22 52,42 60,18" fill="none" stroke="rgba(123,97,255,0.2)" strokeWidth="1.5" strokeDasharray="4 2">
              <animate attributeName="stroke-dashoffset" values="0;-60" dur="4s" repeatCount="indefinite"/>
            </polyline>
            <polyline points="4,50 16,45 28,38 40,30 52,20 60,12" fill="none" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="3s" repeatCount="indefinite"/>
            </polyline>
            <circle cx="60" cy="12" r="4" fill="#7B61FF">
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      ), 
      text: t.pain.p4, 
      number: '04' 
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 relative">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-center text-3xl md:text-4xl text-ghost-white mb-16">
          {t.pain.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="cards-glow left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
          {cards.map((card, idx) => (
            <div 
              key={idx}
              className="pain-card xtract-card group items-start gap-6 flex"
            >
              <span className="absolute top-6 right-6 font-mono text-[13px] text-ash opacity-40 group-hover:opacity-100 group-hover:text-plasma-purple transition-colors">
                {card.number}
              </span>
              
              <div className="flex-shrink-0">
                {card.icon}
              </div>
              
              <h3 className="text-mist text-[17px] leading-relaxed pr-8 pt-1 group-hover:text-ghost-white transition-colors">
                {card.text}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
