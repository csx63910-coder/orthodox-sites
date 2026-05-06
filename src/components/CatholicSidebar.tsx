import { catholicSections } from "../app/siteData";
import Sidebar from "./Sidebar";

type Props = {
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export default function CatholicSidebar({ mobileOpen, onCloseMobile }: Props) {
  return <Sidebar title="Catholic ✝" titleHref="/catholic" sections={catholicSections} mobileOpen={mobileOpen} onCloseMobile={onCloseMobile} />;
}
