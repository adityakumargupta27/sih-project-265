import { cn } from "@/lib/utils";
import {
  formatDate,
  formatINR,
  formatPercent,
  formatTenure,
} from "@/lib/format";
import type { Instrument } from "@/data/demo";

/**
 * Paper-style preview of an FDR certificate. Content is rendered from the
 * demonstration dataset — clearly a sample record, no seals or signatures.
 */
export function DocumentPreview({
  instrument,
  institutionName,
  className,
}: {
  instrument: Instrument;
  institutionName: string;
  className?: string;
}) {
  const rows: [string, string][] = [
    ["Receipt no.", instrument.fdNumber],
    ["Institution", institutionName],
    ["Deposit amount", formatINR(instrument.amount)],
    ["Rate of interest", formatPercent(instrument.rate) + " p.a."],
    ["Date of issue", formatDate(instrument.issuedOn)],
    ["Date of maturity", formatDate(instrument.maturityOn)],
    ["Tenure", formatTenure(instrument.issuedOn, instrument.maturityOn)],
  ];

  return (
    <figure className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="aspect-[210/297] w-full p-7 sm:p-9">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {instrument.bank}
          </p>
          <h3 className="mt-4 text-center text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Fixed Deposit Receipt
          </h3>
          <div className="mx-auto mt-4 h-px w-16 bg-border" />

          <dl className="mt-8 space-y-4">
            {rows.map(([label, value]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4 border-b border-border/50 pb-3 last:border-0"
              >
                <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {label}
                </dt>
                <dd className="text-right text-[13px] font-medium tabular-nums text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-center text-[10px] text-muted-foreground">
            Sample record — demonstration data
          </p>
        </div>
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="truncate">{instrument.documents[0]?.name}</span>
        <span className="shrink-0 tabular-nums">
          Uploaded {formatDate(instrument.submittedOn)}
        </span>
      </figcaption>
    </figure>
  );
}
