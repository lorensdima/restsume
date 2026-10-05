"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { outfit, inconsolata } from "./fonts";
import OrbitRing from "./orbit_ring";
import { LinkedInIcon } from "./icons";
import { socials } from "../lib/content";

function Typed({ text, startDelay = 1400 }: { text: string; startDelay?: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduce) {
      setN(text.length);
      return;
    }
    let id: number | undefined;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        setN((v) => {
          if (v >= text.length) {
            window.clearInterval(id);
            return v;
          }
          return v + 1;
        });
      }, 38);
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      if (id) window.clearInterval(id);
    };
  }, [text, startDelay, reduce]);

  const done = n >= text.length;
  const shown = text.slice(0, n);
  const arrowAt = text.indexOf("→");

  return (
    <span aria-label={text}>
      <span aria-hidden="true">
        {arrowAt > -1 && n > arrowAt ? (
          <>
            {shown.slice(0, arrowAt)}
            <span className="text-signal">{shown.slice(arrowAt)}</span>
          </>
        ) : (
          shown
        )}
        <span className={`ml-0.5 inline-block w-[0.6ch] ${done ? "animate-caret-blink" : ""}`}>▍</span>
      </span>
    </span>
  );
}

function Name({ text }: { text: string }) {
  const words = text.split(" ");
  let idx = 0;
  return (
    <h1
      className={`${outfit.className} text-balance text-center text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] xs:text-5xl sm:text-6xl lg:text-7xl`}
      aria-label={text}
    >
      {words.map((w, wi) => (
        <span key={wi} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden="true">
          {w.split("").map((ch) => {
            const i = idx++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.025 }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const cornerRotate = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-[100svh] min-h-[560px] items-center justify-center">
      {/* socials: kept at top-centre like the original */}
      <div className="absolute left-1/2 top-3 z-30 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-md border border-line bg-surface/80 p-1 backdrop-blur-sm">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={socials.linkedin}
            aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded text-ink-2 transition-colors hover:bg-ink hover:text-black"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${socials.email}`}
            aria-label="Email"
            className="grid h-10 w-10 place-items-center rounded text-ink-2 transition-colors hover:bg-ink hover:text-black"
          >
            <EnvelopeIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* corner orbit (desktop), rotates the opposite way while scrolling */}
      <motion.div
        style={{ rotate: cornerRotate }}
        className="pointer-events-none absolute bottom-[-300px] left-[-300px] hidden w-[500px] lg:block"
      >
        <OrbitRing
          delay={0.6}
          arcs={[
            { from: -40, to: -10, period: 140, reverse: true },
            { from: 200, to: 230, period: 90 },
          ]}
        />
      </motion.div>

      {/* main orbit */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_520px_85px_at_50%_48%,transparent_50%,black_100%)] [-webkit-mask-image:radial-gradient(ellipse_520px_85px_at_50%_48%,transparent_50%,black_100%)]">
        <motion.div
          style={{ rotate, scale, opacity }}
          className="flex items-center justify-center"
        >
          <OrbitRing className="w-[min(82vw,500px)]" />
        </motion.div>
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-5">
        <div className="relative inline-flex flex-col items-center rounded-2xl bg-black/60 px-6 py-2 shadow-[0_0_40px_20px_#000000] backdrop-blur-[2px]">
          <Name text={socials.name} />
          <motion.p
            className="mt-4 text-center text-lg text-ink-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {socials.title}
          </motion.p>
          <p className={`${inconsolata.className} mt-3 h-6 text-center text-sm text-ink-3`}>
            <Typed text="GET /api/basic → 200 OK" />
          </p>
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#projects"
        style={{ opacity: cueOpacity }}
        className={`${inconsolata.className} absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.2em] text-ink-3`}
        aria-label="Scroll to projects"
      >
        scroll
        <span className="relative block h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute left-0 top-0 block h-3 w-px bg-ink"
            animate={{ y: [-12, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
          />
        </span>
      </motion.a>
    </section>
  );
}
