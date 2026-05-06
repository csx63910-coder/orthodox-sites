import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

type RefLinkProps = {
  to: string;
  label: string;
  type: "saint" | "scripture" | "prayer" | "glossary" | "feast" | "book";
  preview: ReactNode;
  fullChapterLink?: string;
};

const styleMap: Record<RefLinkProps["type"], string> = {
  saint: "xref-saint",
  scripture: "xref-scripture",
  prayer: "xref-prayer",
  glossary: "xref-glossary",
  feast: "xref-feast",
  book: "xref-book",
};

export default function CrossReferenceLink({ to, label, type, preview, fullChapterLink }: RefLinkProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const beginOpen = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setOpen(true), 300);
  };

  const closeOpen = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  return (
    <span ref={ref} className="relative inline-block" onMouseEnter={beginOpen} onMouseLeave={closeOpen}>
      <Link to={to} onClick={() => setOpen((prev) => !prev)} className={`xref-link ${styleMap[type]}`}>
        {label}
      </Link>
      {open && (
        <div className="xref-popover absolute left-0 top-[130%] z-40 w-72 rounded-xl border border-[var(--border)]/60 bg-[var(--card)] p-3 text-sm shadow-2xl">
          <div className="xref-arrow" />
          <div className="text-[var(--text-primary)]/90">{preview}</div>
          {fullChapterLink && (
            <Link to={fullChapterLink} className="mt-2 inline-block text-[var(--text-secondary)] underline underline-offset-4">
              open full chapter →
            </Link>
          )}
        </div>
      )}
    </span>
  );
}
