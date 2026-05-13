import type { CSSProperties } from "react";
import { NATURAL_PHARMACY_WORDMARK_DESIGN } from "./NaturalPharmacyWordmark.design";

type NaturalPharmacyWordmarkProps = {
  className?: string;
  style?: CSSProperties;
};

const NaturalPharmacyWordmark = ({ className, style }: NaturalPharmacyWordmarkProps) => {
  const design = NATURAL_PHARMACY_WORDMARK_DESIGN;

  return (
    <div
      aria-label={design.caption}
      className={className}
      dir="rtl"
      role="img"
      style={{
        alignItems: "center",
        backgroundColor: design.canvas.backgroundColor,
        display: "flex",
        height: design.canvas.height,
        justifyContent: "center",
        maxWidth: "100%",
        width: design.canvas.width,
        ...style,
      }}
    >
      <span
        style={{
          color: design.text.color,
          fontFamily: design.text.fontFamily,
          fontSize: design.text.fontSize,
          fontWeight: design.text.fontWeight,
          letterSpacing: design.text.letterSpacing,
          lineHeight: design.text.lineHeight,
          textAlign: "center",
        }}
      >
        {design.caption}
      </span>
    </div>
  );
};

export default NaturalPharmacyWordmark;
