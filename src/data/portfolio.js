export const profile = {
  name: "Umesh Khatavkar",
  title: "Tech Lead | Senior Backend Engineer",
  location: "Mumbai, Maharashtra, India",
  summary:
    "Backend-focused Tech Lead with 8+ years of experience designing and delivering scalable enterprise applications across fintech and edtech domains. Expertise in Node.js, Express.js, Python, FastAPI, PostgreSQL, AWS, Docker, Microservices, and System Design.",
  shortSummary:
    "Backend-focused Tech Lead with 8+ years of experience building scalable enterprise applications across fintech and edtech.",
  resumePath: "./src/assets/Umesh-Khatavkar-Resume.pdf",
  profileImage: "./src/assets/umesh-khatavkar.jpeg",
  rotatingRoles: [
    "Backend Engineer",
    "Tech Lead",
    "Microservices Architect",
    "System Design Enthusiast",
    "Performance Optimization",
    "Building Scalable APIs",
  ],
  floatingTags: ["Node.js", "Python", "AWS", "Redis", "PostgreSQL", "Microservices"],
};

export const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "100K+", label: "Users Supported" },
  { value: "30–40%", label: "API Latency Reduction" },
  { value: "50–60%", label: "Response Time Reduction" },
  { value: "15%", label: "Deployment Efficiency Improvement" },
];

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "WiZR | Eduvanz Financing Pvt. Ltd.",
    location: "Mumbai",
    period: "Aug 2024 – Present",
    isCurrent: true,
    achievements: [
      "Engineered distributed backend services for multiple modules, reducing API latency by 30–40% and supporting a scalable platform serving over 100,000+ users.",
      "Designed and implemented multi-tenant SaaS architecture with plug-and-play business logic and configuration-driven workflows, improving client customization efficiency by 10%.",
      "Implemented a Redis-based client-specific caching layer for the product catalog API, reducing response time by 50–60% and significantly lowering database load.",
      "Designed and implemented asynchronous email and assessment notification workflows using RabbitMQ, improving application responsiveness and ensuring reliable message delivery.",
      "Delivered targeted enhancements to React-based user interfaces and optimized frontend-backend API integrations.",
      "Collaborated with DevOps teams to automate GitHub and Jenkins CI/CD pipelines, reducing deployment dependencies and improving deployment efficiency by 15%.",
      "Diagnosed and resolved production incidents using system-level debugging, reducing resolution time and restoring service stability.",
    ],
    tags: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "AWS",
      "Docker",
      "React",
      "CI/CD",
    ],
  },
  {
    role: "Software Engineer",
    company: "Eduvanz Financing Pvt. Ltd.",
    location: "Mumbai",
    period: "Jun 2018 – Jul 2024",
    isCurrent: false,
    achievements: [
      "Built and maintained backend systems powering fintech products and lending workflows.",
      "Designed enterprise-grade REST APIs and microservices for customer onboarding and financial operations.",
      "Led integrations with payment gateways and external platforms.",
      "Conducted code reviews, production deployments, troubleshooting, and mentoring activities.",
    ],
    tags: [
      "Node.js",
      "Express.js",
      "JavaScript",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
      "Microservices",
    ],
  },
];

export const projects = [
  {
    title: "Frontline Microsites for Corporates",
    description:
      "Designed and developed multilingual corporate microsites with AI-powered one-way and two-way communication capabilities. Worked closely with AI engineers to design, integrate, and launch AI-driven engagement features.",
  },
  {
    title: "Frontline Analytics Portal",
    description:
      "Designed and developed backend APIs, onboarding workflows, and analytics dashboards. Enabled enterprise reporting and improved visibility into employee learning and engagement metrics.",
  },
  {
    title: "WiZR – Merchant Integration & CMS Platform",
    description:
      "Designed uniform backend APIs to integrate with multiple merchants using key-based authentication systems. Designed and developed a CMS to support the business team in maintaining course catalog operations.",
  },
  {
    title: "Unified Education & Career Platform",
    description:
      "Developed backend services supporting 100,000+ users to explore educational courses, skill programs, and institutional details. Improved platform performance, engagement, and scalability through optimized services and APIs.",
  },
];

export const skills = [
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "JavaScript ES6+",
      "Python",
      "FastAPI",
      "PHP",
      "CodeIgniter",
    ],
  },
  {
    category: "Architecture",
    items: [
      "Microservices",
      "REST APIs",
      "JWT Authentication",
      "Redis",
      "RabbitMQ",
      "System Design",
      "Event-Driven Design",
    ],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS Services", "Docker", "CI/CD", "GitHub Actions", "Jenkins"],
  },
  {
    category: "AI & ML",
    items: ["LLMs", "RAG", "LangChain", "STT/TTS"],
  },
  {
    category: "Tools",
    items: ["GitHub", "Jira", "Postman", "VS Code", "Cursor", "Claude Code"],
  },
];

export const certifications = [
  {
    title: "TypeScript: The New JavaScript for Web Development",
    completed: "Jan 2024",
  },
  {
    title: "Getting Started with AWS Services Fundamentals for Beginners",
    completed: "Jun 2024",
  },
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Thakur College, Mumbai University",
    period: "2015 – 2018",
  },
  {
    degree: "Bachelor of Science in Information Technology (BSc.IT)",
    institution: "Oriental College, Mumbai University",
    period: "2011 – 2014",
  },
];

export const contactInfo = {
  phone: "",
  email: "",
  linkedin: "",
  github: "",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Terminal", href: "#terminal" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Games", href: "#games" },
  { label: "Contact", href: "#contact" },
];
