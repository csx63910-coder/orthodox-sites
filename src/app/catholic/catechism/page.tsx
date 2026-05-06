import TraditionPage from "../../../components/TraditionPage";
import { catholicContent } from "../../siteData";

export default function CatholicCatechismPage() {
  return <TraditionPage content={catholicContent.catechism} patternClassName="catholic-pattern" />;
}