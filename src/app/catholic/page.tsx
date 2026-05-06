import TraditionPage from "../../components/TraditionPage";
import { catholicContent } from "../siteData";

export default function CatholicDashboardPage() {
  return <TraditionPage content={catholicContent.dashboard} patternClassName="catholic-pattern" />;
}