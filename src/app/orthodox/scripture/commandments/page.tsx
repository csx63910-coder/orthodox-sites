import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import CrossReferenceLink from "../../../../components/CrossReference";
import SectionDivider from "../../../../components/SectionDivider";

const commandments = [
  {
    title: "Love God with all your heart",
    description: "The first and greatest commandment calls us to total devotion of mind, soul, and strength.",
    reference: "Matthew 22:37",
    path: "/orthodox/scripture/matthew/22",
  },
  {
    title: "Love your neighbor as yourself",
    description: "The second commandment inseparably joins worship of God with concrete love of others.",
    reference: "Matthew 22:39",
    path: "/orthodox/scripture/matthew/22",
  },
  {
    title: "Forgive from the heart",
    description: "Christ commands mercy and reconciliation, reflecting the forgiveness we receive from the Father.",
    reference: "Matthew 6:14",
    path: "/orthodox/scripture/matthew/6",
  },
  {
    title: "Take up your cross and follow Me",
    description: "Discipleship is sacrificial and daily, shaped by obedience, humility, and steadfast faith.",
    reference: "Luke 9:23",
    path: "/orthodox/scripture/luke/9",
  },
  {
    title: "Abide in My love",
    description: "Keeping Christ's commandments is the path of remaining in His love and bearing fruit.",
    reference: "John 15:10",
    path: "/orthodox/scripture/john/15",
  },
  {
    title: "Make disciples of all nations",
    description: "The Lord's final command sends the Church into mission, teaching and baptizing in the Trinity.",
    reference: "Matthew 28:19",
    path: "/orthodox/scripture/matthew/28",
  },
];

export default function CommandmentsPage() {
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Orthodox", to: "/orthodox" },
            { label: "Holy Scripture", to: "/orthodox/scripture" },
            { label: "Commandments", to: "/orthodox/scripture/commandments" },
          ]}
        />

        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">Commandments of Christ</h1>
        <p className="mt-3 text-lg text-[var(--text-primary)]/88">
          A practical reading page based on the commandments Jesus gives His disciples for holy life and mission.
        </p>

        <SectionDivider label="The Lord's Teachings" />

        <div className="space-y-4">
          {commandments.map((item) => (
            <Card key={item.title}>
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">{item.title}</h2>
              <p className="mt-2 text-[var(--text-primary)]/88">{item.description}</p>
              <p className="mt-3 text-sm">
                <CrossReferenceLink
                  to={item.path}
                  label={item.reference}
                  type="scripture"
                  preview={<p>Open this chapter in the reader for context and reflection.</p>}
                  fullChapterLink={item.path}
                />
              </p>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
