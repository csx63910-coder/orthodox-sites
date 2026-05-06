import TraditionPage from "../../../components/TraditionPage";
import { catholicContent } from "../../siteData";

export default function CatholicHomeFaithPage() {
  return <TraditionPage content={catholicContent["home-faith"]} patternClassName="catholic-pattern" />;
}