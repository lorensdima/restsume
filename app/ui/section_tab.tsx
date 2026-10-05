"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { atkinson, inconsolata } from "./fonts";

const GLYPHS = "01{}/<>_#$%";

/** Scrambles into `text` once when it enters the viewport. Deterministic, so SSR == client. */
function DecodeText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState<number | null>(null);
  const total = text.length * 2 + 6;

  useEffect(() => {
    if (!inView || reduce) return;
    let f = 0;
    setFrame(0);
    const id = window.setInterval(() => {
      f += 1;
      if (f >= total) {
        window.clearInterval(id);
        setFrame(null);
      } else setFrame(f);
    }, 28);
    return () => window.clearInterval(id);
  }, [inView, reduce, total]);

  const shown =
    frame === null
      ? text
      : text
          .split("")
          .map((ch, i) => (frame >= i * 2 + 6 || ch === " " ? ch : GLYPHS[(i * 3 + frame) % GLYPHS.length]))
          .join("");

  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}

export default function SectionTab({
  index,
  label,
  icon,
  endpoint,
  json,
  onToggleJson,
  id,
}: {
  index: string;
  label: string;
  icon: React.ReactNode;
  endpoint?: string;
  json?: boolean;
  onToggleJson?: () => void;
  id?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
      <div className="flex items-center">
        <div className="mr-3 rounded-full border-2 border-ink p-2.5" aria-hidden="true">
          {icon}
        </div>
        <span className={`${inconsolata.className} mr-2 text-sm text-ink-3`}>{index}</span>
        <h2 id={id} className={`${atkinson.className} bg-zinc-700/80 px-3 py-2 text-lg tracking-[0.12em] sm:text-xl`}>
          <DecodeText text={label} />
        </h2>
      </div>

      {endpoint && (
        <code className={`${inconsolata.className} flex items-center gap-2 text-sm text-ink-2`}>
          <span className="rounded-sm border border-line px-1.5 py-0.5 text-[11px] font-semibold tracking-wider text-signal">
            GET
          </span>
          {endpoint}
        </code>
      )}

      {onToggleJson && (
        <button
          type="button"
          onClick={onToggleJson}
          aria-pressed={json}
          className={`${inconsolata.className} ml-auto inline-flex min-h-[40px] items-center gap-2 rounded-md border px-3 text-sm transition-colors duration-200 ${
            json
              ? "border-ink bg-ink text-black"
              : "border-line text-ink-2 hover:border-ink hover:text-ink"
          }`}
        >
          <span aria-hidden="true">{"{ }"}</span>
          {json ? "view designed" : "view as JSON"}
        </button>
      )}
    </div>
  );
}
