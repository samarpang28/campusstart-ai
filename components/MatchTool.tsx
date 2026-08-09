"use client";

import { useMemo, useState } from "react";
import RoomIllustration from "@/components/RoomIllustration";

type Amenities = {
  attachedBathroom: boolean;
  privateKitchen: boolean;
  furnished: boolean;
  ac: boolean;
  wifi: boolean;
  powerBackup: boolean;
  lgbtqFriendly: boolean;
  wheelchairAccessible: boolean;
  petFriendly: boolean;
  cctvSecurity: boolean;
};

type RoomType = "Shared" | "Private";

type Roommate = {
  name: string;
  gender: "Male" | "Female";
  course: "MBA" | "M.Tech" | "MS" | "PhD" | "JEE/NEET Prep";
  year: "1st Year" | "2nd Year";
  habits: string[];
};

type Listing = {
  id: string;
  city: string;
  university: string;
  area: string;
  rent: number;
  verified: boolean;
  roomType: RoomType;
  amenities: Amenities;
  roommate?: Roommate;
};

const amen = (overrides: Partial<Amenities>): Amenities => ({
  attachedBathroom: false,
  privateKitchen: false,
  furnished: false,
  ac: false,
  wifi: true,
  powerBackup: false,
  lgbtqFriendly: false,
  wheelchairAccessible: false,
  petFriendly: false,
  cctvSecurity: false,
  ...overrides,
});

const SAMPLE_LISTINGS: Listing[] = [
  {
    id: "l1", city: "Kolkata", university: "IIFT Kolkata", area: "Salt Lake", rent: 12000, verified: true, roomType: "Shared",
    amenities: amen({ attachedBathroom: true, furnished: true, ac: true, powerBackup: true, cctvSecurity: true }),
    roommate: { name: "Arjun R.", gender: "Male", course: "MBA", year: "1st Year", habits: ["Early riser", "Non-smoker", "Cooks at home"] },
  },
  {
    id: "l1b", city: "Kolkata", university: "IIFT Kolkata", area: "Rajarhat", rent: 10500, verified: true, roomType: "Shared",
    amenities: amen({ privateKitchen: true, furnished: true, lgbtqFriendly: true, cctvSecurity: true }),
    roommate: { name: "Meera D.", gender: "Female", course: "MBA", year: "2nd Year", habits: ["Night owl", "Non-smoker", "Orders in"] },
  },
  {
    id: "l1c", city: "Kolkata", university: "IIFT Kolkata", area: "New Town", rent: 15000, verified: true, roomType: "Private",
    amenities: amen({ attachedBathroom: true, furnished: true, ac: true, wheelchairAccessible: true, cctvSecurity: true }),
  },
  {
    id: "l2", city: "Goa", university: "Goa Institute of Management", area: "Sanquelim", rent: 9500, verified: true, roomType: "Shared",
    amenities: amen({ attachedBathroom: true, ac: true, petFriendly: true, wheelchairAccessible: true }),
    roommate: { name: "Priya N.", gender: "Female", course: "MBA", year: "1st Year", habits: ["Night owl", "Vegetarian", "Fitness enthusiast"] },
  },
  {
    id: "l2b", city: "Goa", university: "Goa Institute of Management", area: "Porvorim", rent: 13500, verified: true, roomType: "Private",
    amenities: amen({ furnished: true, ac: true, petFriendly: true, privateKitchen: true }),
  },
  {
    id: "l3", city: "Kota", university: "Allen Career Institute", area: "Landmark City", rent: 7000, verified: true, roomType: "Shared",
    amenities: amen({ powerBackup: true, cctvSecurity: true }),
    roommate: { name: "Sneha M.", gender: "Female", course: "JEE/NEET Prep", year: "1st Year", habits: ["Quiet study hours", "Non-smoker", "Mess food"] },
  },
  {
    id: "l3b", city: "Kota", university: "Resonance", area: "Talwandi", rent: 6500, verified: true, roomType: "Shared",
    amenities: amen({ attachedBathroom: true, powerBackup: true, cctvSecurity: true, wheelchairAccessible: true }),
    roommate: { name: "Aditya P.", gender: "Male", course: "JEE/NEET Prep", year: "1st Year", habits: ["Quiet study hours", "Vegetarian"] },
  },
  {
    id: "l3c", city: "Kota", university: "Allen Career Institute", area: "Indra Vihar", rent: 9000, verified: true, roomType: "Private",
    amenities: amen({ attachedBathroom: true, powerBackup: true, cctvSecurity: true }),
  },
  {
    id: "l4", city: "Pune", university: "Symbiosis Institute of Technology", area: "Baner", rent: 14000, verified: true, roomType: "Shared",
    amenities: amen({ furnished: true, ac: true, privateKitchen: true, lgbtqFriendly: true }),
    roommate: { name: "Karan V.", gender: "Male", course: "M.Tech", year: "2nd Year", habits: ["Night owl", "Gamer", "Orders in"] },
  },
  {
    id: "l4b", city: "Pune", university: "Symbiosis Institute of Technology", area: "Viman Nagar", rent: 18000, verified: true, roomType: "Private",
    amenities: amen({ attachedBathroom: true, furnished: true, ac: true, wifi: true, lgbtqFriendly: true }),
  },
  {
    id: "l5", city: "Bengaluru", university: "IISc Bengaluru", area: "Whitefield", rent: 16000, verified: true, roomType: "Shared",
    amenities: amen({ attachedBathroom: true, furnished: true, ac: true, wheelchairAccessible: true, petFriendly: true }),
    roommate: { name: "Divya S.", gender: "Female", course: "MS", year: "2nd Year", habits: ["Early riser", "Vegan", "Non-smoker"] },
  },
  {
    id: "l6", city: "Delhi NCR", university: "FIITJEE / Aakash Coaching Hub", area: "Vaishali", rent: 8000, verified: true, roomType: "Shared",
    amenities: amen({ powerBackup: true, cctvSecurity: true, privateKitchen: true }),
    roommate: { name: "Rohan T.", gender: "Male", course: "JEE/NEET Prep", year: "1st Year", habits: ["Quiet study hours", "Vegetarian"] },
  },
  {
    id: "l6b", city: "Delhi NCR", university: "FIITJEE / Aakash Coaching Hub", area: "Indirapuram", rent: 11000, verified: true, roomType: "Private",
    amenities: amen({ attachedBathroom: true, powerBackup: true, cctvSecurity: true, wifi: true }),
  },
];

