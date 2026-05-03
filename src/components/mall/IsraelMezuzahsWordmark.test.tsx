import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import IsraelMezuzahsWordmark, { ISRAEL_MEZUZAHS_WORDMARK_PARAMETERS } from "./IsraelMezuzahsWordmark";

describe("IsraelMezuzahsWordmark", () => {
  it("renders the image-derived wordmark text and canvas parameters", () => {
    render(<IsraelMezuzahsWordmark data-testid="wordmark" />);

    const wordmark = screen.getByTestId("wordmark");
    const params = ISRAEL_MEZUZAHS_WORDMARK_PARAMETERS;

    expect(wordmark).toHaveAttribute("viewBox", `0 0 ${params.canvas.width} ${params.canvas.height}`);
    expect(screen.getByText(params.title.text)).toBeInTheDocument();
    expect(screen.getByText(params.subtitle.text)).toBeInTheDocument();
  });
});
