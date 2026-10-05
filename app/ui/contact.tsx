"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BoyDrawing from "./boy_drawing";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { outfit, into_light, inconsolata, jost } from "./fonts";
import { SketchReveal, Scribble } from "./sketch";
import { LinkedInIcon } from "./icons";
import PetModal from "./pet_model";
import { socials } from "../lib/content";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${socials.email}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={`${inconsolata.className} group inline-flex min-h-[48px] items-center gap-2 rounded-md border border-line px-4 text-sm text-ink-2 transition-colors hover:border-ink hover:text-ink`}
      aria-label={`Copy email address ${socials.email}`}
    >
      <span>{socials.email}</span>
      <span className="relative inline-block w-[9.5rem] overflow-hidden text-left">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="ok"
              className="block text-signal"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              → 200 OK · copied
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              className="block text-ink-3 group-hover:text-ink-2"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              click to copy
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative flex scroll-mt-10 flex-col items-center px-5 pb-40 pt-28 md:pb-56"
    >
      <BoyDrawing className="w-[280px] sm:w-[320px]" />

      <h2
        id="contact-title"
        className={`${outfit.className} mt-4 max-w-3xl text-balance text-center text-3xl leading-tight tracking-wide sm:text-5xl`}
      >
        Together, Let&apos;s Build Something{" "}
        <span className="relative inline-block whitespace-nowrap">
          <span className={`${into_light.className} text-[1.2em] font-bold`}>Great!</span>
          <Scribble className="absolute -bottom-1 left-[-6%] h-3 w-[112%] text-ink" delay={0.5} />
          <span className="absolute -right-8 -top-3 sm:-right-9">
            <PetModal />
          </span>
        </span>
      </h2>

      <div className="mt-14 flex flex-col items-center gap-3 sm:flex-row">
        <a
          href={`mailto:${socials.email}`}
          className={`${jost.className} group inline-flex min-h-[48px] items-center gap-2 rounded-md border border-ink bg-ink px-6 text-xl text-black transition-colors hover:bg-transparent hover:text-ink`}
        >
          <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
          Contact Me
        </a>
        <CopyEmail />
      </div>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href={socials.linkedin}
        aria-label="LinkedIn"
        className="mt-10 grid h-12 w-12 place-items-center rounded-md text-ink-2 transition-colors hover:text-ink"
      >
        <LinkedInIcon className="h-9 w-9" />
      </a>
    </section>
  );
}
