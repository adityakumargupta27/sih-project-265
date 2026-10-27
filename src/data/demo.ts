/**
 * Demonstration dataset for the AICTE FDR portal preview.
 *
 * Every page derives its numbers from this single dataset so all views stay
 * consistent. Banks, instrument references and certificate numbers are
 * fictional sample records — no real financial instruments are represented.
 */

export type ReviewState = "verified" | "pending";
export type ReleaseStatus = "pending_review" | "completed";

export interface Institution {
  id: string;
  name: string;
  code: string;
  city: string;
  category: string;
  onboardedOn: string;
}

export interface FdrDocument {
  name: string;
  kind: "FDR certificate" | "Covering letter" | "Renewal advice";
  uploadedOn: string;
}

export interface RecordedField {
  fdNumber?: string | null;
  amount?: number | null;
}

export interface Instrument {
  id: string;
  ref: string;
  institutionId: string;
  bank: string;
  fdNumber: string;
  amount: number;
  rate: number;
  issuedOn: string;
  maturityOn: string;
  submittedOn: string;
  review: ReviewState;
  /** Values recorded at intake by the portal office; null = not yet recorded. */
  recorded?: RecordedField;
  reviewNote?: string;
  releasedOn?: string;
  releaseRef?: string;
  documents: FdrDocument[];
}

export interface ReleaseRequest {
  id: string;
  ref: string;
  instrumentId: string;
  requestedOn: string;
  status: ReleaseStatus;
  resolvedOn?: string;
  events: { at: string; label: string }[];
}

export interface ActivityEntry {
  at: string;
  actor: string;
  action: string;
  target: string;
}

export type EffectiveStatus =
  | "active"
  | "maturing_soon"
  | "matured"
  | "pending_verification"
  | "released";

export const BANKS = [
  "Eastern Commercial Bank",
  "Meridian Trust Bank",
  "Union Metro Bank",
  "Harbourline Cooperative Bank",
] as const;

export const allInstitutions: Institution[] = [
  { id: "inst-1", name: "Green Valley Institute of Technology", code: "GVT-2019", city: "Pune", category: "Engineering college", onboardedOn: "2019-04-11" },
  { id: "inst-2", name: "Lakshmi College of Engineering", code: "LCE-2008", city: "Coimbatore", category: "Engineering college", onboardedOn: "2008-06-02" },
  { id: "inst-3", name: "Meridian Business School", code: "MBS-2015", city: "Hyderabad", category: "Management institute", onboardedOn: "2015-08-19" },
  { id: "inst-4", name: "Sunrise Polytechnic College", code: "SPC-2012", city: "Madurai", category: "Polytechnic", onboardedOn: "2012-03-27" },
  { id: "inst-5", name: "Aurora Institute of Design", code: "AID-2021", city: "Bengaluru", category: "Design institute", onboardedOn: "2021-09-14" },
  { id: "inst-6", name: "Northern Hills University", code: "NHU-2010", city: "Dehradun", category: "University", onboardedOn: "2010-05-06" },
  { id: "inst-7", name: "Coastal Institute of Pharmacy", code: "CIP-2018", city: "Visakhapatnam", category: "Pharmacy college", onboardedOn: "2018-11-21" },
  { id: "inst-8", name: "St. Clare College of Nursing", code: "SCN-2016", city: "Kochi", category: "Nursing college", onboardedOn: "2016-07-08" },
];

