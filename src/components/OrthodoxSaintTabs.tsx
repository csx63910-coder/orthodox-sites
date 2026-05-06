import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";

const tabs = [
  { label: "Lives of the Saints (Synaxarion)", to: "/orthodox/saints/synaxarion" },
  { label: "Saint of the Day", to: "/orthodox/saints/saint-of-the-day" },
  { label: "Name Saint", to: "/orthodox/saints/name-day-lookup" },
  { label: "Patron Saints", to: "/orthodox/saints/patron-saints" },
];

export default function OrthodoxSaintTabs() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <NavLink
          key={tab.label}
          to={tab.to}
          className={({ isActive }) =>
            cn(
              "rounded-md border px-3 py-2 text-sm",
              isActive ? "border-[var(--accent)] text-[var(--text-secondary)]" : "border-[var(--border)]/40"
            )
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
