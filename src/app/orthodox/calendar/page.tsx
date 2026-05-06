import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Card from "../../../components/Card";
import SectionDivider from "../../../components/SectionDivider";

export default function OrthodoxCalendarPage() {
  const calendarItems = [
    { label: "Greek Orthodox Calendar", to: "/orthodox/calendar/greek-orthodox", clickable: true },
    { label: "Serbian Orthodox Calendar", to: "/orthodox/calendar/serbian-orthodox", clickable: true },
    { label: "Russian Orthodox Calendar", to: "/orthodox/calendar/russian-orthodox", clickable: true },
    { label: "Armenian Apostolic Calendar", to: "/orthodox/calendar/armenian-orthodox", clickable: true },
    { label: "Antiochian Orthodox Calendar", to: "/orthodox/calendar/antiochian-orthodox", clickable: true },
    { label: "Fasting Calendar", to: "/orthodox/calendar/fasting-calendar", clickable: true },
    { label: "Feast Days & Saints", to: "/orthodox/calendar/feast-days-saints", clickable: true },
    { label: "Pascha Calculator", to: "/orthodox/calendar/pascha-calculator", clickable: true },
  ];

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Orthodox", to: "/orthodox" },
            { label: "Liturgical Calendar", to: "/orthodox/calendar" },
          ]}
        />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">Liturgical Calendar</h1>
        <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/88">
          Explore jurisdiction calendars, fasting rhythms, feast cycles, and daily commemorations.
        </p>

        <SectionDivider label="Open Liturgical Calendar" />

        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
          {calendarItems.map((item) => (
            <Card key={item.label}>
              {item.clickable ? (
                <Link
                  to={item.to}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-3 text-center font-heading text-lg text-[var(--text-secondary)] hover:bg-[var(--card)]"
                >
                  {item.label}
                </Link>
              ) : (
                <div className="inline-flex w-full items-center justify-center rounded-lg border border-[var(--border)]/35 bg-[var(--bg-secondary)] px-3 py-3 text-center font-heading text-lg text-[var(--text-primary)]/75">
                  {item.label}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}