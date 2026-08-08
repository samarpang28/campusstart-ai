import MatchTool from "@/components/MatchTool";

export default function AccommodationPage() {
  return (
    <main>
      <MatchTool />
      <div className="mx-auto max-w-6xl px-6 pb-20 text-center">
        <a
          href="/#waitlist"
          className="inline-block rounded-full bg-marigold px-7 py-3 text-sm font-semibold text-ink shadow-sm transition hover:brightness-95"
        >
          Reserve my seat
        </a>
      </div>
    </main>
  );
}
