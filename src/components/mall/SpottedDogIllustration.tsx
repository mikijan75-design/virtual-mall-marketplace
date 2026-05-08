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

      <g transform="translate(310 116)">
        <ellipse cx="240" cy="306" rx="130" ry="14" fill={params.palette.shadow} opacity="0.82" />

        <g fill="none" stroke={params.palette.outline} strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M78 167 C34 156 6 130 0 96 C-4 73 3 50 15 44 C25 39 31 44 27 57 C20 82 29 107 50 125 C66 139 84 145 102 149"
            strokeWidth="4"
          />
          <path
            d="M95 152 C127 121 185 126 230 141 C258 149 293 140 316 117"
            strokeWidth="4"
          />
          <path
            d="M86 162 C69 188 58 222 58 255 C58 275 49 290 42 302 M120 262 C108 281 103 296 104 314"
            strokeWidth="4"
          />
          <path d="M43 300 C36 306 36 317 47 318 L62 318 C68 317 70 310 63 306" strokeWidth="4" />
          <path d="M100 309 C93 318 99 326 112 326 L126 326 C132 325 134 317 126 313" strokeWidth="4" />
          <path d="M245 256 C241 278 241 295 246 314" strokeWidth="4" />
          <path d="M289 251 C291 277 290 295 286 315" strokeWidth="4" />
          <path d="M242 311 C233 319 237 329 250 329 L264 329 C271 327 272 319 264 315" strokeWidth="4" />
          <path d="M283 312 C274 320 278 329 291 329 L306 329 C313 327 314 318 305 314" strokeWidth="4" />
        </g>

        <path
          d="M91 154 C122 124 181 129 227 143 C252 151 282 145 308 125 C334 104 373 110 393 138 C408 159 403 183 382 196 C361 209 338 208 318 197 C306 214 296 238 291 263 C255 278 206 275 154 262 C122 254 93 256 67 269 C55 240 59 193 91 154 Z"
          fill={params.palette.coat}
          stroke={params.palette.outline}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />

        <path
          d="M323 121 C341 98 376 103 399 125 C419 144 417 169 398 186 C374 208 335 201 317 174 C305 154 307 136 323 121 Z"
          fill={params.palette.coat}
          stroke={params.palette.outline}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="M389 137 C405 139 423 149 431 163 C411 162 398 154 389 137 Z"
          fill={params.palette.coatShade}
          stroke={params.palette.outline}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="M319 122 C332 111 358 102 368 112 C374 137 361 173 338 184 C319 177 309 143 319 122 Z"
          fill={params.palette.ear}
          stroke={params.palette.outline}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <ellipse
          cx="424"
          cy="170"
          rx="18"
          ry="12"
          fill={params.palette.spots}
          stroke={params.palette.outline}
          strokeWidth="3"
          transform="rotate(-9 424 170)"
        />

        <g fill={params.palette.spots}>
          <ellipse cx="126" cy="176" rx="19" ry="15" transform="rotate(8 126 176)" />
          <ellipse cx="188" cy="171" rx="10" ry="8" transform="rotate(-8 188 171)" />
          <ellipse cx="242" cy="209" rx="17" ry="15" transform="rotate(-13 242 209)" />
          <ellipse cx="70" cy="217" rx="11" ry="12" transform="rotate(-20 70 217)" />
          <ellipse cx="94" cy="244" rx="11" ry="13" transform="rotate(18 94 244)" />
          <ellipse cx="295" cy="199" rx="8" ry="12" transform="rotate(-18 295 199)" />
          <ellipse cx="313" cy="156" rx="8" ry="9" />
        </g>

        <g fill={params.palette.spots}>
          <circle cx="369" cy="144" r="6" />
          <circle cx="393" cy="143" r="5" />
          <circle cx="418" cy="156" r="4" />
        </g>

        <path
          d="M341 171 C352 188 376 194 396 181"
          fill="none"
          stroke={params.palette.smile}
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M398 186 C407 189 416 187 423 181"
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
