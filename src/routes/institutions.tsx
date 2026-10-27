import { createFileRoute, Link } from "@tanstack/react-router";
import { institutionSummary } from "@/data/demo";
import { formatINR, formatINRCompact } from "@/lib/format";
import { StatusBadgeFor } from "@/components/status-badge";

export const Route = createFileRoute("/institutions")({
  head: () => ({
    meta: [
      { title: "Institutions — AICTE FDR Portal" },
      {
        name: "description",
        content: "Every registered institution with held deposits, portfolio value and review status.",
      },
      { property: "og:title", content: "Institutions — AICTE FDR Portal" },
      { property: "og:description", content: "Every registered institution with held deposits, portfolio value and review status." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Institutions,
});

function Institutions() {
  const rows = institutionSummary().sort((a, b) => b.total - a.total);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="eyebrow">Institutions</p>
      <h1 className="headline mt-2 text-3xl sm:text-4xl">
        Registered institutions.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Each institution and its held security deposits. Select an institution
        to open its records in the repository.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-border/60">
        <table className="w-full min-w-[760px] border-collapse bg-card text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-6 py-4 font-medium">Institution</th>
              <th className="px-4 py-4 font-medium">Category</th>
              <th className="px-4 py-4 text-right font-medium">Held</th>
              <th className="px-4 py-4 text-right font-medium">Total value</th>
              <th className="px-4 py-4 font-medium">Attention</th>
              <th className="px-6 py-4 font-medium" aria-label="Open" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map(({ institution, count, total, matured, pending }) => (
              <tr key={institution.id} className="transition-colors hover:bg-accent/60">
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">{institution.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {institution.code} · {institution.city}
                  </p>
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  {institution.category}
                </td>
                <td className="px-4 py-4 text-right tabular-nums text-foreground">
                  {count}
                </td>
                <td className="px-4 py-4 text-right tabular-nums text-foreground">
                  {formatINR(total)}
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({formatINRCompact(total)})
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {pending > 0 && (
                      <StatusBadgeFor status="pending_verification" className="!px-2" />
                    )}
                    {matured > 0 && (
                      <span className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                        {matured} matured
                      </span>
                    )}
                    {pending === 0 && matured === 0 && (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to="/fdr"
                    search={{ institution: institution.id }}
                    className="text-link whitespace-nowrap text-xs font-medium"
                  >
                    View records &rarr;
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
