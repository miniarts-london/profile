export const profile = {
  name: "Kaori Nishimura",
  firstName: "Kaori",
  lastName: "Nishimura",
  title: "Senior Front-End Engineer",
  location: "Enfield, London",
  email: "miniartslondon@gmail.com",
  studio: "MiniArts",
  blog: "https://blog-miniarts.vercel.app/",
  linkedin: "https://www.linkedin.com/in/kaori-nishimura-4089261b",
  summary:
    "Front-End Developer with 18 years' experience building web products, including 7 years working in React. Background spans TypeScript, Angular-to-React migration, and UI development for EdTech, business, and AI software applications, with a consistent focus on performance, accessibility, and collaboration.",
  stats: {
    developerYears: 24,
    frontEndYears: 18,
    reactYears: 7,
    developerSince: "2002",
    frontEndSince: "2008",
    reactSince: "2018",
  },
} as const;

export const achievements = [
  {
    id: "senshine",
    label: "SENshine",
    copy: "Built the interface for SENshine's Claude-powered AI advisory platform using React, TypeScript and Next.js, with a focus on performance and accessibility.",
  },
  {
    id: "intellisense",
    label: "Intellisense.io",
    copy: "Led front-end development and an Angular-to-React migration at Intellisense.io for an AI-powered mining software platform, spanning testing, code review, and cross-functional delivery.",
  },
  {
    id: "voxelfarm",
    label: "VoxelFarm",
    copy: "Contributed to a 3D data visualisation prototype with VoxelFarm and designed complex data displays for technical, decision-critical workflows.",
  },
  {
    id: "testing",
    label: "Testing",
    copy: "Introduced unit and end-to-end testing (React Testing Library, Playwright) to strengthen long-term software reliability and reduce regressions.",
  },
  {
    id: "sectors",
    label: "Scale",
    copy: "Delivered scalable, reusable UI work across finance, government, and insurance sectors, consistently reducing performance issues through disciplined implementation and code review.",
  },
] as const;

export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "core",
    label: "Core stack",
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "Angular-to-React",
      "Redux",
      "Context API",
    ],
  },
  {
    id: "api",
    label: "API & Auth",
    items: [
      "Node",
      "Express",
      "SQL",
      "OAuth 2.0",
      "Dynamics 365",
      "HubSpot",
      "Contentful",
    ],
  },
  {
    id: "quality",
    label: "Testing & quality",
    items: [
      "React Testing Library",
      "Playwright",
      "Performance",
      "Accessibility",
    ],
  },
  {
    id: "ui",
    label: "UI & tooling",
    items: [
      "Material UI",
      "Bootstrap",
      "Tailwind",
      "D3.js",
      "Plottable",
      "NIVO",
      "Gulp",
      "Grunt",
      "Webpack",
    ],
  },
  {
    id: "cloud",
    label: "Cloud environments",
    items: ["AWS", "Azure", "Docker", "Vercel"],
  },
  {
    id: "ai",
    label: "AI tools",
    items: ["Cursor", "Claude", "Copilot"],
  },
];

export type Role = {
  id: string;
  period: string;
  start: string;
  title: string;
  company: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  tags: string[];
  clients?: string[];
};

