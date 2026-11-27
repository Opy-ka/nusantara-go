"use client";

import { IslandKey, LandmarkType, Province } from "@/types/culture";

interface ProvinceStampSvgProps {
  province: Province;
  earned: boolean;
  size?: number;
  scoreLabel?: string;
}

/** Center landmark silhouette per architectural archetype */
function LandmarkGlyph({ type }: { type: LandmarkType }) {
  switch (type) {
    case "monas":
      return (
        <g>
          <rect x="41" y="62" width="18" height="6" rx="1" />
          <polygon points="44,62 56,62 53,55 47,55" />
          <polygon points="47.5,55 52.5,55 51,33 49,33" />
          <polygon points="50,24 53.5,31 50,34 46.5,31" />
        </g>
      );
    case "borobudur":
      return (
        <g>
          <rect x="32" y="61" width="36" height="6" rx="1" />
          <rect x="37" y="54" width="26" height="6" rx="1" />
          <rect x="42" y="47" width="16" height="6" rx="1" />
          <path d="M44 47 C44 37 56 37 56 47 Z" />
          <polygon points="50,28 52,38 48,38" />
        </g>
      );
    case "angklung":
      return (
        <g>
          <rect x="35" y="62" width="30" height="4" rx="1" />
          <rect x="37" y="34" width="3" height="29" />
          <rect x="60" y="34" width="3" height="29" />
          <rect x="35" y="33" width="30" height="3.5" rx="1" />
          <rect x="43" y="38" width="5" height="24" rx="1.5" />
          <rect x="52" y="44" width="5" height="18" rx="1.5" />
        </g>
      );
    case "tugu":
      return (
        <g>
          <rect x="40" y="61" width="20" height="6" rx="1" />
          <rect x="45.5" y="41" width="9" height="20" />
          <rect x="43" y="38" width="14" height="3.5" rx="1" />
          <polygon points="50,26 54,38 46,38" />
        </g>
      );
    case "reog":
      return (
        <g>
          <path
            d="M32 58 A18 18 0 0 1 68 58"
            fill="none"
            stroke="currentColor"
            strokeWidth="4.5"
            strokeDasharray="3 2"
          />
          <rect x="38" y="48" width="8" height="18" rx="1" />
          <rect x="54" y="48" width="8" height="18" rx="1" />
          <circle cx="50" cy="46" r="5" />
        </g>
      );
    case "gadang":
      return (
        <g>
          <path d="M29 44 Q40 48 50 42 Q60 48 71 44 L65 55 L35 55 Z" />
          <polygon points="29,44 33,31 39,45" />
          <polygon points="71,44 67,31 61,45" />
          <rect x="38" y="55" width="24" height="11" rx="1" />
        </g>
      );
    case "tongkonan":
      return (
        <g>
          <path d="M27 37 Q50 52 73 37 L64 53 L36 53 Z" />
          <rect x="41" y="53" width="18" height="10" rx="1" />
          <rect x="43" y="63" width="3" height="5" />
          <rect x="54" y="63" width="3" height="5" />
        </g>
      );
    case "pura":
      return (
        <g>
          <rect x="39" y="59" width="22" height="8" rx="1" />
          <polygon points="34,58 66,58 50,48" />
          <polygon points="38,49 62,49 50,39" />
          <polygon points="42,40 58,40 50,29" />
        </g>
      );
    case "mbaru":
      return (
        <g>
          <polygon points="50,27 69,62 31,62" />
          <rect x="36" y="62" width="28" height="5" rx="1" />
        </g>
      );
    case "honai":
      return (
        <g>
          <path d="M34 52 A16 18 0 0 1 66 52 Z" />
          <rect x="37" y="52" width="26" height="15" rx="2" />
        </g>
      );
    case "betang":
      return (
        <g>
          <polygon points="29,49 50,35 71,49" />
          <rect x="32" y="49" width="36" height="11" rx="1" />
          <rect x="35" y="60" width="3" height="7" />
          <rect x="48.5" y="60" width="3" height="7" />
          <rect x="62" y="60" width="3" height="7" />
        </g>
      );
    case "baileo":
      return (
        <g>
          <polygon points="31,47 50,33 69,47" />
          <rect x="35" y="47" width="3" height="14" />
          <rect x="62" y="47" width="3" height="14" />
          <rect x="32" y="61" width="36" height="5" rx="1" />
        </g>
      );
    default:
      // bolon / limas / baduy stilt houses
      return (
        <g>
          <polygon points="30,48 50,32 70,48" />
          <rect x="36" y="48" width="28" height="13" rx="1" />
          <rect x="39" y="61" width="3" height="6" />
          <rect x="58" y="61" width="3" height="6" />
        </g>
      );
  }
}

