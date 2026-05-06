import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print-hide inline-flex items-center gap-2 rounded-lg border border-[var(--border)]/60 bg-[var(--card)] px-3 py-2 text-sm"
    >
      <Printer size={15} /> Print this page
    </button>
  );
}
