import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeSelector from "./ThemeSelector";

export default function Footer() {
  const { t } = useTranslation();
  
  const links = [
    { label: t('footer.about'), to: "/shared" },
    { label: t('footer.contact'), to: "/shared" },
    { label: t('footer.prayer_requests'), to: "/candle" },
    { label: t('footer.donate'), to: "/shared" },
  ];

  return (
    <footer className="border-t border-[var(--border)]/40 bg-[var(--bg-secondary)] px-4 py-8">
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="mb-2 flex flex-wrap gap-4 text-sm">
            {links.map((link) => (
              <Link key={link.label} to={link.to} className="text-[var(--text-primary)]/85 hover:text-[var(--text-secondary)]">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-[var(--text-primary)]/70">{t('footer.glory')}</p>
          <p className="text-xs text-[var(--text-primary)]/60">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
        <ThemeSelector />
      </div>
    </footer>
  );
}