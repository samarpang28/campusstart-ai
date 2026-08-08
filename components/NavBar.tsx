import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-parchment/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          CampusStart<span className="text-marigold">.AI</span>
        </Link>
        <nav className="hidden gap-8 font-body text-sm text-ink/70 sm:flex">
          <Link href="/" className="transition hover:text-ink">Home</Link>
          <Link href="/services" className="transition hover:text-ink">Services</Link>
          <Link href="/about" className="transition hover:text-ink">About us</Link>
          <Link href="/contact" className="transition hover:text-ink">Contact</Link>
        </nav>
        <Link
          href="/#waitlist"
          className="rounded-full border border-ink/15 bg-ink px-5 py-2 text-sm font-medium text-parchment transition hover:bg-ink-light"
        >
          Reserve a seat
        </Link>
      </div>
    </header>
  );
}
