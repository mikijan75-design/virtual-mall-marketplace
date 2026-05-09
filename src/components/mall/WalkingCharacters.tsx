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
  /** Show a shopping bag in the front hand. */
  withBag?: boolean;
  /** Optional bag color (hex). */
  bagColor?: string;
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

const renderById = (id: string, { className = "", flip = false, colorOverride, phase = 0, withBag = false, bagColor = "#d94f6b" }: WalkingCharProps) => {
  const character = walkingCharacters.find((c) => c.id === id)!;
  const { viewBox } = character.illustration;
  const shoulderY = viewBox.height * 0.34;
  const hipY = viewBox.height * 0.6;
  const pivotX = viewBox.width / 2;
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

  const armSwingA = "limb-swing-a 1.15s ease-in-out infinite";
  const armSwingB = "limb-swing-b 1.15s ease-in-out infinite";
  const legSwingA = "limb-swing-a 1.15s ease-in-out infinite";
  const legSwingB = "limb-swing-b 1.15s ease-in-out infinite";

  // Find the front hand position from the character data so the bag hangs
  // exactly off the hand for each character design.
  const allShapes = [
    ...character.illustration.backLayer,
    ...character.illustration.bodyLayer,
    ...character.illustration.detailLayer,
  ];
  const handShape = allShapes.find((s) => s.id === "front-hand") as
    | { kind: "circle"; cx: number; cy: number; r: number }
    | undefined;
  const handX = handShape?.cx ?? pivotX + 12;
  const handY = handShape?.cy ?? viewBox.height * 0.6;

  // Shopping bag drawn in viewBox units, anchored to the front hand,
  // and rendered inside the armB swing group so it sways with the arm.
  const bagW = 34;
  const bagH = 40;
  const bagX = handX - bagW / 2;
  const bagY = handY + 4; // hangs just below the hand
  const handleInset = 7;
  const handleRise = 10;
  const bag = withBag ? (
    <g
      style={{
        transformBox: "view-box",
        transformOrigin: `${pivotX}px ${shoulderY}px`,
        animation: armSwingB,
        animationDelay: delay,
      }}
    >
      {/* Soft drop shadow under bag */}
      <ellipse
        cx={handX}
        cy={bagY + bagH + 2}
        rx={bagW / 2}
        ry={1.6}
        fill="#1f2937"
        opacity={0.18}
      />
      {/* Handle (loops over the hand) */}
      <path
        d={`M ${bagX + handleInset} ${bagY + 1} C ${bagX + handleInset} ${bagY - handleRise}, ${bagX + bagW - handleInset} ${bagY - handleRise}, ${bagX + bagW - handleInset} ${bagY + 1}`}
        fill="none"
        stroke="#3f3029"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      {/* Bag body */}
      <path
        d={`M ${bagX} ${bagY}
            L ${bagX + bagW} ${bagY}
            L ${bagX + bagW - 1.5} ${bagY + bagH}
            L ${bagX + 1.5} ${bagY + bagH} Z`}
        fill="#ffffff"
        stroke="#3f3029"
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      {/* Soft side shading */}
      <path
        d={`M ${bagX + bagW - 5} ${bagY + 2}
            L ${bagX + bagW - 1.5} ${bagY + bagH - 1}`}
        stroke="#3f3029"
        strokeWidth={0.8}
        strokeLinecap="round"
        opacity={0.18}
      />
      {/* Folded top edge */}
      <line
        x1={bagX + 1}
        y1={bagY + 2}
        x2={bagX + bagW - 1}
        y2={bagY + 2}
        stroke="#3f3029"
        strokeWidth={0.8}
        opacity={0.5}
      />
      {/* Small accent label */}
      <rect
        x={bagX + bagW / 2 - 4}
        y={bagY + bagH * 0.45}
        width={8}
        height={3}
        rx={0.6}
        fill={bagColor}
        opacity={0.85}
      />
    </g>
  ) : null;

  return (
    <svg
      className={`absolute z-40 h-12 w-7 md:h-16 md:w-9 ${className}`}
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio="xMidYMax meet"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes limb-swing-a {
          0%, 100% { transform: rotate(6deg); }
          50%      { transform: rotate(-6deg); }
        }
        @keyframes limb-swing-b {
          0%, 100% { transform: rotate(-6deg); }
          50%      { transform: rotate(6deg); }
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
        {renderGroup(back.legB, { x: pivotX, y: hipY }, legSwingB)}
        {renderGroup(body.legB, { x: pivotX, y: hipY }, legSwingB)}
        {renderGroup(back.armA, { x: pivotX, y: shoulderY }, armSwingA)}
        {renderGroup(body.armA, { x: pivotX, y: shoulderY }, armSwingA)}
        {/* Static base layers */}
        {renderGroup(back.base, null, null)}
        {renderGroup(body.base, null, null)}
        {/* Front-facing limbs on top */}
        {renderGroup(back.legA, { x: pivotX, y: hipY }, legSwingA)}
        {renderGroup(body.legA, { x: pivotX, y: hipY }, legSwingA)}
        {renderGroup(back.armB, { x: pivotX, y: shoulderY }, armSwingB)}
        {renderGroup(body.armB, { x: pivotX, y: shoulderY }, armSwingB)}
        {/* Details (face, accessories) — also include any limb details */}
        {renderGroup(detail.legB, { x: pivotX, y: hipY }, legSwingB)}
        {renderGroup(detail.armA, { x: pivotX, y: shoulderY }, armSwingA)}
        {renderGroup(detail.base, null, null)}
        {renderGroup(detail.legA, { x: pivotX, y: hipY }, legSwingA)}
        {renderGroup(detail.armB, { x: pivotX, y: shoulderY }, armSwingB)}
        {bag}
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
  withBag,
  bagColor,
}: {
  className?: string;
  flip?: boolean;
  gender?: "male" | "female";
  seed?: number;
  colorOverride?: Record<string, string>;
  phase?: number;
  withBag?: boolean;
  bagColor?: string;
}) => {
  const resolvedPhase = phase ?? (seed * 0.137) % 1;
  // Default: ~40% of characters carry a bag, deterministically by seed.
  const carriesBag = withBag ?? (seed % 5 < 2);
  const palette = ["#d94f6b", "#2f6f8f", "#c98a2b", "#5a8a3a", "#7a4ea8"];
  const resolvedBagColor = bagColor ?? palette[seed % palette.length];
  if (gender === "male") {
    return <CharDarkManJacket className={className} flip={flip} colorOverride={colorOverride} phase={resolvedPhase} withBag={carriesBag} bagColor={resolvedBagColor} />;
  }
  const Design = FEMALE_DESIGNS[seed % FEMALE_DESIGNS.length];
  return <Design className={className} flip={flip} colorOverride={colorOverride} phase={resolvedPhase} withBag={carriesBag} bagColor={resolvedBagColor} />;
};

export default WalkingCharacter;
