import { useEffect, useState } from "react";

type Props = {
  items: { id: string; label: string }[];
};

export default function TableOfContents({ items }: Props) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="print-hide sticky top-24 hidden h-fit rounded-xl border border-[var(--border)]/40 bg-[var(--card)]/80 p-3 lg:block">
      <h3 className="font-heading text-sm text-[var(--text-secondary)]">Contents</h3>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`text-sm ${active === item.id ? "text-[var(--text-secondary)]" : "text-[var(--text-primary)]/80"}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
