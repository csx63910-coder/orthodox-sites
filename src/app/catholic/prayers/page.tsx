import TraditionPage from "../../../components/TraditionPage";
import { catholicContent } from "../../siteData";

export default function CatholicPrayersPage() {
  return <TraditionPage content={catholicContent.prayers} patternClassName="catholic-pattern" />;
}