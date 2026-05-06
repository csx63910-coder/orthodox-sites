import { useTranslation } from "react-i18next";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SectionDivider from "../../components/SectionDivider";
import { sharedHeritageItems } from "../siteData";

export default function SharedPage() {
  const { t } = useTranslation();

  return (
    <div className="sacred-surface min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">{t('shared_page.title')}</h1>
        <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/90">
          {t('shared_page.description')}
        </p>
        <SectionDivider label={t('shared_page.divider')} />
        <div className="grid gap-4 md:grid-cols-2">
          {sharedHeritageItems.map((item) => (
            <Card key={item.title}>
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">{item.title}</h2>
              <p className="mt-2 text-[var(--text-primary)]/85">{item.description}</p>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}