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
      role="img"
      style={{
        backgroundColor: design.canvas.backgroundColor,
        width: "100%",
        height: "100%",
        display: "block",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 220 60"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="presentation"
      >
        <text
          x="110"
          y="42"
          textAnchor="middle"
          direction="rtl"
          style={{
            fill: design.text.color,
            fontFamily: '"Noto Sans Hebrew", "Heebo", sans-serif',
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          {design.caption}
        </text>
      </svg>
    </div>
  );
};

export default NaturalPharmacyWordmark;
