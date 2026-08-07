# CampusStart.AI — Demand Test Prototype

A landing page that pitches the single core value proposition (verified
accommodation + roommate matching for relocating students) and captures
real signups in a database, so you can quantify demand for your Final
Project.

Every signup is written to a Postgres table in **your own Supabase
project**. Nothing fake — this is a real database.

---

## 0. What you need before starting

- A GitHub account (you said you have one ✅)
- A Vercel account (you said you have one ✅)
- A Supabase account (you said you have one ✅)
- Node.js installed on your laptop, if you want to preview it locally first
  (optional — you can skip straight to deploying if you'd rather not
  install anything)

---

## 1. Create the database table in Supabase

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) and open
   your project (or create a new one — free tier is enough).
2. In the left sidebar, click **SQL Editor** → **New query**.
3. Open the file `supabase-schema.sql` in this folder, copy everything in
   it, paste it into the SQL editor, and click **Run**.
4. You should see "Success. No rows returned." That means the table
   `waitlist_signups` now exists, and it's locked down so only new
   signups can be inserted — nobody can read other people's emails from
   the public website.
5. Go to **Project Settings → API**. Copy two values, you'll need them in
   step 3:
   - **Project URL**
   - **anon public** key

---

## 2. Push this code to GitHub

From this folder, run:

```bash
git init
git add .
git commit -m "CampusStart.AI demand test prototype"
```

Then on [github.com](https://github.com), create a new **empty**
repository (no README, no .gitignore — you already have those) named
`campusstart-ai`. GitHub will show you two commands like this — run them:

```bash
git remote add origin https://github.com/YOUR-USERNAME/campusstart-ai.git
git branch -M main
git push -u origin main
```

---

## 3. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the
   `campusstart-ai` GitHub repo you just pushed.
2. Before clicking Deploy, open **Environment Variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL` → the Project URL from Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → the anon public key from Supabase
3. Under **Project Name**, set it to exactly: `campusstart-ai`
   This is what determines your URL.
4. Click **Deploy**. Wait about a minute.
5. Your live site will be at:

   **`https://campusstart-ai.vercel.app`**

   (If that exact name is taken, Vercel will suggest
   `campusstart-ai-yourname.vercel.app` — still clean and clearly
   CampusStart.AI.)

That's it — share that URL with students to test real demand.

---

## 4. Where to see who signed up

Supabase Dashboard → **Table Editor** → `waitlist_signups`. You'll see
every name, email, segment (Primary/Secondary persona), and destination
city — exactly the data you need to quantify and segment demand for your
report.

You can also download it as CSV directly from that table view (⋮ menu →
Export).

---

## 5. Previewing locally (optional, before deploying)

```bash
npm install
cp .env.local.example .env.local
# then paste your real Supabase URL + anon key into .env.local
npm run dev
```

Open `http://localhost:3000`.

---

## 6. If you want to change any wording later

Everything is in `app/page.tsx` — the pain points, the 3 steps, the
headline, and the form fields are all plain arrays/JSX near the top of
the file, so you don't need to touch any Supabase or config code to edit
copy.
