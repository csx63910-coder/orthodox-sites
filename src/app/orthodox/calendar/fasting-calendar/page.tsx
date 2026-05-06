import SlavicCalendarLayout from "../../../../components/SlavicCalendarLayout";
import {
  orthodoxMasterCommemorations2026,
  orthodoxMasterFasts2026,
  orthodoxMasterGreatFeasts2026,
  orthodoxMasterSaintHighlights,
} from "../../../../data/orthodoxMasterCalendar2026";

export default function OrthodoxFastingCalendarPage() {
  return (
    <SlavicCalendarLayout
      title="Orthodox Fasting Calendar 2026"
      subtitle="Actual calendar view including saints, feast days, Pascha cycle markers, and fasting data merged from the Orthodox calendar pages."
      breadcrumbLabel="Fasting Calendar"
      breadcrumbTo="/orthodox/calendar/fasting-calendar"
      fasts={orthodoxMasterFasts2026}
      greatFeasts={orthodoxMasterGreatFeasts2026}
      dailyCommemorations={orthodoxMasterCommemorations2026}
      uniqueSaints={orthodoxMasterSaintHighlights}
      uniqueTraditions={[
        { title: "Calendar Integration", description: "Daily entries include saints and commemorations from the existing Greek, Serbian, and Russian calendar datasets." },
        { title: "Fasting Layers", description: "Strict fast, fish-allowed, and fast-free cues are rendered directly in calendar day cells." },
      ]}
      fastingVariation="Fasting practice can vary pastorally by jurisdiction, but this unified calendar keeps all major fixed and seasonal fasting references together."
      summaryChecklist={[
        "Includes major fast seasons and civil-date fasting table.",
        "Shows daily saints and commemorations in calendar cells.",
        "Contains Great Feasts and Pascha-related markers.",
      ]}
    />
  );
}
