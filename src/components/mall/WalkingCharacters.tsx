import { walkingCharacters } from "@/data/walkingCharacters";

// Build a quick lookup of palette colors per character id
const paletteOf = (id: string) => {
  const c = walkingCharacters.find((w) => w.id === id);
  const map: Record<string, string> = {};
  c?.palette.forEach((p) => (map[p.token] = p.hex));
  return map;
};

const PAL = {
  brunetteJacket: paletteOf("brunette-blue-jacket"),
  brunetteDress: paletteOf("brunette-blue-dress"),
  blondeJeans: paletteOf("blonde-white-top-jeans"),
  darkJacket: paletteOf("dark-haired-blue-jacket"),
};

interface WalkingCharProps {
  className?: string;
  flip?: boolean;
}

// Shared SVG wrapper — preserves the original Person sizing exactly
const Wrapper = ({
  className = "",
  flip = false,
  children,
}: WalkingCharProps & { children: React.ReactNode }) => (
  <svg
    className={`absolute z-40 h-12 w-7 md:h-16 md:w-9 ${className}`}
    viewBox="0 0 30 60"
    style={{ transform: flip ? "scaleX(-1)" : undefined }}
    aria-hidden="true"
  >
    {children}
  </svg>
);

// Common parts ----------------------------------------------------------------
const Head = ({ skin, hair }: { skin: string; hair: string }) => (
  <>
    {/* Hair back */}
    <ellipse cx="15" cy="8" rx="5" ry="5.6" fill={hair} />
    {/* Face */}
    <ellipse cx="15" cy="9" rx="4" ry="4.6" fill={skin} stroke="hsl(25,35%,38%)" strokeWidth="0.4" />
    {/* Eye (profile-ish, looking right) */}
    <circle cx="17" cy="9" r="0.5" fill="hsl(220,30%,18%)" />
    {/* Mouth */}
    <path d="M16.4 11 Q17.2 11.4 18 11" stroke="hsl(0,40%,30%)" strokeWidth="0.35" fill="none" strokeLinecap="round" />
  </>
);

const Legs = ({ pants, shoes }: { pants: string; shoes: string }) => (
  <>
    {/* Walking pose: front leg forward, rear leg back */}
    <path d="M13 34 L10 52" stroke={pants} strokeWidth="2.6" strokeLinecap="round" />
    <path d="M17 34 L21 52" stroke={pants} strokeWidth="2.6" strokeLinecap="round" />
    <path d="M8 53 L13 53" stroke={shoes} strokeWidth="2" strokeLinecap="round" />
    <path d="M19 53 L24 53" stroke={shoes} strokeWidth="2" strokeLinecap="round" />
  </>
);

// 1. Brunette in blue jacket --------------------------------------------------
export const CharBrunetteJacket = (p: WalkingCharProps) => {
  const c = PAL.brunetteJacket;
  return (
    <Wrapper {...p}>
      <Head skin={c.skin} hair={c.hair} />
      {/* Short bob */}
      <path d="M10 6 Q10 3 15 3 Q20 3 20 6 Q20 9 19 11 L19 8 Q15 5 11 8 L11 10 Z" fill={c.hair} />
      {/* Jacket */}
      <path d="M10 13 L20 13 L22 33 L8 33 Z" fill={c.jacket} stroke="hsl(210,40%,22%)" strokeWidth="0.5" />
      {/* Cuffs / lapel highlight */}
      <path d="M11 14 L15 18 L19 14" stroke={c["jacket-highlight"]} strokeWidth="0.6" fill="none" />
      <path d="M15 14 L15 30" stroke="hsl(210,40%,22%)" strokeWidth="0.4" />
      {/* Arms (bent, mid-stride) */}
      <path d="M10 16 Q6 22 7 27" stroke={c.jacket} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M20 16 Q24 22 23 27" stroke={c.jacket} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      {/* Hands */}
      <circle cx="7" cy="27" r="1.2" fill={c.skin} />
      <circle cx="23" cy="27" r="1.2" fill={c.skin} />
      <Legs pants={c.pants} shoes={c.shoes} />
    </Wrapper>
  );
};

