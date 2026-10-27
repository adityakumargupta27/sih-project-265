import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import { daysUntil, type Instrument } from "@/data/demo";

const HORIZON_DAYS = 180;

interface TieredMarker {
  instrument: Instrument;
  offset: number;
  tier: number;
  overdue: boolean;
  days: number;
}

export function MaturityHorizon({
  instruments,
  className,
}: {
  instruments: Instrument[];
  className?: string;
}) {
  const [hoveredRef, setHoveredRef] = useState<string | null>(null);

  const upcoming = instruments
    .filter((i) => {
      const d = daysUntil(i.maturityOn);
      return d >= -14 && d <= HORIZON_DAYS;
    })
    .sort((a, b) => a.maturityOn.localeCompare(b.maturityOn));

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Month grid markers (strictly isolated at the bottom)
  const months = Array.from({ length: 6 }, (_, k) => {
    const d = new Date(now.getFullYear(), now.getMonth() + k, 1);
    return {
      label: d.toLocaleDateString("en-IN", { month: "short" }),
      offset: Math.min(
        1,
        Math.max(0, (d.getTime() - now.getTime()) / (HORIZON_DAYS * 86_400_000)),
      ),
    };
  });

  // Calculate intelligent vertical tiers so close dates never collide
  const markers: TieredMarker[] = [];
  upcoming.slice(0, 8).forEach((inst, idx) => {
    const offset = Math.min(
      0.96,
      Math.max(0.04, daysUntil(inst.maturityOn) / HORIZON_DAYS),
    );
    const d = daysUntil(inst.maturityOn);

    let tier = idx % 2 === 0 ? 0 : 2;
    if (markers.length > 0) {
      const prev = markers[markers.length - 1];
      if (prev && Math.abs(prev.offset - offset) < 0.12) {
        tier = (prev.tier + 1) % 4;
      }
    }

    markers.push({
      instrument: inst,
      offset,
      tier,
      overdue: d <= 0,
      days: d,
    });
  });

  return (
    <div className={cn("select-none", className)}>
      {/* Visual Timeline Track */}
      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-background/50 px-2 py-4">
        {/* Baseline Horizon Line */}
        <div className="absolute top-[88px] left-4 right-4 h-px bg-border/80" />

        {/* 1. Month Ticks (Separated on bottom line so they NEVER collide with labels) */}
        {months.map((m, k) => (
          <div
            key={m.label + k}
            className="absolute top-[88px] flex flex-col items-center"
            style={{
              left: `calc(1rem + ${m.offset} * (100% - 2rem))`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="h-2 w-px bg-border/90" />
            <span className="mt-1 text-[10px] font-medium tracking-wide text-muted-foreground/80">
              {k === 0 ? "Today" : m.label}
            </span>
          </div>
        ))}

        {/* 2. Deposit Milestone Pins with Staggered Heights */}
        {markers.map(({ instrument: i, offset, tier, overdue, days }) => {
          const isHovered = hoveredRef === i.ref;

          const isAbove = tier === 0 || tier === 2;
          const leaderHeight =
            tier === 0 ? "h-14" : tier === 2 ? "h-8" : tier === 1 ? "h-12" : "h-7";
          const labelOffsetClass =
            tier === 0
              ? "-top-[64px]"
              : tier === 2
                ? "-top-[42px]"
                : tier === 1
                  ? "top-[32px]"
                  : "top-[20px]";

          return (
            <div
              key={i.ref}
              className="absolute top-[88px] flex flex-col items-center group cursor-pointer"
              style={{
                left: `calc(1rem + ${offset} * (100% - 2rem))`,
                transform: "translateX(-50%)",
                zIndex: isHovered ? 30 : 10,
              }}
              onMouseEnter={() => setHoveredRef(i.ref)}
              onMouseLeave={() => setHoveredRef(null)}
            >
              {/* Top Label (for Tier 0 & Tier 2) */}
              {isAbove && (
                <div
                  className={cn(
                    "absolute flex flex-col items-center whitespace-nowrap transition-transform duration-150",
                    labelOffsetClass,
                    isHovered ? "scale-105" : "",
                  )}
                >
                  <Link
                    to="/fdr/$id"
                    params={{ id: i.id }}
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-tight shadow-2xs transition-colors",
                      overdue
                        ? "bg-foreground text-background"
                        : "bg-card text-foreground ring-1 ring-border/80 hover:bg-accent",
                    )}
                  >
                    {i.ref}
                  </Link>
                  <span className="text-[9px] tabular-nums text-muted-foreground mt-0.5">
                    {formatDate(i.maturityOn)}
                  </span>
                  <div
                    className={cn(
                      "w-px",
                      leaderHeight,
                      overdue ? "bg-foreground" : "bg-border",
                    )}
                  />
                </div>
              )}

              {/* Central Pin Dot on Baseline */}
              <span
                className={cn(
                  "size-2.5 rounded-full ring-4 transition-all duration-150",
                  isHovered ? "scale-125 ring-primary/30" : "ring-background",
                  overdue
                    ? "bg-foreground"
                    : days <= 15
                      ? "bg-primary"
                      : "bg-foreground/50",
                )}
              />

              {/* Bottom Label (for Tier 1 & Tier 3) */}
              {!isAbove && (
                <div
                  className={cn(
                    "absolute flex flex-col items-center whitespace-nowrap transition-transform duration-150",
                    labelOffsetClass,
                    isHovered ? "scale-105" : "",
                  )}
                >
                  <div
                    className={cn(
                      "w-px",
                      leaderHeight,
                      overdue ? "bg-foreground" : "bg-border",
                    )}
                  />
                  <Link
                    to="/fdr/$id"
                    params={{ id: i.id }}
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-tight shadow-2xs transition-colors mt-0.5",
                      overdue
                        ? "bg-foreground text-background"
                        : "bg-card text-foreground ring-1 ring-border/80 hover:bg-accent",
                    )}
                  >
                    {i.ref}
                  </Link>
                  <span className="text-[9px] tabular-nums text-muted-foreground mt-0.5">
                    {formatDate(i.maturityOn)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Clean Quick-Access Pill Cards Below Horizon */}
      <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-border/40">
        <span className="text-[11px] text-muted-foreground py-1">Upcoming:</span>
        {markers.map(({ instrument: i, overdue, days }) => (
          <Link
            key={i.ref}
            to="/fdr/$id"
            params={{ id: i.id }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-colors",
              hoveredRef === i.ref
                ? "bg-primary text-primary-foreground"
                : "border border-border/60 bg-card text-foreground hover:bg-accent",
            )}
            onMouseEnter={() => setHoveredRef(i.ref)}
            onMouseLeave={() => setHoveredRef(null)}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                overdue
                  ? "bg-foreground"
                  : days <= 15
                    ? "bg-primary"
                    : "bg-muted-foreground",
              )}
            />
            <span className="font-medium">{i.ref}</span>
            <span className="text-[10px] opacity-70 tabular-nums">
              {overdue ? "Matured" : `${days}d`}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
