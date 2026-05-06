import { useMemo, useState } from "react";
import SlavicCalendarLayout from "../../../../components/SlavicCalendarLayout";
import Card from "../../../../components/Card";
import SectionDivider from "../../../../components/SectionDivider";
import {
  orthodoxMasterCommemorations2026,
  orthodoxMasterFasts2026,
  orthodoxMasterGreatFeasts2026,
  orthodoxMasterSaintHighlights,
} from "../../../../data/orthodoxMasterCalendar2026";

const knownPascha: Record<number, string> = {
  2024: "May 5",
  2025: "April 20",
  2026: "April 12",
  2027: "May 2",
  2028: "April 16",
  2029: "April 8",
  2030: "April 28",
};

export default function PaschaCalculatorPage() {
  const [year, setYear] = useState(2026);
  const result = useMemo(() => knownPascha[year] ?? "Not listed in this static calculator range.", [year]);

  return (
    <div>
      <SlavicCalendarLayout
        title="Pascha and Liturgical Calendar 2026"
        subtitle="Full calendar view with saints, feasts, fasting periods, and Pascha context across the Orthodox datasets."
        breadcrumbLabel="Pascha Calculator"
        breadcrumbTo="/orthodox/calendar/pascha-calculator"
        fasts={orthodoxMasterFasts2026}
        greatFeasts={orthodoxMasterGreatFeasts2026}
        dailyCommemorations={orthodoxMasterCommemorations2026}
        uniqueSaints={orthodoxMasterSaintHighlights}
        uniqueTraditions={[
          { title: "Paschal Cycle", description: "Pascha, Holy Week, Bright Week, Ascension, and Pentecost are represented within day cells and feast overlays." },
          { title: "Calendar and Calculator", description: "Use the quick lookup below for nearby Pascha years while keeping full-year visual context above." },
        ]}
        fastingVariation="Fasting references remain visible alongside Pascha milestones to show transition from Lenten strictness to Paschal fast-free celebration."
        summaryChecklist={[
          "Pascha date lookup for 2024-2030 included.",
          "Calendar grid includes saints, feasts, and fasting markers.",
          "Merged data from existing Orthodox calendar pages.",
        ]}
      />

      <section className="orthodox-pattern px-4 pb-12 md:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <SectionDivider label="Pascha Lookup" />
          <Card>
            <label className="block text-sm text-[var(--text-primary)]/80">Select Year</label>
            <select
              value={year}
              onChange={(event) => setYear(Number(event.target.value))}
              className="mt-2 rounded-md border border-[var(--border)]/50 bg-[var(--bg-secondary)] px-3 py-2"
            >
              {Object.keys(knownPascha).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <p className="mt-4 text-lg">
              Pascha in <span className="text-[var(--text-secondary)]">{year}</span>: <span className="font-semibold">{result}</span>
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
