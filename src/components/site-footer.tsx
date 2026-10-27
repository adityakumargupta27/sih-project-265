import { Link } from "@tanstack/react-router";

const columns = [
  {
    heading: "Portal",
    links: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/institutions", label: "Institutions" },
      { to: "/submit", label: "Submit an FDR" },
    ],
  },
  {
    heading: "Records",
    links: [
      { to: "/fdr", label: "FDR Repository" },
      { to: "/verification", label: "Verification" },
      { to: "/maturities", label: "Maturities" },
      { to: "/releases", label: "Release requests" },
      { to: "/reports", label: "Reports" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-tight text-foreground">
            AICTE <span className="font-normal text-muted-foreground">FDR Portal</span>
          </p>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
            Security deposit and Fixed Deposit Receipt records for approved
            technical institutions — organised, verified and tracked through to
            release.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.heading}>
            <p className="text-xs font-semibold text-foreground">{col.heading}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl border-t border-border/60 px-5 py-6">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Preview environment. All institutions, banks, instrument references and
          figures shown are demonstration data and do not represent actual
          financial instruments or verified records.
        </p>
      </div>
    </footer>
  );
}
