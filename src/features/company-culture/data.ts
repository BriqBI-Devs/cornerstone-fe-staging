export interface Category {
  key: string;
  title: string;
}

export interface Story {
  slug: string;
  title: string;
  /** Short summary shown on cards; also the lede at the top of the story page. */
  description: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  categoryKey: string;
  image: string;
  author: { name: string; initials: string };
  readTime: string;
  /** Paragraphs shown after the lede. */
  body: string[];
  topics: string[];
  likes: number;
}

export interface Comment {
  id: string;
  author: string;
  /** ISO date and time. */
  postedAt: string;
  text: string;
  reactions: number;
}

// Mock content standing in for the backend. The components only rely on these shapes,
// so the backend can later supply the same JSON in place of the arrays below.
const IMAGE_BASE = "/company&culture/assets/images";

/** Stories shown in the featured carousel, in order. */
const FEATURED_SLUGS = [
  "river-crossing-family-day",
  "laura-reyes-baby-lily",
  "hispanic-heritage-month",
  "workiversaries-sep",
  "welcome-september-new-hires",
];
/** Stories whose photo is not <slug>.jpg. */
const IMAGE_OVERRIDES: Record<string, string> = {
  "river-crossing-family-day": `${IMAGE_BASE}/fun-food-family.avif`,
};

export const CATEGORIES: Category[] = [
  { key: "workiversaries", title: "Workiversaries" },
  { key: "new-hires", title: "New Hires & Welcomes" },
  { key: "community", title: "Community + Connection" },
  { key: "cultural", title: "Cultural Observances" },
  { key: "guide", title: "Company Guide" },
];

type StorySeed = Omit<Story, "image">;

