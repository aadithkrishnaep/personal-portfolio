/**
 * Editorial Portfolio & Clippings Data
 * 
 * Styled in the Musée d'Orsay / Caillebotte editorial gallery aesthetic.
 * Update this file with your own works, articles, and biographical details.
 */

const personalInfo = {
  name: "Aadith Krishna E P",
  monogram: { top: "A", bottom: "K" },
  exhibitionTitle: "Aadith's",
  exhibitionSubtitle: "Works & Clippings",
  dateRange: "From November 2026 to Present",
  role: "Software Developer & Digital Essayist",
  location: "kerela, India — Available Globally",
  email: "aadithaffiliate@gmail.com",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  biographyParagraph1: "As a computer science engineering student and digital content creator, I combine technical expertise with a refined approach to visual storytelling. Proficient in DaVinci Resolve, CapCut, and Adobe After Effects, I create polished video content with a focus on precise editing, compelling motion graphics, and meticulous attention to detail.",
  biographyParagraph2: "My work also includes 3D design and visual development using Blender. With a strong problem-solving mindset and a commitment to quality, I bring creative concepts to life through professional, engaging, and visually cohesive content..",
  statementQuote: "Beyond the frame, beyond the ordinary—every cut carries a presence of its own.",
  statementAuthor: "Aadith Krishna, Notes on Craftsmanship",
  stats: [
    { label: "Active Years", value: "03+" },
    { label: "Published Works", value: "24+" },
    { label: "Global Readership", value: "45K+" },
    { label: "Open Source Stars", value: "2.1K" }
  ],
  disciplines: [
    "Video Editing",
    "Motion graphics",
    "VFX Editing",
    "UI/UX Design Systems",
    "Colour Grading",
    "Creator"
  ]
};

// Hero staggered artwork & clippings (matches Image 1 & 2 layout)
const heroExhibits = {
  topLeft: {
    id: "hero-1",
    title: "Varkala",
    subtitle: "2026 Prethyasha",
    category: "Travelling",
    tag: "beach",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaMndWwf294OS9YTl7oeoCx4ep6pVl1yNRj69ERamHPg&s=10",
    details: "Varkala is a coastal retreat where dramatic cliffs, serene beaches, and sweeping ocean views create a distinctive sense of calm.",
    link: "https://www.instagram.com/reel/DTIbT9SCFfP/?utm_source=ig_web_copy_link&jplx=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA=="
  },
  bottomLeft: {
    id: "hero-2",
    title: "Munnar And Ramakkalmedu",
    subtitle: "colloge iv",
    category: "Travelling",
    tag: "KeralaTourism",
    image: "https://media1.thrillophilia.com/filestore/oc95fn4il5gvcvyxvt1digt9bqol_munnar-tour-packages.webp?w=1536&q=65&format=auto",
    details: "Munnar’s misty tea plantations and rolling hills offer a serene escape into Kerala’s highlands. Ramakkalmedu’s open ridges and sweeping views create a striking landscape shaped by wind, sky, and mountain air.",
    link: "https://www.instagram.com/reel/DYhej9_Iwb_/?utm_source=ig_web_copy_link&gwpx=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA=="
  },
  topRight: {
    id: "hero-3",
    title: "Hampi",
    subtitle: "2027 prethyasha",
    category: "Travelling",
    tag: "architecture",
    image: "https://s7ap1.scene7.com/is/image/incredibleindia/virupaksha-temple-hampi-karnataka-1-attr-nearby?qlt=82&ts=1742170327508",
    details: "Hampe, also known as Vijayanagara, is a city in the Vijayanagara district in the Indian state of Karnataka. Located along the Tungabhadra River in the eastern and central parts of the state, Hampi is near the city of Hospet",
    link: "https://www.instagram.com/prethyashaa/?utm_source=ig_web_button_share_sheet"
  },
  bottomRight: {
    id: "hero-4",
    title: "Animation in Blender",
    subtitle: "My Work",
    category: "VFX",
    tag: "blender",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZxstaH9KkAM_zFaLKawtWuuhlp7WHHg3v0w3kH74xw&s",
    details: "learning vfx in blender",
    link: "https://www.instagram.com/prethyashaa/?utm_source=ig_web_button_share_sheet"
  }
};

