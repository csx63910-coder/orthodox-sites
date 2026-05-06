import TraditionPage from "../../../components/TraditionPage";
import { catholicContent } from "../../siteData";

export default function CatholicResourcesPage() {
  return <TraditionPage content={catholicContent.resources} patternClassName="catholic-pattern" />;
}