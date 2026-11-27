"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LandmarkType } from "@/types/culture";

interface Landmark3DProps {
  type: LandmarkType;
  position: [number, number, number];
  isHovered: boolean;
  isNight: boolean;
  reducedMotion: boolean;
}

export function Landmark3D({
  type,
  position,
  isHovered,
  isNight,
  reducedMotion,
}: Landmark3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const baseY = position[1];
    const floatY = reducedMotion ? 0 : Math.sin(t * 1.7 + position[0]) * 0.045;
    const hoverLift = isHovered ? 0.2 : 0;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      baseY + floatY + hoverLift,
      Math.min(1, delta * 7)
    );
    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * (isHovered ? 0.85 : 0.24);
    }
  });

  const lanternEmissive = isNight ? "#F2BC52" : "#000000";
  const lanternIntensity = isNight ? 1.4 : 0;

  return (
    <group ref={groupRef} position={position} scale={0.34}>
      {/* Rumah Gadang (horn roof) */}
      {type === "gadang" && (
        <group>
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[1.5, 0.65, 0.85]} />
            <meshStandardMaterial color="#8A3B24" roughness={0.82} />
          </mesh>
          <mesh position={[-0.65, 1.15, 0]} rotation={[0, 0, 0.42]} castShadow>
            <coneGeometry args={[0.45, 1.0, 4]} />
            <meshStandardMaterial color="#3B2E28" roughness={0.88} />
          </mesh>
          <mesh position={[0.65, 1.15, 0]} rotation={[0, 0, -0.42]} castShadow>
            <coneGeometry args={[0.45, 1.0, 4]} />
            <meshStandardMaterial color="#3B2E28" roughness={0.88} />
          </mesh>
          <mesh position={[0, 0.95, 0]} castShadow>
            <boxGeometry args={[0.9, 0.35, 0.72]} />
            <meshStandardMaterial
              color="#D49B35"
              emissive={lanternEmissive}
              emissiveIntensity={isNight ? 0.6 : 0}
            />
          </mesh>
        </group>
      )}

      {/* Rumah Bolon / Sumatran Stilt */}
      {type === "bolon" && (
        <group>
          <mesh position={[0, 0.35, 0]} castShadow>
            <boxGeometry args={[1.25, 0.55, 0.9]} />
            <meshStandardMaterial color="#7C4E32" roughness={0.85} />
          </mesh>
          <mesh position={[0, 1.05, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[1.1, 0.95, 4]} />
            <meshStandardMaterial color="#3E3028" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.35, 0.46]}>
            <planeGeometry args={[0.35, 0.25]} />
            <meshStandardMaterial
              color={isNight ? "#FFD479" : "#3E2A1E"}
              emissive={lanternEmissive}
              emissiveIntensity={lanternIntensity}
            />
          </mesh>
        </group>
      )}

      {/* Rumah Limas / Malay Stilt */}
      {type === "limas" && (
        <group>
          <mesh position={[0, 0.24, 0]} castShadow>
            <boxGeometry args={[1.55, 0.22, 1.1]} />
            <meshStandardMaterial color="#9A6840" roughness={0.82} />
          </mesh>
          <mesh position={[0, 0.62, 0]} castShadow>
            <boxGeometry args={[1.25, 0.52, 0.86]} />
            <meshStandardMaterial color="#D9B784" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.18, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[1.18, 0.68, 4]} />
            <meshStandardMaterial color="#A64526" roughness={0.82} />
          </mesh>
        </group>
      )}

      {/* Baduy Sulah Nyanda */}
      {type === "baduy" && (
        <group>
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[1.2, 0.6, 0.9]} />
            <meshStandardMaterial color="#D9C39E" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.05, -0.05]} rotation={[0.12, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[1.15, 0.78, 4]} />
            <meshStandardMaterial color="#4A382B" roughness={0.92} />
          </mesh>
        </group>
      )}

      {/* Monas */}
      {type === "monas" && (
        <group>
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[1.2, 0.4, 1.2]} />
            <meshStandardMaterial color="#EAE3D2" roughness={0.45} />
          </mesh>
          <mesh position={[0, 1.25, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.24, 1.65, 4]} />
            <meshStandardMaterial color="#F7F3EA" roughness={0.35} />
          </mesh>
          <mesh position={[0, 2.25, 0]} castShadow>
            <octahedronGeometry args={[0.26, 0]} />
            <meshStandardMaterial
              color="#F2BC52"
              metalness={0.65}
              roughness={0.22}
              emissive="#F2BC52"
              emissiveIntensity={isNight ? 1.8 : 0.35}
            />
          </mesh>
        </group>
      )}

      {/* Angklung */}
      {type === "angklung" && (
        <group>
          <mesh position={[0, 0.16, 0]} castShadow>
            <boxGeometry args={[1.25, 0.14, 0.22]} />
            <meshStandardMaterial color="#C89B54" roughness={0.75} />
          </mesh>
          <mesh position={[-0.2, 0.85, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 1.25, 10]} />
            <meshStandardMaterial color="#E2C07D" roughness={0.65} />
          </mesh>
          <mesh position={[0.2, 0.65, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.9, 10]} />
            <meshStandardMaterial color="#E7CA8E" roughness={0.65} />
          </mesh>
          <mesh position={[0, 1.48, 0]} castShadow>
            <boxGeometry args={[1.28, 0.12, 0.16]} />
            <meshStandardMaterial color="#A16A2E" />
          </mesh>
        </group>
      )}

      {/* Borobudur */}
      {type === "borobudur" && (
        <group>
          <mesh position={[0, 0.16, 0]} castShadow>
            <boxGeometry args={[1.65, 0.26, 1.65]} />
            <meshStandardMaterial color="#6D665E" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.44, 0]} castShadow>
            <boxGeometry args={[1.22, 0.26, 1.22]} />
            <meshStandardMaterial color="#7B736A" roughness={0.88} />
          </mesh>
          <mesh position={[0, 0.88, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.38, 0.56, 12]} />
            <meshStandardMaterial
              color="#958D83"
              emissive={lanternEmissive}
              emissiveIntensity={isNight ? 0.5 : 0}
            />
          </mesh>
          <mesh position={[0, 1.32, 0]} castShadow>
            <coneGeometry args={[0.1, 0.38, 8]} />
            <meshStandardMaterial color="#D49B35" metalness={0.45} roughness={0.3} />
          </mesh>
        </group>
      )}

      {/* Tugu Jogja */}
      {type === "tugu" && (
        <group>
          <mesh position={[0, 0.22, 0]} castShadow>
            <boxGeometry args={[0.92, 0.36, 0.92]} />
            <meshStandardMaterial color="#F2EDE1" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.95, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.28, 1.15, 8]} />
            <meshStandardMaterial color="#FAF7F0" roughness={0.45} />
          </mesh>
          <mesh position={[0, 1.72, 0]} castShadow>
            <coneGeometry args={[0.2, 0.55, 8]} />
            <meshStandardMaterial
              color="#E5B143"
              metalness={0.6}
              roughness={0.25}
              emissive="#F2BC52"
              emissiveIntensity={isNight ? 1.4 : 0.25}
            />
          </mesh>
        </group>
      )}

      {/* Majapahit Gate / Reog */}
      {type === "reog" && (
        <group>
          <mesh position={[-0.48, 0.55, 0]} castShadow>
            <boxGeometry args={[0.42, 1.05, 0.48]} />
            <meshStandardMaterial color="#B54B2E" roughness={0.82} />
          </mesh>
          <mesh position={[0.48, 0.55, 0]} castShadow>
            <boxGeometry args={[0.42, 1.05, 0.48]} />
            <meshStandardMaterial color="#B54B2E" roughness={0.82} />
          </mesh>
          <mesh position={[0, 1.12, 0]} castShadow>
            <torusGeometry args={[0.56, 0.09, 8, 16, Math.PI]} />
            <meshStandardMaterial
              color="#E8A938"
              metalness={0.55}
              roughness={0.28}
              emissive="#F2BC52"
              emissiveIntensity={isNight ? 1.4 : 0.3}
            />
          </mesh>
        </group>
      )}

      {/* Balinese Pura Meru */}
      {type === "pura" && (
        <group>
          <mesh position={[0, 0.22, 0]} castShadow>
            <boxGeometry args={[1.1, 0.38, 1.1]} />
            <meshStandardMaterial color="#A8573B" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.68, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[0.95, 0.48, 4]} />
            <meshStandardMaterial color="#362C27" roughness={0.92} />
          </mesh>
          <mesh position={[0, 1.12, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[0.72, 0.45, 4]} />
            <meshStandardMaterial color="#362C27" roughness={0.92} />
          </mesh>
          <mesh position={[0, 1.52, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[0.48, 0.42, 4]} />
            <meshStandardMaterial
              color="#D49B35"
              emissive={lanternEmissive}
              emissiveIntensity={isNight ? 0.9 : 0.2}
            />
          </mesh>
        </group>
      )}

      {/* Mbaru Niang (Wae Rebo NTT) */}
      {type === "mbaru" && (
        <group>
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.85, 0.9, 0.32, 12]} />
            <meshStandardMaterial color="#7C5438" roughness={0.88} />
          </mesh>
          <mesh position={[0, 1.1, 0]} castShadow>
            <coneGeometry args={[0.98, 1.65, 12]} />
            <meshStandardMaterial color="#4B3B2D" roughness={0.94} />
          </mesh>
        </group>
      )}

      {/* Dayak Betang Longhouse */}
      {type === "betang" && (
        <group>
          <mesh position={[0, 0.46, 0]} castShadow>
            <boxGeometry args={[1.85, 0.5, 0.72]} />
            <meshStandardMaterial color="#8B5A36" roughness={0.84} />
          </mesh>
          <mesh position={[0, 0.96, 0]} rotation={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.62, 1.9, 3]} />
            <meshStandardMaterial color="#4D3628" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.14, 0]} castShadow>
            <boxGeometry args={[1.65, 0.22, 0.56]} />
            <meshStandardMaterial color="#593A24" roughness={0.88} />
          </mesh>
        </group>
      )}

      {/* Toraja Tongkonan */}
      {type === "tongkonan" && (
        <group>
          <mesh position={[0, 0.48, 0]} castShadow>
            <boxGeometry args={[1.1, 0.58, 0.8]} />
            <meshStandardMaterial color="#8E3828" roughness={0.82} />
          </mesh>
          <mesh position={[-0.55, 1.15, 0]} rotation={[0, 0, 0.55]} castShadow>
            <coneGeometry args={[0.42, 1.15, 4]} />
            <meshStandardMaterial color="#382E29" roughness={0.9} />
          </mesh>
          <mesh position={[0.55, 1.15, 0]} rotation={[0, 0, -0.55]} castShadow>
            <coneGeometry args={[0.42, 1.15, 4]} />
            <meshStandardMaterial color="#382E29" roughness={0.9} />
          </mesh>
        </group>
      )}

      {/* Moluccan Baileo */}
      {type === "baileo" && (
        <group>
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[1.45, 0.28, 1.05]} />
            <meshStandardMaterial color="#9E6E46" roughness={0.82} />
          </mesh>
          <mesh position={[0, 0.95, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[1.2, 0.72, 4]} />
            <meshStandardMaterial color="#5C4432" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.56, 0]}>
            <sphereGeometry args={[0.16, 10, 10]} />
            <meshStandardMaterial
              color="#F2BC52"
              emissive="#F2BC52"
              emissiveIntensity={isNight ? 1.8 : 0.3}
            />
          </mesh>
        </group>
      )}

      {/* Papuan Honai */}
      {type === "honai" && (
        <group>
          <mesh position={[0, 0.38, 0]} castShadow>
            <cylinderGeometry args={[0.68, 0.72, 0.65, 12]} />
            <meshStandardMaterial color="#8A5E3B" roughness={0.88} />
          </mesh>
          <mesh position={[0, 0.82, 0]} castShadow>
            <sphereGeometry args={[0.82, 14, 10, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
            <meshStandardMaterial color="#B58E52" roughness={0.94} />
          </mesh>
        </group>
      )}
    </group>
  );
}
