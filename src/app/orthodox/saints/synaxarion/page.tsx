import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import OrthodoxSaintTabs from "../../../../components/OrthodoxSaintTabs";
import SectionDivider from "../../../../components/SectionDivider";
import { synaxarionByMonth } from "../../../../data/orthodoxSaintsTabsData";

export default function SynaxarionPage() {
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orthodox", to: "/orthodox" }, { label: "Synaxarion", to: "/orthodox/saints/synaxarion" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Lives of the Saints (Synaxarion)</h1>
        <OrthodoxSaintTabs />
        <SectionDivider label="Monthly Saints" />
        <div className="space-y-4">
          {Object.entries(synaxarionByMonth).map(([month, entries]) => (
            <Card key={month}>
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">{month}</h2>
              <ul className="mt-2 space-y-1 text-sm">
                {entries.slice(0, 18).map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
