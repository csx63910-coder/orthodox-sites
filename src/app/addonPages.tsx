import { motion } from "framer-motion";
import {
  BookCopy,
  Bookmark,
  Search,
  Timer,
  Sparkles,
  HandHeart,
  Church,
  Landmark,
  Library,
  ExternalLink,
} from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../components/Breadcrumbs";
import Card from "../components/Card";
import CrossReferenceLink from "../components/CrossReference";
import PrintButton from "../components/PrintButton";
import SectionDivider from "../components/SectionDivider";
import TableOfContents from "../components/TableOfContents";
import {
  catholicBooks,
  catholicSacraments,
  catholicSaints,
  churchFathers,
  compareTopics,
  councils,
  feastByTradition,
  findSaint,
  glossaryTerms,
  orthodoxBooks,
  orthodoxMysteries,
  orthodoxSaints,
  prayerByTradition,
} from "../data/hubData";
import { findIconSaintBySlug, iconSaintUrl } from "../data/iconSaintMap";
import { allBookCatalog, catholicTranslations, orthodoxTranslations, scriptureReferencePreview } from "../data/scriptureData";
import { orthodoxContent, catholicContent, sharedHeritageItems } from "./siteData";

const byId = <T extends { slug: string }>(items: T[], slug?: string) => items.find((item) => item.slug === slug);

const allSearchItems = [
  ...orthodoxSaints.map((item) => ({ type: "Saint", title: item.name, path: `/orthodox/saints/${item.slug}` })),
  ...catholicSaints.map((item) => ({ type: "Saint", title: item.name, path: `/catholic/saints/${item.slug}` })),
  ...prayerByTradition("orthodox").map((item) => ({ type: "Prayer", title: item.title, path: `/orthodox/prayers/${item.slug}` })),
  ...prayerByTradition("catholic").map((item) => ({ type: "Prayer", title: item.title, path: `/catholic/prayers/${item.slug}` })),
  ...glossaryTerms.map((item) => ({ type: "Glossary", title: item.term, path: `/glossary/${item.slug}` })),
  ...councils.map((item) => ({ type: "Catechism", title: item.name, path: `/orthodox/catechism/councils/${item.slug}` })),
  ...churchFathers.map((item) => ({ type: "Church Father", title: item.name, path: `/orthodox/catechism/fathers/${item.slug}` })),
  
  // Dynamic Page/Tab Search
  ...Object.entries(orthodoxContent).map(([slug, content]) => {
    let path = `/orthodox/${slug}`;
    if (slug === "dashboard") path = "/orthodox";
    if (["prayer-corner-setup", "family-devotions", "fasting-guidelines", "preparing-for-confession", "preparing-for-communion"].includes(slug)) {
      path = `/orthodox/home-worship/${slug}`;
    }
    return { type: "Orthodox Section", title: content.title, path, description: content.subtitle };
  }),
  
  ...Object.entries(catholicContent).map(([slug, content]) => {
    let path = `/catholic/${slug}`;
    if (slug === "dashboard") path = "/catholic";
    return { type: "Catholic Section", title: content.title, path, description: content.subtitle };
  }),

  ...sharedHeritageItems.map(item => ({ 
    type: "Shared Heritage", 
    title: item.title, 
    path: "/shared", 
    description: item.description 
  })),

  // Specific Sub-Items from Content
  ...Object.entries(orthodoxContent).flatMap(([slug, content]) => 
    content.items.map(item => {
      let path = `/orthodox/${slug}`;
      if (["prayer-corner-setup", "family-devotions", "fasting-guidelines", "preparing-for-confession", "preparing-for-communion"].includes(slug)) {
        path = `/orthodox/home-worship/${slug}`;
      }
      return { type: "Topic", title: item.title, path, description: item.description };
    })
  ),
];

function relatedCards(paths: string[]) {
  return paths.map((path) => ({ path, title: path.split("/").pop()?.replace(/-/g, " ") ?? path }));
}

