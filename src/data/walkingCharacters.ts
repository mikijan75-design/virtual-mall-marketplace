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
      { token: "jacket", hex: "#315f83", sampledFrom: "blue jacket body" },
      { token: "jacket-highlight", hex: "#5f83a0", sampledFrom: "rolled cuffs and seam highlights" },
      { token: "pants", hex: "#243f5d", sampledFrom: "dark blue trousers" },
      { token: "shoes", hex: "#1b2530", sampledFrom: "black walking shoes" },
    ],
    garments: [
      { layer: "outerwear", colorToken: "jacket", description: "buttoned blue jacket with pockets and rolled cuffs" },
      { layer: "bottom", colorToken: "pants", description: "slim dark blue trousers" },
      { layer: "footwear", colorToken: "shoes", description: "black low-profile shoes" },
    ],
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
      { token: "dress", hex: "#b7cdd0", sampledFrom: "pale blue dress" },
      { token: "dress-highlight", hex: "#d8e7e6", sampledFrom: "front dress highlight" },
      { token: "pocket", hex: "#8faeb3", sampledFrom: "small chest pocket" },
      { token: "shoes", hex: "#1c2530", sampledFrom: "black flats" },
    ],
    garments: [
      { layer: "dress", colorToken: "dress", description: "short-sleeve pale blue A-line dress" },
      { layer: "detail", colorToken: "pocket", description: "small left chest pocket" },
      { layer: "footwear", colorToken: "shoes", description: "black flat walking shoes" },
    ],
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
      { token: "skin", hex: "#d7a37f", sampledFrom: "face and arms" },
      { token: "top", hex: "#f6f1e8", sampledFrom: "white sleeveless top" },
      { token: "jeans", hex: "#243f61", sampledFrom: "dark blue denim" },
      { token: "belt", hex: "#6b4931", sampledFrom: "brown belt" },
      { token: "shoes", hex: "#202934", sampledFrom: "black shoes" },
    ],
    garments: [
      { layer: "top", colorToken: "top", description: "white sleeveless top with light vertical texture" },
      { layer: "bottom", colorToken: "jeans", description: "dark slim jeans cuffed above the ankle" },
      { layer: "accessory", colorToken: "belt", description: "brown belt and wrist jewelry" },
      { layer: "footwear", colorToken: "shoes", description: "black low-profile shoes" },
    ],
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
      { token: "jacket", hex: "#2e5f89", sampledFrom: "blue zip jacket" },
      { token: "jacket-shadow", hex: "#244d73", sampledFrom: "jacket side shadows" },
      { token: "pants", hex: "#263f5d", sampledFrom: "dark blue trousers" },
      { token: "shoes", hex: "#15202a", sampledFrom: "black shoes" },
    ],
    garments: [
      { layer: "outerwear", colorToken: "jacket", description: "blue stand-collar jacket with zipper and side pockets" },
      { layer: "bottom", colorToken: "pants", description: "dark tapered trousers" },
      { layer: "footwear", colorToken: "shoes", description: "black walking shoes" },
    ],
    notes: "Tall narrow silhouette with a dark undercut hairstyle and minimal accessories.",
  },
];
