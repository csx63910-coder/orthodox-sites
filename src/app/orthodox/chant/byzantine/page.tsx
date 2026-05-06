import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import ChantTabs from "../../../../components/ChantTabs";
import SectionDivider from "../../../../components/SectionDivider";

const chantVideos = [
  "https://www.youtube.com/watch?v=54zOuPNlEMw",
  "https://www.youtube.com/watch?v=r7htEnDawDY",
  "https://www.youtube.com/watch?v=cpNZOTdUl2A",
  "https://www.youtube.com/watch?v=WsSb-_QBhpE",
  "https://www.youtube.com/watch?v=vFuMg-L_hlo",
  "https://www.youtube.com/watch?v=G5cLXfYANBs",
  "https://www.youtube.com/watch?v=nEaEaFjE-ho",
  "https://www.youtube.com/watch?v=e3XJYQMZVyA",
  "https://www.youtube.com/watch?v=ak_0dogSPRc",
  "https://www.youtube.com/watch?v=oVjvVI213oI",
  "https://www.youtube.com/watch?v=RXK9tjIRgaE",
  "https://www.youtube.com/watch?v=7-jn1uQJJ3k",
];

const toEmbedUrl = (url: string) => {
  const id = new URL(url).searchParams.get("v");
  return id ? `https://www.youtube.com/embed/${id}` : url;
};

export default function ByzantineChantPage() {
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Orthodox", to: "/orthodox" },
            { label: "Hymns & Chant", to: "/orthodox/chant" },
            { label: "Byzantine Chant", to: "/orthodox/chant/byzantine" },
          ]}
        />

        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">Byzantine Chant</h1>
        <p className="mt-3 max-w-4xl text-lg text-[var(--text-primary)]/88">
          Curated chant library using your selected recordings and source channels.
        </p>
        <ChantTabs />

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a
            href="https://www.youtube.com/@MountAthosChants"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[var(--border)] px-3 py-2 text-[var(--text-secondary)]"
          >
            Mount Athos Chants Channel
          </a>
          <a
            href="https://www.youtube.com/channel/UCY-nFy6XLViHGHQKn1XRQiw"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[var(--border)] px-3 py-2 text-[var(--text-secondary)]"
          >
            Additional Chant Channel
          </a>
        </div>

        <SectionDivider label="Byzantine Video Library" />

        <div className="grid gap-4 lg:grid-cols-2">
          {chantVideos.map((url, index) => (
            <Card key={url}>
              <p className="mb-3 text-sm text-[var(--text-primary)]/75">Chant Video {index + 1}</p>
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-[var(--border)]/45">
                <iframe
                  className="h-full w-full"
                  src={toEmbedUrl(url)}
                  title={`Byzantine Chant ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <a href={url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm underline underline-offset-4">
                Open on YouTube
              </a>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
