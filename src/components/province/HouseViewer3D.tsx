"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Hotspot3D, Locale, Province } from "@/types/culture";
import { UI_COPY, t } from "@/lib/i18n";

function ArchitecturalModel({
  province,
  isNight,
}: {
  province: Province;
  isNight: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const type = province.landmarkType;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.14;
    }
  });

  const warmGlow = isNight ? "#FFD479" : "#231A14";
  const glowIntensity = isNight ? 1.5 : 0;

  return (
    <group ref={groupRef} position={[0, -0.35, 0]}>
      {/* Handcrafted wooden diorama plinth */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[1.95, 2.08, 0.2, 32]} />
        <meshStandardMaterial
          color={isNight ? "#2B211A" : "#C7B89E"}
          roughness={0.85}
        />
      </mesh>
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[1.82, 1.86, 0.06, 32]} />
        <meshStandardMaterial
          color={isNight ? "#2D4233" : "#6F8A64"}
          roughness={0.9}
        />
      </mesh>

      {/* Rumah Gadang / Tongkonan soaring horn roof */}
      {(type === "gadang" || type === "tongkonan") && (
        <group>
          {[-0.85, 0, 0.85].map((x) =>
            [-0.5, 0.5].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 0.25, z]} castShadow>
                <cylinderGeometry args={[0.055, 0.055, 0.45, 8]} />
                <meshStandardMaterial color="#5C3A21" roughness={0.85} />
              </mesh>
            ))
          )}
          <mesh position={[0, 0.78, 0]} castShadow>
            <boxGeometry args={[2.1, 0.72, 1.15]} />
            <meshStandardMaterial
              color={type === "gadang" ? "#8A3B24" : "#7E3224"}
              roughness={0.82}
            />
          </mesh>
          <mesh position={[0, 0.78, 0.59]}>
            <boxGeometry args={[0.7, 0.34, 0.04]} />
            <meshStandardMaterial
              color={warmGlow}
              emissive="#F2BC52"
              emissiveIntensity={glowIntensity}
            />
          </mesh>
          <mesh position={[-0.9, 1.56, 0]} rotation={[0, 0, 0.48]} castShadow>
            <coneGeometry args={[0.62, 1.3, 4]} />
            <meshStandardMaterial color="#382B24" roughness={0.9} />
          </mesh>
          <mesh position={[0.9, 1.56, 0]} rotation={[0, 0, -0.48]} castShadow>
            <coneGeometry args={[0.62, 1.3, 4]} />
            <meshStandardMaterial color="#382B24" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.3, 0]} castShadow>
            <boxGeometry args={[1.25, 0.38, 1.05]} />
            <meshStandardMaterial color="#4A3930" roughness={0.88} />
          </mesh>
        </group>
      )}

      {/* Rumah Bolon / Limas / Baduy / Baileo stilt houses */}
      {(type === "bolon" ||
        type === "limas" ||
        type === "baduy" ||
        type === "baileo") && (
        <group>
          {[-0.8, 0.8].map((x) =>
            [-0.55, 0.55].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 0.24, z]} castShadow>
                <cylinderGeometry args={[0.06, 0.06, 0.44, 8]} />
                <meshStandardMaterial color="#6D4B33" roughness={0.85} />
              </mesh>
            ))
          )}
          <mesh position={[0, 0.44, 0]} castShadow>
            <boxGeometry args={[2.0, 0.14, 1.48]} />
            <meshStandardMaterial color="#8A6142" roughness={0.85} />
          </mesh>
          {type !== "baileo" && (
            <mesh position={[0, 0.88, 0]} castShadow>
              <boxGeometry args={[1.65, 0.78, 1.15]} />
              <meshStandardMaterial
                color={type === "limas" ? "#E2C696" : "#D6BF99"}
                roughness={0.86}
              />
            </mesh>
          )}
          <mesh
            position={[0, 1.58, 0]}
            rotation={[type === "baduy" ? 0.12 : 0, Math.PI / 4, 0]}
            castShadow
          >
            <coneGeometry args={[1.62, 0.92, 4]} />
            <meshStandardMaterial
              color={type === "limas" ? "#A64526" : "#463528"}
              roughness={0.9}
            />
          </mesh>
        </group>
      )}

      {/* Dayak Betang / Lamin Longhouse */}
      {type === "betang" && (
        <group>
          {[-1.15, -0.4, 0.4, 1.15].map((x) =>
            [-0.45, 0.45].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 0.34, z]} castShadow>
                <cylinderGeometry args={[0.055, 0.055, 0.65, 8]} />
                <meshStandardMaterial color="#593A24" roughness={0.86} />
              </mesh>
            ))
          )}
          <mesh position={[0, 0.88, 0]} castShadow>
            <boxGeometry args={[2.75, 0.62, 1.1]} />
            <meshStandardMaterial color="#915E38" roughness={0.84} />
          </mesh>
          <mesh position={[0, 1.44, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.72, 0.72, 2.95, 3]} />
            <meshStandardMaterial color="#4A3528" roughness={0.9} />
          </mesh>
        </group>
      )}

      {/* Balinese Pura Meru */}
      {type === "pura" && (
        <group>
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[1.65, 0.42, 1.65]} />
            <meshStandardMaterial color="#B55636" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.78, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[1.38, 0.56, 4]} />
            <meshStandardMaterial color="#362C27" roughness={0.92} />
          </mesh>
          <mesh position={[0, 1.28, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[1.05, 0.54, 4]} />
            <meshStandardMaterial color="#362C27" roughness={0.92} />
          </mesh>
          <mesh position={[0, 1.76, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[0.7, 0.52, 4]} />
            <meshStandardMaterial color="#362C27" roughness={0.92} />
          </mesh>
          <mesh position={[0, 2.15, 0]}>
            <octahedronGeometry args={[0.14, 0]} />
            <meshStandardMaterial
              color="#E5B143"
              metalness={0.6}
              roughness={0.25}
              emissive="#F2BC52"
              emissiveIntensity={isNight ? 1.4 : 0.3}
            />
          </mesh>
        </group>
      )}

      {/* Mbaru Niang (Wae Rebo) */}
      {type === "mbaru" && (
        <group>
          <mesh position={[0, 0.26, 0]} castShadow>
            <cylinderGeometry args={[1.15, 1.22, 0.45, 16]} />
            <meshStandardMaterial color="#7C5438" roughness={0.88} />
          </mesh>
          <mesh position={[0, 1.38, 0]} castShadow>
            <coneGeometry args={[1.32, 2.05, 16]} />
            <meshStandardMaterial color="#4B3B2D" roughness={0.94} />
          </mesh>
        </group>
      )}

      {/* Papuan Honai */}
      {type === "honai" && (
        <group>
          <mesh position={[0, 0.48, 0]} castShadow>
            <cylinderGeometry args={[0.98, 1.05, 0.88, 16]} />
            <meshStandardMaterial color="#8A5E3B" roughness={0.88} />
          </mesh>
          <mesh position={[0, 0.34, 1.02]}>
            <boxGeometry args={[0.42, 0.52, 0.08]} />
            <meshStandardMaterial
              color={warmGlow}
              emissive="#F2BC52"
              emissiveIntensity={glowIntensity}
            />
          </mesh>
          <mesh position={[0, 1.02, 0]} castShadow>
            <sphereGeometry
              args={[1.18, 18, 12, 0, Math.PI * 2, 0, Math.PI / 1.85]}
            />
            <meshStandardMaterial color="#B58E52" roughness={0.94} />
          </mesh>
        </group>
      )}

      {/* Java Houses: Kebaya, Julang Ngapak, Joglo */}
      {(type === "monas" ||
        type === "angklung" ||
        type === "borobudur" ||
        type === "tugu" ||
        type === "reog") && (
        <group>
          <mesh position={[0, 0.14, 0]} castShadow>
            <boxGeometry args={[2.2, 0.22, 2.2]} />
            <meshStandardMaterial
              color={type === "reog" ? "#A6452A" : "#C5B49A"}
              roughness={0.85}
            />
          </mesh>
          {[-0.45, 0.45].map((x) =>
            [-0.45, 0.45].map((z) => (
              <mesh key={`sg-${x}-${z}`} position={[x, 0.72, z]} castShadow>
                <boxGeometry args={[0.1, 0.96, 0.1]} />
                <meshStandardMaterial color="#5C3A21" roughness={0.75} />
              </mesh>
            ))
          )}
          <mesh position={[0, 0.96, 0]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial
              color="#F2BC52"
              emissive="#F2BC52"
              emissiveIntensity={isNight ? 2.2 : 0.4}
            />
          </mesh>
          <mesh position={[0, 1.15, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[1.82, 0.45, 4]} />
            <meshStandardMaterial color="#9E492A" roughness={0.82} />
          </mesh>
          <mesh position={[0, 1.66, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[0.88, 0.95, 4]} />
            <meshStandardMaterial color="#7A2A1B" roughness={0.8} />
          </mesh>
          <mesh position={[0, 2.18, 0]} castShadow>
            <octahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial
              color="#E5B143"
              metalness={0.65}
              roughness={0.25}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

interface HouseViewer3DProps {
  province: Province;
  locale: Locale;
  isNight: boolean;
}

export function HouseViewer3D({ province, locale, isNight }: HouseViewer3DProps) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot3D | null>(
    province.houseHotspots?.[0] ?? null
  );
  const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] px-5 py-3.5">
        <div>
          <h2 className="font-serif text-lg font-semibold tracking-tight text-[var(--ink-primary)]">
            {t(UI_COPY.houseViewerTitle, locale)}
          </h2>
          <p className="text-xs text-[var(--ink-muted)]">
            {t(UI_COPY.houseViewerHint, locale)}
          </p>
        </div>
        <span className="rounded-full bg-[var(--bg-surface-strong)] px-3 py-1 text-xs font-medium text-[var(--ink-secondary)]">
          {province.landmarkName[locale]}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="relative h-[340px] w-full lg:col-span-8 lg:h-[400px]">
          <Canvas
            shadows="percentage"
            dpr={[1, 2]}
            camera={{ position: [3.6, 2.5, 4.2], fov: 40 }}
          >
            <color attach="background" args={[isNight ? "#161210" : "#EAE2D2"]} />
            <ambientLight intensity={isNight ? 0.35 : 0.75} />
            <directionalLight
              castShadow
              position={[4, 6, 4]}
              intensity={isNight ? 0.9 : 2.1}
              color={isNight ? "#B8CCE0" : "#FFF1D6"}
            />
            {isNight && (
              <pointLight position={[0, 1.4, 1.5]} intensity={6} color="#F2BC52" />
            )}

            <ArchitecturalModel province={province} isNight={isNight} />

            {portalNode !== null &&
              province.houseHotspots?.map((hs, idx) => {
                const isSelected = activeHotspot?.id === hs.id;
                return (
                  <Html
                    key={hs.id}
                    portal={{ current: portalNode }}
                    position={[hs.position[0], hs.position[1] - 0.35, hs.position[2]]}
                    center
                  >
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(hs)}
                      aria-label={hs.title[locale]}
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shadow-md transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49B35] ${
                        isSelected
                          ? "scale-115 bg-[#C4532D] text-[#F7F2E8] ring-2 ring-[#F2BC52]"
                          : "bg-[#231A14]/90 text-[#F2BC52] hover:scale-110"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  </Html>
                );
              })}

            <ContactShadows
              position={[0, -0.45, 0]}
              opacity={0.45}
              scale={7}
              blur={2.2}
              far={3}
              frames={1}
            />
            <OrbitControls
              makeDefault
              enablePan={false}
              minDistance={2.4}
              maxDistance={6.5}
              maxPolarAngle={Math.PI / 2.05}
            />
          </Canvas>
          <div
            ref={setPortalNode}
            className="pointer-events-none absolute inset-0 overflow-hidden [&>div]:pointer-events-auto"
          />
        </div>

        <div className="flex flex-col justify-between border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)]/60 p-5 lg:col-span-4 lg:border-l lg:border-t-0">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {province.houseHotspots?.map((hs, idx) => (
                <button
                  key={hs.id}
                  type="button"
                  onClick={() => setActiveHotspot(hs)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    activeHotspot?.id === hs.id
                      ? "bg-[var(--accent)] text-[#F7F2E8]"
                      : "bg-[var(--bg-surface-strong)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                  }`}
                >
                  {idx + 1}. {hs.title[locale]}
                </button>
              ))}
            </div>

            {activeHotspot && (
              <div className="pt-2">
                <h3 className="font-serif text-base font-semibold text-[var(--ink-primary)]">
                  {activeHotspot.title[locale]}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-secondary)]">
                  {activeHotspot.description[locale]}
                </p>
              </div>
            )}
          </div>

          <p className="mt-5 text-[11px] text-[var(--ink-muted)]">
            {locale === "id"
              ? "Model diorama 3D prosedural ringan (< 5 KB) untuk pemuatan instan di perangkat mobile."
              : "Lightweight procedural 3D diorama (< 5 KB) for instant mobile loading."}
          </p>
        </div>
      </div>
    </div>
  );
}
