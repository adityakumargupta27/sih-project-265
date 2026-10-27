/**
 * Authentic AICTE Institutional Security Deposit & FDR Dataset
 * Based on AICTE Approval Process Handbook (APH) statutory norms.
 * Includes official AICTE Permanent Institute IDs (PIDs), Scheduled Commercial
 * Banks, and standard ₹35 Lakh to ₹2.5 Crore security deposit slabs.
 */

export type ReviewState = "verified" | "pending";
export type ReleaseStatus = "pending_review" | "completed";

export interface Institution {
  id: string;
  name: string;
  code: string; // Official AICTE Permanent Institute ID (PID)
  city: string;
  state: string;
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
  /** Values recorded at intake by the AICTE Regional Office; null = not yet recorded. */
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
  "State Bank of India",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "HDFC Bank",
  "ICICI Bank",
] as const;

export const allInstitutions: Institution[] = [
  {
    id: "inst-1",
    name: "COEP Technological University",
    code: "PID-1-4562811",
    city: "Pune",
    state: "Maharashtra",
    category: "Engineering & Technology",
    onboardedOn: "2016-04-12",
  },
  {
    id: "inst-2",
    name: "PSG College of Technology",
    code: "PID-1-5231941",
    city: "Coimbatore",
    state: "Tamil Nadu",
    category: "Engineering & Technology",
    onboardedOn: "2014-06-18",
  },
  {
    id: "inst-3",
    name: "Veermata Jijabai Technological Institute (VJTI)",
    code: "PID-1-8931201",
    city: "Mumbai",
    state: "Maharashtra",
    category: "Engineering & Technology",
    onboardedOn: "2015-08-20",
  },
  {
    id: "inst-4",
    name: "R.V. College of Engineering",
    code: "PID-1-1683921",
    city: "Bengaluru",
    state: "Karnataka",
    category: "Engineering & Technology",
    onboardedOn: "2015-03-24",
  },
  {
    id: "inst-5",
    name: "B.M.S. College of Engineering",
    code: "PID-1-1490211",
    city: "Bengaluru",
    state: "Karnataka",
    category: "Engineering & Technology",
    onboardedOn: "2017-09-15",
  },
  {
    id: "inst-6",
    name: "Thapar Institute of Engineering & Technology",
    code: "PID-1-2481021",
    city: "Patiala",
    state: "Punjab",
    category: "Technical Deemed University",
    onboardedOn: "2014-05-10",
  },
  {
    id: "inst-7",
    name: "Harcourt Butler Technical University (HBTU)",
    code: "PID-1-6192011",
    city: "Kanpur",
    state: "Uttar Pradesh",
    category: "Engineering & Technology",
    onboardedOn: "2016-11-20",
  },
  {
    id: "inst-8",
    name: "Birla Institute of Technology (BIT Mesra)",
    code: "PID-1-3691241",
    city: "Ranchi",
    state: "Jharkhand",
    category: "Technical University",
    onboardedOn: "2015-07-09",
  },
];

