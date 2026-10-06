# Kappa Sigma Nu Alpha Alumni

The one-page alumni website for the Nu Alpha chapter of Kappa Sigma at Cal Poly San Luis Obispo.

It does three things:

1. **Collects alumni contact info** through a sign-up form. Every sign-up is saved to a Supabase database the chapter can view and export.
2. **Shows off the chapter**: history, current brothers, and photos.
3. **Drives donations and event attendance**: a campaign section links to an outside donation page, and an events list shows upcoming alumni events with RSVP links.

**Live site:** https://gachow-07.github.io/KSig-Nu-Alpha-Alumni/

**Built with:** Next.js + TypeScript, Tailwind CSS, Supabase (database), GitHub Pages (hosting). All free at chapter scale.

---

## Contents

- [I just want to change some text](#i-just-want-to-change-some-text)
- [Add photos](#add-photos)
- [View and export sign-ups](#view-and-export-sign-ups)
- [First-time setup](#first-time-setup)
  - [1. Install the tools](#1-install-the-tools)
  - [2. Run the site on your computer](#2-run-the-site-on-your-computer)
  - [3. Set up Supabase (the database)](#3-set-up-supabase-the-database)
  - [4. Put the site online with GitHub Pages](#4-put-the-site-online-with-github-pages)
  - [5. Connect the custom domain](#5-connect-the-custom-domain)
- [Before launch checklist](#before-launch-checklist)
- [How the code is organized](#how-the-code-is-organized)
- [How the sign-up form works](#how-the-sign-up-form-works)

---

## I just want to change some text

**Everything on the page comes from one file: [`content/site.ts`](content/site.ts).** You never need to open the components to change copy, stats, events, the exec board, the timeline, or the donation numbers.

Easiest way, no install needed:

1. Open [`content/site.ts`](content/site.ts) on GitHub.
2. Click the pencil icon (✏️ "Edit this file").
3. Change the text between the quotes. Anything marked `// PLACEHOLDER` still needs real info.
4. Click **Commit changes** (commit directly to `main`). The live site updates in about 2 minutes. Watch progress on the repo's **Actions** tab.

Rules that keep things from breaking:

- Keep the quotes around text: `"like this"`. If your text has a `"` in it, use `'` around it instead or write `\"`.
- Keep the comma at the end of each line inside `{ }` and `[ ]`.
- Dates are always `"YYYY-MM-DD"`, e.g. `"2027-04-17"`.
- Dollar amounts in the campaign are plain numbers with no `$` or commas: `raised: 12500,`.

If you make a mistake, the build fails and the old version stays live, so you can't break the live site by accident. GitHub emails you, and the **Actions** tab shows a red ✗ with the error. Fix it and commit again.

### Common edits

| I want to... | Edit this in `content/site.ts` |
| --- | --- |
| Set the charter year everywhere | `site.charterYear` |
| Update the stats band | `stats` |
| Change the history text or timeline | `story` |
| Update the exec board | `chapterToday.exec` |
| Add an event | Copy one `{ ... }` block inside `events.list`, paste it, change the details |
| Remove an old event | Nothing! Past events hide automatically the day after their date |
| Update donation progress | `campaign.raised`, `campaign.donors` |
| Change the donation link | `campaign.donateUrl` |
| Change the email / Instagram / LinkedIn | `footer` |

> **Events note:** visitors' browsers hide events once their date has passed (Pacific time), and the site also rebuilds itself every night around 1 AM Pacific.

---

## Add photos

1. Put the photo in [`public/images/`](public/images/) (on GitHub: open the folder → **Add file** → **Upload files**). See the [photo guide](public/images/README.md) for suggested names and sizes. **Shrink photos first** (e.g. with [squoosh.app](https://squoosh.app)) to under ~500 KB each: GitHub Pages serves them exactly as uploaded, so huge phone photos make the page slow.
2. In `content/site.ts`, set the photo's `src`, e.g.

   ```ts
   photo: { src: "/images/hero-group.jpg", alt: "Brothers in front of the house, spring 2026" },
   ```

3. Always write a real `alt` description. Screen readers read it aloud.

Until a photo is set, a grey "Photo placeholder" box shows in its spot. Exec headshots work the same way: add `headshot: "/images/exec/grand-master.jpg"` to an officer; without one, their initials show in a green circle.

**Crest:** Kappa Sigma headquarters approved using the official crest **next to the hero (the top section) only**. It lives at `public/images/crest.png` and shows faded in the background beside the headline. Don't use it anywhere else on the site, and don't redraw, recolor, crop or stretch it. To adjust how visible it is, change `hero.crest.opacity` in `content/site.ts` (0 = invisible, 1 = full strength; it's 0.18). To swap in an updated file from HQ, upload it over `public/images/crest.png` with the same name. If the file is ever removed, the crest simply disappears; nothing breaks.

**Link preview image:** when the site link is texted or posted, a green ΚΣ card is shown ([`app/opengraph-image.png`](app/opengraph-image.png)). To use a real chapter photo instead, delete that file, add a 1200×630 photo as `app/opengraph-image.jpg`, and update the one-line description in `app/opengraph-image.alt.txt`.

---

## View and export sign-ups

1. Log in at [supabase.com/dashboard](https://supabase.com/dashboard) and open the chapter project.
2. Click **Table Editor** in the left sidebar → `alumni`.
3. To download everything: click **Export** (top right of the table) → **Export table as CSV**. Opens in Excel or Google Sheets.

If someone signs up twice with the same email, their row is **updated**, not duplicated.

The table is private. Nobody can read it through the website; only people with access to the Supabase project can see it. Add officers under **Project Settings → Team** (Organization settings → Members, depending on your plan) and remove them when they graduate.

---

## First-time setup

You only need this section to set the site up from scratch or run it on your own computer.

### 1. Install the tools

Only needed to run the site on your computer. Editing on github.com needs nothing.

- **Node.js** (version 20.9 or newer, LTS recommended): [nodejs.org](https://nodejs.org). Check it worked by opening a terminal and running `node -v`.
- **Git**: [git-scm.com](https://git-scm.com/downloads). On a Mac it's already installed.
- A code editor. [VS Code](https://code.visualstudio.com) is free and easiest.

### 2. Run the site on your computer

```bash
git clone https://github.com/gachow-07/KSig-Nu-Alpha-Alumni.git
cd KSig-Nu-Alpha-Alumni
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page reloads as you save changes to `content/site.ts`.

To test the sign-up form locally, copy `.env.example` to `.env.local` and fill in the two Supabase values from step 3. Without them, the form shows a "something went wrong" message. That's expected.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Run locally with live reload |
| `npm run build` | Build the site into the `out/` folder (run this to check for errors before pushing) |
| `npm run lint` | Check the code for common mistakes |

### 3. Set up Supabase (the database)

1. Go to [supabase.com](https://supabase.com) and sign up. Use a chapter email (e.g. the alumni relations account), not a personal one, so access survives graduation.
2. Click **New project**.
   - **Name:** `ksig-nu-alpha-alumni`
   - **Database password:** click Generate, then save it in the chapter password manager. You probably won't need it again.
   - **Region:** West US (closest to SLO).
   - Plan: **Free**.
3. Wait a minute or two for the project to finish setting up.
4. Create the tables. Run **both** files in [`supabase/migrations/`](supabase/migrations/), **in order**:
   - In the left sidebar, click **SQL Editor** → **New query**.
   - Open [`20261006000000_create_alumni.sql`](supabase/migrations/20261006000000_create_alumni.sql), copy all of it, paste it in, and click **Run**. You should see "Success. No rows returned."
   - Click **New query** again and do the same with [`20261006010000_signup_function.sql`](supabase/migrations/20261006010000_signup_function.sql).
   - Click **Table Editor**. You should see an empty `alumni` table (and a `signup_attempts` table used for spam protection).
5. Get the two values the site needs:
   - **Project URL:** **Project Settings → Data API** (or the **Connect** button at the top). Copy the URL, like `https://abcdefghijklmnop.supabase.co`.
   - **Publishable key:** **Project Settings → API Keys**. Copy the key that starts with `sb_publishable_`. (Older projects: use the `anon` key under the "Legacy API keys" tab instead. Either works.)

> Both of these are **meant to be public**: they end up in the website's code, and that's fine. The publishable key can only call the sign-up function. It can't read, list, change, or delete anyone's info.
>
> ⚠️ **Never use the secret key** (starts with `sb_secret_`, or the legacy `service_role` key) anywhere in this project. It bypasses all protections. If it ever leaks, go to **Project Settings → API Keys**, create a new one and delete the old one.

> **Free-tier note:** Supabase pauses free projects after about a week with no activity. Sign-ups will fail while it's paused. If that happens, log in and click **Restore project**. Steady sign-up traffic keeps it awake.

### 4. Put the site online with GitHub Pages

The repo has a workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) that builds the site and publishes it to GitHub Pages on every push to `main`, plus once a night. One-time setup:

1. **Make `main` the default branch:** repo **Settings → General → Default branch** → switch to `main`. (GitHub Pages only publishes from the default branch, and the nightly rebuild only runs there.)
2. **Turn on Pages:** **Settings → Pages → Build and deployment → Source** → choose **GitHub Actions**.
3. **Connect the form to Supabase:** **Settings → Secrets and variables → Actions → Variables** tab → **New repository variable**. Add two:

   | Name | Value |
   | --- | --- |
   | `SUPABASE_URL` | your Project URL |
   | `SUPABASE_PUBLISHABLE_KEY` | your publishable key |

4. **Publish:** **Actions** tab → **Deploy to GitHub Pages** → **Run workflow** → **Run workflow**. In about 2 minutes the site is live at **https://gachow-07.github.io/KSig-Nu-Alpha-Alumni/**.
5. **Test it:** open the link on your phone, submit the form with your own info, and check **Table Editor → alumni** in Supabase. Your row should be there. 🎉 Delete the test row when you're done.

You can do steps 1, 2 and 4 before Supabase is ready. The page will look right, but the form won't save until step 3 is done and the workflow runs again.

**Tip:** on the repo's main page, click ⚙️ next to **About** and tick **Use your GitHub Pages website** so the link shows at the top of the repo.

### 5. Connect the custom domain

Once `ksignualpha.com` is purchased:

1. **Settings → Pages → Custom domain** → enter `ksignualpha.com` → **Save**.
2. GitHub shows the DNS records to add. Add them at whichever company you bought the domain from ([GitHub's guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)).
3. Once the DNS check passes, tick **Enforce HTTPS**.
4. **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**, so the site rebuilds for the new address (links and previews adjust automatically).

---

## Before launch checklist

Fill these in `content/site.ts` (search the file for `PLACEHOLDER`):

- [ ] Charter year and founding story (ask the chapter advisor or an older alum)
- [ ] 3 to 4 timeline milestones with years
- [ ] Active brother count, alumni count, philanthropy total
- [ ] Wide group photo in front of the house
- [ ] Four photos: brotherhood, philanthropy, intramurals, new members
- [ ] Executive committee names and headshots
- [ ] Campaign name, description, goal, end date, and donation page link
- [ ] Dates, times, locations, and RSVP links for upcoming events
- [ ] Chapter email, Instagram, and LinkedIn group links
- [ ] Approval from Kappa Sigma national or the chapter advisor to use the name and letters
- [ ] Supabase project created, both migration files run, the two Actions variables added
- [ ] `main` set as the default branch and GitHub Pages turned on
- [ ] Submit a test sign-up on the live site, then delete the test row in Supabase

---

## How the code is organized

```
app/
  page.tsx               The landing page: puts the sections in order
  layout.tsx             Fonts, page title, link-preview (SEO) tags
  globals.css            Design tokens (colors, fonts) and shared styles
  icon.svg               Browser tab icon (ΚΣ)
  apple-icon.png         iPhone home-screen icon
  opengraph-image.png    Link preview image (+ .alt.txt description)
components/              One file per page section
  Header, Hero, StatsBand, OurStory, ChapterToday, Events (+ EventList),
  Campaign, SignupSection + SignupForm, Footer
  PhotoFrame.tsx         Shows a photo, or a placeholder box if none yet
  KSMark.tsx             The ΚΣ letters
  Icons.tsx              Small line icons
content/site.ts          ALL editable copy and data
lib/
  signup-validation.ts   Form rules (the database function checks them again)
  signup-client.ts       Sends a sign-up to Supabase
  dates.ts               Event date helpers (hides past events)
  paths.ts               Makes image paths work under /KSig-Nu-Alpha-Alumni
public/images/           Chapter photos
supabase/migrations/     SQL that creates the alumni table and sign-up function
.github/workflows/       Builds and publishes the site to GitHub Pages
```

### Changing colors or fonts

Colors are defined once at the top of [`app/globals.css`](app/globals.css) under `@theme` (e.g. `--color-primary: #0f4d3a;`). Change a hex value there and it updates across the whole site. Fonts are loaded in [`app/layout.tsx`](app/layout.tsx).

| Token | Hex | Used for |
| --- | --- | --- |
| `primary` | `#0F4D3A` | Emerald: header, hero, campaign band |
| `primary-dark` | `#0A3A2C` | Hero photo placeholder |
| `accent` | `#B3202E` | Scarlet: main buttons, eyebrow labels, progress bar |
| `ink` | `#17201C` | Body text |
| `muted` | `#4A5650` | Secondary text |
| `surface` / `surface-alt` | `#FFFFFF` / `#F2F5F3` | Section backgrounds |
| `border` / `input-border` | `#DCE3DF` / `#B9C4BE` | Card and form field borders |
| `footer` | `#0B241B` | Stats band and footer |
| `on-dark-muted` | `#CFE3D9` | Small text on emerald |

---

## How the sign-up form works

The site is plain files on GitHub Pages, with no server of its own, so the form talks to Supabase directly from the visitor's browser:

- The browser checks the fields as soon as you press submit and shows errors under each field.
- It then calls a database function, `submit_alumni_signup` (in [`supabase/migrations/20261006010000_signup_function.sql`](supabase/migrations/20261006010000_signup_function.sql)), which checks every field **again**. Never trust the browser alone.
- On success the form is replaced with a thank-you message. On failure a friendly error shows and everything the person typed stays in the form.
- Emails are saved in lowercase, and the `email` column is unique. A repeat sign-up updates the existing row (new name, city, role, etc.) instead of creating a duplicate.
- **Spam protection:** a hidden "website" field that people never see. Bots fill it in, get a fake "thanks," and nothing is saved. The database function also limits each IP address to 5 sign-ups per 10 minutes.
- **Security:** the `alumni` table has Row Level Security on and no public access. The website's publishable key can only run the sign-up function. It can't read anyone's info, so the list stays private to people with access to the Supabase project.

### Database table: `alumni`

| Column | Type |
| --- | --- |
| `id` | uuid, primary key |
| `full_name` | text |
| `pledge_class` | text |
| `email` | text, unique (lowercase) |
| `city` | text, optional |
| `current_role` | text, optional |
| `open_to_mentoring` | boolean, default false |
| `created_at` | timestamptz, default now() |

(`current_role` is also a built-in SQL word, so if you write your own SQL queries, wrap it in double quotes: `select "current_role" from alumni;`.)

### Not in v1

User logins, an admin dashboard, online payments, a blog, multiple pages, and email newsletters. These can come later.
