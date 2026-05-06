import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import SectionDivider from "../../../../components/SectionDivider";

const BYZ_JSON_URL =
  "https://raw.githubusercontent.com/scrollmapper/bible_databases/master/sources/grc/Byz/Byz.json";

const KJV_BASE = "kjv";
const KJV_REPO = "https://github.com/farskipper/kjv";

const ntBooksByz = new Set([
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "I Corinthians",
  "II Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "I Thessalonians",
  "II Thessalonians",
  "I Timothy",
  "II Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "I Peter",
  "II Peter",
  "I John",
  "II John",
  "III John",
  "Jude",
  "Revelation of John",
]);

const slugify = (name: string) =>
  name
    .replace(" of John", "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

type NtBook = {
  name: string;
  slug: string;
  chapterCount: number;
};

export default function OrthodoxNewTestamentPage() {
  const [searchParams] = useSearchParams();
  const initialVersion = searchParams.get("version") === "kjv" ? "King James Version" : "Septuagint (LXX)";
  const [version, setVersion] = useState<"Byzantine Greek" | "King James Version">(initialVersion);
  const [booksByz, setBooksByz] = useState<NtBook[]>([]);
  const [booksKjv, setBooksKjv] = useState<NtBook[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("matthew");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentBooks = version === "Byzantine Greek" ? booksByz : booksKjv;

  useEffect(() => {
    let active = true;

    const loadByzNt = async () => {
      if (booksByz.length > 0) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(BYZ_JSON_URL);
        if (!response.ok) {
          throw new Error("Could not load Byzantine New Testament source");
        }
        const payload = await response.json();
        const parsedBooks: NtBook[] = (payload.books ?? [])
          .filter((book: { name: string }) => ntBooksByz.has(book.name))
          .map((book: { name: string; chapters: Array<unknown> }) => ({
            name: book.name,
            slug: slugify(book.name),
            chapterCount: book.chapters.length,
          }));

        if (!active) return;
        setBooksByz(parsedBooks);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Unable to load New Testament data");
      } finally {
        if (active) setLoading(false);
      }
    };

    const loadKjvNt = async () => {
      if (booksKjv.length > 0) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${KJV_BASE}/books.json`);
        if (!response.ok) throw new Error("Could not load KJV books");
        const allBooks = (await response.json()) as any[];
        // Filter for NT books (Matthew to Revelation)
        const ntStartIndex = allBooks.findIndex(b => b.name === "Matthew");
        const parsedBooks: NtBook[] = allBooks.slice(ntStartIndex).map(b => ({
          name: b.name,
          slug: b.slug,
          chapterCount: b.chapterCount
        }));
        if (!active) return;
        setBooksKjv(parsedBooks);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Unable to load KJV data");
      } finally {
        if (active) setLoading(false);
      }
    };

    if (version === "Byzantine Greek") {
      loadByzNt();
    } else {
      loadKjvNt();
    }

    return () => {
      active = false;
    };
  }, [version, booksByz.length, booksKjv.length]);

  const selectedBook = useMemo(() => currentBooks.find((book) => book.slug === selectedSlug) ?? currentBooks[0], [currentBooks, selectedSlug]);

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Orthodox", to: "/orthodox" },
            { label: "Holy Scripture", to: "/orthodox/scripture" },
            { label: "New Testament", to: "/orthodox/scripture/new-testament" },
          ]}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">
              New Testament ({version === "Byzantine Greek" ? "Byzantine" : "KJV"})
            </h1>
            <p className="mt-3 max-w-4xl text-lg text-[var(--text-primary)]/88">
              {version === "Byzantine Greek" 
                ? "Dedicated New Testament page using the Byzantine source from scrollmapper bible_databases."
                : "Dedicated New Testament page using the King James Version from farskipper/kjv."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Version:</span>
            <select 
              value={version} 
              onChange={(e) => {
                setVersion(e.target.value as any);
                setSelectedSlug("matthew");
              }}
              className="rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[var(--accent)]"
            >
              <option value="Byzantine Greek">Byzantine Greek</option>
              <option value="King James Version">King James Version (KJV)</option>
            </select>
          </div>
        </div>

        <Card className="mt-4 text-sm">
          <p>
            Source:
            <a className="ml-1 underline" href={version === "Byzantine Greek" ? "https://github.com/scrollmapper/bible_databases" : KJV_REPO} target="_blank" rel="noreferrer">
              {version === "Byzantine Greek" ? "scrollmapper Byzantine NT" : "farskipper/kjv"}
            </a>
          </p>
        </Card>

        <SectionDivider label="Book Selection" />

        {loading && <p>Loading New Testament books...</p>}
        {error && <p className="text-red-300">{error}</p>}

        {!loading && !error && (
          <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
            <Card className="max-h-[70vh] overflow-y-auto">
              <div className="space-y-1">
                {currentBooks.map((book) => (
                  <button
                    key={book.slug}
                    onClick={() => setSelectedSlug(book.slug)}
                    className={`block w-full rounded-md px-2 py-2 text-left text-sm ${
                      selectedBook?.slug === book.slug ? "bg-[var(--bg-secondary)] text-[var(--text-secondary)]" : ""
                    }`}
                  >
                    {book.name}
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">{selectedBook?.name}</h2>
              <p className="mt-1 text-sm text-[var(--text-primary)]/75">Open a chapter in the Scripture Reader</p>
              <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-9">
                {Array.from({ length: selectedBook?.chapterCount ?? 0 }).map((_, index) => (
                  <Link
                    key={index}
                    to={`/orthodox/scripture/${selectedBook?.slug}/${index + 1}?version=${version === "King James Version" ? "kjv" : "byz"}`}
                    className="rounded-md border border-[var(--border)]/45 px-2 py-1 text-center text-sm hover:border-[var(--accent)]"
                  >
                    {index + 1}
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
