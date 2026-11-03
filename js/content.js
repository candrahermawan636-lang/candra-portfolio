/*
 * CONTENT FILE — edit everything about the site here.
 *
 * IMAGES  → stored in this project:  local: "public/images/..."   (drive = original's Drive ID, used only by scripts/download_media.py)
 * VIDEOS  → hosted externally and embedded (keeps the site light). Pick ONE source per video:
 *     host: "drive"   + drive: "<Drive file ID>"      (current; file must stay shared "Anyone with the link")
 *     host: "youtube" + youtube: "<YouTube video ID>"  (recommended long-term: unlisted upload)
 *     host: "file"    + src: "https://…/video.mp4"     (your own CDN / storage; plays in a native HTML5 player)
 *   Optional per video: ratio: "16/9" | "9/16" | "4/3"   and   poster: "public/images/posters/x.jpg"
 *
 * Contact fields: leave "" until you have real details. Empty fields render as
 * "Not added yet" (never invented).
 */
window.SITE = {
  name: "Candra Hermawan",
  location: "Kuningan, West Java, Indonesia",
  timezone: "Asia/Jakarta",
  positioning: "CRM & Operations | Digital Content Production",

  hero: {
    label: "CRM & OPERATIONS / DIGITAL CONTENT",
    headline: ["Building systems.", "Creating experiences."],
    description:
      "I work across CRM operations, digital workflows, customer support, and content production — combining structured thinking with creative execution.",
    primaryCta: "Explore My Work",
    secondaryCta: "Contact Me",
  },

  stats: [
    { value: 5, suffix: "", unit: "Months", label: "Streamer Academy Experience" },
    { value: 4, suffix: "", unit: "Months", label: "Internship Experience" },
    { value: 2, suffix: "", unit: "Core Areas", label: "Operations & Digital Content" },
  ],

  about: {
    title: "Operations discipline. Creative instinct.",
    paragraphs: [
      "I'm Candra Hermawan, based in Kuningan, West Java. My work sits where structured operations meet digital creativity: managing CRM conversations and student follow-ups on one side, producing educational and promotional video on the other.",
      "I have practical experience in CRM operations, student management, customer support, data tracking, reporting, administrative operations, AI-assisted workflows, and digital video production.",
      "That mix lets me keep a process organised, measure it in a spreadsheet, and then turn it into content people actually watch.",
    ],
    pillars: [
      { title: "Operational", text: "CRM, follow-ups, onboarding, administration." },
      { title: "Technical", text: "Reporting, data tracking, troubleshooting." },
      { title: "Creative", text: "Scripting, editing, AI-assisted production." },
    ],
  },

  experience: [
    {
      role: "CRM & Operations / Digital Support",
      org: "Streamer Academy",
      meta: "Remote · 2026 – Present",
      points: [
        "CRM management and student follow-ups.",
        "Student progress monitoring.",
        "REG and FTD reporting.",
        "Student interview and onboarding support.",
        "Educational video production.",
        "Promotional video production.",
        "AI-assisted content and workflow support.",
      ],
    },
    {
      role: "Internship — Technical Support & Administration",
      org: "PT Replay Inti Media",
      meta: "2025 · 4 Months",
      points: [
        "Customer service.",
        "Wi-Fi and computer troubleshooting.",
        "Client data entry.",
        "Promotional support.",
        "Administrative tasks.",
      ],
    },
  ],

  /* ---------- MEDIA REGISTRY (real files from the Google Drive folder) ---------- */
  media: {
    profile: {
      type: "image", fit: "cover",
      local: "public/images/profile/profile-candra-01.jpg",
      drive: "1cmaf2oNraEnQL3PoIx7n2EZSGncmVuZz",
      alt: "Portrait of Candra Hermawan",
    },
    crm1: {
      type: "image", fit: "contain",
      local: "public/images/crm/chatterfy-crm-dashboard-01.jpg",
      drive: "1jFr6eWqIhj3-g7G8tgMolbqnmj44msFI",
      alt: "Chatterfy analytics dashboard showing chat volume by day, week and month",
      caption: "Chatterfy analytics — chat volume tracking",
    },
    crm2: {
      type: "image", fit: "contain",
      local: "public/images/crm/chatterfy-crm-dashboard-02.jpg",
      drive: "1GPyuCjxAcO2pDXjjFQn7ut9e2d-ED4Bz",
      alt: "Chatterfy flow builder with message, tag, delay and webhook steps",
      caption: "Chatterfy flow builder — automated follow-up steps",
    },
    sheet1: {
      type: "image", fit: "contain",
      local: "public/images/reporting/google-sheets-reg-ftd-01.jpg",
      drive: "1jM7RMXfJHhqxaXJYjEXfyq5xXD2VtIYQ",
      alt: "Google Sheets report with monthly schedule and daily numbers per team member",
      caption: "Google Sheets — monthly schedule and daily reporting",
    },
    sheet2: {
      type: "image", fit: "contain",
      local: "public/images/reporting/google-sheets-reg-ftd-02.jpg",
      drive: "1KSF_Y7dANjHvNgWtBf1jR8cnEcdYL91T",
      alt: "Google Sheets student tracker with dates, status, actions and follow-up comments",
      caption: "Google Sheets — student tracking and follow-up log",
    },
    edu1: {
      type: "video", host: "drive", ratio: "16/9",
      drive: "1OMyFFkr4OtilrI9bHSqFRw773DyXrjvy",
      alt: "Educational video module — clip 1",
      caption: "Educational module — clip 1",
    },
    edu2: {
      type: "video", host: "drive", ratio: "16/9",
      drive: "1Z36LE-ioiC5LT5gBu0CvRshw_-gk1PK0",
      alt: "Educational video module — clip 2",
      caption: "Educational module — clip 2",
    },
    edu3: {
      type: "video", host: "drive", ratio: "16/9",
      drive: "1zBlUt0dosRZGx_nVCnkts-N5PZ1UzCWz",
      alt: "Educational video module — clip 3",
      caption: "Educational module — clip 3",
    },
    promo1: {
      type: "video", host: "drive", ratio: "16/9",
      drive: "1AiKw2gtg5gUm-jtNJDdkYqA_1nCjpE83",
      alt: "Streamer Academy promotional video",
      caption: "Streamer Academy promotional video",
    },
    cut1: {
      type: "image", fit: "contain",
      local: "public/images/editing/capcut-editing-timeline-01.jpg",
      drive: "1uNiR4n2NK26LYb7HB0KnCMypvjBoXUpS",
      alt: "CapCut editing timeline",
      caption: "CapCut editing timeline",
    },
    cut2: {
      type: "image", fit: "contain",
      local: "public/images/editing/capcut-editing-timeline-02.jpg",
      drive: "1Slmrb6_STDRdakpisdnLHGSrPluCgqre",
      alt: "CapCut editing timeline, second project",
      caption: "CapCut editing timeline — second view",
    },
    tech1: {
      type: "image", fit: "cover",
      local: "public/images/support/technical-support-pkl-01.jpg",
      drive: "1Y-20EaSfF2J6teZoX6IorKhmWXw1nXJO",
      alt: "Technical support work during internship",
      caption: "Internship — technical support",
    },
    tech2: {
      type: "image", fit: "cover",
      local: "public/images/support/technical-support-pkl-02.jpg",
      drive: "1LmiIOR8dOExNixH0DO4-aBct4R9NZ7aw",
      alt: "Technical support work during internship, second photo",
      caption: "Internship — technical support (2)",
    },
    tech3: {
      type: "image", fit: "cover",
      local: "public/images/support/technical-support-pkl-03.jpg",
      drive: "16jWgxizaAoCGLsV5EDE_iXP5Uz_dH5uD",
      alt: "Technical support work during internship, third photo",
      caption: "Internship — technical support (3)",
    },
    onboarding1: {
      type: "image", fit: "contain",
      local: "public/images/onboarding/student-interview-google-meet-01.jpg",
      alt: "Student interview session via Google Meet",
      caption: "Student interview — Google Meet",
    },
  },

  projects: [
    {
      id: "01",
      title: "CRM & Student Management",
      short: "Chatterfy CRM, student communication, and follow-up management.",
      long:
        "Day-to-day CRM management for Streamer Academy: keeping student conversations organised in Chatterfy, following up with each student, and working with automated message flows so nobody falls through the cracks.",
      category: "CRM & Operations",
      tools: ["Chatterfy", "Telegram"],
      media: ["crm1", "crm2"],
    },
    {
      id: "02",
      title: "Student Tracking & Reporting",
      short: "Google Sheets, REG and FTD tracking, and progress reporting.",
      long:
        "Spreadsheet-based tracking of student progress, with REG and FTD reporting and follow-up notes kept in one shared place so the team can see status at a glance.",
      category: "Data & Reporting",
      tools: ["Google Sheets", "Google Workspace"],
      media: ["sheet1", "sheet2"],
    },
    {
      id: "03",
      title: "Educational Video Production",
      short: "Educational video modules from scripting to editing and final production.",
      long:
        "Educational modules for students, produced end to end: scripting, AI-assisted drafting, editing, and final export.",
      category: "Digital Content",
      tools: ["CapCut", "AI-assisted tools"],
      media: ["edu1", "edu2", "edu3", "cut1"],
    },
    {
      id: "04",
      title: "Promotional Video Production",
      short: "Promotional content for Streamer Academy.",
      long:
        "Promotional video content created for Streamer Academy, edited in CapCut with AI-assisted workflow support.",
      category: "Digital Content",
      tools: ["CapCut", "AI-assisted tools"],
      media: ["promo1", "cut2"],
    },
    {
      id: "05",
      title: "Student Interview & Onboarding",
      short: "Student interviews, onboarding, and communication workflows.",
      long:
        "Supporting student interviews and onboarding: first contact, setting expectations, and keeping communication clear through the first steps.",
      category: "CRM & Operations",
      tools: ["Google Meet", "Telegram"],
      media: ["onboarding1"],
    },
    {
      id: "06",
      title: "Technical Support",
      short: "Computer troubleshooting, Wi-Fi troubleshooting, and customer service.",
      long:
        "Hands-on technical support during the PT Replay Inti Media internship: computer and Wi-Fi troubleshooting, helping customers, and supporting client administration.",
      category: "Technical Support",
      tools: ["Hardware troubleshooting", "Wi-Fi & basic networking"],
      media: ["tech1", "tech2", "tech3"],
    },
  ],

  expertise: [
    {
      title: "CRM & Operations",
      items: ["CRM Management", "Student Follow-up", "Customer Support", "Student Onboarding", "Operational Administration"],
    },
    {
      title: "Data & Reporting",
      items: ["Google Sheets", "Data Entry", "Progress Tracking", "Reporting"],
    },
    {
      title: "Digital Content",
      items: ["Video Editing", "Educational Video Production", "Promotional Video Production", "AI-Assisted Content Creation"],
    },
    {
      title: "Technical",
      items: ["Computer Troubleshooting", "Wi-Fi Troubleshooting", "Basic Networking"],
    },
  ],

  tools: [
    "Chatterfy", "Google Sheets", "Google Workspace", "Telegram", "Google Meet", "CapCut",
    "ChatGPT", "Claude AI", "DeepSeek", "Gemini", "Google Flow", "ElevenLabs",
  ],

  contact: {
    headline: ["Have a project in mind?", "Let's connect."],
    email: "",     // e.g. "name@example.com"
    whatsapp: "",  // full URL, e.g. "https://wa.me/62..."
    linkedin: "",  // full URL
    github: "",    // full URL
  },
};
