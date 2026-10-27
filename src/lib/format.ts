export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Compact crore notation, e.g. ₹26.36 Cr */
export function formatINRCompact(amount: number): string {
  const cr = amount / 1e7;
  return `₹${cr.toFixed(2).replace(/\.00$/, "")} Cr`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatDateLong(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatPercent(rate: number): string {
  return `${rate.toFixed(2)}%`;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function daysBetween(fromISO: string, toISO: string): number {
  const from = new Date(fromISO);
  const to = new Date(toISO);
  from.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

export function daysUntil(iso: string): number {
  return daysBetween(todayISO(), iso);
}

export function formatTenure(issuedOn: string, maturityOn: string): string {
  const days = daysBetween(issuedOn, maturityOn);
  const months = Math.round(days / 30.44);
  if (months % 12 === 0) {
    const years = months / 12;
    return years === 1 ? "1 year" : `${years} years`;
  }
  return `${months} months`;
}
