'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.6, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}
