"use client";

import { useMemo, useState } from "react";

type Listing = {
  id: string;
  city: string;
  area: string;
  rent: number;
  verified: boolean;
  roommate: {
    name: string;
    gender: "Male" | "Female";
    course: "MBA" | "M.Tech" | "MS" | "PhD" | "JEE/NEET Prep";
    year: "1st Year" | "2nd Year";
    habits: string[];
  };
};

const SAMPLE_LISTINGS: Listing[] = [
  {
    id: "l1",
    city: "Kolkata",
    area: "Salt Lake, near IIFT",
    rent: 12000,
    verified: true,
    roommate: { name: "Arjun R.", gender: "Male", course: "MBA", year: "1st Year", habits: ["Early riser", "Non-smoker", "Cooks at home"] },
  },
  {
    id: "l2",
    city: "Goa",
    area: "Sanquelim, near GIM",
    rent: 9500,
    verified: true,
    roommate: { name: "Priya N.", gender: "Female", course: "MBA", year: "1st Year", habits: ["Night owl", "Vegetarian", "Fitness enthusiast"] },
  },
  {
    id: "l3",
    city: "Kota",
    area: "Landmark City, near Allen",
    rent: 7000,
    verified: true,
    roommate: { name: "Sneha M.", gender: "Female", course: "JEE/NEET Prep", year: "1st Year", habits: ["Quiet study hours", "Non-smoker", "Mess food"] },
  },
  {
    id: "l4",
    city: "Pune",
    area: "Baner, near tech park",
    rent: 14000,
    verified: true,
    roommate: { name: "Karan V.", gender: "Male", course: "M.Tech", year: "2nd Year", habits: ["Night owl", "Gamer", "Orders in"] },
  },
  {
    id: "l5",
    city: "Bengaluru",
    area: "Whitefield",
    rent: 16000,
    verified: true,
    roommate: { name: "Divya S.", gender: "Female", course: "MS", year: "2nd Year", habits: ["Early riser", "Vegan", "Non-smoker"] },
  },
  {
    id: "l6",
    city: "Delhi NCR",
    area: "Vaishali, near coaching hub",
    rent: 8000,
    verified: true,
    roommate: { name: "Rohan T.", gender: "Male", course: "JEE/NEET Prep", year: "1st Year", habits: ["Quiet study hours", "Vegetarian"] },
  },
];

const GENDER_OPTIONS = ["Any", "Male", "Female"] as const;
const COURSE_OPTIONS = ["Any", "MBA", "M.Tech", "MS", "PhD", "JEE/NEET Prep"] as const;
const YEAR_OPTIONS = ["Any", "1st Year", "2nd Year"] as const;

function matchScore(l: Listing, gender: string, course: string, year: string) {
  let score = 0;
  if (gender === "Any" || l.roommate.gender === gender) score++;
  if (course === "Any" || l.roommate.course === course) score++;
  if (year === "Any" || l.roommate.year === year) score++;
  return score;
}

export default function MatchPreview() {
  const [gender, setGender] = useState<string>("Any");
  const [course, setCourse] = useState<string>("Any");
  const [year, setYear] = useState<string>("Any");

  const results = useMemo(() => {
    return SAMPLE_LISTINGS.map((l) => ({ listing: l, score: matchScore(l, gender, course, year) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [gender, course, year]);

  const topScore = results[0]?.score ?? 0;

  return (
    <section className="border-y border-ink/10 bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">Preview</p>
        <h2 className="mt-3 max-w-xl font-display text-2xl text-ink sm:text-3xl">
          See what a match actually looks like
        </h2>
        <p className="mt-3 max-w-xl text-[15px] text-ink/65">
          Sample data below — real verified listings open city by city once the pilot launches. Try the
          filters to see how matching works.
        </p>

        {/* Filters */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-ink/70">Roommate gender preference</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none ring-marigold/50 focus:ring-2"
            >
              {GENDER_OPTIONS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-ink/70">Course / program</span>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none ring-marigold/50 focus:ring-2"
            >
              {COURSE_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-ink/70">Year of study</span>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none ring-marigold/50 focus:ring-2"
            >
              {YEAR_OPTIONS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Results */}
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {results.map(({ listing, score }) => (
            <div
              key={listing.id}
              className="relative overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm"
            >
              {score === topScore && topScore > 0 && (
                <span className="absolute right-3 top-3 rounded-full bg-mint/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wide text-mint">
                  Best fit
                </span>
              )}
              <div className="border-b border-dashed border-ink/10 px-5 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
                  {listing.city}
                </p>
                <p className="mt-1 font-display text-lg text-ink">{listing.area}</p>
                <p className="mt-1 text-sm text-ink/60">₹{listing.rent.toLocaleString("en-IN")}/month</p>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-ink">{listing.roommate.name}</p>
                  <span className="font-mono text-[9px] uppercase tracking-wide text-mint">✓ Verified</span>
                </div>
                <p className="mt-1 text-xs text-ink/55">
                  {listing.roommate.gender} · {listing.roommate.course} · {listing.roommate.year}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {listing.roommate.habits.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-paper px-2.5 py-1 text-[11px] text-ink/60"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] text-ink/40">
          Illustrative sample data for demo purposes — not live inventory yet.
        </p>
      </div>
    </section>
  );
}
