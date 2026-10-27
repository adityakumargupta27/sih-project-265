import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-fdr.png";
import repositoryImg from "@/assets/feature-repository.png";
import verificationImg from "@/assets/feature-verification.png";
import maturitiesImg from "@/assets/feature-maturities.png";
import releasesImg from "@/assets/feature-releases.png";
import reportsImg from "@/assets/feature-reports.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AICTE FDR Portal — Security deposits, clearly managed" },
      {
        name: "description",
        content:
          "An organised register of institutional security deposits and Fixed Deposit Receipts — verified, tracked to maturity, and released on time.",
      },
      { property: "og:title", content: "AICTE FDR Portal — Security deposits, clearly managed" },
      {
        property: "og:description",
        content:
          "An organised register of institutional security deposits and Fixed Deposit Receipts — verified, tracked to maturity, and released on time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:pt-24">
        <p className="eyebrow">Security deposit &amp; FDR management</p>
        <h1 className="headline mt-3 max-w-3xl text-4xl sm:text-6xl">
          Security deposits.{" "}
          <span className="text-muted-foreground">Clearly managed.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Every Fixed Deposit Receipt an institution submits — organised,
          verified, and tracked through to maturity and release.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link
            to="/dashboard"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore the dashboard
          </Link>
          <Link to="/submit" className="text-link text-sm">
            Submit an FDR &rarr;
          </Link>
        </div>
        <img
          src={heroImg}
          alt="A formal fixed deposit certificate inside a document folder on a desk"
          width={1792}
          height={1024}
          className="mt-14 w-full rounded-2xl border border-border/60 object-cover"
        />
      </section>

      {/* Repository — text left, image right */}
      <FeatureRow
        eyebrow="FDR repository"
        title="Every instrument, one record."
        body="Search the full register of submitted deposits with live status, maturity dates and complete document history."
        cta="Open the repository"
        to="/fdr"
        img={repositoryImg}
        alt="A filing drawer holding neatly organised certificate documents"
        reverse
      />

      {/* Verification — image left, text right */}
      <FeatureRow
        eyebrow="Verification workspace"
        title="Verification with clarity."
        body="Compare each submission against recorded intake figures, field by field, before an instrument is marked verified."
        cta="Review a submission"
        to="/verification"
        img={verificationImg}
        alt="A certificate document beside a structured comparison checklist and magnifier"
      />

      {/* Maturities — text above wide image */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Maturity monitoring</p>
          <h2 className="headline mt-3 text-3xl sm:text-4xl">
            Never miss a maturity date.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A rolling horizon shows exactly which deposits need attention, and
            when.
          </p>
        </div>
        <img
          src={maturitiesImg}
          alt="A minimal timeline with milestone markers beside a desk calendar"
          width={1792}
          height={1024}
          loading="lazy"
          className="mt-12 w-full rounded-2xl border border-border/60 object-cover"
        />
        <div className="mt-6 text-center">
          <Link to="/maturities" className="text-link text-sm">
            See the maturity horizon &rarr;
          </Link>
        </div>
      </section>

      {/* Releases + Reports — two image cards, reference-style row */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-5 md:grid-cols-2">
          <ImageCard
            eyebrow="Release requests"
            title="Release and refund"
            tagline="Track every release from opening to refund, with a complete event trail."
            to="/releases"
            img={releasesImg}
            alt="A sealed envelope and a folded formal document on a grey desk"
          />
          <ImageCard
            eyebrow="Reports"
            title="Reports and audit"
            tagline="Holdings, verification progress and a complete chronological activity trail."
            to="/reports"
            img={reportsImg}
            alt="A minimal 3D bar chart with one blue bar beside a printed line chart"
          />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-border/60 bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center">
          <h2 className="headline text-3xl sm:text-4xl">
            Start with your portfolio.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Current holdings, pending reviews and approaching maturities — all
            on one calm page.
          </p>
          <Link
            to="/dashboard"
            className="mt-7 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Open the dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureRow(props: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  to: string;
  img: string;
  alt: string;
  reverse?: boolean;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div
        className={
          "grid items-center gap-10 md:grid-cols-2 md:gap-16 " +
          (props.reverse ? "" : "")
        }
      >
        <div className={props.reverse ? "md:order-1" : "md:order-2"}>
          <p className="eyebrow">{props.eyebrow}</p>
          <h2 className="headline mt-3 text-3xl sm:text-4xl">{props.title}</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            {props.body}
          </p>
          <Link to={props.to} className="text-link mt-5 inline-block text-sm">
            {props.cta} &rarr;
          </Link>
        </div>
        <img
          src={props.img}
          alt={props.alt}
          width={1792}
          height={1024}
          loading="lazy"
          className={
            "w-full rounded-2xl border border-border/60 object-cover " +
            (props.reverse ? "md:order-2" : "md:order-1")
          }
        />
      </div>
    </section>
  );
}

function ImageCard(props: {
  eyebrow: string;
  title: string;
  tagline: string;
  to: string;
  img: string;
  alt: string;
}) {
  return (
    <Link
      to={props.to}
      className="group block overflow-hidden rounded-2xl bg-card ring-1 ring-border/60 transition-shadow hover:shadow-lg"
    >
      <div className="px-7 pt-7">
        <p className="eyebrow">{props.eyebrow}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {props.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{props.tagline}</p>
        <p className="text-link mt-3 text-sm">
          Open &rarr;
        </p>
      </div>
      <img
        src={props.img}
        alt={props.alt}
        width={1792}
        height={1024}
        loading="lazy"
        className="mt-4 w-full object-cover"
      />
    </Link>
  );
}
