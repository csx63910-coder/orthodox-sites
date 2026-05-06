import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import SectionDivider from "../../../../components/SectionDivider";

const GREEK_RESOURCES_REPO = "https://github.com/openscriptures/GreekResources";
const GREEK_RESOURCES_BASE =
  "https://raw.githubusercontent.com/openscriptures/GreekResources/master/LxxLemmas";

const KJV_REPO = "https://github.com/farskipper/kjv";
const KJV_BASE = "kjv";

type LxxBook = { slug: string; name: string; file: string };
type KjvBook = { slug: string; name: string; file: string };

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const lxxBooks: LxxBook[] = [
  { slug: "genesis", name: "Genesis", file: "Gen" },
  { slug: "exodus", name: "Exodus", file: "Exod" },
  { slug: "leviticus", name: "Leviticus", file: "Lev" },
  { slug: "numbers", name: "Numbers", file: "Num" },
  { slug: "deuteronomy", name: "Deuteronomy", file: "Deut" },
  { slug: "joshua", name: "Joshua", file: "JoshB" },
  { slug: "judges", name: "Judges", file: "JudgB" },
  { slug: "ruth", name: "Ruth", file: "Ruth" },
  { slug: "psalms", name: "Psalms", file: "Ps" },
  { slug: "proverbs", name: "Proverbs", file: "Prov" },
  { slug: "ecclesiastes", name: "Ecclesiastes", file: "Eccl" },
  { slug: "song-of-solomon", name: "Song of Solomon", file: "Song" },
  { slug: "job", name: "Job", file: "Job" },
  { slug: "wisdom", name: "Wisdom", file: "Wis" },
  { slug: "sirach", name: "Sirach", file: "Sir" },
  { slug: "hosea", name: "Hosea", file: "Hos" },
  { slug: "amos", name: "Amos", file: "Amos" },
  { slug: "micah", name: "Micah", file: "Mic" },
  { slug: "joel", name: "Joel", file: "Joel" },
  { slug: "obadiah", name: "Obadiah", file: "Obad" },
  { slug: "jonah", name: "Jonah", file: "Jonah" },
  { slug: "nahum", name: "Nahum", file: "Nah" },
  { slug: "habakkuk", name: "Habakkuk", file: "Hab" },
  { slug: "zephaniah", name: "Zephaniah", file: "Zeph" },
  { slug: "haggai", name: "Haggai", file: "Hag" },
  { slug: "zechariah", name: "Zechariah", file: "Zech" },
  { slug: "malachi", name: "Malachi", file: "Mal" },
  { slug: "isaiah", name: "Isaiah", file: "Isa" },
  { slug: "jeremiah", name: "Jeremiah", file: "Jer" },
  { slug: "baruch", name: "Baruch", file: "Bar" },
  { slug: "lamentations", name: "Lamentations", file: "Lam" },
  { slug: "ezekiel", name: "Ezekiel", file: "Ezek" },
  { slug: "daniel", name: "Daniel", file: "DanTh" },
];

