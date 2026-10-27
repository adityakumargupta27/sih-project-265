import { createFileRoute, Link } from "@tanstack/react-router";
import {
  activityLog,
  heldInstruments,
  heldValue,
  maturedAwaitingRelease,
  maturingWithin,
  pendingReviewInstruments,
  instrumentByRef,
} from "@/data/demo";
import { formatINR, formatINRCompact, todayISO } from "@/lib/format";
import { MaturityHorizon } from "@/components/maturity-horizon";
import { BankBars, StatusRamp } from "@/components/distributions";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — AICTE FDR Portal" },
      {
        name: "description",
        content: "Current holdings, pending reviews, action queue and recent activity across the FDR portfolio.",
      },
      { property: "og:title", content: "Dashboard — AICTE FDR Portal" },
      { property: "og:description", content: "Current holdings, pending reviews, action queue and recent activity across the FDR portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const held = heldInstruments();
  const pending = pendingReviewInstruments();
  const in90 = maturingWithin(90);
  const awaiting = maturedAwaitingRelease();
  const nearest = [...in90].sort((a, b) => a.maturityOn.localeCompare(b.maturityOn))[0];

  type QueueItem =
    | { title: string; detail: string; to: "/releases" | "/verification"; params?: undefined; cta: string }
    | { title: string; detail: string; to: "/fdr/$id"; params: { id: string }; cta: string };

  const queue: QueueItem[] = [
    ...awaiting.map((i) => ({
      title: `${i.ref} matured — create release request`,
      detail: `${i.bank} · ${formatINR(i.amount)} · maturity ${i.maturityOn}`,
      to: "/fdr/$id" as const,
      params: { id: i.id },
      cta: "Open instrument",
    })),
    {
      title: "RR-2026-011 awaiting approval",
      detail: "Release request for FDR-2024-0071 · documents reviewed",
      to: "/releases" as const,
      cta: "Review request",
    },
    ...pending.map((i) => ({
      title: `${i.ref} needs verification`,
      detail: i.reviewNote ?? "Review the submission against intake records.",
      to: "/verification" as const,
      cta: "Open workspace",
    })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="eyebrow">Dashboard</p>
          <h1 className="headline mt-2 text-3xl sm:text-4xl">
            Your portfolio at a glance.
          </h1>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs tabular-nums text-muted-foreground">
            {todayISO()}
          </p>
          <Link to="/submit" className="text-link mt-1 inline-block text-sm">
            Submit an FDR &rarr;
          </Link>
        </div>
      </header>

      {/* Metrics on a common baseline */}
      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border/60 sm:grid-cols-2 lg:grid-cols-4">
        <Metric
          label="Held deposits"
          value={String(held.length)}
          sub={`${formatINRCompact(heldValue())} total value`}
        />
        <Metric
          label="Pending review"
          value={String(pending.length)}
          sub="Awaiting verification"
        />
        <Metric
          label="Maturing in 90 days"
          value={String(in90.length)}
          sub={nearest ? `Nearest ${nearest.maturityOn}` : "None scheduled"}
        />
        <Metric
          label="Awaiting release"
          value={String(awaiting.length)}
          sub="Matured, refund pending"
        />
      </div>

      {/* Maturity horizon */}
      <section className="mt-6 rounded-2xl bg-card p-6 ring-1 ring-border/60">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <h2 className="min-w-0 text-sm font-semibold text-foreground">
            Maturity horizon — next six months
          </h2>
          <Link to="/maturities" className="text-link shrink-0 text-sm">
            All maturities &rarr;
          </Link>
        </div>
        <MaturityHorizon instruments={held} className="mt-4" />
      </section>

      {/* Distribution */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <BankBars />
        <StatusRamp />
      </div>

      {/* Action queue */}
      <section className="mt-6 rounded-2xl bg-card ring-1 ring-border/60">
        <h2 className="px-6 pt-6 text-sm font-semibold text-foreground">
          Needs attention
        </h2>
        <ul className="mt-2 divide-y divide-border/60">
          {queue.map((item, k) => (
            <li
              key={k}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                  {item.detail}
                </p>
              </div>
              {item.to === "/fdr/$id" ? (
                <Link
                  to="/fdr/$id"
                  params={item.params}
                  className="text-link shrink-0 text-xs font-medium"
                >
                  {item.cta} &rarr;
                </Link>
              ) : (
                <Link
                  to={item.to}
                  className="text-link shrink-0 text-xs font-medium"
                >
                  {item.cta} &rarr;
                </Link>
              )}
            </li>
          ))}
          {queue.length === 0 && (
            <li className="px-6 py-10 text-center text-sm text-muted-foreground">
              Nothing needs attention right now.
            </li>
          )}
        </ul>
      </section>

      {/* Recent activity */}
      <section className="mt-6 rounded-2xl bg-card ring-1 ring-border/60">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-6 pt-6">
          <h2 className="min-w-0 text-sm font-semibold text-foreground">
            Recent activity
          </h2>
          <Link to="/reports" className="text-link shrink-0 text-sm">
            Full audit trail &rarr;
          </Link>
        </div>
        <ul className="mt-2 divide-y divide-border/60 px-6 pb-2">
          {activityLog.slice(0, 8).map((e, k) => (
            <li key={k} className="flex items-baseline gap-4 py-3">
              <span className="w-20 shrink-0 text-xs tabular-nums text-muted-foreground">
                {e.at}
              </span>
              <span className="min-w-0 text-sm text-foreground">
                <span className="text-muted-foreground">{e.actor}</span>
                {" · "}
                {e.action}
                {instrumentByRef(e.target) ? " · " : ""}
                {instrumentByRef(e.target) && (
                  <Link
                    to="/fdr/$id"
                    params={{ id: instrumentByRef(e.target)!.id }}
                    className="text-link ml-1"
                  >
                    {e.target}
                  </Link>
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Metric(props: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-card p-6">
      <p className="text-xs text-muted-foreground">{props.label}</p>
      <p className="mt-3 text-4xl font-semibold tracking-tight tabular-nums text-foreground">
        {props.value}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">{props.sub}</p>
    </div>
  );
}
