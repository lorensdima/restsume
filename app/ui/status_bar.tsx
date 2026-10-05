"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { inconsolata, outfit } from "./fonts";
import { endpoints } from "../lib/content";

const STORAGE_KEY = "restsume:statusbar-collapsed";
const HINT_KEY = "restsume:skippy-hint";

/** Replaces the old corner toast: a tiny "server status" that explains the RESTsume idea. */
export default function StatusBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
    if (sessionStorage.getItem(HINT_KEY)) return;
    const show = window.setTimeout(() => {
      sessionStorage.setItem(HINT_KEY, "1");
      setHint(true);
    }, 25000);
    const hide = window.setTimeout(() => setHint(false), 32000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const setCollapsedPersist = (v: boolean) => {
    setCollapsed(v);
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
  };

  return (
    <div ref={rootRef} className={`${inconsolata.className} fixed left-3 top-3 z-40 text-sm`}>
      <motion.div
        layout
        className="flex items-center overflow-hidden rounded-md border border-line bg-surface/85 backdrop-blur-sm"
        transition={{ duration: 0.3 }}
      >
        <button
          type="button"
          onClick={() => (collapsed ? setCollapsedPersist(false) : setOpen((o) => !o))}
          aria-expanded={collapsed ? undefined : open}
          aria-label={collapsed ? "Expand API status" : "What is RESTsume?"}
          className="flex min-h-[40px] items-center gap-2 px-3 text-ink transition-colors hover:bg-white/5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-status-blink rounded-full bg-signal" />
          </span>
          {!collapsed && (
            <>
              <span className="font-semibold tracking-wide">RESTsume</span>
              <ChevronDownIcon
                className={`h-4 w-4 text-ink-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </>
          )}
        </button>
        {!collapsed && (
          <>
            <span className="h-5 w-px bg-line" aria-hidden="true" />
            <Link
              href="/api"
              className="hidden min-h-[40px] items-center px-3 text-ink-2 transition-colors hover:bg-white/5 hover:text-ink xs:flex"
            >
              GET /api&nbsp;<span aria-hidden="true">↗</span>
            </Link>
            <button
              type="button"
              onClick={() => setCollapsedPersist(true)}
              aria-label="Collapse"
              className="grid min-h-[40px] w-9 place-items-center text-ink-3 transition-colors hover:bg-white/5 hover:text-ink"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {open && !collapsed && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-2 w-[min(20rem,calc(100vw-1.5rem))] rounded-md border border-line bg-surface/95 p-4 backdrop-blur-sm"
          >
            <p className={`${outfit.className} text-base text-ink`}>This portfolio is also an API.</p>
            <p className="mt-1 text-ink-3">Every section below is backed by an endpoint. Poke around:</p>
            <ul className="mt-3 space-y-1">
              {endpoints.map((e) => (
                <li key={e.route}>
                  <a
                    href={e.route}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-3 rounded px-2 py-1.5 transition-colors hover:bg-white/5"
                  >
                    <span className="text-ink">
                      <span className="mr-2 text-signal">GET</span>
                      {e.route}
                    </span>
                    <span className="text-xs text-ink-3 group-hover:text-ink-2">{e.note}</span>
                  </a>
                </li>
              ))}
            </ul>
            <Link href="/api" className="mt-3 inline-block text-ink-2 underline underline-offset-4 hover:text-ink">
              all routes ↗
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hint && !open && (
          <motion.a
            href="#contact"
            onClick={() => setHint(false)}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 block w-max max-w-[calc(100vw-1.5rem)] rounded-md border border-line bg-surface/90 px-3 py-2 text-xs text-ink-2 hover:text-ink"
          >
            psst, a very good dog is hiding near the end ✦
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
