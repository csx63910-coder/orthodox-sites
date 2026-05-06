import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import OrthodoxSaintTabs from "../../../../components/OrthodoxSaintTabs";
import SectionDivider from "../../../../components/SectionDivider";
import { getSaintOfToday } from "../../../../data/orthodoxSaintsTabsData";

export default function SaintOfTheDayPage() {
  const today = getSaintOfToday();

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orthodox", to: "/orthodox" }, { label: "Saint of the Day", to: "/orthodox/saints/saint-of-the-day" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Saint of the Day</h1>
        <OrthodoxSaintTabs />
        <SectionDivider label="Today's Commemoration" />
        <Card>
          <p className="text-sm text-[var(--text-primary)]/70">{today.month} {today.day}</p>
          <p className="mt-2 text-lg">{today.text}</p>
        </Card>
      </div>
    </main>
  );
}
