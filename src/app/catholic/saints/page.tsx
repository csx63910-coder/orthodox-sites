import TraditionPage from "../../../components/TraditionPage";
import { catholicContent } from "../../siteData";

export default function CatholicSaintsPage() {
  return <TraditionPage content={catholicContent.saints} patternClassName="catholic-pattern" />;
}