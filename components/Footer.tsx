import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-ink/50 sm:flex-row">
        <span className="font-display text-ink">
          CampusStart<span className="text-marigold">.AI</span>
        </span>
        <nav className="flex gap-6">
          <Link href="/services" className="transition hover:text-ink">Services</Link>
          <Link href="/about" className="transition hover:text-ink">About us</Link>
          <Link href="/contact" className="transition hover:text-ink">Contact</Link>
        </nav>
        <span>A pilot testing real demand before building the product.</span>
      </div>
    </footer>
  );
}
