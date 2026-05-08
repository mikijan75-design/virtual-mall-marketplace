export interface ImageSampleMetadata {
  id: string;
  description: string;
  canvas: {
    width: number;
    height: number;
    unit: "px";
  };
  background: string;
  coordinateOrigin: "top-left";
}

export interface PixelBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface NormalizedBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CharacterAnchorPoint {
  name: "head" | "torso" | "leftHand" | "rightHand" | "leftFoot" | "rightFoot";
  x: number;
  y: number;
}

export interface CharacterPaletteSample {
  token: string;
  hex: string;
  sampledFrom: string;
}

export interface CharacterGarment {
  layer: string;
  colorToken: string;
  description: string;
}

export interface CharacterSamplePoint {
  id: string;
  x: number;
  y: number;
  token: string;
  hex: string;
  label: string;
}

export interface CharacterMeasurement {
  name: string;
  value: number;
  unit: "px" | "ratio" | "deg";
  description: string;
}

export interface CharacterPoseAngles {
  torsoLeanDeg: number;
  frontArmDeg: number;
  backArmDeg: number;
  frontLegDeg: number;
  backLegDeg: number;
  strideLengthPx: number;
}

export interface CharacterFacialProfile {
  brow: string;
  nose: string;
  mouth: string;
  gaze: "right";
}

export interface CharacterHairDesign {
  style: "short-bob" | "soft-bob" | "long-waves" | "undercut";
  volume: "compact" | "medium" | "full";
  description: string;
}

export interface CharacterAccessory {
  name: string;
  colorToken: string;
  description: string;
}

export interface CharacterFigureProportions {
  headToBodyRatio: number;
  shoulderWidthPx: number;
  hipWidthPx: number;
  legLengthPx: number;
}

export interface CharacterVectorPath {
  id: string;
  d: string;
  fillToken?: string;
  strokeToken?: string;
  strokeWidth?: number;
  opacity?: number;
  lineCap?: "round" | "square" | "butt";
  lineJoin?: "round" | "bevel" | "miter";
}

export interface CharacterVectorEllipse {
  id: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fillToken: string;
  strokeToken?: string;
  strokeWidth?: number;
  opacity?: number;
}

export interface CharacterVectorCircle {
  id: string;
  cx: number;
  cy: number;
  r: number;
  fillToken: string;
  strokeToken?: string;
  strokeWidth?: number;
  opacity?: number;
}

export interface CharacterVectorLine {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strokeToken: string;
  strokeWidth: number;
  opacity?: number;
  lineCap?: "round" | "square" | "butt";
}

export type CharacterVectorShape =
  | ({ kind: "path" } & CharacterVectorPath)
  | ({ kind: "ellipse" } & CharacterVectorEllipse)
  | ({ kind: "circle" } & CharacterVectorCircle)
  | ({ kind: "line" } & CharacterVectorLine);

export interface CharacterIllustration {
  viewBox: {
    width: number;
    height: number;
  };
  shadow: CharacterVectorEllipse;
  backLayer: CharacterVectorShape[];
  bodyLayer: CharacterVectorShape[];
  detailLayer: CharacterVectorShape[];
  microLayer?: CharacterVectorShape[];
  annotationLayer: CharacterVectorShape[];
}

export interface WalkingCharacterSample {
  id: string;
  order: number;
  label: string;
  facing: "right";
  pose: string;
  presentation: string;
  bounds: PixelBounds;
  normalizedBounds: NormalizedBounds;
  baselineY: number;
  anchorPoints: CharacterAnchorPoint[];
  palette: CharacterPaletteSample[];
  garments: CharacterGarment[];
  samplePoints: CharacterSamplePoint[];
  measurements: CharacterMeasurement[];
  poseAngles: CharacterPoseAngles;
  facialProfile: CharacterFacialProfile;
  hair: CharacterHairDesign;
  accessories: CharacterAccessory[];
  proportions: CharacterFigureProportions;
  illustration: CharacterIllustration;
  notes: string;
}

export const walkingCharacterImageSample: ImageSampleMetadata = {
  id: "uploaded-walking-character-strip",
  description: "Four stylized full-body characters walking to the right on a white 1024x576 canvas.",
  canvas: {
    width: 1024,
    height: 576,
    unit: "px",
  },
  background: "#ffffff",
  coordinateOrigin: "top-left",
};

