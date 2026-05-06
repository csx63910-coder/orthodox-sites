import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Card from "../../../components/Card";
import SectionDivider from "../../../components/SectionDivider";
import { orthodoxContent } from "../../siteData";
import { Paintbrush, BookOpen, Map, Sparkles, Home } from "lucide-react";

export default function OrthodoxIconsPage() {
  const content = orthodoxContent.icons;
  const categories = [
    { name: "Icon Gallery", path: "icon-gallery", icon: Paintbrush, desc: "Browse sacred icons from the ICONSAINT dataset." },
    { name: "Theology of Icons", path: "theology-of-icons", icon: BookOpen, desc: "Understand the spiritual significance and defense of holy images." },
    { name: "Iconography by Tradition", path: "iconography-by-tradition", icon: Map, desc: "Explore Byzantine, Russian, Greek, and other regional styles." },
    { name: "Miraculous Icons", path: "miraculous-icons", icon: Sparkles, desc: "Stories of wonderworking icons throughout Church history." },
    { name: "Home Icon Corner Guide", path: "home-icon-corner-guide", icon: Home, desc: "Practical help for setting up a prayer space in your home." },
  ];

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Orthodox", to: "/orthodox" },
            { label: "Iconography", to: "/orthodox/icons" },
          ]}
        />

        <div className="mt-4">
          <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">{content.title}</h1>
          <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/90">{content.subtitle}</p>
        </div>

        <SectionDivider label="Holy Images" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link key={cat.path} to={cat.path} className="group">
              <Card className="h-full transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg group-hover:-translate-y-1">
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                    <cat.icon size={24} />
                  </div>
                  <h3 className="font-heading text-xl text-[var(--text-secondary)] group-hover:text-[var(--accent)]">
                    {cat.name}
                  </h3>
                  <p className="mt-2 flex-grow text-sm text-[var(--text-primary)]/75">
                    {cat.desc}
                  </p>
                  <div className="mt-4 flex items-center text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Explore →
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 space-y-6">
          <Card className="bg-[var(--card)]/50">
            <h2 className="font-heading text-2xl text-[var(--text-secondary)]">About Orthodox Iconography</h2>
            <div className="mt-4 space-y-4">
              {content.paragraphs.map((p, idx) => (
                <p key={idx} className="text-lg leading-relaxed text-[var(--text-primary)]/88">{p}</p>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
