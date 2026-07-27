'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 w-[calc(100%-32px)] max-w-[1240px] mt-4 px-4 md:px-8 py-3 ${
        scrolled ? 'nav-pill nav-pill-scrolled' : ''
      }`}
    >
      <div className="relative flex items-center justify-between pointer-events-auto">
        <Link href="/" className="logo-luxury text-white">
          OUTRICK
        </Link>

        {/* Center: links pill */}
        <nav className="hidden md:flex nav-links-pill items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <Link href="/services" className="nav-link-item focus:outline-none focus-visible:ring-2 focus-visible:ring-plasma-purple">
            {t.nav.services}
          </Link>
          <a href="/#process" className="nav-link-item focus:outline-none focus-visible:ring-2 focus-visible:ring-plasma-purple">
            {t.nav.process}
          </a>
          <Link href="/blog" className="nav-link-item focus:outline-none focus-visible:ring-2 focus-visible:ring-plasma-purple">
            {t.nav.blog}
          </Link>
        </nav>

        {/* Right: language + primary CTA */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />
          <Link href="/score" className="magnetic-btn btn-pill-light whitespace-nowrap">
            {t.nav.contact}
            <span className="btn-pill-light-arrow">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-ghost-white p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-plasma-purple focus-visible:ring-offset-2 focus-visible:ring-offset-deep-void rounded flex items-center justify-center pointer-events-auto"
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
        <div className="absolute top-[120%] left-0 w-full bg-[#09090F]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col gap-6 md:hidden shadow-2xl z-50">
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
