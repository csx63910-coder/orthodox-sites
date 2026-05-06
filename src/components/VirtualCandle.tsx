import { useState } from "react";

export default function VirtualCandle() {
  const [intention, setIntention] = useState("");
  const [lit, setLit] = useState(false);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Virtual Candle</h1>
      <p className="mt-3 text-lg text-[var(--text-primary)]/90">Offer a prayer intention and light a candle in hope and trust.</p>

      <div className="mx-auto mt-10 flex max-w-lg flex-col gap-3">
        <label htmlFor="intention" className="text-left text-sm">
          Prayer intention
        </label>
        <textarea
          id="intention"
          value={intention}
          onChange={(event) => setIntention(event.target.value)}
          rows={4}
          className="rounded-lg border border-[var(--border)]/50 bg-[var(--card)] p-3 outline-none"
          placeholder="Lord, receive this prayer..."
        />
        <button
          onClick={() => setLit(true)}
          className="rounded-lg px-4 py-3 font-semibold text-white"
          style={{ backgroundImage: "linear-gradient(90deg, var(--button-from), var(--button-to))" }}
        >
          Light a Candle
        </button>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <div className="relative h-44 w-20">
          <div
            className="absolute left-1/2 top-3 h-12 w-7 -translate-x-1/2 rounded-full bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-100 blur-[1px]"
            style={{ animation: lit ? "candle-flicker 1.1s ease-in-out infinite" : "none", opacity: lit ? 1 : 0.2 }}
          />
          <div className="absolute bottom-0 left-1/2 h-32 w-16 -translate-x-1/2 rounded-t-xl border border-[var(--border)]/60 bg-amber-50" />
          {lit && <div className="absolute left-1/2 top-6 h-20 w-20 -translate-x-1/2 rounded-full bg-yellow-300/30 blur-2xl" />}
        </div>
        {lit && intention.trim() && <p className="mt-6 max-w-xl text-[var(--text-primary)]/90">"{intention.trim()}"</p>}
      </div>
    </section>
  );
}