import Breadcrumbs from "../../../components/Breadcrumbs";
import Card from "../../../components/Card";
import ChantTabs from "../../../components/ChantTabs";
import SectionDivider from "../../../components/SectionDivider";
import { Link } from "react-router-dom";

export default function OrthodoxChantPage() {
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Orthodox", to: "/orthodox" },
            { label: "Hymns & Chant", to: "/orthodox/chant" },
          ]}
        />

        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">Hymns & Chant</h1>
        <p className="mt-3 max-w-4xl text-lg text-[var(--text-primary)]/88">
          Explore the rich musical traditions of the Orthodox Church through our curated media libraries.
        </p>
        <ChantTabs />

        <SectionDivider label="Chant Collections" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/orthodox/chant/byzantine">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">Byzantine Chant</h2>
              <p className="mt-2 text-sm">Full curated media library featuring recordings from Mount Athos and other venerable sources.</p>
            </Card>
          </Link>
          <Link to="/orthodox/chant/znamenny">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">Russian Znamenny Chant</h2>
              <p className="mt-2 text-sm">Ancient monophonic "hook" notation style preserved by monasteries and Old Believer communities.</p>
            </Card>
          </Link>
          <Link to="/orthodox/chant/serbian">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">Serbian Orthodox Chant</h2>
              <p className="mt-2 text-sm">Serbian Byzantine chant, the "warrior" monastic style, and traditional choral arrangements.</p>
            </Card>
          </Link>
          <Link to="/orthodox/chant/armenian">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">Armenian Sharakan</h2>
              <p className="mt-2 text-sm">Ancient hymns of the Armenian Apostolic Church, including works of Mesrop Mashtots and Komitas.</p>
            </Card>
          </Link>
          <Link to="/orthodox/chant/antiochian">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">Antiochian Orthodox Chant</h2>
              <p className="mt-2 text-sm">Liturgical hymns of the Antiochian tradition, featuring mixed Arabic and English arrangements.</p>
            </Card>
          </Link>
          <Link to="/orthodox/chant/arabic">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">Arabic Liturgical Hymns</h2>
              <p className="mt-2 text-sm">Ancient and contemporary Byzantine hymns in the Arabic language.</p>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}