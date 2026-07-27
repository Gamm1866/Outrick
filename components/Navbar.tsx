'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageToggle from './LanguageToggle';

// Vertical centre of the fixed header, used to test what it currently sits over
const NAV_HEIGHT = 56;

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Invert the header while it overlaps the light act
  useEffect(() => {
    const light = document.getElementById('act-light');
    if (!light) return;

    const check = () => {
      const { top, bottom } = light.getBoundingClientRect();
      setOnLight(top <= NAV_HEIGHT && bottom >= NAV_HEIGHT);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  return (
    <header className={`fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[1560px] px-5 md:px-10 py-4 md:py-5 ${onLight ? 'nav-on-light' : ''}`}>
      <div className="relative flex items-center justify-between pointer-events-auto">
        <Link href="/" className="logo-luxury text-white">
          OUTRICK
        </Link>

        {/* Right: language switch + single glass slab with links and CTA */}
        <div className="hidden md:flex items-center gap-6">
          <LanguageToggle />
          <div className={`nav-cluster ${scrolled ? 'nav-cluster-scrolled' : ''}`}>
          <Link href="/services" className="nav-cluster-link focus:outline-none focus-visible:ring-2 focus-visible:ring-plasma-purple">
            {t.nav.services}
          </Link>
          <a href="/#process" className="nav-cluster-link focus:outline-none focus-visible:ring-2 focus-visible:ring-plasma-purple">
            {t.nav.process}
          </a>
          <Link href="/blog" className="nav-cluster-link focus:outline-none focus-visible:ring-2 focus-visible:ring-plasma-purple">
            {t.nav.blog}
          </Link>
          <Link href="/score" className="btn-cluster-cta">
            {t.nav.contact}
            <span className="btn-cluster-arrow">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </span>
          </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden nav-mobile-btn text-ghost-white focus:outline-none focus-visible:ring-2 focus-visible:ring-plasma-purple focus-visible:ring-offset-2 focus-visible:ring-offset-deep-void pointer-events-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[110%] left-5 right-5 bg-[#09090F]/80 backdrop-blur-xl border border-white/8 rounded-2xl p-6 flex flex-col gap-6 md:hidden shadow-2xl z-50">
          <Link onClick={() => setMenuOpen(false)} href="/services" className="text-xl text-ghost-white">{t.nav.services}</Link>
          <a onClick={() => setMenuOpen(false)} href="/#process" className="text-xl text-ghost-white">{t.nav.process}</a>
          <Link onClick={() => setMenuOpen(false)} href="/blog" className="text-xl text-ghost-white">{t.nav.blog}</Link>
          <LanguageToggle />
          <Link onClick={() => setMenuOpen(false)} href="/score" className="btn-pill-primary px-6 py-3 text-center">
            {t.nav.contact}
          </Link>
        </div>
      )}
    </header>
  );
}
