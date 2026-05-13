import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ClearAlignersInfoPage from "./ClearAlignersInfoPage";

const renderPage = () =>
  render(
    <MemoryRouter>
      <ClearAlignersInfoPage />
    </MemoryRouter>,
  );

describe("ClearAlignersInfoPage", () => {
  beforeEach(() => {
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: vi.fn(() => "blob:teeth-preview"),
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: vi.fn(),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the full Hebrew infographic structure", () => {
    renderPage();

    expect(
      screen.getByRole("heading", {
        name: "דף מידע ראשוני : יישור שיניים בקשתיות שקופות",
      }),
    ).toBeInTheDocument();

    [
      "צילום ראשוני",
      "הנדסת התהליך",
      "הזמנת הקשתיות",
      "ליווי לכל אורך התהליך",
      "תהליך עצמאי",
      "התאמה של קוביות",
      "תזרים זמנים",
      "שיטות",
      "יתרונות",
      "אסתטיקה",
      "זמינות",
    ].forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("shows a preview after selecting an image file", () => {
    renderPage();

    const uploadInput = screen.getByLabelText("בחירת קובץ");
    const file = new File(["sample"], "teeth.jpg", { type: "image/jpeg" });

    fireEvent.change(uploadInput, { target: { files: [file] } });

    expect(screen.getByAltText("תצוגה מקדימה של השיניים שהועלו")).toHaveAttribute("src", "blob:teeth-preview");
  });
});
