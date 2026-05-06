import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import SectionDivider from "./SectionDivider";
import {
  iconSaintEntries,
  iconSaintUrl,
  type IconSaintEntry,
} from "../data/iconSaintMap";

type FilterKey = "all" | IconSaintEntry["category"];

const categoryLabels: Record<IconSaintEntry["category"], string> = {
  saint: "Saints",
  apostle: "Apostles & Evangelists",
  prophet: "Prophets",
  angel: "Angels",
  christ: "Christ",
  theotokos: "Theotokos",
  trinity: "Holy Trinity",
  feast: "Feasts",
  scene: "Sacred Scenes",
};

export default function IconSaintGallery({
  tradition,
  pageTitle,
  subtitle,
}: {
  tradition: "orthodox" | "catholic" | "shared";
  pageTitle: string;
  subtitle: string;
}) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const entries =
    tradition === "shared"
      ? iconSaintEntries
      : iconSaintEntries.filter(
          (e) => e.tradition === tradition || e.tradition === "shared"
        );

  const filtered =
    filter === "all" ? entries : entries.filter((e) => e.category === filter);

  const categories = Array.from(
    new Set(entries.map((e) => e.category))
  ).sort();

  return (
    <main className={`${tradition === 'orthodox' ? 'orthodox-pattern' : tradition === 'catholic' ? 'catholic-pattern' : 'sacred-surface'} min-h-screen px-4 py-8 md:px-8`}>
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">
          {pageTitle}
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/90">{subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-md border px-3 py-1.5 text-sm ${
            filter === "all"
              ? "border-[var(--accent)] text-[var(--text-secondary)]"
              : "border-[var(--border)]/40 text-[var(--text-primary)]/85"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-md border px-3 py-1.5 text-sm ${
              filter === cat
                ? "border-[var(--accent)] text-[var(--text-secondary)]"
                : "border-[var(--border)]/40 text-[var(--text-primary)]/85"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <SectionDivider label="Gallery" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((entry) => (
          <Card key={entry.folder} className="group overflow-hidden">
            <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[var(--bg-secondary)]">
              <img
                src={iconSaintUrl(entry.folder, entry.sampleImages[0])}
                alt={entry.displayName}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x500?text=Icon+Coming+Soon";
                }}
                onClick={() =>
                  setLightbox(
                    iconSaintUrl(entry.folder, entry.sampleImages[0])
                  )
                }
              />
              {entry.sampleImages.length > 1 && (
                <div className="absolute bottom-2 right-2 flex gap-1">
                  {entry.sampleImages.slice(0, 3).map((img, idx) => (
                    <button
                      key={img}
                      className="h-2 w-2 rounded-full bg-white/70"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightbox(iconSaintUrl(entry.folder, img));
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="mt-3">
              <h3 className="font-heading text-lg text-[var(--text-secondary)]">
                {entry.displayName}
              </h3>
              <p className="text-xs text-[var(--text-primary)]/60">
                {categoryLabels[entry.category]}
              </p>
              {entry.saintSlug && (
                <Link
                  to={`/orthodox/saints/${entry.saintSlug}`}
                  className="mt-2 inline-block text-sm underline underline-offset-4"
                >
                  View saint page
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Enlarged icon"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />
          <button
            className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-white"
            onClick={() => setLightbox(null)}
          >
            Close
          </button>
        </div>
      )}
    </main>
  );
}

