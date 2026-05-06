import { useEffect, useState, useCallback, useMemo } from "react";
import { Search, BookOpen } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import OrthodoxSaintTabs from "../../../../components/OrthodoxSaintTabs";
import orthodoxCalendarData from "../../../../data/orthodox_calendar_data.json";

export default function SynaxarionPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      const [m, d] = dateParam.split("-").map(Number);
      if (!isNaN(m) && !isNaN(d)) {
        const date = new Date();
        date.setMonth(m - 1);
        date.setDate(d);
        return date;
      }
    }
    return new Date();
  });

  const fetchDay = useCallback(async (d: Date) => {
    setLoading(true);
    try {
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
  }, []);

  useEffect(() => {
    fetchDay(selectedDate);
    // Update URL without reloading
    const m = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const d = selectedDate.getDate().toString().padStart(2, '0');
    setSearchParams({ date: `${m}-${d}` }, { replace: true });
  }, [selectedDate, fetchDay, setSearchParams]);

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return (orthodoxCalendarData as any[]).filter(day => 
      day.saintsAndFeast.toLowerCase().includes(searchQuery.toLowerCase()) ||
      day.summary.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 10);
  }, [searchQuery]);

  const handleSelectDay = (month: string, date: string) => {
    const d = new Date();
    d.setMonth(parseInt(month) - 1);
    d.setDate(parseInt(date));
    setSelectedDate(d);
    setSearchQuery("");
  };

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orthodox", to: "/orthodox" }, { label: "Saints", to: "/orthodox/saints" }, { label: "Synaxarion", to: "/orthodox/saints/synaxarion" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Lives of the Saints (Synaxarion)</h1>
        <OrthodoxSaintTabs />

        <div className="mt-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-primary)]/40 h-5 w-5" />
            <input
              type="text"
              placeholder="Search all saints by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)]/40 bg-[var(--card)] py-4 pl-10 pr-4 text-lg outline-none focus:border-[var(--accent)]"
            />
            {searchResults.length > 0 && (
              <div className="absolute z-10 mt-2 w-full rounded-xl border border-[var(--border)]/40 bg-[var(--card)] shadow-xl overflow-hidden">
                {searchResults.map((res, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectDay(res.month, res.date)}
                    className="w-full px-4 py-3 text-left hover:bg-[var(--accent)]/10 transition-colors border-b border-[var(--border)]/10 last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-[var(--text-secondary)]">{res.summary}</span>
                      <span className="text-xs font-bold text-[var(--accent)]">
                        {new Date(2024, parseInt(res.month) - 1, parseInt(res.date)).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-primary)]/60 line-clamp-1">{res.saintsAndFeast}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="font-heading text-2xl text-[var(--text-secondary)]">
            Commemoration: {selectedDate.toLocaleDateString(undefined, { month: "long", day: "numeric" })}
          </h2>
          {selectedDate.toDateString() !== new Date().toDateString() && (
            <button 
              onClick={() => setSelectedDate(new Date())}
              className="text-sm text-[var(--accent)] underline underline-offset-4"
            >
              Return to Today
            </button>
          )}
        </div>

        {loading ? (
          <div className="mt-12 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent"></div>
            <p className="mt-4 animate-pulse text-[var(--text-secondary)]">Opening the sacred books...</p>
          </div>
        ) : data ? (
          <div className="mt-8 space-y-6">
            <Card className="bg-[var(--accent)]/5 border-l-4 border-l-[var(--accent)]">
              <h3 className="font-heading text-2xl text-[var(--text-secondary)]">{data.summary_title}</h3>
              <p className="mt-1 text-[var(--text-primary)]/70 italic">{data.fast_level_desc}</p>
            </Card>

            {data.stories && data.stories.length > 0 ? (
              data.stories.map((story: any, idx: number) => (
                <Card key={idx} className="group hover:border-[var(--accent)]/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="h-6 w-6 text-[var(--accent)]/60" />
                    <h4 className="font-heading text-xl text-[var(--text-secondary)]">{story.title}</h4>
                  </div>
                  <div className="prose prose-stone max-w-none text-[var(--text-primary)]/90 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: story.story }} />
                </Card>
              ))
            ) : (
              <Card className="text-center py-12">
                <p className="text-[var(--text-primary)]/60 italic">Detailed biographies for this feast are currently being gathered. Please check other resources for the Life of the Saint.</p>
              </Card>
            )}
          </div>
        ) : null}
      </div>
    </main>
  );
}
