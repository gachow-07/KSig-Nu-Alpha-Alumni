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
 * your change, then commit and push. GitHub Pages redeploys automatically.
 */

// ---------- Form endpoint (NEW) ----------

/**
 * Where the PARENT NEWSLETTER form sends sign-ups.
 * PASTE YOUR FORMSPREE URL BETWEEN THE QUOTES, e.g. "https://formspree.io/f/abcdwxyz"
 * (Create a free form at https://formspree.io, then copy its endpoint URL.)
 * While this is empty, the form shows a friendly "not connected yet" message.
 *
 * The ALUMNI form doesn't use this: it saves to the Supabase database (see README).
 */
export const FORM_ENDPOINT = ""; // PLACEHOLDER

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

/** Who an event is for. Shown as a tag and used by the event filters. */
export type Audience = "Alumni" | "Families" | "Everyone";

export type AlumniEvent = {
  /** Date in YYYY-MM-DD format. The event disappears automatically the day after this date. */
  date: string;
  /** "Alumni", "Families" or "Everyone" ("Everyone" shows under both filters). */
  audience: Audience;
  /** Free text, e.g. "6:00 – 9:00 PM". */
  time: string;
  title: string;
  location: string;
  description: string;
  /** Link to the RSVP form (Google Form, Partiful, Eventbrite, etc.). */
  rsvpUrl: string;
};

export type FaqItem = { question: string; answer: string };

export type Spotlight = { name: string; pledgeClass: string; role: string; quote: string; photo: Photo };

export type Mentor = { industry: string; name: string; pledgeClass: string };

export type Fund = {
  id: string;
  label: string;
  description: string;
  /** Optional: a donation link just for this fund. Leave undefined to use campaign.donateUrl. */
  donateUrl?: string;
};

// ---------- Site-wide ----------

export const site = {
  name: "KSig Outreach",
  shortName: "KSig Outreach",
  school: "Cal Poly San Luis Obispo",
  /** Used for "Chartered [YEAR]" in the hero and the stats band. */
  charterYear: "[YEAR]", // PLACEHOLDER
  /** Time zone used to decide when an event is "past". */
  timeZone: "America/Los_Angeles",
  /**
   * The official Kappa Sigma crest (approved by HQ), shown faded behind the
   * whole page. It scrolls more slowly than the page, so the bottom of the
   * crest lines up with the bottom of the page. Upload the approved file to
   * public/images/ with this exact name; if the file isn't there, nothing shows.
   */
  crest: {
    src: "/images/crest.png",
    /** How visible it is: 0 = invisible, 1 = full strength. */
    opacity: 0.11,
  },
  /**
   * Crest in the header (small, next to the ΚΣ letters). Leave undefined to
   * keep the header as-is. Do NOT draw or recreate the crest.
   */
  crestImage: undefined as string | undefined,
  seo: {
    title: "KSig Outreach | Kappa Sigma Nu Alpha at Cal Poly",
    description:
      "The Nu Alpha chapter of Kappa Sigma at Cal Poly San Luis Obispo, for brothers, alumni and families. See the chapter today, find events, and stay connected.",
  },
};

/**
 * Top bar links. Each one opens its own page (href); the same section also
 * appears on the landing page (section = its id there).
 */
export const nav = [
  { label: "About", href: "/story/", section: "story" },
  { label: "Chapter Today", href: "/chapter/", section: "today" },
  { label: "Parents", href: "/parents/", section: "parents" },
  { label: "Alumni", href: "/alumni/", section: "alumni" },
  { label: "Events", href: "/events/", section: "events" },
  { label: "Give", href: "/give/", section: "give" },
];

/** The red "Reconnect" button in the top bar opens the sign-up page. */
export const reconnectLink = { label: "Reconnect", href: "/reconnect/", section: "signup" };

// ---------- Hero ----------

