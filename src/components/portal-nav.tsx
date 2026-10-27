import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Overview" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/institutions", label: "Institutions" },
  { to: "/fdr", label: "Repository" },
  { to: "/verification", label: "Verification" },
  { to: "/maturities", label: "Maturities" },
  { to: "/releases", label: "Releases" },
  { to: "/reports", label: "Reports" },
] as const;

export function PortalNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-11 max-w-6xl items-center gap-8 px-5">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="shrink-0 text-[13px] font-semibold tracking-tight text-foreground"
        >
          AICTE <span className="font-normal text-muted-foreground">FDR Portal</span>
        </Link>

        <div className="hidden min-w-0 items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={
                "text-xs transition-colors " +
                (isActive(l.to)
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <Link
            to="/submit"
            className="hidden rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:block"
          >
            Submit FDR
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-8 place-items-center rounded-full text-foreground transition-colors hover:bg-accent lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/70 bg-card px-5 py-3 lg:hidden">
          <div className="grid gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={
                  "rounded-md px-3 py-2 text-sm transition-colors " +
                  (isActive(l.to)
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:bg-accent")
                }
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/submit"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              Submit FDR
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
