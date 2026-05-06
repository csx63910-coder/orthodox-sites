import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import ChantTabs from "../../../../components/ChantTabs";
import SectionDivider from "../../../../components/SectionDivider";

const chantVideos: string[] = [
  "https://www.youtube.com/watch?v=nd210SzEQdY",
  "https://www.youtube.com/watch?v=E5xho-SnygU",
  "https://www.youtube.com/watch?v=eTokzgBvHQc",
  "https://www.youtube.com/watch?v=qEB-MCLsIvg",
  "https://www.youtube.com/watch?v=Qrg3NishuJ8",
  "https://www.youtube.com/watch?v=xye_dSIaY7A",
  "https://www.youtube.com/watch?v=sFQt3dwa6Pk",
  "https://www.youtube.com/watch?v=nz2y63MwdFk",
  "https://www.youtube.com/watch?v=nTbG9oR0HWM",
  "https://www.youtube.com/watch?v=2kvmf2YySA4",
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

export default function ArmenianSharakanPage() {
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Orthodox", to: "/orthodox" },
            { label: "Hymns & Chant", to: "/orthodox/chant" },
            { label: "Armenian Sharakan", to: "/orthodox/chant/armenian" },
          ]}
        />

        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">Armenian Sharakan</h1>
        <p className="mt-3 max-w-4xl text-lg text-[var(--text-primary)]/88">
          Ancient hymns of the Armenian Apostolic Church, including the works of Mesrop Mashtots and Komitas.
        </p>
        <ChantTabs />

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a
            href="https://www.youtube.com/@ArmenianChurchMusic"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[var(--border)] px-3 py-2 text-[var(--text-secondary)]"
          >
            Armenian Church Music Channel
          </a>
        </div>

        <SectionDivider label="Armenian Sharakan Video Library" />

        <div className="grid gap-4 lg:grid-cols-2">
          {chantVideos.map((url, index) => (
            <Card key={url + index}>
              <p className="mb-3 text-sm text-[var(--text-primary)]/75">Sharakan Video {index + 1}</p>
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-[var(--border)]/45">
                <iframe
                  className="h-full w-full"
                  src={toEmbedUrl(url)}
                  title={`Armenian Sharakan ${index + 1}`}
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
