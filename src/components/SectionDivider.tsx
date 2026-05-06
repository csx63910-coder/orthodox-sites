export default function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="my-8 flex items-center gap-3" role="presentation" aria-hidden="true">
      <div className="ornamental-divider flex-1" />
      <span className="font-accent text-sm text-[var(--text-secondary)]">{label ?? "IC XC"}</span>
      <div className="ornamental-divider flex-1" />
    </div>
  );
}