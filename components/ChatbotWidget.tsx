"use client";

import { useState } from "react";
import { LogoMark } from "@/components/Logo";

type Msg = { from: "bot" | "user"; text: string };

const FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["city", "cities", "where", "location"],
    answer: "We're piloting in Kolkata, Goa, Kota, Pune, Bengaluru, and Delhi NCR. Join the waitlist and tell us your city — we'll notify you as it opens.",
  },
  {
    keywords: ["free", "cost", "price", "pay", "money"],
    answer: "Joining the waitlist is completely free. Premium features (priority matches, faster verification) may be introduced later, but core access stays free.",
  },
  {
    keywords: ["verify", "verified", "verification", "trust", "safe"],
    answer: "Every listing goes through a verification checklist before it's shown — look for the green \"Verified\" badge. We're still in pilot, so verified inventory is limited to a few sample cities right now.",
  },
  {
    keywords: ["roommate", "compatible", "match", "matching"],
    answer: "We match on budget, course/program, year of study, lifestyle habits, and amenity preferences — try it yourself on the Services page under \"Rental and roommate matching.\"",
  },
  {
    keywords: ["loan", "budget", "finance", "money", "emi"],
    answer: "Financial guidance (loans, budgeting tools) is on our roadmap under \"Coming Soon\" — not live yet. Check the Services page for the full list.",
  },
  {
    keywords: ["contact", "reach", "email", "talk", "human"],
    answer: "Head to the Contact page — you can send a message there and we'll get back to you.",
  },
  {
    keywords: ["partner", "property", "owner", "university", "list my"],
    answer: "If you're a property owner or represent a university, there's a partner-interest form on the Services page — we'd love to hear from you.",
  },
];

const DEFAULT_ANSWER =
  "I don't have an answer for that yet — I'm a simple FAQ assistant for now. Try asking about cities, verification, roommate matching, or pricing, or head to the Contact page for a real answer.";

function findAnswer(input: string) {
  const lower = input.toLowerCase();
  const hit = FAQ.find((f) => f.keywords.some((k) => lower.includes(k)));
  return hit ? hit.answer : DEFAULT_ANSWER;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hi! I can answer quick questions about cities, verification, matching, and pricing. What do you want to know?" },
  ]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const answer = findAnswer(text);
    setMessages((m) => [...m, { from: "user", text }, { from: "bot", text: answer }]);
    setInput("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 origin-bottom-right animate-[chatpop_.25s_ease-out] overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-xl">
          <div className="flex items-center justify-between bg-ink px-4 py-3">
            <span className="flex items-center gap-2">
              <LogoMark size={22} />
              <span className="font-display text-sm text-parchment">Assistant</span>
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-parchment/70 hover:text-parchment">
              ✕
            </button>
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-snug ${
                  m.from === "bot" ? "bg-paper text-ink/80" : "ml-auto bg-mint/15 text-ink"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-ink/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask a question..."
              className="flex-1 rounded-full border border-ink/15 px-3 py-1.5 text-[13px] outline-none focus:ring-2 focus:ring-marigold/50"
            />
            <button
              onClick={send}
              className="rounded-full bg-marigold px-3 py-1.5 text-[13px] font-medium text-ink"
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat assistant"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-marigold text-xl shadow-lg transition hover:brightness-95 animate-[chatpulse_3s_ease-in-out_infinite]"
      >
        💬
      </button>
    </div>
  );
}
