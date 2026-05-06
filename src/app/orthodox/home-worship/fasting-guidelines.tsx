import TraditionPage from "../../../components/TraditionPage";
import { orthodoxContent } from "../../siteData";

export default function FastingGuidelinesPage() {
  return <TraditionPage content={orthodoxContent["fasting-guidelines"]} patternClassName="orthodox-pattern" />;
}
