export interface VideoItem {
  id: string;
  title: string;
  category: 'Reel' | 'Promo' | 'Motion Graphics' | 'Social Creative';
  description?: string;
  tools?: string[];
}

export const videoCategories = [
  'All',
  'Reel',
  'Promo',
  'Motion Graphics',
  'Social Creative',
] as const;

export type VideoCategory = (typeof videoCategories)[number];

export const videos: VideoItem[] = [
  {
    id: "p6x1XIZtxc4",
    title: "Cinematic Real Estate Short",
    category: "Reel",
    description: "High-impact visual pacing, 3D tracking, and dynamic sound design.",
    tools: ["Premiere Pro", "After Effects"],
  },
  {
    id: "9EvhCDRDYrA",
    title: "Viral Hook Short Edit",
    category: "Reel",
    description: "Punchy visual hook with speed ramps, seamless zooms, and kinetic captions.",
    tools: ["Premiere Pro", "After Effects"],
  },
  {
    id: "mfkR1ZJLRCA",
    title: "Brand Motion & Commercial Story",
    category: "Promo",
    description: "Dynamic product narrative with smooth motion graphics and cinematic color grade.",
    tools: ["After Effects", "DaVinci Resolve"],
  },
  {
    id: "RQsWHIIhHxc",
    title: "Creative Production & Visual FX",
    category: "Motion Graphics",
    description: "Layered visual effects, typography animations, and rhythmic editing.",
    tools: ["After Effects", "Photoshop"],
  },
  {
    id: "hp54cOwLAEA",
    title: "Dynamic Visual Campaign",
    category: "Promo",
    description: "High-retention commercial cut built for maximum audience engagement.",
    tools: ["Premiere Pro", "Illustrator"],
  },
  {
    id: "HfY5QfKMLBk",
    title: "Social Media High-Conversion Edit",
    category: "Social Creative",
    description: "Tailored vertical layout designed for high conversion and brand recall.",
    tools: ["Photoshop", "After Effects"],
  },
  {
    id: "t8l1JAhemuQ",
    title: "Cinematic Short Reel",
    category: "Reel",
    description: "High-energy pacing, sound design, and color grading tailored for viral audience retention.",
    tools: ["Premiere Pro", "After Effects"],
  },
  {
    id: "9HX_Rw6u4I0",
    title: "Brand Campaign Promo",
    category: "Promo",
    description: "Dynamic product showcase with kinetic typography, 3D camera transitions, and brand styling.",
    tools: ["After Effects", "Illustrator"],
  },
  {
    id: "LitDGUM5cw8",
    title: "Kinetic Motion Graphics",
    category: "Motion Graphics",
    description: "Complex motion design piece featuring layered vector artwork, morphs, and rhythmic timing.",
    tools: ["After Effects", "Photoshop"],
  },
  {
    id: "q5t3a4KtHII",
    title: "Creator Narrative Edit",
    category: "Reel",
    description: "Punchy visual storytelling combining speed ramps, seamless transitions, and graphic overlays.",
    tools: ["Premiere Pro", "DaVinci Resolve"],
  },
  {
    id: "7em0aUhOE9k",
    title: "Commercial Motion Ad",
    category: "Promo",
    description: "Commercial promotional cut crafted to spotlight features with eye-catching visual accents.",
    tools: ["After Effects", "Premiere Pro"],
  },
  {
    id: "q7gseajW4Rw",
    title: "Social Creative Showcase",
    category: "Social Creative",
    description: "Optimized vertical layout designed for high conversion and strong brand recall on social feeds.",
    tools: ["Photoshop", "After Effects"],
  },
  {
    id: "EraK7uHhRPU",
    title: "Visual FX & Motion Reel",
    category: "Reel",
    description: "Showreel combining visual effects compositing, clean sound design, and cinematic grading.",
    tools: ["After Effects", "DaVinci Resolve"],
  },
];
