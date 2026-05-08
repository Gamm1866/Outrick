'use client';

import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const response = await fetch('https://formsubmit.co/ajax/sales@outrick.net', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          _subject: 'Blog subscriber: ' + email,
          _template: 'table',
          _honey: '',
        }),
      });
      setStatus(response.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-7">
      {status === 'done' ? (
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <p className="font-body text-[15px] text-ghost-white">
            You&apos;re in. We&apos;ll send the next guide directly to your inbox.
          </p>
        </div>
      ) : (
        <>
          <p className="font-mono text-[11px] text-plasma-purple tracking-widest uppercase mb-3">
            Free guides · No spam
          </p>
          <h3 className="font-heading text-[18px] font-light text-ghost-white mb-2">
            Get the next growth guide in your inbox
          </h3>
          <p className="font-body text-[14px] text-mist mb-5">
            One practical guide per week on metrics, AI automation, and conversion. Unsubscribe anytime.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              maxLength={100}
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 font-body text-[14px] text-ghost-white placeholder:text-ash focus:outline-none focus:border-plasma-purple/50 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-pill-primary px-6 py-2.5 text-[14px] shrink-0 disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe →'}
            </button>
          </form>
          {status === 'error' && (
            <p className="mt-3 font-body text-[13px] text-red-400">Something went wrong. Please try again.</p>
          )}
        </>
      )}
    </div>
  );
}