const STORY_SEEDS: StorySeed[] = [
  {
    slug: "workiversaries-sep",
    title: "This month’s Workiversaries: Denise Ramirez (10 years) and Margaret Carestia (12 years)",
    description: "Two incredible team members hit major milestones this month — here’s to many more.",
    publishedAt: "2026-09-09",
    categoryKey: "workiversaries",
    author: { name: "People Team", initials: "PT" },
    readTime: "1 min read",
    body: ["Denise Ramirez marks 10 years with L+M, and Margaret Carestia marks 12 — both across Operations and Accounting. Please join us in celebrating the dedication and institutional knowledge they bring to the team every day."],
    topics: ["Workiversaries","People","Recognition"],
    likes: 5,
  },
  {
    slug: "workiversaries-5-years",
    title: "Celebrating 5 Years: Priya Osei & Marcus Field",
    description: "Five years of dedication across Property Operations and Asset Management.",
    publishedAt: "2026-09-02",
    categoryKey: "workiversaries",
    author: { name: "People Team", initials: "PT" },
    readTime: "1 min read",
    body: ["Congratulations to Priya and Marcus on reaching this milestone. Both have been instrumental in keeping our properties running smoothly and our portfolio performing well."],
    topics: ["Workiversaries","People","Recognition"],
    likes: 8,
  },
  {
    slug: "workiversaries-full-list",
    title: "Full September Workiversary List",
    description: "See every team member celebrating a work anniversary this month.",
    publishedAt: "2026-09-01",
    categoryKey: "workiversaries",
    author: { name: "People Team", initials: "PT" },
    readTime: "1 min read",
    body: ["From new additions to decade-plus veterans, September is a big month for anniversaries across L+M. Scroll through the full list below and take a moment to congratulate a colleague."],
    topics: ["Workiversaries","People"],
    likes: 2,
  },
  {
    slug: "welcome-september-new-hires",
    title: "Welcome Alex Kim, Priya Shah, Tomás Rivera, and Sarah Hunt — our September new hires",
    description: "Say hello to the newest additions across Finance, Marketing, and Operations.",
    publishedAt: "2026-09-08",
    categoryKey: "new-hires",
    author: { name: "People Team", initials: "PT" },
    readTime: "1 min read",
    body: ["Alex, Priya, Tomás, and Sarah join us this month across Finance, Marketing, and Property Operations. Stop by and introduce yourself — and take a look at the Company Guide if you want a refresher on what each team does."],
    topics: ["New Hires","Welcomes","People"],
    likes: 5,
  },
  {
    slug: "laura-reyes-baby-lily",
    title: "Laura Reyes Welcomes Baby Lily, Making a Family of Four",
    description: "Congratulations to Laura and her family on the newest addition.",
    publishedAt: "2026-09-28",
    categoryKey: "new-hires",
    author: { name: "Laura Reyes", initials: "LR" },
    readTime: "2 min read",
    body: ["Our family of four is here! Thank you all for the kind words and support — we can't wait to see everyone at the next all-staff family day."],
    topics: ["New Hires","Welcomes","Personal Milestones"],
    likes: 8,
  },
  {
    slug: "connor-marsh-baby-jeremiah",
    title: "Connor Marsh Welcomes Baby Jeremiah",
    description: "Big congratulations from the whole L+M family.",
    publishedAt: "2026-09-20",
    categoryKey: "new-hires",
    author: { name: "Connor Marsh", initials: "CM" },
    readTime: "1 min read",
    body: ["Welcome to the world, Jeremiah! Connor and his family are settling in well, and the whole team couldn't be happier for them."],
    topics: ["New Hires","Welcomes","Personal Milestones"],
    likes: 4,
  },
  {
    slug: "september-community-digest",
    title: "September Community Digest is out",
    description: "Saratoga harvest photos, new childcare seats, and the fall volunteer day poll.",
    publishedAt: "2026-09-07",
    categoryKey: "community",
    author: { name: "Jamie Ortiz", initials: "JO" },
    readTime: "2 min read",
    body: ["This month's digest covers the Saratoga harvest festival, newly available childcare seats for L+M families, and a quick poll to help us pick the date for this year's fall volunteer day. Take a look and make your voice heard."],
    topics: ["Community","Newsletter"],
    likes: 5,
  },
  {
    slug: "river-crossing-family-day",
    title: "Fun, Food, and Family at River Crossing",
    description: "We held our second annual Family Day at River Crossing this past Saturday, and it was nothing short of a great time.",
    publishedAt: "2026-09-06",
    categoryKey: "community",
    author: { name: "Jamie Ortiz", initials: "JO" },
    readTime: "2 min read",
    body: ["Between the food trucks, the games, and the live music, Family Day at River Crossing has quickly become one of our favorite traditions. Thank you to everyone who came out and made it a success — see you next year!"],
    topics: ["Community","Events","Family Day"],
    likes: 8,
  },
  {
    slug: "12-foot-snowman",
    title: "The 12-Foot Snowman That Stole the Show",
    description: "After last winter’s storm, one snowman became the talk of the office.",
    publishedAt: "2026-09-05",
    categoryKey: "community",
    author: { name: "Rosa Vidal", initials: "RV" },
    readTime: "2 min read",
    body: ["When the storm hit, we didn't expect a 12-foot snowman to show up in the courtyard — but here we are. A huge thank-you to whoever built it; it made everyone's week a little brighter."],
    topics: ["Community","Your News and Photos"],
    likes: 2,
  },
  {
    slug: "fulton-park-book-bags",
    title: "Fulton Park Supports Students with Annual Book Bag Giveaway",
    description: "Local students received backpacks and supplies ahead of the new school year.",
    publishedAt: "2026-09-03",
    categoryKey: "community",
    author: { name: "Rosa Vidal", initials: "RV" },
    readTime: "2 min read",
    body: ["Dozens of volunteers from across our offices helped hand out backpacks and school supplies to students in the Fulton Park community this week. It's one of our favorite annual traditions — thank you to everyone who pitched in."],
    topics: ["Community","Volunteering"],
    likes: 5,
  },
  {
    slug: "hispanic-heritage-month",
    title: "Honoring Hispanic Heritage Month: Stories from Our Team",
    description: "Team members share what heritage month means to them and their families.",
    publishedAt: "2026-09-15",
    categoryKey: "cultural",
    author: { name: "Rosa Vidal", initials: "RV" },
    readTime: "3 min read",
    body: ["Throughout Hispanic Heritage Month, team members from across L+M shared what their heritage means to them — from family traditions to the communities they grew up in. Thank you to everyone who contributed their stories."],
    topics: ["Cultural Observances","People"],
    likes: 8,
  },
  {
    slug: "harlem-heritage-parade",
    title: "L+M Shows Up and Shines at the Harlem Heritage Parade",
    description: "Dozens of team members marched alongside residents and community partners.",
    publishedAt: "2026-06-20",
    categoryKey: "cultural",
    author: { name: "Rosa Vidal", initials: "RV" },
    readTime: "2 min read",
    body: ["L+M had a strong showing at this year's Harlem Heritage Parade, with team members marching alongside residents and community partners to celebrate the neighborhoods we call home."],
    topics: ["Cultural Observances","Community","Events"],
    likes: 2,
  },
  {
    slug: "juneteenth",
    title: "Commemorating Juneteenth Across Our Communities",
    description: "Teams across every office marked the occasion with events and reflection.",
    publishedAt: "2026-06-19",
    categoryKey: "cultural",
    author: { name: "Rosa Vidal", initials: "RV" },
    readTime: "3 min read",
    body: ["From organized discussions to community partnerships, teams across L+M found their own ways to mark Juneteenth this year. Thank you to everyone who took part in making it a meaningful day."],
    topics: ["Cultural Observances","Community"],
    likes: 5,
  },
  {
    slug: "company-guide-toc",
    title: "Company Guide — Table of Contents",
    description: "Your starting point for everything you need to know about L+M.",
    publishedAt: "2026-03-05",
    categoryKey: "guide",
    author: { name: "Communications Team", initials: "CT" },
    readTime: "1 min read",
    body: ["New to L+M, or just need a refresher? The Company Guide is where you'll find a summary of every team — what they do, who's on them, and how to reach them. Bookmark this page and come back any time."],
    topics: ["Company Guide","Onboarding"],
    likes: 8,
  },
  {
    slug: "meet-the-teams-comms-marketing",
    title: "Meet the Teams: Communications & Marketing",
    description: "What this team does, who’s on it, and how to reach them.",
    publishedAt: "2026-08-12",
    categoryKey: "guide",
    author: { name: "Communications Team", initials: "CT" },
    readTime: "2 min read",
    body: ["Communications & Marketing owns everything from internal announcements to brand guidelines. If you need help telling a story — internally or externally — this is the team to talk to."],
    topics: ["Company Guide","Meet the Teams"],
    likes: 2,
  },
  {
    slug: "meet-the-teams-building-envelope",
    title: "Meet the Teams: Building Envelope & Sustainability",
    description: "Roof surveys, parapet reports, and the team behind them.",
    publishedAt: "2026-07-30",
    categoryKey: "guide",
    author: { name: "Communications Team", initials: "CT" },
    readTime: "2 min read",
    body: ["Building Envelope & Sustainability keeps our properties safe and up to code — from roof surveys to parapet reports to long-term sustainability planning. Here's a closer look at what they do day to day."],
    topics: ["Company Guide","Meet the Teams"],
    likes: 5,
  },
];

