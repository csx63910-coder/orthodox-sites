import TraditionPage from "../../../components/TraditionPage";
import { orthodoxContent } from "../../siteData";

export default function FamilyDevotionsPage() {
  return <TraditionPage content={orthodoxContent["family-devotions"]} patternClassName="orthodox-pattern" />;
}
