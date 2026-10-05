"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CodeBracketIcon } from "@heroicons/react/20/solid";
import { jost, atkinson, inconsolata } from "./fonts";
import { ReactIcon, ExpressIcon } from "./icons";
import { Scribble } from "./sketch";
import SectionTab from "./section_tab";
import { skillGroups, type SkillIcon } from "../lib/content";

function Icon({ icon, name }: { icon: SkillIcon; name: string }) {
  if (icon.type === "svg") {
    return icon.key === "react" ? <ReactIcon className="h-9 w-9" /> : <ExpressIcon className="h-9 w-9" />;
  }
  return (
    <Image
      src={icon.src}
      width={40}
      height={40}
      alt=""
      aria-hidden="true"
      className={`h-9 w-9 ${icon.invert ? "invert" : ""}`}
      title={name}
    />
  );
}

export default function Skills() {
  let n = 0;
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="dot-grid relative scroll-mt-20 border-y-2 border-white/90"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
        {/* horizontal tab on mobile, vertical side tab on desktop (as in the original) */}
        <div className="md:hidden">
          <SectionTab id="skills-title" index="03" label="SK1LLS" icon={<CodeBracketIcon className="h-6 w-6" />} />
        </div>

        <p className={`${jost.className} mt-10 text-center text-lg text-ink-2 md:mt-0`}>
          Technologies I&apos;m{" "}
          <span className="relative inline-block text-ink">
            comfortable
            <Scribble variant="squiggle" className="absolute -bottom-2 left-0 h-2.5 w-full text-ink" />
          </span>{" "}
          with.
        </p>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-x-10 gap-y-10">
          {skillGroups.map((g) => (
            <div key={g.label} className="flex flex-col items-center gap-3">
              <span className={`${inconsolata.className} text-xs tracking-wider text-ink-3`}>{g.label}</span>
              <ul className="flex flex-wrap justify-center gap-3">
                {g.items.map((s) => {
                  const i = n++;
                  return (
                    <motion.li
                      key={s.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.05 }}
                      transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                      className="group flex h-[6.5rem] w-[6.5rem] flex-col items-center justify-center gap-2 rounded-sm border border-white/50 bg-black/60 transition-colors duration-200 hover:border-ink hover:bg-white/[0.05]"
                    >
                      <span className="text-ink transition-transform duration-200 group-hover:-translate-y-0.5">
                        <Icon icon={s.icon} name={s.name} />
                      </span>
                      <span className={`${jost.className} text-base text-ink`}>{s.name}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* vertical side tab, kept from the original */}
      <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 md:block">
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex w-14 flex-col items-center gap-4 border border-r-0 border-white/80 bg-black/70 py-5"
        >
          <CodeBracketIcon className="h-6 w-6 text-ink" aria-hidden="true" />
          <span className="h-px w-6 bg-white/60" aria-hidden="true" />
          <h2
            id="skills-title-desktop"
            className={`${atkinson.className} text-lg tracking-[0.2em] [writing-mode:vertical-rl]`}
          >
            SK1LLS
          </h2>
          <span className={`${inconsolata.className} text-xs text-ink-3 [writing-mode:vertical-rl]`}>03</span>
        </motion.div>
      </div>
    </section>
  );
}
