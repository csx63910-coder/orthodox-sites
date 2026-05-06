import TraditionPage from "../../../components/TraditionPage";
import { catholicContent } from "../../siteData";

export default function CatholicScripturePage() {
  return <TraditionPage content={catholicContent.scripture} patternClassName="catholic-pattern" />;
}