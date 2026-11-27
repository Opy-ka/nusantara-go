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
    .map(([x, z]) => `${(x + 16) * 28.5},${(z + 8.5) * 32}`)
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
        viewBox="0 0 1020 430"
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
              r="1.4"
              fill={
                isNight ? "rgba(242,188,82,0.14)" : "rgba(247,242,232,0.14)"
              }
            />
          </pattern>
        </defs>
        <rect width="1020" height="430" fill="url(#batik-dots)" rx="16" />

        {ALL_PROVINCES.map((province) => {
          const isSelected = selectedProvince?.slug === province.slug;
          const isMuted =
            activeIsland !== "all" && province.island !== activeIsland;
          const hasStamp = Boolean(stamps[province.slug]);
          const cx = (province.center3D[0] + 16) * 28.5;
          const cy = (province.center3D[1] + 8.5) * 32;

          return (
            <g
              key={province.slug}
              role="button"
              tabIndex={0}
              aria-label={`${province.name[locale]} — ${province.capital}`}
              opacity={isMuted ? 0.32 : 1}
              onClick={() => onSelectProvince(province)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectProvince(province);
                }
              }}
              className="cursor-pointer outline-none"
            >
              <polygon
                points={toSvgPoints(province.polygon2D)}
                fill={province.themeColor}
                stroke={isSelected ? "#F2BC52" : "#F7F2E8"}
                strokeWidth={isSelected ? "2.8" : "1.1"}
                className="transition-[filter,stroke-width] duration-200 hover:brightness-115"
              />
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 4.8 : 3.2}
                fill={hasStamp ? "#3F6B4E" : "#F2BC52"}
                stroke="#231A14"
                strokeWidth="1.2"
              />
              {(isSelected || activeIsland === province.island) && (
                <text
                  x={cx}
                  y={cy - 8}
                  textAnchor="middle"
                  className="fill-[#F7F2E8] text-[9.5px] font-semibold drop-shadow"
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
          ? "Mode Peta 2D (38 Provinsi) · Klik atau tekan Tab + Enter pada provinsi mana saja"
          : "2D Map Mode (All 38 Provinces) · Click or press Tab + Enter on any province"}
      </p>
    </div>
  );
}
