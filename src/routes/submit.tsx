import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { allInstitutions, BANKS, type Institution } from "@/data/demo";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit FDR — AICTE FDR Portal" },
      {
        name: "description",
        content:
          "Guided 5-step form to submit a new Fixed Deposit Receipt for an approved institution.",
      },
      { property: "og:title", content: "Submit FDR — AICTE FDR Portal" },
      {
        property: "og:description",
        content:
          "Guided 5-step form to submit a new Fixed Deposit Receipt for an approved institution.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SubmitPage,
});

const STEP_LABELS = [
  "Institution",
  "FDR Particulars",
  "Lien & Upload",
  "Declaration",
  "Confirmation",
] as const;

type FormData = {
  institutionId: string;
  bank: string;
  fdNumber: string;
  amount: string;
  rate: string;
  issuedOn: string;
  maturityOn: string;
  file: File | null;
  declared: boolean;
};

const initial: FormData = {
  institutionId: "",
  bank: "",
  fdNumber: "",
  amount: "",
  rate: "",
  issuedOn: "",
  maturityOn: "",
  file: null,
  declared: false,
};

function SubmitPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [trackingRef, setTrackingRef] = useState("");

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const selectedInst = allInstitutions.find(
    (i) => i.id === form.institutionId,
  );

  const handleSubmit = () => {
    const ref = `FDR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000 + 1000))}`;
    setTrackingRef(ref);
    setSubmitted(true);
    setStep(4);
  };

  if (submitted && step === 4) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-muted">
          <span className="text-2xl">✓</span>
        </div>
        <h1 className="headline mt-6 text-3xl">Submission received.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your FDR submission has been recorded. The review team will verify the
          documents against intake records.
        </p>
        <div className="mt-6 rounded-xl border border-border bg-card px-6 py-5">
          <p className="text-xs text-muted-foreground">Tracking reference</p>
          <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
            {trackingRef}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/fdr"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Go to Repository
          </Link>
          <Link
            to="/dashboard"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const filteredInstitutions = search.trim()
    ? allInstitutions.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.code.toLowerCase().includes(search.toLowerCase()),
      )
    : allInstitutions;

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <p className="eyebrow">Submit FDR</p>
      <h1 className="headline mt-2 text-3xl sm:text-4xl">
        New deposit submission.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Complete all five steps to submit a Fixed Deposit Receipt for
        verification.
      </p>

      {/* Step indicator */}
      <div className="mt-8 flex items-center gap-0">
        {STEP_LABELS.map((label, idx) => (
          <div key={label} className="flex items-center gap-0">
            {idx > 0 && (
              <div
                className={
                  "mx-1 h-px w-6 sm:w-10 " +
                  (idx <= step ? "bg-foreground" : "bg-border")
                }
              />
            )}
            <div className="flex items-center gap-1.5">
              <span
                className={
                  "grid size-6 place-items-center rounded-full text-[10px] font-bold " +
                  (idx < step
                    ? "bg-foreground text-background"
                    : idx === step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground")
                }
              >
                {idx < step ? "✓" : idx + 1}
              </span>
              <span
                className={
                  "hidden text-xs sm:block " +
                  (idx <= step
                    ? "font-medium text-foreground"
                    : "text-muted-foreground")
                }
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="mt-8 rounded-2xl bg-card p-6 ring-1 ring-border/60 sm:p-8">
        {/* Step 0: Institution Selection */}
        {step === 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Select institution
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search and select the institution submitting the deposit.
            </p>
            <input
              type="text"
              placeholder="Search by name or code…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-4 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <ul className="mt-4 max-h-64 space-y-1 overflow-y-auto">
              {filteredInstitutions.map((inst) => (
                <li key={inst.id}>
                  <button
                    type="button"
                    onClick={() => set("institutionId", inst.id)}
                    className={
                      "w-full rounded-lg px-4 py-3 text-left text-sm transition-colors " +
                      (form.institutionId === inst.id
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent")
                    }
                  >
                    <p className="font-medium">{inst.name}</p>
                    <p
                      className={
                        "mt-0.5 text-xs " +
                        (form.institutionId === inst.id
                          ? "opacity-70"
                          : "text-muted-foreground")
                      }
                    >
                      {inst.code} · {inst.city} · {inst.category}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Step 1: FDR Particulars */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              FDR Particulars
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the details from the Fixed Deposit Receipt.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Bank">
                <select
                  value={form.bank}
                  onChange={(e) => set("bank", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select bank</option>
                  {BANKS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="FDR Number">
                <input
                  type="text"
                  placeholder="e.g. ECB/26/2214"
                  value={form.fdNumber}
                  onChange={(e) => set("fdNumber", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </Field>
              <Field label="Amount (₹)">
                <input
                  type="number"
                  placeholder="2500000"
                  value={form.amount}
                  onChange={(e) => set("amount", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm tabular-nums text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </Field>
              <Field label="Rate (% p.a.)">
                <input
                  type="number"
                  step="0.01"
                  placeholder="7.10"
                  value={form.rate}
                  onChange={(e) => set("rate", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm tabular-nums text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </Field>
              <Field label="Issued On">
                <input
                  type="date"
                  value={form.issuedOn}
                  onChange={(e) => set("issuedOn", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </Field>
              <Field label="Maturity On">
                <input
                  type="date"
                  value={form.maturityOn}
                  onChange={(e) => set("maturityOn", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </Field>
            </div>
          </div>
        )}

        {/* Step 2: Lien & Upload */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Joint Lien & Scan Upload
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload the scanned FDR certificate and covering letter.
            </p>
            <div className="mt-6 rounded-xl border-2 border-dashed border-border bg-background p-8 text-center">
              <div className="mx-auto grid size-12 place-items-center rounded-full bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm text-foreground">
                Drop files here or{" "}
                <label className="text-link cursor-pointer font-medium">
                  browse
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) =>
                      set("file", e.target.files?.[0] ?? null)
                    }
                    className="sr-only"
                  />
                </label>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                PDF or image, max 10 MB
              </p>
              {form.file && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm text-foreground">
                  <span className="truncate max-w-[200px]">
                    {form.file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => set("file", null)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            <div className="mt-5 rounded-xl border border-border bg-muted/40 px-5 py-4">
              <p className="text-xs font-semibold text-foreground">
                Lien marking
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                The FDR must be jointly marked in favour of{" "}
                <span className="font-medium text-foreground">
                  Member Secretary, AICTE
                </span>
                . Deposits without proper lien marking will be flagged during
                verification.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Declaration */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              AICTE Compliance Declaration
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Confirm that the submitted deposit meets all regulatory
              requirements.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-background p-6">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.declared}
                  onChange={(e) => set("declared", e.target.checked)}
                  className="mt-0.5 size-4 rounded border-border accent-primary"
                />
                <span className="text-sm leading-relaxed text-foreground">
                  I hereby declare that the Fixed Deposit Receipt submitted
                  herein is genuine, correctly marked with a joint lien in
                  favour of Member Secretary, AICTE, and that all particulars
                  furnished are true and accurate to the best of my knowledge.
                  I understand that any discrepancy found during verification
                  may result in the submission being flagged or returned.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              disabled={step === 0 && !form.institutionId}
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!form.declared}
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Submit FDR
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