export default function SeptuagintOldTestamentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialVersion = searchParams.get("version") === "kjv" ? "King James Version" : "Septuagint";
  const [version, setVersion] = useState<"Septuagint" | "King James Version">(initialVersion);
  const [selectedSlug, setSelectedSlug] = useState("genesis");
  const [chaptersBySlug, setChaptersBySlug] = useState<Record<string, number[]>>({});
  const [kjvBooksList, setKjvBooksList] = useState<KjvBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentBooks = version === "Septuagint" ? lxxBooks : kjvBooksList;
  const selectedBook = useMemo(() => currentBooks.find((book) => book.slug === selectedSlug) ?? currentBooks[0], [currentBooks, selectedSlug]);
  const chapters = chaptersBySlug[`${version}-${selectedBook?.slug}`] ?? [];

  useEffect(() => {
    if (version !== "King James Version" || kjvBooksList.length > 0) return;
    let active = true;
    const loadKjvList = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${KJV_BASE}/books.json`);
        if (!response.ok) throw new Error("Could not load KJV book list");
        const books = (await response.json()) as KjvBook[];
        if (!active) return;
        setKjvBooksList(books);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Unable to load KJV books");
      } finally {
        if (active) setLoading(false);
      }
    };
    loadKjvList();
    return () => {
      active = false;
    };
  }, [version, kjvBooksList.length]);

  useEffect(() => {
    if (!selectedBook) return;
    let active = true;
    const loadBook = async () => {
      const cacheKey = `${version}-${selectedBook.slug}`;
      if (chaptersBySlug[cacheKey]) return;
      setLoading(true);
      setError(null);
      try {
        if (version === "Septuagint") {
          const response = await fetch(`${GREEK_RESOURCES_BASE}/${selectedBook.file}.js`);
          if (!response.ok) throw new Error(`Could not load ${selectedBook.file}.js`);
          const jsText = (await response.text()).trim();
          const payload = new Function(`return (${jsText});`)() as Record<string, Array<{ key: string; lemma: string }>>;
          const chapterSet = new Set<number>();
          Object.keys(payload).forEach((reference) => {
            const parts = reference.split(".");
            if (parts.length >= 3) {
              const chapter = Number(parts[1]);
              if (!Number.isNaN(chapter)) chapterSet.add(chapter);
            }
          });
          if (!active) return;
          setChaptersBySlug((prev) => ({ ...prev, [cacheKey]: Array.from(chapterSet).sort((a, b) => a - b) }));
        } else {
          // KJV
          const response = await fetch(`${KJV_BASE}/${selectedBook.file}`);
          if (!response.ok) throw new Error(`Could not load ${selectedBook.file}`);
          const payload = await response.json();
          const chapterSet = new Set<number>();
          (payload.chapters ?? []).forEach((ch: { chapter: string }) => {
            const chapter = Number(ch.chapter);
            if (!Number.isNaN(chapter)) chapterSet.add(chapter);
          });
          if (!active) return;
          setChaptersBySlug((prev) => ({ ...prev, [cacheKey]: Array.from(chapterSet).sort((a, b) => a - b) }));
        }
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Unable to load book data");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadBook();
    return () => {
      active = false;
    };
  }, [selectedBook, chaptersBySlug, version]);

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Orthodox", to: "/orthodox" },
            { label: "Holy Scripture", to: "/orthodox/scripture" },
            { label: version === "Septuagint" ? "Septuagint Old Testament" : "King James Version", to: "/orthodox/scripture/septuagint-old-testament" },
          ]}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">
              {version === "Septuagint" ? "Septuagint Old Testament" : "King James Version"}
            </h1>
            <p className="mt-3 max-w-4xl text-lg text-[var(--text-primary)]/88">
              {version === "Septuagint" 
                ? "Dedicated Septuagint page using the OpenScriptures GreekResources source."
                : "The King James Version (KJV) Bible, provided by farskipper/kjv."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Version:</span>
            <select 
              value={version} 
              onChange={(e) => {
                setVersion(e.target.value as any);
                setSelectedSlug("genesis");
              }}
              className="rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[var(--accent)]"
            >
              <option value="Septuagint">Septuagint (LXX)</option>
              <option value="King James Version">King James Version (KJV)</option>
            </select>
          </div>
        </div>

        <Card className="mt-4 text-sm">
          <p>
            Source:
            <a className="ml-1 underline" href={version === "Septuagint" ? GREEK_RESOURCES_REPO : KJV_REPO} target="_blank" rel="noreferrer">
              {version === "Septuagint" ? "OpenScriptures GreekResources" : "farskipper/kjv"}
            </a>
          </p>
        </Card>

        <SectionDivider label="Book Selection" />

        {loading && <p>Loading book data...</p>}
        {error && <p className="text-red-300">{error}</p>}

        {!loading && !error && selectedBook && (
          <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
            <Card className="max-h-[70vh] overflow-y-auto text-sm">
              <div className="space-y-1">
                {currentBooks.map((book) => (
                  <button
                    key={book.slug}
                    onClick={() => setSelectedSlug(book.slug)}
                    className={`block w-full rounded-md px-2 py-2 text-left text-sm ${
                      selectedBook.slug === book.slug ? "bg-[var(--bg-secondary)] text-[var(--text-secondary)]" : ""
                    }`}
                  >
                    {book.name}
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">{selectedBook.name}</h2>
              <p className="mt-1 text-sm text-[var(--text-primary)]/75">Open a chapter in the Scripture Reader</p>
              <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-9">
                {chapters.map((chapter) => (
                  <Link
                    key={chapter}
                    to={`/orthodox/scripture/${selectedBook.slug}/${chapter}?version=${version === "King James Version" ? "kjv" : "lxx"}`}
                    className="rounded-md border border-[var(--border)]/45 px-2 py-1 text-center text-sm hover:border-[var(--accent)]"
                  >
                    {chapter}
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
