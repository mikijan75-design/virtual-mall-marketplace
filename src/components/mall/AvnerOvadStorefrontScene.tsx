interface Props {
  className?: string;
  preserveAspectRatio?: string;
}

const AvnerOvadStorefrontScene = ({ className, preserveAspectRatio = "xMidYMid slice" }: Props) => (
  <svg
    viewBox="0 0 400 260"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio={preserveAspectRatio}
    role="img"
    aria-label="שלט חנות אבנר עובד"
  >
    <defs>
      <linearGradient id="ao-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f0f4f8" />
        <stop offset="100%" stopColor="#dce4ed" />
      </linearGradient>
      <radialGradient id="ao-glow" cx="0.5" cy="0.2" r="0.8">
        <stop offset="0%" stopColor="rgba(91,143,168,0.10)" />
        <stop offset="70%" stopColor="rgba(91,143,168,0)" />
      </radialGradient>
    </defs>

    <rect width="400" height="260" fill="url(#ao-bg)" />
    <rect width="400" height="260" fill="url(#ao-glow)" />

    {/* Accent trims top + bottom */}
    <rect x="0" y="0" width="400" height="4" fill="#5b8fa8" opacity="0.85" />
    <rect x="0" y="256" width="400" height="4" fill="#5b8fa8" opacity="0.85" />

    {/* Hebrew title */}
    <text
      x="200"
      y="100"
      textAnchor="middle"
      fill="#1f3d57"
      fontFamily="'Frank Ruhl Libre', serif"
      fontWeight="900"
      fontSize="60"
      letterSpacing="-2"
    >
      אבנר עובד
    </text>

    {/* Gallery line */}
    <text
      x="200"
      y="148"
      textAnchor="middle"
      fill="#2c3e50"
      fontFamily="'Heebo', sans-serif"
      fontWeight="700"
      fontSize="26"
    >
      גלריית ציורים
    </text>

    {/* Divider */}
    <line x1="120" y1="170" x2="280" y2="170" stroke="#5b8fa8" strokeWidth="1.5" />

    {/* Subtitle kept */}
    <text
      x="200"
      y="200"
      textAnchor="middle"
      fill="#2c3e50"
      fontFamily="'Heebo', sans-serif"
      fontWeight="600"
      fontSize="18"
    >
      אמן ציור ישראלי
    </text>
  </svg>
);

export default AvnerOvadStorefrontScene;