const AMENITY_LABELS: { key: keyof Amenities; label: string }[] = [
  { key: "attachedBathroom", label: "Attached bathroom" },
  { key: "privateKitchen", label: "Private kitchen" },
  { key: "furnished", label: "Furnished" },
  { key: "ac", label: "AC" },
  { key: "wifi", label: "WiFi" },
  { key: "powerBackup", label: "Power backup" },
  { key: "cctvSecurity", label: "CCTV / security" },
  { key: "lgbtqFriendly", label: "LGBTQ+ friendly" },
  { key: "wheelchairAccessible", label: "Wheelchair accessible" },
  { key: "petFriendly", label: "Pet friendly" },
];

const KNOWN_CITIES = Array.from(new Set(SAMPLE_LISTINGS.map((l) => l.city)));
const KNOWN_UNIVERSITIES = Array.from(new Set(SAMPLE_LISTINGS.map((l) => l.university)));
const ALL_HABITS = Array.from(
  new Set(SAMPLE_LISTINGS.flatMap((l) => l.roommate?.habits ?? []))
);

const ROOM_TYPE_OPTIONS = ["Any", "Shared", "Private"] as const;
const GENDER_OPTIONS = ["Any", "Male", "Female"] as const;
const COURSE_OPTIONS = ["Any", "MBA", "M.Tech", "MS", "PhD", "JEE/NEET Prep"] as const;
const YEAR_OPTIONS = ["Any", "1st Year", "2nd Year"] as const;

function contains(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.trim().toLowerCase());
}

function computeMatch(
  l: Listing,
  university: string,
  gender: string,
  course: string,
  year: string,
  preferredHabits: string[],
  wantedAmenities: (keyof Amenities)[]
) {
  const criteria: { label: string; met: boolean }[] = [];

  if (university.trim()) criteria.push({ label: `University: ${university}`, met: contains(l.university, university) });

  // Roommate-based criteria only apply when the listing actually has a roommate (Shared rooms)
  if (l.roommate) {
    if (gender !== "Any") criteria.push({ label: `Roommate: ${gender}`, met: l.roommate.gender === gender });
    if (course !== "Any") criteria.push({ label: `Course: ${course}`, met: l.roommate.course === course });
    if (year !== "Any") criteria.push({ label: `Year: ${year}`, met: l.roommate.year === year });
    preferredHabits.forEach((h) => criteria.push({ label: h, met: l.roommate!.habits.includes(h) }));
  }

  wantedAmenities.forEach((a) => {
    const found = AMENITY_LABELS.find((x) => x.key === a);
    criteria.push({ label: found?.label ?? a, met: l.amenities[a] });
  });
  criteria.push({ label: "Verified listing", met: l.verified });

  const met = criteria.filter((c) => c.met).length;
  const pct = criteria.length === 0 ? 100 : Math.round((met / criteria.length) * 100);
  return { pct, criteria };
}

