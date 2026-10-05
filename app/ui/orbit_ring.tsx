"use client";

import { motion, useReducedMotion } from "framer-motion";

type Arc = { from: number; to: number; period: number; reverse?: boolean };

const DEFAULT_ARCS: Arc[] = [
  { from: -98, to: -78, period: 80 },
  { from: 160, to: 214, period: 120 },
  { from: 14, to: 40, period: 200, reverse: true },
];

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const rad = (a: number) => (a * Math.PI) / 180;
  const x0 = cx + r * Math.cos(rad(a0));
  const y0 = cy + r * Math.sin(rad(a0));
  const x1 = cx + r * Math.cos(rad(a1));
  const y1 = cy + r * Math.sin(rad(a1));
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

/**
 * SVG rebuild of /circle1.png: a thin orbit plus thicker arcs.
 * Draws in on mount, then every arc drifts on its own period.
 */
export default function OrbitRing({
  className = "",
  arcs = DEFAULT_ARCS,
  delay = 0.1,
}: {
  className?: string;
  arcs?: Arc[];
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const C = 250;
  const R = 236;
  const draw = (d: number, dur: number) => ({
    initial: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { duration: dur, delay: d, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.2, delay: d } },
  });

  return (
    <svg viewBox="0 0 500 500" className={className} aria-hidden="true" fill="none">
      <motion.circle
        cx={C}
        cy={C}
        r={R}
        stroke="white"
        strokeWidth={2.5}
        style={{ rotate: -90, transformOrigin: "50% 50%", transformBox: "view-box" }}
        {...draw(delay, 1.6)}
      />
      {arcs.map((a, i) => (
        <g
          key={i}
          className="orbit-arc"
          style={
            {
              "--orbit-period": `${a.period}s`,
              "--orbit-direction": a.reverse ? "reverse" : "normal",
            } as React.CSSProperties
          }
        >
          <motion.path
            d={arcPath(C, C, R, a.from, a.to)}
            stroke="white"
            strokeWidth={7}
            strokeLinecap="round"
            {...draw(delay + 0.9 + i * 0.18, 0.6)}
          />
        </g>
      ))}
    </svg>
  );
}
