import TraditionPage from "../../../components/TraditionPage";
import { orthodoxContent } from "../../siteData";

export default function OrthodoxParishesPage() {
  return <TraditionPage content={orthodoxContent.parishes} patternClassName="orthodox-pattern" />;
}