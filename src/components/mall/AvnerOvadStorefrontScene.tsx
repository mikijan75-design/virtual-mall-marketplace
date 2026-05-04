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
    {/* Warm paper background */}
    <defs>
      <linearGradient id="ao-paper" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f8f1e5" />
        <stop offset="100%" stopColor="#ede0c4" />
      </linearGradient>
      <linearGradient id="ao-navy" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1f3d57" />
        <stop offset="100%" stopColor="#142a3d" />
      </linearGradient>
      <radialGradient id="ao-grain" cx="0.2" cy="0.15" r="0.9">
        <stop offset="0%" stopColor="rgba(181,143,83,0.18)" />
        <stop offset="60%" stopColor="rgba(181,143,83,0)" />
      </radialGradient>
    </defs>

    <rect width="400" height="260" fill="url(#ao-paper)" />
    <rect width="400" height="260" fill="url(#ao-grain)" />

    {/* Decorative borders top/bottom */}
    <g opacity="0.55">
      {Array.from({ length: 40 }).map((_, i) => (
        <line key={`t-${i}`} x1={i * 10} y1={0} x2={i * 10 + 8} y2={10} stroke="#a6854e" strokeWidth="1.2" />
      ))}
      {Array.from({ length: 40 }).map((_, i) => (
        <line key={`b-${i}`} x1={i * 10} y1={250} x2={i * 10 + 8} y2={260} stroke="#a6854e" strokeWidth="1.2" />
      ))}
    </g>

    {/* Navy banner */}
    <g transform="translate(110,40)">
      <rect x="0" y="0" width="270" height="180" rx="14" fill="url(#ao-navy)" />
      {/* Hebrew title */}
      <text
        x="135"
        y="60"
        textAnchor="middle"
        fill="#e6d6b9"
        fontFamily="'Frank Ruhl Libre', serif"
        fontWeight="900"
        fontSize="42"
        letterSpacing="-1"
      >
        אבנר עובד
      </text>
      {/* English name */}
      <text
        x="135"
        y="100"
        textAnchor="middle"
        fill="#d9c393"
        fontFamily="'Frank Ruhl Libre', serif"
        fontWeight="800"
        fontSize="26"
        letterSpacing="2"
      >
        AVNER OVAD
      </text>
      {/* Divider */}
      <line x1="60" y1="118" x2="210" y2="118" stroke="#b3925a" strokeWidth="1.5" />
      {/* Subtitle */}
      <text
        x="135"
        y="145"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="'Heebo', sans-serif"
        fontWeight="700"
        fontSize="14"
      >
        אמן ציור ישראלי
      </text>
      <text
        x="135"
        y="163"
        textAnchor="middle"
        fill="#e6d6b9"
        fontFamily="'Heebo', sans-serif"
        fontWeight="600"
        fontSize="11"
      >
        סופר ומהנדס אזרחי
      </text>
    </g>

    {/* Portrait card (left) */}
    <g transform="translate(58,55) rotate(-5)">
      <rect x="0" y="0" width="90" height="115" rx="2" fill="#ffffff" stroke="#d3c2a5" strokeWidth="1" />
      <rect x="6" y="6" width="78" height="80" fill="#dde3eb" />
      {/* Hair */}
      <ellipse cx="45" cy="38" rx="22" ry="13" fill="#d9d7d2" />
      {/* Face */}
      <circle cx="45" cy="48" r="18" fill="#dfc5ad" />
      {/* Glasses */}
      <circle cx="38" cy="48" r="4" fill="none" stroke="#1f252a" strokeWidth="1.4" />
      <circle cx="52" cy="48" r="4" fill="none" stroke="#1f252a" strokeWidth="1.4" />
      <line x1="42" y1="48" x2="48" y2="48" stroke="#1f252a" strokeWidth="1.2" />
      {/* Mustache */}
      <path d="M40 58 Q45 61 50 58" stroke="#7d4637" strokeWidth="1.6" fill="none" />
      {/* Suit */}
      <path d="M18 86 Q45 70 72 86 L72 92 L18 92 Z" fill="#263d5a" />
      <rect x="6" y="86" width="78" height="6" fill="#263d5a" />
      {/* Shirt */}
      <polygon points="40,86 45,94 50,86" fill="#d9e7f4" />
      {/* Caption */}
      <text x="45" y="105" textAnchor="middle" fontFamily="'Heebo', sans-serif" fontSize="7" fontWeight="700" fill="#5a4424">
        Israeli Artist
      </text>
    </g>

    {/* Heart icon bottom */}
    <g transform="translate(195,232)">
      <path
        d="M0 4 C0 -2 8 -2 8 4 C8 -2 16 -2 16 4 C16 9 8 14 8 14 C8 14 0 9 0 4 Z"
        fill="#b3925a"
      />
    </g>
  </svg>
);

export default AvnerOvadStorefrontScene;