export const allInstruments: Instrument[] = [
  {
    id: "fdr-0104", ref: "FDR-2026-0104", institutionId: "inst-1",
    bank: "Eastern Commercial Bank", fdNumber: "ECB/26/2214",
    amount: 2_500_000, rate: 7.1, issuedOn: "2024-10-30", maturityOn: "2026-10-30",
    submittedOn: "2024-11-05", review: "verified",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2024-11-05" },
      { name: "Covering letter", kind: "Covering letter", uploadedOn: "2024-11-05" },
    ],
  },
  {
    id: "fdr-0021", ref: "FDR-2025-0021", institutionId: "inst-2",
    bank: "Meridian Trust Bank", fdNumber: "MTB/25/0637",
    amount: 4_000_000, rate: 7.35, issuedOn: "2025-02-18", maturityOn: "2026-11-18",
    submittedOn: "2025-02-25", review: "verified",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2025-02-25" },
      { name: "Covering letter", kind: "Covering letter", uploadedOn: "2025-02-25" },
    ],
  },
  {
    id: "fdr-0035", ref: "FDR-2025-0035", institutionId: "inst-3",
    bank: "Union Metro Bank", fdNumber: "UMB/25/1140",
    amount: 1_850_000, rate: 6.9, issuedOn: "2025-03-04", maturityOn: "2026-12-04",
    submittedOn: "2025-03-11", review: "verified",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2025-03-11" },
      { name: "Covering letter", kind: "Covering letter", uploadedOn: "2025-03-11" },
    ],
  },
  {
    id: "fdr-0047", ref: "FDR-2025-0047", institutionId: "inst-4",
    bank: "Harbourline Cooperative Bank", fdNumber: "HCB/25/0451",
    amount: 1_200_000, rate: 7.05, issuedOn: "2025-04-15", maturityOn: "2027-04-15",
    submittedOn: "2025-04-22", review: "verified",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2025-04-22" },
      { name: "Covering letter", kind: "Covering letter", uploadedOn: "2025-04-22" },
    ],
  },
  {
    id: "fdr-0058", ref: "FDR-2025-0058", institutionId: "inst-5",
    bank: "Eastern Commercial Bank", fdNumber: "ECB/25/1877",
    amount: 975_000, rate: 7.2, issuedOn: "2025-05-28", maturityOn: "2026-11-28",
    submittedOn: "2025-06-03", review: "verified",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2025-06-03" },
      { name: "Covering letter", kind: "Covering letter", uploadedOn: "2025-06-03" },
    ],
  },
  {
    id: "fdr-0006", ref: "FDR-2026-0006", institutionId: "inst-6",
    bank: "Meridian Trust Bank", fdNumber: "MTB/26/0912",
    amount: 5_500_000, rate: 6.85, issuedOn: "2026-06-10", maturityOn: "2028-06-10",
    submittedOn: "2026-06-16", review: "verified",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2026-06-16" },
      { name: "Covering letter", kind: "Covering letter", uploadedOn: "2026-06-16" },
    ],
  },
  {
    id: "fdr-0019", ref: "FDR-2026-0019", institutionId: "inst-7",
    bank: "Union Metro Bank", fdNumber: "UMB/26/1142",
    amount: 1_640_000, rate: 7.15, issuedOn: "2026-07-21", maturityOn: "2027-01-21",
    submittedOn: "2026-07-27", review: "pending",
    recorded: { fdNumber: "UMB/26/1143", amount: 1_640_000 },
    reviewNote: "Deposit reference recorded at intake differs from the submitted scan. Confirm with the institution before marking verified.",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2026-07-27" },
      { name: "Covering letter", kind: "Covering letter", uploadedOn: "2026-07-27" },
      { name: "Intake confirmation memo", kind: "Covering letter", uploadedOn: "2026-08-04" },
    ],
  },
  {
    id: "fdr-0024", ref: "FDR-2026-0024", institutionId: "inst-8",
    bank: "Harbourline Cooperative Bank", fdNumber: "HCB/26/0833",
    amount: 820_000, rate: 6.95, issuedOn: "2026-08-02", maturityOn: "2027-02-02",
    submittedOn: "2026-08-08", review: "pending",
    recorded: { fdNumber: "HCB/26/0833", amount: 820_000 },
    reviewNote: "All recorded fields match the submission. Awaiting routine second-reader sign-off.",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2026-08-08" },
      { name: "Covering letter", kind: "Covering letter", uploadedOn: "2026-08-08" },
    ],
  },
  {
    id: "fdr-0031", ref: "FDR-2026-0031", institutionId: "inst-1",
    bank: "Meridian Trust Bank", fdNumber: "MTB/26/1654",
    amount: 3_000_000, rate: 7.25, issuedOn: "2026-08-19", maturityOn: "2027-08-19",
    submittedOn: "2026-08-24", review: "pending",
    recorded: { fdNumber: null, amount: null },
    reviewNote: "Intake records for this deposit have not been entered yet. Record the intake figures to continue the review.",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2026-08-24" },
      { name: "Covering letter", kind: "Covering letter", uploadedOn: "2026-08-24" },
    ],
  },
  {
    id: "fdr-0038", ref: "FDR-2026-0038", institutionId: "inst-2",
    bank: "Eastern Commercial Bank", fdNumber: "ECB/26/2098",
    amount: 2_250_000, rate: 7.3, issuedOn: "2026-09-01", maturityOn: "2027-09-01",
    submittedOn: "2026-09-07", review: "verified",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2026-09-07" },
      { name: "Covering letter", kind: "Covering letter", uploadedOn: "2026-09-07" },
    ],
  },
  {
    id: "fdr-0090", ref: "FDR-2025-0090", institutionId: "inst-3",
    bank: "Meridian Trust Bank", fdNumber: "MTB/25/1444",
    amount: 1_500_000, rate: 7.0, issuedOn: "2025-10-27", maturityOn: "2026-10-27",
    submittedOn: "2025-11-02", review: "verified",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2025-11-02" },
      { name: "Covering letter", kind: "Covering letter", uploadedOn: "2025-11-02" },
    ],
  },
  {
    id: "fdr-0071", ref: "FDR-2024-0071", institutionId: "inst-4",
    bank: "Union Metro Bank", fdNumber: "UMB/24/1026",
    amount: 1_125_000, rate: 7.1, issuedOn: "2024-09-15", maturityOn: "2026-09-15",
    submittedOn: "2024-09-20", review: "verified",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2024-09-20" },
      { name: "Renewal advice — resubmitted", kind: "Renewal advice", uploadedOn: "2026-10-24" },
    ],
  },
  {
    id: "fdr-0077", ref: "FDR-2025-0077", institutionId: "inst-5",
    bank: "Harbourline Cooperative Bank", fdNumber: "HCB/25/0666",
    amount: 760_000, rate: 7.15, issuedOn: "2025-06-10", maturityOn: "2026-06-10",
    submittedOn: "2025-06-15", review: "verified",
    releasedOn: "2026-07-02", releaseRef: "RR-2026-009",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2025-06-15" },
      { name: "Covering letter", kind: "Covering letter", uploadedOn: "2025-06-15" },
    ],
  },
  {
    id: "fdr-0052", ref: "FDR-2024-0052", institutionId: "inst-6",
    bank: "Eastern Commercial Bank", fdNumber: "ECB/24/1655",
    amount: 3_500_000, rate: 6.8, issuedOn: "2024-05-20", maturityOn: "2026-05-20",
    submittedOn: "2024-05-27", review: "verified",
    releasedOn: "2026-06-15", releaseRef: "RR-2026-007",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2024-05-27" },
      { name: "Covering letter", kind: "Covering letter", uploadedOn: "2024-05-27" },
    ],
  },
];