export const hero = {
  eyebrow: `${site.school} · Chartered ${site.charterYear}`,
  headlineLine1: "Kappa Sigma",
  headlineLine2: "Nu Alpha",
  intro:
    "Brothers at Cal Poly, alumni wherever they landed, and the families behind them: Nu Alpha is all of us. See what the chapter is doing today, find upcoming events, and stay connected.",
  // Small buttons under the intro. The first is red; the rest are outlined.
  buttons: [
    { label: "For Parents", href: "#parents" },
    { label: "For Alumni", href: "#alumni" },
    { label: "Upcoming Events", href: "#events" },
  ],
  photo: {
    src: undefined, // PLACEHOLDER: wide group photo in front of the house, e.g. "/images/hero-group.jpg"
    alt: "Nu Alpha brothers gathered in front of the chapter house",
  } as Photo,
};

// ---------- Stats band ----------

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

// ---------- Parents & Families (NEW) ----------

export const parents = {
  eyebrow: "Parents & Families",
  heading: "For parents & families",
  intro:
    "Kappa Sigma is one of the largest college fraternities in the country: a brotherhood of students who live, study and serve together. Nu Alpha is our chapter at Cal Poly, chartered in [YEAR]. [PLACEHOLDER] Add a sentence or two, in plain language, about what membership looks like day to day and what families can expect.",
  // Shown in the same style as the stats band. Keep the [ ] until you have real numbers.
  stats: [
    { value: "[#.##]", label: "Chapter GPA" }, // PLACEHOLDER
    { value: "[#]", label: "Study hours / week" }, // PLACEHOLDER
    { value: "$[#]", label: "Scholarships awarded" }, // PLACEHOLDER
    { value: "[###]", label: "Philanthropy hours" }, // PLACEHOLDER
  ] as Stat[],
  safety: {
    heading: "Safety & Accountability",
    intro: "[PLACEHOLDER] One or two sentences on how the chapter keeps members safe and holds itself accountable.",
    points: [
      { title: "Risk management", text: "[PLACEHOLDER] Risk management policies, training, and who is responsible for them." },
      { title: "GPA requirements", text: "[PLACEHOLDER] Minimum GPA to join and stay active, and what happens if a brother falls below it." },
      { title: "Standards", text: "[PLACEHOLDER] The chapter's standards board, code of conduct, and how issues are handled." },
    ],
  },
  faqHeading: "Questions parents ask",
  faq: [
    { question: "How much does membership cost?", answer: "[PLACEHOLDER] Dues per term, one-time fees, what they cover, and whether payment plans or scholarships are available." },
    { question: "Does my son have to live in the house?", answer: "[PLACEHOLDER] Live-in requirements (if any), how many brothers live in, and what housing costs." },
    { question: "What is the time commitment?", answer: "[PLACEHOLDER] Weekly meetings, events, and the new member period, in hours per week." },
    { question: "How does the chapter support academics?", answer: "[PLACEHOLDER] Study hours, tutoring, academic chair, GPA tracking, and scholarships." },
    { question: "Who do I contact with questions?", answer: "Reach out to our Parent Liaison below, any time. [PLACEHOLDER] Add other contacts if helpful (chapter advisor, house manager)." },
  ] as FaqItem[],
  contact: {
    heading: "Your point of contact",
    name: "[Name]", // PLACEHOLDER
    title: "Parent Liaison",
    email: "[email]", // PLACEHOLDER: e.g. parents@ksignualpha.com
    headshot: undefined as string | undefined,
  },
  newsletter: {
    heading: "Get the parent newsletter",
    intro: "A short update a few times a term: chapter news, events for families, and important dates.",
    successHeading: "You're subscribed.",
    successMessage: "Thanks for signing up. Watch your inbox for the next parent newsletter.",
  },
};

// ---------- Alumni (NEW) ----------

