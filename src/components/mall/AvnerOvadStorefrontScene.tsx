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
      <linearGradient id="ao-top-shadow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
      </linearGradient>
    </defs>

    <rect width="400" height="260" fill="url(#ao-bg)" />
    <rect width="400" height="260" fill="url(#ao-glow)" />

    {/* Accent trims top + bottom */}
    <rect x="0" y="0" width="400" height="4" fill="#5b8fa8" opacity="0.85" />
    <rect x="0" y="256" width="400" height="4" fill="#5b8fa8" opacity="0.85" />

    {/* Top awning shadow over the sign */}
    <rect x="0" y="4" width="400" height="36" fill="url(#ao-top-shadow)" />

    {/* Corner brackets (ר shapes) near corners */}
    <g stroke="#5b8fa8" strokeWidth="2" fill="none" opacity="0.7">
      {/* top-left */}
      <polyline points="18,52 18,30 40,30" />
      {/* top-right */}
      <polyline points="382,52 382,30 360,30" />
      {/* bottom-left */}
      <polyline points="18,208 18,230 40,230" />
      {/* bottom-right */}
      <polyline points="382,208 382,230 360,230" />
    </g>

    {/* Hebrew title */}
    <text
      x="200"
      y="140"
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
      y="184"
      textAnchor="middle"
      fill="#2c3e50"
      fontFamily="'Heebo', sans-serif"
      fontWeight="700"
      fontSize="26"
    >
      גלריית ציורים
    </text>

    {/* Divider */}
    <line x1="160" y1="158" x2="240" y2="158" stroke="#5b8fa8" strokeWidth="1.5" />
  </svg>
);

export default AvnerOvadStorefrontScene;