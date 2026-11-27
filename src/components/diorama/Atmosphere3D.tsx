"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Atmosphere3DProps {
  isNight: boolean;
  reducedMotion: boolean;
}

export function Atmosphere3D({ isNight, reducedMotion }: Atmosphere3DProps) {
  const firefliesRef = useRef<THREE.InstancedMesh>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const fireflySeeds = useMemo(() => {
    const count = 42;
    return Array.from({ length: count }, (_, i) => ({
      x: ((i * 7.3) % 15) - 7.5,
      y: 0.7 + ((i * 1.9) % 2.4),
      z: ((i * 3.7) % 4.5) - 1.5,
      speed: 0.4 + (i % 5) * 0.18,
      phase: i * 1.13,
    }));
  }, []);

  const cloudPositions = useMemo<[number, number, number, number][]>(
    () => [
      [-8.5, 4.4, -3.5, 1.3],
      [-2.2, 4.9, -4.8, 1.1],
      [4.8, 4.5, -3.9, 1.4],
      [9.2, 4.2, 1.6, 1.0],
      [-6.2, 4.6, 3.2, 0.95],
    ],
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (firefliesRef.current) {
      fireflySeeds.forEach((f, i) => {
        const yOffset = reducedMotion ? 0 : Math.sin(t * f.speed + f.phase) * 0.25;
        const xOffset = reducedMotion ? 0 : Math.cos(t * f.speed * 0.6 + f.phase) * 0.2;
        const scale = isNight ? 0.065 : 0.028;
        dummy.position.set(f.x + xOffset, f.y + yOffset, f.z);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        firefliesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      firefliesRef.current.instanceMatrix.needsUpdate = true;
    }

    if (cloudsRef.current && !reducedMotion) {
      cloudsRef.current.children.forEach((cloud, idx) => {
        cloud.position.x += delta * (0.08 + idx * 0.015);
        if (cloud.position.x > 16) cloud.position.x = -16;
      });
    }
  });

  return (
    <>
      <color attach="background" args={[isNight ? "#0B131B" : "#DFECEA"]} />
      <fog attach="fog" args={[isNight ? "#0B131B" : "#DFECEA", 32, 78]} />

      {/* Warm Nusantara Daylight vs Moonlit Lantern Night */}
      <ambientLight intensity={isNight ? 0.32 : 0.72} color={isNight ? "#8AA6C4" : "#FFF6E6"} />
      <hemisphereLight
        args={[
          isNight ? "#223A52" : "#FFF8EC",
          isNight ? "#14100E" : "#6D543D",
          isNight ? 0.45 : 0.75,
        ]}
      />
      <directionalLight
        castShadow
        position={isNight ? [-8, 12, -6] : [10, 15, 9]}
        intensity={isNight ? 0.85 : 2.15}
        color={isNight ? "#A7C4E2" : "#FFE7C2"}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Warm lantern fill light over Java at night */}
      {isNight && (
        <pointLight
          position={[0, 3.2, 0.8]}
          intensity={14}
          distance={18}
          color="#F2BC52"
        />
      )}

      {/* Instanced fireflies / golden dust */}
      <instancedMesh
        ref={firefliesRef}
        args={[undefined, undefined, fireflySeeds.length]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color={isNight ? "#FFD479" : "#FFF7E0"}
          transparent
          opacity={isNight ? 0.88 : 0.35}
        />
      </instancedMesh>

      {/* Low-poly drifting clouds */}
      <group ref={cloudsRef}>
        {cloudPositions.map(([x, y, z, scale], i) => (
          <group key={i} position={[x, y, z]} scale={scale}>
            <mesh>
              <dodecahedronGeometry args={[0.7, 0]} />
              <meshStandardMaterial
                color={isNight ? "#263647" : "#FFFFFF"}
                roughness={0.95}
                transparent
                opacity={isNight ? 0.45 : 0.82}
              />
            </mesh>
            <mesh position={[0.65, -0.1, 0.1]}>
              <dodecahedronGeometry args={[0.52, 0]} />
              <meshStandardMaterial
                color={isNight ? "#263647" : "#FFFFFF"}
                roughness={0.95}
                transparent
                opacity={isNight ? 0.45 : 0.82}
              />
            </mesh>
            <mesh position={[-0.6, -0.14, -0.05]}>
              <dodecahedronGeometry args={[0.48, 0]} />
              <meshStandardMaterial
                color={isNight ? "#263647" : "#FFFFFF"}
                roughness={0.95}
                transparent
                opacity={isNight ? 0.45 : 0.82}
              />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}
