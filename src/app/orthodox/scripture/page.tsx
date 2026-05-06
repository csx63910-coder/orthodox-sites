import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Card from "../../../components/Card";
import SectionDivider from "../../../components/SectionDivider";

export default function OrthodoxScripturePage() {
  const buttons = [
    { label: "Septuagint Old Testament", to: "/orthodox/scripture/septuagint-old-testament" },
    { label: "New Testament", to: "/orthodox/scripture/new-testament" },
    { label: "King James Version (KJV)", to: "/orthodox/scripture/septuagint-old-testament?version=kjv" },
    { label: "Daily Scripture Readings", to: "/orthodox/scripture/daily-readings" },
    { label: "Commandments", to: "/orthodox/scripture/commandments" },
  ];

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Orthodox", to: "/orthodox" },
          { label: "Holy Scripture", to: "/orthodox/scripture" },
        ]}
      />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">Holy Scripture</h1>
      <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/88">
        Orthodox reading of Scripture is ecclesial and liturgical, rooted in prayer and the witness of the Fathers.
      </p>
      <SectionDivider label="Scripture Paths" />
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
        {buttons.map((button) => (
          <Card key={button.label}>
            <Link
              to={button.to}
              className="inline-flex w-full items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-3 text-center font-heading text-[clamp(1rem,1.4vw,1.15rem)] text-[var(--text-secondary)] hover:bg-[var(--card)]"
            >
              {button.label}
            </Link>
            <p className="mt-3 text-[var(--text-primary)]/85">Curated patristic notes and liturgical reading guides.</p>
          </Card>
        ))}
      </div>
      </div>
    </main>
  );
}