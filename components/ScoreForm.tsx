'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScoreForm() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.form-element', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://example.com';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const benefits = [t.form.b1, t.form.b2, t.form.b3];

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 relative">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <div className="form-element max-w-lg">
          <h2 className="text-4xl md:text-5xl text-ghost-white mb-6 leading-tight">
            {t.form.title}
          </h2>
          <p className="font-body text-[17px] text-mist mb-10 leading-relaxed">
            {t.form.sub}
          </p>
          <ul className="space-y-4">
            {benefits.map((b, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                <span className="w-2 h-2 rounded-full bg-plasma-purple mt-2 shrink-0 animate-pulse drop-shadow-[0_0_8px_var(--color-plasma-purple)]" />
                <span className="font-body text-[16px] leading-[1.6] text-ghost-white">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Form Card */}
        <div className="form-element relative">
          <div className="absolute inset-0 bg-plasma-purple/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative xtract-card shadow-2xl">
            {status === 'success' ? (
              <div role="status" className="flex flex-col items-center justify-center text-center py-20 min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-plasma-muted flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-plasma-purple)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-2xl text-ghost-white mb-4">
                  {t.form.success.split('—')[0]}
                </h3>
                <p className="font-body text-mist text-[15px]">
                  {t.form.success.split('—')[1]}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {status === 'error' && (
                  <div role="alert" className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                    An error occurred. Please try again.
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[13px] font-body text-mist pl-1">{t.form.f1}</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      aria-required="true"
                      autoComplete="name"
                      className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-ghost-white font-body focus:outline-none focus:border-plasma-purple focus:ring-4 focus:ring-plasma-purple/20 transition-all placeholder-white/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[13px] font-body text-mist pl-1">{t.form.f2}</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      aria-required="true"
                      autoComplete="email"
                      className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-ghost-white font-body focus:outline-none focus:border-plasma-purple focus:ring-4 focus:ring-plasma-purple/20 transition-all placeholder-white/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-[13px] font-body text-mist pl-1">{t.form.f3}</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required 
                    aria-required="true"
                    autoComplete="tel"
                    className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-ghost-white font-body focus:outline-none focus:border-plasma-purple focus:ring-4 focus:ring-plasma-purple/20 transition-all placeholder-white/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="business" className="text-[13px] font-body text-mist pl-1">{t.form.f4}</label>
                  <input 
                    type="text" 
                    id="business" 
                    name="business" 
                    required 
                    aria-required="true"
                    className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-ghost-white font-body focus:outline-none focus:border-plasma-purple focus:ring-4 focus:ring-plasma-purple/20 transition-all placeholder-white/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="challenge" className="text-[13px] font-body text-mist pl-1">{t.form.f5}</label>
                  <textarea 
                    id="challenge" 
                    name="challenge" 
                    required 
                    aria-required="true"
                    rows={3}
                    placeholder={t.form.placeholder}
                    className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-ghost-white font-body focus:outline-none focus:border-plasma-purple focus:ring-4 focus:ring-plasma-purple/20 transition-all placeholder-white/30 resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                  className="magnetic-btn btn-pill-primary mt-4 w-full py-[18px]"
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    t.form.submit
                  )}
                </button>
                
                <p className="text-center font-body text-[13px] text-ash mt-4">
                  {t.form.privacy}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
