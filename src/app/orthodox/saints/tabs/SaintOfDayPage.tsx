import { useEffect, useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import SectionDivider from "../../../../components/SectionDivider";
import OrthodoxSaintTabs from "../../../../components/OrthodoxSaintTabs";

export default function SaintOfDayPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToday = async () => {
      try {
        const d = new Date();
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        const day = d.getDate();
        const res = await fetch(`https://orthocal.info/api/gregorian/${y}/${m}/${day}/`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchToday();
  }, []);

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orthodox", to: "/orthodox" }, { label: "Saints", to: "/orthodox/saints" }, { label: "Saint of the Day", to: "/orthodox/saints/saint-of-the-day" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Saint of the Day</h1>
        <OrthodoxSaintTabs />

        {loading ? (
          <div className="mt-12 text-center animate-pulse text-[var(--text-secondary)]">Fetching today's commemoration...</div>
        ) : data ? (
          <div className="mt-8 space-y-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Today's Feast</p>
              <h2 className="font-heading text-3xl text-[var(--text-secondary)] mt-2">{data.summary_title}</h2>
              <p className="mt-1 text-[var(--text-primary)]/60">
                {new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>

            {data.stories && data.stories.length > 0 ? (
              data.stories.map((story: any, idx: number) => (
                <Card key={idx} className={idx === 0 ? "border-l-4 border-l-[var(--accent)]" : ""}>
                  <h3 className="font-heading text-xl text-[var(--text-secondary)]">{story.title}</h3>
                  <div className="mt-4 text-[var(--text-primary)]/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: story.story }} />
                </Card>
              ))
            ) : (
              <Card>
                <p className="text-center py-8 text-[var(--text-primary)]/60 italic">Detailed stories for today are currently being gathered.</p>
              </Card>
            )}

            <SectionDivider label="Daily Readings" />
            <div className="grid gap-4 md:grid-cols-2">
              {data.readings.map((reading: any, idx: number) => (
                <Card key={idx}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-[var(--accent)]">{reading.source}</span>
                    <span className="text-xs text-[var(--text-primary)]/50">{reading.book}</span>
                  </div>
                  <h4 className="font-heading text-lg text-[var(--text-secondary)] mt-1">{reading.display}</h4>
                  <p className="mt-2 text-sm text-[var(--text-primary)]/80 line-clamp-3 italic">
                    {reading.passage?.[0]?.content} ...
                  </p>
                </Card>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
