import {
  walkingCharacters,
  type CharacterVectorShape,
  type WalkingCharacterSample,
} from "@/data/walkingCharacters";

const fallbackColors: Record<string, string> = {
  annotation: "transparent",
  eye: "#18202c",
  mouth: "#7d2d2d",
  outline: "#3f3029",
  shadow: "#1f2937",
  white: "#ffffff",
};

const colorFor = (
  character: WalkingCharacterSample,
  token?: string,
  overrides?: Record<string, string>,
) => {
  if (!token) return "none";
  if (overrides && overrides[token]) return overrides[token];
  return character.palette.find((s) => s.token === token)?.hex ?? fallbackColors[token] ?? token;
};

const VectorShape = ({
  character,
  shape,
  overrides,
}: {
  character: WalkingCharacterSample;
  shape: CharacterVectorShape;
  overrides?: Record<string, string>;
}) => {
  if (shape.kind === "ellipse") {
    return (
      <ellipse
        cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry}
        fill={colorFor(character, shape.fillToken, overrides)}
        stroke={colorFor(character, shape.strokeToken, overrides)}
        strokeWidth={shape.strokeWidth} opacity={shape.opacity}
      />
    );
  }
  if (shape.kind === "circle") {
    return (
      <circle
        cx={shape.cx} cy={shape.cy} r={shape.r}
        fill={colorFor(character, shape.fillToken, overrides)}
        stroke={colorFor(character, shape.strokeToken, overrides)}
        strokeWidth={shape.strokeWidth} opacity={shape.opacity}
      />
    );
  }
  if (shape.kind === "line") {
    return (
      <line
        x1={shape.x1} y1={shape.y1} x2={shape.x2} y2={shape.y2}
        stroke={colorFor(character, shape.strokeToken, overrides)}
        strokeWidth={shape.strokeWidth} strokeLinecap={shape.lineCap}
        opacity={shape.opacity}
      />
    );
  }
  return (
    <path
      d={shape.d}
      fill={colorFor(character, shape.fillToken, overrides)}
      stroke={colorFor(character, shape.strokeToken, overrides)}
      strokeWidth={shape.strokeWidth}
      strokeLinecap={shape.lineCap}
      strokeLinejoin={shape.lineJoin}
      opacity={shape.opacity}
    />
  );
};

interface WalkingCharProps {
  className?: string;
  flip?: boolean;
  colorOverride?: Record<string, string>;
}

const renderById = (id: string, { className = "", flip = false, colorOverride }: WalkingCharProps) => {
  const character = walkingCharacters.find((c) => c.id === id)!;
  const { viewBox } = character.illustration;
  return (
    <svg
      className={`absolute z-40 h-12 w-7 md:h-16 md:w-9 ${className}`}
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio="xMidYMax meet"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <ellipse
        cx={character.illustration.shadow.cx}
        cy={character.illustration.shadow.cy}
        rx={character.illustration.shadow.rx}
        ry={character.illustration.shadow.ry}
        fill={colorFor(character, character.illustration.shadow.fillToken)}
        opacity={character.illustration.shadow.opacity}
      />
      {character.illustration.backLayer.map((s) => (
        <VectorShape key={s.id} character={character} shape={s} overrides={colorOverride} />
      ))}
      {character.illustration.bodyLayer.map((s) => (
        <VectorShape key={s.id} character={character} shape={s} overrides={colorOverride} />
      ))}
      {character.illustration.detailLayer.map((s) => (
        <VectorShape key={s.id} character={character} shape={s} overrides={colorOverride} />
      ))}
    </svg>
  );
};

export const CharBrunetteJacket = (p: WalkingCharProps) => renderById("brunette-blue-jacket", p);
export const CharBrunetteDress = (p: WalkingCharProps) => renderById("brunette-blue-dress", p);
export const CharBlondeJeans = (p: WalkingCharProps) => renderById("blonde-white-top-jeans", p);
export const CharDarkManJacket = (p: WalkingCharProps) => renderById("dark-haired-blue-jacket", p);

// Routing helper --------------------------------------------------------------
const FEMALE_DESIGNS = [CharBrunetteJacket, CharBrunetteDress, CharBlondeJeans];

/**
 * Replacement for the previous `Person` component.
 * - Preserves the original sizing classes (`h-12 w-7 md:h-16 md:w-9`)
 * - For male characters: always renders the single masculine design.
 * - For female characters: deterministically picks one of the women designs
 *   based on `seed` so the layout stays stable across renders but characters
 *   appear randomized across the page.
 */
export const WalkingCharacter = ({
  className = "",
  flip = false,
  gender = "female",
  seed = 0,
  colorOverride,
}: {
  className?: string;
  flip?: boolean;
  gender?: "male" | "female";
  seed?: number;
  colorOverride?: Record<string, string>;
}) => {
  if (gender === "male") {
    return <CharDarkManJacket className={className} flip={flip} colorOverride={colorOverride} />;
  }
  const Design = FEMALE_DESIGNS[seed % FEMALE_DESIGNS.length];
  return <Design className={className} flip={flip} colorOverride={colorOverride} />;
};

export default WalkingCharacter;
