"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon, StarIcon } from "@heroicons/react/20/solid";
import { incrementPets } from "../lib/actions";
import { fetchPetNum } from "../lib/data";
import { into_light, inconsolata } from "./fonts";

/* Petting is measured in pointer travel (px) so it works for mouse, pen and touch. */
const MORE = 900;
const MORE_MORE = 2200;
const THANKS = 3600;
const HEART_EVERY = 260;

type Heart = { id: number; x: number; y: number; drift: number };

export default function PetModal() {
  const [visible, setVisible] = useState(false);
  const [distance, setDistance] = useState(0);
  const [timesPetted, setTimesPetted] = useState<number | null>(null);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [mounted, setMounted] = useState(false);

  const counted = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const sinceHeart = useRef(0);
  const heartId = useRef(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const loadCount = useCallback(() => {
    fetchPetNum()
      .then((data) => setTimesPetted(data?.[0]?.pets ?? null))
      .catch(() => setTimesPetted(null));
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!visible) return;
    loadCount();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        // only one focusable control inside: keep focus in the dialog
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [visible, loadCount, close]);

  const onPointerMove = async (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (!last.current) {
      last.current = { x, y };
      return;
    }
    const d = Math.hypot(x - last.current.x, y - last.current.y);
    last.current = { x, y };
    if (d > 120) return; // ignore jumps

    setDistance((v) => v + d);
    sinceHeart.current += d;
    if (sinceHeart.current > HEART_EVERY) {
      sinceHeart.current = 0;
      const id = heartId.current++;
      setHearts((h) => [...h.slice(-10), { id, x, y, drift: (id % 5) * 8 - 16 }]);
    }

    if (!counted.current && distance + d >= THANKS) {
      counted.current = true;
      try {
        await incrementPets("Skippy Mae");
        loadCount(); // re-fetch so the number includes this pet
      } catch {
        /* db unavailable: still say thanks */
      }
    }
  };

  const tailClass =
    distance > THANKS
      ? "animate-fast-rotate-animation"
      : distance > MORE_MORE
      ? "animate-rotate-animation"
      : distance > 0
      ? "animate-slow-rotate-animation"
      : "-rotate-90";

  const message =
    distance > THANKS
      ? timesPetted !== null
        ? `"Thanks!!" Skippy has been petted ${timesPetted} times`
        : `"Thanks!!"`
      : distance > MORE
      ? `"More!!!"`
      : distance > 0
      ? `"More!"`
      : "You found Skippy! Give her a rub.";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setVisible(true)}
        aria-label="A star. What could it be?"
        className="inline-grid h-8 w-8 place-items-center rounded-full align-top text-ink transition-colors hover:text-signal"
      >
        <StarIcon className="h-4 w-4 animate-twinkle" />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {visible && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label="Skippy the dog"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.92, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="relative flex w-full max-w-sm flex-col items-center gap-5 rounded-lg border border-line bg-surface px-6 pb-8 pt-6"
                >
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-md text-ink-2 transition-colors hover:bg-white/10 hover:text-ink"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>

                  <p className={`${into_light.className} min-h-[2rem] px-8 text-center text-2xl`} aria-live="polite">
                    {message}
                  </p>

                  <div
                    onPointerMove={onPointerMove}
                    onPointerLeave={() => (last.current = null)}
                    onPointerUp={() => (last.current = null)}
                    className="relative flex h-64 w-64 cursor-grab touch-none select-none items-center justify-center active:cursor-grabbing"
                  >
                    <div className="absolute translate-y-20">
                      <Image
                        src="/tail.svg"
                        width={100}
                        height={200}
                        alt=""
                        aria-hidden="true"
                        className={`${tailClass} h-64 w-64`}
                        draggable={false}
                      />
                    </div>
                    <Image
                      src="/dog.svg"
                      width={200}
                      height={200}
                      alt="Skippy, a hand-drawn dog"
                      className="absolute z-20"
                      draggable={false}
                    />
                    <span
                      className={`${into_light.className} pointer-events-none absolute bottom-0 z-30 rounded-full bg-ink px-2.5 text-sm font-bold text-black`}
                    >
                      rub here
                    </span>

                    {hearts.map((h) => (
                      <motion.span
                        key={h.id}
                        aria-hidden="true"
                        className="pointer-events-none absolute z-40 text-lg text-ink"
                        style={{ left: h.x - 8, top: h.y - 12 }}
                        initial={{ opacity: 1, y: 0, x: 0, scale: 0.6 }}
                        animate={{ opacity: 0, y: -70, x: h.drift, scale: 1.1 }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        onAnimationComplete={() => setHearts((all) => all.filter((x) => x.id !== h.id))}
                      >
                        ♥
                      </motion.span>
                    ))}
                  </div>

                  {/* petting progress, quiet */}
                  <div className="h-px w-40 overflow-hidden bg-white/10" aria-hidden="true">
                    <motion.div
                      className="h-full origin-left bg-ink"
                      animate={{ scaleX: Math.min(distance / THANKS, 1) }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <p className={`${inconsolata.className} -mt-3 text-xs text-ink-3`}>works with mouse or finger</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
