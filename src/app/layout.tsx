import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <div className="sacred-surface min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}