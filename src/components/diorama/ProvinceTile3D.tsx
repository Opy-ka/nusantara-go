"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { CategoryKey, Locale, Province } from "@/types/culture";
import { Landmark3D } from "./Landmark3D";

function buildMultiPolygonGeometry(
  polygons: [number, number][][],
  depth = 0.34
) {
  const shapes: THREE.Shape[] = [];
  for (const ring of polygons) {
    if (ring.length < 3) continue;
    const shape = new THREE.Shape();
    ring.forEach(([x, z], idx) => {
      if (idx === 0) shape.moveTo(x, -z);
      else shape.lineTo(x, -z);
    });
    shape.closePath();
    shapes.push(shape);
  }

  const geo = new THREE.ExtrudeGeometry(shapes, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.022,
    bevelSegments: 1,
    curveSegments: 2,
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

  const geometry = useMemo(() => {
    const polys =
      province.polygons3D && province.polygons3D.length > 0
        ? province.polygons3D
        : [province.polygon2D];
    return buildMultiPolygonGeometry(polys, 0.34);
  }, [province.polygons3D, province.polygon2D]);

  const edgesGeometry = useMemo(
    () => new THREE.EdgesGeometry(geometry, 32),
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
    const targetY = isSelected ? 0.34 : hovered ? 0.2 : 0;
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

  const shouldRenderLabel =
    portalNode !== null && (showLabel || activeHighlight);

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
          metalness={0.05}
          emissive={activeHighlight ? "#D49B35" : "#000000"}
          emissiveIntensity={activeHighlight ? (isNight ? 0.5 : 0.26) : 0}
        />
      </mesh>

      {/* Subtle golden/parchment provincial border edges */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial
          color={activeHighlight ? "#F2BC52" : isNight ? "#594A3E" : "#3E2F24"}
          transparent
          opacity={activeHighlight ? 0.95 : 0.34}
        />
      </lineSegments>

      {/* Floating 3D Regional Landmark */}
      <Landmark3D
        type={province.landmarkType}
        position={[province.center3D[0], 0.44, province.center3D[1]]}
        isHovered={activeHighlight}
        isNight={isNight}
        reducedMotion={reducedMotion}
      />

      {shouldRenderLabel && (
        <Html
          portal={{ current: portalNode }}
          position={[province.center3D[0], 1.38, province.center3D[1]]}
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
