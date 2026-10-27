import { createFileRoute } from "@tanstack/react-router";
import {
  heldInstruments,
  heldValue,
  holdingsByBank,
  activityLog,
  effectiveStatus,
  statusLabel,
  maturingWithin,
  pendingReviewInstruments,
  allInstruments,
  instrumentByRef,
  type EffectiveStatus,
} from "@/data/demo";
import { formatINR, formatINRCompact, formatDate } from "@/lib/format";
import { BankBars, StatusRamp } from "@/components/distributions";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — AICTE FDR Portal" },
      {
        name: "description",
        content:
          "Portfolio statistics, bank concentration, verification progress, and full audit trail.",
      },
      { property: "og:title", content: "Reports — AICTE FDR Portal" },
      {
        property: "og:description",
        content:
          "Portfolio statistics, bank concentration, verification progress, and full audit trail.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const held = heldInstruments();
  const total = heldValue();
  const pending = pendingReviewInstruments();
  const bankRows = holdingsByBank();
  const in90 = maturingWithin(90);
  const in180 = maturingWithin(180);

  // Annual maturity projection: group by year
  const yearMap = new Map<number, { count: number; total: number }>();
  for (const i of allInstruments) {
    const year = new Date(i.maturityOn).getFullYear();
    const existing = yearMap.get(year) ?? { count: 0, total: 0 };
    yearMap.set(year, {
      count: existing.count + 1,
      total: existing.total + i.amount,
    });
  }
  const yearProjection = Array.from(yearMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([year, data]) => ({ year, ...data }));

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Reports</p>
          <h1 className="headline mt-2 text-3xl sm:text-4xl">
            Portfolio summary.
          </h1>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Print Summary
        </button>
      </div>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Overview of holdings, verification progress, bank concentration and the
        complete chronological activity trail.
      </p>

      {/* Key metrics */}
      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border/60 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total portfolio value"
          value={formatINRCompact(total)}
          sub={`${formatINR(total)} across ${held.length} instruments`}
        />
        <MetricCard
          label="Active liens"
          value={String(held.length)}
          sub="Currently held deposits"
        />
        <MetricCard
          label="Pending verification"
          value={String(pending.length)}
          sub="Awaiting review sign-off"
        />
        <MetricCard
          label="Maturing in 90 days"
          value={String(in90.length)}
          sub={`${in180.length} within 180 days`}
        />
      </div>

      {/* Distributions */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <BankBars title="Bank concentration" />
        <StatusRamp title="Status distribution" />
      </div>

      {/* Bank concentration bars (raw detail) */}
      <section className="mt-6 rounded-2xl bg-card ring-1 ring-border/60">
        <h2 className="px-6 pt-6 text-sm font-semibold text-foreground">
          Bank holdings detail
        </h2>
        <div className="overflow-x-auto">
          <table className="mt-4 w-full min-w-[500px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-6 py-3 font-medium">Bank</th>
                <th className="px-4 py-3 text-right font-medium">
                  Instruments
                </th>
                <th className="px-4 py-3 text-right font-medium">
                  Total value
                </th>
                <th className="px-6 py-3 text-right font-medium">
                  Concentration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {bankRows.map((r) => (
                <tr key={r.bank}>
                  <td className="px-6 py-3 text-foreground">{r.bank}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">
                    {r.count}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">
                    {formatINR(r.total)}
                  </td>
                  <td className="px-6 py-3 text-right tabular-nums text-muted-foreground">
                    {total > 0
                      ? ((r.total / total) * 100).toFixed(1) + "%"
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Annual maturity projection */}
      <section className="mt-6 rounded-2xl bg-card ring-1 ring-border/60">
        <h2 className="px-6 pt-6 text-sm font-semibold text-foreground">
          Annual maturity projection
        </h2>
        <div className="overflow-x-auto">
          <table className="mt-4 w-full min-w-[400px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-6 py-3 font-medium">Year</th>
                <th className="px-4 py-3 text-right font-medium">Maturing</th>
                <th className="px-6 py-3 text-right font-medium">
                  Total value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {yearProjection.map((row) => (
                <tr key={row.year}>
                  <td className="px-6 py-3 tabular-nums text-foreground">
                    {row.year}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">
                    {row.count}
                  </td>
                  <td className="px-6 py-3 text-right tabular-nums text-foreground">
                    {formatINR(row.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Full audit trail */}
      <section className="mt-6 rounded-2xl bg-card ring-1 ring-border/60">
        <h2 className="px-6 pt-6 text-sm font-semibold text-foreground">
          Complete activity trail
        </h2>
        <ul className="mt-4 divide-y divide-border/60 px-6 pb-4">
          {activityLog.map((e, k) => (
            <li key={k} className="flex items-baseline gap-4 py-3">
              <span className="w-22 shrink-0 text-xs tabular-nums text-muted-foreground">
                {e.at}
              </span>
              <span className="min-w-0 text-sm text-foreground">
                <span className="text-muted-foreground">{e.actor}</span>
                {" · "}
                {e.action}
                {" · "}
                <span className="font-medium">{e.target}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function MetricCard(props: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-card p-6">
      <p className="text-xs text-muted-foreground">{props.label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums text-foreground">
        {props.value}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">{props.sub}</p>
    </div>
  );
}
