import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Card from "../../../components/Card";
import OrthodoxSaintTabs from "../../../components/OrthodoxSaintTabs";
import SectionDivider from "../../../components/SectionDivider";

export default function OrthodoxSaintsPage() {
  const items = [
    { label: "Lives of the Saints (Synaxarion)", to: "/orthodox/saints/synaxarion" },
    { label: "Saint of the Day", to: "/orthodox/saints/saint-of-the-day" },
    { label: "Name Day Lookup", to: "/orthodox/saints/name-day-lookup" },
    { label: "Patron Saints", to: "/orthodox/saints/patron-saints" },
  ];

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Orthodox", to: "/orthodox" },
            { label: "Saints", to: "/orthodox/saints" },
          ]}
        />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">Orthodox Saints</h1>
        <p className="mt-3 text-lg text-[var(--text-primary)]/88">Select a dedicated saints tab for daily or searchable use.</p>
        <OrthodoxSaintTabs />
        <SectionDivider label="Saint Tools" />
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item.label}>
              <Link to={item.to} className="font-heading text-xl text-[var(--text-secondary)] underline underline-offset-4">
                {item.label}
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}