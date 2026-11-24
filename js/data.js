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
    title: "Varkala Beach",
    category: "place",
    type: "Travel",
    publisher: "Aadith",
    date: "5 Jan",
    dateShort: "",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaMndWwf294OS9YTl7oeoCx4ep6pVl1yNRj69ERamHPg&s=10",
    caption: "Prethyasha",
    excerpt: "Varkala is a coastal retreat where dramatic cliffs, serene beaches, and sweeping ocean views create a distinctive sense of calm.",
    details: "Varkala Beach (also known as Papanasam Beach) is a coastal stretch along the Arabian Sea in Varkala, Kerala, framed by red laterite cliffs and sacred mineral springs.",
    tags: ["Travelling", "Thiruvanandapuram"],
    metrics: "• 8000 views",
    link: "https://www.instagram.com/reel/DTIbT9SCFfP/?utm_source=ig_web_copy_link&jplx=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA=="
  },
  {
    id: "clip-2",
    title: "Munnar And Ramakkalmedu",
    category: "Travelling",
    type: "Travel",
    publisher: "Aadith",
    date: "10 May",
    dateShort: " ",
    image: "https://media1.thrillophilia.com/filestore/oc95fn4il5gvcvyxvt1digt9bqol_munnar-tour-packages.webp?w=1536&q=65&format=auto",
    caption: "Prethyasha",
    excerpt: "Munnar’s misty tea plantations and rolling hills offer a serene escape into Kerala’s highlands. Ramakkalmedu’s open ridges and sweeping views create a striking landscape shaped by wind, sky, and mountain air.",
    details: "Ramakkalmedu and Munnar are two scenic hill stations in Kerala's Idukki district within the Western Ghats, with Ramakkalmedu known for strong winds and valley views toward Tamil Nadu and Munnar celebrated for sprawling tea plantations, misty peaks, and wildlife.",
    tags: ["Travelling", "Tea Factory" ,"Hills"],
    metrics: "• 7000 views",
    link: "https://www.instagram.com/reel/DYhej9_Iwb_/?utm_source=ig_web_copy_link&gwpx=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA=="
  },
  {
    id: "clip-3",
    title: "Hampi",
    category: "loading",
    type: "loading",
    publisher: "loading",
    date: "2027",
    dateShort: "loading",
    image: "https://s7ap1.scene7.com/is/image/incredibleindia/virupaksha-temple-hampi-karnataka-1-attr-nearby?qlt=82&ts=1742170327508",
    caption: "Prethyasha",
    excerpt: " loading.",
    details: "next trip",
    tags: ["loading"],
    metrics: "• loading",
    link: " "
  },
  {
    id: "clip-4",
    title: "loading",
    category: "loading",
    type: "loading ",
    publisher: "loading",
    date: "loading",
    dateShort: "loading",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL9rcCtz9MU3KOiaYpiSL9wV6latpjnVY444ai_Q-ABoasrti-Yp8BRao&s=10",
    caption: "loading",
    excerpt: " loading",
    details: "loading",
    tags: ["loading"],
    metrics: "• loading",
    link: " "
  },
  {
    id: "clip-5",
    title: "loading",
    category: "loading",
    type: "loading",
    publisher: "loading",
    date: "loading",
    dateShort: "loading",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL9rcCtz9MU3KOiaYpiSL9wV6latpjnVY444ai_Q-ABoasrti-Yp8BRao&s=10",
    caption: "loading",
    excerpt: "loading",
    details: "loading",
    tags: ["loading"],
    metrics: "loading",
    link: " "
  },
  {
    id: "clip-6",
    title: "loading",
    category: "loading",
    type: "loading",
    publisher: "loading",
    date: "loading",
    dateShort: "loading",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL9rcCtz9MU3KOiaYpiSL9wV6latpjnVY444ai_Q-ABoasrti-Yp8BRao&s=10",
    caption: "loading",
    excerpt: "loading",
    details: "loading",
    tags: ["loading"],
    metrics: "•loading",
    link: " "
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
