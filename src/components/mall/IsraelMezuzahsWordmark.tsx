import type { CSSProperties, SVGProps } from "react";

export const ISRAEL_MEZUZAHS_WORDMARK_PARAMETERS = {
  canvas: {
    width: 1110,
    height: 257,
    aspectRatio: "1110 / 257",
    background: "#8ccfd0",
    textureOpacity: 0.42,
  },
  title: {
    text: "Israel Mezuzahs",
    color: "#99002e",
    fontFamily: '"Frank Ruhl Libre", Georgia, "Times New Roman", serif',
    fontSize: 118,
    fontWeight: 900,
    letterSpacing: 1,
    x: 63,
    baselineY: 116,
    textShadow: "0 1px 0 rgba(77,0,21,0.20)",
  },
  subtitle: {
    text: "and more...",
    color: "#f7f7f3",
    stroke: "#10252b",
    strokeWidth: 14,
    fontFamily: '"Fredoka", "Bubblegum Sans", system-ui, sans-serif',
    fontSize: 65,
    fontWeight: 700,
    letterSpacing: -2.2,
    x: 318,
    baselineY: 194,
    rotate: -2.2,
    textShadow:
      "0 3px 0 #10252b, 3px 0 0 #10252b, -3px 0 0 #10252b, 0 -3px 0 #10252b, 0 8px 0 rgba(2,17,21,0.90)",
  },
} as const;

type IsraelMezuzahsWordmarkProps = SVGProps<SVGSVGElement>;

const IsraelMezuzahsWordmark = ({ className, style, ...svgProps }: IsraelMezuzahsWordmarkProps) => {
  const params = ISRAEL_MEZUZAHS_WORDMARK_PARAMETERS;

  return (
    <svg
      aria-label={`${params.title.text} ${params.subtitle.text}`}
      className={className}
      role="img"
      viewBox={`0 0 ${params.canvas.width} ${params.canvas.height}`}
      preserveAspectRatio="xMidYMid meet"
      {...svgProps}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        direction: "ltr",
        ...style,
      }}
    >
      <defs>
        <pattern id="israel-mezuzahs-fibers" width="17" height="17" patternUnits="userSpaceOnUse">
          <rect width="17" height="17" fill={params.canvas.background} />
          <circle cx="2" cy="4" r="0.9" fill="rgba(255,255,255,0.30)" />
          <circle cx="12" cy="6" r="0.75" fill="rgba(0,64,68,0.12)" />
          <circle cx="6" cy="13" r="0.7" fill="rgba(255,255,255,0.22)" />
          <path d="M0 8.5H17M4 0V17" stroke="rgba(0,70,72,0.05)" strokeWidth="1" />
        </pattern>
        <linearGradient id="israel-mezuzahs-light" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="0.48" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="1" stopColor="rgba(0,78,82,0.08)" />
        </linearGradient>
      </defs>
      <rect width={params.canvas.width} height={params.canvas.height} fill={params.canvas.background} />
      <rect
        width={params.canvas.width}
        height={params.canvas.height}
        fill="url(#israel-mezuzahs-fibers)"
        opacity={params.canvas.textureOpacity}
      />
      <rect width={params.canvas.width} height={params.canvas.height} fill="url(#israel-mezuzahs-light)" />
      <text
        style={{
          fontFamily: params.title.fontFamily,
          fontSize: params.title.fontSize,
          fontWeight: params.title.fontWeight,
          letterSpacing: params.title.letterSpacing,
        } as CSSProperties}
        fill={params.title.color}
        x={params.title.x}
        y={params.title.baselineY}
      >
        {params.title.text}
      </text>
      <text
        style={{
          fontFamily: params.subtitle.fontFamily,
          fontSize: params.subtitle.fontSize,
          fontWeight: params.subtitle.fontWeight,
          letterSpacing: params.subtitle.letterSpacing,
          paintOrder: "stroke fill",
        } as CSSProperties}
        fill={params.subtitle.color}
        stroke={params.subtitle.stroke}
        strokeLinejoin="round"
        strokeWidth={params.subtitle.strokeWidth}
        transform={`rotate(${params.subtitle.rotate} ${params.subtitle.x} ${params.subtitle.baselineY})`}
        x={params.subtitle.x}
        y={params.subtitle.baselineY}
      >
        {params.subtitle.text}
      </text>
    </svg>
  );
};

export default IsraelMezuzahsWordmark;