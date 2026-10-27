import {
  effectiveStatus,
  heldInstruments,
  holdingsByBank,
  statusLabel,
  type EffectiveStatus,
} from "@/data/demo";
import { formatINRCompact } from "@/lib/format";

const ramp: Record<EffectiveStatus, string> = {
  matured: "bg-foreground",
  maturing_soon: "bg-foreground/70",
  active: "bg-foreground/40",
  pending_verification: "bg-foreground/20",
  released: "bg-foreground/10",
};

const order: EffectiveStatus[] = [
  "active",
  "maturing_soon",
  "matured",
  "pending_verification",
  "released",
];

export function StatusRamp({ title = "Status distribution" }: { title?: string }) {
  const items = heldInstruments();
  const counts = new Map<EffectiveStatus, number>();
  for (const i of items) {
    const s = effectiveStatus(i);
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  const total = items.length || 1;

  return (
    <section className="rounded-2xl bg-card p-6 ring-1 ring-border/60">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <div className="mt-4 flex h-2.5 gap-px overflow-hidden rounded-full bg-muted">
        {order.map((s) =>
          counts.get(s) ? (
            <div
              key={s}
              className={ramp[s]}
              style={{ width: `${((counts.get(s) ?? 0) / total) * 100}%` }}
            />
          ) : null,
        )}
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {order.map((s) => (
          <div key={s} className="flex items-center gap-2.5">
            <span className={`size-2 rounded-full shrink-0 ${ramp[s]}`} />
            <dt className="text-xs text-muted-foreground">{statusLabel[s]}</dt>
            <dd className="ml-auto text-xs font-medium tabular-nums text-foreground">
              {counts.get(s) ?? 0}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function BankBars({ title = "Holdings by bank" }: { title?: string }) {
  const rows = holdingsByBank();
  const max = Math.max(...rows.map((r) => r.total), 1);

  return (
    <section className="rounded-2xl bg-card p-6 ring-1 ring-border/60">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <div className="mt-5 space-y-5">
        {rows.map((r) => (
          <div key={r.bank} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5">
            <span className="min-w-0 truncate text-xs text-foreground">
              {r.bank}
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">
              {r.count} · {formatINRCompact(r.total)}
            </span>
            <div className="col-span-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-foreground/70"
                style={{ width: `${(r.total / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
