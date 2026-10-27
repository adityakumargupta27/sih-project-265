import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  allInstruments,
  allInstitutions,
  BANKS,
  effectiveStatus,
  statusLabel,
  institutionById,
  type EffectiveStatus,
} from "@/data/demo";
import { formatINR, formatDate, formatPercent } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";

export const Route = createFileRoute("/fdr/")({
  head: () => ({
    meta: [
      { title: "FDR Repository — AICTE FDR Portal" },
      {
        name: "description",
        content:
          "Browse all Fixed Deposit Receipt records with filters for status, bank, and search.",
      },
      { property: "og:title", content: "FDR Repository — AICTE FDR Portal" },
      {
        property: "og:description",
        content:
          "Browse all Fixed Deposit Receipt records with filters for status, bank, and search.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FdrRepositoryPage,
});

const STATUS_FILTERS: Array<{ value: "all" | EffectiveStatus; label: string }> =
  [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "maturing_soon", label: "Maturing Soon" },
    { value: "matured", label: "Matured" },
    { value: "pending_verification", label: "Pending Verification" },
    { value: "released", label: "Released" },
  ];

function FdrRepositoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | EffectiveStatus>(
    "all",
  );
  const [bankFilter, setBankFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return allInstruments.filter((i) => {
      // Status filter
      if (statusFilter !== "all" && effectiveStatus(i) !== statusFilter)
        return false;

      // Bank filter
      if (bankFilter !== "all" && i.bank !== bankFilter) return false;

      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const inst = institutionById(i.institutionId);
        if (
          !i.fdNumber.toLowerCase().includes(q) &&
          !i.ref.toLowerCase().includes(q) &&
          !inst.name.toLowerCase().includes(q)
        )
          return false;
      }

      return true;
    });
  }, [search, statusFilter, bankFilter]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="eyebrow">FDR Repository</p>
      <h1 className="headline mt-2 text-3xl sm:text-4xl">
        All deposit instruments.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Search, filter and review every submitted Fixed Deposit Receipt across
        all institutions.
      </p>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-end gap-4">
        <div className="min-w-0 flex-1">
          <label
            htmlFor="fdr-search"
            className="block text-xs font-medium text-muted-foreground"
          >
            Search
          </label>
          <input
            id="fdr-search"
            type="text"
            placeholder="FDR number or institution name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label
            htmlFor="fdr-status"
            className="block text-xs font-medium text-muted-foreground"
          >
            Status
          </label>
          <select
            id="fdr-status"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | EffectiveStatus)
            }
            className="mt-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {STATUS_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="fdr-bank"
            className="block text-xs font-medium text-muted-foreground"
          >
            Bank
          </label>
          <select
            id="fdr-bank"
            value={bankFilter}
            onChange={(e) => setBankFilter(e.target.value)}
            className="mt-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All banks</option>
            {BANKS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="mt-4 text-xs tabular-nums text-muted-foreground">
        {filtered.length} of {allInstruments.length} records
      </p>

      {/* Table */}
      <div className="mt-4 overflow-x-auto rounded-2xl ring-1 ring-border/60">
        <table className="w-full min-w-[900px] border-collapse bg-card text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-6 py-4 font-medium">Ref ID</th>
              <th className="px-4 py-4 font-medium">Institution</th>
              <th className="px-4 py-4 font-medium">Bank</th>
              <th className="px-4 py-4 font-medium">FDR No.</th>
              <th className="px-4 py-4 text-right font-medium">Amount</th>
              <th className="px-4 py-4 text-right font-medium">Rate</th>
              <th className="px-4 py-4 font-medium">Maturity</th>
              <th className="px-4 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium" aria-label="Open" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filtered.map((i) => {
              const inst = institutionById(i.institutionId);
              return (
                <tr
                  key={i.id}
                  className="transition-colors hover:bg-accent/60"
                >
                  <td className="px-6 py-4 font-medium tabular-nums text-foreground">
                    {i.ref}
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-foreground">{inst.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {inst.code}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{i.bank}</td>
                  <td className="px-4 py-4 tabular-nums text-foreground">
                    {i.fdNumber}
                  </td>
                  <td className="px-4 py-4 text-right tabular-nums text-foreground">
                    {formatINR(i.amount)}
                  </td>
                  <td className="px-4 py-4 text-right tabular-nums text-foreground">
                    {formatPercent(i.rate)}
                  </td>
                  <td className="px-4 py-4 tabular-nums text-muted-foreground">
                    {formatDate(i.maturityOn)}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge instrument={i} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to="/fdr/$id"
                      params={{ id: i.id }}
                      className="text-link whitespace-nowrap text-xs font-medium"
                    >
                      View &rarr;
                    </Link>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-6 py-16 text-center text-sm text-muted-foreground"
                >
                  No instruments match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
