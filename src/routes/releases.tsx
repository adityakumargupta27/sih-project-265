import { createFileRoute, Link } from "@tanstack/react-router";
import {
  allReleaseRequests,
  allInstruments,
  institutionById,
  type ReleaseRequest,
} from "@/data/demo";
import { formatINR, formatDate } from "@/lib/format";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/releases")({
  head: () => ({
    meta: [
      { title: "Releases — AICTE FDR Portal" },
      {
        name: "description",
        content:
          "Track security deposit release requests from opening to bank refund.",
      },
      { property: "og:title", content: "Releases — AICTE FDR Portal" },
      {
        property: "og:description",
        content:
          "Track security deposit release requests from opening to bank refund.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReleasesPage,
});

const STEPS = [
  "Regional Office Verification",
  "Executive Approval",
  "Bank Encashment / Release",
] as const;

function stepIndex(request: ReleaseRequest): number {
  if (request.status === "completed") return 3;
  // Determine step based on event count
  const count = request.events.length;
  if (count >= 3) return 2;
  if (count >= 2) return 1;
  return 0;
}

function StepTracker({ request }: { request: ReleaseRequest }) {
  const active = stepIndex(request);

  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, idx) => {
        const completed = idx < active;
        const current = idx === active;
        return (
          <div key={step} className="flex items-center gap-0">
            {idx > 0 && (
              <div
                className={
                  "mx-1 h-px w-8 sm:w-12 " +
                  (completed ? "bg-foreground" : "bg-border")
                }
              />
            )}
            <div className="flex items-center gap-2">
              <span
                className={
                  "grid size-6 place-items-center rounded-full text-[10px] font-bold " +
                  (completed
                    ? "bg-foreground text-background"
                    : current
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground")
                }
              >
                {completed ? "✓" : idx + 1}
              </span>
              <span
                className={
                  "hidden text-xs sm:block " +
                  (completed || current
                    ? "font-medium text-foreground"
                    : "text-muted-foreground")
                }
              >
                {step}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ReleaseCard({ request }: { request: ReleaseRequest }) {
  const instrument = allInstruments.find(
    (i) => i.id === request.instrumentId,
  );
  const inst = instrument ? institutionById(instrument.institutionId) : null;

  return (
    <div className="rounded-2xl bg-card p-6 ring-1 ring-border/60">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {request.ref}
            </h2>
            <span
              className={
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium " +
                (request.status === "completed"
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground")
              }
            >
              {request.status === "completed" ? "Completed" : "Pending"}
            </span>
          </div>
          {instrument && inst && (
            <p className="mt-1 text-sm text-muted-foreground">
              <Link
                to="/fdr/$id"
                params={{ id: instrument.id }}
                className="text-link"
              >
                {instrument.ref}
              </Link>
              {" · "}
              {inst.name} · {formatINR(instrument.amount)}
            </p>
          )}
          <p className="mt-0.5 text-xs text-muted-foreground">
            Requested: {formatDate(request.requestedOn)}
            {request.resolvedOn && ` · Resolved: ${formatDate(request.resolvedOn)}`}
          </p>
        </div>
      </div>

      {/* Step tracker */}
      <div className="mt-5">
        <StepTracker request={request} />
      </div>

      {/* Event timeline */}
      <div className="mt-6">
        <h3 className="text-xs font-semibold text-muted-foreground">
          Timeline
        </h3>
        <ul className="mt-3 space-y-3">
          {request.events.map((event, idx) => (
            <li key={idx} className="flex gap-4">
              <div className="relative flex flex-col items-center">
                <span
                  className={
                    "size-2 rounded-full " +
                    (idx === request.events.length - 1
                      ? "bg-foreground"
                      : "bg-foreground/40")
                  }
                />
                {idx < request.events.length - 1 && (
                  <div className="absolute top-2.5 h-full w-px bg-border" />
                )}
              </div>
              <div className="min-w-0 pb-4">
                <p className="text-sm text-foreground">{event.label}</p>
                <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
                  {formatDate(event.at)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ReleasesPage() {
  const pending = allReleaseRequests.filter(
    (r) => r.status === "pending_review",
  );
  const completed = allReleaseRequests.filter(
    (r) => r.status === "completed",
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="eyebrow">Release requests</p>
      <h1 className="headline mt-2 text-3xl sm:text-4xl">
        Lien release tracker.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Track each release from request opening through verification and bank
        encashment. Every step is logged.
      </p>

      {allReleaseRequests.length === 0 ? (
        <div className="mt-12 rounded-2xl ring-1 ring-border/60">
          <EmptyState
            title="No release requests"
            description="No deposit release requests have been opened yet."
          />
        </div>
      ) : (
        <>
          {/* Pending */}
          {pending.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm font-semibold text-foreground">
                Pending requests
              </h2>
              <div className="mt-4 space-y-5">
                {pending.map((r) => (
                  <ReleaseCard key={r.id} request={r} />
                ))}
              </div>
            </section>
          )}

          {/* Completed */}
          {completed.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm font-semibold text-foreground">
                Completed
              </h2>
              <div className="mt-4 space-y-5">
                {completed.map((r) => (
                  <ReleaseCard key={r.id} request={r} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
