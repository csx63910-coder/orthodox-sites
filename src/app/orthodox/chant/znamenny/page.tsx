import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import ChantTabs from "../../../../components/ChantTabs";
import SectionDivider from "../../../../components/SectionDivider";

const chantVideos: string[] = [
  "https://www.youtube.com/watch?v=qMtyTXDc9Fw",
  "https://www.youtube.com/watch?v=32_SKaSSBKQ",
  "https://www.youtube.com/watch?v=oNwhuESb1u4",
  "https://www.youtube.com/watch?v=Rwr3nSTirWs",
  "https://www.youtube.com/watch?v=sa1ax3gEITs",
  "https://www.youtube.com/watch?v=HSIBM4KMGXk",
  "https://www.youtube.com/watch?v=CuDDO969Frs",
  "https://www.youtube.com/watch?v=jhP0geZ6UVQ",
  "https://www.youtube.com/watch?v=muQqIKNK-NY",
  "https://www.youtube.com/watch?v=p5lRtx81Tz8",
  "https://www.youtube.com/watch?v=PE2yacM6hfU",
  "https://www.youtube.com/watch?v=vuhrXrnyf8s",
  "https://www.youtube.com/watch?v=MF6inc1mJg4",
  "https://www.youtube.com/watch?v=N9ki6z45TP0",
  "https://www.youtube.com/watch?v=-5L1Z-K0O_k",
  "https://www.youtube.com/watch?v=bqflEGAi1JA",
  "https://www.youtube.com/watch?v=pD0nXZTc8Fk",
  "https://www.youtube.com/watch?v=HzSUPiX35vI",
  "https://www.youtube.com/watch?v=t2SrpQJ4TNo",
  "https://www.youtube.com/watch?v=9sWWibto5M4",
  "https://www.youtube.com/watch?v=xinIAmaU9qY",
  "https://www.youtube.com/watch?v=zDViMskKooI",
  "https://www.youtube.com/watch?v=FisVZd-gAbM",
  "https://www.youtube.com/watch?v=LyTyfPgEhjU",
  "https://www.youtube.com/watch?v=uCBTG-oxIBE",
  "https://www.youtube.com/watch?v=aA_7X9DASwc",
  "https://www.youtube.com/watch?v=ZjP1ssoSeEU",
];

const toEmbedUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com")) {
      const id = urlObj.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (urlObj.hostname.includes("youtu.be")) {
      const id = urlObj.pathname.substring(1);
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  } catch (e) {
    return url;
  }
};

export default function ZnamennyChantPage() {
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Orthodox", to: "/orthodox" },
            { label: "Hymns & Chant", to: "/orthodox/chant" },
            { label: "Znamenny Chant", to: "/orthodox/chant/znamenny" },
          ]}
        />

        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">Russian Znamenny Chant (Monophonic Tradition)</h1>
        <p className="mt-3 max-w-4xl text-lg text-[var(--text-primary)]/88">
          These recordings focus on the ancient "hook" notation style preserved by monasteries and Old Believer communities.
        </p>
        <ChantTabs />

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a
            href="https://www.youtube.com/@ValaamMonastery"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[var(--border)] px-3 py-2 text-[var(--text-secondary)]"
          >
            Valaam Monastery Channel
          </a>
          <a
            href="https://www.youtube.com/@ZnamennyChant"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[var(--border)] px-3 py-2 text-[var(--text-secondary)]"
          >
            Znamenny Chant Collection
          </a>
        </div>

        <SectionDivider label="Russian Znamenny Video Library" />

        {chantVideos.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {chantVideos.map((url, index) => (
              <Card key={url}>
                <p className="mb-3 text-sm text-[var(--text-primary)]/75">Znamenny Chant Video {index + 1}</p>
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-[var(--border)]/45">
                  <iframe
                    className="h-full w-full"
                    src={toEmbedUrl(url)}
                    title={`Znamenny Chant ${index + 1}`}
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
        ) : (
          <div className="py-12 text-center">
            <p className="text-[var(--text-primary)]/60">No videos added yet. Please provide the YouTube links.</p>
          </div>
        )}
      </div>
    </main>
  );
}
