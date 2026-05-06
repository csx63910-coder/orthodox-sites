import TraditionPage from "../../../components/TraditionPage";
import { catholicContent } from "../../siteData";

export default function CatholicDevotionsPage() {
  return <TraditionPage content={catholicContent.devotions} patternClassName="catholic-pattern" />;
}