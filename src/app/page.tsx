import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionDivider from "../components/SectionDivider";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="sacred-surface min-h-screen">
      <Header />
      <main>
        <section className="smoke-background relative flex min-h-[92vh] items-center justify-center px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <div className="mb-6 text-7xl text-[var(--text-secondary)] drop-shadow-[0_0_18px_rgba(201,168,76,0.45)] md:text-9xl">✠</div>
            <p className="font-accent text-xl text-[var(--text-secondary)]">{t('landing.tagline')}</p>
            <h1 className="font-heading text-5xl leading-tight md:text-7xl">{t('landing.title')}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-xl text-[var(--text-primary)]/92">
              {t('landing.description')}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/orthodox"
                className="rounded-xl px-6 py-4 text-lg font-semibold text-white shadow-lg"
                style={{ backgroundImage: "linear-gradient(90deg, var(--button-from), var(--button-to))" }}
              >
                {t('landing.enter_orthodox')}
              </Link>
              <Link
                to="/catholic"
                className="rounded-xl border border-[var(--border)] px-6 py-4 text-lg font-semibold text-[var(--text-primary)]"
              >
                {t('landing.enter_catholic')}
              </Link>
            </div>
            <Link to="/shared" className="mt-6 inline-block text-[var(--text-secondary)] underline underline-offset-4">
              {t('landing.explore_shared')}
            </Link>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="font-heading text-3xl text-[var(--text-secondary)]">{t('landing.dialogue_title')}</h2>
          <p className="mt-2 max-w-3xl text-lg text-[var(--text-primary)]/86">{t('landing.dialogue_desc')}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link to="/orthodox">
              <Card>
                <h3 className="font-heading text-xl text-[var(--text-secondary)]">{t('landing.orthodox_card_title')}</h3>
                <p className="mt-2 text-[var(--text-primary)]/85">{t('landing.orthodox_card_desc')}</p>
              </Card>
            </Link>
            <Link to="/catholic">
              <Card>
                <h3 className="font-heading text-xl text-[var(--text-secondary)]">{t('landing.catholic_card_title')}</h3>
                <p className="mt-2 text-[var(--text-primary)]/85">{t('landing.catholic_card_desc')}</p>
              </Card>
            </Link>
            <Link to="/shared">
              <Card>
                <h3 className="font-heading text-xl text-[var(--text-secondary)]">{t('landing.shared_card_title')}</h3>
                <p className="mt-2 text-[var(--text-primary)]/85">{t('landing.shared_card_desc')}</p>
              </Card>
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20">
          <SectionDivider label={t('landing.highlights_title')} />
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h3 className="font-heading text-lg text-[var(--text-secondary)]">{t('landing.saint_title')}</h3>
              <p className="mt-2">St. John Chrysostom: Teacher of repentance, mercy, and liturgical beauty.</p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg text-[var(--text-secondary)]">{t('landing.scripture_title')}</h3>
              <p className="mt-2">John 1:1-18 and Psalm 51. "Create in me a clean heart, O God."</p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg text-[var(--text-secondary)]">{t('landing.fasting_title')}</h3>
              <p className="mt-2">{t('landing.fasting_desc')}</p>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}