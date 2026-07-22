'use client';

import { Stars, Sparkles } from '@react-three/drei';

export default function StarField() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.2} color="#00f0ff" />
      <Sparkles count={100} scale={15} size={3} speed={0.2} opacity={0.3} color="#e040fb" />
    </>
  );
}
