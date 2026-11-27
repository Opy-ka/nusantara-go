"use client";

import { IslandKey, Locale, Province } from "@/types/culture";
import { ALL_PROVINCES } from "@/data/provinces";

interface Map2DFallbackProps {
  locale: Locale;
  isNight: boolean;
  activeIsland: IslandKey | "all";
  selectedProvince: Province | null;
  stamps: Record<string, unknown>;
  onSelectProvince: (province: Province) => void;
}

function toSvgPoints(poly: [number, number][]): string {
  return poly
    .map(([x, z]) => `${(x + 16.5) * 31},${(z + 6.5) * 31}`)
    .join(" ");
}

export function Map2DFallback({
  locale,
  isNight,
  activeIsland,
  selectedProvince,
  stamps,
  onSelectProvince,
}: Map2DFallbackProps) {
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-4 transition-colors duration-300 ${
        isNight ? "bg-[#0E1A24]" : "bg-[#1B4D5C]"
      }`}
    >
      <svg
        viewBox="0 0 1040 430"
        className="h-auto max-h-[82%] w-full max-w-6xl select-none"
        role="img"
        aria-label={
          locale === "id"
            ? "Peta interaktif 2D seluruh 38 provinsi Indonesia"
            : "Interactive 2D map of all 38 provinces of Indonesia"
        }
      >
        <defs>
          <pattern
            id="batik-dots"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="14"
              cy="14"
              r="1.3"
              fill={
                isNight ? "rgba(242,188,82,0.14)" : "rgba(247,242,232,0.14)"
              }
            />
          </pattern>
        </defs>
        <rect width="1040" height="430" fill="url(#batik-dots)" rx="16" />

        {ALL_PROVINCES.map((province) => {
          const isSelected = selectedProvince?.slug === province.slug;
          const isMuted =
            activeIsland !== "all" && province.island !== activeIsland;
          const hasStamp = Boolean(stamps[province.slug]);
          const polys =
            province.polygons3D && province.polygons3D.length > 0
              ? province.polygons3D
              : [province.polygon2D];
          const cx = (province.center3D[0] + 16.5) * 31;
          const cy = (province.center3D[1] + 6.5) * 31;

          return (
            <g
              key={province.slug}
              role="button"
              tabIndex={0}
              aria-label={`${province.name[locale]} — ${province.capital}`}
              opacity={isMuted ? 0.3 : 1}
              onClick={() => onSelectProvince(province)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectProvince(province);
                }
              }}
              className="cursor-pointer outline-none"
            >
              {polys.map((ring, rIdx) => (
                <polygon
                  key={rIdx}
                  points={toSvgPoints(ring)}
                  fill={province.themeColor}
                  stroke={isSelected ? "#F2BC52" : "#F7F2E8"}
                  strokeWidth={isSelected ? "2.4" : "0.9"}
                  className="transition-[filter,stroke-width] duration-200 hover:brightness-115"
                />
              ))}
              {hasStamp && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill="#3F6B4E"
                  stroke="#F7F2E8"
                  strokeWidth="1.2"
                />
              )}
              {isSelected && (
                <text
                  x={cx}
                  y={cy - 7}
                  textAnchor="middle"
                  className="fill-[#F7F2E8] text-[10px] font-semibold drop-shadow"
                >
                  {province.name[locale]}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <p className="mt-2 text-xs text-[#F5EFE4]/75">
        {locale === "id"
          ? "Mode Peta 2D Asli Indonesia (38 Provinsi) · Klik provinsi mana saja"
          : "2D Map of Indonesia (All 38 Provinces) · Click any province"}
      </p>
    </div>
  );
}
