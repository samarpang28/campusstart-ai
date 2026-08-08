const TESTIMONIALS = [
  {
    initials: "SD",
    quote: "I compared eleven housing sites and still couldn't tell what was real. This is the first thing that made sense.",
    name: "Souvik D.",
    tag: "MBA admit, relocating for IIFT",
  },
  {
    initials: "SB",
    quote: "Finding a roommate through WhatsApp groups felt like a gamble. Seeing budget and habits upfront actually helps.",
    name: "Soumya B.",
    tag: "MBA admit, fresher",
  },
  {
    initials: "RS",
    quote: "My parents wanted to know the place was verified before I moved. That mattered more than anything else.",
    name: "Ritika S.",
    tag: "Competitive-exam aspirant",
  },
];

export default function Testimonials() {
  return (
    <section className="border-y border-ink/10 bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">Hear from students</p>
        <p className="mt-1 font-mono text-[11px] text-ink/40">
          Illustrative quotes based on our persona research — not verified customer reviews.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
              <p className="text-[14px] leading-relaxed text-ink/75">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint/15 font-mono text-xs font-medium text-mint">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-ink/50">{t.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
