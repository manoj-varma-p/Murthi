export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "the-art-code",
    company: "THE ART CODE",
    role: "Motion Graphic Designer / Graphic Designer & Video Editor",
    period: "2025 – 2026",
    location: "Hyderabad, India",
    description:
      "Created promotional creatives, social media content, motion graphics, educational content, video edits and AI-assisted visual content.",
    highlights: [
      "Developed rich 2D vector animation, kinetic title sequences, and explainer motion pieces.",
      "Adopted generative AI pipelines for concept art, thumbnail design, and visual asset generation.",
      "Produced end-to-end video packages from storyboard ideation to final master export.",
    ],
    tags: ["Motion Graphics", "AI Visuals", "Thumbnails", "Explainer Edits", "Social Content"],
  },
  {
    id: "brochill",
    company: "BROCHILL",
    role: "Video Status Maker / Graphic Designer & Video Editor",
    period: "Sep 2022 – Jun 2024",
    location: "Hyderabad, India",
    description:
      "Created social media creatives, short-form videos, promotional content, motion graphics and visual effects for millions of active mobile app users.",
    highlights: [
      "Engineered high-velocity template designs and viral short-form video status formats.",
      "Produced eye-catching promotional campaigns driving user acquisition and daily engagement.",
      "Refined visual effects, kinetic typography, and motion pacing for instant audience retention.",
    ],
    tags: ["Motion Design", "Short-Form Video", "Promos", "VFX", "Templates"],
  },
  {
    id: "one-vision",
    company: "ONE VISION",
    role: "Graphic Designer / Video Editor",
    period: "2021 – 2022",
    location: "Hyderabad, India",
    description:
      "Created digital creatives, advertising visuals and video content for diverse client brands and digital marketing campaigns.",
    highlights: [
      "Crafted full-funnel digital ad creatives, banners, and promotional campaign materials.",
      "Delivered brand storytelling reels with custom motion graphics and color grading.",
      "Maintained strict brand consistency across multiple multi-channel media launches.",
    ],
    tags: ["Ad Creatives", "Video Editing", "Brand Visuals", "Color Grading"],
  },
];