// 2. Brunette in pale blue dress ---------------------------------------------
export const CharBrunetteDress = (p: WalkingCharProps) => {
  const c = PAL.brunetteDress;
  return (
    <Wrapper {...p}>
      <Head skin={c.skin} hair={c.hair} />
      <path d="M10 6 Q10 3 15 3 Q20 3 20 6 Q20 9 19 10 L19 8 Q15 5 11 8 L11 10 Z" fill={c.hair} />
      {/* A-line dress */}
      <path d="M10 13 L20 13 L24 38 L6 38 Z" fill={c.dress} stroke="hsl(195,25%,42%)" strokeWidth="0.5" />
      {/* Front highlight */}
      <path d="M14 14 L13 36" stroke={c["dress-highlight"]} strokeWidth="1.4" />
      {/* Pocket */}
      <rect x="16.5" y="18" width="2.2" height="2.4" fill={c.pocket} stroke="hsl(195,25%,38%)" strokeWidth="0.3" />
      {/* Arms */}
      <path d="M10 15 Q7 22 8 27" stroke={c.skin} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M20 15 Q23 22 22 27" stroke={c.skin} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* Bare legs */}
      <path d="M13 38 L10 52" stroke={c.skin} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M17 38 L21 52" stroke={c.skin} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M8 53 L13 53" stroke={c.shoes} strokeWidth="2" strokeLinecap="round" />
      <path d="M19 53 L24 53" stroke={c.shoes} strokeWidth="2" strokeLinecap="round" />
    </Wrapper>
  );
};

// 3. Blonde, white top, jeans -------------------------------------------------
export const CharBlondeJeans = (p: WalkingCharProps) => {
  const c = PAL.blondeJeans;
  return (
    <Wrapper {...p}>
      {/* Long wavy hair behind */}
      <path d="M9 7 Q9 14 10.5 22 L13 22 L13 9 Q13 7 15 6 Z" fill={c["hair-shadow"]} />
      <path d="M10 7 Q10.5 12 12 18 L13 18 L13 9 Q13 7.5 14.5 7 Z" fill={c["hair-highlight"]} />
      <Head skin={c.skin} hair={c["hair-shadow"]} />
      {/* Hair top */}
      <path d="M10 6 Q10 2.5 15 2.5 Q20 2.5 20 6 Q19 4 15 4 Q11 4 10 6 Z" fill={c["hair-highlight"]} />
      {/* Sleeveless top */}
      <path d="M11 13 L19 13 L20 24 L10 24 Z" fill={c.top} stroke="hsl(40,20%,68%)" strokeWidth="0.4" />
      {/* Belt */}
      <rect x="10" y="24" width="10" height="1.4" fill={c.belt} />
      {/* Jeans */}
      <path d="M10 25.4 L20 25.4 L21 33 L9 33 Z" fill={c.jeans} stroke="hsl(215,40%,18%)" strokeWidth="0.4" />
      {/* Bare arms (long stride, bent) */}
      <path d="M11 14 Q6 20 6 25" stroke={c.skin} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M19 14 Q24 20 24 25" stroke={c.skin} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* Wrist accessory */}
      <circle cx="6" cy="25" r="1" fill={c.belt} />
      <Legs pants={c.jeans} shoes={c.shoes} />
    </Wrapper>
  );
};

// 4. Dark-haired man, blue jacket --------------------------------------------
export const CharDarkManJacket = (p: WalkingCharProps) => {
  const c = PAL.darkJacket;
  return (
    <Wrapper {...p}>
      <Head skin={c.skin} hair={c.hair} />
      {/* Undercut */}
      <path d="M10 6 Q10 2.6 15 2.6 Q20 2.6 20 6 L19 9 Q19 5 15 5 Q11 5 11 9 Z" fill={c.hair} />
      {/* Stand-collar zip jacket */}
      <path d="M10 13 L20 13 L21.5 33 L8.5 33 Z" fill={c.jacket} stroke="hsl(210,45%,18%)" strokeWidth="0.5" />
      {/* Shadow side */}
      <path d="M15 13 L15 33" stroke={c["jacket-shadow"]} strokeWidth="0.6" />
      {/* Zipper */}
      <path d="M15 14 L15 31" stroke="hsl(0,0%,82%)" strokeWidth="0.35" strokeDasharray="0.7 0.7" />
      {/* Collar */}
      <path d="M12.5 13 Q15 11.5 17.5 13" stroke={c["jacket-shadow"]} strokeWidth="1.4" fill="none" />
      {/* Arms (long front step, rear arm back) */}
      <path d="M10 16 L6 27" stroke={c.jacket} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M20 16 L24 27" stroke={c.jacket} strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="6" cy="27" r="1.2" fill={c.skin} />
      <circle cx="24" cy="27" r="1.2" fill={c.skin} />
      <Legs pants={c.pants} shoes={c.shoes} />
    </Wrapper>
  );
};

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
}: {
  className?: string;
  flip?: boolean;
  gender?: "male" | "female";
  seed?: number;
}) => {
  if (gender === "male") {
    return <CharDarkManJacket className={className} flip={flip} />;
  }
  const Design = FEMALE_DESIGNS[seed % FEMALE_DESIGNS.length];
  return <Design className={className} flip={flip} />;
};

export default WalkingCharacter;
