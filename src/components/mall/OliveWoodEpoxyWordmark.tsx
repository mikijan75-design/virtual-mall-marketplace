import type { CSSProperties, SVGProps } from "react";

export const OLIVE_WOOD_EPOXY_WORDMARK_PARAMETERS = {
  canvas: {
    width: 1024,
    height: 201,
    aspectRatio: "1024 / 201",
    background: "#f8f7f2",
    paperGrainOpacity: 0.52,
    paperSpeckleOpacity: 0.36,
  },
  title: {
    text: "Olive Wood & Epoxy Art",
    color: "#96112e",
    fontFamily: '"Frank Ruhl Libre", Georgia, "Times New Roman", serif',
    fontSize: 74,
    fontWeight: 900,
    letterSpacing: 0.25,
    x: 64,
    baselineY: 67,
    textShadow: "0 1px 0 rgba(82,0,24,0.12)",
  },
  subtitle: {
    text: "אומנות בעץ זית ואפוקסי",
    color: "#96112e",
    fontFamily: '"Frank Ruhl Libre", Georgia, "Times New Roman", serif',
    fontSize: 70,
    fontWeight: 900,
    letterSpacing: 1.1,
    x: 511,
    baselineY: 162,
    textAnchor: "middle",
    textShadow: "0 1px 0 rgba(82,0,24,0.12)",
  },
} as const;

type OliveWoodEpoxyWordmarkProps = SVGProps<SVGSVGElement>;

const OliveWoodEpoxyWordmark = ({ className, style, ...svgProps }: OliveWoodEpoxyWordmarkProps) => {
  const params = OLIVE_WOOD_EPOXY_WORDMARK_PARAMETERS;

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
        <filter id="olive-wood-epoxy-paper-noise" x="0" y="0" width="100%" height="100%">
          <feTurbulence baseFrequency="0.72" numOctaves="4" seed="37" type="fractalNoise" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.94 0 0 0 0 0.92 0 0 0 0 0.86 0 0 0 0.42 0"
          />
        </filter>
        <pattern id="olive-wood-epoxy-paper-fibers" width="19" height="19" patternUnits="userSpaceOnUse">
          <rect width="19" height="19" fill={params.canvas.background} />
          <path d="M1 5.5H18M0 14.5H17" stroke="rgba(111,92,70,0.055)" strokeWidth="0.7" />
          <path d="M4 0V18M14 1V19" stroke="rgba(255,255,255,0.26)" strokeWidth="0.55" />
          <circle cx="5" cy="4" r="0.55" fill="rgba(108,82,58,0.16)" />
          <circle cx="15" cy="9" r="0.45" fill="rgba(117,94,68,0.14)" />
          <circle cx="9" cy="16" r="0.5" fill="rgba(255,255,255,0.38)" />
        </pattern>
        <linearGradient id="olive-wood-epoxy-paper-light" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.30)" />
          <stop offset="0.42" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="1" stopColor="rgba(120,94,62,0.045)" />
        </linearGradient>
      </defs>
      <rect width={params.canvas.width} height={params.canvas.height} fill={params.canvas.background} />
      <rect
        width={params.canvas.width}
        height={params.canvas.height}
        fill="url(#olive-wood-epoxy-paper-fibers)"
        opacity={params.canvas.paperGrainOpacity}
      />
      <rect
        width={params.canvas.width}
        height={params.canvas.height}
        filter="url(#olive-wood-epoxy-paper-noise)"
        opacity={params.canvas.paperSpeckleOpacity}
      />
      <rect width={params.canvas.width} height={params.canvas.height} fill="url(#olive-wood-epoxy-paper-light)" />
      <text
        style={{
          fontFamily: params.title.fontFamily,
          fontSize: params.title.fontSize,
          fontWeight: params.title.fontWeight,
          letterSpacing: params.title.letterSpacing,
          textShadow: params.title.textShadow,
        } as CSSProperties}
        fill={params.title.color}
        x={params.title.x}
        y={params.title.baselineY}
      >
        {params.title.text}
      </text>
      <text
        direction="rtl"
        style={{
          fontFamily: params.subtitle.fontFamily,
          fontSize: params.subtitle.fontSize,
          fontWeight: params.subtitle.fontWeight,
          letterSpacing: params.subtitle.letterSpacing,
          textShadow: params.subtitle.textShadow,
          unicodeBidi: "bidi-override",
        } as CSSProperties}
        fill={params.subtitle.color}
        textAnchor={params.subtitle.textAnchor}
        x={params.subtitle.x}
        y={params.subtitle.baselineY}
      >
        {params.subtitle.text}
      </text>
    </svg>
  );
};

export default OliveWoodEpoxyWordmark;
