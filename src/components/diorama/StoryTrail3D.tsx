"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { StoryTour } from "@/data/storyTours";
import { ALL_PROVINCES } from "@/data/provinces";

interface StoryTrail3DProps {
  tour: StoryTour | null;
}

export function StoryTrail3D({ tour }: StoryTrail3DProps) {
  const tubeGeometry = useMemo(() => {
    if (!tour) return null;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < tour.stops.length; i++) {
      const prov = ALL_PROVINCES.find(
        (p) => p.slug === tour.stops[i].provinceSlug
      );
      if (!prov) continue;
      const cur = new THREE.Vector3(prov.center3D[0], 0.72, prov.center3D[1]);
      if (pts.length > 0) {
        const prev = pts[pts.length - 1];
        const mid = prev.clone().lerp(cur, 0.5);
        mid.y += Math.min(2.6, prev.distanceTo(cur) * 0.28 + 0.6);
        pts.push(mid);
      }
      pts.push(cur);
    }
    if (pts.length < 2) return null;
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 96, 0.055, 8, false);
  }, [tour]);

  useEffect(() => {
    return () => {
      tubeGeometry?.dispose();
    };
  }, [tubeGeometry]);

  if (!tour || !tubeGeometry) return null;

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial
        color={tour.color}
        emissive={tour.color}
        emissiveIntensity={0.85}
        roughness={0.3}
      />
    </mesh>
  );
}
