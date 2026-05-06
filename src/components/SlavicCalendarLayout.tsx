import { useRef } from "react";
import Breadcrumbs from "./Breadcrumbs";
import Card from "./Card";
import SectionDivider from "./SectionDivider";

type SlavicCalendarLayoutProps = {
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
  breadcrumbTo: string;
  fasts: { fastName: string; civilDates: string; fastingType: string }[];
  greatFeasts: string[];
  dailyCommemorations: Record<string, string[]>;
  uniqueSaints: { title: string; description: string }[];
  uniqueTraditions: { title: string; description: string }[];
  fastingVariation: string;
  summaryChecklist: string[];
};

const monthOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const shortToLong: Record<string, string> = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  March: "March",
  Apr: "April",
  April: "April",
  May: "May",
  Jun: "June",
  June: "June",
  Jul: "July",
  July: "July",
  Aug: "August",
  Sept: "September",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toneClass = (events: string[]) => {
  const combined = events.join(" ").toLowerCase();
  if (combined.includes("strict fast")) return "bg-red-900/35 border-red-600/60";
  if (combined.includes("pascha") || combined.includes("fast-free")) return "bg-green-900/35 border-green-600/60";
  if (combined.includes("fish allowed")) return "bg-yellow-700/25 border-yellow-500/60";
  if (combined.includes("fast")) return "bg-orange-800/25 border-orange-500/60";
  return "bg-[var(--bg-secondary)]/55 border-[var(--border)]/25";
};

export default function SlavicCalendarLayout({
  title,
  subtitle,
  breadcrumbLabel,
  breadcrumbTo,
  fasts,
  greatFeasts,
  dailyCommemorations,
  uniqueSaints,
  uniqueTraditions,
  fastingVariation,
  summaryChecklist,
}: SlavicCalendarLayoutProps) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date();
  const todayMonth = now.getMonth();
  const todayDay = now.getDate();
  const monthRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const eventMap: Record<string, Record<number, string[]>> = Object.fromEntries(
    monthOrder.map((month) => [month, {}])
  ) as Record<string, Record<number, string[]>>;

  Object.entries(dailyCommemorations).forEach(([month, entries]) => {
    entries.forEach((entry) => {
      const match = entry.match(/^([A-Za-z]+)\s(\d+):\s(.+)$/);
      if (!match) return;
      const monthName = shortToLong[match[1]] ?? month;
      const day = Number(match[2]);
      const text = match[3];
      eventMap[monthName][day] = [...(eventMap[monthName][day] ?? []), text];
    });
  });

  greatFeasts.forEach((feast) => {
    const match = feast.match(/^([A-Za-z]+)\s(\d+):\s(.+)$/);
    if (!match) return;
    const monthName = shortToLong[match[1]] ?? match[1];
    const day = Number(match[2]);
    eventMap[monthName][day] = [...(eventMap[monthName][day] ?? []), `Great Feast: ${match[3]}`];
  });

  const scrollToMonth = (month: string) => {
    monthRefs.current[month]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Orthodox", to: "/orthodox" },
            { label: "Liturgical Calendar", to: "/orthodox/calendar" },
            { label: breadcrumbLabel, to: breadcrumbTo },
          ]}
        />

        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-4xl text-lg text-[var(--text-primary)]/88">{subtitle}</p>
        <p className="mt-2 text-sm text-[var(--text-primary)]/75">Local timezone: {timezone}. Today's date is highlighted automatically.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => scrollToMonth(monthOrder[todayMonth])}
            className="rounded-md border border-[var(--accent)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-secondary)]"
          >
            Jump to Today
          </button>
          {monthOrder.map((month) => (
            <button
              key={month}
              onClick={() => scrollToMonth(month)}
              className="rounded-md border border-[var(--border)]/45 bg-[var(--bg-secondary)] px-2 py-1 text-xs hover:border-[var(--accent)]"
            >
              {month.slice(0, 3)}
            </button>
          ))}
        </div>

        <SectionDivider label="Calendar View" />

        <div className="grid gap-4 xl:grid-cols-2">
          {monthOrder.map((month, monthIndex) => {
            const daysInMonth = new Date(2026, monthIndex + 1, 0).getDate();
            const firstDay = new Date(2026, monthIndex, 1).getDay();
            const cells: Array<number | null> = [
              ...Array.from({ length: firstDay }, () => null),
              ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
            ];
            while (cells.length % 7 !== 0) cells.push(null);

            return (
              <div
                key={month}
                ref={(element) => {
                  monthRefs.current[month] = element;
                }}
              >
                <Card>
                  <h2 className="font-heading text-2xl text-[var(--text-secondary)]">{month}</h2>
                  <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs text-[var(--text-primary)]/70">
                    {weekdays.map((weekday) => (
                      <div key={weekday} className="py-1 font-semibold">
                        {weekday}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {cells.map((day, index) => {
                      if (!day) return <div key={`${month}-empty-${index}`} className="h-16 rounded border border-transparent" />;
                      const events = eventMap[month][day] ?? [];
                      const isToday = monthIndex === todayMonth && day === todayDay;
                      return (
                        <div
                          key={`${month}-${day}`}
                          className={`h-16 rounded border p-1 ${toneClass(events)} ${
                            isToday ? "ring-2 ring-[var(--accent)] shadow-[0_0_0_2px_rgba(201,168,76,0.25)]" : ""
                          }`}
                          title={events.join(" | ")}
                        >
                          <p className="text-[11px] font-semibold text-[var(--text-secondary)]">
                            {day} {isToday ? "• Today" : ""}
                          </p>
                          <p className="line-clamp-2 text-[10px] leading-tight text-[var(--text-primary)]/88">{events[0] ?? ""}</p>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        <SectionDivider label="Fasting Overview" />
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]/35 text-[var(--text-secondary)]">
                <th className="px-2 py-2 font-heading">Fast Name</th>
                <th className="px-2 py-2 font-heading">2026 Dates (Civil)</th>
                <th className="px-2 py-2 font-heading">Fasting Type</th>
              </tr>
            </thead>
            <tbody>
              {fasts.map((row) => (
                <tr key={row.fastName} className="border-b border-[var(--border)]/20">
                  <td className="px-2 py-2">{row.fastName}</td>
                  <td className="px-2 py-2">{row.civilDates}</td>
                  <td className="px-2 py-2">{row.fastingType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <SectionDivider label="Great Feasts" />
        <div className="grid gap-3 md:grid-cols-2">
          {greatFeasts.map((feast) => (
            <Card key={feast}>{feast}</Card>
          ))}
        </div>

        <SectionDivider label="National and Local Saints" />
        <div className="grid gap-4 md:grid-cols-2">
          {uniqueSaints.map((saint) => (
            <Card key={saint.title}>
              <h3 className="font-heading text-xl text-[var(--text-secondary)]">{saint.title}</h3>
              <p className="mt-2">{saint.description}</p>
            </Card>
          ))}
        </div>

        <SectionDivider label="Unique Liturgical Traditions" />
        <div className="grid gap-4 md:grid-cols-2">
          {uniqueTraditions.map((item) => (
            <Card key={item.title}>
              <h3 className="font-heading text-xl text-[var(--text-secondary)]">{item.title}</h3>
              <p className="mt-2">{item.description}</p>
            </Card>
          ))}
        </div>

        <SectionDivider label="Fasting Variations" />
        <Card>
          <p>{fastingVariation}</p>
        </Card>

        <SectionDivider label="Summary Checklist" />
        <Card>
          <ul className="space-y-2">
            {summaryChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>
    </main>
  );
}