export default function MatchTool() {
  const [city, setCity] = useState("");
  const [roomType, setRoomType] = useState<(typeof ROOM_TYPE_OPTIONS)[number]>("Any");
  const [university, setUniversity] = useState("");
  const [gender, setGender] = useState<string>("Any");
  const [course, setCourse] = useState<string>("Any");
  const [year, setYear] = useState<string>("Any");
  const [budgetMax, setBudgetMax] = useState<string>("");
  const [preferredHabits, setPreferredHabits] = useState<string[]>([]);
  const [wantedAmenities, setWantedAmenities] = useState<(keyof Amenities)[]>([]);

  const citySelected = city.trim().length > 0;
  const roommateFiltersRelevant = roomType !== "Private";

  function toggleHabit(h: string) {
    setPreferredHabits((prev) => (prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]));
  }
  function toggleAmenity(a: keyof Amenities) {
    setWantedAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  }

  const cityMatches = useMemo(() => {
    if (!citySelected) return [];
    return SAMPLE_LISTINGS.filter((l) => contains(l.city, city));
  }, [city, citySelected]);

  const roomTypeFiltered = useMemo(() => {
    if (roomType === "Any") return cityMatches;
    return cityMatches.filter((l) => l.roomType === roomType);
  }, [cityMatches, roomType]);

  const budgetFiltered = useMemo(() => {
    const max = parseInt(budgetMax, 10);
    if (!budgetMax || Number.isNaN(max)) return roomTypeFiltered;
    return roomTypeFiltered.filter((l) => l.rent <= max);
  }, [roomTypeFiltered, budgetMax]);

  const results = useMemo(() => {
    return budgetFiltered
      .map((l) => ({ listing: l, ...computeMatch(l, university, gender, course, year, preferredHabits, wantedAmenities) }))
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 3);
  }, [budgetFiltered, university, gender, course, year, preferredHabits, wantedAmenities]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">Live in pilot</p>
      <h1 className="mt-3 max-w-xl font-display text-2xl text-ink sm:text-3xl">
        Find your verified room — shared or private
      </h1>
      <p className="mt-3 max-w-xl text-[15px] text-ink/65">
        Sample data for demo purposes — real verified listings open city by city as the pilot launches.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink">Destination city</span>
          <input
            list="city-suggestions"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Type any city, e.g. Kolkata"
            className="rounded-lg border-2 border-marigold/60 bg-white px-4 py-2.5 text-sm outline-none ring-marigold/50 focus:ring-2"
          />
          <datalist id="city-suggestions">
            {KNOWN_CITIES.map((c) => <option key={c} value={c} />)}
          </datalist>
        </label>

        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink">Room type</span>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value as (typeof ROOM_TYPE_OPTIONS)[number])}
            disabled={!citySelected}
            className="rounded-lg border-2 border-marigold/60 bg-white px-4 py-2.5 text-sm outline-none ring-marigold/50 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="Any">Any</option>
            <option value="Shared">Shared (with roommate match)</option>
            <option value="Private">Private (single room)</option>
          </select>
        </label>

        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink">University / coaching institute</span>
          <input
            list="university-suggestions"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            disabled={!citySelected}
            placeholder="Type any institute name"
            className="rounded-lg border-2 border-marigold/60 bg-white px-4 py-2.5 text-sm outline-none ring-marigold/50 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <datalist id="university-suggestions">
            {KNOWN_UNIVERSITIES.map((u) => <option key={u} value={u} />)}
          </datalist>
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-4">
        <label className="grid gap-1.5 text-sm">
          <span className={`font-medium ${roommateFiltersRelevant ? "text-ink/70" : "text-ink/30"}`}>Roommate gender</span>
          <select value={gender} onChange={(e) => setGender(e.target.value)} disabled={!citySelected || !roommateFiltersRelevant}
            className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none ring-marigold/50 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-40">
            {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className={`font-medium ${roommateFiltersRelevant ? "text-ink/70" : "text-ink/30"}`}>Course / program</span>
          <select value={course} onChange={(e) => setCourse(e.target.value)} disabled={!citySelected || !roommateFiltersRelevant}
            className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none ring-marigold/50 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-40">
            {COURSE_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className={`font-medium ${roommateFiltersRelevant ? "text-ink/70" : "text-ink/30"}`}>Year of study</span>
          <select value={year} onChange={(e) => setYear(e.target.value)} disabled={!citySelected || !roommateFiltersRelevant}
            className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none ring-marigold/50 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-40">
            {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink/70">Max budget (₹/month)</span>
          <input type="number" min={0} value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} disabled={!citySelected}
            placeholder="No limit"
            className="rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none ring-marigold/50 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50" />
        </label>
      </div>

      {!roommateFiltersRelevant && citySelected && (
        <p className="mt-2 font-mono text-[11px] text-ink/40">
          Roommate preferences are hidden for private rooms — there's no roommate to match against.
        </p>
      )}

      <div className="mt-4">
        <span className={`text-sm font-medium ${roommateFiltersRelevant ? "text-ink/70" : "text-ink/30"}`}>
          Your habits (for roommate compatibility)
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {ALL_HABITS.map((h) => {
            const active = preferredHabits.includes(h);
            return (
              <button key={h} type="button" disabled={!citySelected || !roommateFiltersRelevant} onClick={() => toggleHabit(h)}
                className={`rounded-full border px-3 py-1.5 text-xs transition disabled:cursor-not-allowed disabled:opacity-30 ${active ? "border-mint bg-mint/15 text-mint" : "border-ink/15 bg-white text-ink/60 hover:border-ink/30"}`}>
                {h}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <span className="text-sm font-medium text-ink/70">Amenities & inclusivity that matter to you</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {AMENITY_LABELS.map(({ key, label }) => {
            const active = wantedAmenities.includes(key);
            return (
              <button key={key} type="button" disabled={!citySelected} onClick={() => toggleAmenity(key)}
                className={`rounded-full border px-3 py-1.5 text-xs transition disabled:cursor-not-allowed disabled:opacity-40 ${active ? "border-marigold bg-marigold/15 text-[#8a5a13]" : "border-ink/15 bg-white text-ink/60 hover:border-ink/30"}`}>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {!citySelected ? (
        <div className="mt-8 rounded-xl border border-dashed border-ink/20 bg-white/50 px-6 py-10 text-center">
          <p className="text-sm text-ink/60">Type a destination city above to see sample verified rooms there.</p>
        </div>
      ) : budgetFiltered.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-ink/20 bg-white/50 px-6 py-10 text-center">
          <p className="text-sm text-ink/60">
            No sample listings match those filters in &ldquo;{city}&rdquo; yet — try widening your budget or room type.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {results.map(({ listing, pct, criteria }) => (
            <div key={listing.id} className="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm">
              <RoomIllustration className="h-24 w-full" />
              <div className="border-b border-dashed border-ink/10 px-5 py-3">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
                    {listing.city} · {listing.university}
                  </p>
                  <span className="font-mono text-[10px] font-bold text-mint">{pct}% match</span>
                </div>
                <p className="mt-1 font-display text-lg text-ink">{listing.area}</p>
                <p className="mt-1 text-sm text-ink/60">₹{listing.rent.toLocaleString("en-IN")}/month</p>
                <span className="mt-1 inline-block rounded-full bg-ink/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ink/50">
                  {listing.roomType === "Private" ? "Private room" : "Shared room"}
                </span>
              </div>
              <div className="px-5 py-4">
                {listing.roommate ? (
                  <>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-ink">{listing.roommate.name}</p>
                      <span className="font-mono text-[9px] uppercase tracking-wide text-mint">✓ Verified</span>
                    </div>
                    <p className="mt-1 text-xs text-ink/55">
                      {listing.roommate.gender} · {listing.roommate.course} · {listing.roommate.year}
                    </p>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-ink/60">No roommate — private room</p>
                    <span className="font-mono text-[9px] uppercase tracking-wide text-mint">✓ Verified</span>
                  </div>
                )}
                {criteria.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {criteria.map((c, i) => (
                      <li key={i} className={`text-[11px] ${c.met ? "text-mint" : "text-ink/35 line-through"}`}>
                        {c.met ? "✓" : "✕"} {c.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 font-mono text-[11px] text-ink/40">
        Illustrative sample data for demo purposes — not live inventory yet.
      </p>
    </section>
  );
}
