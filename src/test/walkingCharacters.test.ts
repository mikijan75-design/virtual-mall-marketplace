import { describe, expect, it } from "vitest";
import { walkingCharacterImageSample, walkingCharacters } from "@/data/walkingCharacters";

describe("walking character samples", () => {
  it("describes the four people from the sampled image with renderable vector layers", () => {
    expect(walkingCharacterImageSample.canvas).toEqual({ width: 1024, height: 576, unit: "px" });
    expect(walkingCharacters).toHaveLength(4);

    for (const character of walkingCharacters) {
      expect(character.bounds.width).toBeGreaterThan(100);
      expect(character.bounds.height).toBeGreaterThan(275);
      expect(character.samplePoints.length).toBeGreaterThanOrEqual(5);
      expect(character.measurements.length).toBeGreaterThanOrEqual(4);
      expect(character.illustration.backLayer.length).toBeGreaterThan(0);
      expect(character.illustration.bodyLayer.length).toBeGreaterThan(0);
      expect(character.illustration.detailLayer.length).toBeGreaterThan(0);
      expect(character.poseAngles.strideLengthPx).toBeGreaterThan(70);
    }
  });
});
