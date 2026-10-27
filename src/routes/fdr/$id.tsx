import { createFileRoute, Link } from "@tanstack/react-router";
import {
  allInstruments,
  institutionById,
  effectiveStatus,
  statusLabel,
  activityLog,
  releaseRequestFor,
  daysUntil,
} from "@/data/demo";
import {
  formatINR,
  formatDate,
  formatDateLong,
  formatPercent,
  formatTenure,
} from "@/lib/format";
import { DocumentPreview } from "@/components/document-preview";
import { StatusBadge } from "@/components/status-badge";

export const Route = createFileRoute("/fdr/$id")({
  head: ({ params }) => {
    const instrument = allInstruments.find((i) => i.id === params.id);
    const title = instrument
      ? `${instrument.ref} — AICTE FDR Portal`
      : "Instrument — AICTE FDR Portal";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `Detailed view of Fixed Deposit Receipt ${instrument?.ref ?? params.id}.`,
        },
        { property: "og:title", content: title },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: FdrDetailPage,
});

function FdrDetailPage() {
  const { id } = Route.useParams();
  const instrument = allInstruments.find((i) => i.id === id);

  if (!instrument) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-24 text-center">
        <h1 className="headline text-3xl">Instrument not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          No deposit record matches the ID <code>{id}</code>.
        </p>
        <Link
          to="/fdr"
          className="text-link mt-5 inline-block text-sm"
        >
          &larr; Back to repository
        </Link>
      </div>
    );
  }

  const inst = institutionById(instrument.institutionId);
  const status = effectiveStatus(instrument);
  const release = releaseRequestFor(instrument.id);
  const days = daysUntil(instrument.maturityOn);

  const specs: [string, string][] = [
    ["Reference", instrument.ref],
    ["Institution", inst.name],
    ["Bank", instrument.bank],
    ["FDR Number", instrument.fdNumber],
    ["Principal amount", formatINR(instrument.amount)],
    ["Rate of interest", formatPercent(instrument.rate) + " p.a."],
    ["Issued on", formatDateLong(instrument.issuedOn)],
    ["Maturity date", formatDateLong(instrument.maturityOn)],
    ["Tenure", formatTenure(instrument.issuedOn, instrument.maturityOn)],
    [
      "Days to maturity",
      days > 0 ? `${days} days` : days === 0 ? "Today" : `Overdue by ${Math.abs(days)} days`,
    ],
    [
      "Lien clause",
      "Marked in favour of Member Secretary, AICTE",
    ],
    ["Issuing branch", `${instrument.bank} — branch details on certificate`],
    ["Submitted on", formatDate(instrument.submittedOn)],
    ["Verification", instrument.review === "verified" ? "Verified" : "Pending review"],
  ];

  if (instrument.releasedOn) {
    specs.push(["Released on", formatDate(instrument.releasedOn)]);
  }
  if (instrument.releaseRef) {
    specs.push(["Release reference", instrument.releaseRef]);
  }

  // Activity entries referencing this instrument
  const related = activityLog.filter(
    (e) => e.target === instrument.ref || e.target === instrument.releaseRef,
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <Link to="/fdr" className="text-link text-sm">
        &larr; Back to repository
      </Link>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[5fr_7fr]">
        {/* Left — Document preview */}
        <DocumentPreview
          instrument={instrument}
          institutionName={inst.name}
          className="sticky top-20"
        />

        {/* Right — Specification card */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="headline text-2xl sm:text-3xl">{instrument.ref}</h1>
            <StatusBadge instrument={instrument} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {inst.name} · {inst.city}
          </p>

          {/* Review note */}
          {instrument.reviewNote && (
            <div className="mt-5 rounded-xl border border-border bg-muted/40 px-5 py-4">
              <p className="text-xs font-semibold text-foreground">
                Review note
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {instrument.reviewNote}
              </p>
            </div>
          )}

          {/* Spec table */}
          <dl className="mt-6 space-y-3.5">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4 border-b border-border/40 pb-3 last:border-0"
              >
                <dt className="shrink-0 text-xs uppercase tracking-wide text-muted-foreground">
                  {label}
                </dt>
                <dd className="text-right text-sm font-medium text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Documents */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-foreground">
              Documents
            </h2>
            <ul className="mt-3 divide-y divide-border/40">
              {instrument.documents.map((doc, k) => (
                <li
                  key={k}
                  className="flex items-center justify-between gap-4 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-foreground">
                      {doc.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{doc.kind}</p>
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {formatDate(doc.uploadedOn)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Activity history */}
          {related.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-foreground">
                Activity history
              </h2>
              <ul className="mt-3 divide-y divide-border/40">
                {related.map((e, k) => (
                  <li key={k} className="flex items-baseline gap-4 py-2.5">
                    <span className="w-22 shrink-0 text-xs tabular-nums text-muted-foreground">
                      {e.at}
                    </span>
                    <span className="text-sm text-foreground">
                      <span className="text-muted-foreground">{e.actor}</span>
                      {" · "}
                      {e.action}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Release request link */}
          {release && (
            <div className="mt-6">
              <Link to="/releases" className="text-link text-sm font-medium">
                Open release request {release.ref} &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
