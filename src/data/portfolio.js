// Edit this file to update all public-facing profile, work and skill content.
// Role positioning is aspirational: professional titles and project statuses follow the resume.
export const profile = {
  name: 'Isaac Greyole S. Balingit',
  role: 'Software Engineer · Enterprise Integrations',
  targetRole: 'Forward Deployed Engineer',
  location: 'Philippines',
  email: 'MrGrey.Biz@gmail.com',
  phone: '+63 960 0283 349',
  website: 'https://isaacbalingit.netlify.app/',
  github: 'https://github.com/isaacGrey',
  tiktok: 'https://www.tiktok.com/@iceboxxxb',
  resume: '/Isaac_Greyole_Balingit_Resume.pdf',
};

export const navigation = [
  { id: 'home', label: 'Overview', index: '00' },
  { id: 'about', label: 'How I Work', index: '01' },
  { id: 'experience', label: 'Experience', index: '02' },
  { id: 'projects', label: 'Selected Work', index: '03' },
  { id: 'stack', label: 'Capabilities', index: '04' },
  { id: 'achievements', label: 'Recognition', index: '05' },
  { id: 'certifications', label: 'Credentials', index: '06' },
  { id: 'tiktok', label: 'Beyond Code', index: '07' },
  { id: 'contact', label: 'Contact', index: '08' },
];

export const about = {
  heading: 'Close to the problem. Close to the solution.',
  subtitle: 'Engineering depth, business context, and the ability to work with people who use the software.',
  paragraphs: [
    [
      { text: 'I am a software engineer focused on ' },
      { text: 'enterprise integrations, practical implementation, and client-facing solution delivery.', strong: true },
      { text: ' I work with 1C:Enterprise and AccountingSuite to translate operational needs into workflows, reports, access controls, and connected systems.' },
    ],
    [
      { text: 'My work goes beyond writing code. I collaborate with sales and implementation teams, join client presentations, and demonstrate technical solutions in terms of their business use cases. I have built REST and OData services, connected 1C with Trello, and worked through deployment and integration issues.' },
    ],
    [
      { text: 'I am now pursuing ' },
      { text: 'Forward Deployed Engineering and Solutions Engineering roles', strong: true },
      { text: ' where I can combine hands-on development, technical communication, fast iteration, and ownership of real customer problems. I also use AI coding agents and LLM tools to accelerate development, debugging, and iteration—while keeping engineering judgment and validation in the loop.' },
    ],
  ],
  facts: [
    ['Current role', 'DevOps Officer · eMBM'],
    ['Target role', 'Forward Deployed Engineer'],
    ['Specialty', 'Enterprise integrations'],
    ['Location', 'Philippines'],
    ['Languages', 'English · Filipino · Russian'],
  ],
};

export const approach = [
  { step: '01', title: 'Understand the workflow', description: 'Work with business stakeholders and delivery teams to clarify requirements, constraints, and the actual user problem.' },
  { step: '02', title: 'Connect the systems', description: 'Design API and data integrations across ERP, external platforms, and application workflows.' },
  { step: '03', title: 'Build and troubleshoot', description: 'Ship tailored functionality, investigate permissions and environment issues, and iterate with practical feedback.' },
  { step: '04', title: 'Demonstrate and enable', description: 'Explain capabilities in client demos, collaborate on implementation, and help people understand what was delivered.' },
];

