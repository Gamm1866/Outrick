'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2 items-center text-[13px] font-body tracking-wide">
      <button
        type="button"
        onClick={() => setLanguage('es')}
        className={`transition-colors duration-300 ${
          language === 'es' ? 'text-ghost-white font-semibold' : 'text-mist hover:text-ghost-white'
        }`}
        aria-label="Switch to Spanish"
        aria-pressed={language === 'es'}
      >
        ES
      </button>
      <span className="text-white/20" aria-hidden="true">/</span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`transition-colors duration-300 ${
          language === 'en' ? 'text-ghost-white font-semibold' : 'text-mist hover:text-ghost-white'
        }`}
        aria-label="Switch to English"
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
}
