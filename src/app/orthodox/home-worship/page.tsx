import TraditionPage from "../../../components/TraditionPage";
import { orthodoxContent } from "../../siteData";

export default function OrthodoxHomeWorshipPage() {
  return <TraditionPage content={orthodoxContent["home-worship"]} patternClassName="orthodox-pattern" />;
}