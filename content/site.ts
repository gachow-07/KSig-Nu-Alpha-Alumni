/**
 * ============================================================
 *  ALL EDITABLE SITE CONTENT LIVES IN THIS ONE FILE.
 * ============================================================
 *
 * You can change any text, number, date, or link below without touching
 * the components. A few rules:
 *
 *  - Keep the quotes around text: "like this".
 *  - Keep the commas at the end of each line inside { } and [ ].
 *  - Anything marked  // PLACEHOLDER  still needs real info before launch.
 *  - Photos go in the `public/images/` folder. Reference them here as
 *    "/images/your-file.jpg". Leave a photo as `undefined` to show a
 *    grey placeholder box instead.
 *
 * After saving, run `npm run dev` and open http://localhost:3000 to check
 * your change, then commit and push. Vercel redeploys automatically.
 */

// ---------- Types (you don't need to edit these) ----------

export type Photo = {
  /** Path inside /public, e.g. "/images/group.jpg". Leave undefined for a placeholder box. */
  src?: string;
  /** Describe the photo for screen readers, e.g. "Brothers in front of the house, spring 2026". */
  alt: string;
};

export type Stat = { value: string; label: string };

export type TimelineEntry = { year: string; title: string; detail: string };

export type ChapterCard = { title: string; description: string; photo: Photo };

export type Officer = { title: string; name: string; headshot?: string };

export type InvolvementItem = {
  /** Which icon to show: "mentor", "calendar" or "heart". */
  icon: "mentor" | "calendar" | "heart";
  title: string;
  description: string;
  link: { label: string; href: string };
};

export type AlumniEvent = {
  /** Date in YYYY-MM-DD format. The event disappears automatically the day after this date. */
  date: string;
  /** Free text, e.g. "6:00 – 9:00 PM". */
  time: string;
  title: string;
  location: string;
  description: string;
  /** Link to the RSVP form (Google Form, Partiful, Eventbrite, etc.). */
  rsvpUrl: string;
};

// ---------- Site-wide ----------

export const site = {
  name: "Kappa Sigma Nu Alpha Alumni",
  shortName: "Nu Alpha Alumni",
  school: "Cal Poly San Luis Obispo",
  /** Used for "Chartered [YEAR]" in the hero and the stats band. */
  charterYear: "[YEAR]", // PLACEHOLDER
  /** Time zone used to decide when an event is "past". */
  timeZone: "America/Los_Angeles",
  /**
   * Optional: an approved crest image from Kappa Sigma national, e.g. "/images/crest.png".
   * Leave undefined to show only the ΚΣ letters. Do NOT draw or recreate the crest.
   */
  crestImage: undefined as string | undefined,
  seo: {
    title: "Kappa Sigma Nu Alpha Alumni | Cal Poly",
    description:
      "Reconnect with the Nu Alpha chapter of Kappa Sigma at Cal Poly San Luis Obispo. Join the alumni list, see the chapter today, and find upcoming alumni events.",
  },
};

export const nav = [
  { label: "Our story", href: "#story" },
  { label: "The chapter", href: "#today" },
  { label: "Events", href: "#events" },
  { label: "Give", href: "#give" },
];

// ---------- Hero ----------

export const hero = {
  eyebrow: `${site.school} · Est. ${site.charterYear}`,
  // The headline reads as one sentence; the second part is shown in scarlet.
  headline: "Reconnect with",
  headlineAccent: "Nu Alpha.",
  intro:
    "Wherever you landed after Cal Poly, you're still a brother of Nu Alpha. Add your name to the alumni list so we can keep you in the loop on events, mentoring, and the chapter's next chapter.",
  primaryCta: { label: "Join the alumni list", href: "#signup" },
  secondaryCta: { label: "See the chapter today", href: "#today" },
  photo: {
    src: undefined, // PLACEHOLDER: group photo in front of the house, e.g. "/images/hero-group.jpg"
    alt: "Nu Alpha brothers gathered in front of the chapter house",
  } as Photo,
};

// ---------- Stats (shown in a row under the hero) ----------

export const stats: Stat[] = [
  { value: site.charterYear, label: "Chartered at Cal Poly" }, // PLACEHOLDER (set charterYear above)
  { value: "[##]", label: "Active brothers" }, // PLACEHOLDER
  { value: "[###]", label: "Alumni brothers" }, // PLACEHOLDER
  { value: "$[##]K", label: "Raised for philanthropy last year" }, // PLACEHOLDER
];

// ---------- Our story ----------

export const story = {
  eyebrow: "Our story",
  heading: "Built by brothers, one class at a time",
  paragraphs: [
    "[PLACEHOLDER] Tell the founding story here: who started the chapter, when Nu Alpha was chartered at Cal Poly, and what the early brothers set out to build.",
    "[PLACEHOLDER] Add a second paragraph about how the chapter grew: the houses, the traditions, the philanthropy, and the alumni who kept showing up for the guys who came after them.",
  ],
  timeline: [
    { year: "[YEAR]", title: "Nu Alpha chartered", detail: "[PLACEHOLDER] One line about the founding." },
    { year: "[YEAR]", title: "[Milestone]", detail: "[PLACEHOLDER] One line about this milestone." },
    { year: "[YEAR]", title: "[Milestone]", detail: "[PLACEHOLDER] One line about this milestone." },
    { year: "[YEAR]", title: "[Milestone]", detail: "[PLACEHOLDER] One line about this milestone." },
    // The last entry is always shown with a scarlet dot.
    { year: "Today", title: "Still going strong", detail: "[PLACEHOLDER] Active brothers, a full calendar, and alumni who still come home." },
  ] as TimelineEntry[],
};

// ---------- The chapter today ----------

