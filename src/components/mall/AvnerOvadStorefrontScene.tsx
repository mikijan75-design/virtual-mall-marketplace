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
      <linearGradient id="ao-navy" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1f3d57" />
        <stop offset="100%" stopColor="#102234" />
      </linearGradient>
      <radialGradient id="ao-glow" cx="0.5" cy="0.2" r="0.8">
        <stop offset="0%" stopColor="rgba(217,195,147,0.18)" />
        <stop offset="70%" stopColor="rgba(217,195,147,0)" />
      </radialGradient>
    </defs>

    {/* Navy banner background — matches page header */}
    <rect width="400" height="260" fill="url(#ao-navy)" />
    <rect width="400" height="260" fill="url(#ao-glow)" />

    {/* Gold trims top + bottom */}
    <rect x="0" y="0" width="400" height="4" fill="#b3925a" opacity="0.85" />
    <rect x="0" y="256" width="400" height="4" fill="#b3925a" opacity="0.85" />

    {/* Hebrew title — large cream */}
    <text
      x="200"
      y="92"
      textAnchor="middle"
      fill="#e6d6b9"
      fontFamily="'Frank Ruhl Libre', serif"
      fontWeight="900"
      fontSize="64"
      letterSpacing="-2"
    >
      אבנר עובד
    </text>

    {/* English name — gold */}
    <text
      x="200"
      y="138"
      textAnchor="middle"
      fill="#d9c393"
      fontFamily="'Frank Ruhl Libre', serif"
      fontWeight="900"
      fontSize="38"
      letterSpacing="3"
    >
      AVNER OVAD
    </text>

    {/* Gold divider */}
    <line x1="120" y1="160" x2="280" y2="160" stroke="#b3925a" strokeWidth="1.5" />

    {/* Subtitle */}
    <text
      x="200"
      y="190"
      textAnchor="middle"
      fill="#ffffff"
      fontFamily="'Heebo', sans-serif"
      fontWeight="700"
      fontSize="18"
    >
      אמן ציור ישראלי
    </text>
    <text
      x="200"
      y="214"
      textAnchor="middle"
      fill="#e6d6b9"
      fontFamily="'Heebo', sans-serif"
      fontWeight="600"
      fontSize="13"
    >
      סופר ומהנדס אזרחי (טכניון)
    </text>
  </svg>
);

export default AvnerOvadStorefrontScene;