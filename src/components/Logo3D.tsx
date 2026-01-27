"use client";

/* ====================================================================
   3D Rocket Component - Aggressive Fire Theme with Speed Effects
   Features: Rocket ship, flame exhaust, speed lines, particle trails
   ==================================================================== */

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cone, Cylinder, Sphere } from "@react-three/drei";
import * as THREE from "three";

/* ======= Rocket Body Component ======= */
function RocketBody() {
  const rocketRef = useRef<THREE.Group>(null);
  const innerFlameRef = useRef<THREE.Mesh>(null);
  const outerFlameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (rocketRef.current) {
      // Subtle hovering/shaking effect for speed feel
      rocketRef.current.position.x = Math.sin(state.clock.elapsedTime * 8) * 0.03;
      rocketRef.current.position.y = Math.sin(state.clock.elapsedTime * 6) * 0.02;
    }
    // Flame flickering effect
    if (innerFlameRef.current && outerFlameRef.current) {
      const flicker = 0.9 + Math.sin(state.clock.elapsedTime * 30) * 0.15;
      const flicker2 = 0.95 + Math.sin(state.clock.elapsedTime * 25 + 1) * 0.1;
      innerFlameRef.current.scale.set(flicker, flicker * 1.2, flicker);
      outerFlameRef.current.scale.set(flicker2, flicker2 * 1.1, flicker2);
    }
  });

  return (
    <group ref={rocketRef} rotation={[0, 0, -Math.PI / 4]}>
      {/* Rocket Nose Cone */}
      <Cone args={[0.4, 1.2, 32]} position={[0, 2.4, 0]}>
        <meshStandardMaterial
          color="#dc2626"
          emissive="#991b1b"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Cone>
      
      {/* Nose Tip - Bright Orange */}
      <Cone args={[0.15, 0.4, 16]} position={[0, 3.15, 0]}>
        <meshStandardMaterial
          color="#f97316"
          emissive="#ea580c"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </Cone>
      
      {/* Main Body */}
      <Cylinder args={[0.4, 0.5, 2.5, 32]} position={[0, 0.8, 0]}>
        <meshStandardMaterial
          color="#1f2937"
          emissive="#374151"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.3}
        />
      </Cylinder>
      
      {/* Body Stripe 1 */}
      <Cylinder args={[0.42, 0.42, 0.15, 32]} position={[0, 1.4, 0]}>
        <meshStandardMaterial
          color="#f97316"
          emissive="#ea580c"
          emissiveIntensity={0.6}
          metalness={0.7}
          roughness={0.2}
        />
      </Cylinder>
      
      {/* Body Stripe 2 */}
      <Cylinder args={[0.44, 0.44, 0.1, 32]} position={[0, 0.2, 0]}>
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.2}
        />
      </Cylinder>
      
      {/* Engine Section */}
      <Cylinder args={[0.5, 0.55, 0.8, 32]} position={[0, -0.7, 0]}>
        <meshStandardMaterial
          color="#111827"
          emissive="#1f2937"
          emissiveIntensity={0.3}
          metalness={0.95}
          roughness={0.1}
        />
      </Cylinder>
      
      {/* Engine Nozzle */}
      <Cone args={[0.45, 0.6, 32]} position={[0, -1.3, 0]} rotation={[Math.PI, 0, 0]}>
        <meshStandardMaterial
          color="#0f172a"
          emissive="#dc2626"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.2}
        />
      </Cone>
      
      {/* Fins - 4 fins at 90 degree angles */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <mesh position={[0.5, -0.5, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.6, 1, 0.08]} />
            <meshStandardMaterial
              color="#dc2626"
              emissive="#991b1b"
              emissiveIntensity={0.4}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}
      
      {/* Window/Porthole */}
      <Sphere args={[0.15, 16, 16]} position={[0.35, 1.2, 0]}>
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#22d3ee"
          emissiveIntensity={1}
          metalness={0.1}
          roughness={0.1}
        />
      </Sphere>

      {/* ======= Flame Exhaust - Integrated with rocket ======= */}
      {/* Outer flame - Orange/Red */}
      <Cone ref={outerFlameRef} args={[0.5, 2.5, 16]} position={[0, -2.9, 0]} rotation={[Math.PI, 0, 0]}>
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.9}
        />
      </Cone>
      
      {/* Middle flame - Yellow/Orange */}
      <Cone args={[0.35, 2, 16]} position={[0, -2.7, 0]} rotation={[Math.PI, 0, 0]}>
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.95}
        />
      </Cone>
      
      {/* Inner flame - White hot core */}
      <Cone ref={innerFlameRef} args={[0.2, 1.5, 16]} position={[0, -2.4, 0]} rotation={[Math.PI, 0, 0]}>
        <meshBasicMaterial
          color="#fef3c7"
          transparent
          opacity={1}
        />
      </Cone>
      
      {/* Flame tip glow */}
      <Sphere args={[0.35, 16, 16]} position={[0, -4, 0]}>
        <meshBasicMaterial
          color="#dc2626"
          transparent
          opacity={0.5}
        />
      </Sphere>
    </group>
  );
}