export const allReleaseRequests: ReleaseRequest[] = [
  {
    id: "rr-011", ref: "RR-2026-011", instrumentId: "fdr-0071",
    requestedOn: "2026-10-02", status: "pending_review",
    events: [
      { at: "2026-10-02", label: "Release request opened by Sunrise Polytechnic College" },
      { at: "2026-10-24", label: "Renewal advice resubmitted and reviewed" },
      { at: "2026-10-24", label: "Awaiting administrative approval" },
    ],
  },
  {
    id: "rr-009", ref: "RR-2026-009", instrumentId: "fdr-0077",
    requestedOn: "2026-06-18", status: "completed", resolvedOn: "2026-07-02",
    events: [
      { at: "2026-06-18", label: "Release request opened by Aurora Institute of Design" },
      { at: "2026-06-26", label: "Documents verified" },
      { at: "2026-07-02", label: "Refund processed to institution account" },
    ],
  },
  {
    id: "rr-007", ref: "RR-2026-007", instrumentId: "fdr-0052",
    requestedOn: "2026-05-28", status: "completed", resolvedOn: "2026-06-15",
    events: [
      { at: "2026-05-28", label: "Release request opened by Northern Hills University" },
      { at: "2026-06-05", label: "Documents verified" },
      { at: "2026-06-15", label: "Refund processed to institution account" },
    ],
  },
];

