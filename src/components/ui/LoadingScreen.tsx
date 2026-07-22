'use client';

import { useTranslations } from 'next-intl';
import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
  const { progress } = useProgress();
  const [isVisible, setIsVisible] = useState(true);
  const t = useTranslations('loading');

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => setIsVisible(false),
      });

      tl.to('.loading-text', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.inOut',
        delay: 0.5
      })
      .to('.loading-screen', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      });
    }
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div 
      className="loading-screen fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03050c] text-white pointer-events-none"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-live="polite"
    >
      <div className="loading-text flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6 tracking-[0.2em] uppercase">Faris Zain</h1>
        <div className="w-64 h-px bg-white/20 overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <p className="mt-4 font-jetbrains-mono text-xs opacity-50 uppercase tracking-widest">
          {t('title')} {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