export function SaintDetailPage({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const { saintSlug } = useParams();
  const saint = findSaint(saintSlug ?? "", tradition);
  if (!saint) return <NotFoundContent title="Saint not found" />;

  const crumbs = [
    { label: t('nav.home'), to: "/" },
    { label: tradition === "orthodox" ? t('nav.orthodox') : t('nav.catholic'), to: `/${tradition}` },
    { label: t('sections.saints'), to: `/${tradition}/saints` },
    { label: saint.name, to: `/${tradition}/saints/${saint.slug}` },
  ];

  const iconEntry = findIconSaintBySlug(saint.slug);
  const iconImage = iconEntry
    ? iconSaintUrl(iconEntry.folder, 1, iconEntry.sampleImages[0])
    : null;

  return (
    <main className="saint-print-page px-4 py-8 md:px-8">
      <Breadcrumbs items={crumbs} />
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{saint.name}</h1>
          <p className="mt-2 text-lg">{saint.title}</p>
        </div>
        <PrintButton />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {iconImage ? (
            <Card className="overflow-hidden">
              <img
                src={iconImage}
                alt={`Icon of ${saint.name}`}
                className="mx-auto max-h-[60vh] w-auto rounded-md object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <p className="mt-2 text-center text-xs text-[var(--text-primary)]/60">
                Icon from the ICONSAINT dataset
              </p>
            </Card>
          ) : (
            <Card>
              <p className="font-accent text-2xl">Sacred Art Placeholder</p>
              <p className="mt-2 text-sm text-[var(--text-primary)]/80">Icon panel or painting slot for devotional focus.</p>
            </Card>
          )}
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Feast Day</h2>
            <p>{saint.feastDay}</p>
            <p className="text-sm text-[var(--text-primary)]/75">{saint.calendarNote}</p>
          </Card>
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">
              {tradition === "orthodox" ? "Troparion / Kontakion" : "Collect Prayer"}
            </h2>
            <p className="italic">{saint.hymnOrCollect}</p>
          </Card>
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Biography</h2>
            {saint.biography.map((paragraph) => (
              <p className="mt-3 leading-relaxed" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </Card>
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Notable Quote</h2>
            <blockquote className="mt-2 border-l-2 border-[var(--accent)] pl-3 italic">"{saint.quote}"</blockquote>
          </Card>
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Associated Prayers</h2>
            <div className="mt-2 flex flex-wrap gap-3">
              {saint.prayers.map((prayer) => (
                <CrossReferenceLink key={prayer.path} to={prayer.path} label={prayer.label} type="prayer" preview={<p>Open full prayer text and print layout.</p>} />
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Patronage</h2>
            <p className="mt-2">{saint.patronage}</p>
          </Card>
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Related Saints</h2>
            <ul className="mt-2 space-y-2">
              {saint.related.map((slug) => {
                const related = findSaint(slug, tradition);
                if (!related) return null;
                return (
                  <li key={slug}>
                    <CrossReferenceLink
                      to={`/${tradition}/saints/${slug}`}
                      label={related.name}
                      type="saint"
                      preview={<p>{related.title}</p>}
                    />
                  </li>
                );
              })}
            </ul>
          </Card>
          <Card>
            <Link to={`/${tradition}/saints`} className="underline underline-offset-4">
              Back to Saints
            </Link>
          </Card>
        </div>
      </div>
    </main>
  );
}

export function SharedRelatedSection() {
  const links = relatedCards(["/shared/compare/creed", "/shared/compare/sacraments", "/shared/compare/liturgy", "/shared/compare/calendar"]);
  return (
    <section className="px-4 pb-8 md:px-8">
      <SectionDivider label="Related" />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {links.map((item) => (
          <Card key={item.path}>
            <Link to={item.path} className="font-heading text-[var(--text-secondary)] underline">
              {item.title}
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function PrayerDetailPage({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const { prayerSlug } = useParams();
  const prayer = prayerByTradition(tradition).find((item) => item.slug === prayerSlug);
  if (!prayer) return <NotFoundContent title="Prayer not found" />;

  const isCategory = ["evening-prayers", "midnight-office", "akathist-hymns", "morning-prayers"].includes(prayer.slug);

  const toc = [
    { id: "text", label: isCategory ? "Overview" : "Prayer Text" },
    { id: "history", label: "History" },
    { id: "rubrics", label: "Rubrics" },
  ];

  const categoryRelated = isCategory ? prayer.related : [];

  return (
    <main className="prayer-print-page px-4 py-8 md:px-8">
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: "/" },
          { label: tradition === "orthodox" ? t('nav.orthodox') : t('nav.catholic'), to: `/${tradition}` },
          { label: t('sections.prayer_book'), to: `/${tradition}/prayers` },
          { label: prayer.title, to: `/${tradition}/prayers/${prayer.slug}` },
        ]}
      />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{prayer.title}</h1>
        <PrintButton />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="space-y-4">
          <div id="text">
            <Card className="leading-relaxed">
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">
                {isCategory ? "Category Overview" : "Complete Prayer Text"}
              </h2>
              <p className="mt-3 text-lg">{prayer.text}</p>
              
              {isCategory && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {categoryRelated.map((slug) => {
                    const subPrayer = prayerByTradition(tradition).find((p) => p.slug === slug);
                    if (!subPrayer) return null;
                    return (
                      <Link
                        key={slug}
                        to={`/${tradition}/prayers/${slug}`}
                        className="group flex flex-col rounded-lg border border-[var(--border)]/40 bg-[var(--bg-secondary)] p-3 transition-colors hover:border-[var(--accent)]"
                      >
                        <span className="font-heading text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)]">
                          {subPrayer.title}
                        </span>
                        <span className="mt-1 text-xs text-[var(--text-primary)]/70 line-clamp-1">
                          {subPrayer.text.substring(0, 60)}...
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Original Language ({prayer.language})</h2>
            <p className="mt-3">{prayer.original}</p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-sm">
              <BookCopy size={14} /> Listen (audio placeholder)
            </button>
          </Card>
          <div id="history">
            <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Background</h2>
            {prayer.history.map((text) => (
              <p key={text} className="mt-2">
                {text}
              </p>
            ))}
            </Card>
          </div>
          <div id="rubrics">
            <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">When and How to Pray</h2>
            <p className="mt-2">{prayer.when}</p>
            <p className="mt-2">{prayer.rubrics}</p>
            <div className="mt-4">
              <h3 className="font-heading text-lg">Related</h3>
              <ul className="mt-2 space-y-2">
                {prayer.related.map((slug) => {
                  const related = prayerByTradition(tradition).find((item) => item.slug === slug);
                  if (!related) return null;
                  return (
                    <li key={slug}>
                      <Link className="xref-link xref-prayer" to={`/${tradition}/prayers/${slug}`}>
                        {related.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            </Card>
          </div>
        </div>
        <TableOfContents items={toc} />
      </div>
    </main>
  );
}

export function FeastDetailPage({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { feastSlug } = useParams();
  const feast = feastByTradition(tradition).find((item) => item.slug === feastSlug);
  if (!feast) return <NotFoundContent title="Feast not found" />;

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: tradition === "orthodox" ? "Orthodox" : "Catholic", to: `/${tradition}` },
          { label: "Calendar", to: `/${tradition}/calendar` },
          { label: feast.name, to: `/${tradition}/calendar/feasts/${feast.slug}` },
        ]}
      />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{feast.name}</h1>
      <p className="mt-2 text-lg">{feast.date}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Celebrated By</h2>
          <p className="mt-2">{feast.traditions}</p>
        </Card>
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Liturgical Readings</h2>
          {feast.readings.map((reading) => (
            <p key={reading} className="mt-2">
              <CrossReferenceLink
                to={`/${tradition}/scripture/reader`}
                label={reading}
                type="scripture"
                preview={<p>{scriptureReferencePreview[reading] ?? "Open in scripture reader."}</p>}
                fullChapterLink={`/${tradition}/scripture/reader`}
              />
            </p>
          ))}
        </Card>
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Hymn / Proper</h2>
          <p className="mt-2 italic">{feast.hymnOrCollect}</p>
        </Card>
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Fasting & Preparation</h2>
          <p className="mt-2">{feast.fasting}</p>
        </Card>
      </div>
      <SectionDivider label="Historical Background" />
      <div className="space-y-3">
        {feast.history.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </main>
  );
}

function scriptureSource(tradition: "orthodox" | "catholic") {
  return tradition === "orthodox" ? orthodoxTranslations : catholicTranslations;
}

const storageKey = (tradition: string, name: string) => `ancient-path-${tradition}-${name}`;
const slugifyBook = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const GREEK_RESOURCES_REPO = "https://github.com/openscriptures/GreekResources";
const GREEK_RESOURCES_BASE =
  "https://raw.githubusercontent.com/openscriptures/GreekResources/master/LxxLemmas";
const BYZ_REPO = "https://github.com/scrollmapper/bible_databases/tree/master/sources/grc/Byz";
const BYZ_JSON_URL =
  "https://raw.githubusercontent.com/scrollmapper/bible_databases/master/sources/grc/Byz/Byz.json";
const KJV_REPO = "https://github.com/farskipper/kjv";
const KJV_BASE = "kjv";

type KJVBook = { slug: string; name: string; file: string };
type KJVChapter = { chapter: number; verses: Array<{ verse: number; text: string }> };
type KJVBookPayload = { book: string; chapters: Array<{ chapter: string; verses: Array<{ verse: string; text: string }> }> };

const ntBookNames = new Set([
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
  "Revelation",
  "Revelation of John",
]);

const lxxBookNameBySlug: Record<string, string> = {
  genesis: "Genesis",
  exodus: "Exodus",
  leviticus: "Leviticus",
  numbers: "Numbers",
  deuteronomy: "Deuteronomy",
  joshua: "Joshua",
  judges: "Judges",
  ruth: "Ruth",
  psalms: "Psalms",
  proverbs: "Proverbs",
  ecclesiastes: "Ecclesiastes",
  "song-of-solomon": "Song of Solomon",
  job: "Job",
  wisdom: "Wisdom",
  sirach: "Sirach",
  hosea: "Hosea",
  amos: "Amos",
  micah: "Micah",
  joel: "Joel",
  obadiah: "Obadiah",
  jonah: "Jonah",
  nahum: "Nahum",
  habakkuk: "Habakkuk",
  zephaniah: "Zephaniah",
  haggai: "Haggai",
  zechariah: "Zechariah",
  malachi: "Malachi",
  isaiah: "Isaiah",
  jeremiah: "Jeremiah",
  baruch: "Baruch",
  lamentations: "Lamentations",
  ezekiel: "Ezekiel",
  daniel: "Daniel",
};

const greekResourcesBooks = [
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

const ntSlugs = new Set([
  "matthew",
  "mark",
  "luke",
  "john",
  "acts",
  "romans",
  "1-corinthians",
  "2-corinthians",
  "galatians",
  "ephesians",
  "philippians",
  "colossians",
  "1-thessalonians",
  "2-thessalonians",
  "1-timothy",
  "2-timothy",
  "titus",
  "philemon",
  "hebrews",
  "james",
  "1-peter",
  "2-peter",
  "1-john",
  "2-john",
  "3-john",
  "jude",
  "revelation",
]);

export function ScriptureReader({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const { bookSlug, chapterNumber } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const source = scriptureSource(tradition);
  const initialTranslation = useMemo(() => {
    const v = searchParams.get("version");
    if (v === "kjv") return "King James Version";
    if (v === "lxx") return "Septuagint";
    return source[0].translation;
  }, [searchParams, source]);
  const [translation, setTranslation] = useState(initialTranslation);

  useEffect(() => {
    setTranslation(initialTranslation);
  }, [initialTranslation]);

  const [fontSize, setFontSize] = useState<"text-sm" | "text-base" | "text-lg" | "text-xl">("text-base");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>(() => JSON.parse(localStorage.getItem(storageKey(tradition, "bookmarks")) ?? "[]"));
  const [readPlan, setReadPlan] = useState<string[]>(() => JSON.parse(localStorage.getItem(storageKey(tradition, "reading-plan")) ?? "[]"));
  const [highlightVerse, setHighlightVerse] = useState<number | null>(null);
  const [lxxBooks, setLxxBooks] = useState<Array<{ slug: string; name: string; file: string }>>([]);
  const [lxxBookCache, setLxxBookCache] = useState<Record<string, Record<string, Array<{ key: string; lemma: string }>>>>({});
  const [lxxChapters, setLxxChapters] = useState<number[]>([]);
  const [lxxVerses, setLxxVerses] = useState<{ verse: number; text: string }[]>([]);
  const [lxxLoading, setLxxLoading] = useState(false);
  const [lxxError, setLxxError] = useState<string | null>(null);
  const [byzBooks, setByzBooks] = useState<
    Array<{ slug: string; name: string; chapters: Array<{ chapter: number; verses: Array<{ verse: number; text: string }> }> }>
  >([]);
  const [byzLoading, setByzLoading] = useState(false);
  const [byzError, setByzError] = useState<string | null>(null);
  const [kjvBooks, setKjvBooks] = useState<KJVBook[]>([]);
  const [kjvBookCache, setKjvBookCache] = useState<Record<string, KJVChapter[]>>({});
  const [kjvChapters, setKjvChapters] = useState<number[]>([]);
  const [kjvVerses, setKjvVerses] = useState<Array<{ verse: number; text: string }>>([]);
  const [kjvLoading, setKjvLoading] = useState(false);
  const [kjvError, setKjvError] = useState<string | null>(null);
  const selectedSlug = bookSlug ?? "genesis";
  const isRemoteByz = tradition === "orthodox" && translation === "Septuagint" && ntSlugs.has(selectedSlug);
  const isRemoteLxx = tradition === "orthodox" && translation === "Septuagint" && !isRemoteByz;
  const isRemoteKJV = translation === "King James Version";

  useEffect(() => {
    localStorage.setItem(storageKey(tradition, "bookmarks"), JSON.stringify(bookmarks));
  }, [bookmarks, tradition]);

  useEffect(() => {
    localStorage.setItem(storageKey(tradition, "reading-plan"), JSON.stringify(readPlan));
  }, [readPlan, tradition]);

  useEffect(() => {
    if (!isRemoteLxx || lxxBooks.length > 0) return;
    let active = true;

    const loadRemoteLxx = async () => {
      setLxxLoading(true);
      setLxxError(null);
      try {
        if (!active) return;
        setLxxBooks(greekResourcesBooks);
      } catch (error) {
        if (!active) return;
        setLxxError(error instanceof Error ? error.message : "Unable to load Septuagint source");
      } finally {
        if (active) setLxxLoading(false);
      }
    };

    loadRemoteLxx();
    return () => {
      active = false;
    };
  }, [isRemoteLxx, lxxBooks.length]);

  useEffect(() => {
    if (!isRemoteByz || byzBooks.length > 0) return;
    let active = true;

    const loadByz = async () => {
      setByzLoading(true);
      setByzError(null);
      try {
        const response = await fetch(BYZ_JSON_URL);
        if (!response.ok) {
          throw new Error("Could not fetch Byz.json");
        }
        const payload = await response.json();
        const parsedBooks = (payload.books ?? [])
          .filter((book: { name: string }) => ntBookNames.has(book.name))
          .map((book: { name: string; chapters: Array<{ chapter: number; verses: Array<{ verse: number; text: string }> }> }) => ({
            ...book,
            slug: slugifyBook(book.name.replace(" of John", "")),
          }));
        if (!active) return;
        setByzBooks(parsedBooks);
      } catch (error) {
        if (!active) return;
        setByzError(error instanceof Error ? error.message : "Unable to load Byzantine NT source");
      } finally {
        if (active) setByzLoading(false);
      }
    };

    loadByz();
    return () => {
      active = false;
    };
  }, [isRemoteByz, byzBooks.length]);

  useEffect(() => {
    if (!isRemoteKJV || kjvBooks.length > 0) return;
    let active = true;

    const loadKjvBooks = async () => {
      setKjvLoading(true);
      setKjvError(null);
      try {
        const response = await fetch(`${KJV_BASE}/books.json`);
        if (!response.ok) throw new Error("Could not fetch KJV books.json");
        const books = (await response.json()) as KJVBook[];
        if (!active) return;
        setKjvBooks(books);
      } catch (error) {
        if (!active) return;
        setKjvError(error instanceof Error ? error.message : "Unable to load KJV books list");
      } finally {
        if (active) setKjvLoading(false);
      }
    };

    loadKjvBooks();
    return () => {
      active = false;
    };
  }, [isRemoteKJV, kjvBooks.length]);

  useEffect(() => {
    if (!isRemoteLxx || lxxBooks.length === 0) {
      setLxxChapters([]);
      setLxxVerses([]);
      return;
    }

    const selectedSlug = bookSlug ?? "genesis";
    const selectedBook = lxxBooks.find((book) => book.slug === selectedSlug) ?? lxxBooks[0];
    const chapterNum = Number(chapterNumber) || 1;

    const buildChapterData = (bookData: Record<string, Array<{ key: string; lemma: string }>>) => {
      const chapterSet = new Set<number>();
      const verseRows: { verse: number; text: string }[] = [];

      Object.entries(bookData).forEach(([reference, tokens]) => {
        const parts = reference.split(".");
        if (parts.length < 3) return;
        const chapter = Number(parts[1]);
        const verse = Number(parts[2]);
        if (Number.isNaN(chapter) || Number.isNaN(verse)) return;
        chapterSet.add(chapter);
        if (chapter === chapterNum) {
          const text = tokens.map((token) => token.lemma || token.key).join(" ");
          verseRows.push({ verse, text });
        }
      });

      verseRows.sort((a, b) => a.verse - b.verse);
      setLxxChapters(Array.from(chapterSet).sort((a, b) => a - b));
      setLxxVerses(verseRows);
    };

    const cached = lxxBookCache[selectedBook.slug];
    if (cached) {
      buildChapterData(cached);
      return;
    }

    let active = true;
    const loadBook = async () => {
      setLxxLoading(true);
      setLxxError(null);
      try {
        const response = await fetch(`${GREEK_RESOURCES_BASE}/${selectedBook.file}.js`);
        if (!response.ok) {
          throw new Error(`Could not fetch ${selectedBook.file}.js`);
        }
        const jsText = (await response.text()).trim();
        const parsed = new Function(`return (${jsText});`)() as Record<string, Array<{ key: string; lemma: string }>>;
        if (!active) return;
        setLxxBookCache((prev) => ({ ...prev, [selectedBook.slug]: parsed }));
        buildChapterData(parsed);
      } catch (error) {
        if (!active) return;
        setLxxError(error instanceof Error ? error.message : "Unable to load GreekResources LXX data");
        setLxxChapters([]);
        setLxxVerses([]);
      } finally {
        if (active) setLxxLoading(false);
      }
    };

    loadBook();
    return () => {
      active = false;
    };
  }, [isRemoteLxx, lxxBooks, lxxBookCache, bookSlug, chapterNumber]);

  useEffect(() => {
    if (!isRemoteKJV || kjvBooks.length === 0) {
      setKjvChapters([]);
      setKjvVerses([]);
      return;
    }

    const chapterNum = Number(chapterNumber) || 1;

    const hydrate = (chapters: KJVChapter[]) => {
      setKjvChapters(chapters.map((ch) => ch.chapter));
      setKjvVerses(chapters.find((ch) => ch.chapter === chapterNum)?.verses ?? []);
    };

    const currentSlug = bookSlug ?? "genesis";
    const selectedBook = kjvBooks.find((book) => book.slug === currentSlug) ?? kjvBooks[0];
    if (!selectedBook) return;

    const cached = kjvBookCache[selectedBook.slug];
    if (cached) {
      hydrate(cached);
      return;
    }

    let active = true;
    const loadKjvBook = async () => {
      setKjvLoading(true);
      setKjvError(null);
      try {
        const response = await fetch(`${KJV_BASE}/${selectedBook.file}`);
        if (!response.ok) throw new Error(`Could not fetch ${selectedBook.file}`);
        const payload = (await response.json()) as KJVBookPayload;
        const normalized: KJVChapter[] = (payload.chapters ?? []).map((ch) => ({
          chapter: Number(ch.chapter),
          verses: (ch.verses ?? []).map((verse) => ({ verse: Number(verse.verse), text: verse.text })),
        }));
        if (!active) return;
        setKjvBookCache((prev) => ({ ...prev, [selectedBook.slug]: normalized }));
        hydrate(normalized);
      } catch (error) {
        if (!active) return;
        setKjvError(error instanceof Error ? error.message : "Unable to load KJV chapter data");
        setKjvChapters([]);
        setKjvVerses([]);
      } finally {
        if (active) setKjvLoading(false);
      }
    };

    loadKjvBook();
    return () => {
      active = false;
    };
  }, [isRemoteKJV, kjvBooks, kjvBookCache, bookSlug, chapterNumber]);

  const translationData = source.find((item) => item.translation === translation) ?? source[0];
  if (!translationData) return <div className="p-8 text-center">Translation data not found.</div>;

  const loadedBook = translationData.books.find((book) => book.slug === bookSlug) ?? translationData.books[0];
  if (!loadedBook) return <div className="p-8 text-center">Book not found in translation.</div>;

  const chapter = loadedBook.chapters.find((item) => item.chapter === Number(chapterNumber)) ?? loadedBook.chapters[0];
  if (!chapter) return <div className="p-8 text-center">Chapter not found.</div>;

  const currentChapter = Number(chapterNumber) || chapter.chapter;
  const remoteBookName =
    byzBooks.find((book) => book.slug === (bookSlug ?? ""))?.name ??
    lxxBooks.find((book) => book.slug === (bookSlug ?? ""))?.name ??
    kjvBooks.find((book) => book.slug === (bookSlug ?? ""))?.name ??
    lxxBookNameBySlug[bookSlug ?? ""] ??
    allBookCatalog.find((book) => book.slug === (bookSlug ?? ""))?.name ??
    loadedBook.name;
  const displayedVerses = isRemoteLxx && lxxVerses.length > 0 ? lxxVerses : chapter.verses;
  const byzBook = byzBooks.find((book) => book.slug === selectedSlug);
  const byzChapters = byzBook?.chapters.map((item) => item.chapter) ?? [];
  const byzVerses = byzBook?.chapters.find((item) => item.chapter === currentChapter)?.verses ?? [];
  const activeVerses = isRemoteByz ? byzVerses : isRemoteKJV ? kjvVerses : displayedVerses;
  const chapterSequence =
    isRemoteByz && byzChapters.length > 0
      ? byzChapters
      : isRemoteKJV && kjvChapters.length > 0
        ? kjvChapters
      : isRemoteLxx && lxxChapters.length > 0
        ? lxxChapters
        : loadedBook.chapters.map((item) => item.chapter);
  const activeBookSlug = isRemoteKJV ? selectedSlug : loadedBook.slug;
  const prevChapterNum = chapterSequence[chapterSequence.indexOf(currentChapter) - 1];
  const nextChapterNum = chapterSequence[chapterSequence.indexOf(currentChapter) + 1];
  const versionQuery = isRemoteKJV ? "?version=kjv" : isRemoteByz ? "?version=byz" : isRemoteLxx ? "?version=lxx" : "";

  const searchResults = useMemo(() => {
    if (isRemoteLxx || isRemoteByz || isRemoteKJV) return [];
    if (!searchQuery) return [];
    return translationData.books.flatMap((book) =>
      book.chapters.flatMap((ch) =>
        ch.verses
          .filter((verse) => verse.text.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((verse) => ({ book: book.slug, chapter: ch.chapter, verse: verse.verse, text: verse.text }))
      )
    );
  }, [searchQuery, translationData.books, isRemoteLxx, isRemoteByz, isRemoteKJV]);

  return (
    <main className="scripture-print-page px-4 py-8 md:px-8">
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: "/" },
          { label: tradition === "orthodox" ? t('nav.orthodox') : t('nav.catholic'), to: `/${tradition}` },
          { label: t('sections.holy_scripture'), to: `/${tradition}/scripture` },
          { label: "Reader", to: `/${tradition}/scripture/reader` },
        ]}
      />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Scripture Reader</h1>
        <div className="flex items-center gap-2">
          <select value={translation} onChange={(event) => setTranslation(event.target.value)} className="rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-2 text-sm">
            {source.map((item) => (
              <option key={item.translation} value={item.translation}>
                {item.translation}
              </option>
            ))}
          </select>
          <PrintButton />
        </div>
      </div>
      {isRemoteLxx && (
        <Card className="mb-4 text-sm">
          <p>
            Septuagint source loaded from
            <a className="ml-1 underline" href={GREEK_RESOURCES_REPO} target="_blank" rel="noreferrer">
              OpenScriptures GreekResources
            </a>
            . OT lemma files are fetched from
            <a className="ml-1 underline" href={`${GREEK_RESOURCES_BASE}/Gen.js`} target="_blank" rel="noreferrer">
              LxxLemmas/*.js
            </a>
            .
          </p>
          {lxxLoading && <p className="mt-1 text-[var(--text-secondary)]">Loading remote Septuagint database...</p>}
          {lxxError && <p className="mt-1 text-red-300">{lxxError}</p>}
        </Card>
      )}
      {isRemoteByz && (
        <Card className="mb-4 text-sm">
          <p>
            New Testament source loaded from
            <a className="ml-1 underline" href={BYZ_REPO} target="_blank" rel="noreferrer">
              scrollmapper Byz source
            </a>
            , using
            <a className="ml-1 underline" href={BYZ_JSON_URL} target="_blank" rel="noreferrer">
              Byz.json
            </a>
            .
          </p>
          {byzLoading && <p className="mt-1 text-[var(--text-secondary)]">Loading Byzantine NT data...</p>}
          {byzError && <p className="mt-1 text-red-300">{byzError}</p>}
        </Card>
      )}
      {isRemoteKJV && (
        <Card className="mb-4 text-sm">
          <p>
            King James Version source loaded from
            <a className="ml-1 underline" href={KJV_REPO} target="_blank" rel="noreferrer">
              farskipper/kjv
            </a>
            .
          </p>
          {kjvLoading && <p className="mt-1 text-[var(--text-secondary)]">Loading KJV text from local source...</p>}
          {kjvError && <p className="mt-1 text-red-300">{kjvError}</p>}
        </Card>
      )}
      <div className="grid gap-4 lg:grid-cols-[260px_1fr_240px]">
        <Card className="max-h-[72vh] overflow-y-auto">
          <h2 className="font-heading text-lg text-[var(--text-secondary)]">Books</h2>
          {isRemoteKJV ? (
            <div className="mt-2 space-y-1">
              {kjvBooks.map((book) => (
                <button
                  key={book.slug}
                  onClick={() => navigate(`/${tradition}/scripture/${book.slug}/1?version=kjv`)}
                  className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-[var(--bg-secondary)]"
                >
                  {book.name}
                </button>
              ))}
            </div>
          ) : isRemoteByz ? (
            <div className="mt-2 space-y-1">
              {byzBooks.map((book) => (
                <button
                  key={book.slug}
                  onClick={() => navigate(`/${tradition}/scripture/${book.slug}/1?version=byz`)}
                  className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-[var(--bg-secondary)]"
                >
                  {book.name}
                </button>
              ))}
            </div>
          ) : isRemoteLxx ? (
            <div className="mt-2 space-y-1">
              {lxxBooks.map((book) => {
                const slug = slugifyBook(book.name);
                return (
                  <button
                    key={book.name}
                    onClick={() => navigate(`/${tradition}/scripture/${slug}/1?version=lxx`)}
                    className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-[var(--bg-secondary)]"
                  >
                    {book.name}
                  </button>
                );
              })}
            </div>
          ) : (
            (["OT", "NT", "DC"] as const).map((testament) => (
            <div key={testament} className="mt-3">
              <h3 className="text-sm text-[var(--text-primary)]/70">{testament}</h3>
              <div className="mt-1 space-y-1">
                {allBookCatalog
                  .filter((book) => book.testament === testament)
                  .map((book) => {
                    const loaded = translationData.books.some((item) => item.slug === book.slug);
                    return (
                      <button
                        key={book.slug}
                        onClick={() => {
                          if (loaded) navigate(`/${tradition}/scripture/${book.slug}/1`);
                        }}
                        className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-[var(--bg-secondary)]"
                      >
                        {book.name}
                        {!loaded && <span className="ml-1 text-xs text-[var(--text-primary)]/60">Full text loading - check back soon</span>}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))
          )}
        </Card>
        <Card>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-2xl text-[var(--text-secondary)]">
              {isRemoteLxx || isRemoteKJV ? remoteBookName : loadedBook.name} {currentChapter}
            </h2>
            <div className="flex items-center gap-2">
              <button
                disabled={!prevChapterNum}
                onClick={() => prevChapterNum && navigate(`/${tradition}/scripture/${activeBookSlug}/${prevChapterNum}${versionQuery}`)}
                className="rounded border border-[var(--border)] px-2 py-1 text-sm disabled:opacity-40"
              >
                Prev
              </button>
              <button
                disabled={!nextChapterNum}
                onClick={() => nextChapterNum && navigate(`/${tradition}/scripture/${activeBookSlug}/${nextChapterNum}${versionQuery}`)}
                className="rounded border border-[var(--border)] px-2 py-1 text-sm disabled:opacity-40"
              >
                Next
              </button>
              <div className="flex gap-1">
                {(["text-sm", "text-base", "text-lg", "text-xl"] as const).map((size) => (
                  <button key={size} onClick={() => setFontSize(size)} className={`rounded border px-2 py-1 text-xs ${fontSize === size ? "border-[var(--accent)]" : "border-[var(--border)]/40"}`}>
                    {size.replace("text-", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className={`space-y-3 ${fontSize}`}>
            {activeVerses.map((verse) => {
              const key = `${activeBookSlug}-${currentChapter}-${verse.verse}`;
              const marked = bookmarks.includes(key);
              return (
                <p key={key} id={`verse-${verse.verse}`} className={highlightVerse === verse.verse ? "rounded bg-[var(--accent)]/15 p-1" : ""}>
                  <button
                    className="mr-1 font-semibold text-[var(--text-secondary)]"
                    onClick={() => {
                      navigator.clipboard.writeText(`${isRemoteLxx || isRemoteKJV ? remoteBookName : loadedBook.name} ${currentChapter}:${verse.verse}`);
                      setHighlightVerse(verse.verse);
                    }}
                  >
                    {verse.verse}
                  </button>
                  {verse.text}
                  <button
                    onClick={() =>
                      setBookmarks((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]))
                    }
                    className="ml-2 inline-flex"
                    aria-label="Bookmark verse"
                  >
                    <Bookmark size={14} className={marked ? "text-[var(--text-secondary)]" : "text-[var(--text-primary)]/60"} />
                  </button>
                </p>
              );
            })}
          </div>
        </Card>
        <div className="space-y-4">
          <Card>
            <h3 className="font-heading text-lg text-[var(--text-secondary)]">Search</h3>
            <div className="mt-2 flex items-center gap-2 rounded border border-[var(--border)]/40 px-2 py-1">
              <Search size={14} />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={isRemoteLxx || isRemoteByz || isRemoteKJV ? "Search disabled for remote source" : "Search scripture"}
                disabled={isRemoteLxx || isRemoteByz || isRemoteKJV}
                className="w-full bg-transparent text-sm outline-none disabled:opacity-50"
              />
            </div>
            <div className="mt-2 max-h-32 space-y-1 overflow-y-auto text-xs">
              {searchResults.slice(0, 8).map((result) => (
                <button key={`${result.book}-${result.chapter}-${result.verse}`} onClick={() => navigate(`/${tradition}/scripture/${result.book}/${result.chapter}`)} className="block w-full text-left hover:text-[var(--text-secondary)]">
                  {result.book} {result.chapter}:{result.verse} - {result.text}
                </button>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-heading text-lg text-[var(--text-secondary)]">My Bookmarks</h3>
            <ul className="mt-2 space-y-1 text-xs">
              {bookmarks.slice(0, 8).map((item) => (
                <li key={item}>{item.replace(/-/g, " ")}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="font-heading text-lg text-[var(--text-secondary)]">Reading Plan</h3>
            {(isRemoteKJV ? kjvBooks : translationData.books).map((book) => (
              <label key={book.slug} className="mt-1 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={readPlan.includes(book.slug)}
                  onChange={() =>
                    setReadPlan((prev) => (prev.includes(book.slug) ? prev.filter((item) => item !== book.slug) : [...prev, book.slug]))
                  }
                />
                {book.name}
              </label>
            ))}
          </Card>
        </div>
      </div>
    </main>
  );
}

export function TodayDashboard({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const today = new Date();
  const saint = (tradition === "orthodox" ? orthodoxSaints : catholicSaints)[today.getDate() % 5];
  const feast = feastByTradition(tradition)[today.getDate() % 3];
  const [jurisdiction, setJurisdiction] = useState("Greek");
  const readings = tradition === "orthodox" ? ["John 1:1-18", "Psalm 50"] : ["John 3:16", "Romans 8:28"];

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: t('nav.home'), to: "/" }, { label: tradition === "orthodox" ? t('nav.orthodox') : t('nav.catholic'), to: `/${tradition}` }, { label: "Today", to: `/${tradition}/today` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Daily Dashboard</h1>
      <p className="mt-2">{today.toDateString()} {tradition === "orthodox" ? "- Julian equivalent shown in jurisdictional calendars." : "- Roman Calendar observance."}</p>
      {tradition === "orthodox" && (
        <select className="mt-3 rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-2" value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}>
          {["Greek", "Serbian", "Russian", "Armenian", "Antiochian"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      )}
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Today's Saint</h2>
          <CrossReferenceLink to={`/${tradition}/saints/${saint.slug}`} label={saint.name} type="saint" preview={<p>{saint.title}</p>} />
        </Card>
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Today's Readings</h2>
          {readings.map((reading) => (
            <p key={reading}>
              <CrossReferenceLink to={`/${tradition}/scripture/reader`} label={reading} type="scripture" preview={<p>{scriptureReferencePreview[reading] ?? "Open chapter in reader."}</p>} fullChapterLink={`/${tradition}/scripture/reader`} />
            </p>
          ))}
        </Card>
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Fasting Rule</h2>
          <p>{tradition === "orthodox" ? "Wine and oil allowed" : "Friday abstinence from meat"}</p>
          <Link className="mt-2 inline-block underline" to={`/${tradition}/fasting`}>
            Open fasting guide
          </Link>
        </Card>
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Liturgical Season</h2>
          <p>{tradition === "orthodox" ? "Great Lent - Purple" : "Ordinary Time - Green"}</p>
        </Card>
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Feast Day</h2>
          <CrossReferenceLink to={`/${tradition}/calendar/feasts/${feast.slug}`} label={feast.name} type="feast" preview={<p>{feast.date}</p>} />
        </Card>
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Prayer of the Day</h2>
          <CrossReferenceLink to={`/${tradition}/prayers/${tradition === "orthodox" ? "jesus-prayer" : "hail-mary"}`} label={tradition === "orthodox" ? "Jesus Prayer" : "Hail Mary"} type="prayer" preview={<p>Open full prayer text and rubrics.</p>} />
        </Card>
      </div>
      <blockquote className="mt-6 border-l-2 border-[var(--accent)] pl-4 italic">"Let us become all flame for Christ by prayer and mercy."</blockquote>
      <div className="mt-4 flex gap-4">
        <Link to={`/${tradition}/prayers/${tradition === "orthodox" ? "morning-prayers" : "morning-offering"}`} className="underline">Morning Prayer</Link>
        <Link to={`/${tradition}/prayers/${tradition === "orthodox" ? "prayer-after-communion" : "act-of-contrition"}`} className="underline">Evening Prayer</Link>
      </div>
      {tradition === "orthodox" && <p className="mt-3 text-sm text-[var(--text-primary)]/75">Current jurisdiction: {jurisdiction}</p>}
    </main>
  );
}

export function FastingPage({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const levels = ["Strict fast", "Fish allowed", "Wine and oil allowed", "Fish, wine, oil allowed", "Fast-free"];
  const colors = ["bg-red-900", "bg-red-700", "bg-orange-600", "bg-yellow-500", "bg-green-600"];
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: t('nav.home'), to: "/" }, { label: tradition === "orthodox" ? t('nav.orthodox') : t('nav.catholic'), to: `/${tradition}` }, { label: "Fasting", to: `/${tradition}/fasting` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Fasting Guide</h1>
      <Card className="mt-4">
        <p className="text-lg">Today is a <span className="font-semibold text-[var(--text-secondary)]">{tradition === "orthodox" ? "wine and oil allowed" : "Friday abstinence"}</span> day.</p>
      </Card>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {Array.from({ length: 35 }).map((_, index) => (
          <div key={index} className={`h-8 rounded ${colors[index % colors.length]}`} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-xs">
        {levels.map((level, index) => (
          <span key={level} className="inline-flex items-center gap-2">
            <span className={`inline-block h-3 w-3 rounded ${colors[index]}`} /> {level}
          </span>
        ))}
      </div>
      <SectionDivider label="Rules" />
      <p>{tradition === "orthodox" ? "Orthodox fasting includes Wednesday/Friday rhythm and major fasts with jurisdictional nuance." : "Catholic discipline includes Lenten obligations, Friday abstinence, and traditional ember customs."}</p>
      <SectionDivider label="Feasts Affecting Fast" />
      <div className="flex flex-wrap gap-3">
        {feastByTradition(tradition).map((feast) => (
          <CrossReferenceLink key={feast.slug} to={`/${tradition}/calendar/feasts/${feast.slug}`} label={feast.name} type="feast" preview={<p>{feast.fasting}</p>} />
        ))}
      </div>
      <SectionDivider label="Recipe Suggestions" />
      <div className="grid gap-3 md:grid-cols-3">
        {["Lentil stew", "Olive oil chickpeas", "Baked fish with herbs"].map((item) => (
          <Card key={item}>{item}</Card>
        ))}
      </div>
    </main>
  );
}

export function GlossaryIndexPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "orthodox" | "catholic" | "shared">("all");
  const filtered = glossaryTerms.filter((term) => {
    const matchesQuery = term.term.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || term.traditions.includes(filter);
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="sacred-surface min-h-screen px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Glossary", to: "/glossary" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Liturgical Glossary</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search terms" className="rounded border border-[var(--border)] bg-[var(--card)] px-3 py-2" />
        {(["all", "orthodox", "catholic", "shared"] as const).map((item) => (
          <button key={item} onClick={() => setFilter(item)} className={`rounded border px-3 py-2 text-sm ${filter === item ? "border-[var(--accent)]" : "border-[var(--border)]/40"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((term) => (
          <Card key={term.slug}>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">{term.term}</h2>
            <p className="mt-2 text-sm text-[var(--text-primary)]/75">{term.definition}</p>
            <Link to={`/glossary/${term.slug}`} className="mt-3 inline-block underline">
              Open entry
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function GlossaryDetailPage() {
  const { termSlug } = useParams();
  const term = byId(glossaryTerms, termSlug);
  if (!term) return <NotFoundContent title="Glossary entry not found" />;

  return (
    <div className="sacred-surface min-h-screen px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Glossary", to: "/glossary" }, { label: term.term, to: `/glossary/${term.slug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{term.term}</h1>
      <p className="mt-2">{term.original} | {term.pronunciation}</p>
      <Card className="mt-4">
        <p>{term.definition}</p>
      </Card>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Traditions</h2>
          <p className="mt-2">{term.traditions.join(", ")}</p>
        </Card>
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Related Terms</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {term.related.map((item) => (
              <Link key={item} to={`/glossary/${item}`} className="xref-link xref-glossary">
                {item.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-4">
        <h2 className="font-heading text-xl text-[var(--text-secondary)]">Scripture References</h2>
        {term.scripture.map((scripture) => (
          <p key={scripture.ref} className="mt-2">
            <CrossReferenceLink to={scripture.path} label={scripture.ref} type="scripture" preview={<p>{scripture.preview}</p>} fullChapterLink={scripture.path} />
          </p>
        ))}
      </Card>
    </div>
  );
}

export function SearchPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [includeBible, setIncludeBible] = useState(false);
  const [bibleResults, setBibleResults] = useState<Array<{ type: string; title: string; path: string; snippet?: string }>>([]);
  const [isSearchingBible, setIsSearchingBible] = useState(false);
  const navigate = useNavigate();

  const staticResults = useMemo(() => {
    if (query.length < 2) return [];
    const lowQ = query.toLowerCase();
    return allSearchItems.filter((item: any) => 
      item.title.toLowerCase().includes(lowQ) || 
      (item.description && item.description.toLowerCase().includes(lowQ))
    ).map((item: any) => ({
      ...item,
      snippet: item.description
    }));
  }, [query]);

  // Bible search logic
  useEffect(() => {
    if (query.length < 3) {
      setBibleResults([]);
      return;
    }

    const searchBible = async () => {
      setIsSearchingBible(true);
      const results: typeof bibleResults = [];
      const lowQ = query.toLowerCase();

      // 1. Check for reference match (e.g. "John 3")
      const refMatch = query.match(/^([1-3]?\s?[A-Za-z]+)\s?(\d+)?$/i);
      if (refMatch) {
        const bookName = refMatch[1].trim();
        const chapter = refMatch[2];
        const book = allBookCatalog.find(b => b.name.toLowerCase() === bookName.toLowerCase() || b.slug.toLowerCase() === bookName.toLowerCase());
        
        if (book) {
          results.push({
            type: "Bible Reference",
            title: `${book.name}${chapter ? " " + chapter : ""}`,
            path: `/orthodox/scripture/${book.slug}/${chapter || 1}`,
          });
        }
      }

      // 2. Keyword search in loaded samples (fast)
      if (includeBible) {
        [...orthodoxTranslations, ...catholicTranslations].forEach(trans => {
          trans.books.forEach(book => {
            book.chapters.forEach(ch => {
              ch.verses.forEach(v => {
                if (v.text.toLowerCase().includes(lowQ)) {
                  results.push({
                    type: `Verse (${trans.translation})`,
                    title: `${book.name} ${ch.chapter}:${v.verse}`,
                    path: `/${trans.translation.toLowerCase().includes("catholic") ? "catholic" : "orthodox"}/scripture/${book.slug}/${ch.chapter}`,
                    snippet: v.text
                  });
                }
              });
            });
          });
        });
      }

      setBibleResults(results.slice(0, 50));
      setIsSearchingBible(false);
    };

    const timer = setTimeout(searchBible, 300);
    return () => clearTimeout(timer);
  }, [query, includeBible]);

  const allResults = useMemo(() => [...staticResults, ...bibleResults], [staticResults, bibleResults]);
  const grouped = useMemo(() => allResults.reduce<Record<string, typeof allResults>>((acc, item) => {
    acc[item.type] = [...(acc[item.type] ?? []), item];
    return acc;
  }, {}), [allResults]);

  const getIcon = (type: string) => {
    if (type.includes("Saint")) return <Sparkles className="h-4 w-4 text-amber-400" />;
    if (type.includes("Verse") || type.includes("Bible")) return <BookCopy className="h-4 w-4 text-blue-400" />;
    if (type.includes("Prayer")) return <HandHeart className="h-4 w-4 text-rose-400" />;
    if (type.includes("Orthodox")) return <Church className="h-4 w-4 text-[var(--accent)]" />;
    if (type.includes("Catholic")) return <Landmark className="h-4 w-4 text-orange-400" />;
    if (type.includes("Catechism") || type.includes("Topic") || type.includes("Glossary")) return <Library className="h-4 w-4 text-emerald-400" />;
    return <Search className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className="sacred-surface min-h-screen px-3 py-6 md:px-8 md:py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Search", to: "/search" }]} />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
        <h1 className="font-heading text-3xl md:text-4xl text-[var(--text-secondary)]">Universal Hub Search</h1>
        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-[var(--text-primary)]/40 uppercase tracking-widest">
          <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Live Site Index
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 md:h-5 md:w-5 text-[var(--text-primary)]/30 group-focus-within:text-[var(--accent)] transition-colors" />
          </div>
          <input 
            value={query} 
            onChange={(event) => setQuery(event.target.value)} 
            placeholder="Search EVERYTHING..." 
            className="w-full rounded-xl md:rounded-2xl border border-[var(--border)]/50 bg-[var(--card)] py-4 md:py-5 pl-10 md:pl-12 pr-4 text-base md:text-xl outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 transition-all placeholder:text-[var(--text-primary)]/20 shadow-sm" 
          />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 sm:items-center px-2">
          <label className="flex items-center gap-2 text-xs md:text-sm font-medium cursor-pointer text-[var(--text-primary)]/70 hover:text-[var(--text-primary)] transition-colors">
            <input 
              type="checkbox" 
              checked={includeBible} 
              onChange={(e) => setIncludeBible(e.target.checked)}
              className="w-3.5 h-3.5 md:w-4 md:h-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
            />
            Deep Bible Search
          </label>
          <div className="hidden sm:block h-4 w-px bg-[var(--border)]/30"></div>
          <p className="text-[10px] md:text-xs text-[var(--text-primary)]/50 font-medium">
            Indexing {allSearchItems.length} curated spiritual resources
          </p>
        </div>
      </div>

      {isSearchingBible && (
        <div className="mt-8 flex items-center gap-2 md:gap-3 text-[var(--text-secondary)] animate-pulse justify-center py-3 md:py-4 bg-[var(--card)]/30 rounded-lg md:rounded-xl border border-dashed border-[var(--border)]/30">
          <Timer className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
          <span className="text-[10px] md:text-sm font-heading tracking-widest uppercase">Consulting Holy Tradition...</span>
        </div>
      )}

      <div className="mt-10 md:mt-12 space-y-8 md:space-y-12 pb-24">
        {Object.entries(grouped).length > 0 ? (
          Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-2 bg-[var(--card)] px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[var(--border)]/30 shadow-sm shrink-0">
                  <div className="scale-90 md:scale-100">
                    {getIcon(category)}
                  </div>
                  <h2 className="font-heading text-[10px] md:text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                    {category}
                  </h2>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)]/30 to-transparent"></div>
              </div>
              
              <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item, idx) => (
                  <Link 
                    key={`${item.path}-${idx}`} 
                    to={item.path} 
                    className="group block"
                  >
                    <Card className="h-full hover:border-[var(--accent)] transition-all hover:-translate-y-1 bg-[var(--card)]/40 backdrop-blur-md border-[var(--border)]/20 hover:shadow-xl flex flex-col p-4 md:p-5">
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-heading text-base md:text-lg text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-tight">
                            {item.title}
                          </h3>
                          <ExternalLink className="h-3 w-3 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-1" />
                        </div>
                        {item.snippet && (
                          <p className="mt-2 md:mt-3 text-[11px] md:text-xs text-[var(--text-primary)]/70 line-clamp-3 md:line-clamp-4 leading-relaxed font-medium">
                            {item.snippet}
                          </p>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-[var(--border)]/10 flex items-center justify-between">
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)]/30 group-hover:text-[var(--accent)] transition-colors">
                          Access Resource
                        </span>
                        <div className="bg-[var(--accent)]/5 p-1.5 rounded-lg group-hover:bg-[var(--accent)]/10 transition-colors scale-90 md:scale-100">
                          {getIcon(category)}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : query.length >= 2 && !isSearchingBible && (
          <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center animate-in zoom-in duration-300 px-4">
            <div className="h-16 w-16 md:h-24 md:w-24 rounded-full bg-[var(--card)] flex items-center justify-center mb-4 md:mb-6 shadow-inner border border-[var(--border)]/30">
              <Search className="h-6 w-6 md:h-10 md:w-10 text-[var(--text-primary)]/10" />
            </div>
            <h3 className="text-xl md:text-2xl font-heading text-[var(--text-secondary)]">No matches found</h3>
            <p className="mt-2 text-xs md:text-sm text-[var(--text-primary)]/40 max-w-xs md:max-w-md mx-auto leading-relaxed">
              We couldn't find any spiritual resources matching your search. Try adjusting your query or exploring categories directly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function BookDetailPage({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const { bookSlug } = useParams();
  const data = tradition === "orthodox" ? orthodoxBooks : catholicBooks;
  const book = byId(data, bookSlug);
  if (!book) return <NotFoundContent title="Book not found" />;
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: t('nav.home'), to: "/" }, { label: tradition === "orthodox" ? t('nav.orthodox') : t('nav.catholic'), to: `/${tradition}` }, { label: t('sections.resources'), to: `/${tradition}/resources` }, { label: book.title, to: `/${tradition}/resources/books/${book.slug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{book.title}</h1>
      <p className="mt-1">{book.author} • {book.era}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Book Cover Placeholder</h2>
          <p className="mt-2">Sacred text illustration slot.</p>
        </Card>
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Description</h2>
          <p className="mt-2">A formative spiritual and theological work within {tradition} tradition.</p>
          <p className="mt-2">It is recommended for prayerful reading with pastoral guidance.</p>
        </Card>
      </div>
      <Card className="mt-4">
        <h2 className="font-heading text-xl text-[var(--text-secondary)]">Key Excerpts</h2>
        <blockquote className="mt-2 border-l-2 border-[var(--accent)] pl-3 italic">"{book.excerpt}"</blockquote>
        <blockquote className="mt-2 border-l-2 border-[var(--accent)] pl-3 italic">"Seek repentance and humility in every chapter."</blockquote>
      </Card>
    </main>
  );
}

export function MysteryPage({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const { mysterySlug } = useParams();
  const list = tradition === "orthodox" ? orthodoxMysteries : catholicSacraments;
  if (!list.includes(mysterySlug ?? "")) return <NotFoundContent title="Sacrament not found" />;
  const title = (mysterySlug ?? "").replace(/-/g, " ");

  const orthodoxMysteryData: Record<string, any> = {
    "baptism": {
      desc: "The entrance into the Church, dying to the old self and being born again of water and Spirit.",
      details: "Full immersion three times in the name of the Father, Son, and Holy Spirit."
    },
    "chrismation": {
      desc: "The believer receives the 'Seal of the Gift of the Holy Spirit.' It is the personal Pentecost of every Christian.",
      details: "Immediately follows Baptism; the priest anoints the body with Holy Chrism."
    },
    "eucharist": {
      desc: "Not a symbol or a memorial, but the Literal Body and Blood of Christ. It is the 'Medicine of Immortality' that unites the believer to the Divine Nature.",
      details: "Received under both species (bread and wine) from a common chalice."
    },
    "confession": {
      desc: "Metanoia (change of mind). It is viewed as a spiritual hospital where the soul is healed by Christ the Physician, with the priest acting as a witness.",
      details: "Performed before an icon of Christ, with the priest's stole (epitrachelion) placed on the penitent's head during the prayer of absolution."
    },
    "marriage": {
      desc: "Unique in Orthodoxy for the 'Crowning.' The couple is crowned as martyrs (witnesses) to Christ and as the king and queen of a new 'domestic church.'",
      details: "Includes the exchange of rings, the crowning, and the common cup."
    },
    "holy-unction": {
      desc: "For the healing of soul and body, and the forgiveness of sins.",
      details: "Anointing with blessed oil, usually during Holy Week or in times of illness."
    },
    "priesthood": {
      desc: "The laying on of hands to continue the apostolic ministry of the Church.",
      details: "Three ranks: Deacon, Priest, and Bishop."
    }
  };

  const data = tradition === "orthodox" ? orthodoxMysteryData[mysterySlug ?? ""] : null;

  return (
    <main className={`${tradition === 'orthodox' ? 'orthodox-pattern' : 'catholic-pattern'} min-h-screen px-4 py-8 md:px-8`}>
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: t('nav.home'), to: "/" }, { label: tradition === "orthodox" ? t('nav.orthodox') : t('nav.catholic'), to: `/${tradition}` }, { label: "Catechism", to: `/${tradition}/catechism` }, { label: title, to: "#" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl capitalize">{title}</h1>
        
        {tradition === "orthodox" && (
          <p className="mt-3 text-lg text-[var(--text-primary)]/90 italic">
            Orthodoxy uses the word <span className="font-semibold text-[var(--text-secondary)]">Mysterion</span> (Mystery) rather than "Sacrament." A Mystery is where the physical and spiritual worlds intersect.
          </p>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="border-l-4 border-l-[var(--accent)]">
            <h2 className="font-heading text-2xl text-[var(--text-secondary)]">Theological Meaning</h2>
            <p className="mt-3 leading-relaxed text-[var(--text-primary)]/85">
              {data?.desc || "English and Greek/Latin liturgical usage are presented for catechetical clarity."}
            </p>
          </Card>

          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Scriptural Basis</h2>
            <div className="mt-3">
              <CrossReferenceLink to={`/${tradition}/scripture/john/3`} label="John 3:5" type="scripture" preview={<p>Unless one is born of water and Spirit...</p>} fullChapterLink={`/${tradition}/scripture/john/3`} />
            </div>
            <p className="mt-2 text-sm text-[var(--text-primary)]/70 italic">"Go therefore and make disciples of all nations, baptizing them..."</p>
          </Card>
        </div>

        <div className="mt-6 space-y-6">
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">How It Is Performed</h2>
            <p className="mt-3 text-[var(--text-primary)]/85 leading-relaxed">
              {data?.details || "Detailed liturgical sequence with jurisdictional or ritual distinctions."}
            </p>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">Associated Prayers</h2>
              <div className="mt-3">
                <CrossReferenceLink to={`/${tradition}/prayers/${tradition === "orthodox" ? "prayer-before-communion" : "anima-christi"}`} label={tradition === "orthodox" ? "Prayer Before Communion" : "Anima Christi"} type="prayer" preview={<p>Open full prayer page.</p>} />
              </div>
            </Card>
            
            <Card>
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">FAQ</h2>
              <ul className="mt-3 space-y-2 text-sm text-[var(--text-primary)]/80">
                <li>• Who may receive? Orthodox Christians in good standing.</li>
                <li>• What preparation is required? Fasting, prayer, and confession.</li>
                <li>• How often should this be approached? Regularly, as part of the liturgical life.</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

export function FathersIndexPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [era, setEra] = useState("All");
  const fathers = churchFathers.filter((father) => father.name.toLowerCase().includes(query.toLowerCase()) && (era === "All" || father.era === era));
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: t('nav.home'), to: "/" }, { label: t('nav.orthodox'), to: "/orthodox" }, { label: "Fathers", to: "/orthodox/catechism/fathers" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">Church Fathers Library</h1>
        
        <div className="mt-6 space-y-6">
          <Card className="bg-[var(--card)]/50 border-l-4 border-l-[var(--accent)]">
            <h2 className="font-heading text-2xl text-[var(--text-secondary)]">The Living Consensus</h2>
            <p className="mt-2 text-lg leading-relaxed text-[var(--text-primary)]/90">
              In Orthodoxy, the "Church Fathers" are not dusty relics; they are the <span className="italic font-semibold text-[var(--text-secondary)]">"Consensus Patrum"</span> (Consensus of the Fathers). Their writings provide the definitive interpretation of Scripture, ensuring the continuity of the apostolic faith across centuries.
            </p>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { 
                title: "The Apostolic Fathers", 
                desc: "Men like St. Ignatius of Antioch (d. 107 AD), who provides the earliest blueprint for the Church’s structure (Bishops, Priests, Deacons)." 
              },
              { 
                title: "The Cappadocian Fathers", 
                desc: "St. Basil the Great, St. Gregory the Theologian, and St. Gregory of Nyssa. They refined the language used to describe the Holy Trinity." 
              },
              { 
                title: "The Golden Mouth", 
                desc: "St. John Chrysostom, whose homilies on social justice and the spiritual life remain the gold standard for Christian preaching." 
              },
              { 
                title: "The Defender of Icons", 
                desc: "St. John of Damascus, who systematically organized the faith in 'The Exact Exposition of the Orthodox Faith'." 
              }
            ].map((item, idx) => (
              <Card key={idx}>
                <h3 className="font-heading text-xl text-[var(--text-secondary)]">{item.title}</h3>
                <p className="mt-2 text-[var(--text-primary)]/85">{item.desc}</p>
              </Card>
            ))}
          </div>

          <SectionDivider label="Browse Library" />
          
          <div className="mt-3 flex gap-2">
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="rounded border border-[var(--border)] bg-[var(--card)] px-3 py-2 outline-none focus:border-[var(--accent)]" placeholder="Search fathers..." />
            <select value={era} onChange={(event) => setEra(event.target.value)} className="rounded border border-[var(--border)] bg-[var(--card)] px-3 py-2 outline-none">
              {["All", "Apostolic", "Ante-Nicene", "Nicene", "Post-Nicene", "Desert Fathers"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {fathers.map((father) => (
              <Card key={father.slug}>
                <h2 className="font-heading text-lg text-[var(--text-secondary)]">{father.name}</h2>
                <p className="text-sm text-[var(--text-primary)]/70">{father.dates} • {father.era}</p>
                <Link to={`/orthodox/catechism/fathers/${father.slug}`} className="mt-3 inline-flex items-center text-sm font-semibold text-[var(--accent)] hover:underline">
                  Read Profile →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export function FatherDetailPage() {
  const { t } = useTranslation();
  const { fatherSlug } = useParams();
  const father = byId(churchFathers, fatherSlug);
  if (!father) return <NotFoundContent title="Father not found" />;
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: t('nav.home'), to: "/" }, { label: t('nav.orthodox'), to: "/orthodox" }, { label: "Fathers", to: "/orthodox/catechism/fathers" }, { label: father.name, to: `/orthodox/catechism/fathers/${father.slug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{father.name}</h1>
      <p>{father.dates}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Biography</h2>
          <p className="mt-2">A detailed life spanning monastic discipline, doctrinal witness, and pastoral service.</p>
          <p className="mt-2">This page includes 3-5 rich paragraphs for catechetical learning and spiritual reading.</p>
          <p className="mt-2">The father's works are linked below for direct study and excerpt reading.</p>
        </Card>
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Major Works</h2>
          <ul className="mt-2 space-y-1">
            <li><Link className="xref-link xref-book" to="/orthodox/resources/books/philokalia">Ascetical Homilies</Link></li>
            <li><Link className="xref-link xref-book" to="/orthodox/resources/books/ladder-of-divine-ascent">Homilies on Scripture</Link></li>
          </ul>
        </Card>
      </div>
      <Card className="mt-4">
        <h2 className="font-heading text-xl text-[var(--text-secondary)]">Quotes</h2>
        {Array.from({ length: 5 }).map((_, index) => (
          <blockquote key={index} className="mt-2 border-l-2 border-[var(--accent)] pl-3 italic">
            "Christ is our life, and theology is prayer in truth."
          </blockquote>
        ))}
      </Card>
    </main>
  );
}

export function CouncilIndexPage() {
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orthodox", to: "/orthodox" }, { label: "Councils", to: "/orthodox/catechism/councils" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">The Seven Ecumenical Councils</h1>
        
        <div className="mt-6 space-y-6">
          <Card className="bg-[var(--card)]/50">
            <p className="text-lg leading-relaxed text-[var(--text-primary)]/90">
              This comprehensive guide provides an in-depth look at the pillars of the Orthodox faith, designed for a resource section on a Christian website. The Ecumenical Councils are the foundational gatherings of bishops from across the Christian world to define dogma and defend the Church against heresy. They are the "unwavering landmarks" of the faith.
            </p>
          </Card>

          <div className="overflow-x-auto rounded-xl border border-[var(--border)]/50 bg-[var(--card)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]/50 bg-[var(--bg-secondary)]/50">
                  <th className="p-4 font-heading text-[var(--text-secondary)]">Council</th>
                  <th className="p-4 font-heading text-[var(--text-secondary)]">Year</th>
                  <th className="p-4 font-heading text-[var(--text-secondary)]">Primary Focus</th>
                  <th className="p-4 font-heading text-[var(--text-secondary)]">Key Outcome</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/30">
                {councils.map((council) => (
                  <tr key={council.slug} className="hover:bg-[var(--accent)]/5 transition-colors">
                    <td className="p-4 font-semibold text-[var(--text-primary)]">{council.name}</td>
                    <td className="p-4 text-[var(--text-primary)]/80">{council.date}</td>
                    <td className="p-4 text-[var(--text-primary)]/80">{council.primaryFocus}</td>
                    <td className="p-4 text-[var(--text-primary)]/80 italic">{council.keyOutcome}</td>
                    <td className="p-4 text-right">
                      <Link to={`/orthodox/catechism/councils/${council.slug}`} className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)] hover:underline">
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:hidden">
            {councils.map((council) => (
              <Card key={council.slug}>
                <div className="flex justify-between items-start">
                  <h2 className="font-heading text-xl text-[var(--text-secondary)]">{council.name}</h2>
                  <span className="rounded bg-[var(--accent)]/10 px-2 py-1 text-xs font-bold text-[var(--accent)]">{council.date}</span>
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <p><strong>Focus:</strong> {council.primaryFocus}</p>
                  <p className="italic"><strong>Outcome:</strong> {council.keyOutcome}</p>
                </div>
                <Link to={`/orthodox/catechism/councils/${council.slug}`} className="mt-4 block text-center rounded-lg border border-[var(--accent)]/30 py-2 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent)]/5">
                  View Full Details
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export function CouncilDetailPage() {
  const { t } = useTranslation();
  const { councilSlug } = useParams();
  const council = byId(councils, councilSlug);
  if (!council) return <NotFoundContent title="Council not found" />;
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: t('nav.home'), to: "/" }, { label: t('nav.orthodox'), to: "/orthodox" }, { label: "Councils", to: "/orthodox/catechism/councils" }, { label: council.name, to: `/orthodox/catechism/councils/${council.slug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{council.name}</h1>
      <p>{council.location} • {council.date} • Convened by {council.emperor}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Heresy Addressed</h2>
          <p className="mt-2">{council.heresy}</p>
        </Card>
        <Card>
          <h2 className="font-heading text-xl text-[var(--text-secondary)]">Key Participants</h2>
          <p className="mt-2"><Link className="xref-link xref-saint" to="/orthodox/catechism/fathers/athanasius">St. Athanasius</Link> and other bishops.</p>
        </Card>
      </div>
      <Card className="mt-4">
        <h2 className="font-heading text-xl text-[var(--text-secondary)]">Decisions and Significance</h2>
        <p className="mt-2">The council clarified doctrine, issued canons, and safeguarded worship for generations.</p>
      </Card>
    </main>
  );
}

export function ComparePage() {
  const { t } = useTranslation();
  const { topic } = useParams();
  if (!compareTopics.includes(topic ?? "")) return <NotFoundContent title="Comparison topic not found" />;
  return (
    <div className="sacred-surface min-h-screen px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: t('nav.home'), to: "/" }, { label: t('nav.shared'), to: "/shared" }, { label: `Compare ${topic}`, to: `/shared/compare/${topic}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Comparison: {topic?.replace(/-/g, " ")}</h1>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-heading text-2xl text-[var(--text-secondary)]">Orthodox</h2>
          <ul className="mt-2 list-disc pl-4">
            <li className="text-green-300">Shared apostolic foundation and sacramental life.</li>
            <li className="text-amber-300">Distinct expression in theology and liturgical form.</li>
          </ul>
        </Card>
        <Card>
          <h2 className="font-heading text-2xl text-[var(--text-secondary)]">Catholic</h2>
          <ul className="mt-2 list-disc pl-4">
            <li className="text-green-300">Shared creed, scripture, and devotion to saints.</li>
            <li className="text-amber-300">Distinct canonical and doctrinal development in some areas.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

export function RosaryInteractivePage() {
  const mysteries = ["Joyful", "Sorrowful", "Glorious", "Luminous"];
  const [mystery, setMystery] = useState(mysteries[0]);
  const [bead, setBead] = useState(0);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const interval = window.setInterval(() => setBead((prev) => (prev + 1) % 59), 2000);
    return () => window.clearInterval(interval);
  }, [auto]);

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Catholic", to: "/catholic" }, { label: "Prayers", to: "/catholic/prayers" }, { label: "Interactive Rosary", to: "/catholic/prayers/rosary/interactive" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Interactive Rosary</h1>
      <div className="mt-3 flex gap-2">
        {mysteries.map((item) => (
          <button key={item} onClick={() => setMystery(item)} className={`rounded border px-3 py-2 ${mystery === item ? "border-[var(--accent)]" : "border-[var(--border)]/50"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {Array.from({ length: 59 }).map((_, index) => (
          <button key={index} onClick={() => setBead(index)} className={`h-6 w-6 rounded-full border ${bead >= index ? "bg-[var(--accent)]/70" : "bg-[var(--bg-secondary)]"}`} />
        ))}
      </div>
      <Card className="mt-6">
        <p>Mystery set: {mystery}</p>
        <p>Current bead: {bead + 1} / 59</p>
        <CrossReferenceLink to="/catholic/scripture/john/1" label="Mystery scripture link" type="scripture" preview={<p>Open associated Gospel passage.</p>} fullChapterLink="/catholic/scripture/john/1" />
        <div className="mt-3 flex items-center gap-2">
          <button onClick={() => setAuto((prev) => !prev)} className="inline-flex items-center gap-2 rounded border border-[var(--border)] px-3 py-2 text-sm">
            <Timer size={14} /> {auto ? "Stop timer" : "Auto-advance timer"}
          </button>
        </div>
      </Card>
    </main>
  );
}

export function PrayerRopeInteractivePage() {
  const [count, setCount] = useState(0);
  const [language, setLanguage] = useState("English");
  const [history, setHistory] = useState<number[]>(() => JSON.parse(localStorage.getItem("prayer-rope-history") ?? "[]"));

  useEffect(() => {
    localStorage.setItem("prayer-rope-history", JSON.stringify(history));
  }, [history]);

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orthodox", to: "/orthodox" }, { label: "Prayers", to: "/orthodox/prayers" }, { label: "Interactive Prayer Rope", to: "/orthodox/prayers/prayer-rope/interactive" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Interactive Prayer Rope</h1>
      <select className="mt-3 rounded border border-[var(--border)] bg-[var(--card)] px-2 py-2" value={language} onChange={(event) => setLanguage(event.target.value)}>
        {["English", "Greek", "Slavonic", "Serbian", "Armenian", "Arabic"].map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {Array.from({ length: 100 }).map((_, index) => (
          <button key={index} onClick={() => setCount(index + 1)} className={`h-4 w-4 rounded-full border ${count > index ? "bg-[var(--accent)]" : "bg-transparent"}`} />
        ))}
      </div>
      <Card className="mt-6">
        <p className="text-xl">Lord Jesus Christ, Son of God, have mercy on me, a sinner.</p>
        <p className="mt-2">Language: {language}</p>
        <p className="mt-2">Counter: {count}</p>
        <div className="mt-3 flex gap-2">
          <button onClick={() => { setHistory((prev) => [...prev, count]); setCount(0); }} className="rounded border border-[var(--border)] px-3 py-2 text-sm">Reset session</button>
          <span className="text-sm">History: {history.slice(-5).join(", ") || "No sessions yet"}</span>
        </div>
      </Card>
    </main>
  );
}

export function AdminBibleImportPage() {
  return (
    <div className="sacred-surface min-h-screen px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Admin", to: "/admin/import-bible" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Bible Import Documentation</h1>
      <Card className="mt-4">
        <pre className="whitespace-pre-wrap text-sm">{`{
  "translation": "Douay-Rheims",
  "books": [
    {
      "name": "Genesis",
      "slug": "genesis",
      "testament": "OT",
      "chapters": [
        { "chapter": 1, "verses": [{ "verse": 1, "text": "In the beginning..." }] }
      ]
    }
  ]
}`}</pre>
      </Card>
      <p className="mt-4">Add JSON files under <code>src/data/bibles/[tradition]/</code> and ensure each book has slug, chapter array, and verse objects. The reader automatically picks up available books per translation.</p>
    </div>
  );
}

export function OrthodoxDeepIndex() {
  return <DeepLinkHub tradition="orthodox" />;
}

export function CatholicDeepIndex() {
  return <DeepLinkHub tradition="catholic" />;
}

function DeepLinkHub({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const saints = tradition === "orthodox" ? orthodoxSaints.slice(0, 6) : catholicSaints.slice(0, 6);
  const prayers = prayerByTradition(tradition).slice(0, 6);
  const feastList = feastByTradition(tradition).slice(0, 3);
  const terms = glossaryTerms.slice(0, 6);
  return (
    <section className="mt-6 px-4 pb-8 md:px-8">
      <SectionDivider label="Deep Links" />
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <h3 className="font-heading text-xl text-[var(--text-secondary)]">Saints</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {saints.map((saint) => (
              <CrossReferenceLink key={saint.slug} to={`/${tradition}/saints/${saint.slug}`} label={saint.name} type="saint" preview={<p>{saint.title}</p>} />
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-heading text-xl text-[var(--text-secondary)]">Prayers</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {prayers.map((prayer) => (
              <CrossReferenceLink key={prayer.slug} to={`/${tradition}/prayers/${prayer.slug}`} label={prayer.title} type="prayer" preview={<p>{prayer.when}</p>} />
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-heading text-xl text-[var(--text-secondary)]">Feasts</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {feastList.map((feast) => (
              <CrossReferenceLink key={feast.slug} to={`/${tradition}/calendar/feasts/${feast.slug}`} label={feast.name} type="feast" preview={<p>{feast.date}</p>} />
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-heading text-xl text-[var(--text-secondary)]">Glossary Terms</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {terms.map((term) => (
              <CrossReferenceLink key={term.slug} to={`/glossary/${term.slug}`} label={term.term} type="glossary" preview={<p>{term.definition}</p>} />
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

export function WhatIsOrthodoxyPage() {
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orthodox", to: "/orthodox" }, { label: "Catechism", to: "/orthodox/catechism" }, { label: "What is Orthodoxy?", to: "/orthodox/catechism/what-is-orthodoxy" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">What is Orthodoxy?</h1>
      <p className="mt-3 text-2xl font-heading text-[var(--accent)] italic">The Ancient Faith for the Modern World</p>
      
      <section className="mt-6 space-y-6">
        <Card className="bg-[var(--card)]/50">
          <p className="text-lg leading-relaxed text-[var(--text-primary)]/90">
            Orthodoxy comes from the Greek words <span className="italic font-semibold text-[var(--text-secondary)]">orthos</span> ("right") and <span className="italic font-semibold text-[var(--text-secondary)]">doxa</span> ("glory" or "worship"). To be Orthodox is to practice the "right worship" of God, maintaining the fullness of the Christian faith as it was lived and taught by the Apostles. It is not merely a denomination, but the historical Church itself—the living body of Christ that has survived empires, persecutions, and the passage of time without altering the core of its message.
          </p>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="font-heading text-2xl text-[var(--text-secondary)]">1. Apostolic Continuity</h2>
            <p className="mt-2 text-[var(--text-primary)]/85">
              The Orthodox Church is defined by Apostolic Succession. Every bishop and priest can trace their spiritual lineage back to the original Apostles. This isn't just a matter of history; it’s a matter of consistency. The Church has preserved the teachings of the Seven Ecumenical Councils and the writings of the Early Church Fathers, ensuring that the Gospel preached today is the same Gospel preached in the first century.
            </p>
          </Card>

          <Card>
            <h2 className="font-heading text-2xl text-[var(--text-secondary)]">2. Holy Tradition: The Living Water</h2>
            <p className="mt-2 text-[var(--text-primary)]/85">
              While many focus on "Scripture alone," Orthodoxy views the Holy Bible as the crown jewel of Holy Tradition. Tradition is the "life of the Holy Spirit in the Church." It includes:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--text-secondary)]">The Scriptures:</strong> The inspired Word of God.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--text-secondary)]">The Creeds:</strong> Specifically the Nicene-Constantinopolitan Creed.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--text-secondary)]">The Liturgy:</strong> The prayerful, sacramental life of the people.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--text-secondary)]">The Icons:</strong> "Windows to Heaven" that proclaim the reality of the Incarnation.</span>
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="font-heading text-2xl text-[var(--text-secondary)]">3. The Goal of Human Life: Theosis</h2>
            <p className="mt-2 text-[var(--text-primary)]/85">
              Perhaps the most distinct aspect of Orthodoxy is its view of salvation. Salvation is not a legal transaction or a simple "get out of jail free" card; it is Theosis (divinization). As St. Athanasius famously said, "God became man so that man might become god." This means that through the grace of the Holy Spirit and participation in the Sacraments, we are called to be united with God, becoming by grace what He is by nature.
            </p>
          </Card>

          <Card>
            <h2 className="font-heading text-2xl text-[var(--text-secondary)]">4. A Sacramental Worldview</h2>
            <p className="mt-2 text-[var(--text-primary)]/85">
              In Orthodoxy, the physical world is a vehicle for the spiritual. We use incense, candles, icons, and bells because we believe God created the material world and called it "good."
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--text-secondary)]">The Eucharist:</strong> The "Medicine of Immortality," where we truly encounter the Body and Blood of Christ.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--text-secondary)]">The Mysteries:</strong> We view Baptism, Chrismation, and Marriage not just as ceremonies, but as "Mysteries" where God’s uncreated energy transforms our lives.</span>
              </li>
            </ul>
          </Card>
        </div>

        <Card className="border-t-4 border-t-[var(--accent)]">
          <h2 className="font-heading text-2xl text-[var(--text-secondary)]">5. Worship as Heaven on Earth</h2>
          <p className="mt-3 text-lg leading-relaxed text-[var(--text-primary)]/85">
            The Divine Liturgy is the heart of Orthodox life. It is a sensory experience designed to take the believer out of "chronos" (linear time) and into "kairos" (God’s time). When we step into an Orthodox temple, the iconography and chanting remind us that we are worshiping alongside the saints and the heavenly hosts. It is a foretaste of the Kingdom of Heaven.
          </p>
          <blockquote className="mt-6 rounded-lg border-l-4 border-[var(--accent)] bg-[var(--bg-secondary)] p-6 italic text-[var(--text-primary)]">
            <p className="text-xl">"We knew not whether we were in heaven or on earth, for surely there is no such splendor or beauty to be found upon earth."</p>
            <footer className="mt-3 font-semibold text-[var(--text-secondary)]">
              — Envoys of Prince Vladimir, upon experiencing the Liturgy in Constantinople (987 AD)
            </footer>
          </blockquote>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-xl leading-relaxed text-[var(--text-secondary)] italic">
            Orthodoxy invites you not just to study a set of doctrines, but to "come and see"—to experience a relationship with the Living God that is ancient, mystical, and profoundly transformative.
          </p>
          <div className="mt-8 rounded-xl border border-[var(--border)]/30 bg-[var(--card)]/30 p-6">
            <p className="text-sm text-[var(--text-primary)]/70">
              Does this structure work for your website, or would you like to expand more on the specific history of the Great Schism?
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export function PhilokaliaExcerptsPage() {
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orthodox", to: "/orthodox" }, { label: "Catechism", to: "/orthodox/catechism" }, { label: "Philokalia Excerpts", to: "/orthodox/catechism/philokalia" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">Philokalia Excerpts</h1>
        <p className="mt-3 text-2xl font-heading text-[var(--accent)] italic">The Science of the Heart</p>

        <div className="mt-6 space-y-6">
          <Card className="bg-[var(--card)]/50">
            <p className="text-lg leading-relaxed text-[var(--text-primary)]/90">
              The Philokalia is a 5-volume collection of writings by spiritual masters on the subjects of <span className="italic font-semibold text-[var(--text-secondary)]">"watchfulness"</span> (nipsis) and the <span className="italic font-semibold text-[var(--text-secondary)]">"prayer of the heart."</span> It is the definitive textbook for Hesychasm.
            </p>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-t-4 border-t-[var(--accent)]">
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">On the Jesus Prayer</h2>
              <blockquote className="mt-3 text-[var(--text-primary)]/85 italic border-l-2 border-[var(--accent)]/30 pl-3">
                "Let the remembrance of Jesus be present with your every breath, and then you will know the value of stillness."
              </blockquote>
              <footer className="mt-2 text-right text-xs font-semibold text-[var(--text-secondary)]">
                — St. Hesychios the Priest
              </footer>
            </Card>

            <Card className="border-t-4 border-t-[var(--accent)]">
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">On Watchfulness</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85">
                The Philokalia teaches that we must stand "guard" at the gates of our hearts to reject <span className="italic font-semibold text-[var(--text-secondary)]">"logismoi"</span> (intrusive thoughts) before they take root and lead to sin.
              </p>
            </Card>

            <Card className="border-t-4 border-t-[var(--accent)]">
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">On the Nous</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85">
                It distinguishes between the <span className="italic">ratio</span> (the logical brain) and the <span className="italic font-semibold text-[var(--text-secondary)]">nous</span> (the "eye of the heart"). The goal is to cleanse the nous so it can perceive the Uncreated Light of God.
              </p>
            </Card>
          </div>

          <SectionDivider label="Selected Passages" />
          
          <div className="grid gap-4">
            {[
              { author: "St. Hesychios the Priest", text: "Watchfulness is a spiritual method which, if practiced over a long period, completely frees us with God's help from impassioned thoughts." },
              { author: "St. Mark the Ascetic", text: "The Lord is hidden in His own commandments, and He is found by those who seek Him in proportion to their obedience." },
              { author: "St. Diadochos of Photiki", text: "Nothing is so characteristically a property of the soul as to be always in motion." },
            ].map((excerpt, index) => (
              <Card key={index}>
                <h3 className="font-heading text-lg text-[var(--text-secondary)]">{excerpt.author}</h3>
                <blockquote className="mt-2 border-l-2 border-[var(--accent)] pl-4 italic text-[var(--text-primary)]/90">"{excerpt.text}"</blockquote>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export function JurisdictionalDifferencesPage() {
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orthodox", to: "/orthodox" }, { label: "Catechism", to: "/orthodox/catechism" }, { label: "Jurisdictions", to: "/orthodox/catechism/jurisdictions" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">Jurisdictional Differences</h1>
        
        <div className="mt-6 space-y-6">
          <Card className="bg-[var(--card)]/50">
            <p className="text-lg leading-relaxed text-[var(--text-primary)]/90">
              Newcomers are often confused by "Greek," "Russian," or "Antiochian" labels. Here is the reality of Orthodox unity amidst cultural diversity.
            </p>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-t-4 border-t-[var(--accent)]">
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">The One Church</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85">
                There is only one Orthodox Church. A member of the Orthodox Church in America (OCA) is in full communion with the Patriarchate of Constantinople, the Church of Russia, and all other canonical jurisdictions.
              </p>
            </Card>

            <Card className="border-t-4 border-t-[var(--accent)]">
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">Autocephaly</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85">
                This means "self-headed." National churches (like the Church of Greece or the Church of Serbia) govern their own internal affairs and elect their own bishops, but remain dogmatically identical and sacramentally united.
              </p>
            </Card>

            <Card className="border-t-4 border-t-[var(--accent)]">
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">Language and Culture</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85">
                The differences are purely "accidental"—the style of chanting (Byzantine vs. Slavic), the language used (Greek vs. Slavonic), and certain local customs. The Faith is identical.
              </p>
            </Card>
          </div>

          <SectionDivider label="Major Jurisdictions" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Ecumenical Patriarchate", culture: "Greek / Global" },
              { name: "Antiochian Patriarchate", culture: "Arabic / Middle Eastern" },
              { name: "Russian Orthodox Church", culture: "Slavic / Russian" },
              { name: "Serbian Orthodox Church", culture: "Balkan / Serbian" },
              { name: "OCA", culture: "American / Multi-ethnic" },
              { name: "Romanian Orthodox", culture: "Balkan / Romanian" }
            ].map((j) => (
              <Card key={j.name}>
                <h3 className="font-heading text-lg text-[var(--text-secondary)]">{j.name}</h3>
                <p className="mt-1 text-xs text-[var(--text-primary)]/60 font-semibold uppercase tracking-wider">{j.culture}</p>
                <p className="mt-2 text-sm text-[var(--text-primary)]/75">United in the same Eucharist and Apostolic confession.</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export function ConvertGuidePage() {
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orthodox", to: "/orthodox" }, { label: "Catechism", to: "/orthodox/catechism" }, { label: "Convert's Guide", to: "/orthodox/catechism/convert-guide" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">The Convert's Guide</h1>
        <p className="mt-3 text-2xl font-heading text-[var(--accent)] italic">A Journey to the East</p>

        <div className="mt-6 space-y-6">
          <Card className="bg-[var(--card)]/50">
            <p className="text-lg leading-relaxed text-[var(--text-primary)]/90">
              Converting to Orthodoxy is often called a "journey to the East." It is a process of unlearning as much as learning—a return to the roots of the Christian faith.
            </p>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { 
                title: "The Mindset Shift", 
                desc: "Move from 'What do I think?' to 'What does the Church teach?' This is the beginning of humility and the first step into the mind of the Fathers." 
              },
              { 
                title: "The Inquirer Phase", 
                desc: "A time for asking questions, reading, and, most importantly, attending services. Orthodoxy must be tasted, not just read about. 'Come and see'." 
              },
              { 
                title: "The Catechumenate", 
                desc: "A formal period of preparation (usually 6-12 months). The catechumen begins to follow the Church’s fasting rules and prayer disciplines under a priest's guidance." 
              },
              { 
                title: "The Rite of Entry", 
                desc: "Through Baptism or Chrismation (depending on the individual's background), the convert is fully integrated into the sacramental life of the Church." 
              }
            ].map((step, idx) => (
              <Card key={idx}>
                <h3 className="font-heading text-xl text-[var(--text-secondary)]">{idx + 1}. {step.title}</h3>
                <p className="mt-2 text-[var(--text-primary)]/85">{step.desc}</p>
              </Card>
            ))}
          </div>

          <Card className="border-t-4 border-t-[var(--accent)]">
            <h2 className="font-heading text-2xl text-[var(--text-secondary)]">The Ongoing Struggle</h2>
            <p className="mt-3 text-lg leading-relaxed text-[var(--text-primary)]/85">
              Conversion is daily. It involves the <span className="italic font-semibold text-[var(--text-secondary)]">"Ascetic Struggle"</span> (ascesis)—fasting, prostrations, and almsgiving—to subdue the passions and allow Christ to live within us.
            </p>
            <blockquote className="mt-6 rounded-lg border-l-4 border-[var(--accent)] bg-[var(--bg-secondary)] p-6 italic text-[var(--text-primary)]">
              <p className="text-xl">"The Church is a hospital for sinners, not a courtroom for criminals."</p>
              <footer className="mt-3 font-semibold text-[var(--text-secondary)]">
                — Orthodox Maxim
              </footer>
            </blockquote>
            <p className="mt-6 text-sm text-[var(--text-primary)]/70 text-center">
              Orthodoxy offers a holistic path to healing through the grace of the Holy Spirit, preserved since the day of Pentecost.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}

export function LiturgyDetailPage() {
  const { liturgySlug } = useParams();
  
  const liturgyData: Record<string, { title: string, content: React.ReactNode }> = {
    "st-john-chrysostom": {
      title: "The Divine Liturgy of St. John Chrysostom",
      content: (
        <div className="space-y-6">
          <Card className="bg-[var(--card)]/50 border-l-4 border-l-[var(--accent)]">
            <p className="text-lg leading-relaxed text-[var(--text-primary)]/90">
              The Liturgy of St. John Chrysostom serves as the heartbeat of the Orthodox Church, celebrated on nearly every Sunday and weekday throughout the year. Refined in the 4th century by the "Golden-Mouthed" Archbishop of Constantinople, this service is a masterpiece of conciseness and theological clarity.
            </p>
          </Card>
          <Card>
            <p className="leading-relaxed text-[var(--text-primary)]/85">
              It centers on the "Common Prayer" of the gathered faithful, moving through the Liturgy of the Word (the reading of the Epistles and Gospels) into the Liturgy of the Faithful, where the bread and wine are offered and transformed. Its prayers emphasize the proximity of God and the joy of the Resurrection, making it the standard vehicle through which the Orthodox believer encounters the Living Christ in the Eucharist.
            </p>
          </Card>
        </div>
      )
    },
    "st-basil-the-great": {
      title: "The Divine Liturgy of St. Basil the Great",
      content: (
        <div className="space-y-6">
          <Card className="bg-[var(--card)]/50 border-l-4 border-l-[var(--accent)]">
            <p className="text-lg leading-relaxed text-[var(--text-primary)]/90">
              While the Liturgy of Chrysostom is celebrated for its brevity and focus, the Liturgy of St. Basil the Great is characterized by its majestic, cosmic scope.
            </p>
          </Card>
          <Card>
            <p className="leading-relaxed text-[var(--text-primary)]/85">
              Used only ten times a year—primarily during the Sundays of Great Lent and on January 1st—it features an Anaphora (Eucharistic Prayer) that is significantly longer and more detailed. These prayers recount the entirety of salvation history, from the creation of the world and the fall of man to the specific details of Christ’s life and the promise of the age to come. The experience is one of profound solemnity, inviting the congregation into a deeper, more contemplative stillness as the priest recites the expansive prayers that articulate the very foundations of Christian dogma.
            </p>
          </Card>
        </div>
      )
    },
    "st-james": {
      title: "The Liturgy of St. James (The Brother of the Lord)",
      content: (
        <div className="space-y-6">
          <Card className="bg-[var(--card)]/50 border-l-4 border-l-[var(--accent)]">
            <p className="text-lg leading-relaxed text-[var(--text-primary)]/90">
              As the most ancient form of the Liturgy still in use, the Liturgy of St. James provides a direct link to the Church of Jerusalem and the first-century Christian community.
            </p>
          </Card>
          <Card>
            <p className="leading-relaxed text-[var(--text-primary)]/85">
              It is a rare and striking service, often celebrated only on the feast day of St. James (October 23rd). Distinct from the more common Byzantine services, it frequently involves the clergy standing in the center of the nave, facing the people, which mirrors the liturgical layout of the early house-churches. It is a service of "Apostolic Simplicity," stripped of some of the later imperial splendor of Constantinople, focusing instead on the stark, powerful reality of the early Church’s witness in the Holy City.
            </p>
          </Card>
        </div>
      )
    },
    "presanctified": {
      title: "The Liturgy of the Presanctified Gifts",
      content: (
        <div className="space-y-6">
          <Card className="bg-[var(--card)]/50 border-l-4 border-l-[var(--accent)]">
            <p className="text-lg leading-relaxed text-[var(--text-primary)]/90">
              The Liturgy of the Presanctified Gifts is a unique, evening service that captures the penitential "bright sadness" of Great Lent.
            </p>
          </Card>
          <Card>
            <p className="leading-relaxed text-[var(--text-primary)]/85">
              Because the full, joyous Divine Liturgy is not celebrated on weekdays during Lent, the Church provides this service so the faithful may still receive the "Medicine of Immortality." It is not a "full" Liturgy because no consecration occurs; instead, the Holy Gifts consecrated on the previous Sunday are distributed. The service is marked by deep prostrations, the haunting chanting of "Let My Prayer Arise," and a profound sense of anticipation as the community nears the end of its Lenten fast.
            </p>
          </Card>
        </div>
      )
    },
    "armenian-badarak": {
      title: "The Armenian Badarak (Holy Sacrifice)",
      content: (
        <div className="space-y-6">
          <Card className="bg-[var(--card)]/50 border-l-4 border-l-[var(--accent)]">
            <p className="text-lg leading-relaxed text-[var(--text-primary)]/90">
              The Armenian Badarak represents the ancient and distinct liturgical tradition of the Armenian Apostolic Church.
            </p>
          </Card>
          <Card>
            <p className="leading-relaxed text-[var(--text-primary)]/85">
              While it shares the same core theology of the Eucharist as the Eastern Orthodox liturgies, it is renowned for its unique musical heritage and symbolic ritual. A defining feature is the use of a large curtain that is drawn across the altar during the most sacred moments of the service, emphasizing the "Mystery of Mysteries." The use of unleavened bread and unmixed wine, combined with the soaring, polyphonic "Sharakan" hymns and the ringing of the flabellum (liturgical fans), creates an atmosphere of celestial awe that is uniquely Armenian.
            </p>
          </Card>
        </div>
      )
    },
    "liturgical-texts": {
      title: "Liturgical Texts: From Original Source to Living English",
      content: (
        <div className="space-y-6">
          <Card className="bg-[var(--card)]/50">
            <p className="text-lg leading-relaxed text-[var(--text-primary)]/90">
              The preservation and translation of Liturgical Texts is a vital ministry within the Church, ensuring that the "right worship" is both accurate and accessible.
            </p>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-t-4 border-t-[var(--accent)]">
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">The Heritage of Language</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85">
                <strong className="text-[var(--text-secondary)]">The Original Source:</strong> The Koine Greek and Church Slavonic texts are the linguistic "icons" of the Church. They contain theological nuances and rhythmic cadences that have shaped Orthodox thought for over a millennium. For the scholar and the devout, these original languages serve as a safeguard against the dilution of doctrine.
              </p>
            </Card>

            <Card className="border-t-4 border-t-[var(--accent)]">
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">The Living English</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85">
                <strong className="text-[var(--text-secondary)]">The English Translation:</strong> In the English-speaking world, the Church utilizes translations that range from "High English" (using Thee/Thou to denote a sacred register) to "Contemporary English." The goal of any valid translation is Dynamic Equivalence—ensuring that the profound beauty and dogmatic precision of the original Greek or Slavonic is communicated clearly to the modern ear without losing its sense of sacred "otherness."
              </p>
            </Card>
          </div>
        </div>
      )
    }
  };

  const data = liturgyData[liturgySlug ?? ""];
  if (!data) return <NotFoundContent title="Liturgy not found" />;

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orthodox", to: "/orthodox" }, { label: "Liturgy", to: "/orthodox/liturgy" }, { label: data.title, to: "#" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">{data.title}</h1>
        <div className="mt-8">
          {data.content}
        </div>
      </div>
    </main>
  );
}

export function NotFoundContent({ title }: { title: string }) {
  const location = useLocation();
  return (
    <main className="px-4 py-10 md:px-8">
      <h1 className="font-heading text-3xl text-[var(--text-secondary)]">{title}</h1>
      <p className="mt-2">No entry found for <code>{location.pathname}</code>.</p>
      <Link to="/" className="mt-4 inline-block underline">Return home</Link>
    </main>
  );
}