/* ======= Speed Lines Component ======= */
function SpeedLines() {
  const linesRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const lineData = [];
    for (let i = 0; i < 25; i++) {
      lineData.push({
        x: -3 + Math.random() * 2,
        y: Math.random() * 6 - 3,
        z: Math.random() * 2 - 1,
        length: 0.8 + Math.random() * 1.5,
        speed: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      });
    }
    return lineData;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        const data = lines[i];
        const time = (state.clock.elapsedTime * data.speed + data.delay) % 4;
        // Move from bottom-left to top-right
        line.position.x = data.x + time * 2;
        line.position.y = data.y + time * 2;
        // Fade in and out
        const material = (line as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (time < 0.5) {
          material.opacity = time * 2;
        } else if (time > 3.5) {
          material.opacity = (4 - time) * 2;
        } else {
          material.opacity = 0.6;
        }
      });
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <mesh key={i} position={[line.x, line.y, line.z]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[line.length, 0.02, 0.02]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#fbbf24" : "#ffffff"}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ======= Ember Trail Particles ======= */
function EmberTrail() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;
  
  // Rocket flame exit point (accounting for 45 degree rotation)
  // The rocket nozzle is at local [0, -1.6, 0], rotated -45 degrees
  // In world space this becomes approximately [-2.3, -2.3, 0] from scene center
  const flameExitX = -2.3;
  const flameExitY = -2.3;

  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Start near the flame exit (bottom-left due to 45 deg rotation)
      const spread = (Math.random() - 0.5) * 0.6;
      pos[i * 3] = flameExitX + spread;
      pos[i * 3 + 1] = flameExitY + spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      
      // Velocity going towards bottom-left (opposite to rocket direction at 45 deg)
      const speed = 2 + Math.random() * 3;
      vel[i * 3] = -speed * 0.707; // cos(45)
      vel[i * 3 + 1] = -speed * 0.707; // sin(45)
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      
      // Fire colors
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.6; col[i * 3 + 2] = 0.1; // Orange
      } else if (colorChoice < 0.7) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.8; col[i * 3 + 2] = 0.2; // Yellow
      } else {
        col[i * 3] = 1; col[i * 3 + 1] = 0.3; col[i * 3 + 2] = 0.1; // Red
      }
    }
    return [pos, vel, col];
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i * 3] * delta;
        posArray[i * 3 + 1] += velocities[i * 3 + 1] * delta;
        posArray[i * 3 + 2] += velocities[i * 3 + 2] * delta;
        
        // Reset particle if it goes too far
        if (posArray[i * 3] < -8 || posArray[i * 3 + 1] < -8) {
          const spread = (Math.random() - 0.5) * 0.6;
          posArray[i * 3] = flameExitX + spread;
          posArray[i * 3 + 1] = flameExitY + spread;
          posArray[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

/* ======= Smoke Trail ======= */
function SmokeTrail() {
  const smokeRef = useRef<THREE.Group>(null);
  
  // Smoke puffs trailing behind the rocket at 45 degrees (bottom-left direction)
  const smokePuffs = useMemo(() => {
    const puffs = [];
    for (let i = 0; i < 8; i++) {
      // Trail goes diagonally bottom-left (opposite to rocket's top-right direction)
      const distance = i * 0.5;
      puffs.push({
        offset: i * 0.5,
        size: 0.25 + i * 0.12,
        x: -distance * 0.707, // cos(45)
        y: -distance * 0.707, // sin(45)
      });
    }
    return puffs;
  }, []);

  useFrame((state) => {
    if (smokeRef.current) {
      smokeRef.current.children.forEach((puff, i) => {
        const time = state.clock.elapsedTime;
        const material = (puff as THREE.Mesh).material as THREE.MeshBasicMaterial;
        // Fade out further puffs
        material.opacity = Math.max(0, 0.25 - i * 0.03 + Math.sin(time * 2 + i) * 0.05);
        // Slight diagonal movement
        const wobble = Math.sin(time + i) * 0.1;
        puff.position.x = smokePuffs[i].x + wobble * 0.707;
        puff.position.y = smokePuffs[i].y + wobble * 0.707;
      });
    }
  });

  // Position smoke at the flame exit point (accounting for rocket rotation)
  return (
    <group ref={smokeRef} position={[-2.5, -2.5, 0]}>
      {smokePuffs.map((puff, i) => (
        <Sphere key={i} args={[puff.size, 16, 16]} position={[puff.x, puff.y, 0]}>
          <meshBasicMaterial
            color="#374151"
            transparent
            opacity={0.3 - i * 0.04}
          />
        </Sphere>
      ))}
    </group>
  );
}

/* ======= Background Stars (sparse) ======= */
function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  const starCount = 150;

  const positions = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = -5 - Math.random() * 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      const posArray = starsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        // Move stars towards bottom-left (opposite to rocket)
        posArray[i * 3] -= 0.02;
        posArray[i * 3 + 1] -= 0.02;
        
        // Reset if out of view
        if (posArray[i * 3] < -10) {
          posArray[i * 3] = 10;
          posArray[i * 3 + 1] = (Math.random() - 0.5) * 20;
        }
        if (posArray[i * 3 + 1] < -10) {
          posArray[i * 3 + 1] = 10;
          posArray[i * 3] = (Math.random() - 0.5) * 20;
        }
      }
      starsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ffffff"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

/* ======= Main 3D Scene Component ======= */
function Scene() {
  const sceneRef = useRef<THREE.Group>(null);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Main light from rocket direction */}
      <pointLight position={[2, 2, 3]} intensity={1.5} color="#f97316" />
      
      {/* Flame glow light */}
      <pointLight position={[0.5, -2, 1]} intensity={2} color="#fbbf24" distance={8} />
      
      {/* Back light for depth */}
      <pointLight position={[-3, 0, -2]} intensity={0.5} color="#dc2626" />
      
      <group ref={sceneRef} position={[0.5, -0.3, 0]}>
        {/* Rocket positioned heading to top-right (flame integrated) */}
        <RocketBody />
        
        {/* Ember particles trailing behind */}
        <EmberTrail />
        
        {/* Smoke trail */}
        <SmokeTrail />
      </group>
      
      {/* Speed lines effect */}
      <SpeedLines />
      
      {/* Background stars */}
      <Stars />
    </>
  );
}

/* ======= Exported Logo3D Component ======= */
export default function Logo3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
