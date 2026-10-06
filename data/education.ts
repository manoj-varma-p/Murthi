export interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  location?: string;
  note?: string;
}

export interface LanguageItem {
  name: string;
  level: string;
  score: number; // out of 10
  rating: string;
}

export const educationData: EducationItem[] = [
  {
    year: "2022",
    degree: "B.Tech",
    institution: "Engineering Curriculum (Discontinued)",
    note: "Pivoted full-time to professional Graphic Design, Video Production, and Motion Direction.",
  },
  {
    year: "2019",
    degree: "Intermediate",
    institution: "APSWRS Junior College",
    location: "Kanchili, Andhra Pradesh",
    note: "Higher secondary education with a keen focus on analytical thinking and visual arts.",
  },
  {
    year: "2017",
    degree: "Secondary School (10th)",
    institution: "APSWRS School",
    location: "Palakonda, Srikakulam",
    note: "Foundational schooling completed with academic distinction.",
  },
];

export const languagesData: LanguageItem[] = [
  {
    name: "Hindi",
    level: "Professional Fluency",
    score: 9,
    rating: "9 / 10",
  },
  {
    name: "English",
    level: "Professional Working Proficiency",
    score: 8,
    rating: "8 / 10",
  },
  {
    name: "Telugu",
    level: "Native / Bilingual Fluency",
    score: 10,
    rating: "10 / 10",
  },
];