export const chapterToday = {
  eyebrow: "The chapter today",
  heading: "Still the house you remember",
  intro:
    "The faces have changed, but the brotherhood hasn't. Here's what Nu Alpha looks like right now.",
  cards: [
    {
      title: "Brotherhood",
      description: "[PLACEHOLDER] Retreats, chapter dinners, and the friendships that outlast graduation.",
      photo: { src: undefined, alt: "Brothers together at a chapter event" },
    },
    {
      title: "Philanthropy",
      description: "[PLACEHOLDER] What the chapter raises money for and how.",
      photo: { src: undefined, alt: "Brothers volunteering at a philanthropy event" },
    },
    {
      title: "Intramurals",
      description: "[PLACEHOLDER] Which IM teams the house fields and how they're doing.",
      photo: { src: undefined, alt: "Nu Alpha intramural team" },
    },
    {
      title: "New members",
      description: "[PLACEHOLDER] The newest class and how recruitment went this year.",
      photo: { src: undefined, alt: "The newest Nu Alpha member class" },
    },
  ] as ChapterCard[],
  execHeading: "Executive committee",
  // headshot: "/images/exec/grand-master.jpg" etc. Leave undefined to show initials.
  exec: [
    { title: "Grand Master", name: "[Name]" }, // PLACEHOLDER
    { title: "Grand Procurator", name: "[Name]" }, // PLACEHOLDER
    { title: "Grand Master of Ceremonies", name: "[Name]" }, // PLACEHOLDER
    { title: "Grand Treasurer", name: "[Name]" }, // PLACEHOLDER
    { title: "Grand Scribe", name: "[Name]" }, // PLACEHOLDER
    { title: "Alumni Relations Chair", name: "[Name]" }, // PLACEHOLDER
  ] as Officer[],
};

// ---------- Get involved ----------

export const involvement = {
  eyebrow: "Get involved",
  heading: "Three ways to stay part of it",
  items: [
    {
      icon: "mentor",
      title: "Mentor a brother",
      description:
        "Actives want advice on internships, careers, and life after SLO. An hour of your time goes a long way.",
      link: { label: "Sign up to mentor", href: "#signup" },
    },
    {
      icon: "calendar",
      title: "Come back for events",
      description: "Homecoming, regional mixers, and the annual golf tournament. Bring your pledge class.",
      link: { label: "See upcoming events", href: "#events" },
    },
    {
      icon: "heart",
      title: "Give back",
      description: "Help build the chapter the next generation of Nu Alpha brothers will call home.",
      link: { label: "View the campaign", href: "#give" },
    },
  ] as InvolvementItem[],
};

// ---------- Events ----------
// Past events hide automatically. Order doesn't matter; they're sorted soonest first.

export const events = {
  eyebrow: "Events",
  heading: "Upcoming alumni events",
  emptyMessage: "No events on the calendar right now. Check back soon.",
  list: [
    {
      date: "2026-11-07", // PLACEHOLDER
      time: "11:00 AM – 2:00 PM",
      title: "Homecoming tailgate",
      location: "[Location]",
      description: "[PLACEHOLDER] Food, drinks, and the actives before kickoff. Bring the family.",
      rsvpUrl: "#", // PLACEHOLDER
    },
    {
      date: "2026-12-05", // PLACEHOLDER
      time: "6:00 – 9:00 PM",
      title: "Bay Area alumni mixer",
      location: "[Location]",
      description: "[PLACEHOLDER] Catch up with Nu Alpha alumni in the Bay Area.",
      rsvpUrl: "#", // PLACEHOLDER
    },
    {
      date: "2027-04-17", // PLACEHOLDER
      time: "8:00 AM shotgun start",
      title: "Alumni golf tournament",
      location: "[Location]",
      description: "[PLACEHOLDER] Annual scramble supporting the chapter. Foursomes and singles welcome.",
      rsvpUrl: "#", // PLACEHOLDER
    },
  ] as AlumniEvent[],
};

// ---------- Campaign / donations ----------
// Numbers are typed in by hand. Update them whenever the donation page changes.

export const campaign = {
  eyebrow: "Give back",
  name: "[Campaign name]", // PLACEHOLDER
  description:
    "[PLACEHOLDER] What the money is for (house improvements, scholarships, recruitment) and why it matters right now.",
  raised: 0, // PLACEHOLDER: dollars raised so far, no $ or commas
  goal: 25000, // PLACEHOLDER: dollar goal, no $ or commas
  donors: 0, // PLACEHOLDER
  endDate: "2026-12-31", // PLACEHOLDER: YYYY-MM-DD
  donateUrl: "#", // PLACEHOLDER: GiveButter, GoFundMe, or national foundation link
  donateLabel: "Donate now",
};

// ---------- Sign-up form ----------

export const signup = {
  eyebrow: "Reconnect",
  heading: "Tell us where you landed",
  intro:
    "Two minutes, six fields. We'll only use this to keep you posted on Nu Alpha alumni news and events.",
  benefits: [
    "Invites to alumni events near you",
    "Chapter news a few times a year, never spam",
    "The option to mentor current brothers",
  ],
  successHeading: "You're on the list.",
  successMessage:
    "Thanks for reconnecting. Keep an eye on your inbox for alumni news and event invites.",
};

// ---------- Footer ----------

export const footer = {
  chapterName: "Nu Alpha Chapter of Kappa Sigma",
  email: "alumni@ksignualpha.com", // PLACEHOLDER
  instagramUrl: "https://instagram.com/", // PLACEHOLDER
  instagramHandle: "@[handle]", // PLACEHOLDER
  linkedinUrl: "https://www.linkedin.com/groups/", // PLACEHOLDER
};
