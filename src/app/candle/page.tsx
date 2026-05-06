import Footer from "../../components/Footer";
import Header from "../../components/Header";
import VirtualCandle from "../../components/VirtualCandle";

export default function CandlePage() {
  return (
    <div className="sacred-surface min-h-screen">
      <Header />
      <VirtualCandle />
      <Footer />
    </div>
  );
}