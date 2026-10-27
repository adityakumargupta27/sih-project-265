import { cn } from "@/lib/utils";
import { effectiveStatus, statusLabel, type Instrument, type EffectiveStatus } from "@/data/demo";

const styles: Record<string, string> = {
  active: "bg-muted text-muted-foreground",
  maturing_soon: "bg-accent text-accent-foreground",
  matured: "bg-primary text-primary-foreground",
  pending_verification: "bg-card text-foreground ring-1 ring-inset ring-border",
  released: "bg-background text-muted-foreground ring-1 ring-inset ring-border",
};

export function StatusBadge({
  instrument,
  className,
}: {
  instrument: Instrument;
  className?: string;
}) {
  const status = effectiveStatus(instrument);
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        styles[status],
        className,
      )}
    >
      {statusLabel[status]}
    </span>
  );
}

export function StatusBadgeFor({
  status,
  className,
}: {
  status: EffectiveStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        styles[status],
        className,
      )}
    >
      {statusLabel[status]}
    </span>
  );
}