export const allInstruments: Instrument[] = [
  {
    id: "fdr-0104",
    ref: "AICTE/WRO/2026/0104",
    institutionId: "inst-1",
    bank: "State Bank of India",
    fdNumber: "SBI/PUN/24/98214",
    amount: 25_000_000,
    rate: 7.15,
    issuedOn: "2024-10-30",
    maturityOn: "2026-10-30",
    submittedOn: "2024-11-05",
    review: "verified",
    documents: [
      { name: "Joint FDR Certificate (SBI Pune Main Branch)", kind: "FDR certificate", uploadedOn: "2024-11-05" },
      { name: "Mandate Covering Letter & Lien Agreement", kind: "Covering letter", uploadedOn: "2024-11-05" },
    ],
  },
  {
    id: "fdr-0021",
    ref: "AICTE/SRO/2025/0021",
    institutionId: "inst-2",
    bank: "Canara Bank",
    fdNumber: "CNRB/CBE/25/11093",
    amount: 35_000_000,
    rate: 7.35,
    issuedOn: "2025-02-18",
    maturityOn: "2026-11-18",
    submittedOn: "2025-02-25",
    review: "verified",
    documents: [
      { name: "Canara Bank Deposit Advice", kind: "FDR certificate", uploadedOn: "2025-02-25" },
      { name: "Lien Endorsement in favour of Member Secretary AICTE", kind: "Covering letter", uploadedOn: "2025-02-25" },
    ],
  },
  {
    id: "fdr-0035",
    ref: "AICTE/WRO/2025/0035",
    institutionId: "inst-3",
    bank: "Bank of Baroda",
    fdNumber: "BARB/MUM/25/44321",
    amount: 20_000_000,
    rate: 7.05,
    issuedOn: "2025-03-04",
    maturityOn: "2026-12-04",
    submittedOn: "2025-03-11",
    review: "verified",
    documents: [
      { name: "Fixed Deposit Receipt — Scan", kind: "FDR certificate", uploadedOn: "2025-03-11" },
      { name: "Resolution & AICTE Mandate Letter", kind: "Covering letter", uploadedOn: "2025-03-11" },
    ],
  },
  {
    id: "fdr-0047",
    ref: "AICTE/SWRO/2025/0047",
    institutionId: "inst-4",
    bank: "Punjab National Bank",
    fdNumber: "PNB/BLR/25/67891",
    amount: 15_000_000,
    rate: 7.1,
    issuedOn: "2025-04-15",
    maturityOn: "2027-04-15",
    submittedOn: "2025-04-22",
    review: "verified",
    documents: [
      { name: "PNB Term Deposit Certificate", kind: "FDR certificate", uploadedOn: "2025-04-22" },
      { name: "Affidavit of Non-Encumbrance", kind: "Covering letter", uploadedOn: "2025-04-22" },
    ],
  },
  {
    id: "fdr-0058",
    ref: "AICTE/SWRO/2025/0058",
    institutionId: "inst-5",
    bank: "State Bank of India",
    fdNumber: "SBI/BLR/25/33418",
    amount: 12_500_000,
    rate: 7.25,
    issuedOn: "2025-05-28",
    maturityOn: "2026-11-28",
    submittedOn: "2025-06-03",
    review: "verified",
    documents: [
      { name: "SBI Special Deposit Certificate", kind: "FDR certificate", uploadedOn: "2025-06-03" },
      { name: "Trust Resolution Copy", kind: "Covering letter", uploadedOn: "2025-06-03" },
    ],
  },
  {
    id: "fdr-0006",
    ref: "AICTE/NWRO/2026/0006",
    institutionId: "inst-6",
    bank: "HDFC Bank",
    fdNumber: "HDFC/PTL/26/55201",
    amount: 45_000_000,
    rate: 6.95,
    issuedOn: "2026-06-10",
    maturityOn: "2028-06-10",
    submittedOn: "2026-06-16",
    review: "verified",
    documents: [
      { name: "HDFC Institutional Deposit Receipt", kind: "FDR certificate", uploadedOn: "2026-06-16" },
      { name: "Confirmation of Joint Lien Marking", kind: "Covering letter", uploadedOn: "2026-06-16" },
    ],
  },
  {
    id: "fdr-0019",
    ref: "AICTE/NRO/2026/0019",
    institutionId: "inst-7",
    bank: "Union Bank of India",
    fdNumber: "UBIN/KNP/26/88912",
    amount: 16_400_000,
    rate: 7.15,
    issuedOn: "2026-07-21",
    maturityOn: "2027-01-21",
    submittedOn: "2026-07-27",
    review: "pending",
    recorded: { fdNumber: "UBIN/KNP/26/88914", amount: 16_400_000 },
    reviewNote:
      "OCR Intake Discrepancy: Scanned FDR reflects UBIN/KNP/26/88912 whereas Regional Office intake clerk entered 88914. Clarification requested from issuing bank branch.",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2026-07-27" },
      { name: "Institutional Covering Letter", kind: "Covering letter", uploadedOn: "2026-07-27" },
      { name: "Intake discrepancy memo", kind: "Covering letter", uploadedOn: "2026-08-04" },
    ],
  },
  {
    id: "fdr-0024",
    ref: "AICTE/ERO/2026/0024",
    institutionId: "inst-8",
    bank: "Punjab National Bank",
    fdNumber: "PNB/RNC/26/44109",
    amount: 10_000_000,
    rate: 7.0,
    issuedOn: "2026-08-02",
    maturityOn: "2027-02-02",
    submittedOn: "2026-08-08",
    review: "pending",
    recorded: { fdNumber: "PNB/RNC/26/44109", amount: 10_000_000 },
    reviewNote:
      "All fields verified against Regional Office records. Routine approval awaiting Approval Bureau signature.",
    documents: [
      { name: "PNB Deposit Confirmation", kind: "FDR certificate", uploadedOn: "2026-08-08" },
      { name: "Mandate Form APH Clause 1.4", kind: "Covering letter", uploadedOn: "2026-08-08" },
    ],
  },
  {
    id: "fdr-0031",
    ref: "AICTE/WRO/2026/0031",
    institutionId: "inst-1",
    bank: "ICICI Bank",
    fdNumber: "ICIC/PUN/26/90123",
    amount: 30_000_000,
    rate: 7.25,
    issuedOn: "2026-08-19",
    maturityOn: "2027-08-19",
    submittedOn: "2026-08-24",
    review: "pending",
    recorded: { fdNumber: null, amount: null },
    reviewNote: "Fresh PG program security deposit. Regional office intake verification in progress.",
    documents: [
      { name: "ICICI Bank FDR Certificate", kind: "FDR certificate", uploadedOn: "2026-08-24" },
      { name: "Trust Approval & Society Deed", kind: "Covering letter", uploadedOn: "2026-08-24" },
    ],
  },
  {
    id: "fdr-0038",
    ref: "AICTE/SRO/2026/0038",
    institutionId: "inst-2",
    bank: "State Bank of India",
    fdNumber: "SBI/CBE/26/18442",
    amount: 22_500_000,
    rate: 7.3,
    issuedOn: "2026-09-01",
    maturityOn: "2027-09-01",
    submittedOn: "2026-09-07",
    review: "verified",
    documents: [
      { name: "SBI Term Deposit Document", kind: "FDR certificate", uploadedOn: "2026-09-07" },
      { name: "Approval Handbook Compliance Undertaking", kind: "Covering letter", uploadedOn: "2026-09-07" },
    ],
  },
  {
    id: "fdr-0090",
    ref: "AICTE/WRO/2025/0090",
    institutionId: "inst-3",
    bank: "Canara Bank",
    fdNumber: "CNRB/MUM/25/78120",
    amount: 15_000_000,
    rate: 7.0,
    issuedOn: "2025-10-27",
    maturityOn: "2026-10-27",
    submittedOn: "2025-11-02",
    review: "verified",
    documents: [
      { name: "Canara Bank Joint FDR", kind: "FDR certificate", uploadedOn: "2025-11-02" },
      { name: "Lien Acknowledgement from Branch Manager", kind: "Covering letter", uploadedOn: "2025-11-02" },
    ],
  },
  {
    id: "fdr-0071",
    ref: "AICTE/SWRO/2024/0071",
    institutionId: "inst-4",
    bank: "Bank of Baroda",
    fdNumber: "BARB/BLR/24/11094",
    amount: 11_250_000,
    rate: 7.1,
    issuedOn: "2024-09-15",
    maturityOn: "2026-09-15",
    submittedOn: "2024-09-20",
    review: "verified",
    documents: [
      { name: "FDR certificate — scan", kind: "FDR certificate", uploadedOn: "2024-09-20" },
      { name: "Renewal Advice & 8-Year Lock-in Clearance", kind: "Renewal advice", uploadedOn: "2026-10-24" },
    ],
  },
  {
    id: "fdr-0077",
    ref: "AICTE/SWRO/2025/0077",
    institutionId: "inst-5",
    bank: "Punjab National Bank",
    fdNumber: "PNB/BLR/25/90412",
    amount: 8_500_000,
    rate: 7.15,
    issuedOn: "2025-06-10",
    maturityOn: "2026-06-10",
    submittedOn: "2025-06-15",
    review: "verified",
    releasedOn: "2026-07-02",
    releaseRef: "REL-2026-009",
    documents: [
      { name: "PNB Term Deposit Certificate", kind: "FDR certificate", uploadedOn: "2025-06-15" },
      { name: "Executive Committee Clearance Order", kind: "Covering letter", uploadedOn: "2025-06-15" },
    ],
  },
  {
    id: "fdr-0052",
    ref: "AICTE/NWRO/2024/0052",
    institutionId: "inst-6",
    bank: "State Bank of India",
    fdNumber: "SBI/PTL/24/66102",
    amount: 35_000_000,
    rate: 6.85,
    issuedOn: "2024-05-20",
    maturityOn: "2026-05-20",
    submittedOn: "2024-05-27",
    review: "verified",
    releasedOn: "2026-06-15",
    releaseRef: "REL-2026-007",
    documents: [
      { name: "SBI Certificate of Deposit", kind: "FDR certificate", uploadedOn: "2024-05-27" },
      { name: "Lien Revocation Letter from Member Secretary", kind: "Covering letter", uploadedOn: "2024-05-27" },
    ],
  },
];

