export default function ZyraaLogo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hover:drop-shadow-lg transition-all duration-300"
    >
      {/* Outer circle background */}
      <circle cx="50" cy="50" r="48" fill="#f4e4c1" stroke="#b8860b" strokeWidth="2" />

      {/* Inner decorative circle */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="#b8860b" strokeWidth="1" opacity="0.3" />

      {/* Letter Z in gold */}
      <g transform="translate(50, 50)">
        {/* Top diagonal */}
        <line
          x1="-12"
          y1="-14"
          x2="12"
          y2="-14"
          stroke="#b8860b"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Middle diagonal */}
        <line
          x1="-12"
          y1="2"
          x2="12"
          y2="2"
          stroke="#b8860b"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Connecting diagonal */}
        <line
          x1="12"
          y1="-14"
          x2="-12"
          y2="2"
          stroke="#b8860b"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Bottom horizontal */}
        <line
          x1="-12"
          y1="14"
          x2="12"
          y2="14"
          stroke="#b8860b"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Decorative sparkles */}
        <g fill="#b8860b" opacity="0.7">
          {/* Top left sparkle */}
          <circle cx="-18" cy="-16" r="2" />
          <circle cx="-20" cy="-18" r="1.5" />
          <circle cx="-16" cy="-18" r="1.5" />
          
          {/* Top right sparkle */}
          <circle cx="18" cy="-16" r="2" />
          <circle cx="20" cy="-18" r="1.5" />
          <circle cx="16" cy="-18" r="1.5" />
          
          {/* Bottom right sparkle */}
          <circle cx="18" cy="18" r="2" />
          <circle cx="20" cy="20" r="1.5" />
          <circle cx="16" cy="20" r="1.5" />
        </g>
      </g>

      {/* Gradient overlay for depth */}
      <defs>
        <radialGradient id="zyraaGradient" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#zyraaGradient)" />
    </svg>
  );
}
