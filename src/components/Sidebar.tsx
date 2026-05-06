import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { SidebarSection } from "../app/siteData";
import { cn } from "../utils/cn";
import LanguageTranslator from "./LanguageTranslator";

type SidebarProps = {
  title: string;
  titleHref?: string;
  sections: SidebarSection[];
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export default function Sidebar({ title, titleHref, sections, mobileOpen, onCloseMobile }: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const getSectionKey = (title: string) => {
    return `sections.${title.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_').replace(/'/g, '')}`;
  };
  const defaultOpen = useMemo(() => new Set(sections.map((section) => section.path)), [sections]);
  const [openSections, setOpenSections] = useState(defaultOpen);
  const orthodoxScriptureButtons = new Set([
    "Septuagint Old Testament",
    "New Testament",
    "Daily Scripture Readings",
    "Commandments",
    "Gospel Commentaries",
  ]);
  const orthodoxPrayerButtons = new Set([
    "Morning Prayers",
    "Evening Prayers",
    "Midnight Office",
    "Akathist Hymns",
    "Jesus Prayer Guide",
    "Prayers Before Communion",
    "Prayer Rope Guide",
    "Prayers by Jurisdiction: Greek, Slavonic, Serbian, Armenian, Antiochian",
  ]);
  const orthodoxHomeWorshipButtons = new Set([
    "Prayer Corner Setup",
    "Family Devotions",
    "Fasting Guidelines",
    "Preparing for Confession",
    "Preparing for Communion",
  ]);
  const orthodoxChantButtons = new Set([
    "Byzantine Chant",
    "Znamenny Chant (Russian)",
    "Serbian Chant",
    "Armenian Sharakan",
    "Antiochian Orthodox Chant",
    "Arabic Liturgical Hymns",
  ]);
  const orthodoxIconographyButtons = new Set([
    "Icon Gallery",
    "Theology of Icons",
    "Iconography by Tradition",
    "Miraculous Icons",
    "Home Icon Corner Guide",
  ]);
  const orthodoxLiturgyButtons = new Set([
    "Liturgy of St. John Chrysostom",
    "Liturgy of St. Basil the Great",
    "Liturgy of St. James",
    "Presanctified Liturgy",
    "Armenian Badarak",
    "Liturgical Texts (Original + English)",
  ]);
  const orthodoxCatechismButtons = new Set([
    "What is Orthodoxy?",
    "Seven Ecumenical Councils",
    "Church Fathers Library",
    "Philokalia Excerpts",
    "Holy Mysteries (Sacraments)",
    "Jurisdictional Differences",
    "Convert's Guide",
  ]);
  const orthodoxSaintsButtons = new Set([
    "Lives of the Saints (Synaxarion)",
    "Saint of the Day",
    "Name Saint",
    "Patron Saints",
  ]);
   const catholicPrayerButtons = new Set([
     "Morning Offering",
     "Evening Prayers",
     "The Holy Rosary",
     "Chaplet of Divine Mercy",
     "Angelus / Regina Caeli",
     "Stations of the Cross",
     "Litanies",
     "Novenas Library",
     "Act of Contrition",
     "Communion Prayers",
     "Latin Prayers",
     "Examination of Conscience",
   ]);
   const linkedSubItems: Record<string, Record<string, string>> = {
    "/orthodox/scripture": {
      "Septuagint Old Testament": "/orthodox/scripture/reader",
      "New Testament": "/orthodox/scripture/reader",
      "Daily Scripture Readings": "/orthodox/scripture/reader",
      "Gospel Commentaries": "/orthodox/scripture/reader",
    },
    "/orthodox/calendar": {
      "Greek Orthodox Calendar": "/orthodox/calendar/greek-orthodox",
      "Serbian Orthodox Calendar": "/orthodox/calendar/serbian-orthodox",
      "Russian Orthodox Calendar": "/orthodox/calendar/russian-orthodox",
      "Armenian Apostolic Calendar": "/orthodox/calendar/armenian-orthodox",
      "Antiochian Orthodox Calendar": "/orthodox/calendar/antiochian-orthodox",
      "Fasting Calendar": "/orthodox/calendar/fasting-calendar",
      "Feast Days & Saints": "/orthodox/calendar/feast-days-saints",
      "Pascha Calculator": "/orthodox/calendar/pascha-calculator",
    },
    "/orthodox/prayers": {
      "Morning Prayers": "/orthodox/prayers/morning-prayers",
      "Evening Prayers": "/orthodox/prayers/evening-prayers",
      "Midnight Office": "/orthodox/prayers/midnight-office",
      "Akathist Hymns": "/orthodox/prayers/akathist-hymns",
      "Jesus Prayer Guide": "/orthodox/prayers/jesus-prayer",
      "Prayers Before Communion": "/orthodox/prayers/prayer-before-communion",
      "Prayer Rope Guide": "/orthodox/prayers/prayer-rope/interactive",
      "Prayers by Jurisdiction: Greek, Slavonic, Serbian, Armenian, Antiochian": "/orthodox/prayers",
    },
  };

  return (
    <>
      {mobileOpen && <button onClick={onCloseMobile} className="fixed inset-0 z-30 bg-black/40 md:hidden" aria-label="Close menu overlay" />}
      <aside
        className={cn(
          "fixed left-0 top-[var(--header-h)] z-40 h-[calc(100vh-var(--header-h))] w-[min(88vw,var(--sidebar-w))] overflow-y-auto border-r border-[var(--border)]/45 bg-[var(--sidebar)] px-3 pb-6 pt-4 transition-transform duration-300 md:sticky md:top-[var(--header-h)] md:w-[var(--sidebar-w)]",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {titleHref ? (
          <NavLink
            to={titleHref}
            onClick={onCloseMobile}
            className="mb-4 block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-3 py-2.5 text-sm font-heading text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
          >
            {title}
          </NavLink>
        ) : (
          <h2 className="mb-4 border-b border-[var(--border)]/30 pb-3 font-heading text-xl text-[var(--text-secondary)]">{title}</h2>
        )}
        <div className="space-y-2">
          {sections.map((section) => {
            const isOpen = openSections.has(section.path);
            const isActive = location.pathname === section.path;
            return (
              <div key={section.path} className="rounded-lg border border-[var(--border)]/20 bg-[var(--bg-secondary)]/40">
                <button
                  onClick={() => {
                    setOpenSections((prev) => {
                      const next = new Set(prev);
                      if (next.has(section.path)) next.delete(section.path);
                      else next.add(section.path);
                      return next;
                    });
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm"
                >
                  <span className="flex items-center gap-2">
                    <section.icon size={14} className="text-[var(--text-secondary)]" />
                    {t(getSectionKey(section.title))}
                  </span>
                  <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <div className="space-y-1 border-t border-[var(--border)]/20 px-2 py-2">
                    <NavLink
                      to={section.path}
                      onClick={onCloseMobile}
                      className={cn(
                        "block rounded-md border-l-2 px-2 py-1 text-sm",
                        isActive
                          ? "border-[var(--accent)] text-[var(--text-secondary)]"
                          : "border-transparent text-[var(--text-primary)]/85 hover:text-[var(--text-secondary)]"
                      )}
                    >
                      {t('sidebar.open')} {t(getSectionKey(section.title))}
                    </NavLink>
                    {section.subItems.map((item) => {
                      const linkedPath = linkedSubItems[section.path]?.[item];
                      const isOrthodoxScriptureButton =
                        section.path === "/orthodox/scripture" && orthodoxScriptureButtons.has(item);
                      const isOrthodoxPrayerButton =
                        section.path === "/orthodox/prayers" && (orthodoxPrayerButtons.has(item) || item.startsWith("Prayers by Jurisdiction"));
                      const isOrthodoxChantButton =
                        section.path === "/orthodox/chant" && orthodoxChantButtons.has(item);
                      const isOrthodoxIconographyButton =
                        section.path === "/orthodox/icons" && orthodoxIconographyButtons.has(item);
                      const isOrthodoxLiturgyButton =
                        section.path === "/orthodox/liturgy" && orthodoxLiturgyButtons.has(item);
                      const isOrthodoxCatechismButton =
                        section.path === "/orthodox/catechism" && orthodoxCatechismButtons.has(item);
                      const isOrthodoxHomeWorshipButton =
                        section.path === "/orthodox/home-worship" && orthodoxHomeWorshipButtons.has(item);
                      const isOrthodoxSaintsButton =
                        section.path === "/orthodox/saints" && orthodoxSaintsButtons.has(item);
                      const isCatholicPrayerButton =
                        section.path === "/catholic/prayers" && catholicPrayerButtons.has(item);

                      if (isOrthodoxScriptureButton) {
                        const scriptureTarget =
                          item === "New Testament"
                            ? "/orthodox/scripture/new-testament"
                            : item === "Septuagint Old Testament"
                              ? "/orthodox/scripture/septuagint-old-testament"
                            : item === "Daily Scripture Readings"
                              ? "/orthodox/scripture/daily-readings"
                              : item === "Commandments" || item === "Gospel Commentaries"
                                ? "/orthodox/scripture/commandments"
                                : "/orthodox/scripture/reader";
                        return (
                          <NavLink
                            key={item}
                            to={scriptureTarget}
                            onClick={onCloseMobile}
                            className="mt-1 block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                          >
                            {item}
                          </NavLink>
                        );
                      }

                      if (isOrthodoxPrayerButton) {
                        if (item.startsWith("Prayers by Jurisdiction")) {
                          const jurisdictions = ["Greek", "Slavonic", "Serbian", "Armenian", "Antiochian"];
                          return (
                            <div key={item} className="mt-2 space-y-1">
                              <p className="px-2 text-[10px] uppercase tracking-wider text-[var(--text-primary)]/50">Jurisdictions</p>
                              <div className="grid grid-cols-2 gap-1">
                                {jurisdictions.map((j) => (
                                  <NavLink
                                    key={j}
                                    to={`/orthodox/prayers?jurisdiction=${j.toLowerCase()}`}
                                    onClick={onCloseMobile}
                                    className="block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                                  >
                                    {j}
                                  </NavLink>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        const prayerSlug = item.toLowerCase().replace(/\s+/g, "-");
                        const prayerTarget = item === "Prayer Rope Guide" 
                          ? "/orthodox/prayers/prayer-rope/interactive"
                          : `/orthodox/prayers/${prayerSlug}`;

                        return (
                          <NavLink
                            key={item}
                            to={prayerTarget}
                            onClick={onCloseMobile}
                            className="mt-1 block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                          >
                            {item}
                          </NavLink>
                        );
                      }

                      if (isOrthodoxChantButton) {
                        const chantTarget =
                          item === "Byzantine Chant" ? "/orthodox/chant/byzantine" :
                          item === "Znamenny Chant (Russian)" ? "/orthodox/chant/znamenny" :
                          item === "Serbian Chant" ? "/orthodox/chant/serbian" :
                          item === "Armenian Sharakan" ? "/orthodox/chant/armenian" :
                          item === "Antiochian Orthodox Chant" ? "/orthodox/chant/antiochian" :
                          item === "Arabic Liturgical Hymns" ? "/orthodox/chant/arabic" :
                          "/orthodox/chant";

                        return (
                          <NavLink
                            key={item}
                            to={chantTarget}
                            onClick={onCloseMobile}
                            className="mt-1 block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                          >
                            {item}
                          </NavLink>
                        );
                      }

                      if (isOrthodoxIconographyButton) {
                        const iconographySlug = item.toLowerCase().replace(/\s+/g, "-");
                        const iconographyTarget = `/orthodox/icons/${iconographySlug}`;

                        return (
                          <NavLink
                            key={item}
                            to={iconographyTarget}
                            onClick={onCloseMobile}
                            className="mt-1 block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                          >
                            {item}
                          </NavLink>
                        );
                      }

                      if (isOrthodoxLiturgyButton) {
                        let liturgySlug = item.toLowerCase().replace(/\s+/g, "-").replace("of-", "").replace("the-", "");
                        
                        if (item === "Liturgy of St. John Chrysostom") liturgySlug = "st-john-chrysostom";
                        if (item === "Liturgy of St. Basil the Great") liturgySlug = "st-basil-the-great";
                        if (item === "Liturgy of St. James") liturgySlug = "st-james";
                        if (item === "Presanctified Liturgy") liturgySlug = "presanctified";
                        if (item === "Armenian Badarak") liturgySlug = "armenian-badarak";
                        if (item === "Liturgical Texts (Original + English)") liturgySlug = "liturgical-texts";

                        const liturgyTarget = `/orthodox/liturgy/${liturgySlug}`;

                        return (
                          <NavLink
                            key={item}
                            to={liturgyTarget}
                            onClick={onCloseMobile}
                            className="mt-1 block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                          >
                            {item}
                          </NavLink>
                        );
                      }

                      if (isOrthodoxCatechismButton) {
                        let catechismSlug = item.toLowerCase().replace(/\s+/g, "-");
                        
                        if (item === "What is Orthodoxy?") catechismSlug = "what-is-orthodoxy";
                        if (item === "Seven Ecumenical Councils") catechismSlug = "councils";
                        if (item === "Church Fathers Library") catechismSlug = "fathers";
                        if (item === "Philokalia Excerpts") catechismSlug = "philokalia";
                        if (item === "Holy Mysteries (Sacraments)") catechismSlug = ""; // Redirects to /orthodox/catechism
                        if (item === "Jurisdictional Differences") catechismSlug = "jurisdictions";
                        if (item === "Convert's Guide") catechismSlug = "convert-guide";

                        const catechismTarget = catechismSlug ? `/orthodox/catechism/${catechismSlug}` : `/orthodox/catechism`;

                        return (
                          <NavLink
                            key={item}
                            to={catechismTarget}
                            onClick={onCloseMobile}
                            className="mt-1 block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                          >
                            {item}
                          </NavLink>
                        );
                      }

                      if (isOrthodoxHomeWorshipButton) {
                        let homeWorshipSlug = item.toLowerCase().replace(/\s+/g, "-");
                        
                        if (item === "Prayer Corner Setup") homeWorshipSlug = "prayer-corner-setup";
                        if (item === "Family Devotions") homeWorshipSlug = "family-devotions";
                        if (item === "Fasting Guidelines") homeWorshipSlug = "fasting-guidelines";
                        if (item === "Preparing for Confession") homeWorshipSlug = "preparing-for-confession";
                         if (item === "Preparing for Communion") homeWorshipSlug = "preparing-for-communion";

                         const homeWorshipTarget = `/orthodox/home-worship/${homeWorshipSlug}`;

                        return (
                          <NavLink
                            key={item}
                            to={homeWorshipTarget}
                            onClick={onCloseMobile}
                            className="mt-1 block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                          >
                            {item}
                          </NavLink>
                        );
                      }

                      if (isOrthodoxSaintsButton) {
                        let saintsSlug = item.toLowerCase().replace(/\s+/g, "-");
                        
                        if (item === "Lives of the Saints (Synaxarion)") saintsSlug = "synaxarion";
                        if (item === "Saint of the Day") saintsSlug = "saint-of-the-day";
                        if (item === "Name Saint") saintsSlug = "name-day-lookup";
                        if (item === "Patron Saints") saintsSlug = "patron-saints";

                        const saintsTarget = `/orthodox/saints/${saintsSlug}`;

                        return (
                          <NavLink
                            key={item}
                            to={saintsTarget}
                            onClick={onCloseMobile}
                            className="mt-1 block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                          >
                            {item}
                          </NavLink>
                        );
                      }

                      if (isCatholicPrayerButton) {
                        let prayerSlug = item.toLowerCase().replace(/\s+/g, "-");
                        
                        // Fix common slug mismatches
                        if (item === "Chaplet of Divine Mercy") prayerSlug = "chaplet-divine-mercy";
                        if (item === "Angelus / Regina Caeli") prayerSlug = "angelus";
                        if (item === "Stations of the Cross") prayerSlug = "stations-of-the-cross";
                        if (item === "Litanies") prayerSlug = "litanies";
                        if (item === "Novenas Library") prayerSlug = "novenas";
                        if (item === "Communion Prayers") prayerSlug = "communion-prayers";
                        if (item === "Latin Prayers") prayerSlug = "latin-prayers";
                        if (item === "Examination of Conscience") prayerSlug = "examination-of-conscience";

                        const prayerTarget = item === "The Holy Rosary"
                          ? "/catholic/prayers/rosary/interactive"
                          : `/catholic/prayers/${prayerSlug}`;

                        return (
                          <NavLink
                            key={item}
                            to={prayerTarget}
                            onClick={onCloseMobile}
                            className="mt-1 block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                          >
                            {item}
                          </NavLink>
                        );
                      }

                      if (linkedPath) {
                        return (
                          <NavLink
                            key={item}
                            to={linkedPath}
                            onClick={onCloseMobile}
                            className="mt-1 block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                          >
                            {item}
                          </NavLink>
                        );
                      }

                      return (
                        <p key={item} className="border-l-2 border-transparent px-2 py-1 text-xs text-[var(--text-primary)]/70">
                          {item}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Bottom Actions */}
          <div className="mt-4 border-t border-[var(--border)]/30 pt-4 px-2 pb-6">
            <div className="flex flex-col gap-4">
              <div className="px-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)]/40 mb-3">
                  {t('sidebar.system_settings')}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-secondary)]">{t('sidebar.language')}</span>
                  <LanguageTranslator />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}