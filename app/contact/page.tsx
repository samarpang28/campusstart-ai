"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const { error } = await supabase.from("contact_messages").insert({ name, email, message });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <RevealOnScroll>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">Contact</p>
        <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Get in touch</h1>
        <p className="mt-3 max-w-xl text-[15px] text-ink/65">
          Questions, feedback, or partnership ideas — send a message and we&apos;ll get back to you.
        </p>
      </RevealOnScroll>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <RevealOnScroll>
          <div className="overflow-hidden rounded-2xl border border-ink/10">
            <iframe
              title="IMT Ghaziabad location"
              src="https://www.google.com/maps?q=IMT+Ghaziabad,+Ghaziabad,+Delhi+NCR,+201002&output=embed"
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 text-sm text-ink/70">
            <p className="font-medium text-ink">Samarpan Ghosh</p>
            <p>PGDM-ExP, IMT Ghaziabad</p>
            <p>Ghaziabad, Delhi &ndash; NCR, IN 201002</p>
            <a
              href="https://linkedin.com/in/samarpanghosh"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-marigold underline underline-offset-2"
            >
              Connect on LinkedIn
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={100}>
          <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
            {status === "success" ? (
              <div className="py-8 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint">Sent</p>
                <h3 className="mt-3 font-display text-lg text-ink">Thanks, {name.split(" ")[0]}.</h3>
                <p className="mt-2 text-sm text-ink/65">We&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium text-ink/80">Name</span>
                  <input required value={name} onChange={(e) => setName(e.target.value)}
                    className="rounded-lg border border-ink/15 px-4 py-2.5 outline-none ring-marigold/50 focus:ring-2" />
                </label>
                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium text-ink/80">Email</span>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg border border-ink/15 px-4 py-2.5 outline-none ring-marigold/50 focus:ring-2" />
                </label>
                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium text-ink/80">Message</span>
                  <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={5}
                    className="rounded-lg border border-ink/15 px-4 py-2.5 outline-none ring-marigold/50 focus:ring-2" />
                </label>
                <button type="submit" disabled={status === "loading"}
                  className="mt-1 rounded-full bg-marigold px-6 py-2.5 text-sm font-semibold text-ink transition hover:brightness-95 disabled:opacity-60">
                  {status === "loading" ? "Sending..." : "Send message"}
                </button>
                {status === "error" && <p className="text-sm text-coral">Something went wrong. Please try again.</p>}
              </form>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </main>
  );
}
