import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../components/Breadcrumbs";
import Card from "../../components/Card";
import { orthodoxSections } from "../siteData";

export default function OrthodoxDashboardPage() {
  const { t } = useTranslation();

  const getSectionKey = (title: string) => {
    return `sections.${title.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_').replace(/'/g, '')}`;
  };

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: t('nav.home'), to: "/" }, { label: t('nav.orthodox'), to: "/orthodox" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">{t('orthodox_page.title')}</h1>
      <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/88">
        {t('orthodox_page.description')}
      </p>

      <div className="mt-10 space-y-12">
        {orthodoxSections.map((section) => (
          <section key={section.path}>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-[var(--accent)]/10 p-2 text-[var(--accent)]">
                <section.icon size={24} />
              </div>
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">{t(getSectionKey(section.title))}</h2>
            </div>
            
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
              {section.subItems.map((item) => {
                // Logic to determine the correct sub-path
                let itemPath = section.path;
                
                // Special mapping for specific items to ensure correct routing
                if (section.title === "Holy Scripture") {
                  if (item === "Septuagint Old Testament") itemPath = `${section.path}/septuagint-old-testament`;
                  if (item === "New Testament") itemPath = `${section.path}/new-testament`;
                  if (item === "Daily Scripture Readings") itemPath = `${section.path}/daily-readings`;
                  if (item === "Commandments") itemPath = `${section.path}/commandments`;
                } else if (section.title === "Liturgical Calendar") {
                  if (item === "Greek Orthodox Calendar") itemPath = `${section.path}/greek-orthodox`;
                  if (item === "Serbian Orthodox Calendar") itemPath = `${section.path}/serbian-orthodox`;
                  if (item === "Russian Orthodox Calendar") itemPath = `${section.path}/russian-orthodox`;
                  if (item === "Armenian Apostolic Calendar") itemPath = `${section.path}/armenian-orthodox`;
                  if (item === "Antiochian Orthodox Calendar") itemPath = `${section.path}/antiochian-orthodox`;
                  if (item === "Fasting Calendar") itemPath = `${section.path}/fasting-calendar`;
                  if (item === "Feast Days & Saints") itemPath = `${section.path}/feast-days-saints`;
                  if (item === "Pascha Calculator") itemPath = `${section.path}/pascha-calculator`;
                } else if (section.title === "Prayer Book") {
                  if (item === "Morning Prayers") itemPath = `${section.path}/morning-prayers`;
                  if (item === "Evening Prayers") itemPath = `${section.path}/evening-prayers`;
                  if (item === "Midnight Office") itemPath = `${section.path}/midnight-office`;
                  if (item === "Akathist Hymns") itemPath = `${section.path}/akathist-hymns`;
                } else if (section.title === "Iconography") {
                  if (item === "Icon Gallery") itemPath = `${section.path}/icon-gallery`;
                  if (item === "Theology of Icons") itemPath = `${section.path}/theology-of-icons`;
                  if (item === "Iconography by Tradition") itemPath = `${section.path}/iconography-by-tradition`;
                  if (item === "Miraculous Icons") itemPath = `${section.path}/miraculous-icons`;
                  if (item === "Home Icon Corner Guide") itemPath = `${section.path}/home-icon-corner-guide`;
                } else if (section.title === "Catechism & Teaching") {
                  if (item === "What is Orthodoxy?") itemPath = `${section.path}/what-is-orthodoxy`;
                  if (item === "Seven Ecumenical Councils") itemPath = `${section.path}/councils`;
                  if (item === "Church Fathers Library") itemPath = `${section.path}/fathers`;
                  if (item === "Philokalia Excerpts") itemPath = `${section.path}/philokalia`;
                  if (item === "Holy Mysteries (Sacraments)") itemPath = `${section.path}`;
                  if (item === "Jurisdictional Differences") itemPath = `${section.path}/jurisdictions`;
                  if (item === "Convert's Guide") itemPath = `${section.path}/convert-guide`;
                } else if (section.title === "Saints") {
                  if (item === "Lives of the Saints (Synaxarion)") itemPath = `${section.path}/synaxarion`;
                  if (item === "Saint of the Day") itemPath = `${section.path}/saint-of-the-day`;
                  if (item === "Name Saint") itemPath = `${section.path}/name-day-lookup`;
                  if (item === "Patron Saints") itemPath = `${section.path}/patron-saints`;
                } else if (section.title === "Divine Liturgy") {
                  if (item === "Liturgy of St. John Chrysostom") itemPath = `${section.path}/st-john-chrysostom`;
                  if (item === "Liturgy of St. Basil the Great") itemPath = `${section.path}/st-basil-the-great`;
                  if (item === "Liturgy of St. James") itemPath = `${section.path}/st-james`;
                  if (item === "Presanctified Liturgy") itemPath = `${section.path}/presanctified`;
                  if (item === "Armenian Badarak") itemPath = `${section.path}/armenian-badarak`;
                  if (item === "Liturgical Texts (Original + English)") itemPath = `${section.path}/liturgical-texts`;
                } else if (section.title === "Hymns & Chant") {
                   // Add specific chant routing if needed, otherwise default to section path
                }

                return (
                  <Card key={item} className="group hover:border-[var(--accent)] transition-all">
                    <Link to={itemPath} className="flex h-full flex-col p-2">
                      <span className="font-heading text-lg text-[var(--text-secondary)] group-hover:text-[var(--accent)]">{item}</span>
                      <span className="mt-1 text-sm text-[var(--text-primary)]/70">Explore {item.toLowerCase()} resources.</span>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}