export const experience = [
  {
    role: 'DevOps Officer',
    date: 'Jun 2025 – Present',
    company: 'eMBM Services OPC · Philippines',
    description: 'Build and customize AccountingSuite ERP solutions around business requirements. Develop REST and OData services and third-party integrations, including 1C ↔ Trello; deliver BIR-related reporting, approvals, and access controls. Join sales and implementation teams for client demos and requirements discussions, and troubleshoot integration, permission, and deployment issues.',
    highlights: [
      'Translate operational requirements into ERP workflows, financial reports, and compliance modules.',
      'Build REST/OData interfaces and third-party integrations, including the 1C–Trello connection.',
      'Demonstrate solutions with sales and implementation teams in client-facing presentations.',
      'Troubleshoot APIs, role-based access, application settings, and deployments.'
    ],
    tags: ['Client Demos', 'REST / OData', '1C ↔ Trello', 'ERP Customization', 'Solution Delivery'],
  },
  {
    role: 'Software Development',
    date: 'Jan 2024 – Mar 2025',
    company: '1C Company · Russia',
    description: 'Contributed to enterprise application development within the 1C ecosystem, building experience with business logic, application architecture, and structured delivery of business-oriented software.',
    tags: ['1C:Enterprise', 'Enterprise Applications', 'Business Logic'],
  },
  {
    role: 'Sales Associate / Assistant Manager',
    date: 'May 2022 – Nov 2023',
    company: 'Kiddy Zone · Qatar',
    description: 'Supported sales, customer communication, and daily operations in a client-facing environment. This experience complements my engineering background with direct exposure to customer needs and service delivery.',
    tags: ['Customer Communication', 'Sales', 'Operations'],
  },
  {
    role: 'Software Developer',
    date: 'Jan 2020 – Nov 2021',
    company: 'Shift101 · Philippines',
    description: 'Worked on web and database-backed applications, user interfaces, and mobile-related development using C#, WinForms, PHP, Laravel, React, Tailwind CSS, and Microsoft SQL Server.',
    tags: ['C#', 'React', 'PHP / Laravel', 'SQL', 'Application Development'],
  },
];

