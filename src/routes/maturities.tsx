import { createFileRoute, Link } from "@tanstack/react-router";
import {
  heldInstruments,
  institutionById,
  effectiveStatus,
  daysUntil,
  type Instrument,
} from "@/data/demo";
import { formatINR, formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";
import { MaturityHorizon } from "@/components/maturity-horizon";
import { EmptyState } from "@/components/empty-state";
import { useState } from "react";

export const Route = createFileRoute("/maturities")({
  head: () => ({
    meta: [
      { title: "Maturities — AICTE FDR Portal" },
      {
        name: "description",
        content:
          "Track upcoming deposit maturities with timeline buckets and renewal actions.",
      },
      { property: "og:title", content: "Maturities — AICTE FDR Portal" },
      {
        property: "og:description",
        content:
          "Track upcoming deposit maturities with timeline buckets and renewal actions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MaturitiesPage,
});

type Bucket = "overdue" | "30" | "60" | "90";

const BUCKET_META: Record<Bucket, { label: string; description: string }> = {
  overdue: { label: "Already Matured", description: "Deposits past maturity date awaiting action" },
  "30": { label: "Within 30 Days", description: "Maturing in the next 30 days" },
  "60": { label: "30–60 Days", description: "Maturing between 30 and 60 days from now" },
  "90": { label: "60–90 Days", description: "Maturing between 60 and 90 days from now" },
};

function bucketFor(i: Instrument): Bucket | null {
  const d = daysUntil(i.maturityOn);
  if (d <= 0) return "overdue";
  if (d <= 30) return "30";
  if (d <= 60) return "60";
  if (d <= 90) return "90";
  return null;
}

function InstrumentRow({ instrument }: { instrument: Instrument }) {
  const inst = institutionById(instrument.institutionId);
  const d = daysUntil(instrument.maturityOn);
  const overdue = d <= 0;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/fdr/$id"
            params={{ id: instrument.id }}
            className="text-sm font-medium text-foreground hover:underline"
          >
            {instrument.ref}
          </Link>
          <StatusBadge instrument={instrument} />
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {inst.name} · {instrument.bank} · {formatINR(instrument.amount)}
        </p>
        <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
          Maturity: {formatDate(instrument.maturityOn)}
          {overdue
            ? ` · Overdue by ${Math.abs(d)} days`
            : ` · ${d} days remaining`}
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        {overdue ? (
          <Link
            to="/releases"
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Initiate Release
          </Link>
        ) : (
          <Link
            to="/fdr/$id"
            params={{ id: instrument.id }}
            className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          >
            Renew Fixed Deposit
          </Link>
        )}
      </div>
    </div>
  );
}

function MaturitiesPage() {
  const held = heldInstruments();
  const [activeBucket, setActiveBucket] = useState<Bucket>("overdue");

  const buckets: Record<Bucket, Instrument[]> = {
    overdue: [],
    "30": [],
    "60": [],
    "90": [],
  };

  for (const i of held) {
    const b = bucketFor(i);
    if (b) buckets[b].push(i);
  }

  // Sort each bucket by maturity date
  for (const b of Object.values(buckets)) {
    b.sort((a, z) => a.maturityOn.localeCompare(z.maturityOn));
  }

  const bucketKeys: Bucket[] = ["overdue", "30", "60", "90"];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="eyebrow">Maturity monitoring</p>
      <h1 className="headline mt-2 text-3xl sm:text-4xl">
        Expiration timeline.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        A rolling horizon of approaching and past-due deposit maturities.
      </p>

      {/* Visual horizon */}
      <section className="mt-8 rounded-2xl bg-card p-6 ring-1 ring-border/60">
        <h2 className="text-sm font-semibold text-foreground">
          Maturity horizon — next six months
        </h2>
        <MaturityHorizon instruments={held} className="mt-4" />
      </section>

      {/* Bucket tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {bucketKeys.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveBucket(key)}
            className={
              "rounded-full px-4 py-2 text-xs font-medium transition-colors " +
              (key === activeBucket
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-foreground hover:bg-accent")
            }
          >
            {BUCKET_META[key].label}
            <span className="ml-1.5 tabular-nums opacity-70">
              ({buckets[key].length})
            </span>
          </button>
        ))}
      </div>

      {/* Bucket content */}
      <section className="mt-6 rounded-2xl bg-card ring-1 ring-border/60">
        <div className="px-6 pt-6">
          <h2 className="text-sm font-semibold text-foreground">
            {BUCKET_META[activeBucket].label}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {BUCKET_META[activeBucket].description}
          </p>
        </div>

        {buckets[activeBucket].length === 0 ? (
          <EmptyState
            title="No deposits"
            description={`No deposits fall into the "${BUCKET_META[activeBucket].label}" window.`}
          />
        ) : (
          <ul className="mt-4 divide-y divide-border/60 pb-2">
            {buckets[activeBucket].map((i) => (
              <li key={i.id}>
                <InstrumentRow instrument={i} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
