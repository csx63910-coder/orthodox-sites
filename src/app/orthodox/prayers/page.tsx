import TraditionPage from "../../../components/TraditionPage";
import { orthodoxContent } from "../../siteData";

export default function OrthodoxPrayersPage() {
  return <TraditionPage content={orthodoxContent.prayers} patternClassName="orthodox-pattern" />;
}