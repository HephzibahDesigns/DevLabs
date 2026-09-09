import { motion } from "framer-motion";

export function LogoMark({ size = 40, className = "" }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      role="img"
      aria-label="DevLabs"
      className={className}
      // A tiny wobble on hover — just enough to feel alive without being
      // distracting every time the logo appears on screen.
      whileHover={{ rotate: -4, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 12 }}
    >
      <defs>
        <clipPath id="devlabs-flask-body">
          <circle cx="80" cy="110" r="42" />
        </clipPath>
      </defs>
      <rect
        x="0"
        y="0"
        width="160"
        height="160"
        rx="24"
        fill="#14161d"
        stroke="#2c3140"
        strokeWidth="1.5"
      />
      <rect
        x="70"
        y="26"
        width="20"
        height="34"
        rx="3"
        fill="none"
        stroke="#3d8bde"
        strokeWidth="3.5"
      />
      <circle
        cx="80"
        cy="110"
        r="42"
        fill="none"
        stroke="#3d8bde"
        strokeWidth="3.5"
      />
      <g clipPath="url(#devlabs-flask-body)">
        <rect
          x="36"
          y="120"
          width="88"
          height="40"
          fill="#49caa0"
          fillOpacity="0.85"
        />
        <circle cx="68" cy="110" r="3.5" fill="#e4e6ec" fillOpacity="0.8" />
        <circle cx="90" cy="128" r="2.5" fill="#e4e6ec" fillOpacity="0.7" />
        <circle cx="78" cy="140" r="4" fill="#e4e6ec" fillOpacity="0.6" />
      </g>
      <text
        x="80"
        y="50"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Consolas, monospace"
        fontSize="20"
        fontWeight="700"
        fill="#3d8bde"
      >
        &gt;
      </text>
    </motion.svg>
  );
}

// Full lockup: icon + "DevLabs" wordmark, used on the landing page and
// anywhere the brand should be introduced rather than just referenced.
export default function Logo({
  size = 40,
  textSize = "text-2xl",
  className = "",
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={size} />
      <span className={`font-mono font-bold text-ink ${textSize}`}>
        Dev<span className="text-accent">Labs</span>
      </span>
    </div>
  );
}
