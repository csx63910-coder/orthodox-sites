import SlavicCalendarLayout from "../../../../components/SlavicCalendarLayout";
import {
  orthodoxMasterCommemorations2026,
  orthodoxMasterFasts2026,
  orthodoxMasterGreatFeasts2026,
  orthodoxMasterSaintHighlights,
} from "../../../../data/orthodoxMasterCalendar2026";

export default function FeastDaysSaintsPage() {
  return (
    <SlavicCalendarLayout
      title="Feast Days and Saints Calendar 2026"
      subtitle="Actual calendar view with all merged daily saint entries, major feasts, Pascha markers, and fasting context from the Orthodox calendar datasets."
      breadcrumbLabel="Feast Days and Saints"
      breadcrumbTo="/orthodox/calendar/feast-days-saints"
      fasts={orthodoxMasterFasts2026}
      greatFeasts={orthodoxMasterGreatFeasts2026}
      dailyCommemorations={orthodoxMasterCommemorations2026}
      uniqueSaints={orthodoxMasterSaintHighlights}
      uniqueTraditions={[
        { title: "Daily Saints in Grid", description: "Every calendar cell includes the first saint/commemoration for that day with full list on hover." },
        { title: "Feast Integration", description: "Great Feasts and Pascha-linked days are overlaid into the same unified annual view." },
      ]}
      fastingVariation="Fasting and feast observance are displayed together so saints, feast rank, and abstinence patterns can be read in one place."
      summaryChecklist={[
        "Merged saint data across existing Orthodox calendar pages.",
        "Great Feasts and Pascha included in the same visual calendar.",
        "Fasting table preserved for quick reference.",
      ]}
    />
  );
}
