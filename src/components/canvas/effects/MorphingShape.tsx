'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/stores/useStore';
import { easing } from 'maath';

const INSTANCE_COUNT = 100; // 100 is very lightweight for InstancedMesh

export default function MorphingShape() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const currentSection = useStore((state) => state.currentSection);
  
  // Dummy object to calculate positions
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Arrays to hold current positions, rotations, and scales for smooth interpolation
  // We store them here so they persist across frames and can be lerped
  const currentTransforms = useMemo(() => {
    return Array.from({ length: INSTANCE_COUNT }).map(() => ({
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Quaternion(),
      scale: new THREE.Vector3(0, 0, 0), // start invisible/small
    }));
  }, []);

  const targetColor = useRef(new THREE.Color('#ffffff'));
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    const time = state.clock.getElapsedTime();

    // Determine target formations based on section
    let colorHex = '#ffffff';

    for (let i = 0; i < INSTANCE_COUNT; i++) {
      const current = currentTransforms[i];
      const targetPos = new THREE.Vector3();
      const targetRot = new THREE.Euler();
      const targetScale = new THREE.Vector3(1, 1, 1);
      
      switch (currentSection) {
        case 'hero':
          // Form a cohesive sphere
          colorHex = '#ffffff';
          const phi = Math.acos(-1 + (2 * i) / INSTANCE_COUNT);
          const theta = Math.sqrt(INSTANCE_COUNT * Math.PI) * phi;
          targetPos.set(
            3 * Math.cos(theta) * Math.sin(phi),
            3 * Math.sin(theta) * Math.sin(phi) + Math.sin(time * 2 + i) * 0.1,
            3 * Math.cos(phi)
          );
          targetRot.set(time * 0.2, time * 0.2, 0);
          targetScale.setScalar(1 + Math.sin(time * 3 + i) * 0.2);
          break;
          
        case 'about':
          // Orbiting ring
          colorHex = '#8b5cf6';
          const angle = (i / INSTANCE_COUNT) * Math.PI * 2 + time * 0.3;
          const radius = 4 + Math.sin(i * 0.5) * 0.5;
          targetPos.set(
            Math.cos(angle) * radius,
            Math.sin(angle * 3) * 1.5,
            Math.sin(angle) * radius
          );
          targetRot.set(time, angle, 0);
          targetScale.setScalar(0.8);
          break;

        case 'projects':
          // Grid formation
          colorHex = '#10b981';
          const cols = 10;
          const row = Math.floor(i / cols);
          const col = i % cols;
          targetPos.set(
            (col - cols / 2 + 0.5) * 0.8,
            (row - cols / 2 + 0.5) * 0.8 + Math.sin(time * 2 + col * 0.2) * 0.5,
            Math.sin(time * 2 + row * 0.2) * 0.5
          );
          targetRot.set(0, time * 0.5, 0);
          targetScale.setScalar(0.7);
          break;

        case 'skills':
          // DNA Helix
          colorHex = '#00f0ff';
          const y = (i / INSTANCE_COUNT) * 12 - 6;
          const helixAngle = i * 0.4 + time * 0.5;
          targetPos.set(
            Math.cos(helixAngle) * 3,
            y,
            Math.sin(helixAngle) * 3
          );
          targetRot.set(0, -helixAngle, 0);
          targetScale.setScalar(0.9);
          break;

        case 'experience':
          // Abstract scattered pillar / wave
          colorHex = '#e040fb';
          targetPos.set(
            Math.cos(i * 2.3) * (1.5 + Math.sin(time + i * 0.1) * 1),
            (i / INSTANCE_COUNT) * 12 - 6,
            Math.sin(i * 2.3) * (1.5 + Math.cos(time + i * 0.1) * 1)
          );
          targetRot.set(time * 0.5, time * 0.2, i);
          targetScale.setScalar(0.5 + (i % 5) * 0.2);
          break;

        case 'contact':
          // Exploded / pulsing core
          colorHex = '#ff0055';
          const pulse = 1 + Math.sin(time * 4) * 0.2;
          const randX = Math.sin(i * 123.45) * 5;
          const randY = Math.cos(i * 678.9) * 5;
          const randZ = Math.sin(i * 345.6) * 5;
          targetPos.set(randX * pulse, randY * pulse, randZ * pulse);
          targetRot.set(time * (i % 3 + 1), time, 0);
          targetScale.setScalar(pulse * 0.6);
          break;

        default:
          break;
      }

      // Smoothly interpolate current transforms to target
      current.position.lerp(targetPos, 4 * delta);
      
      const targetQuat = new THREE.Quaternion().setFromEuler(targetRot);
      current.rotation.slerp(targetQuat, 4 * delta);
      
      current.scale.lerp(targetScale, 4 * delta);

      // Apply to dummy and set matrix
      dummy.position.copy(current.position);
      dummy.quaternion.copy(current.rotation);
      dummy.scale.copy(current.scale);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Smooth color transition
    targetColor.current.set(colorHex);
    easing.dampC(materialRef.current.color, targetColor.current, 0.25, delta);
    easing.dampC(materialRef.current.emissive, targetColor.current, 0.25, delta);
  });

  return (
    <group position={[0, 0, 0]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, INSTANCE_COUNT]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial 
          ref={materialRef}
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </instancedMesh>
    </group>
  );
}
