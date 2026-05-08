export interface ImageSize {
  width: number;
  height: number;
}

export interface PixelPoint {
  x: number;
  y: number;
}

export interface NormalizedPoint {
  x: number;
  y: number;
}

export interface PixelBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  usage: "primaryWing" | "secondaryWing" | "body" | "outline" | "highlight" | "marking";
}

export interface ButterflySample {
  id: string;
  name: string;
  gridPosition: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  boundingBox: PixelBox;
  center: PixelPoint;
  normalizedCenter: NormalizedPoint;
  approximateWingSpanPx: number;
  bodyColor: string;
  palette: ColorSwatch[];
  distinguishingMarks: string[];
  styleTags: string[];
}

export const butterflySampleImage = {
  sourceDescription: "Four pixel-art butterflies on a white background, arranged in a two-by-two grid.",
  coordinateSystem: "Pixel coordinates are measured from the top-left corner of a 1024 by 576 source image.",
  size: {
    width: 1024,
    height: 576,
  },
  backgroundColor: "#FFFFFF",
} as const;

export const butterflySamples: ButterflySample[] = [
  {
    id: "blue-butterfly",
    name: "Blue butterfly",
    gridPosition: "topLeft",
    boundingBox: { x: 256, y: 180, width: 198, height: 132 },
    center: { x: 355, y: 246 },
    normalizedCenter: { x: 0.347, y: 0.427 },
    approximateWingSpanPx: 198,
    bodyColor: "#173B77",
    palette: [
      { name: "sky blue wing fill", hex: "#3FA2E4", usage: "primaryWing" },
      { name: "light blue wing highlight", hex: "#79C7F0", usage: "highlight" },
      { name: "deep blue vein", hex: "#1E67AE", usage: "secondaryWing" },
      { name: "navy body", hex: "#173B77", usage: "body" },
      { name: "dark pixel outline", hex: "#202020", usage: "outline" },
    ],
    distinguishingMarks: [
      "rounded upper wings with scalloped pixel edges",
      "dark blue veins radiating from the body",
      "small black antennae above the head",
    ],
    styleTags: ["pixel-art", "symmetrical", "blue", "soft-rounded-wings"],
  },
  {
    id: "yellow-butterfly",
    name: "Yellow butterfly",
    gridPosition: "topRight",
    boundingBox: { x: 575, y: 180, width: 195, height: 132 },
    center: { x: 673, y: 246 },
    normalizedCenter: { x: 0.657, y: 0.427 },
    approximateWingSpanPx: 195,
    bodyColor: "#59620F",
    palette: [
      { name: "golden yellow wing fill", hex: "#E3C435", usage: "primaryWing" },
      { name: "pale yellow wing highlight", hex: "#FFE47A", usage: "highlight" },
      { name: "olive yellow wing shadow", hex: "#B59620", usage: "secondaryWing" },
      { name: "olive green body", hex: "#59620F", usage: "body" },
      { name: "dark pixel outline", hex: "#262311", usage: "outline" },
    ],
    distinguishingMarks: [
      "warm yellow wings with cream-colored highlights",
      "olive body and darker olive vein pixels",
      "wing silhouette mirrors the blue butterfly",
    ],
    styleTags: ["pixel-art", "symmetrical", "yellow", "warm-palette"],
  },
  {
    id: "green-butterfly",
    name: "Green butterfly",
    gridPosition: "bottomLeft",
    boundingBox: { x: 252, y: 344, width: 204, height: 135 },
    center: { x: 354, y: 412 },
    normalizedCenter: { x: 0.346, y: 0.715 },
    approximateWingSpanPx: 204,
    bodyColor: "#456B2A",
    palette: [
      { name: "leaf green wing fill", hex: "#2DBB49", usage: "primaryWing" },
      { name: "light green wing highlight", hex: "#63D65A", usage: "highlight" },
      { name: "deep green vein", hex: "#178A3A", usage: "secondaryWing" },
      { name: "moss green body", hex: "#456B2A", usage: "body" },
      { name: "dark pixel outline", hex: "#21331D", usage: "outline" },
    ],
    distinguishingMarks: [
      "leaf-like green wings with strong dark vein lines",
      "slightly wider lower wing spread than the top butterflies",
      "muted green body and antennae",
    ],
    styleTags: ["pixel-art", "symmetrical", "green", "leaf-toned"],
  },
  {
    id: "orange-monarch-butterfly",
    name: "Orange monarch-style butterfly",
    gridPosition: "bottomRight",
    boundingBox: { x: 566, y: 344, width: 214, height: 136 },
    center: { x: 673, y: 412 },
    normalizedCenter: { x: 0.657, y: 0.715 },
    approximateWingSpanPx: 214,
    bodyColor: "#73310F",
    palette: [
      { name: "bright orange wing fill", hex: "#F0640A", usage: "primaryWing" },
      { name: "amber wing highlight", hex: "#FF8A12", usage: "highlight" },
      { name: "burnt orange wing shadow", hex: "#B83A07", usage: "secondaryWing" },
      { name: "brown body", hex: "#73310F", usage: "body" },
      { name: "black monarch outline", hex: "#1A120E", usage: "outline" },
      { name: "white edge spots", hex: "#FFFFFF", usage: "marking" },
    ],
    distinguishingMarks: [
      "monarch-like black border around orange wings",
      "white spot markings along the top and outer wing edges",
      "dark vein network is thicker than the other butterflies",
    ],
    styleTags: ["pixel-art", "symmetrical", "orange", "monarch-inspired", "spotted"],
  },
];

export const butterfliesByGridPosition = butterflySamples.reduce(
  (samples, butterfly) => {
    samples[butterfly.gridPosition] = butterfly;
    return samples;
  },
  {} as Record<ButterflySample["gridPosition"], ButterflySample>,
);
