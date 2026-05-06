import SlavicCalendarLayout from "../../../../components/SlavicCalendarLayout";
import {
  serbianSaints,
  serbianTraditions,
  slavicSummaryChecklist,
} from "../../../../data/slavicCalendarData";
import {
  slavicDailyCommemorations2026,
  slavicFasts2026,
  slavicGreatFeasts2026,
} from "../../../../data/slavicCalendar2026";

export default function SerbianOrthodoxCalendarPage() {
  return (
    <SlavicCalendarLayout
      title="Serbian Orthodox Calendar 2026"
      subtitle="Calendar layout for Serbian Orthodox liturgical life with fixed feast shifts, daily commemorations, Slava context, and fasting rhythm."
      breadcrumbLabel="Serbian Orthodox Calendar"
      breadcrumbTo="/orthodox/calendar/serbian-orthodox"
      fasts={slavicFasts2026}
      greatFeasts={slavicGreatFeasts2026}
      dailyCommemorations={slavicDailyCommemorations2026}
      uniqueSaints={serbianSaints}
      uniqueTraditions={serbianTraditions}
      fastingVariation="While the major fasting seasons are identical to other Orthodox jurisdictions, Serbian dioceses may apply local pastoral adjustments for oil and fish allowances based on parish practice and spiritual father guidance."
      summaryChecklist={slavicSummaryChecklist}
    />
  );
}
