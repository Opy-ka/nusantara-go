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
    portalNode !== null && (isSelected || (showLabel && hovered));

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
          position={[province.center3D[0], 1.25, province.center3D[1]]}
          center
          zIndexRange={[10, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div className="whitespace-nowrap rounded-full bg-[#231A14]/92 px-3 py-1 text-xs font-medium text-[#F7F2E8] shadow-md ring-1 ring-[#D49B35]/80 backdrop-blur-sm">
            <span>{province.name[locale]}</span>
            {categoryItem && (
              <span className="ml-1.5 text-[11px] font-semibold text-[#F2BC52]">
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
