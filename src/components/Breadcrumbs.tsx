import { Link } from "react-router-dom";

type Crumb = { label: string; to: string };

type Props = { items: Crumb[] };

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--text-primary)]/80">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.to} className="flex items-center gap-2">
            {index > 0 && <span className="text-[var(--text-secondary)]/70">&gt;</span>}
            <Link to={item.to} className="hover:text-[var(--text-secondary)] hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
