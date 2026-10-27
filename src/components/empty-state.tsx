import type { ReactNode } from "react";

/** Restrained document illustration shared by empty states. */
export function DocumentGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className ?? "h-24 w-24 text-border"}
    >
      <rect x="36" y="20" width="48" height="76" rx="5" className="fill-card" />
      <rect
        x="36"
        y="20"
        width="48"
        height="76"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M70 20v14h14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M46 50h22M46 60h28M46 70h28M46 80h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="46" cy="36" r="4" className="fill-muted" />
    </svg>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <DocumentGlyph />
      <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