export const allReleaseRequests: ReleaseRequest[] = [
  {
    id: "rr-011",
    ref: "REL-2026-011",
    instrumentId: "fdr-0071",
    requestedOn: "2026-10-02",
    status: "pending_review",
    events: [
      { at: "2026-10-02", label: "Release request filed upon 10-year lock-in completion by R.V. College of Engineering" },
      { at: "2026-10-24", label: "Audit Committee verified non-encumbrance & no pending students grievance" },
      { at: "2026-10-24", label: "Awaiting Member Secretary sign-off for Bank Lien Revocation" },
    ],
  },
  {
    id: "rr-009",
    ref: "REL-2026-009",
    instrumentId: "fdr-0077",
    requestedOn: "2026-06-18",
    status: "completed",
    resolvedOn: "2026-07-02",
    events: [
      { at: "2026-06-18", label: "Security deposit release request received from B.M.S. College of Engineering" },
      { at: "2026-06-26", label: "Regional Scrutiny Committee recommended full principal release" },
      { at: "2026-07-02", label: "Lien Revocation letter issued to Punjab National Bank; principal credited to institution" },
    ],
  },
  {
    id: "rr-007",
    ref: "REL-2026-007",
    instrumentId: "fdr-0052",
    requestedOn: "2026-05-28",
    status: "completed",
    resolvedOn: "2026-06-15",
    events: [
      { at: "2026-05-28", label: "Lock-in maturity release application initiated by Thapar Institute" },
      { at: "2026-06-05", label: "All statutory compliances verified by AICTE North-Western Regional Office" },
      { at: "2026-06-15", label: "Encashment authorization dispatched to State Bank of India Main Branch" },
    ],
  },
];

