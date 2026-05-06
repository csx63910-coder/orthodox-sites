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

export default function ArmenianOrthodoxCalendarPage() {
  return (
    <SlavicCalendarLayout
      title="Armenian Orthodox Calendar 2026"
      subtitle="Calendar layout copied from the Russian Orthodox calendar page as requested."
      breadcrumbLabel="Armenian Orthodox Calendar"
      breadcrumbTo="/orthodox/calendar/armenian-orthodox"
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
