'use client';

import { useTranslations } from 'next-intl';
import { useStore } from '@/stores/useStore';
import { useLenis } from 'lenis/react';
import { useActiveSection } from '@/hooks/useActiveSection';

export function Navigation() {
  const t = useTranslations('nav');
  const { currentSection } = useStore();
  const lenis = useLenis();
  
  useActiveSection();
  
  const sections = [
    { id: 'hero', label: t('hero') },
    { id: 'about', label: t('about') },
    { id: 'projects', label: t('projects') },
    { id: 'skills', label: t('skills') },
    { id: 'experience', label: t('experience') },
    { id: 'contact', label: t('contact') }
  ];

  return (
    <nav 
      className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto z-50"
      role="navigation"
      aria-label="Main Navigation"
    >
      {sections.map(section => (
        <button 
          key={section.id}
          className={`w-3 h-3 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-primary ${
            currentSection === section.id 
              ? 'bg-[#00f0ff] scale-150 shadow-[0_0_10px_#00f0ff]' 
              : 'bg-white/30 hover:bg-white/60'
          }`}
          title={section.label}
          aria-label={`Scroll to ${section.label}`}
          aria-current={currentSection === section.id ? 'page' : undefined}
          onClick={() => {
            if (lenis) {
              lenis.scrollTo(`#${section.id}`);
            } else {
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      ))}
    </nav>
  );
}