export const activityLog: ActivityEntry[] = [
  { at: "2026-10-27", actor: "System", action: "Maturity reminder generated", target: "FDR-2025-0090" },
  { at: "2026-10-24", actor: "Sunrise Polytechnic College", action: "Renewal advice resubmitted", target: "FDR-2024-0071" },
  { at: "2026-10-21", actor: "Review office", action: "Second-reader sign-off requested", target: "FDR-2026-0024" },
  { at: "2026-10-14", actor: "Review office", action: "Submission verified", target: "FDR-2026-0038" },
  { at: "2026-10-02", actor: "Sunrise Polytechnic College", action: "Release request opened", target: "RR-2026-011" },
  { at: "2026-09-15", actor: "System", action: "Deposit matured", target: "FDR-2024-0071" },
  { at: "2026-08-24", actor: "Green Valley Institute of Technology", action: "FDR submission accepted", target: "FDR-2026-0031" },
  { at: "2026-08-08", actor: "St. Clare College of Nursing", action: "FDR submission accepted", target: "FDR-2026-0024" },
  { at: "2026-07-27", actor: "Coastal Institute of Pharmacy", action: "FDR submission accepted", target: "FDR-2026-0019" },
  { at: "2026-07-02", actor: "Review office", action: "Release completed", target: "RR-2026-009" },
  { at: "2026-06-15", actor: "Review office", action: "Release completed", target: "RR-2026-007" },
];

/* ---------------------------- derived helpers ---------------------------- */

const DAY_MS = 86_400_000;

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function todayISO(): string {
  return startOfToday().toISOString().slice(0, 10);
}

export function daysUntil(iso: string): number {
  return Math.round((new Date(iso + "T00:00:00").getTime() - startOfToday().getTime()) / DAY_MS);
}

export function effectiveStatus(i: Instrument): EffectiveStatus {
  if (i.releasedOn) return "released";
  if (i.review === "pending") return "pending_verification";
  if (daysUntil(i.maturityOn) <= 0) return "matured";
  if (daysUntil(i.maturityOn) <= 45) return "maturing_soon";
  return "active";
}

export const statusLabel: Record<EffectiveStatus, string> = {
  active: "Active",
  maturing_soon: "Maturing soon",
  matured: "Matured",
  pending_verification: "Pending review",
  released: "Released",
};

export const heldInstruments = () => allInstruments.filter((i) => !i.releasedOn);

export const heldValue = () =>
  heldInstruments().reduce((sum, i) => sum + i.amount, 0);

export const pendingReviewInstruments = () =>
  heldInstruments().filter((i) => i.review === "pending");

export const maturingWithin = (days: number) =>
  heldInstruments().filter((i) => {
    const d = daysUntil(i.maturityOn);
    return d >= 0 && d <= days;
  });

export const maturedAwaitingRelease = () =>
  heldInstruments().filter((i) => daysUntil(i.maturityOn) <= 0);

export const releaseRequestFor = (instrumentId: string) =>
  allReleaseRequests.find((r) => r.instrumentId === instrumentId);

export const institutionById = (id: string) =>
  allInstitutions.find((inst) => inst.id === id)!;

export const instrumentByRef = (ref: string) =>
  allInstruments.find((i) => i.ref === ref);

export function institutionSummary() {
  return allInstitutions.map((inst) => {
    const items = allInstruments.filter((i) => i.institutionId === inst.id);
    const held = items.filter((i) => !i.releasedOn);
    return {
      institution: inst,
      count: held.length,
      total: held.reduce((sum, i) => sum + i.amount, 0),
      matured: held.filter((i) => daysUntil(i.maturityOn) <= 0).length,
      pending: held.filter((i) => i.review === "pending").length,
    };
  });
}

export function holdingsByBank() {
  return BANKS.map((bank) => {
    const items = heldInstruments().filter((i) => i.bank === bank);
    return { bank, count: items.length, total: items.reduce((s, i) => s + i.amount, 0) };
  }).sort((a, b) => b.total - a.total);
}
