"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import RevealOnScroll from "@/components/RevealOnScroll";
import Testimonials from "@/components/Testimonials";

const SEGMENTS = [
  "MBA / MS / M.Tech admit",
  "PhD scholar",
  "Competitive exam aspirant (coaching)",
  "Other",
];

const PAIN_POINTS = [
  { label: "Verified stay", text: "You've compared eleven housing sites and still don't know which listings are real." },
  { label: "Budget", text: "No one tells you what rent, food, and transport actually cost in a city you've never lived in." },
  { label: "People", text: "Your future classmates are scattered across five WhatsApp groups you joined out of panic." },
];

const STEPS = [
  { n: "01", title: "Tell us where you're headed", text: "Your university, your program, your move-in window, your budget." },
  { n: "02", title: "Get matched", text: "A short, AI-picked list of verified rooms and roommates who actually fit your budget and habits." },
  { n: "03", title: "Move in with confidence", text: "No scrambling on arrival day. It's already sorted before your flight lands." },
];

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [segment, setSegment] = useState(SEGMENTS[0]);
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    supabase.rpc("get_waitlist_count").then(({ data, error }) => {
      if (!error && typeof data === "number") setCount(data);
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const { error } = await supabase.from("waitlist_signups").insert({
      name, email, segment, destination_city: city || null,
    });
    if (error) {
      setStatus(error.code === "23505" ? "duplicate" : "error");
      return;
    }
    setStatus("success");
    setCount((c) => (c === null ? null : c + 1));
  }

  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-8 md:pb-28 md:pt-16">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
              Now boarding · Pilot cohort
            </p>
            <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-5xl md:text-[3.2rem]">
              Your boarding pass
              <br />
              to campus life.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/70">
              CampusStart.AI is being built as your complete companion for the transition — housing,
              community, and everything in between. We&apos;re starting with the hardest part first: a
              verified room and a roommate who won&apos;t drive you up the wall, before you even land.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#waitlist" className="rounded-full bg-marigold px-7 py-3 text-sm font-semibold text-ink shadow-sm transition hover:brightness-95">
                Reserve my seat
              </a>
              <span className="font-mono text-xs text-ink/50">Free · 2 minutes · No spam</span>
            </div>
            <Link href="/services" className="mt-4 inline-block font-mono text-xs text-marigold underline underline-offset-2">
              See everything we&apos;re building &rarr;
            </Link>
          </div>

          <div>
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl bg-ink text-parchment shadow-2xl shadow-ink/20">
              <div className="flex items-center justify-between border-b border-dashed border-parchment/25 px-6 py-4">
                <span className="font-display text-sm font-semibold tracking-wide">CampusStart.AI</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint">Verified</span>
              </div>
              <div className="px-6 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-parchment/50">From</p>
                    <p className="font-display text-2xl">Home</p>
                  </div>
                  <svg viewBox="0 0 120 24" className="mx-3 h-5 w-24 shrink-0" fill="none">
                    <path d="M2 12h108" stroke="#F2A93B" strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" className="route-line" pathLength={300} />
                    <path d="M104 6l8 6-8 6" stroke="#F2A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-parchment/50">To</p>
                    <p className="font-display text-2xl">Campus</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-dashed border-parchment/25 pt-5">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-parchment/50">Program</p>
                    <p className="mt-1 text-sm font-medium">MBA / MS / PhD</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-parchment/50">Seat</p>
                    <p className="mt-1 text-sm font-medium">Room + Roommate</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-parchment/50">Status</p>
                    <p className="mt-1 text-sm font-medium text-mint">Matched</p>
                  </div>
                </div>
              </div>
              <div className="relative h-8">
                <div className="absolute -left-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-parchment" />
                <div className="absolute -right-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-parchment" />
                <div className="ticket-perforation mx-6 h-px opacity-40" />
              </div>
              <div className="flex items-center justify-between px-6 pb-5 pt-1">
                <span className="font-mono text-[10px] text-parchment/50">PNR CSAI&ndash;2027</span>
                <span className="font-mono text-[10px] text-parchment/50">One seat. One decision.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-y border-ink/10 bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <RevealOnScroll>
            <h2 className="max-w-lg font-display text-2xl text-ink sm:text-3xl">Sound familiar?</h2>
          </RevealOnScroll>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {PAIN_POINTS.map((p, i) => (
              <RevealOnScroll key={p.label} delayMs={i * 100}>
                <div className="rounded-xl border border-ink/10 bg-parchment p-6 shadow-sm">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral">{p.label}</span>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{p.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <RevealOnScroll>
          <h2 className="font-display text-2xl text-ink sm:text-3xl">How it works</h2>
        </RevealOnScroll>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <RevealOnScroll key={s.n} delayMs={i * 100}>
              <span className="font-display text-3xl text-marigold">{s.n}</span>
              <h3 className="mt-3 font-display text-lg text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{s.text}</p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <Testimonials />

      {/* SINGLE VALUE PROP */}
      <section className="border-y border-ink/10 bg-ink text-parchment">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mint">Why just this one thing</p>
          <h2 className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
            No loans, no marketplace, no ten tabs.
            <br />
            Just a room and a roommate you can trust.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-parchment/70">
            Every relocating student is drowning in disconnected apps already. We&apos;re starting narrow on
            purpose — solve the single hardest decision well, then earn the right to do more.
          </p>
          <Link href="/services" className="mt-6 inline-block font-mono text-xs text-marigold underline underline-offset-2">
            See our full roadmap &rarr;
          </Link>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="mx-auto max-w-2xl px-6 py-20 md:py-28">
        <div className="text-center">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">Help us validate this before we build it</h2>
          <p className="mt-3 text-ink/65">
            We&apos;re a small pilot testing real demand. Two minutes, and you&apos;ll be first in line when
            rooms open up.
          </p>
          {count !== null && count > 0 && (
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-mint">
              {count} student{count === 1 ? "" : "s"} already reserved a seat
            </p>
          )}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
          {status === "success" ? (
            <div className="p-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint">Confirmed</p>
              <h3 className="mt-3 font-display text-xl text-ink">You&apos;re on the list, {name.split(" ")[0]}.</h3>
              <p className="mt-2 text-sm text-ink/65">We&apos;ll email {email} the moment your city opens up for the pilot.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5 p-8">
              {status === "duplicate" && (
                <p className="rounded-lg bg-coral/10 px-4 py-3 text-sm text-coral">Looks like you&apos;re already on the list with that email.</p>
              )}
              {status === "error" && (
                <p className="rounded-lg bg-coral/10 px-4 py-3 text-sm text-coral">Something went wrong on our end. Please try again in a moment.</p>
              )}
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-ink/80">Name</span>
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Soumya Banerjee"
                  className="rounded-lg border border-ink/15 px-4 py-2.5 outline-none ring-marigold/50 focus:ring-2" />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-ink/80">Email</span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                  className="rounded-lg border border-ink/15 px-4 py-2.5 outline-none ring-marigold/50 focus:ring-2" />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-ink/80">What are you moving for?</span>
                <select value={segment} onChange={(e) => setSegment(e.target.value)}
                  className="rounded-lg border border-ink/15 px-4 py-2.5 outline-none ring-marigold/50 focus:ring-2">
                  {SEGMENTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-ink/80">Which city are you moving to? <span className="text-ink/40">(optional)</span></span>
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Kolkata, Goa, Delhi"
                  className="rounded-lg border border-ink/15 px-4 py-2.5 outline-none ring-marigold/50 focus:ring-2" />
              </label>
              <button type="submit" disabled={status === "loading"}
                className="mt-2 rounded-full bg-marigold px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-95 disabled:opacity-60">
                {status === "loading" ? "Reserving..." : "Reserve my seat"}
              </button>
              <p className="text-center font-mono text-[10px] text-ink/40">We respect your privacy · No payment required</p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