/** Regional batik/tenun decorative outer border dots & motifs */
function RegionalMotifRing({ island }: { island: IslandKey }) {
  const angles = Array.from({ length: 12 }, (_, i) => i * 30);

  if (island === "jawa") {
    // Batik Kawung 4-petal dot ring
    return (
      <g>
        {angles.map((deg) => (
          <g key={deg} transform={`rotate(${deg} 50 50)`}>
            <ellipse cx="50" cy="8.5" rx="3.4" ry="2.1" opacity="0.85" />
            <circle cx="50" cy="8.5" r="0.9" fill="var(--bg-canvas)" />
          </g>
        ))}
      </g>
    );
  }

  if (island === "sumatra") {
    // Songket Pucuk Rebung triangular crown border
    return (
      <g>
        {angles.map((deg) => (
          <polygon
            key={deg}
            points="50,5 53,11.5 47,11.5"
            transform={`rotate(${deg} 50 50)`}
            opacity="0.85"
          />
        ))}
      </g>
    );
  }

  if (island === "bali-nusa") {
    // Tenun Ikat & Surya sunburst diamonds
    return (
      <g>
        {angles.map((deg) => (
          <polygon
            key={deg}
            points="50,5 52.5,8.5 50,12 47.5,8.5"
            transform={`rotate(${deg} 50 50)`}
            opacity="0.88"
          />
        ))}
      </g>
    );
  }

  if (island === "papua" || island === "maluku") {
    // Asmat / Noken chevron diamond weave
    return (
      <g>
        {angles.map((deg) => (
          <path
            key={deg}
            d="M46.5 10.5 L50 6 L53.5 10.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            transform={`rotate(${deg} 50 50)`}
            opacity="0.85"
          />
        ))}
      </g>
    );
  }

  // Kalimantan & Sulawesi carved geometric studs
  return (
    <g>
      {angles.map((deg) => (
        <rect
          key={deg}
          x="48"
          y="6.5"
          width="4"
          height="4"
          rx="0.8"
          transform={`rotate(${deg} 50 50)`}
          opacity="0.85"
        />
      ))}
    </g>
  );
}

export function ProvinceStampSvg({
  province,
  earned,
  size = 86,
  scoreLabel,
}: ProvinceStampSvgProps) {
  const pathId = `stamp-arc-${province.slug}-${size}`;
  const inkColor = earned ? province.themeColor : "currentColor";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{ color: inkColor }}
      className={`select-none ${
        earned ? "opacity-100 drop-shadow-xs" : "opacity-35"
      }`}
    >
      <defs>
        <path
          id={pathId}
          d="M 18,50 A 32,32 0 1,1 82,50"
          fill="none"
        />
      </defs>

      {/* Outer ink stamp double ring */}
      <circle
        cx="50"
        cy="50"
        r="46.5"
        fill={earned ? "currentColor" : "none"}
        fillOpacity={earned ? 0.08 : 0}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeDasharray={earned ? "none" : "4 3"}
      />
      <circle
        cx="50"
        cy="50"
        r="37"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="2.5 2"
      />

      {/* Regional Batik / Tenun / Carving Motif Ring */}
      <g fill="currentColor">
        <RegionalMotifRing island={province.island} />
      </g>

      {/* Curved Province Code Header */}
      <text
        fill="currentColor"
        fontSize="6.6"
        fontWeight="700"
        letterSpacing="1.6"
      >
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {province.code} · {province.islandLabel.id.toUpperCase()}
        </textPath>
      </text>

      {/* Center Landmark Silhouette */}
      <g fill="currentColor">
        <LandmarkGlyph type={province.landmarkType} />
      </g>

      {/* Bottom Score / Verified Ribbon */}
      {scoreLabel && (
        <text
          x="50"
          y="78"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7.2"
          fontWeight="700"
        >
          ★ {scoreLabel} ★
        </text>
      )}
    </svg>
  );
}
