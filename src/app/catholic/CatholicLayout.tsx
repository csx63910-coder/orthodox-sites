import { Outlet } from "react-router-dom";
import { useState } from "react";
import CatholicSidebar from "../../components/CatholicSidebar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function CatholicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sacred-surface min-h-screen">
      <Header onOpenSidebar={() => setMobileOpen(true)} />
      <div className="flex w-full gap-4">
        <CatholicSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
        <div className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}