export const walkingCharacters: WalkingCharacterSample[] = [
  {
    id: "brunette-blue-jacket",
    order: 1,
    label: "Brunette character in blue jacket",
    facing: "right",
    pose: "Mid-stride with the forward leg extended and both arms slightly bent.",
    presentation: "feminine styling",
    bounds: { x: 100, y: 46, width: 133, height: 283 },
    normalizedBounds: { x: 0.0977, y: 0.0799, width: 0.1299, height: 0.4913 },
    baselineY: 327,
    anchorPoints: [
      { name: "head", x: 157, y: 73 },
      { name: "torso", x: 158, y: 157 },
      { name: "leftHand", x: 106, y: 204 },
      { name: "rightHand", x: 199, y: 191 },
      { name: "leftFoot", x: 128, y: 315 },
      { name: "rightFoot", x: 207, y: 314 },
    ],
    palette: [
      { token: "hair", hex: "#3b2924", sampledFrom: "short dark-brown hair" },
      { token: "skin", hex: "#d8a486", sampledFrom: "face and hands" },
      { token: "skin-shadow", hex: "#b97963", sampledFrom: "nose, ear, and knuckle shadows" },
      { token: "jacket", hex: "#315f83", sampledFrom: "blue jacket body" },
      { token: "jacket-highlight", hex: "#5f83a0", sampledFrom: "rolled cuffs and seam highlights" },
      { token: "jacket-shadow", hex: "#234968", sampledFrom: "jacket side folds and underarm shadows" },
      { token: "pants", hex: "#243f5d", sampledFrom: "dark blue trousers" },
      { token: "pants-highlight", hex: "#365a7c", sampledFrom: "raised trouser seam highlights" },
      { token: "shoes", hex: "#1b2530", sampledFrom: "black walking shoes" },
      { token: "shoe-highlight", hex: "#32404b", sampledFrom: "shoe toe and heel highlights" },
    ],
    garments: [
      { layer: "outerwear", colorToken: "jacket", description: "buttoned blue jacket with pockets and rolled cuffs" },
      { layer: "bottom", colorToken: "pants", description: "slim dark blue trousers" },
      { layer: "footwear", colorToken: "shoes", description: "black low-profile shoes" },
    ],
    samplePoints: [
      { id: "hair-crown", x: 152, y: 51, token: "hair", hex: "#3b2924", label: "dark bob crown" },
      { id: "cheek", x: 167, y: 73, token: "skin", hex: "#d8a486", label: "warm face tone" },
      { id: "jacket-panel", x: 154, y: 137, token: "jacket", hex: "#315f83", label: "main blue jacket" },
      { id: "cuff", x: 192, y: 181, token: "jacket-highlight", hex: "#5f83a0", label: "rolled cuff highlight" },
      { id: "trouser-leg", x: 166, y: 241, token: "pants", hex: "#243f5d", label: "dark trouser leg" },
      { id: "nose-shadow", x: 177, y: 74, token: "skin-shadow", hex: "#b97963", label: "profile nose shadow" },
      { id: "jacket-fold", x: 136, y: 150, token: "jacket-shadow", hex: "#234968", label: "left jacket fold" },
      { id: "pant-highlight", x: 180, y: 264, token: "pants-highlight", hex: "#365a7c", label: "trouser seam lift" },
      { id: "toe-shine", x: 206, y: 314, token: "shoe-highlight", hex: "#32404b", label: "front shoe toe shine" },
    ],
    measurements: [
      { name: "figureHeight", value: 283, unit: "px", description: "top of hair to lowest shoe pixel" },
      { name: "headHeightRatio", value: 0.18, unit: "ratio", description: "head height relative to visible figure height" },
      { name: "strideWidth", value: 79, unit: "px", description: "distance between visible shoe tips" },
      { name: "torsoLean", value: 3, unit: "deg", description: "subtle forward lean in walking pose" },
    ],
    poseAngles: {
      torsoLeanDeg: 3,
      frontArmDeg: 34,
      backArmDeg: -24,
      frontLegDeg: 26,
      backLegDeg: -18,
      strideLengthPx: 79,
    },
    facialProfile: {
      brow: "single dark curved brow over a small right-facing eye",
      nose: "small pointed profile nose extending beyond cheek line",
      mouth: "short neutral line tucked below nose",
      gaze: "right",
    },
    hair: {
      style: "short-bob",
      volume: "compact",
      description: "rounded short brunette bob with a side part and tucked back edge",
    },
    accessories: [
      { name: "rolled cuffs", colorToken: "jacket-highlight", description: "contrasting cuff bands on both sleeves" },
      { name: "jacket pockets", colorToken: "jacket-highlight", description: "small chest pocket and lower pocket seams" },
    ],
    proportions: {
      headToBodyRatio: 0.18,
      shoulderWidthPx: 46,
      hipWidthPx: 38,
      legLengthPx: 132,
    },
    illustration: {
      viewBox: { width: 120, height: 220 },
      shadow: { id: "ground-shadow", cx: 63, cy: 214, rx: 48, ry: 7, fillToken: "shadow", opacity: 0.2 },
      backLayer: [
        { kind: "path", id: "rear-hair-mass", d: "M35 38 C30 20 42 6 59 8 C76 10 84 25 77 43 C70 55 52 56 42 48 Z", fillToken: "hair", strokeToken: "outline", strokeWidth: 1.3, lineJoin: "round" },
        { kind: "path", id: "rear-arm-sleeve", d: "M45 78 C34 96 28 112 22 129", strokeToken: "jacket", strokeWidth: 9, lineCap: "round" },
        { kind: "path", id: "rear-arm-cuff", d: "M22 129 C20 134 21 138 26 140", strokeToken: "jacket-highlight", strokeWidth: 7, lineCap: "round" },
        { kind: "circle", id: "rear-hand", cx: 24, cy: 142, r: 5.5, fillToken: "skin", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "rear-leg", d: "M50 134 C45 158 39 181 31 207", strokeToken: "pants", strokeWidth: 12, lineCap: "round" },
        { kind: "path", id: "rear-shoe", d: "M22 208 C30 204 37 205 42 211 C34 216 24 216 17 213 Z", fillToken: "shoes", strokeToken: "outline", strokeWidth: 1 },
      ],
      bodyLayer: [
        { kind: "path", id: "neck", d: "M57 54 L67 56 L66 70 L55 70 Z", fillToken: "skin", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "face-profile", d: "M47 32 C48 18 59 13 70 17 C79 21 82 33 77 43 L84 47 L76 50 C74 56 69 59 62 58 C53 57 47 47 47 32 Z", fillToken: "skin", strokeToken: "outline", strokeWidth: 1.2, lineJoin: "round" },
        { kind: "path", id: "front-hair-sweep", d: "M36 38 C38 17 58 4 75 20 C68 17 54 19 48 31 C45 39 44 47 39 54 C35 49 34 44 36 38 Z", fillToken: "hair", strokeToken: "outline", strokeWidth: 1, lineJoin: "round" },
        { kind: "path", id: "jacket-body", d: "M43 68 C37 90 38 113 43 138 L76 138 C81 113 79 88 69 68 C61 64 51 64 43 68 Z", fillToken: "jacket", strokeToken: "outline", strokeWidth: 1.3, lineJoin: "round" },
        { kind: "path", id: "front-arm-sleeve", d: "M70 78 C82 92 91 104 98 116", strokeToken: "jacket", strokeWidth: 9, lineCap: "round" },
        { kind: "path", id: "front-arm-cuff", d: "M97 116 C102 120 103 126 100 130", strokeToken: "jacket-highlight", strokeWidth: 7, lineCap: "round" },
        { kind: "circle", id: "front-hand", cx: 100, cy: 132, r: 5.3, fillToken: "skin", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "front-leg", d: "M69 136 C79 155 91 181 106 202", strokeToken: "pants", strokeWidth: 12, lineCap: "round" },
        { kind: "path", id: "front-shoe", d: "M101 201 C110 199 117 202 120 208 C111 212 101 211 94 207 Z", fillToken: "shoes", strokeToken: "outline", strokeWidth: 1 },
      ],
      detailLayer: [
        { kind: "path", id: "profile-eye", d: "M70 33 L73 33", strokeToken: "eye", strokeWidth: 1.3, lineCap: "round" },
        { kind: "path", id: "profile-brow", d: "M67 29 C70 27 73 27 76 29", strokeToken: "hair", strokeWidth: 1.2, lineCap: "round" },
        { kind: "path", id: "profile-mouth", d: "M75 48 C78 49 80 48 82 47", strokeToken: "mouth", strokeWidth: 0.9, lineCap: "round" },
        { kind: "path", id: "jacket-placket", d: "M59 70 L60 137", strokeToken: "jacket-highlight", strokeWidth: 1.4, opacity: 0.85 },
        { kind: "path", id: "collar-left", d: "M47 70 L58 82 L61 70", fillToken: "jacket-highlight", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "collar-right", d: "M61 70 L67 83 L71 70", fillToken: "jacket-highlight", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "chest-pocket", d: "M47 91 L56 91 L55 103 L47 103 Z", fillToken: "jacket-highlight", strokeToken: "outline", strokeWidth: 0.7, opacity: 0.75 },
        { kind: "line", id: "lower-pocket", x1: 64, y1: 112, x2: 75, y2: 110, strokeToken: "jacket-highlight", strokeWidth: 1.2, lineCap: "round" },
      ],
      microLayer: [
        { kind: "path", id: "bob-part-line", d: "M52 15 C60 18 66 23 71 32", strokeToken: "jacket-shadow", strokeWidth: 0.8, opacity: 0.46, lineCap: "round" },
        { kind: "path", id: "bob-side-strand", d: "M43 24 C38 36 39 45 44 52", strokeToken: "jacket-shadow", strokeWidth: 0.9, opacity: 0.4, lineCap: "round" },
        { kind: "ellipse", id: "ear-shadow", cx: 56, cy: 39, rx: 2.8, ry: 4.1, fillToken: "skin-shadow", opacity: 0.45 },
        { kind: "path", id: "nose-bridge-shadow", d: "M75 37 C78 39 79 42 77 44", strokeToken: "skin-shadow", strokeWidth: 0.8, opacity: 0.48, lineCap: "round" },
        { kind: "path", id: "front-finger-1", d: "M98 130 L102 134", strokeToken: "skin-shadow", strokeWidth: 0.7, opacity: 0.7, lineCap: "round" },
        { kind: "path", id: "front-finger-2", d: "M101 130 L104 133", strokeToken: "skin-shadow", strokeWidth: 0.65, opacity: 0.62, lineCap: "round" },
        { kind: "path", id: "jacket-left-fold", d: "M49 80 C46 97 47 118 51 134", strokeToken: "jacket-shadow", strokeWidth: 1.1, opacity: 0.52, lineCap: "round" },
        { kind: "path", id: "jacket-right-fold", d: "M69 78 C74 96 74 117 70 134", strokeToken: "jacket-shadow", strokeWidth: 1, opacity: 0.45, lineCap: "round" },
        { kind: "circle", id: "button-1", cx: 60, cy: 89, r: 1.2, fillToken: "jacket-shadow", opacity: 0.82 },
        { kind: "circle", id: "button-2", cx: 60, cy: 105, r: 1.2, fillToken: "jacket-shadow", opacity: 0.82 },
        { kind: "circle", id: "button-3", cx: 60, cy: 121, r: 1.2, fillToken: "jacket-shadow", opacity: 0.82 },
        { kind: "path", id: "rear-pant-crease", d: "M48 143 C43 163 38 184 32 204", strokeToken: "pants-highlight", strokeWidth: 0.9, opacity: 0.44, lineCap: "round" },
        { kind: "path", id: "front-pant-crease", d: "M72 145 C83 166 93 185 105 201", strokeToken: "pants-highlight", strokeWidth: 0.9, opacity: 0.5, lineCap: "round" },
        { kind: "line", id: "rear-shoe-sole", x1: 17, y1: 214, x2: 42, y2: 212, strokeToken: "shoe-highlight", strokeWidth: 1, opacity: 0.78, lineCap: "round" },
        { kind: "line", id: "front-shoe-sole", x1: 94, y1: 209, x2: 119, y2: 209, strokeToken: "shoe-highlight", strokeWidth: 1, opacity: 0.78, lineCap: "round" },
      ],
      annotationLayer: [
        { kind: "line", id: "head-anchor", x1: 60, y1: 6, x2: 60, y2: 20, strokeToken: "annotation", strokeWidth: 1, opacity: 0.55, lineCap: "round" },
        { kind: "line", id: "stride-anchor", x1: 29, y1: 216, x2: 108, y2: 216, strokeToken: "annotation", strokeWidth: 1, opacity: 0.4, lineCap: "round" },
      ],
    },
    notes: "Compact silhouette with short bob haircut and a uniform navy-blue outfit.",
  },
  {
    id: "brunette-blue-dress",
    order: 2,
    label: "Brunette character in pale blue dress",
    facing: "right",
    pose: "Walking with the rear arm down, front arm forward, and dress hem moving with the stride.",
    presentation: "feminine styling",
    bounds: { x: 341, y: 47, width: 142, height: 281 },
    normalizedBounds: { x: 0.333, y: 0.0816, width: 0.1387, height: 0.4878 },
    baselineY: 327,
    anchorPoints: [
      { name: "head", x: 414, y: 76 },
      { name: "torso", x: 410, y: 162 },
      { name: "leftHand", x: 360, y: 190 },
      { name: "rightHand", x: 469, y: 181 },
      { name: "leftFoot", x: 358, y: 315 },
      { name: "rightFoot", x: 454, y: 318 },
    ],
    palette: [
      { token: "hair", hex: "#3a2b27", sampledFrom: "short brown hair" },
      { token: "skin", hex: "#d5a284", sampledFrom: "face and arms" },
      { token: "skin-shadow", hex: "#b87861", sampledFrom: "profile and finger shadows" },
      { token: "dress", hex: "#b7cdd0", sampledFrom: "pale blue dress" },
      { token: "dress-highlight", hex: "#d8e7e6", sampledFrom: "front dress highlight" },
      { token: "dress-shadow", hex: "#8ba8ae", sampledFrom: "dress hem and side folds" },
      { token: "pocket", hex: "#8faeb3", sampledFrom: "small chest pocket" },
      { token: "shoes", hex: "#1c2530", sampledFrom: "black flats" },
      { token: "shoe-highlight", hex: "#303d48", sampledFrom: "shoe top highlights" },
    ],
    garments: [
      { layer: "dress", colorToken: "dress", description: "short-sleeve pale blue A-line dress" },
      { layer: "detail", colorToken: "pocket", description: "small left chest pocket" },
      { layer: "footwear", colorToken: "shoes", description: "black flat walking shoes" },
    ],
    samplePoints: [
      { id: "hair-crown", x: 406, y: 51, token: "hair", hex: "#3a2b27", label: "soft brown bob" },
      { id: "forearm", x: 468, y: 174, token: "skin", hex: "#d5a284", label: "exposed arm" },
      { id: "dress-body", x: 410, y: 161, token: "dress", hex: "#b7cdd0", label: "pale dress body" },
      { id: "dress-highlight", x: 419, y: 215, token: "dress-highlight", hex: "#d8e7e6", label: "front dress highlight" },
      { id: "dress-pocket", x: 424, y: 123, token: "pocket", hex: "#8faeb3", label: "chest pocket" },
      { id: "cheek-shadow", x: 426, y: 78, token: "skin-shadow", hex: "#b87861", label: "cheek and nose edge" },
      { id: "hem-shadow", x: 386, y: 252, token: "dress-shadow", hex: "#8ba8ae", label: "left hem shadow" },
      { id: "side-fold", x: 445, y: 213, token: "dress-shadow", hex: "#8ba8ae", label: "right dress fold" },
      { id: "shoe-top", x: 454, y: 318, token: "shoe-highlight", hex: "#303d48", label: "front shoe highlight" },
    ],
    measurements: [
      { name: "figureHeight", value: 281, unit: "px", description: "top of hair to lowest shoe pixel" },
      { name: "dressHemWidth", value: 91, unit: "px", description: "approximate width across the moving A-line hem" },
      { name: "strideWidth", value: 96, unit: "px", description: "distance between visible shoe tips" },
      { name: "torsoLean", value: 2, unit: "deg", description: "nearly upright walk with a light forward lean" },
    ],
    poseAngles: {
      torsoLeanDeg: 2,
      frontArmDeg: 28,
      backArmDeg: -20,
      frontLegDeg: 22,
      backLegDeg: -20,
      strideLengthPx: 96,
    },
    facialProfile: {
      brow: "soft single brow following the profile forehead",
      nose: "small rounded nose with a short bridge",
      mouth: "tiny neutral mouth stroke",
      gaze: "right",
    },
    hair: {
      style: "soft-bob",
      volume: "medium",
      description: "rounded brown bob with a raised back curve and tucked ends",
    },
    accessories: [
      { name: "dress pocket", colorToken: "pocket", description: "small blue-gray pocket on the left chest" },
      { name: "swinging hem", colorToken: "dress-highlight", description: "light center panel showing the fabric flare" },
    ],
    proportions: {
      headToBodyRatio: 0.18,
      shoulderWidthPx: 42,
      hipWidthPx: 58,
      legLengthPx: 119,
    },
    illustration: {
      viewBox: { width: 128, height: 220 },
      shadow: { id: "ground-shadow", cx: 64, cy: 214, rx: 50, ry: 7, fillToken: "shadow", opacity: 0.18 },
      backLayer: [
        { kind: "path", id: "rear-hair-mass", d: "M43 39 C39 20 51 7 68 9 C84 12 90 26 83 42 C76 52 59 55 48 48 Z", fillToken: "hair", strokeToken: "outline", strokeWidth: 1.2, lineJoin: "round" },
        { kind: "path", id: "rear-arm", d: "M48 78 C39 98 33 114 28 131", strokeToken: "skin", strokeWidth: 7.5, lineCap: "round" },
        { kind: "circle", id: "rear-hand", cx: 27, cy: 134, r: 5.2, fillToken: "skin", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "rear-leg", d: "M55 151 C49 169 43 189 35 207", strokeToken: "skin", strokeWidth: 8, lineCap: "round" },
        { kind: "path", id: "rear-shoe", d: "M26 208 C35 204 43 205 48 211 C39 216 29 216 22 213 Z", fillToken: "shoes", strokeToken: "outline", strokeWidth: 1 },
      ],
      bodyLayer: [
        { kind: "path", id: "neck", d: "M61 54 L71 56 L70 70 L59 70 Z", fillToken: "skin", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "face-profile", d: "M52 32 C53 18 64 13 75 17 C84 21 87 33 82 43 L89 47 L81 50 C79 56 74 59 67 58 C58 57 52 47 52 32 Z", fillToken: "skin", strokeToken: "outline", strokeWidth: 1.2, lineJoin: "round" },
        { kind: "path", id: "front-hair-sweep", d: "M42 39 C45 18 63 6 80 19 C73 18 60 20 53 31 C49 39 48 46 43 53 C40 49 40 44 42 39 Z", fillToken: "hair", strokeToken: "outline", strokeWidth: 1, lineJoin: "round" },
        { kind: "path", id: "dress-body", d: "M46 70 C40 98 41 123 31 157 C48 168 82 168 101 157 C88 124 88 96 79 70 C70 66 55 66 46 70 Z", fillToken: "dress", strokeToken: "outline", strokeWidth: 1.3, lineJoin: "round" },
        { kind: "path", id: "front-arm", d: "M78 78 C91 93 101 106 111 119", strokeToken: "skin", strokeWidth: 7.5, lineCap: "round" },
        { kind: "circle", id: "front-hand", cx: 113, cy: 121, r: 5.2, fillToken: "skin", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "front-leg", d: "M80 151 C90 169 100 188 112 207", strokeToken: "skin", strokeWidth: 8, lineCap: "round" },
        { kind: "path", id: "front-shoe", d: "M106 207 C115 204 123 206 127 212 C118 216 108 216 101 212 Z", fillToken: "shoes", strokeToken: "outline", strokeWidth: 1 },
      ],
      detailLayer: [
        { kind: "path", id: "profile-eye", d: "M75 33 L78 33", strokeToken: "eye", strokeWidth: 1.3, lineCap: "round" },
        { kind: "path", id: "profile-brow", d: "M72 29 C75 27 78 27 81 29", strokeToken: "hair", strokeWidth: 1.2, lineCap: "round" },
        { kind: "path", id: "profile-mouth", d: "M80 48 C83 49 85 48 87 47", strokeToken: "mouth", strokeWidth: 0.9, lineCap: "round" },
        { kind: "path", id: "dress-center-highlight", d: "M60 74 C58 100 57 127 49 154 C61 160 77 160 90 154 C82 127 79 99 74 74 Z", fillToken: "dress-highlight", opacity: 0.65 },
        { kind: "path", id: "neckline", d: "M51 72 C60 82 70 82 78 72", strokeToken: "pocket", strokeWidth: 1.4, lineCap: "round" },
        { kind: "path", id: "chest-pocket", d: "M70 88 L80 88 L79 100 L70 100 Z", fillToken: "pocket", strokeToken: "outline", strokeWidth: 0.7, opacity: 0.85 },
        { kind: "line", id: "hem-line", x1: 34, y1: 157, x2: 98, y2: 157, strokeToken: "pocket", strokeWidth: 1.1, opacity: 0.6, lineCap: "round" },
      ],
      microLayer: [
        { kind: "path", id: "bob-part-line", d: "M58 15 C67 18 74 25 79 36", strokeToken: "dress-shadow", strokeWidth: 0.8, opacity: 0.42, lineCap: "round" },
        { kind: "path", id: "bob-lower-curve", d: "M45 46 C55 57 72 58 82 47", strokeToken: "dress-shadow", strokeWidth: 0.85, opacity: 0.4, lineCap: "round" },
        { kind: "ellipse", id: "ear-shadow", cx: 61, cy: 39, rx: 2.6, ry: 4, fillToken: "skin-shadow", opacity: 0.45 },
        { kind: "path", id: "nose-cheek-shadow", d: "M80 38 C83 41 82 45 79 48", strokeToken: "skin-shadow", strokeWidth: 0.75, opacity: 0.5, lineCap: "round" },
        { kind: "path", id: "front-finger-1", d: "M112 121 L116 124", strokeToken: "skin-shadow", strokeWidth: 0.65, opacity: 0.7, lineCap: "round" },
        { kind: "path", id: "rear-finger-1", d: "M25 134 L30 136", strokeToken: "skin-shadow", strokeWidth: 0.65, opacity: 0.65, lineCap: "round" },
        { kind: "path", id: "left-dress-fold", d: "M48 84 C45 110 41 134 35 154", strokeToken: "dress-shadow", strokeWidth: 0.95, opacity: 0.48, lineCap: "round" },
        { kind: "path", id: "center-dress-fold", d: "M64 82 C63 109 62 134 61 158", strokeToken: "white", strokeWidth: 0.75, opacity: 0.58, lineCap: "round" },
        { kind: "path", id: "right-dress-fold", d: "M80 84 C86 112 91 135 97 154", strokeToken: "dress-shadow", strokeWidth: 0.95, opacity: 0.42, lineCap: "round" },
        { kind: "path", id: "short-sleeve-left", d: "M45 72 C39 75 37 82 40 88", strokeToken: "dress-shadow", strokeWidth: 1.2, opacity: 0.55, lineCap: "round" },
        { kind: "path", id: "short-sleeve-right", d: "M79 72 C86 77 89 82 91 88", strokeToken: "dress-shadow", strokeWidth: 1.2, opacity: 0.5, lineCap: "round" },
        { kind: "line", id: "rear-shoe-sole", x1: 22, y1: 214, x2: 48, y2: 212, strokeToken: "shoe-highlight", strokeWidth: 1, opacity: 0.75, lineCap: "round" },
        { kind: "line", id: "front-shoe-sole", x1: 101, y1: 213, x2: 127, y2: 213, strokeToken: "shoe-highlight", strokeWidth: 1, opacity: 0.75, lineCap: "round" },
      ],
      annotationLayer: [
        { kind: "line", id: "hem-width", x1: 31, y1: 164, x2: 101, y2: 164, strokeToken: "annotation", strokeWidth: 1, opacity: 0.38, lineCap: "round" },
        { kind: "line", id: "stride-anchor", x1: 35, y1: 216, x2: 113, y2: 216, strokeToken: "annotation", strokeWidth: 1, opacity: 0.38, lineCap: "round" },
      ],
    },
    notes: "Lightest outfit in the set, with a soft blue-gray palette and simple dress shape.",
  },
  {
    id: "blonde-white-top-jeans",
    order: 3,
    label: "Blonde character in white top and jeans",
    facing: "right",
    pose: "Long-stride walk with loose hair, bent elbows, and the front foot about to land.",
    presentation: "feminine styling",
    bounds: { x: 593, y: 47, width: 148, height: 281 },
    normalizedBounds: { x: 0.5791, y: 0.0816, width: 0.1445, height: 0.4878 },
    baselineY: 328,
    anchorPoints: [
      { name: "head", x: 661, y: 74 },
      { name: "torso", x: 657, y: 160 },
      { name: "leftHand", x: 603, y: 188 },
      { name: "rightHand", x: 728, y: 183 },
      { name: "leftFoot", x: 609, y: 315 },
      { name: "rightFoot", x: 703, y: 319 },
    ],
    palette: [
      { token: "hair-shadow", hex: "#c68a2f", sampledFrom: "golden hair shadows" },
      { token: "hair-highlight", hex: "#e6b35a", sampledFrom: "wavy blonde hair highlights" },
      { token: "hair-line", hex: "#9d6624", sampledFrom: "thin darker separations between blonde waves" },
      { token: "skin", hex: "#d7a37f", sampledFrom: "face and arms" },
      { token: "skin-shadow", hex: "#b7775f", sampledFrom: "nose, elbow, and hand shadows" },
      { token: "top", hex: "#f6f1e8", sampledFrom: "white sleeveless top" },
      { token: "top-shadow", hex: "#d8d2c8", sampledFrom: "ribbed top side shadows" },
      { token: "jeans", hex: "#243f61", sampledFrom: "dark blue denim" },
      { token: "jeans-highlight", hex: "#3d5f84", sampledFrom: "denim seam and cuff highlights" },
      { token: "belt", hex: "#6b4931", sampledFrom: "brown belt" },
      { token: "shoes", hex: "#202934", sampledFrom: "black shoes" },
      { token: "shoe-highlight", hex: "#394653", sampledFrom: "shoe edge highlights" },
    ],
    garments: [
      { layer: "top", colorToken: "top", description: "white sleeveless top with light vertical texture" },
      { layer: "bottom", colorToken: "jeans", description: "dark slim jeans cuffed above the ankle" },
      { layer: "accessory", colorToken: "belt", description: "brown belt and wrist jewelry" },
      { layer: "footwear", colorToken: "shoes", description: "black low-profile shoes" },
    ],
    samplePoints: [
      { id: "hair-shadow", x: 649, y: 61, token: "hair-shadow", hex: "#c68a2f", label: "golden hair shadow" },
      { id: "hair-highlight", x: 668, y: 91, token: "hair-highlight", hex: "#e6b35a", label: "wavy hair highlight" },
      { id: "top-center", x: 659, y: 151, token: "top", hex: "#f6f1e8", label: "white top" },
      { id: "jeans-leg", x: 675, y: 239, token: "jeans", hex: "#243f61", label: "dark denim" },
      { id: "belt", x: 657, y: 182, token: "belt", hex: "#6b4931", label: "brown belt" },
      { id: "wave-line", x: 679, y: 116, token: "hair-line", hex: "#9d6624", label: "thin hair wave line" },
      { id: "elbow-shadow", x: 606, y: 185, token: "skin-shadow", hex: "#b7775f", label: "rear elbow shadow" },
      { id: "top-rib", x: 650, y: 139, token: "top-shadow", hex: "#d8d2c8", label: "ribbed top shadow" },
      { id: "denim-cuff", x: 690, y: 301, token: "jeans-highlight", hex: "#3d5f84", label: "rolled denim cuff" },
      { id: "shoe-edge", x: 704, y: 319, token: "shoe-highlight", hex: "#394653", label: "shoe edge" },
    ],
    measurements: [
      { name: "figureHeight", value: 281, unit: "px", description: "top of hair to lowest shoe pixel" },
      { name: "hairFall", value: 121, unit: "px", description: "approximate vertical fall of the longest hair locks" },
      { name: "strideWidth", value: 94, unit: "px", description: "distance between visible shoe tips" },
      { name: "torsoLean", value: 5, unit: "deg", description: "forward energy in the long-stride pose" },
    ],
    poseAngles: {
      torsoLeanDeg: 5,
      frontArmDeg: 30,
      backArmDeg: -32,
      frontLegDeg: 24,
      backLegDeg: -24,
      strideLengthPx: 94,
    },
    facialProfile: {
      brow: "light brown brow placed below the flowing hairline",
      nose: "defined profile nose with a small rounded tip",
      mouth: "subtle relaxed mouth mark",
      gaze: "right",
    },
    hair: {
      style: "long-waves",
      volume: "full",
      description: "layered blonde waves flowing past the shoulders with alternating shadow and highlight locks",
    },
    accessories: [
      { name: "bracelets", colorToken: "top", description: "light wrist jewelry on both arms" },
      { name: "belt", colorToken: "belt", description: "brown waist belt separating top and jeans" },
      { name: "rolled cuffs", colorToken: "jeans", description: "short ankle cuffs at the bottom of the jeans" },
    ],
    proportions: {
      headToBodyRatio: 0.17,
      shoulderWidthPx: 44,
      hipWidthPx: 42,
      legLengthPx: 130,
    },
    illustration: {
      viewBox: { width: 132, height: 220 },
      shadow: { id: "ground-shadow", cx: 65, cy: 214, rx: 52, ry: 7, fillToken: "shadow", opacity: 0.2 },
      backLayer: [
        { kind: "path", id: "hair-back-main", d: "M38 37 C32 20 45 5 63 8 C85 11 94 32 86 57 C82 76 96 93 84 116 C78 131 56 126 52 106 C48 85 33 67 38 37 Z", fillToken: "hair-shadow", strokeToken: "outline", strokeWidth: 1.1, lineJoin: "round" },
        { kind: "path", id: "hair-left-wave", d: "M43 42 C31 61 41 79 34 101 C31 111 24 119 28 129", strokeToken: "hair-shadow", strokeWidth: 10, opacity: 0.9, lineCap: "round" },
        { kind: "path", id: "hair-center-wave", d: "M58 31 C50 54 62 74 55 100 C52 112 50 122 56 134", strokeToken: "hair-highlight", strokeWidth: 8, opacity: 0.9, lineCap: "round" },
        { kind: "path", id: "hair-right-wave", d: "M78 35 C92 54 82 76 94 96 C101 108 94 120 98 131", strokeToken: "hair-highlight", strokeWidth: 9, opacity: 0.88, lineCap: "round" },
        { kind: "path", id: "rear-arm", d: "M47 78 C37 95 31 110 23 126", strokeToken: "skin", strokeWidth: 7.5, lineCap: "round" },
        { kind: "circle", id: "rear-bracelet", cx: 24, cy: 126, r: 6.5, fillToken: "top", strokeToken: "outline", strokeWidth: 0.7 },
        { kind: "circle", id: "rear-hand", cx: 23, cy: 133, r: 5.2, fillToken: "skin", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "rear-leg", d: "M52 139 C45 160 38 184 28 207", strokeToken: "jeans", strokeWidth: 12, lineCap: "round" },
        { kind: "path", id: "rear-shoe", d: "M19 208 C28 204 36 205 42 211 C33 216 22 216 16 213 Z", fillToken: "shoes", strokeToken: "outline", strokeWidth: 1 },
      ],
      bodyLayer: [
        { kind: "path", id: "neck", d: "M59 54 L70 56 L69 70 L58 70 Z", fillToken: "skin", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "face-profile", d: "M51 32 C52 18 63 13 74 17 C83 21 86 33 81 43 L88 47 L80 50 C78 56 73 59 66 58 C57 57 51 47 51 32 Z", fillToken: "skin", strokeToken: "outline", strokeWidth: 1.2, lineJoin: "round" },
        { kind: "path", id: "front-hair-crown", d: "M39 39 C42 17 62 5 80 19 C72 17 60 20 52 31 C48 39 47 47 42 55 C38 51 37 45 39 39 Z", fillToken: "hair-highlight", strokeToken: "outline", strokeWidth: 1, lineJoin: "round" },
        { kind: "path", id: "top-body", d: "M45 69 C38 89 42 112 50 126 L78 126 C84 108 84 88 78 69 C69 65 55 65 45 69 Z", fillToken: "top", strokeToken: "outline", strokeWidth: 1.2, lineJoin: "round" },
        { kind: "path", id: "waist-belt", d: "M49 125 L80 125 L80 134 L49 134 Z", fillToken: "belt", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "front-arm", d: "M77 78 C91 92 103 105 114 120", strokeToken: "skin", strokeWidth: 7.5, lineCap: "round" },
        { kind: "circle", id: "front-bracelet", cx: 113, cy: 120, r: 6.4, fillToken: "top", strokeToken: "outline", strokeWidth: 0.7 },
        { kind: "circle", id: "front-hand", cx: 116, cy: 126, r: 5.2, fillToken: "skin", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "front-leg", d: "M74 133 C85 154 96 181 111 204", strokeToken: "jeans", strokeWidth: 12, lineCap: "round" },
        { kind: "path", id: "front-shoe", d: "M105 204 C115 201 123 204 128 210 C119 215 108 214 101 210 Z", fillToken: "shoes", strokeToken: "outline", strokeWidth: 1 },
      ],
      detailLayer: [
        { kind: "path", id: "profile-eye", d: "M74 33 L77 33", strokeToken: "eye", strokeWidth: 1.3, lineCap: "round" },
        { kind: "path", id: "profile-brow", d: "M71 29 C74 27 77 27 80 29", strokeToken: "hair-shadow", strokeWidth: 1.2, lineCap: "round" },
        { kind: "path", id: "profile-mouth", d: "M79 48 C82 49 84 48 86 47", strokeToken: "mouth", strokeWidth: 0.9, lineCap: "round" },
        { kind: "line", id: "top-texture-1", x1: 56, y1: 76, x2: 55, y2: 121, strokeToken: "outline", strokeWidth: 0.6, opacity: 0.25, lineCap: "round" },
        { kind: "line", id: "top-texture-2", x1: 66, y1: 74, x2: 67, y2: 121, strokeToken: "outline", strokeWidth: 0.6, opacity: 0.22, lineCap: "round" },
        { kind: "line", id: "jean-seam-left", x1: 48, y1: 139, x2: 31, y2: 202, strokeToken: "outline", strokeWidth: 0.8, opacity: 0.25, lineCap: "round" },
        { kind: "line", id: "jean-seam-right", x1: 76, y1: 139, x2: 108, y2: 202, strokeToken: "outline", strokeWidth: 0.8, opacity: 0.25, lineCap: "round" },
        { kind: "line", id: "belt-buckle", x1: 62, y1: 126, x2: 67, y2: 132, strokeToken: "top", strokeWidth: 1.1, opacity: 0.9 },
      ],
      microLayer: [
        { kind: "path", id: "front-bang-line", d: "M52 20 C62 28 67 37 65 52", strokeToken: "hair-line", strokeWidth: 0.9, opacity: 0.56, lineCap: "round" },
        { kind: "path", id: "left-wave-line-1", d: "M37 46 C48 62 39 84 45 103", strokeToken: "hair-line", strokeWidth: 0.9, opacity: 0.52, lineCap: "round" },
        { kind: "path", id: "center-wave-line-1", d: "M61 34 C70 54 59 78 66 102 C70 114 65 124 68 133", strokeToken: "hair-line", strokeWidth: 0.9, opacity: 0.5, lineCap: "round" },
        { kind: "path", id: "right-wave-line-1", d: "M82 42 C76 61 91 80 88 101 C86 115 91 124 88 132", strokeToken: "hair-line", strokeWidth: 0.9, opacity: 0.54, lineCap: "round" },
        { kind: "ellipse", id: "ear-shadow", cx: 60, cy: 39, rx: 2.6, ry: 4, fillToken: "skin-shadow", opacity: 0.42 },
        { kind: "path", id: "nose-cheek-shadow", d: "M79 38 C82 41 82 45 79 48", strokeToken: "skin-shadow", strokeWidth: 0.75, opacity: 0.5, lineCap: "round" },
        { kind: "path", id: "rear-finger-1", d: "M20 133 L25 136", strokeToken: "skin-shadow", strokeWidth: 0.65, opacity: 0.68, lineCap: "round" },
        { kind: "path", id: "front-finger-1", d: "M115 126 L119 129", strokeToken: "skin-shadow", strokeWidth: 0.65, opacity: 0.68, lineCap: "round" },
        { kind: "line", id: "top-rib-1", x1: 50, y1: 76, x2: 50, y2: 121, strokeToken: "top-shadow", strokeWidth: 0.7, opacity: 0.55, lineCap: "round" },
        { kind: "line", id: "top-rib-2", x1: 61, y1: 73, x2: 61, y2: 122, strokeToken: "top-shadow", strokeWidth: 0.7, opacity: 0.62, lineCap: "round" },
        { kind: "line", id: "top-rib-3", x1: 73, y1: 76, x2: 74, y2: 120, strokeToken: "top-shadow", strokeWidth: 0.7, opacity: 0.52, lineCap: "round" },
        { kind: "line", id: "belt-hole-1", x1: 53, y1: 129, x2: 54, y2: 129, strokeToken: "outline", strokeWidth: 1.2, opacity: 0.58, lineCap: "round" },
        { kind: "line", id: "belt-hole-2", x1: 73, y1: 129, x2: 74, y2: 129, strokeToken: "outline", strokeWidth: 1.2, opacity: 0.58, lineCap: "round" },
        { kind: "line", id: "rear-cuff", x1: 24, y1: 198, x2: 35, y2: 202, strokeToken: "jeans-highlight", strokeWidth: 2, opacity: 0.6, lineCap: "round" },
        { kind: "line", id: "front-cuff", x1: 101, y1: 197, x2: 114, y2: 202, strokeToken: "jeans-highlight", strokeWidth: 2, opacity: 0.6, lineCap: "round" },
        { kind: "line", id: "rear-shoe-sole", x1: 16, y1: 214, x2: 42, y2: 212, strokeToken: "shoe-highlight", strokeWidth: 1, opacity: 0.78, lineCap: "round" },
        { kind: "line", id: "front-shoe-sole", x1: 101, y1: 211, x2: 128, y2: 211, strokeToken: "shoe-highlight", strokeWidth: 1, opacity: 0.78, lineCap: "round" },
      ],
      annotationLayer: [
        { kind: "line", id: "hair-fall", x1: 30, y1: 36, x2: 30, y2: 129, strokeToken: "annotation", strokeWidth: 1, opacity: 0.4, lineCap: "round" },
        { kind: "line", id: "stride-anchor", x1: 28, y1: 216, x2: 112, y2: 216, strokeToken: "annotation", strokeWidth: 1, opacity: 0.38, lineCap: "round" },
      ],
    },
    notes: "Most visually detailed figure because of the long wavy blonde hair and wrist accessories.",
  },
  {
    id: "dark-haired-blue-jacket",
    order: 4,
    label: "Dark-haired character in blue jacket",
    facing: "right",
    pose: "Upright walking pose with a long front step and the rear arm hanging back.",
    presentation: "masculine styling",
    bounds: { x: 850, y: 46, width: 112, height: 282 },
    normalizedBounds: { x: 0.8301, y: 0.0799, width: 0.1094, height: 0.4896 },
    baselineY: 328,
    anchorPoints: [
      { name: "head", x: 901, y: 72 },
      { name: "torso", x: 902, y: 157 },
      { name: "leftHand", x: 862, y: 199 },
      { name: "rightHand", x: 948, y: 185 },
      { name: "leftFoot", x: 862, y: 315 },
      { name: "rightFoot", x: 944, y: 318 },
    ],
    palette: [
      { token: "hair", hex: "#1d1d1b", sampledFrom: "black undercut hair" },
      { token: "skin", hex: "#d6a17f", sampledFrom: "face and hands" },
      { token: "skin-shadow", hex: "#b7775e", sampledFrom: "profile and knuckle shadows" },
      { token: "jacket", hex: "#2e5f89", sampledFrom: "blue zip jacket" },
      { token: "jacket-shadow", hex: "#244d73", sampledFrom: "jacket side shadows" },
      { token: "jacket-highlight", hex: "#477da8", sampledFrom: "zipper edge and shoulder highlights" },
      { token: "pants", hex: "#263f5d", sampledFrom: "dark blue trousers" },
      { token: "pants-highlight", hex: "#385a7c", sampledFrom: "trouser seam highlights" },
      { token: "shoes", hex: "#15202a", sampledFrom: "black shoes" },
      { token: "shoe-highlight", hex: "#303b46", sampledFrom: "shoe upper highlights" },
    ],
    garments: [
      { layer: "outerwear", colorToken: "jacket", description: "blue stand-collar jacket with zipper and side pockets" },
      { layer: "bottom", colorToken: "pants", description: "dark tapered trousers" },
      { layer: "footwear", colorToken: "shoes", description: "black walking shoes" },
    ],
    samplePoints: [
      { id: "hair-top", x: 899, y: 49, token: "hair", hex: "#1d1d1b", label: "black undercut hair" },
      { id: "face", x: 913, y: 76, token: "skin", hex: "#d6a17f", label: "face and hand skin" },
      { id: "jacket-front", x: 902, y: 144, token: "jacket", hex: "#2e5f89", label: "blue jacket front" },
      { id: "jacket-side", x: 889, y: 151, token: "jacket-shadow", hex: "#244d73", label: "jacket side shadow" },
      { id: "pants", x: 910, y: 237, token: "pants", hex: "#263f5d", label: "dark trouser leg" },
      { id: "nose-edge", x: 919, y: 73, token: "skin-shadow", hex: "#b7775e", label: "straight nose edge" },
      { id: "shoulder-highlight", x: 906, y: 102, token: "jacket-highlight", hex: "#477da8", label: "jacket shoulder light" },
      { id: "pant-crease", x: 927, y: 270, token: "pants-highlight", hex: "#385a7c", label: "front pant crease" },
      { id: "shoe-shine", x: 944, y: 318, token: "shoe-highlight", hex: "#303b46", label: "shoe upper highlight" },
    ],
    measurements: [
      { name: "figureHeight", value: 282, unit: "px", description: "top of hair to lowest shoe pixel" },
      { name: "shoulderToHipTaper", value: 0.78, unit: "ratio", description: "narrower hip width compared with shoulders" },
      { name: "strideWidth", value: 82, unit: "px", description: "distance between visible shoe tips" },
      { name: "torsoLean", value: 1, unit: "deg", description: "upright stride with minimal lean" },
    ],
    poseAngles: {
      torsoLeanDeg: 1,
      frontArmDeg: 30,
      backArmDeg: -16,
      frontLegDeg: 27,
      backLegDeg: -15,
      strideLengthPx: 82,
    },
    facialProfile: {
      brow: "sharp dark brow under the undercut fringe",
      nose: "straight narrow profile nose",
      mouth: "short closed mouth line",
      gaze: "right",
    },
    hair: {
      style: "undercut",
      volume: "compact",
      description: "black undercut with a raised textured top and close sides",
    },
    accessories: [
      { name: "zipper", colorToken: "jacket-shadow", description: "vertical zipper line through the jacket front" },
      { name: "stand collar", colorToken: "jacket", description: "high collar framing the neck" },
      { name: "pocket seams", colorToken: "jacket-shadow", description: "horizontal side pocket seams on the jacket" },
    ],
    proportions: {
      headToBodyRatio: 0.18,
      shoulderWidthPx: 45,
      hipWidthPx: 35,
      legLengthPx: 135,
    },
    illustration: {
      viewBox: { width: 112, height: 220 },
      shadow: { id: "ground-shadow", cx: 58, cy: 214, rx: 44, ry: 7, fillToken: "shadow", opacity: 0.2 },
      backLayer: [
        { kind: "path", id: "rear-arm-sleeve", d: "M44 78 C35 98 31 114 26 131", strokeToken: "jacket-shadow", strokeWidth: 9, lineCap: "round" },
        { kind: "circle", id: "rear-hand", cx: 25, cy: 137, r: 5.3, fillToken: "skin", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "rear-leg", d: "M49 136 C44 159 39 183 32 207", strokeToken: "pants", strokeWidth: 12, lineCap: "round" },
        { kind: "path", id: "rear-shoe", d: "M23 208 C31 204 39 205 44 211 C35 216 25 216 18 213 Z", fillToken: "shoes", strokeToken: "outline", strokeWidth: 1 },
      ],
      bodyLayer: [
        { kind: "path", id: "neck", d: "M53 54 L64 56 L63 70 L52 70 Z", fillToken: "skin", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "face-profile", d: "M45 32 C46 18 57 13 68 17 C77 21 80 33 75 43 L82 47 L74 50 C72 56 67 59 60 58 C51 57 45 47 45 32 Z", fillToken: "skin", strokeToken: "outline", strokeWidth: 1.2, lineJoin: "round" },
        { kind: "path", id: "undercut-side", d: "M45 33 C46 22 55 15 67 16 C64 26 55 31 45 33 Z", fillToken: "jacket-shadow", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "undercut-top", d: "M44 28 C50 11 70 10 78 22 C68 18 58 20 49 30 Z", fillToken: "hair", strokeToken: "outline", strokeWidth: 1, lineJoin: "round" },
        { kind: "path", id: "jacket-body", d: "M39 68 C35 91 37 116 43 139 L72 139 C78 116 78 91 71 68 C62 64 48 64 39 68 Z", fillToken: "jacket", strokeToken: "outline", strokeWidth: 1.3, lineJoin: "round" },
        { kind: "path", id: "jacket-side-shadow", d: "M40 70 C36 92 39 116 44 137 L54 137 C49 114 49 90 53 67 C48 67 44 68 40 70 Z", fillToken: "jacket-shadow", opacity: 0.72 },
        { kind: "path", id: "front-arm-sleeve", d: "M70 78 C82 92 91 104 99 118", strokeToken: "jacket", strokeWidth: 9, lineCap: "round" },
        { kind: "circle", id: "front-hand", cx: 101, cy: 123, r: 5.3, fillToken: "skin", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "front-leg", d: "M67 137 C77 157 87 183 101 205", strokeToken: "pants", strokeWidth: 12, lineCap: "round" },
        { kind: "path", id: "front-shoe", d: "M95 205 C104 202 111 204 114 210 C105 214 96 214 89 210 Z", fillToken: "shoes", strokeToken: "outline", strokeWidth: 1 },
      ],
      detailLayer: [
        { kind: "path", id: "profile-eye", d: "M68 33 L71 33", strokeToken: "eye", strokeWidth: 1.3, lineCap: "round" },
        { kind: "path", id: "profile-brow", d: "M65 29 C68 27 71 27 74 29", strokeToken: "hair", strokeWidth: 1.2, lineCap: "round" },
        { kind: "path", id: "profile-mouth", d: "M73 48 C76 49 78 48 80 47", strokeToken: "mouth", strokeWidth: 0.9, lineCap: "round" },
        { kind: "path", id: "stand-collar-left", d: "M43 69 L55 83 L56 68", fillToken: "jacket-shadow", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "path", id: "stand-collar-right", d: "M56 68 L67 83 L70 69", fillToken: "jacket", strokeToken: "outline", strokeWidth: 0.8 },
        { kind: "line", id: "zipper", x1: 57, y1: 71, x2: 58, y2: 138, strokeToken: "outline", strokeWidth: 1.1, opacity: 0.45, lineCap: "round" },
        { kind: "line", id: "left-pocket", x1: 43, y1: 111, x2: 54, y2: 110, strokeToken: "jacket-shadow", strokeWidth: 1.2, lineCap: "round" },
        { kind: "line", id: "right-pocket", x1: 61, y1: 111, x2: 72, y2: 110, strokeToken: "jacket-shadow", strokeWidth: 1.2, lineCap: "round" },
      ],
      microLayer: [
        { kind: "path", id: "undercut-strand-1", d: "M50 19 C57 16 65 16 72 20", strokeToken: "jacket-shadow", strokeWidth: 0.9, opacity: 0.7, lineCap: "round" },
        { kind: "path", id: "undercut-strand-2", d: "M46 25 C55 23 64 24 75 28", strokeToken: "jacket-shadow", strokeWidth: 0.8, opacity: 0.58, lineCap: "round" },
        { kind: "ellipse", id: "ear-shadow", cx: 54, cy: 39, rx: 2.5, ry: 3.8, fillToken: "skin-shadow", opacity: 0.42 },
        { kind: "path", id: "nose-cheek-shadow", d: "M73 38 C76 41 76 45 73 48", strokeToken: "skin-shadow", strokeWidth: 0.75, opacity: 0.52, lineCap: "round" },
        { kind: "path", id: "front-finger-1", d: "M100 123 L104 126", strokeToken: "skin-shadow", strokeWidth: 0.65, opacity: 0.7, lineCap: "round" },
        { kind: "path", id: "rear-finger-1", d: "M22 137 L27 139", strokeToken: "skin-shadow", strokeWidth: 0.65, opacity: 0.65, lineCap: "round" },
        { kind: "line", id: "shoulder-highlight", x1: 46, y1: 70, x2: 70, y2: 70, strokeToken: "jacket-highlight", strokeWidth: 1.1, opacity: 0.6, lineCap: "round" },
        { kind: "line", id: "zipper-highlight", x1: 60, y1: 72, x2: 60, y2: 137, strokeToken: "jacket-highlight", strokeWidth: 0.8, opacity: 0.74, lineCap: "round" },
        { kind: "line", id: "left-front-fold", x1: 49, y1: 82, x2: 48, y2: 135, strokeToken: "jacket-highlight", strokeWidth: 0.75, opacity: 0.4, lineCap: "round" },
        { kind: "line", id: "right-front-fold", x1: 67, y1: 83, x2: 69, y2: 135, strokeToken: "jacket-shadow", strokeWidth: 0.85, opacity: 0.46, lineCap: "round" },
        { kind: "line", id: "rear-pant-crease", x1: 48, y1: 144, x2: 33, y2: 205, strokeToken: "pants-highlight", strokeWidth: 0.85, opacity: 0.43, lineCap: "round" },
        { kind: "line", id: "front-pant-crease", x1: 70, y1: 145, x2: 100, y2: 204, strokeToken: "pants-highlight", strokeWidth: 0.85, opacity: 0.5, lineCap: "round" },
        { kind: "line", id: "rear-shoe-sole", x1: 18, y1: 214, x2: 44, y2: 212, strokeToken: "shoe-highlight", strokeWidth: 1, opacity: 0.78, lineCap: "round" },
        { kind: "line", id: "front-shoe-sole", x1: 89, y1: 211, x2: 114, y2: 211, strokeToken: "shoe-highlight", strokeWidth: 1, opacity: 0.78, lineCap: "round" },
      ],
      annotationLayer: [
        { kind: "line", id: "upright-axis", x1: 57, y1: 18, x2: 57, y2: 139, strokeToken: "annotation", strokeWidth: 1, opacity: 0.32, lineCap: "round" },
        { kind: "line", id: "stride-anchor", x1: 31, y1: 216, x2: 101, y2: 216, strokeToken: "annotation", strokeWidth: 1, opacity: 0.38, lineCap: "round" },
      ],
    },
    notes: "Tall narrow silhouette with a dark undercut hairstyle and minimal accessories.",
  },
];
