import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { topNavLinks } from "../app/siteData";
import { cn } from "../utils/cn";
import ThemeSelector from "./ThemeSelector";
import LanguageTranslator from "./LanguageTranslator";

type HeaderProps = {
  onOpenSidebar?: () => void;
};

export default function Header({ onOpenSidebar }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 h-[var(--header-h)] border-b border-[var(--border)]/45 bg-[color-mix(in_srgb,var(--bg-secondary)_82%,transparent)] backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-3 px-3 sm:px-4">
        <NavLink to="/" className="font-heading text-lg text-[var(--text-secondary)] md:text-xl">
          {t('brand')}
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {topNavLinks.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm xl:px-3 xl:py-2",
                  isActive ? "bg-[var(--card)] text-[var(--text-secondary)]" : "text-[var(--text-primary)]/90"
                )
              }
            >
              <Icon size={14} /> {t(`nav.${label.toLowerCase().replace(/\s+/g, '_')}`)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageTranslator />
          <ThemeSelector />
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="rounded-md border border-[var(--border)]/50 p-2 md:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}