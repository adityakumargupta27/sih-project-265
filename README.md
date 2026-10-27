# SIH Project 265 — AICTE Security Deposit & Fixed Deposit Receipt (FDR) Portal

> **Smart India Hackathon (SIH) Problem Statement 265**

An **Apple-inspired portal redesign** for managing institutional security deposits and Fixed Deposit Receipts (FDRs) across AICTE-approved technical institutions. Built with **TanStack Start v1**, **React 19**, **Vite 8**, and **Tailwind CSS v4**.

🔗 **GitHub Repository**: [https://github.com/adityakumargupta27/sih-project-265](https://github.com/adityakumargupta27/sih-project-265)

---

## 🌟 Overview & Key Capabilities

- **Institutional FDR Repository (`/fdr`)**: Complete register of deposit instruments with instant search, multi-criteria filtering (status, issuing bank), and direct links to certificates.
- **Instrument Detail & Certificate Preview (`/fdr/:id`)**: Realistic paper certificate mockup displaying all principal terms, lien marking clauses (*"Marked in favour of Member Secretary, AICTE"*), tenure calculations, and audit history.
- **Verification Workbench (`/verification`)**: Side-by-side comparison interface for reviewing submitted deposits against intake records, with discrepancy flagging and bank inquiry workflows.
- **Maturity Horizon Radar (`/maturities`)**: Visual 180-day rolling timeline with categorized buckets (*Overdue*, *Within 30 Days*, *30–60 Days*, *60–90 Days*) and quick actions for FDR renewal or release initiation.
- **Security Deposit Release Tracker (`/releases`)**: 3-stage release pipeline (*Regional Office Verification* → *Executive Approval* → *Bank Encashment/Release*) with timestamped audit logs.
- **Portfolio Analytics & Reports (`/reports`)**: High-level portfolio metrics, bank concentration analysis, annual maturity projection tables, and print-ready summary (`window.print()`).
- **Guided 5-Step Deposit Submission (`/submit`)**:
  1. Searchable Institution Selection
  2. FDR Particulars & Terms
  3. Joint Lien Marking & Document Upload
  4. AICTE Compliance Declaration
  5. Confirmation with Reference Tracking Number

---

## 🎨 Apple-Inspired Design System

- **Clean Neutral Palette**:
  - Background: `#F5F5F7`
  - Cards & Surfaces: `#FFFFFF`
  - Text: `#1D1D1F` (Headlines: 650-weight, tight tracking)
  - Secondary/Muted: `#6E6E73`
  - Subtle Borders: `#D2D2D7`
  - Accent / Links: `#0066CC`
- **Restrained Visuals**: Clean typography, subtle rings and borders, zero noisy gradients or neon highlights.

---

## 🏗️ Project Architecture

```text
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── public/
│   ├── favicon.ico
│   └── robots.txt
└── src/
    ├── styles.css                      <-- Apple design tokens & Tailwind v4
    ├── start.ts                        <-- TanStack Start client instance
    ├── server.ts                       <-- TanStack Start SSR handler
    ├── router.tsx                      <-- TanStack Router initialization
    ├── routeTree.gen.ts                <-- Auto-generated route tree
    │
    ├── assets/                         <-- High-res generated Apple-style visuals
    │   ├── hero-fdr.png
    │   ├── feature-maturities.png
    │   ├── feature-releases.png
    │   ├── feature-reports.png
    │   ├── feature-repository.png
    │   └── feature-verification.png
    │
    ├── data/
    │   └── demo.ts                     <-- Central demo dataset (institutions, instruments, releases)
    │
    ├── lib/
    │   ├── format.ts                   <-- formatINR, formatINRCompact, formatDate, daysUntil
    │   ├── utils.ts                    <-- cn() helper
    │   ├── error-capture.ts
    │   ├── error-page.ts
    │   └── lovable-error-reporting.ts
    │
    ├── hooks/
    │   └── use-mobile.tsx
    │
    ├── components/
    │   ├── portal-nav.tsx              <-- Sticky top header navigation
    │   ├── site-footer.tsx             <-- Minimal Apple-style footer
    │   ├── status-badge.tsx            <-- Status pills
    │   ├── document-preview.tsx        <-- Realistic paper FDR certificate
    │   ├── maturity-horizon.tsx        <-- 180-day timeline visualizer
    │   ├── distributions.tsx           <-- Portfolio & bank distribution meters
    │   ├── empty-state.tsx             <-- Empty state component
    │   └── ui/                         <-- shadcn UI primitives (button, dialog, input, etc.)
    │
    ├── test/
    │   ├── setup.ts
    │   └── app-routing.test.tsx
    │
    └── routes/                         <-- TanStack Start file-based routing
        ├── __root.tsx                  <-- Root shell (Nav + <Outlet /> + Footer)
        ├── index.tsx                   <-- Route: / (Landing page)
        ├── dashboard.tsx               <-- Route: /dashboard (Portfolio overview)
        ├── institutions.tsx           <-- Route: /institutions (Institutions directory)
        ├── fdr/
        │   ├── index.tsx               <-- Route: /fdr (All FDR records table + filters)
        │   └── $id.tsx                 <-- Route: /fdr/:id (Single FDR detail & doc preview)
        ├── verification.tsx           <-- Route: /verification (OCR & discrepancy review)
        ├── maturities.tsx             <-- Route: /maturities (Expiration timeline radar)
        ├── releases.tsx               <-- Route: /releases (Lien revocation & release tracker)
        ├── reports.tsx                <-- Route: /reports (Compliance & bank concentration)
        └── submit.tsx                 <-- Route: /submit (5-step guided deposit submission)
```

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js (v18+)

### Installation
```bash
# Clone the repository
git clone https://github.com/adityakumargupta27/sih-project-265.git
cd sih-project-265

# Install dependencies
bun install
# or: npm install
```

### Running Locally
```bash
# Start the development server
bun dev
# or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Type-Checking & Tests
```bash
# TypeScript verification
bunx tsc --noEmit

# Run unit & routing tests
bun run test
```

### Production Build
```bash
# Build client, SSR bundle, and Nitro output
bun run build

# Preview build locally
bun run preview
```

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start v1](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router)
- **UI Library**: [React 19](https://react.dev/)
- **Bundler**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) Primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + Testing Library
