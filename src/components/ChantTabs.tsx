import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";

const chantTabs = [
  { label: "Byzantine Chant", to: "/orthodox/chant/byzantine" },
  { label: "Znamenny Chant", to: "/orthodox/chant/znamenny" },
  { label: "Serbian Chant", to: "/orthodox/chant/serbian" },
  { label: "Armenian Sharakan", to: "/orthodox/chant/armenian" },
  { label: "Antiochian Orthodox Chant", to: "/orthodox/chant/antiochian" },
  { label: "Arabic Liturgical Hymns", to: "/orthodox/chant/arabic" },
];

export default function ChantTabs() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {chantTabs.map((tab) => (
        <NavLink
          key={tab.label}
          to={tab.to}
          className={({ isActive }) =>
            cn(
              "rounded-md border px-3 py-2 text-sm",
              isActive ? "border-[var(--accent)] text-[var(--text-secondary)]" : "border-[var(--border)]/40 text-[var(--text-primary)]/85"
            )
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
