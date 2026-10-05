"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { RectangleStackIcon, PlusIcon } from "@heroicons/react/20/solid";
import { outfit, inconsolata } from "./fonts";
import SectionTab from "./section_tab";
import JsonView from "./json_view";
import Reveal from "./reveal";
import { LinkButton } from "./button";
import { projects, type ProjectEntry } from "../lib/content";

const pad = (n: number) => String(n + 1).padStart(2, "0");

function Meta({ p }: { p: ProjectEntry }) {
  return (
    <span className={`${inconsolata.className} text-xs text-ink-3 sm:text-[13px]`}>
      {[p.kind, p.year, p.stack.slice(0, 3).join(" · ")].filter(Boolean).join("  ·  ")}
    </span>
  );
}

function Links({ p }: { p: ProjectEntry }) {
  return (
    <div className="flex flex-wrap gap-3">
      {p.links.site && (
        <LinkButton href={p.links.site} variant="signal">
          live site
        </LinkButton>
      )}
      <LinkButton href={p.links.repo}>repo</LinkButton>
      {p.links.doc && <LinkButton href={p.links.doc}>docs</LinkButton>}
    </div>
  );
}

function Shot({ p, priority = false }: { p: ProjectEntry; priority?: boolean }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-line bg-white/[0.03]">
      <Image
        src={p.image}
        alt={`Screenshot of ${p.short}`}
        fill
        sizes="(min-width: 1024px) 640px, 100vw"
        className="object-contain p-3"
        priority={priority}
      />
    </div>
  );
}

function Preview({ p }: { p: ProjectEntry }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.article
        key={p.slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.55 }}
        >
          <Shot p={p} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-6"
        >
          <h3 className={`${outfit.className} text-pretty text-2xl font-semibold leading-tight tracking-[-0.01em]`}>
            {p.title}
          </h3>
          <ul className={`${inconsolata.className} mt-3 flex flex-wrap gap-2 text-xs text-ink-2`}>
            {p.stack.map((s) => (
              <li key={s} className="rounded-sm border border-line px-2 py-1">
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-[62ch] text-pretty leading-relaxed text-ink-2">{p.description}</p>
          <div className="mt-6">
            <Links p={p} />
          </div>
        </motion.div>
      </motion.article>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);
  const [json, setJson] = useState(false);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowDown" ? 1 : -1) + projects.length) % projects.length;
    rowRefs.current[next]?.focus();
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-24 md:px-8 md:py-32">
      <SectionTab
        id="projects-title"
        index="01"
        label="PR0JECTS"
        icon={<RectangleStackIcon className="h-6 w-6" />}
        endpoint="/api/projects"
        json={json}
        onToggleJson={() => setJson((v) => !v)}
      />

      {json ? (
        <motion.div
          key="json"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-10"
        >
          <JsonView endpoint="/api/projects" fallback={projects} />
        </motion.div>
      ) : (
        <motion.div
          key="designed"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12"
        >
            <ol className="lg:col-span-5" aria-label="Project list">
              {projects.map((p, i) => {
                const active = selected === i;
                const open = mobileOpen === i;
                return (
                  <Reveal as="li" key={p.slug} delay={i * 0.06} className="border-t border-line last:border-b">
                    <button
                      ref={(el) => {
                        rowRefs.current[i] = el;
                      }}
                      type="button"
                      onMouseEnter={() => setSelected(i)}
                      onFocus={() => setSelected(i)}
                      onClick={() => {
                        setSelected(i);
                        setMobileOpen(open ? null : i);
                      }}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      aria-expanded={open}
                      aria-controls={`proj-panel-${p.slug}`}
                      className="group relative flex w-full items-start gap-4 py-5 pl-4 pr-2 text-left transition-colors hover:bg-white/[0.03]"
                    >
                      {active && (
                        <motion.span
                          layoutId="proj-active"
                          className="absolute inset-y-0 left-0 hidden w-[2px] bg-ink lg:block"
                          transition={{ duration: 0.35 }}
                        />
                      )}
                      <span
                        className={`${inconsolata.className} mt-1 text-sm tabular-nums transition-colors ${
                          active ? "text-ink" : "text-ink-3"
                        }`}
                      >
                        {pad(i)}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-1">
                        <span
                          className={`${outfit.className} text-lg leading-snug transition-colors sm:text-xl ${
                            active ? "text-ink" : "text-ink-2 group-hover:text-ink"
                          }`}
                        >
                          {p.short}
                        </span>
                        <Meta p={p} />
                      </span>
                      <PlusIcon
                        aria-hidden="true"
                        className={`mt-1.5 h-4 w-4 shrink-0 text-ink-3 transition-transform duration-300 lg:hidden ${
                          open ? "rotate-45" : ""
                        }`}
                      />
                    </button>

                    {/* mobile accordion body */}
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={`proj-panel-${p.slug}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden lg:hidden"
                        >
                          <div className="pb-6 pl-4 pr-2">
                            <Shot p={p} />
                            <p className="mt-4 text-pretty leading-relaxed text-ink-2">{p.description}</p>
                            <div className="mt-5">
                              <Links p={p} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Reveal>
                );
              })}
            </ol>

            <div className="hidden lg:col-span-7 lg:block">
              <div className="sticky top-24" aria-live="polite">
                <Preview p={projects[selected]} />
              </div>
            </div>
          </motion.div>
        )}
    </section>
  );
}
