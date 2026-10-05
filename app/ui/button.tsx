import { inconsolata } from "./fonts";

type Variant = "outline" | "signal" | "solid";

const base =
  "group inline-flex min-h-[40px] items-center justify-center gap-2 rounded-md px-4 text-sm tracking-wide transition-colors duration-200 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  outline: "border border-white/40 text-ink hover:bg-ink hover:text-black hover:border-ink",
  signal: "border border-signal bg-signal text-black hover:bg-transparent hover:text-signal",
  solid: "border border-ink bg-ink text-black hover:bg-transparent hover:text-ink",
};

export function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    >
      ↗
    </span>
  );
}

export function LinkButton({
  href,
  children,
  variant = "outline",
  external = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${inconsolata.className} ${base} ${variants[variant]} ${className}`}
    >
      {children}
      {external && <Arrow />}
    </a>
  );
}
