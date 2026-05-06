import { useState } from "react";
import { Languages, ChevronDown, Check, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../utils/cn";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "sr", name: "Српски", flag: "🇷🇸" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "bg", name: "Български", flag: "🇧🇬" },
  { code: "ar", name: "العربية", flag: "🇸🇾" },
  { code: "ka", name: "ქართული", flag: "🇬🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export default function LanguageTranslator() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const selectedLang = i18n.language || "en";

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-[var(--border)]/50 bg-[var(--card)]/50 px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--card)] shadow-sm"
        title={t('sidebar.language')}
      >
        <Languages size={14} className="text-[var(--accent)]" />
        <span className="hidden sm:inline">
          {languages.find((l) => l.code === selectedLang.split('-')[0])?.name || "Translate"}
        </span>
        <span className="sm:hidden">
          {languages.find((l) => l.code === selectedLang.split('-')[0])?.flag || "🌐"}
        </span>
        <ChevronDown
          size={12}
          className={cn("transition-transform duration-200 opacity-50", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/5 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 z-[60] w-56 overflow-hidden rounded-2xl border border-[var(--border)]/50 bg-[var(--card)] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="max-h-[380px] overflow-y-auto py-1 custom-scrollbar">
              <div className="px-4 py-3 flex items-center justify-between border-b border-[var(--border)]/10 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)]/40">
                  {t('translator.title')}
                </span>
                <Info size={12} className="text-[var(--text-primary)]/30" />
              </div>
              
              <div className="grid grid-cols-1 gap-0.5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-all hover:bg-[var(--accent)]/5",
                      selectedLang.startsWith(lang.code)
                        ? "bg-[var(--accent)]/10 text-[var(--accent)] font-bold"
                        : "text-[var(--text-primary)]/90"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl leading-none grayscale-[0.2] group-hover:grayscale-0 transition-all">{lang.flag}</span>
                      <span className="tracking-tight">{lang.name}</span>
                    </span>
                    {selectedLang.startsWith(lang.code) && (
                      <div className="h-5 w-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                        <Check size={12} className="text-[var(--accent)]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="mt-1 p-3 bg-[var(--bg-secondary)]/50 border-t border-[var(--border)]/10">
                <p className="text-[9px] text-[var(--text-primary)]/40 text-center leading-relaxed">
                  {t('translator.info')}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
