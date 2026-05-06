import TraditionPage from "../../../components/TraditionPage";
import { catholicContent } from "../../siteData";

export default function CatholicMusicPage() {
  return <TraditionPage content={catholicContent.music} patternClassName="catholic-pattern" />;
}