'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { easing } from 'maath';

export default function CameraRig() {
  const { camera, viewport } = useThree();
  
  const targetPosition = useRef(new THREE.Vector3(0, 0, 10));
  const lookAtPosition = useRef(new THREE.Vector3(0, 0, 0));
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame((state, delta) => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, maxScroll > 0 ? scrollY / maxScroll : 0));
    
    // Base camera position
    // Move camera slightly down and push back as we scroll to give a sense of depth
    const baseZ = viewport.width < 10 ? 15 : 12; // Further back on mobile
    targetPosition.current.set(0, -progress * 2, baseZ + progress * 2);

    // Add mouse parallax
    const parallaxX = mouse.current.x * 1.5;
    const parallaxY = mouse.current.y * 1.5;
    
    targetPosition.current.x += parallaxX;
    targetPosition.current.y += parallaxY;

    // Smooth camera movement
    easing.damp3(camera.position, targetPosition.current, 0.5, delta);

    // Look at center with slight parallax
    lookAtPosition.current.set(parallaxX * 0.2, parallaxY * 0.2 - progress * 2, 0);

    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    easing.damp3(currentLookAt, lookAtPosition.current, 0.5, delta);
    camera.lookAt(currentLookAt);
  });

  return null;
}