// Work is ordered for FDE relevance, not by date. Do not add outcome metrics without evidence.
// For each project: set cover to '/projects/folder/cover.webp' and add screenshots
// as [{ src: '/projects/folder/screen.webp', alt: '...', caption: '...' }].
// See PROJECT_PHOTOS_GUIDE.md for optional details fields and image setup.
export const projects = [
  {
    cover: '/projects/her-ugc/creator-dashboard.webp',
    screenshots: [
      { src: '/projects/her-ugc/creator-dashboard.webp', alt: 'HER UGC creator dashboard', caption: 'Creator workspace overview' },
      { src: '/projects/her-ugc/opportunities.webp', alt: 'HER UGC campaign discovery page', caption: 'Campaign discovery' },
    ],
    number: '01',
    type: 'SAAS / CLIENT SOLUTIONS',
    categories: ['SAAS', 'WEB'],
    title: 'Her Opportunity Portal · Her UGC Academy',
    description: 'Private creator–brand marketplace developed collaboratively for invitation-based access, creator and brand profiles, campaign discovery, and administrative operations.',
    challenge: 'Bring creators, vetted brands, and campaign opportunities into one managed platform.',
    delivered: 'Built core onboarding, role-based authentication, profiles, discovery, and admin workflows using Next.js, TypeScript, and Supabase.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'RBAC', 'AI-assisted development'],
    status: 'Core platform built · Stripe and social APIs pending',
    href: 'https://her-ugc-demo.vercel.app/',
    action: 'View demo',
    featured: true,
    icon: 'users',
  },
  {
    cover: '/projects/accountingsuite/accountingsuite.jpg',
    coverFit: 'contain',
    screenshots: [],
    number: '02',
    type: 'INTEGRATIONS / ENTERPRISE',
    categories: ['INTEGRATIONS', 'ENTERPRISE'],
    title: '1C AccountingSuite ↔ Trello',
    description: 'API-based integration connecting the 1C ERP environment with Trello so project-management workflows can communicate with enterprise business systems.',
    challenge: 'Bridge business data and work management across separate applications.',
    delivered: 'Developed a third-party API integration between 1C AccountingSuite and Trello.',
    stack: ['1C:Enterprise', 'REST APIs', 'Trello', 'JSON', 'Systems Integration'],
    status: 'Enterprise integration',
    note: 'Professional work · Details shared at a high level',
    featured: true,
    icon: 'workflow',
  },
  {
    cover: '/projects/accountingsuite/accountingsuite.jpg',
    coverFit: 'contain',
    screenshots: [],
    number: '03',
    type: 'ENTERPRISE / IMPLEMENTATION',
    categories: ['ENTERPRISE', 'INTEGRATIONS'],
    title: 'AccountingSuite Customizations',
    description: 'Business-specific ERP extensions spanning Philippine tax reporting, financial reporting, approval processes, role-based access, and custom REST/OData interfaces.',
    challenge: 'Adapt an ERP platform to operational requirements and local compliance workflows.',
    delivered: 'Engineered reporting modules, approval flows, access rules, and integration endpoints; supported troubleshooting and client demonstrations.',
    stack: ['1C:Enterprise', 'AccountingSuite', 'OData', 'REST', 'BIR Reporting', 'RBAC'],
    status: 'Enterprise solution delivery',
    note: 'Professional work · Proprietary implementation',
    featured: true,
    icon: 'database',
  },
  {
    cover: null,
    screenshots: [],
    number: '04',
    type: 'SAAS / BUSINESS APPLICATION',
    categories: ['SAAS', 'WEB'],
    title: 'Payroll SaaS',
    description: 'Full-stack payroll application designed for small businesses, including employee management, salary calculation, and tax-compliance workflows.',
    challenge: 'Make recurring payroll tasks more structured and manageable.',
    delivered: 'Ongoing development of application workflows using Laravel, React, and MySQL.',
    stack: ['Laravel', 'React', 'MySQL', 'Business Workflows'],
    status: 'In development',
    note: 'Ongoing · Private repository',
    icon: 'wallet',
  },
  {
    cover: '/projects/al-palms/campus-dashboard.webp',
    screenshots: [
      { src: '/projects/al-palms/campus-dashboard.webp', alt: 'Al-PALMS campus administration dashboard', caption: 'Campus administration dashboard' },
      { src: '/projects/al-palms/student-directory.webp', alt: 'Al-PALMS student directory with sample records', caption: 'Student directory' },
    ],
    number: '05',
    type: 'WEB / EDUCATION',
    categories: ['WEB'],
    title: 'Al-PALMS · Academic Information',
    description: 'Database-driven academic information platform supporting student records, school data, and academic administration.',
    challenge: 'Organize institutional information into accessible workflows.',
    delivered: 'Developed application functionality using Node.js, React, and MySQL.',
    stack: ['Node.js', 'React', 'MySQL'],
    href: 'https://al-palms-demo.vercel.app/',
    action: 'View demo',
    icon: 'graduation',
  },
  {
    cover: null,
    screenshots: [],
    number: '06',
    type: 'WEB / OPERATIONS',
    categories: ['WEB'],
    title: 'Siena College · Equipment Management',
    description: 'Equipment borrowing and monitoring system supporting request management, borrowing records, and inventory tracking.',
    challenge: 'Replace scattered borrowing records with an application workflow.',
    delivered: 'Developed a Node.js, React, and MySQL application for equipment management.',
    stack: ['Node.js', 'React', 'MySQL'],
    note: 'No public project link',
    icon: 'boxes',
  },
  {
    cover: '/projects/1c-workshops/workshop.webp',
    screenshots: [
      { src: '/projects/1c-workshops/workshop.webp', alt: 'Title slide from the 1C Solutions Workshop video', caption: '1C Solutions Workshop opening slide' },
    ],
    number: '07',
    type: 'ENABLEMENT / EDUCATION',
    categories: ['ENABLEMENT'],
    title: '1C Workshops & Skills Camp',
    description: 'Technical workshops and hands-on learning sessions teaching 1C:Enterprise through practical exercises, mentoring, code reviews, and hackathon-style activities.',
    challenge: 'Help learners understand and apply unfamiliar enterprise development tools.',
    delivered: 'Led workshops, explained technical concepts, and supported learners through exercises and reviews.',
    stack: ['Technical Demonstrations', 'Mentoring', '1C:Enterprise', 'Communication'],
    href: 'https://www.youtube.com/watch?v=bGuVVKS4CQY',
    action: 'Watch workshop',
    icon: 'presentation',
  },
  {
    cover: '/projects/1c-mentorship/meet-the-mentors.webp',
    screenshots: [
      { src: '/projects/1c-mentorship/meet-the-mentors.webp', alt: 'Isaac Greyole Balingit in the 1C Skills Camp 2021 mentor introduction', caption: 'Meet the Mentors at 1C Skills Camp 2021' },
    ],
    number: '08',
    type: 'ENABLEMENT / EDUCATION',
    categories: ['ENABLEMENT'],
    title: '1C Skills Camp · Mentorship',
    description: 'Intensive developer enablement involving 1C programming activities, code reviews, and competition-style exercises.',
    stack: ['Mentorship', 'Developer Education', '1C:Enterprise'],
    href: 'https://www.youtube.com/watch?v=afhhA5b-opc',
    action: 'Watch session',
    icon: 'users',
  },
  {
    cover: '/projects/1c-online-courses/course-lesson.webp',
    screenshots: [
      { src: '/projects/1c-online-courses/course-lesson.webp', alt: '1C:Enterprise video lesson on modifying standard configurations', caption: 'Modifying standard configurations in 1C:Enterprise' },
    ],
    number: '09',
    type: 'ENABLEMENT / CONTENT',
    categories: ['ENABLEMENT'],
    title: '1C Online Courses',
    description: 'Video course series introducing 1C:Enterprise programming concepts and practical application development.',
    stack: ['1C:Enterprise', 'Teaching', 'Video Production'],
    href: 'https://skillshub.1c-dn.com/',
    action: 'Explore courses',
    icon: 'video',
  },
  {
    cover: '/projects/international-skills-competitions/championship.webp',
    coverPosition: 'center 26%',
    screenshots: [
      { src: '/projects/international-skills-competitions/championship.webp', alt: 'Isaac Greyole Balingit with the Philippine flag, medal, and diploma at the 2024 championship', caption: 'The Professionals 2024 Championship' },
    ],
    number: '10',
    type: 'RECOGNITION / ENTERPRISE',
    categories: ['ENTERPRISE'],
    title: 'International Skills Competitions',
    description: 'Recognized across professional software development and technical skills competitions in St. Petersburg, Hanoi, and Moscow.',
    stack: ['1C:Enterprise', 'Technical Problem Solving', 'Software Development'],
    href: 'https://1c-dn.com/news/the_professionals_2024_championship_finals/',
    action: 'Read competition coverage',
    icon: 'trophy',
  },
  {
    cover: '/projects/getfoodie/customer-discovery.webp',
    screenshots: [
      { src: '/projects/getfoodie/customer-discovery.webp', alt: 'GetFoodie customer workspace for browsing restaurants and dishes', caption: 'Customer food discovery' },
      { src: '/projects/getfoodie/restaurant-dashboard.webp', alt: 'GetFoodie restaurant dashboard with the order queue and menu availability', caption: 'Restaurant order management' },
    ],
    number: '11',
    type: 'WEB / E-COMMERCE',
    categories: ['WEB'],
    title: 'Getfoodie.online',
    description: 'Food delivery web application with administration dashboards, rider tracking, and email verification workflows.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    href: 'https://getfoodie-demo.vercel.app/',
    action: 'View demo',
    icon: 'shopping',
  },
  {
    cover: '/projects/haringtari/operations-overview.webp',
    screenshots: [
      { src: '/projects/haringtari/operations-overview.webp', alt: 'HariNgTari operations overview with fictional event summaries', caption: 'Operations overview' },
      { src: '/projects/haringtari/event-directory.webp', alt: 'HariNgTari event directory with fictional schedules and statuses', caption: 'Event directory' },
    ],
    number: '12',
    type: 'WEB / PLATFORM',
    categories: ['WEB'],
    title: 'HariNgTari',
    description: 'Prototype involving real-time event management, odds, agent commissions, and payout workflows.',
    stack: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
    href: 'https://haringtari-demo.vercel.app/',
    action: 'View demo',
    icon: 'workflow',
  },
  {
    cover: '/projects/stratify-pos/point-of-sale.webp',
    screenshots: [
      { src: '/projects/stratify-pos/point-of-sale.webp', alt: 'StratifyPOS checkout workspace with a café menu and order panel', caption: 'Point-of-sale workspace' },
      { src: '/projects/stratify-pos/business-dashboard.webp', alt: 'StratifyPOS dashboard with simulated sales and recent transactions', caption: 'Business dashboard' },
      { src: '/projects/stratify-pos/inventory.webp', alt: 'StratifyPOS inventory workspace with stock levels and reorder alerts', caption: 'Inventory management' },
    ],
    number: '13',
    type: 'WEB / POINT OF SALE',
    categories: ['SAAS', 'WEB'],
    title: 'StratifyPOS',
    description: 'Interactive café point-of-sale demo with sample orders, menu management, inventory tracking, and sales reporting.',
    stack: ['Point of Sale', 'Inventory Management', 'Sales Reporting'],
    href: 'https://stratify-pos-demo.vercel.app/',
    action: 'View demo',
    icon: 'wallet',
  },
];

