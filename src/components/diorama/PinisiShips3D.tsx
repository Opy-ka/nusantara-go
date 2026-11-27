"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PinisiShips3DProps {
  isNight: boolean;
  reducedMotion: boolean;
}

interface SeaRoute {
  points: [number, number, number][];
  speed: number;
  offset: number;
}

const SEA_ROUTES: SeaRoute[] = [
  // Java Sea route (Banten -> Kalimantan -> Surabaya)
  {
    points: [
      [-8.5, -0.08, 1.8],
      [-5.2, -0.08, 1.1],
      [-2.2, -0.08, 1.4],
      [-4.8, -0.08, 2.2],
    ],
    speed: 0.028,
    offset: 0.0,
  },
  // Makassar Strait -> Flores Sea route
  {
    points: [
      [0.4, -0.08, -1.6],
      [0.8, -0.08, 1.2],
      [2.6, -0.08, 2.6],
      [1.8, -0.08, 0.2],
    ],
    speed: 0.024,
    offset: 0.35,
  },
  // Banda & Spice Islands route
  {
    points: [
      [5.4, -0.08, -0.8],
      [7.8, -0.08, 1.6],
      [9.4, -0.08, -0.4],
      [7.2, -0.08, -1.8],
    ],
    speed: 0.026,
    offset: 0.7,
  },
];

function PinisiBoat({
  route,
  isNight,
  reducedMotion,
}: {
  route: SeaRoute;
  isNight: boolean;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const nextPos = useMemo(() => new THREE.Vector3(), []);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        route.points.map((p) => new THREE.Vector3(...p)),
        true
      ),
    [route.points]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = reducedMotion
      ? route.offset
      : (state.clock.elapsedTime * route.speed + route.offset) % 1;
    const nextT = (t + 0.01) % 1;

    curve.getPointAt(t, pos);
    curve.getPointAt(nextT, nextPos);

    const bob = reducedMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * 2.4 + route.offset * 10) * 0.035;
    ref.current.position.set(pos.x, pos.y + bob, pos.z);
    ref.current.lookAt(nextPos.x, pos.y + bob, nextPos.z);
  });

  return (
    <group ref={ref} scale={0.28}>
      {/* Wooden Pinisi hull */}
      <mesh position={[0, 0.14, 0]} castShadow>
        <boxGeometry args={[0.42, 0.22, 1.35]} />
        <meshStandardMaterial color="#6D3F24" roughness={0.85} />
      </mesh>
      {/* Bow sprit */}
      <mesh position={[0, 0.32, 0.85]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.7, 6]} />
        <meshStandardMaterial color="#59321C" />
      </mesh>
      {/* Twin Masts */}
      <mesh position={[0, 0.78, 0.18]}>
        <cylinderGeometry args={[0.025, 0.03, 1.2, 6]} />
        <meshStandardMaterial color="#59321C" />
      </mesh>
      <mesh position={[0, 0.68, -0.32]}>
        <cylinderGeometry args={[0.022, 0.028, 1.0, 6]} />
        <meshStandardMaterial color="#59321C" />
      </mesh>
      {/* Cream Sails */}
      <mesh position={[0.04, 0.85, 0.25]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.55, 0.78]} />
        <meshStandardMaterial
          color="#F7F2E8"
          side={THREE.DoubleSide}
          roughness={0.75}
        />
      </mesh>
      <mesh position={[0.04, 0.74, -0.25]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.42, 0.62]} />
        <meshStandardMaterial
          color="#EFE5D0"
          side={THREE.DoubleSide}
          roughness={0.75}
        />
      </mesh>
      {/* Warm deck lantern visible at night */}
      <mesh position={[0, 0.36, -0.45]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial
          color="#F2BC52"
          emissive="#F2BC52"
          emissiveIntensity={isNight ? 2.4 : 0.3}
        />
      </mesh>
    </group>
  );
}

export function PinisiShips3D({ isNight, reducedMotion }: PinisiShips3DProps) {
  return (
    <group>
      {SEA_ROUTES.map((route, i) => (
        <PinisiBoat
          key={i}
          route={route}
          isNight={isNight}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}
