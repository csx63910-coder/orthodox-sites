import TraditionPage from "../../../components/TraditionPage";
import { catholicContent } from "../../siteData";

export default function CatholicParishesPage() {
  return <TraditionPage content={catholicContent.parishes} patternClassName="catholic-pattern" />;
}