'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Instagram, Linkedin, Twitter, Music2 } from 'lucide-react'; // Music2 for tiktok

export default function Footer() {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-24 pb-10 px-6 relative mt-[-10px] z-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <a href="#" className="logo-luxury mb-4 inline-block">
          OUTRICK
        </a>
        <p className="font-body text-mist text-[18px] mb-4">
          {t.footer.tagline}
        </p>
        <a 
          href={`mailto:${t.footer.email}`}
          className="font-body text-[15px] text-mist hover:text-white transition-colors duration-300 mb-12"
        >
          {t.footer.email}
        </a>

        <nav className="flex gap-8 mb-16">
          <a href="#services" className="font-body text-[15px] text-mist hover:text-ghost-white transition-colors">{t.nav.services}</a>
          <a href="#process" className="font-body text-[15px] text-mist hover:text-ghost-white transition-colors">{t.nav.process}</a>
          <a href="#contact" className="font-body text-[15px] text-mist hover:text-ghost-white transition-colors">{t.nav.contact}</a>
        </nav>

        <div className="flex gap-6 mb-16">
          <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-slate border border-white/5 flex items-center justify-center text-mist hover:text-plasma-purple hover:border-plasma-purple/30 transition-all hover-lift">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-slate border border-white/5 flex items-center justify-center text-mist hover:text-plasma-purple hover:border-plasma-purple/30 transition-all hover-lift">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" aria-label="X" className="w-10 h-10 rounded-full bg-slate border border-white/5 flex items-center justify-center text-mist hover:text-plasma-purple hover:border-plasma-purple/30 transition-all hover-lift">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full bg-slate border border-white/5 flex items-center justify-center text-mist hover:text-plasma-purple hover:border-plasma-purple/30 transition-all hover-lift">
            <Music2 className="w-5 h-5" />
          </a>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-10 gap-6">
          <div className="font-mono text-[12px] text-ash tracking-wide flex items-center gap-2 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {t.footer.status}
          </div>

          <div className="text-center font-body text-[13px] text-ash">
             {t.footer.location}
          </div>

          <div className="font-body text-[13px] text-ash">
             &copy; {currentYear} Outrick LLC
          </div>
        </div>
      </div>
    </footer>
  );
}
