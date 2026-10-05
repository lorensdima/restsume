"use client";

import { MotionConfig } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE, duration: 0.7 }}>
      {children}
    </MotionConfig>
  );
}
