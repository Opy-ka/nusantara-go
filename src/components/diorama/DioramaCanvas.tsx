"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerformanceMonitor } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import gsap from "gsap";
import { CategoryKey, IslandKey, Locale, Province } from "@/types/culture";
import { ALL_PROVINCES, ISLAND_REGIONS } from "@/data/provinces";
import { BatikOcean } from "./BatikOcean";
import { ProvinceTile3D } from "./ProvinceTile3D";
import { Atmosphere3D } from "./Atmosphere3D";

const ARCHIPELAGO_CAMERA_POS: [number, number, number] = [1.2, 16.5, 18.8];
const ARCHIPELAGO_TARGET: [number, number, number] = [1.2, 0.2, -0.6];

interface CameraRigProps {
  selectedProvince: Province | null;
  activeIsland: IslandKey | "all";
  playIntro: boolean;
  reducedMotion: boolean;
  onIntroFinished: () => void;
}

function CameraRig({
  selectedProvince,
  activeIsland,
  playIntro,
  reducedMotion,
  onIntroFinished,
}: CameraRigProps) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const activeTweensRef = useRef<gsap.core.Tween[]>([]);
  const introPlayedRef = useRef(false);

  const killTweens = () => {
    activeTweensRef.current.forEach((tw) => tw.kill());
    activeTweensRef.current = [];
  };

  // First-visit cinematic fly-in across the archipelago
  useEffect(() => {
    if (!playIntro || introPlayedRef.current || reducedMotion) {
      if (playIntro && !introPlayedRef.current) {
        introPlayedRef.current = true;
        onIntroFinished();
      }
      return;
    }
    introPlayedRef.current = true;
    camera.position.set(-14, 24, 29);
    const tw = gsap.to(camera.position, {
      x: ARCHIPELAGO_CAMERA_POS[0],
      y: ARCHIPELAGO_CAMERA_POS[1],
      z: ARCHIPELAGO_CAMERA_POS[2],
      duration: 2.0,
      ease: "power3.inOut",
      onComplete: () => onIntroFinished(),
    });
    activeTweensRef.current = [tw];
    return () => killTweens();
  }, [playIntro, reducedMotion, camera, onIntroFinished]);

  // Smooth camera transition to selected province, island region, or full archipelago
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    killTweens();

    let targetPos: [number, number, number] = ARCHIPELAGO_CAMERA_POS;
    let lookTarget: [number, number, number] = ARCHIPELAGO_TARGET;

    if (selectedProvince) {
      targetPos = selectedProvince.cameraOffset;
      lookTarget = [
        selectedProvince.center3D[0],
        0.35,
        selectedProvince.center3D[1],
      ];
    } else if (activeIsland !== "all") {
      const region = ISLAND_REGIONS.find((r) => r.key === activeIsland);
      if (region) {
        targetPos = region.cameraPos;
        lookTarget = region.cameraTarget;
      }
    }

    if (reducedMotion) {
      camera.position.set(...targetPos);
      controls.target.set(...lookTarget);
      controls.update();
      return;
    }

    const posTween = gsap.to(camera.position, {
      x: targetPos[0],
      y: targetPos[1],
      z: targetPos[2],
      duration: 1.2,
      ease: "power3.inOut",
    });
    const targetTween = gsap.to(controls.target, {
      x: lookTarget[0],
      y: lookTarget[1],
      z: lookTarget[2],
      duration: 1.2,
      ease: "power3.inOut",
      onUpdate: () => controls.update(),
    });

    activeTweensRef.current = [posTween, targetTween];
    return () => killTweens();
  }, [selectedProvince, activeIsland, camera, reducedMotion]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={3.2}
      maxDistance={34}
      maxPolarAngle={Math.PI / 2.2}
      minPolarAngle={0.25}
      target={ARCHIPELAGO_TARGET}
      onStart={() => killTweens()}
    />
  );
}

interface DioramaCanvasProps {
  locale: Locale;
  isNight: boolean;
  activeIsland: IslandKey | "all";
  activeCategory: CategoryKey | "all";
  selectedProvince: Province | null;
  stamps: Record<string, unknown>;
  playIntro: boolean;
  onIntroFinished: () => void;
  onSelectProvince: (province: Province | null) => void;
  onHoverProvince: (slug: string | null) => void;
}

export function DioramaCanvas({
  locale,
  isNight,
  activeIsland,
  activeCategory,
  selectedProvince,
  stamps,
  playIntro,
  onIntroFinished,
  onSelectProvince,
  onHoverProvince,
}: DioramaCanvasProps) {
  const [dpr, setDpr] = useState<number | [number, number]>([1, 2]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Canvas
        shadows="percentage"
        dpr={dpr}
        camera={{
          position: ARCHIPELAGO_CAMERA_POS,
          fov: 42,
          near: 0.1,
          far: 150,
        }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onPointerMissed={() => onSelectProvince(null)}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr([1, 2])}
          flipflops={3}
          onFallback={() => setDpr(1)}
        />
        <Atmosphere3D isNight={isNight} reducedMotion={reducedMotion} />
        <BatikOcean isNight={isNight} reducedMotion={reducedMotion} />

        {/* All 38 Active Provinces of Indonesia */}
        {ALL_PROVINCES.map((province) => {
          const inFocusedIsland =
            activeIsland === "all" || province.island === activeIsland;
          const isDimmed =
            (selectedProvince !== null &&
              selectedProvince.slug !== province.slug) ||
            (selectedProvince === null && !inFocusedIsland);

          // Show labels cleanly only for focused island (prevents 38 overlapping labels in overview)
          const showLabel =
            activeIsland !== "all" && province.island === activeIsland;

          return (
            <ProvinceTile3D
              key={province.slug}
              province={province}
              locale={locale}
              activeCategory={activeCategory}
              isSelected={selectedProvince?.slug === province.slug}
              isDimmed={isDimmed}
              showLabel={showLabel}
              hasStamp={Boolean(stamps[province.slug])}
              isNight={isNight}
              reducedMotion={reducedMotion}
              portalNode={portalNode}
              onSelect={(p) => onSelectProvince(p)}
              onHoverChange={onHoverProvince}
            />
          );
        })}

        <CameraRig
          selectedProvince={selectedProvince}
          activeIsland={activeIsland}
          playIntro={playIntro}
          reducedMotion={reducedMotion}
          onIntroFinished={onIntroFinished}
        />
      </Canvas>

      {/* State-tracked portal node guarantees non-null mount for drei <Html> */}
      <div
        ref={setPortalNode}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      />

      {playIntro && !reducedMotion && (
        <button
          type="button"
          onClick={onIntroFinished}
          className="absolute right-5 bottom-20 z-30 rounded-full border border-white/20 bg-[#231A14]/85 px-4 py-2 text-xs font-medium text-[#F7F2E8] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#231A14]"
        >
          {locale === "id" ? "Lewati intro" : "Skip intro"}
        </button>
      )}
    </div>
  );
}