const STORIES: Story[] = STORY_SEEDS.map((story) => ({
  ...story,
  image: IMAGE_OVERRIDES[story.slug] ?? `${IMAGE_BASE}/${story.slug}.jpg`,
}));

const byNewest = (a: Story, b: Story) => b.publishedAt.localeCompare(a.publishedAt);

export const featuredStories: Story[] = FEATURED_SLUGS.flatMap((slug) => STORIES.filter((story) => story.slug === slug));

/** Every story that is not in the carousel, newest first. */
export const feedStories: Story[] = STORIES.filter((story) => !FEATURED_SLUGS.includes(story.slug)).sort(byNewest);

export const categoryTitle = (key: string) => CATEGORIES.find((category) => category.key === key)?.title ?? "";

/** What the story page needs in one object; this is the shape the story endpoint will return. */
// Mock comment feeds by story slug; stories without an entry have no comments yet.
const COMMENTS: Record<string, Comment[]> = {
  "connor-marsh-baby-jeremiah": [
    {
      id: "c1",
      author: "David Ash",
      postedAt: "2026-10-12T13:18:00",
      text: "Congratulations Connor! Welcome to the world, Jeremiah. We are all so happy for you.",
      reactions: 1,
    },
  ],
  "laura-reyes-baby-lily": [
    { id: "c2", author: "Priya Shah", postedAt: "2026-09-29T09:40:00", text: "Congratulations Laura! Lily is beautiful.", reactions: 3 },
    { id: "c3", author: "Marcus Field", postedAt: "2026-09-28T16:05:00", text: "Wonderful news, enjoy every moment.", reactions: 0 },
  ],
};

export interface StoryDetail extends Story {
  related: Story[];
  feed: Comment[];
}

/** Stands in for GET /stories/:slug. Related = same category first, then the rest, newest first. */
export const getStoryDetail = (slug: string): StoryDetail | undefined => {
  const story = STORIES.find((item) => item.slug === slug);
  if (!story) return undefined;
  const others = STORIES.filter((item) => item.slug !== slug).sort(byNewest);
  const related = [...others.filter((item) => item.categoryKey === story.categoryKey), ...others.filter((item) => item.categoryKey !== story.categoryKey)];
  return { ...story, related: related.slice(0, 3), feed: COMMENTS[slug] ?? [] };
};

export const storyHref = (story: Story) => `/company-culture/${story.slug}`;
