import { supabase } from "@/lib/supabaseClient";

const STATIC_ITEMS = [
  "Now piloting in 6 cities",
  "Verified rooms + roommate matching — early access open",
];

async function getCount() {
  try {
    const { data, error } = await supabase.rpc("get_waitlist_count");
    if (error || typeof data !== "number") return null;
    return data;
  } catch {
    return null;
  }
}

export default async function NewsTicker() {
  const count = await getCount();
  const items = [...STATIC_ITEMS];
  if (count && count > 0) {
    items.splice(1, 0, `${count} student${count === 1 ? "" : "s"} already joined the waitlist`);
  }
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden bg-ink py-1.5">
      <div className="ticker-track inline-flex w-max whitespace-nowrap">
        {loop.map((item, i) => (
          <span key={i} className="mx-6 text-[11px] font-medium text-parchment/80">
            <span className="mr-2 text-marigold">●</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
