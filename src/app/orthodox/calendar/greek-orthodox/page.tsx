import { useRef } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import SectionDivider from "../../../../components/SectionDivider";
import {
  greekCommemorations2026,
  greekFastingSeasons2026,
  greekMajorEvents2026,
} from "../../../../data/greekOrthodoxCalendar2026";

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

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const buildCalendarEvents = () => {
  const eventMap: Record<string, Record<number, string[]>> = Object.fromEntries(
    monthOrder.map((month) => [month, {}])
  ) as Record<string, Record<number, string[]>>;

  Object.entries(greekCommemorations2026).forEach(([month, entries]) => {
    entries.forEach((entry) => {
      const match = entry.match(/^([A-Za-z]+)\s(\d+):\s(.+)$/);
      if (!match) return;
      const longMonth = shortToLong[match[1]] ?? month;
      const day = Number(match[2]);
      const text = match[3];
      eventMap[longMonth][day] = [...(eventMap[longMonth][day] ?? []), text];
    });
  });

  greekMajorEvents2026.forEach((item) => {
    const match = item.date.match(/^([A-Za-z]+)\s(\d+)/);
    if (!match) return;
    const month = shortToLong[match[1]] ?? match[1];
    const day = Number(match[2]);
    const text = `${item.event} - ${item.fastingNote}`;
    eventMap[month][day] = [...(eventMap[month][day] ?? []), text];
  });

  return eventMap;
};

const eventMap = buildCalendarEvents();

const toneClass = (events: string[]) => {
  const combined = events.join(" ").toLowerCase();
  if (combined.includes("strict fast")) return "bg-red-900/35 border-red-600/60";
  if (combined.includes("fast-free")) return "bg-green-900/35 border-green-600/60";
  if (combined.includes("fish allowed")) return "bg-yellow-700/25 border-yellow-500/60";
  if (combined.includes("fast begins") || combined.includes("fast")) return "bg-orange-800/25 border-orange-500/60";
  return "bg-[var(--bg-secondary)]/55 border-[var(--border)]/25";
};

export default function GreekOrthodoxCalendarPage() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date();
  const todayMonthIndex = now.getMonth();
  const todayDay = now.getDate();
  const monthRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToMonth = (month: string) => {
    monthRefs.current[month]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Orthodox", to: "/orthodox" },
          { label: "Liturgical Calendar", to: "/orthodox/calendar" },
          { label: "Greek Orthodox Calendar", to: "/orthodox/calendar/greek-orthodox" },
        ]}
      />

      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">Greek Orthodox Calendar 2026</h1>
        <p className="mt-3 max-w-4xl text-lg text-[var(--text-primary)]/88">
          Full calendar layout with saint commemorations, fasting markers, and major feast milestones for the Greek Orthodox liturgical year.
        </p>
        <p className="mt-2 text-sm text-[var(--text-primary)]/75">Local timezone: {timezone}. Today's date is highlighted automatically.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => scrollToMonth(monthOrder[todayMonthIndex])}
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

        <Card className="mb-4">
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded border border-red-500 bg-red-900/40" /> Strict fast</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded border border-orange-500 bg-orange-800/30" /> Fast day / fast season</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded border border-yellow-500 bg-yellow-700/30" /> Fish allowed</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded border border-green-500 bg-green-900/40" /> Fast-free</span>
          </div>
        </Card>

        <div className="grid gap-4 xl:grid-cols-2">
          {monthOrder.map((month, monthIndex) => {
            const daysInMonth = new Date(2026, monthIndex + 1, 0).getDate();
            const firstWeekday = new Date(2026, monthIndex, 1).getDay();
            const cells: Array<number | null> = [
              ...Array.from({ length: firstWeekday }, () => null),
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
                  {weekdayLabels.map((weekday) => (
                    <div key={weekday} className="py-1 font-semibold">{weekday}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {cells.map((day, index) => {
                    if (!day) return <div key={`${month}-empty-${index}`} className="h-16 rounded border border-transparent" />;
                    const events = eventMap[month][day] ?? [];
                    const isToday = monthIndex === todayMonthIndex && day === todayDay;
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
                        <p className="line-clamp-2 text-[10px] leading-tight text-[var(--text-primary)]/88">
                          {events[0] ?? ""}
                        </p>
                      </div>
                    );
                  })}
                </div>
                </Card>
              </div>
            );
          })}
        </div>

        <SectionDivider label="Major Dates" />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {greekMajorEvents2026.map((item) => (
            <Card key={item.event}>
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">{item.event}</h2>
              <p className="mt-2">{item.date}</p>
              <p className="mt-1 text-sm text-[var(--text-primary)]/75">{item.fastingNote}</p>
            </Card>
          ))}
        </div>

        <SectionDivider label="Fasting Seasons" />

        <div className="grid gap-4 md:grid-cols-2">
          {greekFastingSeasons2026.map((season) => (
            <Card key={season}>
              <p className="text-lg text-[var(--text-primary)]/90">{season}</p>
            </Card>
          ))}
        </div>

        <p className="mt-2 text-sm text-[var(--text-primary)]/75">
          Tip: Hover any day cell to preview full commemorations for that date.
        </p>
      </div>
    </main>
  );
}
