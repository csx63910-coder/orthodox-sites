import TraditionPage from "../../../components/TraditionPage";
import { orthodoxContent } from "../../siteData";

export default function OrthodoxResourcesPage() {
  return <TraditionPage content={orthodoxContent.resources} patternClassName="orthodox-pattern" />;
}