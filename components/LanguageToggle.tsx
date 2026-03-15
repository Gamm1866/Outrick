'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-1 items-center text-[13px] font-body bg-white/5 p-1 rounded-full border border-white/5">
      <button
        type="button"
        onClick={() => setLanguage('es')}
        className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
          language === 'es' ? 'bg-plasma-purple text-white font-semibold' : 'text-[#7A7F8E] hover:text-ghost-white'
        }`}
        aria-label="Switch to Spanish"
        aria-pressed={language === 'es'}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
          language === 'en' ? 'bg-plasma-purple text-white font-semibold' : 'text-[#7A7F8E] hover:text-ghost-white'
        }`}
        aria-label="Switch to English"
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
}
