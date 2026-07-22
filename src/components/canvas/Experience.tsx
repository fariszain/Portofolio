'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import { Suspense } from 'react';
import CameraRig from './CameraRig';
import StarField from './effects/StarField';
import MorphingShape from './effects/MorphingShape';

export default function Experience() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#03050c']} />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1.5}
          />
          
          <CameraRig />
          <StarField />
          <MorphingShape />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
