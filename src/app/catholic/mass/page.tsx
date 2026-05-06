import TraditionPage from "../../../components/TraditionPage";
import { catholicContent } from "../../siteData";

export default function CatholicMassPage() {
  return <TraditionPage content={catholicContent.mass} patternClassName="catholic-pattern" />;
}