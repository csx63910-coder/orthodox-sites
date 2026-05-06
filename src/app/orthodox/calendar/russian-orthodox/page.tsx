import SlavicCalendarLayout from "../../../../components/SlavicCalendarLayout";
import {
  russianSaints,
  russianTraditions,
  slavicSummaryChecklist,
} from "../../../../data/slavicCalendarData";
import {
  slavicDailyCommemorations2026,
  slavicFasts2026,
  slavicGreatFeasts2026,
} from "../../../../data/slavicCalendar2026";

export default function RussianOrthodoxCalendarPage() {
  return (
    <SlavicCalendarLayout
      title="Russian Orthodox Calendar 2026"
      subtitle="Calendar layout for Russian Orthodox liturgical life with fixed feast shifts, daily commemorations, icon feasts, and New Martyr emphasis."
      breadcrumbLabel="Russian Orthodox Calendar"
      breadcrumbTo="/orthodox/calendar/russian-orthodox"
      fasts={slavicFasts2026}
      greatFeasts={slavicGreatFeasts2026}
      dailyCommemorations={slavicDailyCommemorations2026}
      uniqueSaints={russianSaints}
      uniqueTraditions={russianTraditions}
      fastingVariation="The Russian Church often keeps stricter weekday fasting discipline in lesser fasts, including oil restrictions, while applying pastoral economia through spiritual father direction."
      summaryChecklist={slavicSummaryChecklist}
    />
  );
}
