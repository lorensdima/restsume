import Link from "next/link";
import { fetchHelp } from "../lib/data";
import { inconsolata, outfit } from "../ui/fonts";
import { endpoints } from "../lib/content";

export const dynamic = "force-dynamic";

export default async function Page() {
  let help: { name: string; endpoint: string; description: string }[] = [];
  let isFallback = false;

  try {
    help = await fetchHelp();
  } catch (err) {
    isFallback = true;
    help = endpoints.map((e) => ({
      name: e.route.replace("/api/", "").toUpperCase(),
      endpoint: e.route,
      description: e.note,
    }));
  }

  return (
    <div className={`${inconsolata.className} min-h-screen bg-black px-6 py-12 text-ink`}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between border-b border-line pb-6">
          <div>
            <Link
              href="/"
              className="text-xs text-ink-3 transition-colors hover:text-ink"
            >
              ← back to portfolio
            </Link>
            <h1 className={`${outfit.className} mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl`}>
              RESTsume API Reference
            </h1>
            <p className="mt-1 text-sm text-ink-2">
              All routes return JSON. Base URL: <code className="text-signal">/api</code>
            </p>
          </div>
          <span className="hidden rounded border border-line bg-surface px-3 py-1.5 text-xs text-ink-2 sm:inline-block">
            HTTP / REST
          </span>
        </div>

        {isFallback && (
          <div className="mb-6 rounded-md border border-line bg-surface p-3 text-xs text-ink-3">
            {"// live DB connection offline; showing documented route snapshot"}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-raised text-xs text-ink-3 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5 font-medium">Resource</th>
                <th className="px-5 py-3.5 font-medium">Endpoint</th>
                <th className="px-5 py-3.5 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {help.map((data) => (
                <tr key={data.endpoint} className="transition-colors hover:bg-white/[0.03]">
                  <td className="px-5 py-4 font-medium text-ink">{data.name}</td>
                  <td className="px-5 py-4">
                    <Link
                      href={data.endpoint}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-signal underline underline-offset-4 hover:text-signal/80"
                    >
                      <span className="rounded bg-signal/10 px-1.5 py-0.5 text-xs text-signal">GET</span>
                      {data.endpoint}
                      <span aria-hidden="true" className="text-xs">↗</span>
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-ink-2">{data.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