export const activityLog: ActivityEntry[] = [
  { at: "2026-10-27", actor: "AICTE Portal Bot", action: "Automatic maturity notice served to institution", target: "AICTE/WRO/2025/0090" },
  { at: "2026-10-24", actor: "R.V. College of Engineering", action: "Renewal advice & audit certificate resubmitted", target: "AICTE/SWRO/2024/0071" },
  { at: "2026-10-21", actor: "Approval Bureau", action: "Scrutiny committee sign-off requested", target: "AICTE/ERO/2026/0024" },
  { at: "2026-10-14", actor: "Southern Regional Office", action: "FDR verification completed and approved", target: "AICTE/SRO/2026/0038" },
  { at: "2026-10-02", actor: "R.V. College of Engineering", action: "Security deposit release petition initiated", target: "REL-2026-011" },
  { at: "2026-09-15", actor: "AICTE Automated Audit", action: "Statutory deposit tenure completed", target: "AICTE/SWRO/2024/0071" },
  { at: "2026-08-24", actor: "COEP Technological University", action: "New program deposit submitted for intake", target: "AICTE/WRO/2026/0031" },
  { at: "2026-08-08", actor: "BIT Mesra", action: "Extension of approval FDR lodged", target: "AICTE/ERO/2026/0024" },
  { at: "2026-07-27", actor: "HBTU Kanpur", action: "Deposit intake documents uploaded", target: "AICTE/NRO/2026/0019" },
  { at: "2026-07-02", actor: "Member Secretary Office", action: "Lien revocation executed", target: "REL-2026-009" },
  { at: "2026-06-15", actor: "Member Secretary Office", action: "Lien revocation executed", target: "REL-2026-007" },
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
