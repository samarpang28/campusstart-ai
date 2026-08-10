import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import { LogoMark } from "@/components/Logo";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <RevealOnScroll>
        <LogoMark size={36} className="mb-5" />
        <p className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-coral">About us</p>
        <h1 className="mt-3 font-display font-semibold text-3xl text-ink sm:text-4xl">
          Built for the students, by a student.
        </h1>
      </RevealOnScroll>

      <RevealOnScroll delayMs={100} className="mt-8 flex flex-col items-start gap-6 sm:flex-row">
        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-marigold/60">
          <Image
            src="/photos/samarpan.jpg"
            alt="Samarpan Ghosh"
            width={128}
            height={128}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="font-display font-semibold text-lg text-ink">Samarpan Ghosh</p>
          <p className="text-sm text-ink/60">PGDM-ExP, IMT Ghaziabad</p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delayMs={150} className="prose mt-10 max-w-none space-y-5 text-[15px] leading-relaxed text-ink/75">
        <p>
          I&apos;m Samarpan, currently in the 18-month PGDM-ExP program at IMT Ghaziabad. The idea for
          CampusStart.AI didn&apos;t come from a classroom — it came from Paris, during my exchange
          semester at KEDGE Business School.
        </p>
        <p>
          While I was there, I kept running into international students who had just landed and were
          completely clueless — about housing, the city, who to even ask. I started talking to people:
          the program facilitator, the administration team, other students, alumni, the accommodation
          in-charges, even a few startup founders working on similar problems. The more conversations I
          had, the clearer it became that this wasn&apos;t a Paris problem or an international-student
          problem. It was the same story back home in India — just less talked about.
        </p>
        <p>
          I moved out of my own house for the first time in 2026. I got lucky — I live on campus at IMT,
          so I never personally had to hunt for accommodation in an unfamiliar city. But I saw, and heard,
          what that transition actually costs people: adjusting to a new city&apos;s culture, figuring out
          transportation, food, opening a bank account, and making financial decisions young — often with
          no one around who&apos;s given them good advice before. That gap, more than any one feature, is
          what CampusStart.AI is trying to close.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delayMs={200} className="mt-10 rounded-2xl border border-ink/10 bg-paper p-6">
        <h2 className="font-display font-semibold text-lg text-ink">Why we&apos;re starting narrow</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
          We could have built ten features on day one. We didn&apos;t. Out of everything I heard in those
          conversations, one problem came up again and again: finding a verified place to live, with
          someone you can actually live with. That&apos;s the one thing we&apos;re building first, and
          building properly, before adding anything else.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delayMs={250} className="mt-8">
        <h2 className="font-display font-semibold text-lg text-ink">What&apos;s next</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
          Everything else students told us they needed — loan guidance, budgeting help, understanding a
          new city, a local marketplace, a real community — is real, and it&apos;s coming. You can see the
          full roadmap on our{" "}
          <a href="/services" className="text-marigold underline underline-offset-2">Services page</a>.
          Every &ldquo;Coming Soon&rdquo; card there feeds the same waitlist, so the more of you tell us what
          you need first, the faster we build it.
        </p>
      </RevealOnScroll>
    </main>
  );
}