// Full catalogue of curated work clippings (matches Image 3 & 4 layout)
const workClippings = [
  {
    id: "clip-1",
    title: "Designing Scalable Architecture for Real-Time Event Streams",
    category: "writing",
    type: "Technical Essay",
    publisher: "Medium / Better Programming",
    date: "From October 08th, 2024 to January 19th, 2025",
    dateShort: "Oct 2024",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Gustave_Caillebotte_-_Le_Pont_de_l%27Europe_-_Google_Art_Project.jpg/800px-Gustave_Caillebotte_-_Le_Pont_de_l%27Europe_-_Google_Art_Project.jpg",
    caption: "Le pont de l'Europe, 1876-1877 Gustave Caillebotte",
    excerpt: "An in-depth exploration of asynchronous event processing, backpressure management, and achieving sub-millisecond latencies across distributed consumer clusters.",
    details: "This article deconstructs distributed streaming pipelines, comparing Kafka and RabbitMQ with practical benchmarks. It details fault tolerance patterns, idempotent consumers, and handling traffic spikes under strict latency SLAs.",
    tags: ["Distributed Systems", "Kafka", "Node.js", "Architecture"],
    metrics: "14.2K reads • 850 claps",
    link: "https://medium.com"
  },
  {
    id: "clip-2",
    title: "OmniDash: Unified Cloud Metric & Telemetry Visualizer",
    category: "projects",
    type: "Open Source Tool",
    publisher: "GitHub Spotlight & Product Hunt #3",
    date: "From August 15th, 2024 to November 30th, 2024",
    dateShort: "Aug 2024",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Gustave_Caillebotte_-_Portrait_de_Richard_Gallo_-_Mus%C3%A9e_des_Beaux-Arts_de_Rennes.jpg/800px-Gustave_Caillebotte_-_Portrait_de_Richard_Gallo_-_Mus%C3%A9e_des_Beaux-Arts_de_Rennes.jpg",
    caption: "Portrait de Richard Gallo, 1884 Gustave Caillebotte",
    excerpt: "An open-source interactive telemetry dashboard aggregating logs, server health, and API latency into a clean editorial interface.",
    details: "Built with Next.js, WebSockets, and modern CSS. OmniDash connects with standard Prometheus and custom health endpoints, rendering live time-series visualizations with customizable thresholds and Slack notification webhooks.",
    tags: ["React", "TypeScript", "Data Viz", "WebSockets"],
    metrics: "⭐ 1.4k GitHub Stars",
    link: "https://github.com"
  },
  {
    id: "clip-3",
    title: "Minimalist Brand Identity & Design System for Bloom Health",
    category: "design",
    type: "Design System & Case Study",
    publisher: "Behance / Dribbble Featured",
    date: "From June 01st, 2024 to September 15th, 2024",
    dateShort: "Jun 2024",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Gustave_Caillebotte_-_Portrait_de_Jean_Daurelle_en_pied_-_Mus%C3%A9e_d%27Orsay.jpg/800px-Gustave_Caillebotte_-_Portrait_de_Jean_Daurelle_en_pied_-_Mus%C3%A9e_d%27Orsay.jpg",
    caption: "Portrait de Jean Daurelle, en pied, 1887 Gustave Caillebotte",
    excerpt: "Complete brand design overhaul, typography hierarchy, and a Figma design token library for a modern healthcare application.",
    details: "Crafted accessible high-contrast color palettes (WCAG AAA compliant), custom iconography, and reusable Figma components with auto-layout and interactive variants. Led to a 32% increase in mobile app onboarding completion.",
    tags: ["Figma", "UI/UX", "Design Systems", "Typography"],
    metrics: "Featured in UI Trends 2024",
    link: "https://behance.net"
  },
  {
    id: "clip-4",
    title: "Why Modern Micro-Frontends Fail (And How to Fix Them)",
    category: "writing",
    type: "Editorial Essay",
    publisher: "Hacker News Top Story #1",
    date: "From April 12th, 2024 to July 20th, 2024",
    dateShort: "Apr 2024",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Gustave_Caillebotte_-_Paris_Street%3B_Rainy_Day_-_Google_Art_Project.jpg/800px-Gustave_Caillebotte_-_Paris_Street%3B_Rainy_Day_-_Google_Art_Project.jpg",
    caption: "Rue de Paris, temps de pluie, 1877 Gustave Caillebotte",
    excerpt: "A cautionary critique of excessive micro-frontend adoption and practical guidelines on preserving the modular monolith.",
    details: "Analyzed organizational cognitive load, version drift, and asset delivery overhead across 5 engineering teams. Ranked #1 on Hacker News front page for 16 hours with lively community discussions.",
    tags: ["Frontend", "Engineering Culture", "Web Performance"],
    metrics: "28K views • 240+ comments",
    link: "https://dev.to"
  },
  {
    id: "clip-5",
    title: "FastPrompt: Agentic Prompt Workbench CLI",
    category: "projects",
    type: "Developer Utility",
    publisher: "GitHub & Terminal Tools",
    date: "From February 10th, 2024 to May 30th, 2024",
    dateShort: "Feb 2024",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Gustave_Caillebotte_-_Partie_de_bateau_-_Mus%C3%A9e_d%27Orsay.jpg/800px-Gustave_Caillebotte_-_Partie_de_bateau_-_Mus%C3%A9e_d%27Orsay.jpg",
    caption: "Partie de bateau, 1877-1878 Gustave Caillebotte",
    excerpt: "Lightweight command-line utility for developers to version-control, test, and benchmark AI system prompts across different LLM providers.",
    details: "Implemented in Python with rich terminal UI (Textual). Allows prompt engineering teams to run automated evaluations, track hallucination rates, and compare token latency across Gemini, Claude, and GPT models directly in CI/CD pipelines.",
    tags: ["Python", "CLI", "LLM", "Developer Tools"],
    metrics: "2.1k downloads/month",
    link: "https://github.com"
  },
  {
    id: "clip-6",
    title: "Building Offline-First Encrypted Journals with WebCrypto",
    category: "writing",
    type: "Technical Guide",
    publisher: "Personal Journal & Substack",
    date: "From November 05th, 2023 to March 02nd, 2024",
    dateShort: "Dec 2023",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Gustave_Caillebotte_-_Portrait_de_Richard_Gallo_-_Mus%C3%A9e_des_Beaux-Arts_de_Rennes.jpg/800px-Gustave_Caillebotte_-_Portrait_de_Richard_Gallo_-_Mus%C3%A9e_des_Beaux-Arts_de_Rennes.jpg",
    caption: "Drawing Cathedrals in the 19th Century",
    excerpt: "Building an encrypted, offline-first personal notes application using IndexedDB, WebCrypto AES-GCM, and Service Workers.",
    details: "Step-by-step breakdown of using AES-GCM client-side encryption, local IndexedDB persistence, and PWA manifests to guarantee privacy without recurring server costs.",
    tags: ["WebCrypto", "PWA", "JavaScript", "Security"],
    metrics: "6.8K readers",
    link: "https://aadith.dev/blog"
  }
];

// About screen featured artwork
const aboutArtwork = {
  title: "Video editior",
  artist: "Aadith Krishna E P",
  year: "2026",
  location: "thrissur,kerala",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfLB6HvDTUfwG2Y73c4San1QSaMtJQKUWP-ZxoHLO8fQ&s=10",
};
