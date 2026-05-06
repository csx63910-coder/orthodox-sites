import { Check, Palette } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

export default function ThemeSelector() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { themes, currentTheme, setTheme } = useTheme();

  return (
    <div className="relative">
      <button
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t('sidebar.theme')}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)]/50 bg-[var(--card)] px-3 py-2 text-sm"
      >
        <Palette size={16} />
        {t('sidebar.theme')}
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Theme selector"
          className="absolute right-0 z-50 mt-3 w-72 rounded-xl border border-[var(--border)]/60 bg-[var(--bg-secondary)] p-3 shadow-2xl"
        >
          <p className="mb-2 font-heading text-sm text-[var(--text-secondary)]">{t('sidebar.choose_atmosphere')}</p>
          <div className="space-y-2">
            {themes.map((theme) => {
              const selected = theme.value === currentTheme.value;
              return (
                <button
                  key={theme.value}
                  onClick={() => {
                    setTheme(theme.value);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-lg border border-transparent px-2 py-2 text-left hover:border-[var(--border)]/50"
                >
                  <div>
                    <p className="text-sm font-semibold">{theme.name}</p>
                    <div className="mt-1 flex gap-1">
                      {[theme.colors.bgPrimary, theme.colors.accent, theme.colors.buttonFrom].map((color) => (
                        <span key={color} className="h-3 w-3 rounded-full border border-white/40" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                  {selected && <Check size={16} className="text-[var(--accent)]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}