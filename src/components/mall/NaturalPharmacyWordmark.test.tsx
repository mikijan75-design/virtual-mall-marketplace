import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NaturalPharmacyWordmark, { NATURAL_PHARMACY_WORDMARK_DESIGN } from "./NaturalPharmacyWordmark";

describe("NaturalPharmacyWordmark", () => {
  it("renders the saved caption with the matching design values", () => {
    render(<NaturalPharmacyWordmark />);

    const design = NATURAL_PHARMACY_WORDMARK_DESIGN;
    const wordmark = screen.getByRole("img", { name: design.caption });

    expect(screen.getByText(design.caption)).toBeInTheDocument();
    expect(wordmark).toHaveStyle({
      backgroundColor: design.canvas.backgroundColor,
      height: `${design.canvas.height}px`,
      width: `${design.canvas.width}px`,
    });
  });
});
