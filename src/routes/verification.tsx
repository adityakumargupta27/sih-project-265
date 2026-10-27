import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  pendingReviewInstruments,
  institutionById,
  type Instrument,
} from "@/data/demo";
import { formatINR, formatDate, formatPercent, formatTenure } from "@/lib/format";
import { DocumentPreview } from "@/components/document-preview";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/verification")({
  head: () => ({
    meta: [
      { title: "Verification — AICTE FDR Portal" },
      {
        name: "description",
        content:
          "Review pending FDR submissions against intake records and verify discrepancies.",
      },
      { property: "og:title", content: "Verification — AICTE FDR Portal" },
      {
        property: "og:description",
        content:
          "Review pending FDR submissions against intake records and verify discrepancies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VerificationPage,
});

function FieldRow({
  label,
  submitted,
  recorded,
  match,
}: {
  label: string;
  submitted: string;
  recorded: string | null;
  match: boolean | null;
}) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 border-b border-border/40 py-3 last:border-0">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-sm tabular-nums text-foreground">{submitted}</span>
      <span className="text-sm tabular-nums text-foreground">
        {recorded ?? "—"}
      </span>
      <span className="w-14 text-right text-xs font-medium">
        {match === null ? (
          <span className="text-muted-foreground">N/A</span>
        ) : match ? (
          <span className="text-foreground">Match</span>
        ) : (
          <span className="text-primary font-semibold">Differs</span>
        )}
      </span>
    </div>
  );
}

function VerificationPanel({ instrument }: { instrument: Instrument }) {
  const inst = institutionById(instrument.institutionId);
  const rec = instrument.recorded;

  const fdSubmitted = instrument.fdNumber;
  const fdRecorded = rec?.fdNumber ?? null;
  const fdMatch =
    rec?.fdNumber == null ? null : rec.fdNumber === instrument.fdNumber;

  const amtSubmitted = formatINR(instrument.amount);
  const amtRecorded = rec?.amount != null ? formatINR(rec.amount) : null;
  const amtMatch =
    rec?.amount == null ? null : rec.amount === instrument.amount;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[5fr_7fr]">
      {/* Left — Document preview */}
      <DocumentPreview
        instrument={instrument}
        institutionName={inst.name}
      />

      {/* Right — Verification checklist */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {instrument.ref}
          </h2>
          <StatusBadge instrument={instrument} />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
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

        {/* Side-by-side field verification */}
        <div className="mt-6 rounded-xl border border-border bg-card p-5">
          <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 pb-2 text-xs font-semibold text-muted-foreground">
            <span>Field</span>
            <span>Submitted</span>
            <span>Recorded (intake)</span>
            <span className="w-14 text-right">Check</span>
          </div>

          <FieldRow
            label="FD Number"
            submitted={fdSubmitted}
            recorded={fdRecorded}
            match={fdMatch}
          />
          <FieldRow
            label="Amount"
            submitted={amtSubmitted}
            recorded={amtRecorded}
            match={amtMatch}
          />
          <FieldRow
            label="Bank"
            submitted={instrument.bank}
            recorded={instrument.bank}
            match={true}
          />
          <FieldRow
            label="Rate"
            submitted={formatPercent(instrument.rate) + " p.a."}
            recorded={formatPercent(instrument.rate) + " p.a."}
            match={true}
          />
          <FieldRow
            label="Maturity"
            submitted={formatDate(instrument.maturityOn)}
            recorded={formatDate(instrument.maturityOn)}
            match={true}
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Approve
          </button>
          <button
            type="button"
            className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Flag Discrepancy
          </button>
          <button
            type="button"
            className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Bank Inquiry
          </button>
        </div>

        {/* Documents */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-foreground">
            Submitted documents
          </h3>
          <ul className="mt-3 divide-y divide-border/40">
            {instrument.documents.map((doc, k) => (
              <li
                key={k}
                className="flex items-center justify-between gap-4 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-foreground">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.kind}</p>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {formatDate(doc.uploadedOn)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function VerificationPage() {
  const pending = pendingReviewInstruments();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = pending[selectedIdx];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="eyebrow">Verification workspace</p>
      <h1 className="headline mt-2 text-3xl sm:text-4xl">
        Review submissions.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Compare each FDR submission against recorded intake values. Flag
        discrepancies or approve verified records.
      </p>

      {pending.length === 0 ? (
        <div className="mt-12 rounded-2xl ring-1 ring-border/60">
          <EmptyState
            title="All clear"
            description="Every submission has been reviewed. New deposits will appear here when they need verification."
          />
        </div>
      ) : (
        <>
          {/* Tab selector for pending items */}
          <div className="mt-8 flex flex-wrap gap-2">
            {pending.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-colors " +
                  (idx === selectedIdx
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground hover:bg-accent")
                }
              >
                {p.ref}
              </button>
            ))}
          </div>

          {/* Verification panel */}
          {current && (
            <div className="mt-8">
              <VerificationPanel instrument={current} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