export const roles: Role[] = [
  {
    id: "senshine",
    period: "10/2024 — now",
    start: "2024",
    title: "Senior Front-End Engineer",
    company: "SENshine",
    current: true,
    summary:
      "Built the interface for a Claude-powered AI advisory platform in React, TypeScript, and Next.js, with a focus on performance, accessibility, and AI-assisted delivery.",
    highlights: [
      "Developed the user interface for a Claude-powered AI advisory platform using TypeScript and Next.js.",
      "Implemented OAuth 2.0 authorization code flow to integrate with Microsoft Dynamics 365, including secure token storage and coordinated refresh of OAuth and internal API tokens.",
      "Integrated with HubSpot to pull customer information into the application.",
      "Reduced performance issues through careful implementation and AI-assisted coding.",
    ],
    tags: [
      "React",
      "TypeScript",
      "Next.js",
      "Vercel",
      "AI",
      "Accessibility",
      "Performance",
      "OAuth 2.0",
      "Dynamics 365",
      "HubSpot",
      "NIVO",
      "Redux",
      "Context API",
      "Material UI",
      "Tailwind",
      "React Testing Library",
      "Playwright",
      "SQL",
      "Node",
      "Express",
      "Azure",
      "Cursor",
      "Claude",
      "Copilot",
      "Docker",
    ],
  },
  {
    id: "intellisense",
    period: "08/2020 — 08/2024",
    start: "2020",
    title: "Software Engineer",
    company: "Intellisense.io",
    summary:
      "Led front-end work for AI mining software — Angular-to-React migration, testing, code review, and a VoxelFarm 3D viewer prototype.",
    highlights: [
      "Led front-end work across React, Angular migration, testing, code review, and cross-functional delivery using TypeScript and Next.js.",
      "Contributed to a 3D viewer prototype with VoxelFarm and designed data displays for technical, decision-critical workflows.",
      "Created unit tests with React Testing Library to keep the product reliable and reduce regressions.",
    ],
    tags: [
      "React",
      "TypeScript",
      "Next.js",
      "Angular-to-React",
      "3D",
      "AI",
      "Testing",
      "D3.js",
      "Plottable",
      "NIVO",
      "Redux",
      "Context API",
      "Material UI",
      "React Testing Library",
      "Playwright",
      "SQL",
      "AWS",
      "Docker",
    ],
  },
  {
    id: "infomentum",
    period: "03/2018 — 08/2020",
    start: "2018",
    title: "UI developer",
    company: "Infomentum",
    summary:
      "Gatsby, React, and WordPress front-end work for client websites, including a new theme for BAE Systems and maintenance for Motability.",
    highlights: [
      "Delivered Gatsby, React, and WordPress front-end work for client websites.",
      "Collaborated on a new theme for BAE Systems.",
      "Maintained the Motability website.",
    ],
    tags: ["Gatsby", "React", "WordPress", "Bootstrap"],
    clients: ["BAE Systems", "Motability"],
  },
  {
    id: "firmstep",
    period: "11/2017 — 02/2018",
    start: "2017",
    title: "Software Developer",
    company: "Firmstep",
    summary:
      "JavaScript and PHP for local government and housing associations, including a forms designer tool, until the company moved to Python.",
    highlights: [
      "Developed a forms designer tool using JavaScript and PHP for local government and housing association clients.",
      "Supported software delivery until the company transitioned to Python.",
    ],
    tags: ["PHP", "JavaScript"],
  },
  {
    id: "uol",
    period: "10/2016 — 05/2017",
    start: "2016",
    title: "Front-end developer",
    company: "University of London",
    summary:
      "Contract work: designed and built the Moodle theme Bloom and tailored existing e-learning themes.",
    highlights: [
      "Developed the new Moodle theme “Bloom”.",
      "Customised existing themes to improve engagement and satisfaction.",
    ],
    tags: ["Moodle", "Front-end", "Bootstrap"],
  },
  {
    id: "avado",
    period: "09/2014 — 09/2016",
    start: "2014",
    title: "Senior front-end developer",
    company: "AVADO",
    summary:
      "Moodle and Sitefinity sites for high-profile learning and membership programmes.",
    highlights: [
      "Developed Moodle and Sitefinity websites for engagement and functionality.",
      "Worked with Google Squared Online, United for Wildlife, the International Olympic Committee, and CIPD.",
    ],
    tags: ["Moodle", "Sitefinity", "Bootstrap"],
    clients: [
      "Google Squared Online",
      "United for Wildlife",
      "International Olympic Committee",
      "CIPD",
    ],
  },
  {
    id: "contractor",
    period: "06/2008 — 09/2014",
    start: "2008",
    title: "Front-end developer",
    company: "Contractor",
    summary:
      "Continuous freelance contracting across media, retail, finance, legal, telecoms, and the public sector.",
    highlights: [
      "Virgin Media: flash animations and online TV front-end development.",
      "John Lewis: new functionality and bug fixes for a more reliable site.",
      "Financial Times: subscription and registration forms and account screens.",
      "Lexis Nexis: front-end work for online dictionary products for lawyers.",
      "The Guardian: microsites for Zurich Insurance and an event calendar.",
      "BT: customer portal interface in .NET.",
      "NHS Counter-fraud: CMS for fraud reports.",
    ],
    tags: [
      "Front-end",
      ".NET",
      "CMS",
      "Bootstrap",
      "WordPress",
      "Gulp",
      "Grunt",
      "Webpack",
    ],
    clients: [
      "Virgin Media",
      "John Lewis",
      "Financial Times",
      "Lexis Nexis",
      "The Guardian",
      "BT",
      "NHS Counter-fraud",
    ],
  },
  {
    id: "jri",
    period: "07/2002 — 06/2007",
    start: "2002",
    title: "Software Developer",
    company: "JRI Europe (Japan Research Institute)",
    summary:
      "E-finance and accounting systems for Japanese companies operating in Singapore, London, and Europe.",
    highlights: [
      "Developed an e-finance project in .NET to upgrade client systems.",
      "Customised and maintained JASPER and PORTFOLIO accounting systems.",
      "Supported financial reporting for Japanese companies across Singapore, London, and Europe.",
    ],
    tags: [".NET", "Finance", "SQL"],
    clients: [
      "Panasonic",
      "OCS Europe Ltd",
      "Nikkei Europe Ltd",
      "Nippon Oil Ltd",
      "SUMITOMO",
    ],
  },
];

export type EducationItem = {
  id: string;
  award: string;
  school: string;
  place: string;
  note: string;
};

export const education: EducationItem[] = [
  {
    id: "phd",
    award: "MPhil/PhD in Computer Science",
    school: "Anglia Ruskin University",
    place: "Cambridge",
    note: "Research in language processing and voice recognition for web-based systems, using VXML and neural networks. Studies could not be finished due to cost.",
  },
  {
    id: "msc",
    award: "MSc in Computing",
    school: "Oxford Brookes University",
    place: "Headington, Oxford",
    note: "Specialised in Artificial Intelligence and Software Engineering. Distinction for a dissertation on Natural Language Processing and Java-based AI.",
  },
  {
    id: "ba",
    award: "BA in Language Studies (2:1)",
    school: "Essex University",
    place: "Colchester, Essex",
    note: "Dissertation in Prolog and Natural Language Processing (Distinction).",
  },
];

export const languages = [
  { id: "ja", name: "Japanese", level: "First language" },
  { id: "en", name: "English", level: "C1 Advanced" },
] as const;

export const life = {
  heading: "Off the screen",
  copy: "I am a keen equestrian and participate in dressage and show-jumping competitions with my own horse. I have the British Horse Society Stage 2 qualification. I feel passionate about animal welfare, and volunteer and donate to charity organisations.",
};

export const navItems = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "study", label: "Study" },
  { id: "life", label: "Life" },
  { id: "contact", label: "Contact" },
] as const;
