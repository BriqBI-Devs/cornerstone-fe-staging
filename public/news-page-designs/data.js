/*
 * THE COMMON NEWS DATA for every design in this folder (design1 ... design5 and the article page).
 * Edit the content here once and all the designs change together; nothing is typed into the pages themselves.
 *
 * What to edit
 *   CATEGORIES   the category names. They fill the filter on every design.
 *   TOP_SLUGS    which stories appear in the top / hero area, in order.
 *   STORIES      every story. To add one, copy a block and change:
 *                  slug         a unique id, lower case with dashes (it becomes article.html?s=<slug>)
 *                  categoryKey  one of the keys in CATEGORIES
 *                  image        a photo file name from ../company&culture/assets/images
 *                  publishedAt  YYYY-MM-DD (the lists sort newest first)
 *                  title, description, author, readTime, body, topics, likes
 *
 * How the pages use it (load it before the page's own script:  <script src="../data.js"></script>)
 *   window.NEWS_DATA.list                  { TOP, NEWS, CATS } in the shape the list designs already use
 *   window.NEWS_DATA.getStoryDetail(slug)  one story with its related stories and comments (the article page)
 *
 * This file is only for the design mockups; the React app's News page just lists the designs and links to them.
 */
(function () {
  // Photos live in company&culture/assets/images, next to this folder. Working the address out from where
  // this file was loaded keeps it correct for the dev server, a static server and a file opened directly.
  var IMAGE_BASE = new URL("../company&culture/assets/images/", document.currentScript.src).href;

  var CATEGORIES = [
    {
      "key": "announcements",
      "title": "Company Announcements"
    },
    {
      "key": "leadership",
      "title": "Leadership Updates"
    },
    {
      "key": "projects",
      "title": "Projects & Portfolio"
    },
    {
      "key": "safety",
      "title": "Safety & Compliance"
    },
    {
      "key": "it",
      "title": "IT & Systems"
    },
    {
      "key": "benefits",
      "title": "People & Benefits"
    },
    {
      "key": "community-investment",
      "title": "Community Investment"
    },
    {
      "key": "events",
      "title": "Events & Town Halls"
    }
  ];

  // The stories in the top carousel, in order.
  var TOP_SLUGS = [
    "q3-town-hall",
    "safety-stand-down",
    "open-enrollment-2027",
    "mfa-rollout-office-hours",
    "leadership-final-quarter"
  ];

  var STORIES = [
    {
      "slug": "q3-town-hall",
      "title": "Q3 Town Hall: what to expect this Friday",
      "description": "All staff are invited to join leadership for a look back at Q2 and what's ahead for Q3, plus live Q&A.",
      "publishedAt": "2026-09-15",
      "categoryKey": "events",
      "image": "office-team.jpg",
      "author": {
        "name": "Communications Team",
        "initials": "CT"
      },
      "readTime": "2 min read",
      "body": [
        "The Q3 Town Hall takes place this Friday at 10:00 AM in the 4th floor conference room, and on Teams for everyone joining from the field or working from home. The session runs about 60 minutes, including time for questions.",
        "Leadership will walk through how each business line performed in Q2, highlight the projects that reached a milestone, and share the priorities for the next quarter.",
        "Questions can be sent in ahead of time through the form on the Cornerstone home page, or asked live in the chat. A recording will be posted in News afterwards."
      ],
      "topics": [
        "Town Hall",
        "Leadership",
        "All staff"
      ],
      "likes": 12
    },
    {
      "slug": "safety-stand-down",
      "title": "Safety Stand-Down: what every site needs to know",
      "description": "This Friday at 7:00 AM, every field site will pause for a company-wide safety stand-down.",
      "publishedAt": "2026-09-15",
      "categoryKey": "safety",
      "image": "outdoor-event.jpg",
      "author": {
        "name": "Safety Team",
        "initials": "ST"
      },
      "readTime": "3 min read",
      "body": [
        "Work will stop at 7:00 AM for about 30 minutes so that every crew can take part. Site superintendents will lead a short talk on fall protection, housekeeping and reporting near misses, using a shared set of slides.",
        "Office teams are welcome to join the session on Teams. Please bring any questions or concerns about your own site, and be ready to talk about what is working well.",
        "After the stand-down, each site will send a one-line confirmation to the Safety Team."
      ],
      "topics": [
        "Safety",
        "Field teams",
        "Stand-down"
      ],
      "likes": 9
    },
    {
      "slug": "open-enrollment-2027",
      "title": "Open enrollment opens Monday: your 2027 benefits guide",
      "description": "A short guide to the changes to your benefits for the coming plan year.",
      "publishedAt": "2026-10-30",
      "categoryKey": "benefits",
      "image": "company-guide-toc.jpg",
      "author": {
        "name": "Benefits Team",
        "initials": "BT"
      },
      "readTime": "3 min read",
      "body": [
        "Open enrollment runs for two weeks this fall. This year there are updates to the medical plan options, a new wellness benefit and a change to the commuter benefit limit.",
        "The Benefits Team will host walk-through sessions in each office, and the full guide is available in Policies & Resources.",
        "If you do nothing, your current elections carry over, apart from the flexible spending account, which must be renewed every year."
      ],
      "topics": [
        "Benefits",
        "Open enrollment",
        "HR"
      ],
      "likes": 14
    },
    {
      "slug": "mfa-rollout-office-hours",
      "title": "New MFA rollout: walk-up help starts this week",
      "description": "Stop by walk-up help Tuesdays and Thursdays, 12 to 2, in the 4th floor kitchen.",
      "publishedAt": "2026-10-12",
      "categoryKey": "it",
      "image": "meet-the-teams-accounting-finance.jpg",
      "author": {
        "name": "IT Help Desk",
        "initials": "IT"
      },
      "readTime": "2 min read",
      "body": [
        "The multi-factor authentication rollout completes this month. If you have not set it up yet, the IT team will be on hand to walk you through it in person, and it takes about five minutes.",
        "Please bring your phone and your laptop. If you cannot make the walk-up hours, you can book a time through the IT help desk, or follow the step-by-step guide on the IT page."
      ],
      "topics": [
        "IT",
        "Security",
        "Help desk"
      ],
      "likes": 6
    },
    {
      "slug": "leadership-final-quarter",
      "title": "Leadership update: priorities for the final quarter",
      "description": "Thank you for a strong year so far, and a look at what we are focusing on next.",
      "publishedAt": "2026-10-05",
      "categoryKey": "leadership",
      "image": "team-celebration.avif",
      "author": {
        "name": "Leadership Team",
        "initials": "LT"
      },
      "readTime": "2 min read",
      "body": [
        "Our teams delivered on a number of milestones this year. Thank you for the care and hard work behind every one of them.",
        "In the final quarter we will focus on delivering our active projects safely and on time, closing out the year-end process cleanly and investing in our people.",
        "We will share more detail at the next town hall, and you are welcome to send questions to your manager or to the Leadership Team at any time."
      ],
      "topics": [
        "Leadership",
        "Company"
      ],
      "likes": 17
    },
    {
      "slug": "riverside-commons-tops-out",
      "title": "Riverside Commons tops out: a milestone for the construction team",
      "description": "The last steel beam went up this week, ahead of schedule.",
      "publishedAt": "2026-11-03",
      "categoryKey": "projects",
      "image": "outdoor-event.jpg",
      "author": {
        "name": "Construction Team",
        "initials": "CN"
      },
      "readTime": "2 min read",
      "body": [
        "The final beam was lifted into place at Riverside Commons on Tuesday, with the whole site team looking on. The building is now at full height and moves into the next phase of work.",
        "Thank you to the crews, the trade partners and everyone in the office who supported the project to this point. Photos from the day are in the gallery."
      ],
      "topics": [
        "Projects",
        "Construction",
        "Milestones"
      ],
      "likes": 21
    },
    {
      "slug": "roof-survey-program-complete",
      "title": "Building Envelope team completes the fall roof survey program",
      "description": "Every roof across the portfolio has now been surveyed, with a clear list of repairs.",
      "publishedAt": "2026-10-28",
      "categoryKey": "projects",
      "image": "meet-the-teams-building-envelope.jpg",
      "author": {
        "name": "Communications Team",
        "initials": "CT"
      },
      "readTime": "2 min read",
      "body": [
        "The Building Envelope team finished surveying every roof in the portfolio this month. The results are being turned into a ranked list of repairs so that the most urgent work is scheduled first.",
        "Property teams will receive their building's report over the next two weeks. If you have questions, the team holds open office hours on Thursdays."
      ],
      "topics": [
        "Projects",
        "Building Envelope",
        "Property"
      ],
      "likes": 7
    },
    {
      "slug": "parapet-inspection-deadlines",
      "title": "Parapet inspection deadlines: what property teams need to submit",
      "description": "A reminder of the filing dates and the documents to have ready.",
      "publishedAt": "2026-10-20",
      "categoryKey": "safety",
      "image": "meet-the-teams-risk-insurance.jpg",
      "author": {
        "name": "Safety Team",
        "initials": "ST"
      },
      "readTime": "3 min read",
      "body": [
        "Parapet inspection reports are due on a fixed schedule, and late filings can lead to fines. This post lists the deadlines for each building and the documents that need to go with them.",
        "If your building is due this quarter, please check the list and let the Risk and Insurance team know as soon as possible if you expect any delay."
      ],
      "topics": [
        "Compliance",
        "Property",
        "Inspections"
      ],
      "likes": 4
    },
    {
      "slug": "return-to-office-winter",
      "title": "In-office schedule: updates for the winter months",
      "description": "What is staying the same, what is changing, and how to check your team's days.",
      "publishedAt": "2026-10-16",
      "categoryKey": "announcements",
      "image": "team-meeting.jpg",
      "author": {
        "name": "Communications Team",
        "initials": "CT"
      },
      "readTime": "2 min read",
      "body": [
        "From the first week of December, offices will keep the same in-office days as this fall, with flexibility for severe weather. Managers will confirm each team's schedule by the end of the month.",
        "If you have questions about your own arrangement, please speak with your manager first, and the People Team can help with anything that needs a second look."
      ],
      "topics": [
        "Workplace",
        "Offices",
        "Schedule"
      ],
      "likes": 11
    },
    {
      "slug": "brand-refresh-preview",
      "title": "Brand refresh preview: what is changing and when",
      "description": "A first look at the new look for L+M, and how it will roll out.",
      "publishedAt": "2026-10-09",
      "categoryKey": "announcements",
      "image": "meet-the-teams-comms-marketing.jpg",
      "author": {
        "name": "Communications Team",
        "initials": "CT"
      },
      "readTime": "3 min read",
      "body": [
        "Over the coming months our logo, colors and templates will be updated. This post explains what is changing, what stays the same and when each piece will be available.",
        "New email signatures and presentation templates will be posted in Policies & Resources, and the Communications team will run short sessions for anyone who wants help switching over."
      ],
      "topics": [
        "Brand",
        "Communications",
        "Templates"
      ],
      "likes": 8
    },
    {
      "slug": "year-end-budget-deadlines",
      "title": "Year-end budget deadlines for department leads",
      "description": "The dates to remember for submissions, approvals and final sign-off.",
      "publishedAt": "2026-10-02",
      "categoryKey": "announcements",
      "image": "office-team.jpg",
      "author": {
        "name": "Communications Team",
        "initials": "CT"
      },
      "readTime": "2 min read",
      "body": [
        "Department leads: budget submissions are due on November 15, with approvals following the week after. Please use the new template, which is available on the Finance page.",
        "If you are unsure whether a cost belongs in this year or next, ask Finance before the deadline."
      ],
      "topics": [
        "Finance",
        "Planning",
        "Deadlines"
      ],
      "likes": 3
    },
    {
      "slug": "new-expense-system",
      "title": "New expense system goes live December 1",
      "description": "What changes for submitting and approving expenses, and where to get training.",
      "publishedAt": "2026-09-29",
      "categoryKey": "it",
      "image": "meet-the-teams-accounting-finance.jpg",
      "author": {
        "name": "IT Help Desk",
        "initials": "IT"
      },
      "readTime": "3 min read",
      "body": [
        "On December 1 we move to a new expense system. Receipts can be captured from your phone, approvals are routed automatically and reports sync with Accounting.",
        "Training sessions run throughout November, and a short video walkthrough is on the IT page for anyone who prefers to learn at their own pace."
      ],
      "topics": [
        "IT",
        "Finance",
        "Systems"
      ],
      "likes": 5
    },
    {
      "slug": "phishing-alert-fake-invoices",
      "title": "Phishing alert: how to spot this month's fake invoices",
      "description": "Three signs that an invoice email is not what it seems.",
      "publishedAt": "2026-09-24",
      "categoryKey": "it",
      "image": "september-community-digest.jpg",
      "author": {
        "name": "IT Help Desk",
        "initials": "IT"
      },
      "readTime": "2 min read",
      "body": [
        "A wave of fake invoice emails is reaching inboxes across the industry. They often use a familiar vendor name, ask for urgent payment and include a link or attachment you did not expect.",
        "If something looks wrong, do not click. Forward the message to the IT help desk using the Report button, and delete it."
      ],
      "topics": [
        "Security",
        "Phishing",
        "IT"
      ],
      "likes": 10
    },
    {
      "slug": "wellness-benefit-stipend",
      "title": "Wellness benefit: a new annual stipend is now available",
      "description": "Use it for gym memberships, fitness classes or wellness apps.",
      "publishedAt": "2026-09-18",
      "categoryKey": "benefits",
      "image": "workiversaries-5-years.jpg",
      "author": {
        "name": "Benefits Team",
        "initials": "BT"
      },
      "readTime": "2 min read",
      "body": [
        "Starting this month every full-time team member has an annual wellness stipend. It can be used for gym memberships, fitness classes, meditation apps and other wellness costs.",
        "Submit receipts through the expense system, and see the benefits guide for the list of eligible items."
      ],
      "topics": [
        "Benefits",
        "Wellness",
        "HR"
      ],
      "likes": 13
    },
    {
      "slug": "commuter-benefits-change",
      "title": "Commuter benefits change on January 1",
      "description": "The monthly limit goes up, and enrollment moves online.",
      "publishedAt": "2026-09-10",
      "categoryKey": "benefits",
      "image": "company-guide-toc.jpg",
      "author": {
        "name": "Benefits Team",
        "initials": "BT"
      },
      "readTime": "2 min read",
      "body": [
        "The monthly pre-tax limit for transit and parking is increasing on January 1. Enrollment and changes now happen online, and the deadline each month is the 15th.",
        "If you already use the benefit there is nothing to do, but it is a good moment to check that your amount still suits how you travel."
      ],
      "topics": [
        "Benefits",
        "Commuting",
        "HR"
      ],
      "likes": 6
    },
    {
      "slug": "back-to-school-drive",
      "title": "Back-to-school drive collects 1,200 backpacks",
      "description": "Thank you to everyone who donated, packed and handed out supplies.",
      "publishedAt": "2026-09-04",
      "categoryKey": "community-investment",
      "image": "fulton-park-book-bags.jpg",
      "author": {
        "name": "Community Investment Team",
        "initials": "CI"
      },
      "readTime": "2 min read",
      "body": [
        "This year's back-to-school drive collected more than 1,200 backpacks and thousands of notebooks, pencils and other supplies for students in the communities where we work.",
        "Volunteers from every office helped sort and hand out the supplies. Thank you to everyone who gave their time or donated."
      ],
      "topics": [
        "Community Investment",
        "Education",
        "Volunteering"
      ],
      "likes": 16
    },
    {
      "slug": "neighborhood-giveaway",
      "title": "The neighborhood giveaway returns this month",
      "description": "Our annual giveaway is back, with supplies for local families.",
      "publishedAt": "2026-08-27",
      "categoryKey": "community-investment",
      "image": "community-giveaway.avif",
      "author": {
        "name": "Community Investment Team",
        "initials": "CI"
      },
      "readTime": "2 min read",
      "body": [
        "For the fourth year running, we are giving away essentials to families in the neighborhoods where we work. Volunteers are welcome to help pack and hand out.",
        "Sign up on the Community Investment page, and thank you to everyone who donated."
      ],
      "topics": [
        "Community Investment",
        "Volunteering"
      ],
      "likes": 8
    },
    {
      "slug": "fall-company-picnic",
      "title": "Save the date: the fall company picnic",
      "description": "Bring your family and your appetite for food, games and activities.",
      "publishedAt": "2026-08-20",
      "categoryKey": "events",
      "image": "cultural-celebration.jpg",
      "author": {
        "name": "Events Team",
        "initials": "ET"
      },
      "readTime": "1 min read",
      "body": [
        "This year's picnic will take place on a Saturday in October, with food, games and activities for all ages. The exact date and location will be confirmed shortly.",
        "Please save the date. Invitations and a sign-up form will follow."
      ],
      "topics": [
        "Events",
        "Family",
        "Culture"
      ],
      "likes": 20
    },
    {
      "slug": "holiday-party-details",
      "title": "Annual holiday party: location and RSVP details",
      "description": "Join us for an evening to celebrate the year together.",
      "publishedAt": "2026-08-13",
      "categoryKey": "events",
      "image": "river-crossing-family-day.jpg",
      "author": {
        "name": "Events Team",
        "initials": "ET"
      },
      "readTime": "1 min read",
      "body": [
        "The annual holiday party is on the second Thursday of December. Please RSVP by the end of November so that we can plan food and seating.",
        "Partners and guests are welcome. Details on the venue, the dress code and travel are on the event page."
      ],
      "topics": [
        "Events",
        "Holiday",
        "Culture"
      ],
      "likes": 15
    },
    {
      "slug": "ceo-thank-you",
      "title": "A message from our CEO: thank you for a strong year",
      "description": "A short note of thanks to every team across L+M.",
      "publishedAt": "2026-08-06",
      "categoryKey": "leadership",
      "image": "team-celebration.avif",
      "author": {
        "name": "Leadership Team",
        "initials": "LT"
      },
      "readTime": "2 min read",
      "body": [
        "Thank you. Every project delivered, every resident helped and every problem solved this year has come from the work of this team.",
        "As we head into the busy months ahead, please take the time to rest and to recognize the people around you who have made a difference."
      ],
      "topics": [
        "Leadership",
        "Company",
        "Thank you"
      ],
      "likes": 22
    }
  ];

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // "2026-09-15" -> "Sep 15"   (the pages turn "Sep" into "Sept" themselves)
  function shortDate(iso) { var p = iso.split("-"); return MONTHS[+p[1] - 1] + " " + +p[2]; }
  // "2026-09-15" -> "Sep 15, 2026"
  function longDate(iso) { return shortDate(iso) + ", " + iso.split("-")[0]; }

  function byNewest(a, b) { return b.publishedAt.localeCompare(a.publishedAt); }
  function categoryTitle(key) {
    for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].key === key) return CATEGORIES[i].title;
    return "";
  }

  // Each story gets its full photo address.
  STORIES.forEach(function (s) { s.file = s.image; s.image = IMAGE_BASE + s.file; });

  var topStories = TOP_SLUGS.map(function (slug) { return STORIES.filter(function (s) { return s.slug === slug; })[0]; }).filter(Boolean);
  var feedStories = STORIES.filter(function (s) { return TOP_SLUGS.indexOf(s.slug) < 0; }).sort(byNewest);

  // The detail page's link to a story. Pass another base if the article page lives in a different folder.
  function storyHref(story, base) { return (base || "article.html") + "?s=" + story.slug; }

  // Stands in for GET /news/:slug. Related = same category first, then the rest, newest first.
  var COMMENTS = {}; // comments by story slug; a story with no entry has no comments yet
  function getStoryDetail(slug) {
    var story = STORIES.filter(function (s) { return s.slug === slug; })[0];
    if (!story) return undefined;
    var others = STORIES.filter(function (s) { return s.slug !== slug; }).sort(byNewest);
    var related = others.filter(function (s) { return s.categoryKey === story.categoryKey; })
      .concat(others.filter(function (s) { return s.categoryKey !== story.categoryKey; }));
    return Object.assign({}, story, { related: related.slice(0, 3), feed: COMMENTS[slug] || [] });
  }

  // The list pages already work with these three, so they only need one line to use the shared data.
  var list = {
    CATS: ["All"].concat(CATEGORIES.map(function (c) { return c.title; })),
    TOP: topStories.map(function (s) {
      return { slug: s.slug, cat: categoryTitle(s.categoryKey), title: s.title, img: s.file, date: shortDate(s.publishedAt) + " \u00b7 " + s.readTime, excerpt: s.description };
    }),
    NEWS: feedStories.map(function (s) {
      return { slug: s.slug, cat: categoryTitle(s.categoryKey), title: s.title, img: s.file, date: shortDate(s.publishedAt), excerpt: s.description };
    })
  };

  window.NEWS_DATA = {
    categories: CATEGORIES, stories: STORIES, topStories: topStories, feedStories: feedStories,
    categoryTitle: categoryTitle, getStoryDetail: getStoryDetail, storyHref: storyHref,
    shortDate: shortDate, longDate: longDate, imageBase: IMAGE_BASE, list: list
  };
})();