export const projectFilters = [
  { label: 'All work', value: 'ALL' },
  { label: 'Integrations', value: 'INTEGRATIONS' },
  { label: 'Enterprise', value: 'ENTERPRISE' },
  { label: 'SaaS', value: 'SAAS' },
  { label: 'Enablement', value: 'ENABLEMENT' },
  { label: 'Web', value: 'WEB' },
];

export const technologyGroups = [
  { title: 'Client-Facing Solution Delivery', icon: 'handshake', items: ['Client Demos', 'Requirements Discovery', 'Cross-functional Delivery', 'Stakeholder Communication', 'Implementation Support', 'Technical Troubleshooting'] },
  { title: 'ERP & Integration Engineering', icon: 'layers', items: ['1C:Enterprise', 'AccountingSuite', 'REST APIs', 'OData', 'Third-Party Integrations', 'Workflow Automation', 'JSON / XML', 'Access Control'] },
  { title: 'AI & Agentic Development', icon: 'bot', items: ['ChatGPT', 'Google Gemini', 'Claude Code', 'OpenAI Codex', 'Agentic Coding Workflows', 'AI-assisted Debugging', 'Code Review & Refactoring'] },
  { title: 'Web & Programming', icon: 'code', items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'C#', 'PHP', 'Laravel', 'AngularJS', 'Tailwind CSS'] },
  { title: 'Data & Infrastructure', icon: 'database', items: ['SQL', 'MS SQL Server', 'PostgreSQL', 'MySQL', 'Oracle', 'SQLite', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'IIS', 'Apache'] },
  { title: 'Additional Technologies', icon: 'mobile', items: ['Flutter', 'Kotlin', 'Firebase', 'WinForms', 'HTML / CSS', 'Bootstrap'] },
  { title: 'Languages', icon: 'globe', items: ['English — Fluent', 'Filipino / Tagalog — Native', 'Russian — Conversational'] },
];

