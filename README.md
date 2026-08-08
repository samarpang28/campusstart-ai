# CampusStart.AI — Full Site Update

This update turns the single-page prototype into a proper multi-page site:

- **Home** (`/`) — pitch, hero, waitlist form (unchanged in purpose)
- **Services** (`/services`) — two-tier structure: 8 core items (Live in Pilot /
  Coming Soon) + 7 longer-horizon vision items, plus a partner-interest form
  for property owners and universities
- **Accommodation matching tool** (`/services/accommodation`) — the full
  interactive tool: free-text city/university with autocomplete, budget
  filter, habit compatibility chips, amenities & inclusivity filters, and a
  match-percentage breakdown per listing
- **About** (`/about`) — your story, with your photo
- **Contact** (`/contact`) — Google Map embed + a message-only form (your
  email is not publicly displayed)
- A scrolling news ticker, a rule-based FAQ chatbot on every page, and
  scroll-triggered animations throughout

Everything new that collects data (contact messages, partner interest) is
backed by real Supabase tables, same security model as your waitlist:
public can only insert, never read others' data.

---

## 1. Run the new database migration

You already ran `supabase-schema.sql` once. Now run the second file too:

1. Supabase Dashboard → SQL Editor → New query
2. Open `supabase-schema-v2.sql` from this folder, copy everything, paste it in
3. Click Run — you should see "Success. No rows returned."

This creates two new tables: `contact_messages` and `partner_interest`.

---

## 2. Push the updated code

Same flow as every previous update:

1. Copy everything from this folder into your local `campusstart-ai` folder
   that GitHub Desktop is tracking (overwrite when prompted).
2. In GitHub Desktop: write a commit summary like
   `Full multi-page site: nav, services, about, contact, chatbot, animations`
3. Click **Commit to main**, then **Push origin**.
4. Vercel will automatically rebuild — give it 1–2 minutes, then check
   `campusstart-ai.vercel.app`.

---

## 3. What to check once it's live

- Click through all four nav links: Home, Services, About us, Contact
- On Services, click the "Rental and roommate matching" card — it should
  take you to the full matching tool
- Try the chatbot bubble (bottom-right) — ask about "cities" or "verified"
- Submit a test message on the Contact page, then check Supabase → Table
  Editor → `contact_messages` for it
- Submit a test partner-interest entry on Services, then check
  `partner_interest` in Supabase

---

## 4. If your photo doesn't show up

Your photo needs to be at `public/photos/samarpan.jpg` in the project folder
for the About page to find it. It's already included in this update — just
make sure it copies over along with everything else.
