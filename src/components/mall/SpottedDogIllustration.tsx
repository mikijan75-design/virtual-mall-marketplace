import type { SVGProps } from "react";

export const SPOTTED_DOG_ILLUSTRATION_PARAMETERS = {
  canvas: {
    width: 1024,
    height: 576,
    background: "#ffffff",
    aspectRatio: "16 / 9",
  },
  palette: {
    outline: "#46433b",
    coat: "#f7f2e3",
    coatShade: "#ebe4d1",
    highlight: "#fffdf4",
    spots: "#11110f",
    ear: "#4b4840",
    smile: "#d24b43",
    shadow: "#cabda8",
  },
} as const;

type SpottedDogIllustrationProps = SVGProps<SVGSVGElement> & {
  showBackground?: boolean;
};

const SpottedDogIllustration = ({
  className,
  showBackground = false,
  style,
  ...svgProps
}: SpottedDogIllustrationProps) => {
  const params = SPOTTED_DOG_ILLUSTRATION_PARAMETERS;

  return (
    <svg
      aria-label="Playful spotted dog illustration scanned from the reference image"
      className={className}
      role="img"
      viewBox={`0 0 ${params.canvas.width} ${params.canvas.height}`}
      preserveAspectRatio="xMidYMid meet"
      {...svgProps}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      <title>Playful spotted dog illustration</title>
      {showBackground ? (
        <rect width={params.canvas.width} height={params.canvas.height} fill={params.canvas.background} />
      ) : null}

      <g transform="translate(402 203)">
        <ellipse cx="153" cy="221" rx="129" ry="12" fill={params.palette.shadow} opacity="0.82" />

        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M64 77 C33 70 10 48 8 20 C7 6 12 -1 17 1 C25 4 19 16 21 29 C25 51 42 64 67 66"
            stroke={params.palette.outline}
            strokeWidth="12"
          />
          <path
            d="M64 77 C33 70 10 48 8 20 C7 6 12 -1 17 1 C25 4 19 16 21 29 C25 51 42 64 67 66"
            stroke={params.palette.coat}
            strokeWidth="7"
          />

          <path
            d="M67 80 C94 54 143 61 185 73 C206 79 225 70 240 53"
            stroke={params.palette.outline}
            strokeWidth="5"
          />
          <path
            d="M62 84 C44 114 38 152 47 186"
            stroke={params.palette.outline}
            strokeWidth="5"
          />
          <path
            d="M97 153 C84 169 79 184 80 203"
            stroke={params.palette.outline}
            strokeWidth="5"
          />
          <path
            d="M181 145 C176 166 176 186 180 205"
            stroke={params.palette.outline}
            strokeWidth="5"
          />
          <path
            d="M220 139 C222 166 220 187 216 207"
            stroke={params.palette.outline}
            strokeWidth="5"
          />
          <path d="M43 184 C36 191 39 201 50 202 L61 202 C67 201 68 194 61 190" stroke={params.palette.outline} strokeWidth="5" />
          <path d="M77 199 C70 207 74 216 86 216 L99 216 C105 214 106 207 98 203" stroke={params.palette.outline} strokeWidth="5" />
          <path d="M177 201 C169 209 173 219 186 219 L199 219 C205 217 206 209 198 205" stroke={params.palette.outline} strokeWidth="5" />
          <path d="M213 202 C205 211 209 220 222 220 L236 220 C242 218 243 209 234 205" stroke={params.palette.outline} strokeWidth="5" />
        </g>

        <path
          d="M66 78 C95 54 144 60 185 73 C205 79 224 70 239 54 C260 32 298 37 316 62 C329 80 326 101 309 113 C290 126 268 125 247 112 C235 129 224 151 221 178 C188 190 143 185 105 168 C81 157 61 162 47 185 C37 149 42 106 66 78 Z"
          fill={params.palette.coat}
          stroke={params.palette.outline}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <path
          d="M74 87 C102 66 145 70 181 79 C201 84 220 76 234 63"
          fill="none"
          stroke={params.palette.highlight}
          strokeLinecap="round"
          strokeWidth="5"
          opacity="0.55"
        />

        <path
          d="M242 54 C260 32 297 36 316 61 C331 81 326 105 306 118 C284 132 252 122 238 96 C230 80 231 64 242 54 Z"
          fill={params.palette.coat}
          stroke={params.palette.outline}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <path
          d="M296 68 C310 70 325 79 333 92 C316 92 303 84 296 68 Z"
          fill={params.palette.coatShade}
          stroke={params.palette.outline}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <path
          d="M239 51 C252 39 278 30 286 40 C291 65 276 100 255 111 C239 104 229 69 239 51 Z"
          fill={params.palette.ear}
          stroke={params.palette.outline}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <ellipse
          cx="327"
          cy="103"
          rx="16"
          ry="11"
          fill={params.palette.spots}
          stroke={params.palette.outline}
          strokeWidth="3"
          transform="rotate(-9 327 103)"
        />

        <g fill={params.palette.spots}>
          <ellipse cx="105" cy="101" rx="20" ry="15" transform="rotate(5 105 101)" />
          <ellipse cx="151" cy="89" rx="10" ry="8" transform="rotate(-8 151 89)" />
          <ellipse cx="196" cy="126" rx="16" ry="15" transform="rotate(-12 196 126)" />
          <ellipse cx="51" cy="124" rx="10" ry="13" transform="rotate(-20 51 124)" />
          <ellipse cx="76" cy="150" rx="10" ry="12" transform="rotate(16 76 150)" />
          <ellipse cx="226" cy="105" rx="8" ry="11" transform="rotate(-18 226 105)" />
          <ellipse cx="241" cy="82" rx="8" ry="9" />
        </g>

        <g fill={params.palette.spots}>
          <circle cx="279" cy="71" r="6" />
          <circle cx="302" cy="72" r="5" />
          <circle cx="320" cy="87" r="4" />
        </g>

        <path
          d="M263 97 C274 113 296 117 313 104"
          fill="none"
          stroke={params.palette.smile}
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M311 110 C318 113 325 111 331 106"
          fill="none"
          stroke={params.palette.outline}
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M222 123 C213 132 202 138 188 139"
          fill="none"
          stroke={params.palette.outline}
          strokeLinecap="round"
          strokeWidth="4"
        />
      </g>
    </svg>
  );
};

export default SpottedDogIllustration;