export const alumni = {
  eyebrow: "Alumni",
  heading: "Alumni",
  intro:
    "Wherever you landed after Cal Poly, you're still a brother of Nu Alpha. Meet a few of the alumni who stay involved, find a mentor (or become one), and add your name to the list.",
  spotlightHeading: "Alumni Spotlight",
  spotlights: [
    { name: "[Name]", pledgeClass: "[Pledge class]", role: "[Current role]", quote: "[PLACEHOLDER] A short quote about what Nu Alpha means to them.", photo: { src: undefined, alt: "Headshot of [Name]" } },
    { name: "[Name]", pledgeClass: "[Pledge class]", role: "[Current role]", quote: "[PLACEHOLDER] A short quote about what Nu Alpha means to them.", photo: { src: undefined, alt: "Headshot of [Name]" } },
    { name: "[Name]", pledgeClass: "[Pledge class]", role: "[Current role]", quote: "[PLACEHOLDER] A short quote about what Nu Alpha means to them.", photo: { src: undefined, alt: "Headshot of [Name]" } },
  ] as Spotlight[],
  mentorHeading: "Mentor Network",
  mentorNote:
    "Alumni who check \"I'm open to mentoring\" when they reconnect are added here, so current brothers can find someone in their field.",
  // An officer adds mentors here by hand from the Supabase sign-ups (open_to_mentoring = true).
  mentors: [
    { industry: "[Industry]", name: "[Name]", pledgeClass: "[Pledge class]" },
    { industry: "[Industry]", name: "[Name]", pledgeClass: "[Pledge class]" },
    { industry: "[Industry]", name: "[Name]", pledgeClass: "[Pledge class]" },
    { industry: "[Industry]", name: "[Name]", pledgeClass: "[Pledge class]" },
    { industry: "[Industry]", name: "[Name]", pledgeClass: "[Pledge class]" },
    { industry: "[Industry]", name: "[Name]", pledgeClass: "[Pledge class]" },
  ] as Mentor[],
};

// ---------- Events ----------
// Past events hide automatically. Order doesn't matter; they're sorted soonest first.

export const events = {
  eyebrow: "Events",
  heading: "Upcoming events",
  emptyMessage: "No events on the calendar right now. Check back soon.",
  // Filter buttons above the list. "Everyone" events show under every filter.
  filters: ["All", "Alumni", "Families"] as const,
  list: [
    {
      date: "2026-11-07", // PLACEHOLDER
      audience: "Everyone",
      time: "11:00 AM – 2:00 PM",
      title: "Homecoming tailgate",
      location: "[Location]",
      description: "[PLACEHOLDER] Food, drinks, and the actives before kickoff. Bring the family.",
      rsvpUrl: "#", // PLACEHOLDER
    },
    {
      date: "2026-11-21", // PLACEHOLDER
      audience: "Families",
      time: "[Time]",
      title: "Parents' Weekend",
      location: "[Location]",
      description: "[PLACEHOLDER] Meet the brothers, tour the house, and spend the weekend in SLO with your son.",
      rsvpUrl: "#", // PLACEHOLDER
    },
    {
      date: "2026-12-05", // PLACEHOLDER
      audience: "Alumni",
      time: "6:00 – 9:00 PM",
      title: "Bay Area alumni mixer",
      location: "[Location]",
      description: "[PLACEHOLDER] Catch up with Nu Alpha alumni in the Bay Area.",
      rsvpUrl: "#", // PLACEHOLDER
    },
    {
      date: "2027-04-17", // PLACEHOLDER
      audience: "Alumni",
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
  // Fund picker shown above the Donate button. Give a fund its own donateUrl to send gifts there.
  fundsLegend: "Choose where your gift goes",
  funds: [
    { id: "house", label: "House Improvements", description: "[PLACEHOLDER] Repairs and upgrades to the chapter house." },
    { id: "scholarships", label: "Brother Scholarships", description: "[PLACEHOLDER] Scholarships for brothers with financial need or academic merit." },
    { id: "philanthropy", label: "Philanthropy", description: "[PLACEHOLDER] The chapter's philanthropy partners and events." },
  ] as Fund[],
};

// ---------- Sign-up form ----------

export const signup = {
  eyebrow: "Reconnect",
  heading: "Tell us where you landed",
  intro:
    "Two minutes, six fields. We'll only use this to keep you posted on Nu Alpha alumni news and events.",
  successHeading: "You're on the list.",
  successMessage:
    "Thanks for reconnecting. Keep an eye on your inbox for alumni news and event invites.",
};

// ---------- Footer ----------

export const footer = {
  chapterName: "Nu Alpha Chapter of Kappa Sigma",
  email: "outreach@ksignualpha.com", // PLACEHOLDER
  instagramUrl: "https://instagram.com/", // PLACEHOLDER
  instagramHandle: "@[handle]", // PLACEHOLDER
  linkedinUrl: "https://www.linkedin.com/groups/", // PLACEHOLDER
};
