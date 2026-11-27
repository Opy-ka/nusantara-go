"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { CategoryKey, Locale, Province } from "@/types/culture";
import { Landmark3D } from "./Landmark3D";

function buildExtrudedShape(points: [number, number][], depth = 0.42) {
  const shape = new THREE.Shape();
  points.forEach(([x, z], idx) => {
    if (idx === 0) shape.moveTo(x, -z);
    else shape.lineTo(x, -z);
  });
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.04,
    bevelSegments: 2,
    curveSegments: 4,
  });
  geo.rotateX(-Math.PI / 2);
  return geo;
}

interface ProvinceTile3DProps {
  province: Province;
  locale: Locale;
  activeCategory: CategoryKey | "all";
  isSelected: boolean;
  isDimmed: boolean;
  showLabel: boolean;
  hasStamp: boolean;
  isNight: boolean;
  reducedMotion: boolean;
  portalNode: HTMLDivElement | null;
  onSelect: (province: Province) => void;
  onHoverChange: (slug: string | null) => void;
}

export function ProvinceTile3D({
  province,
  locale,
  activeCategory,
  isSelected,
  isDimmed,
  showLabel,
  hasStamp,
  isNight,
  reducedMotion,
  portalNode,
  onSelect,
  onHoverChange,
}: ProvinceTile3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(
    () => buildExtrudedShape(province.polygon2D, 0.42),
    [province.polygon2D]
  );

  const edgesGeometry = useMemo(
    () => new THREE.EdgesGeometry(geometry, 28),
    [geometry]
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      edgesGeometry.dispose();
    };
  }, [geometry, edgesGeometry]);

  const categoryItem =
    activeCategory === "all"
      ? null
      : province.items.find((item) => item.category === activeCategory) ?? null;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetY = isSelected ? 0.38 : hovered ? 0.24 : 0;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      Math.min(1, delta * (reducedMotion ? 30 : 9))
    );
  });

  const activeHighlight = hovered || isSelected;
  const baseColor = isDimmed
    ? isNight
      ? "#322B27"
      : "#B4AA9B"
    : province.themeColor;

  const shouldRenderLabel = portalNode !== null && (showLabel || activeHighlight);

  return (
    <group ref={groupRef}>
      <mesh
        geometry={geometry}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onSelect(province);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHoverChange(province.slug);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          onHoverChange(null);
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial
          color={baseColor}
          roughness={0.78}
          metalness={0.06}
          emissive={activeHighlight ? "#D49B35" : "#000000"}
          emissiveIntensity={activeHighlight ? (isNight ? 0.5 : 0.28) : 0}
        />
      </mesh>

      {/* Golden signature rim border */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial
          color={activeHighlight ? "#F2BC52" : isNight ? "#594A3E" : "#3E2F24"}
          transparent
          opacity={activeHighlight ? 0.95 : 0.3}
        />
      </lineSegments>

      {/* Floating 3D Regional Landmark */}
      <Landmark3D
        type={province.landmarkType}
        position={[province.center3D[0], 0.52, province.center3D[1]]}
        isHovered={activeHighlight}
        isNight={isNight}
        reducedMotion={reducedMotion}
      />

      {/* Floating Label — only mounted once portalNode is guaranteed ready */}
      {shouldRenderLabel && (
        <Html
          portal={{ current: portalNode }}
          position={[province.center3D[0], 1.48, province.center3D[1]]}
          center
          distanceFactor={16}
          style={{ pointerEvents: "none" }}
        >
          <div
            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium transition-opacity duration-200 ${
              activeHighlight
                ? "bg-[#231A14] text-[#F7F2E8] shadow-lg ring-1 ring-[#D49B35]"
                : isNight
                ? "bg-[#1E1815]/88 text-[#F5EFE4] border border-white/15"
                : "bg-[#F7F2E8]/92 text-[#231A14] border border-[#231A14]/15 shadow-sm"
            }`}
          >
            <span>{province.name[locale]}</span>
            {categoryItem && (
              <span className="ml-1.5 text-[10px] font-semibold text-[#D49B35]">
                · {categoryItem.name[locale]}
              </span>
            )}
            {hasStamp && (
              <span
                className="ml-1.5 inline-block h-2 w-2 rounded-full bg-[#3F6B4E]"
                title="Stamp collected"
              />
            )}
          </div>
        </Html>
      )}
    </group>
  );
}