// Dates match the supplied updated resume rather than the older site copy.
export const achievements = [
  { rank: '1st', title: 'The Professionals', detail: 'St. Petersburg', year: '2023' },
  { rank: '2nd', title: 'The Professionals', detail: 'St. Petersburg', year: '2022' },
  { rank: '1st', title: 'Hackathon', detail: 'Hanoi', year: '2022' },
  { rank: '1st', title: 'WorldSkills Russia', detail: 'Moscow', year: '2019' },
  { rank: '1st', title: 'Bulacan Provincial Skills Competition', detail: 'Provincial skills competition', year: '2018' },
  { rank: '3rd', title: 'Regional Skills Competition', detail: 'Regional skills competition', year: '2018' },
];

export const certifications = [
  {
    issuer: 'TestDome', title: 'Software Engineering', description: 'Software Engineering assessment credential.',
    links: [
      { label: 'View certificate', href: 'https://www.testdome.com/certificates/25331a62e680410b910ad258f7545918', primary: true },
      { label: 'Assessment details', href: 'https://www.testdome.com/tests/software-engineering-online-test/124' },
    ], icon: 'badge',
  },
  {
    issuer: 'AccountingSuite', title: 'AccountingSuite Software', description: 'Professional platform certificate.',
    links: [{ label: 'View certificate', href: 'https://pdfhost.io/v/CZbTjtzAE2_AccountingSuite_Certificate_Isaac_Greyole_Balingit', primary: true }], icon: 'file',
  },
];
