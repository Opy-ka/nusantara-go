"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BatikOceanProps {
  isNight: boolean;
  reducedMotion: boolean;
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    float wave1 = sin(worldPosition.x * 0.45 + uTime * 0.65) * 0.08;
    float wave2 = cos(worldPosition.z * 0.55 - uTime * 0.5) * 0.06;
    float wave3 = sin((worldPosition.x + worldPosition.z) * 0.25 + uTime * 0.4) * 0.05;
    float elevation = wave1 + wave2 + wave3;

    worldPosition.y += elevation;
    vElevation = elevation;
    vWorldPos = worldPosition.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uNight;
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying float vElevation;

  // Procedural Kawung-inspired subtle batik motif on the ocean surface
  float kawungPattern(vec2 p) {
    vec2 cell = fract(p) - 0.5;
    float d1 = length(cell - vec2(0.24, 0.0));
    float d2 = length(cell + vec2(0.24, 0.0));
    float d3 = length(cell - vec2(0.0, 0.24));
    float d4 = length(cell + vec2(0.0, 0.24));
    float petals = smoothstep(0.22, 0.16, min(min(d1, d2), min(d3, d4)));
    float ring = abs(length(cell) - 0.36);
    float contour = smoothstep(0.035, 0.01, ring);
    return clamp(petals * 0.35 + contour * 0.45, 0.0, 1.0);
  }

  void main() {
    vec3 dayDeep = vec3(0.09, 0.28, 0.34);
    vec3 dayShallow = vec3(0.16, 0.43, 0.49);
    vec3 dayGold = vec3(0.84, 0.68, 0.35);

    vec3 nightDeep = vec3(0.04, 0.08, 0.12);
    vec3 nightShallow = vec3(0.08, 0.16, 0.22);
    vec3 nightGold = vec3(0.92, 0.72, 0.32);

    vec3 deepColor = mix(dayDeep, nightDeep, uNight);
    vec3 shallowColor = mix(dayShallow, nightShallow, uNight);
    vec3 motifColor = mix(dayGold, nightGold, uNight);

    // Distance fade from Java center
    float dist = length(vWorldPos.xz * vec2(0.055, 0.095));
    float centerGlow = smoothstep(1.4, 0.0, dist);

    vec3 baseColor = mix(deepColor, shallowColor, centerGlow * 0.75 + vElevation * 2.2 + 0.25);

    // Flowing batik kawung & wave lines
    vec2 batikUv = vWorldPos.xz * 0.42 + vec2(uTime * 0.025, -uTime * 0.018);
    float batik = kawungPattern(batikUv);

    // Subtle parang-like diagonal ripple
    float parang = sin((vWorldPos.x * 0.9 + vWorldPos.z * 0.9) - uTime * 0.55);
    float ripple = smoothstep(0.88, 0.99, parang) * 0.12;

    float motifStrength = mix(0.085, 0.11, uNight) * centerGlow;
    vec3 finalColor = mix(baseColor, motifColor, batik * motifStrength + ripple * centerGlow);

    // Soft horizon vignette fade into sky/fog
    float edgeFade = smoothstep(78.0, 26.0, length(vWorldPos.xz));
    finalColor = mix(deepColor * 0.9, finalColor, edgeFade);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function BatikOcean({ isNight, reducedMotion }: BatikOceanProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNight: { value: isNight ? 1 : 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    if (!reducedMotion) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    const targetNight = isNight ? 1 : 0;
    materialRef.current.uniforms.uNight.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uNight.value,
      targetNight,
      Math.min(1, delta * 3.5)
    );
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.32, -1]} receiveShadow>
      <planeGeometry args={[200, 160, 80, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
