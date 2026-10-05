"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { BriefcaseIcon } from "@heroicons/react/20/solid";
import { outfit, inconsolata } from "./fonts";
import SectionTab from "./section_tab";
import JsonView from "./json_view";
import Reveal from "./reveal";

export type TimelineEntry = {
  title: string;
  org: string;
  location?: string;
  description?: string;
  start: string;
  end: string;
};

function Offline({ route }: { route: string }) {
  return (
    <div className={`${inconsolata.className} rounded-md border border-line bg-surface p-4 text-sm`}>
      <p className="text-ink">
        GET {route} <span className="text-ink-3">→</span> 503 Service Unavailable
      </p>
      <p className="mt-1 text-ink-3">{"// the database behind this section isn't reachable right now."}</p>
    </div>
  );
}

function Entry({ e, i }: { e: TimelineEntry; i: number }) {
  return (
    <Reveal as="li" delay={i * 0.06} className="relative pb-12 pl-10 last:pb-0 sm:pl-12">
      <motion.span
        aria-hidden="true"
        className="absolute left-[-6px] top-1.5 h-[13px] w-[13px] rounded-full border-2 border-ink bg-black"
        initial={{ backgroundColor: "#000000" }}
        whileInView={{ backgroundColor: "#f4f4f5" }}
        viewport={{ once: true, margin: "0px 0px -45% 0px" }}
        transition={{ duration: 0.3 }}
      />
      <p className={`${inconsolata.className} text-sm tabular-nums text-ink-3`}>
        {e.start} <span aria-hidden="true">→</span>
        <span className="sr-only">to</span> {e.end}
      </p>
      <h3 className={`${outfit.className} mt-1.5 text-xl font-medium leading-snug text-ink sm:text-2xl`}>{e.title}</h3>
      <p className="mt-0.5 text-ink-2">
        {e.org}
        {e.location && <span className="text-ink-3"> · {e.location}</span>}
      </p>
      {e.description && (
        <p className="mt-3 max-w-[62ch] whitespace-pre-line text-pretty leading-relaxed text-ink-2">{e.description}</p>
      )}
    </Reveal>
  );
}

function Group({
  label,
  route,
  entries,
}: {
  label: string;
  route: string;
  entries: TimelineEntry[] | null;
}) {
  return (
    <div>
      <p className={`${inconsolata.className} mb-6 flex items-center gap-2 pl-10 text-sm text-ink-3 sm:pl-12`}>
        <span className="text-signal">GET</span> {route}
        <span className="text-ink-3">· {label}</span>
      </p>
      {entries === null ? (
        <div className="pl-10 sm:pl-12">
          <Offline route={route} />
        </div>
      ) : entries.length === 0 ? (
        <p className="pl-10 text-ink-3 sm:pl-12">Nothing here yet.</p>
      ) : (
        <ol>
          {entries.map((e, i) => (
            <Entry key={`${e.org}-${e.start}-${i}`} e={e} i={i} />
          ))}
        </ol>
      )}
    </div>
  );
}

export default function Timeline({
  experience,
  education,
}: {
  experience: TimelineEntry[] | null;
  education: TimelineEntry[] | null;
}) {
  const [json, setJson] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-24 md:px-8 md:py-32">
      <SectionTab
        id="experience-title"
        index="02"
        label="EXP3RIENCE"
        icon={<BriefcaseIcon className="h-6 w-6" />}
        endpoint="/api/experience"
        json={json}
        onToggleJson={() => setJson((v) => !v)}
      />

      <AnimatePresence mode="wait" initial={false}>
        {json ? (
          <motion.div
            key="json"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid gap-6 lg:grid-cols-2"
          >
            <JsonView endpoint="/api/experience" />
            <JsonView endpoint="/api/education" />
          </motion.div>
        ) : (
          <motion.div
            key="designed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-12"
          >
            <div ref={lineRef} className="relative ml-1 max-w-3xl space-y-16">
              {/* track + progress line that draws with scroll */}
              <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-white/10" />
              <motion.span
                aria-hidden="true"
                style={{ scaleY }}
                className="absolute bottom-0 left-0 top-0 w-px origin-top bg-ink"
              />
              <Group label="work" route="/api/experience" entries={experience} />
              <Group label="study" route="/api/education" entries={education} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
