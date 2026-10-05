import Starfield from "react-starfield";
import { inconsolata } from "./ui/fonts";
import StatusBar from "./ui/status_bar";
import Hero from "./ui/hero";
import Projects from "./ui/projects";
import Timeline, { type TimelineEntry } from "./ui/timeline";
import Skills from "./ui/skills";
import Contact from "./ui/contact";
import { fetchEducation, fetchExperience } from "./lib/data";
import { socials } from "./lib/content";

// Fetch experience and education dynamically from DB
export const dynamic = "force-dynamic";

function formatDate(value: unknown): string {
  if (value === null || value === undefined || value === "") return "Present";
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

async function loadTimeline(): Promise<{
  experience: TimelineEntry[] | null;
  education: TimelineEntry[] | null;
}> {
  const [exp, edu] = await Promise.allSettled([fetchExperience(), fetchEducation()]);
  return {
    experience:
      exp.status === "fulfilled"
        ? exp.value.map((e) => ({
            title: e.job_title,
            org: e.company,
            location: e.location || undefined,
            description: e.description || undefined,
            start: formatDate(e.start_date),
            end: formatDate(e.end_date),
          }))
        : null,
    education:
      edu.status === "fulfilled"
        ? edu.value.map((e) => ({
            title: e.degree,
            org: e.school_name,
            location: e.location || undefined,
            description: e.notes || undefined,
            start: formatDate(e.start_date),
            end: formatDate(e.end_date),
          }))
        : null,
  };
}

export default async function Home() {
  const { experience, education } = await loadTimeline();

  return (
    <main className="relative overflow-x-clip">
      <Starfield />
      <StatusBar />
      <Hero />
      <Projects />
      <Timeline experience={experience} education={education} />
      <Skills />
      <Contact />

      <footer className={`${inconsolata.className} border-t border-line text-sm text-ink-3`}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-5 md:px-8">
          <p className="text-ink-2">
            {socials.fullName} <span className="text-ink-3">· {new Date().getFullYear()}</span>
          </p>
          <nav className="flex items-center gap-5" aria-label="Footer">
            <a href="/api" className="transition-colors hover:text-ink">
              /api ↗
            </a>
            <a href={socials.source} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
              source ↗
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
