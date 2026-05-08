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
  /** Stagger the limb-swing phase so a crowd doesn't move in lockstep. */
  phase?: number;
}

const limbCategory = (id: string): "armA" | "armB" | "legA" | "legB" | null => {
  // Group A: rear arm + front leg (swing forward together).
  // Group B: front arm + rear leg (swing the opposite way).
  if (/^rear-(arm|hand|forearm|wrist)/.test(id)) return "armA";
  if (/^front-(arm|hand|forearm|wrist)/.test(id)) return "armB";
  if (/^rear-(leg|shoe|foot|thigh|calf)/.test(id)) return "legB";
  if (/^front-(leg|shoe|foot|thigh|calf)/.test(id)) return "legA";
  return null;
};

const renderById = (id: string, { className = "", flip = false, colorOverride, phase = 0 }: WalkingCharProps) => {
  const character = walkingCharacters.find((c) => c.id === id)!;
  const { viewBox } = character.illustration;
  const shoulderY = viewBox.height * 0.34;
  const hipY = viewBox.height * 0.6;
  const pivotX = viewBox.width / 2;
  const frontHipX = viewBox.width * 0.56;
  const rearHipX = viewBox.width * 0.42;
  const delay = `${(phase % 1) * -0.7}s`;

  const partition = (shapes: typeof character.illustration.backLayer) => {
    const base: typeof shapes = [];
    const armA: typeof shapes = [];
    const armB: typeof shapes = [];
    const legA: typeof shapes = [];
    const legB: typeof shapes = [];
    for (const s of shapes) {
      const cat = limbCategory(s.id);
      if (cat === "armA") armA.push(s);
      else if (cat === "armB") armB.push(s);
      else if (cat === "legA") legA.push(s);
      else if (cat === "legB") legB.push(s);
      else base.push(s);
    }
    return { base, armA, armB, legA, legB };
  };

  const renderGroup = (
    shapes: CharacterVectorShape[],
    pivot: { x: number; y: number } | null,
    animation: string | null,
  ) =>
    shapes.length === 0 ? null : (
      <g
        style={
          pivot && animation
            ? {
                transformBox: "view-box",
                transformOrigin: `${pivot.x}px ${pivot.y}px`,
                animation,
                animationDelay: delay,
              }
            : undefined
        }
      >
        {shapes.map((s) => (
          <VectorShape key={s.id} character={character} shape={s} overrides={colorOverride} />
        ))}
      </g>
    );

  const back = partition(character.illustration.backLayer);
  const body = partition(character.illustration.bodyLayer);
  const detail = partition(character.illustration.detailLayer);

  const armSwingA = "arm-swing-a 1.15s ease-in-out infinite";
  const armSwingB = "arm-swing-b 1.15s ease-in-out infinite";
  const legSwingA = "leg-swing-a 1.15s ease-in-out infinite";
  const legSwingB = "leg-swing-b 1.15s ease-in-out infinite";

  return (
    <svg
      className={`absolute z-40 h-12 w-7 md:h-16 md:w-9 ${className}`}
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio="xMidYMax meet"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes arm-swing-a {
          0%, 100% { transform: rotate(28deg); }
          50%      { transform: rotate(-28deg); }
        }
        @keyframes arm-swing-b {
          0%, 100% { transform: rotate(-28deg); }
          50%      { transform: rotate(28deg); }
        }
        @keyframes leg-swing-a {
          0%, 100% { transform: rotate(10deg); }
          50%      { transform: rotate(-10deg); }
        }
        @keyframes leg-swing-b {
          0%, 100% { transform: rotate(-10deg); }
          50%      { transform: rotate(10deg); }
        }
        @keyframes body-bob {
          0%, 100% { transform: translateY(0); }
          25%, 75% { transform: translateY(-1px); }
          50%      { transform: translateY(0); }
        }
      `}</style>
      <ellipse
        cx={character.illustration.shadow.cx}
        cy={character.illustration.shadow.cy}
        rx={character.illustration.shadow.rx}
        ry={character.illustration.shadow.ry}
        fill={colorFor(character, character.illustration.shadow.fillToken)}
        opacity={character.illustration.shadow.opacity}
      />
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: `${viewBox.width / 2}px ${viewBox.height / 2}px`,
          animation: "body-bob 1.15s ease-in-out infinite",
          animationDelay: delay,
        }}
      >
        {/* Limbs swung behind the torso (rendered first so torso covers them) */}
        {renderGroup(back.legB, { x: rearHipX, y: hipY }, legSwingB)}
        {renderGroup(body.legB, { x: rearHipX, y: hipY }, legSwingB)}
        {renderGroup(back.armA, { x: pivotX, y: shoulderY }, armSwingA)}
        {renderGroup(body.armA, { x: pivotX, y: shoulderY }, armSwingA)}
        {/* Static base layers */}
        {renderGroup(back.base, null, null)}
        {renderGroup(body.base, null, null)}
        {/* Front-facing limbs on top */}
        {renderGroup(back.legA, { x: frontHipX, y: hipY }, legSwingA)}
        {renderGroup(body.legA, { x: frontHipX, y: hipY }, legSwingA)}
        {renderGroup(back.armB, { x: pivotX, y: shoulderY }, armSwingB)}
        {renderGroup(body.armB, { x: pivotX, y: shoulderY }, armSwingB)}
        {/* Details (face, accessories) — also include any limb details */}
        {renderGroup(detail.legB, { x: rearHipX, y: hipY }, legSwingB)}
        {renderGroup(detail.armA, { x: pivotX, y: shoulderY }, armSwingA)}
        {renderGroup(detail.base, null, null)}
        {renderGroup(detail.legA, { x: frontHipX, y: hipY }, legSwingA)}
        {renderGroup(detail.armB, { x: pivotX, y: shoulderY }, armSwingB)}
      </g>
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
  phase,
}: {
  className?: string;
  flip?: boolean;
  gender?: "male" | "female";
  seed?: number;
  colorOverride?: Record<string, string>;
  phase?: number;
}) => {
  const resolvedPhase = phase ?? (seed * 0.137) % 1;
  if (gender === "male") {
    return <CharDarkManJacket className={className} flip={flip} colorOverride={colorOverride} phase={resolvedPhase} />;
  }
  const Design = FEMALE_DESIGNS[seed % FEMALE_DESIGNS.length];
  return <Design className={className} flip={flip} colorOverride={colorOverride} phase={resolvedPhase} />;
};

export default WalkingCharacter;
