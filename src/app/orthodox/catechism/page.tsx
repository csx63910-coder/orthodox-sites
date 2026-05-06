import TraditionPage from "../../../components/TraditionPage";
import { orthodoxContent } from "../../siteData";

export default function OrthodoxCatechismPage() {
  return <TraditionPage content={orthodoxContent.catechism} patternClassName="orthodox-pattern" />;
}