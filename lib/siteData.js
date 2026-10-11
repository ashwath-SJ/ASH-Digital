// ✏️ Default content. After you set up the admin panel (/admin), edits are saved to data/content.json
// and override these defaults. Navigation, the "How we work" steps and the scrolling strip are edited here.

export const SITE = { name: "ASH Digital" };

export const CATEGORIES = ["UI/UX Design", "Web Development", "Digital Marketing"];

// Icon choices for services (picked in /admin)
export const ICONS = ["uiux", "code", "megaphone", "pen", "broadcast", "camera"];
export const ICON_LABELS = { uiux: "UI/UX (screen + pen)", code: "Code (screen + </>)", megaphone: "Megaphone", pen: "Pen tool", broadcast: "Broadcast", camera: "Camera" };

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
];

export const marquee = [
  "UI/UX Design",
  "Web Development",
  "Digital Marketing",
  "Social Media Marketing",
  "Website Design",
  "App Design",
  "Ecommerce",
];

// Editable from /admin
export const defaultContent = {
  contact: {
    email: "hello@ashdigital.com",
    phone: "+91 00000 00000",
    location: "Coimbatore, Tamil Nadu, India",
  },
  services: [
    { id: "uiux", icon: "uiux", title: "UI/UX Design", text: "Our designers stay ahead of design trends, bringing fresh and innovative ideas to every screen." },
    { id: "dev", icon: "code", title: "Web Development", text: "We build fast, secure and scalable websites with the latest technologies for future-proof solutions." },
    { id: "marketing", icon: "megaphone", title: "Digital Marketing", text: "With expertise in social media marketing, content and paid ads, we help boost your online visibility." },
  ],
  // Add your first project from /admin. The "Our Work" section appears on the website automatically once you do.
  projects: [],
};

// "How we work" section (replaces the projects gallery until you have projects)
export const processSteps = [
  { n: "01", title: "Discover", text: "We listen first: your goals, your audience and your ideas, so we build the right thing." },
  { n: "02", title: "Design", text: "Clean wireframes and UI designs you can review and approve before any code is written." },
  { n: "03", title: "Build", text: "Fast, responsive and secure websites, built with modern tools and tested on every screen." },
  { n: "04", title: "Launch & Grow", text: "We go live, then help you reach your audience with social media and digital marketing." },
];

// About section cards
export const strengths = [
  { title: "Fresh ideas", text: "A new team with modern thinking, not recycled templates." },
  { title: "Modern technology", text: "We use current design and development tools to build fast, responsive websites." },
  { title: "Personal attention", text: "Every client gets our full focus, with clear and friendly communication." },
];
