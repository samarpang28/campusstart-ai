"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import RevealOnScroll from "@/components/RevealOnScroll";
import { LogoMark } from "@/components/Logo";

const CORE_SERVICES = [
  { title: "Rental and roommate matching", status: "live", href: "/services/accommodation", text: "Verified rooms and compatible roommates, matched on budget, habits, and program." },
  { title: "Education loan guidance", status: "soon", text: "Future partnerships planned with banks and NBFCs." },
  { title: "Budget planning", status: "soon", text: "A cost-of-living planner for your new city." },
  { title: "Local transportation guidance", status: "soon", text: "Getting around your new city without guesswork." },
  { title: "City guide", status: "soon", text: "The essentials — food, safety, culture, neighborhoods." },
  { title: "Student marketplace", status: "soon", text: "Buy and sell used furniture, books, and electronics." },
  { title: "University community & networking", status: "soon", text: "Connect with classmates before you even arrive." },
  { title: "AI assistant", status: "soon", text: "Personalized answers based on your university, budget, and preferences." },
];

const FUTURE_VISION = [
  "Internship and placement support",
  "Alumni networking",
  "Mental health and wellness support, as CampusStart.AI grows",
  "Scholarship recommendations",
  "Event management",
  "Career counselling",
  "International student relocation support",
];

type PartnerType = "Property owner" | "University / institution";

export default function ServicesPage() {
  const [partnerType, setPartnerType] = useState<PartnerType>("Property owner");
  const [orgName, setOrgName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const { error } = await supabase.from("partner_interest").insert({
      partner_type: partnerType,
      organization_name: orgName,
      contact_email: contactEmail,
      details: details || null,
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <RevealOnScroll>
        <LogoMark size={36} className="mb-5" />
        <p className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-coral">Services</p>
        <h1 className="mt-3 font-display font-semibold text-3xl text-ink sm:text-4xl">What we offer</h1>
        <p className="mt-3 max-w-xl text-[15px] text-ink/65">
          One thing is real and live today. Everything else is on our roadmap — clearly marked, so you
          know exactly what you can use right now.
        </p>
      </RevealOnScroll>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CORE_SERVICES.map((s, i) => {
          const card = (
            <div
              className={`h-full rounded-xl border bg-white p-5 shadow-sm transition ${
                s.status === "live" ? "border-mint hover:-translate-y-0.5" : "border-ink/10 opacity-80"
              }`}
            >
              <span
                className={`inline-block rounded-full px-2.5 py-1 font-mono font-semibold text-[9px] uppercase tracking-wide ${
                  s.status === "live" ? "bg-mint/15 text-mint" : "bg-ink/5 text-ink/40"
                }`}
              >
                {s.status === "live" ? "Live in pilot" : "Coming soon"}
              </span>
              <h3 className="mt-3 font-display font-semibold text-base text-ink">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/60">{s.text}</p>
              {s.href && <p className="mt-3 font-mono font-medium text-[11px] text-marigold">Try it &rarr;</p>}
            </div>
          );
          return (
            <RevealOnScroll key={s.title} delayMs={(i % 4) * 80}>
              {s.href ? <Link href={s.href}>{card}</Link> : card}
            </RevealOnScroll>
          );
        })}
      </div>

      <RevealOnScroll className="mt-16">
        <p className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-coral">Where we&apos;re headed</p>
        <p className="mt-2 max-w-xl text-[14px] text-ink/60">
          Longer-horizon ideas from our original research — not committed features yet, but part of the
          vision.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {FUTURE_VISION.map((v) => (
            <span key={v} className="rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 text-xs text-ink/60">
              {v}
            </span>
          ))}
        </div>
      </RevealOnScroll>

      {/* PARTNER INTEREST */}
      <RevealOnScroll className="mt-20 rounded-2xl border border-ink/10 bg-paper p-8">
        <p className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-coral">Partner with us</p>
        <h2 className="mt-3 font-display font-semibold text-xl text-ink">Property owners and universities</h2>
        <p className="mt-2 max-w-lg text-[14px] text-ink/60">
          Our core interaction depends directly on you. If you list verified accommodation or represent a
          university, we&apos;d like to hear from you.
        </p>
        <p className="mt-3 font-mono font-medium text-[11px] text-ink/40">
          Future partnerships are also planned with insurance providers, internet service providers, and
          moving companies as we expand into budgeting and relocation support.
        </p>

        {status === "success" ? (
          <p className="mt-6 rounded-lg bg-mint/10 px-4 py-3 text-sm text-mint">
            Thanks — we&apos;ve received your interest and will reach out.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-ink/80">I am a</span>
              <select value={partnerType} onChange={(e) => setPartnerType(e.target.value as PartnerType)}
                className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 outline-none ring-marigold/50 focus:ring-2">
                <option>Property owner</option>
                <option>University / institution</option>
              </select>
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-ink/80">Organization / property name</span>
              <input required value={orgName} onChange={(e) => setOrgName(e.target.value)}
                className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 outline-none ring-marigold/50 focus:ring-2" />
            </label>
            <label className="grid gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-ink/80">Contact email</span>
              <input required type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 outline-none ring-marigold/50 focus:ring-2" />
            </label>
            <label className="grid gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-ink/80">Tell us more <span className="text-ink/40">(optional)</span></span>
              <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={3}
                className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 outline-none ring-marigold/50 focus:ring-2" />
            </label>
            <button type="submit" disabled={status === "loading"}
              className="mt-1 w-fit rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-parchment transition hover:bg-ink-light disabled:opacity-60 sm:col-span-2">
              {status === "loading" ? "Sending..." : "Submit interest"}
            </button>
            {status === "error" && <p className="text-sm text-coral sm:col-span-2">Something went wrong. Please try again.</p>}
          </form>
        )}
      </RevealOnScroll>
    </main>
  );
}
