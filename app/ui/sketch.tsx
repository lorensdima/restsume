"use client";

import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/** Zig-zag scribble covering a w×h box; drawn as a mask so filled-shape art can "sketch in". */
function scribblePath(w: number, h: number, rows = 9) {
  const pad = w * 0.08;
  const stepY = h / rows;
  let d = `M ${-pad} ${stepY * 0.2}`;
  for (let i = 0; i <= rows; i++) {
    const y = i * stepY;
    const wobble = (i % 3) * stepY * 0.15;
    d += i % 2 === 0 ? ` L ${w + pad} ${y - stepY * 0.6 + wobble}` : ` L ${-pad} ${y + wobble}`;
  }
  return d;
}

export function SketchReveal({
  src,
  width,
  height,
  viewBox,
  className = "",
  imageClassName = "",
  alt,
}: {
  src: string;
  width: number;
  height: number;
  /** viewBox for the outer svg; defaults to 0 0 width height */
  viewBox?: string;
  className?: string;
  imageClassName?: string;
  alt: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const maskId = useId().replace(/:/g, "");
  const rows = 9;

  return (
    <svg
      ref={ref}
      viewBox={viewBox ?? `0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={alt}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-10%" y="-10%" width="120%" height="120%">
          <motion.path
            d={scribblePath(width, height, rows)}
            fill="none"
            stroke="white"
            strokeWidth={(height / rows) * 1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: inView || reduce ? 1 : 0 }}
            transition={{ duration: 1.8, ease: [0.45, 0, 0.25, 1] }}
          />
        </mask>
      </defs>
      <image href={src} width={width} height={height} mask={`url(#${maskId})`} className={imageClassName} />
    </svg>
  );
}

/** Hand-drawn underline that draws itself under inline text. */
export function Scribble({
  className = "",
  variant = "loop",
  delay = 0.2,
}: {
  className?: string;
  variant?: "loop" | "squiggle";
  delay?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const d =
    variant === "loop"
      ? "M4 14 C 40 6, 90 4, 150 9 S 196 16, 170 18 C 120 21, 60 20, 20 17"
      : "M2 10 Q 12 2, 22 10 T 42 10 T 62 10 T 82 10 T 102 10";
  const vb = variant === "loop" ? "0 0 200 24" : "0 0 104 16";

  return (
    <svg ref={ref} viewBox={vb} preserveAspectRatio="none" className={className} aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={variant === "loop" ? 2.2 : 1.8}
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: inView || reduce ? 1 : 0 }}
        transition={{ duration: 0.9, delay, ease: [0.45, 0, 0.25, 1] }}
      />
    </svg>
  );
}
