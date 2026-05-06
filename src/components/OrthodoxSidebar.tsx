import { orthodoxSections } from "../app/siteData";
import Sidebar from "./Sidebar";

type Props = {
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export default function OrthodoxSidebar({ mobileOpen, onCloseMobile }: Props) {
  return <Sidebar title="Orthodox ☦" titleHref="/orthodox" sections={orthodoxSections} mobileOpen={mobileOpen} onCloseMobile={onCloseMobile} />;
}
