'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('ui');

  const toggleLanguage = () => {
    const nextLocale = locale === 'id' ? 'en' : 'id';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="fixed top-6 right-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm hover:bg-white/20 transition-all pointer-events-auto font-mono uppercase font-bold z-50 focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={t('languageToggle')}
    >
      {locale}
    </button>
  );
}
