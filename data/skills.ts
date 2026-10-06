export interface SoftwareItem {
  name: string;
  category: string;
  badge: string;
  badgeColor: {
    bg: string;
    text: string;
    border: string;
  };
  proficiency: number; // percentage 0 - 100
  experience: string;
}

export const skillPills: string[] = [
  "Graphic Design",
  "Video Editing",
  "Motion Graphics",
  "Social Media Creatives",
  "Reels & Shorts",
  "YouTube Thumbnails",
  "Promotional Videos",
  "Logo Animation",
  "Visual Effects (VFX)",
  "Color Grading",
  "AI Image & Video Generation",
  "Storyboarding",
  "Sound Design",
  "Kinetic Typography",
];

export const softwareTools: SoftwareItem[] = [
  {
    name: "Photoshop",
    category: "Raster & Photo Manipulation",
    badge: "Ps",
    badgeColor: {
      bg: "#001E36",
      text: "#31A8FF",
      border: "#31A8FF",
    },
    proficiency: 95,
    experience: "4+ Years",
  },
  {
    name: "Illustrator",
    category: "Vector Design & Typography",
    badge: "Ai",
    badgeColor: {
      bg: "#330000",
      text: "#FF9A00",
      border: "#FF9A00",
    },
    proficiency: 90,
    experience: "4+ Years",
  },
  {
    name: "After Effects",
    category: "Motion Graphics & Compositing",
    badge: "Ae",
    badgeColor: {
      bg: "#00005B",
      text: "#9999FF",
      border: "#9999FF",
    },
    proficiency: 95,
    experience: "4+ Years",
  },
  {
    name: "Premiere Pro",
    category: "Video Editing & Sequencing",
    badge: "Pr",
    badgeColor: {
      bg: "#330033",
      text: "#EA77FF",
      border: "#EA77FF",
    },
    proficiency: 92,
    experience: "4+ Years",
  },
  {
    name: "DaVinci Resolve",
    category: "Color Grading & Post",
    badge: "Dv",
    badgeColor: {
      bg: "#1E1E24",
      text: "#FF5C5C",
      border: "#FF7849",
    },
    proficiency: 85,
    experience: "3+ Years",
  },
  {
    name: "Figma",
    category: "UI & Layout Prototyping",
    badge: "Fi",
    badgeColor: {
      bg: "#1E1E1E",
      text: "#0ACF83",
      border: "#A259FF",
    },
    proficiency: 88,
    experience: "3+ Years",
  },
  {
    name: "Canva",
    category: "Rapid Social Publishing",
    badge: "Cv",
    badgeColor: {
      bg: "#005662",
      text: "#00C4CC",
      border: "#00C4CC",
    },
    proficiency: 90,
    experience: "4+ Years",
  },
  {
    name: "AI Design & Video Tools",
    category: "Midjourney, Runway, Kling, Topaz",
    badge: "AI",
    badgeColor: {
      bg: "#2A1835",
      text: "#F5B800",
      border: "#F5B800",
    },
    proficiency: 92,
    experience: "2+ Years",
  },
];

export const marqueeRow1 = [
  "MOTION GRAPHICS",
  "•",
  "VIDEO EDITING",
  "•",
  "SHORT FORM CONTENT",
  "•",
  "PROMOTIONAL REELS",
  "•",
  "COLOR GRADING",
  "•",
  "SOUND DESIGN",
  "•",
];

export const marqueeRow2 = [
  "SOCIAL CREATIVES",
  "•",
  "VISUAL EFFECTS",
  "•",
  "AI GENERATION",
  "•",
  "YOUTUBE THUMBNAILS",
  "•",
  "KINETIC TYPOGRAPHY",
  "•",
  "BRANDING",
  "•",
];
