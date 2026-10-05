"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { inconsolata } from "./fonts";

type State =
  | { kind: "loading" }
  | { kind: "live"; data: unknown }
  | { kind: "snapshot"; data: unknown }
  | { kind: "error"; status: number };

/** Tiny tokenizer for JSON.stringify output: keys, strings, numbers, literals. */
function JsonLine({ line }: { line: string }) {
  const parts: React.ReactNode[] = [];
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)|\b(true|false|null)\b/gi;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(line))) {
    if (m.index > last) parts.push(line.slice(last, m.index));
    if (m[1] && m[2]) {
      parts.push(<span key={k++} className="text-ink">{m[1]}</span>, m[2]);
    } else if (m[1]) {
      parts.push(<span key={k++} className="text-signal/90">{m[1]}</span>);
    } else {
      parts.push(<span key={k++} className="text-ink-2">{m[0]}</span>);
    }
    last = m.index + m[0].length;
  }
  if (last < line.length) parts.push(line.slice(last));
  return <>{parts}</>;
}

export default function JsonView({
  endpoint,
  fallback,
}: {
  endpoint: string;
  /** Local data shown (and labelled) when the live endpoint is unavailable. */
  fallback?: unknown;
}) {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 5000);
    fetch(endpoint, { signal: ctrl.signal })
      .then(async (res) => {
        if (!res.ok) throw res.status;
        setState({ kind: "live", data: await res.json() });
      })
      .catch((err) => {
        if (fallback !== undefined) setState({ kind: "snapshot", data: fallback });
        else setState({ kind: "error", status: typeof err === "number" ? err : 503 });
      })
      .finally(() => window.clearTimeout(timer));
    return () => {
      window.clearTimeout(timer);
      ctrl.abort();
    };
  }, [endpoint, fallback]);

  const data = state.kind === "live" || state.kind === "snapshot" ? state.data : null;
  const text = data !== null ? JSON.stringify(data, null, 2) : "";
  const lines = text ? text.split("\n") : [];
  const count = Array.isArray(data) ? `${data.length} item${data.length === 1 ? "" : "s"}` : "";
  const step = lines.length ? Math.min(0.02, 0.6 / lines.length) : 0;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className={`${inconsolata.className} overflow-hidden rounded-md border border-line bg-surface text-[13px] leading-6 sm:text-sm`}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line bg-raised px-4 py-2.5 text-ink-2">
        <span className="text-ink">GET {endpoint}</span>
        <span aria-hidden="true">→</span>
        {state.kind === "loading" && (
          <span>
            waiting<span className="animate-caret-blink">_</span>
          </span>
        )}
        {(state.kind === "live" || state.kind === "snapshot") && (
          <span>
            <span className="text-signal">200 OK</span> · application/json{count && ` · ${count}`}
          </span>
        )}
        {state.kind === "error" && (
          <span className="text-ink">{state.status} Service Unavailable</span>
        )}
        {data !== null && (
          <button
            type="button"
            onClick={copy}
            className="ml-auto min-h-[32px] rounded border border-line px-2 text-xs text-ink-2 transition-colors hover:border-ink hover:text-ink"
          >
            {copied ? "copied" : "copy"}
          </button>
        )}
      </div>

      <div className="max-h-[34rem] overflow-auto px-4 py-3" tabIndex={0} aria-label={`JSON response from ${endpoint}`}>
        {state.kind === "snapshot" && (
          <p className="text-ink-3">{"// live endpoint unreachable, showing local snapshot from content.ts"}</p>
        )}
        {state.kind === "error" && (
          <p className="text-ink-2">
            {"// the database behind this endpoint isn't reachable right now."}
            <br />
            {"// try again later, or open it directly: "}
            <a href={endpoint} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
              {endpoint}
            </a>
          </p>
        )}
        <pre className="whitespace-pre-wrap break-words text-ink-3">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.12, delay: i * step }}
            >
              <JsonLine line={line} />
            </motion.div>
          ))}
        </pre>
      </div>
    </div>
  );
}
