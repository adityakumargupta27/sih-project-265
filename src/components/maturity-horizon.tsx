import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import { daysUntil, type Instrument } from "@/data/demo";

const HORIZON_DAYS = 180;

/**
 * Horizontal deadline horizon: today at the left edge, six months out on the
 * right. Month ticks give scale; each upcoming maturity is a marker.
 */
export function MaturityHorizon({
  instruments,
  className,
}: {
  instruments: Instrument[];
  className?: string;
}) {
  const upcoming = instruments
    .filter((i) => {
      const d = daysUntil(i.maturityOn);
      return d >= -14 && d <= HORIZON_DAYS;
    })
    .sort((a, b) => a.maturityOn.localeCompare(b.maturityOn));

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const months = Array.from({ length: 6 }, (_, k) => {
    const d = new Date(now.getFullYear(), now.getMonth() + k, 1);
    return {
      label: d.toLocaleDateString("en-IN", { month: "short" }),
      offset: (d.getTime() - now.getTime()) / (HORIZON_DAYS * 86_400_000),
    };
  });

  const markers = upcoming.slice(0, 7);

  return (
    <div className={cn("select-none", className)}>
      <div className="relative h-36">
        {/* baseline */}
        <div className="absolute top-16 left-0 h-px w-full bg-border" />

        {/* month ticks */}
        {months.map((m, k) => (
          <div
            key={m.label + k}
            className="absolute top-16 flex flex-col items-center"
            style={{ left: `${m.offset * 100}%`, transform: "translateX(-50%)" }}
          >
            <div className="h-2 w-px bg-border" />
            <span className="mt-1 text-[10px] text-muted-foreground">
              {k === 0 ? "Today" : m.label}
            </span>
          </div>
        ))}

        {/* markers */}
        {markers.map((i, k) => {
          const offset =
            Math.max(0, daysUntil(i.maturityOn)) / HORIZON_DAYS;
          const overdue = daysUntil(i.maturityOn) < 0;
          const stackUp = k % 2 === 0;
          return (
            <div
              key={i.ref}
              className="absolute top-16 flex flex-col items-center"
              style={{ left: `${offset * 100}%`, transform: "translateX(-50%)" }}
            >
              {stackUp && (
                <div className="mb-2 flex flex-col items-center whitespace-nowrap">
                  <span className="text-[11px] font-medium text-foreground">
                    {i.ref}
                  </span>
                  <span className="text-[10px] tabular-nums text-muted-foreground">
                    {formatDate(i.maturityOn)}
                  </span>
                  <div
                    className={
                      "mt-1 h-6 w-px " +
                      (overdue ? "bg-foreground" : "bg-foreground/30")
                    }
                  />
                </div>
              )}
              <span
                className={cn(
                  "size-2.5 rounded-full ring-4 ring-background",
                  overdue
                    ? "bg-foreground"
                    : daysUntil(i.maturityOn) <= 10
                      ? "bg-primary"
                      : "bg-foreground/40",
                )}
              />
              {!stackUp && (
                <div className="mt-1 flex flex-col items-center whitespace-nowrap">
                  <div className="h-6 w-px bg-foreground/30" />
                  <span className="text-[11px] font-medium text-foreground">
                    {i.ref}
                  </span>
                  <span className="text-[10px] tabular-nums text-muted-foreground">
                    {formatDate(i.maturityOn)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
