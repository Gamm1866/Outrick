'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function DiagnosticShuffler() {
  const [cards, setCards] = useState([
    { id: 1, label: 'Conversion Rate: 3.2% → 7.8%', color: 'from-amber-400/20 to-amber-600/20' },
    { id: 2, label: 'Bounce Rate: 72% → 41%', color: 'from-blue-400/20 to-blue-600/20' },
    { id: 3, label: 'LTV Score: $120 → $340', color: 'from-emerald-400/20 to-emerald-600/20' },
  ]);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop()!;
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-44 w-full flex items-center justify-center pt-8">
      {cards.map((card, i) => (
        <div 
          key={card.id}
          className={`absolute flex items-center justify-center p-4 rounded-xl border border-white/10 bg-gradient-to-br ${card.color} backdrop-blur-md shadow-xl transition-all duration-700 w-[240px] z-${30 - i * 10}`}
          style={{
            transform: `translateY(${i * 12}px) scale(${1 - i * 0.05})`,
            opacity: 1 - i * 0.2,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <span className="font-mono text-sm font-bold text-ghost-white">{card.label}</span>
        </div>
      ))}
    </div>
  );
}

function TelemetryTypewriter() {
  const lines = [
    "→ WhatsApp bot qualified 12 leads today",
    "→ Voice assistant scheduled 8 calls",
    "→ AI content generated 24 posts this week",
    "→ Automation saved 32 hours this month"
  ];
  
  const [text, setText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      setText(lines[0]);
      return;
    }

    let currentText = "";
    let charIdx = 0;
    let isTyping = true;
    let timeout: NodeJS.Timeout;

    const type = () => {
      if (charIdx < lines[lineIdx].length) {
        currentText += lines[lineIdx][charIdx];
        setText(currentText);
        charIdx++;
        timeout = setTimeout(type, 50);
      } else {
        timeout = setTimeout(() => {
          setLineIdx((prev) => (prev + 1) % lines.length);
        }, 3000);
      }
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, [lineIdx]);

  return (
    <div className="w-full bg-white/5 rounded-xl border border-white/5 p-5 min-h[140px] shadow-inner font-mono text-[13px] relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
        <span className="w-2 h-2 rounded-full bg-plasma-light animate-pulse" />
        <span className="text-ash uppercase tracking-wider text-[10px] font-bold">Live Feed</span>
      </div>
      <div className="text-plasma-light min-h-[40px]">
        {text}
        <span className="inline-block w-[6px] h-[1em] bg-plasma-purple ml-1 animate-pulse align-middle" />
      </div>
    </div>
  );
}

function CursorProtocol() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.set('.mock-cursor', { x: 20, y: 120, opacity: 0 })
        .to('.mock-cursor', { opacity: 1, duration: 0.3 })
        .to('.mock-cursor', { x: 140, y: 50, duration: 1, ease: 'power2.inOut' })
        .to('.mock-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.day-cell-active', { backgroundColor: 'var(--color-plasma-purple)', color: '#FFF', duration: 0.2 }, '-=0.1')
        .to('.mock-cursor', { x: 200, y: 110, duration: 0.8, ease: 'power2.inOut', delay: 0.3 })
        .to('.mock-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.save-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, '-=0.1')
        .to('.mock-cursor', { opacity: 0, duration: 0.3 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div ref={containerRef} className="relative w-full h-44 bg-white/5 rounded-xl border border-white/5 p-5 flex flex-col justify-between overflow-hidden">
      <div className="flex justify-between items-center px-2 z-10">
        {days.map((d, i) => (
          <div key={i} className={`day-cell-${i===4 ? 'active' : 'inactive'} w-8 h-8 rounded shrink-0 flex items-center justify-center font-mono text-xs text-mist border border-white/10 transition-colors`}>
            {d}
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4 z-10 w-full px-2">
        <div className="save-btn bg-white/5 text-ghost-white text-[11px] font-mono px-4 py-1.5 rounded border border-white/10">
          Save Metric
        </div>
      </div>
      <div className="mock-cursor absolute top-0 left-0 w-6 h-6 z-20 pointer-events-none drop-shadow-md">
        <MousePointer2 className="w-5 h-5 text-ghost-white fill-ghost-white" />
      </div>
    </div>
  );
}

export default function Features() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 px-6 relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-ghost-white mb-6">
            {t.services.title}
          </h2>
          <p className="font-body text-mist text-[18px] leading-relaxed">
            {t.services.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
           <div className="cards-glow left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
          {/* Card 1 */}
          <div className="feature-card xtract-card flex flex-col items-center">
            <DiagnosticShuffler />
            <div className="mt-12 text-center">
              <h3 className="text-[22px] text-ghost-white mb-4">
                {t.services.s1.title}
              </h3>
              <p className="font-body text-mist text-[15px] leading-relaxed">
                {t.services.s1.desc}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-card xtract-card flex flex-col items-center">
            <div className="w-full h-44 flex items-center justify-center">
              <TelemetryTypewriter />
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-[22px] text-ghost-white mb-4">
                {t.services.s2.title}
              </h3>
              <p className="font-body text-mist text-[15px] leading-relaxed">
                {t.services.s2.desc}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-card xtract-card flex flex-col items-center">
            <div className="w-full h-44 flex items-center justify-center">
               <CursorProtocol />
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-[22px] text-ghost-white mb-4">
                {t.services.s3.title}
              </h3>
              <p className="font-body text-mist text-[15px] leading-relaxed">
                {t.services.s3.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
