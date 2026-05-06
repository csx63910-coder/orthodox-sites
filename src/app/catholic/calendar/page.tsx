import TraditionPage from "../../../components/TraditionPage";
import { catholicContent } from "../../siteData";

export default function CatholicCalendarPage() {
  return <TraditionPage content={catholicContent.calendar} patternClassName="catholic-pattern" />;
}