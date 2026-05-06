import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import SectionDivider from "../../../../components/SectionDivider";
import { orthodoxTranslations } from "../../../../data/scriptureData";

type ReadingPick = {
  slug: string;
  name: string;
  chapter: number;
  testament: "OT" | "NT" | "DC";
};

function pickReading(testament: "OT" | "NT"): ReadingPick {
  const books = orthodoxTranslations[0]?.books ?? [];
  const candidates = books.filter((book) => book.chapters.length > 0 && book.testament === testament);
  const randomBook = candidates[Math.floor(Math.random() * candidates.length)];
  const randomChapter = randomBook.chapters[Math.floor(Math.random() * randomBook.chapters.length)];
  return {
    slug: randomBook.slug,
    name: randomBook.name,
    chapter: randomChapter.chapter,
    testament,
  };
}

export default function DailyScriptureReadingsPage() {
  const [otReading, setOtReading] = useState<ReadingPick>(() => pickReading("OT"));

  const [ntReading, setNtReading] = useState<ReadingPick>(() => pickReading("NT"));

  const combinedReference = useMemo(
    () => `${otReading.name} ${otReading.chapter} and ${ntReading.name} ${ntReading.chapter}`,
    [otReading, ntReading]
  );

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Orthodox", to: "/orthodox" },
            { label: "Holy Scripture", to: "/orthodox/scripture" },
            { label: "Daily Scripture Readings", to: "/orthodox/scripture/daily-readings" },
          ]}
        />

        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">Daily Scripture Readings</h1>
        <p className="mt-3 text-lg text-[var(--text-primary)]/88">
          Each refresh gives one Old Testament chapter and one New Testament chapter for prayerful reading.
        </p>

        <SectionDivider label="Today's Random Reading" />

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <p className="text-sm text-[var(--text-primary)]/70">Old Testament</p>
            <h2 className="mt-2 font-heading text-2xl text-[var(--text-secondary)]">
              {otReading.name} {otReading.chapter}
            </h2>
            <Link
              to={`/orthodox/scripture/${otReading.slug}/${otReading.chapter}`}
              className="mt-3 inline-block rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            >
              Read Chapter
            </Link>
          </Card>

          <Card>
            <p className="text-sm text-[var(--text-primary)]/70">New Testament</p>
            <h2 className="mt-2 font-heading text-2xl text-[var(--text-secondary)]">
              {ntReading.name} {ntReading.chapter}
            </h2>
            <Link
              to={`/orthodox/scripture/${ntReading.slug}/${ntReading.chapter}`}
              className="mt-3 inline-block rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            >
              Read Chapter
            </Link>
          </Card>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={() => setOtReading(pickReading("OT"))} className="rounded-md border border-[var(--border)] px-3 py-2 text-sm">
            New Old Testament Reading
          </button>
          <button onClick={() => setNtReading(pickReading("NT"))} className="rounded-md border border-[var(--border)] px-3 py-2 text-sm">
            New New Testament Reading
          </button>
        </div>

        <p className="mt-4 text-sm text-[var(--text-primary)]/75">Current pair: {combinedReference}</p>
      </div>
    </main>
  );
}
