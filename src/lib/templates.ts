export type Palette = {
  primary: string;
  accent: string;
  gold: string;
  bg: string;
  bgSoft: string;
  text: string;
  muted: string;
};

export type TemplateConfig = {
  id: string;
  name: string;
  category:
    | "Academic"
    | "Hospital"
    | "Laboratory"
    | "Research"
    | "Nursing"
    | "Excellence"
    | "Training"
    | "Conference";
  orientation: "portrait" | "landscape";
  layout:
    | "classic"
    | "modern"
    | "academic"
    | "hospital"
    | "lab"
    | "minimal"
    | "framed"
    | "corner-deco"
    | "ribbon";
  palette: Palette;
  background:
    | "plain"
    | "hex"
    | "ecg"
    | "dna"
    | "floral"
    | "corner-ornament"
    | "caduceus-watermark"
    | "gradient"
    | "diagonal"
    | "rose-floral"
    | "medical-mandala"
    | "convocation-laurel"
    | "pill-pattern"
    | "heartbeat-lines"
    | "molecule-grid"
    | "rx-pattern"
    | "stethoscope-wave";
  border: "double" | "thick" | "rounded" | "art-deco" | "minimal" | "dashed";
  icon: "shield" | "caduceus" | "cross" | "stethoscope" | "heart" | "microscope" | "dna";
  sealStyle: "gold" | "red-university" | "blue" | "silver";
  title: string;
};

const palettes: Record<string, Palette> = {
  navyGold: {
    primary: "#0b2545",
    accent: "#1a4a8a",
    gold: "#c9a14a",
    bg: "#ffffff",
    bgSoft: "#f5f8fc",
    text: "#0b2545",
    muted: "#6b7280",
  },
  medicalBlue: {
    primary: "#0e3a6b",
    accent: "#2a6fb5",
    gold: "#d4af37",
    bg: "#ffffff",
    bgSoft: "#eef4fb",
    text: "#0e3a6b",
    muted: "#52606d",
  },
  emeraldGold: {
    primary: "#0f5132",
    accent: "#1b7a4d",
    gold: "#c9a14a",
    bg: "#fbfaf5",
    bgSoft: "#f1eee0",
    text: "#0f3d28",
    muted: "#6b7280",
  },
  crimsonNavy: {
    primary: "#5b0c1a",
    accent: "#0b2545",
    gold: "#c9a14a",
    bg: "#ffffff",
    bgSoft: "#fbf4f4",
    text: "#1f1f1f",
    muted: "#6b7280",
  },
  charcoalGold: {
    primary: "#1f1f1f",
    accent: "#3a3a3a",
    gold: "#c9a14a",
    bg: "#fbf9f4",
    bgSoft: "#f0ece1",
    text: "#1f1f1f",
    muted: "#6b7280",
  },
  tealSilver: {
    primary: "#0a4a4a",
    accent: "#2c8a8a",
    gold: "#b5b5b5",
    bg: "#ffffff",
    bgSoft: "#eaf5f5",
    text: "#0a4a4a",
    muted: "#52606d",
  },
  royalPurple: {
    primary: "#3d2466",
    accent: "#6a4caf",
    gold: "#d4af37",
    bg: "#ffffff",
    bgSoft: "#f4f0fb",
    text: "#3d2466",
    muted: "#6b7280",
  },
  ivoryRose: {
    primary: "#8a1f3d",
    accent: "#c44569",
    gold: "#c9a14a",
    bg: "#fdfaf6",
    bgSoft: "#f9efe9",
    text: "#3a1a22",
    muted: "#6b7280",
  },
};

const titles = [
  "Medical Fundamentals Certificate",
  "Nursing Excellence Certificate",
  "Clinical Research Certificate",
  "Healthcare Management Certificate",
  "Medical Training Completion",
  "Patient Care Excellence",
  "Advanced Medical Science",
  "Medical Laboratory Training",
  "Healthcare Leadership",
  "Emergency Medicine Certificate",
  "Medical Conference Participation",
  "Medical Workshop Certificate",
  "Clinical Skills Certificate",
  "Healthcare Innovation",
  "Medical Education Certificate",
  "Medical Technology Certificate",
  "Surgical Training Certificate",
  "Public Health Certificate",
  "Medical Research Achievement",
  "Pharmacy Training Certificate",
  "Nursing Workshop Certificate",
  "Medical Ethics Certificate",
  "Healthcare Administration",
  "Clinical Excellence Certificate",
  "Medical Seminar Certificate",
  "Healthcare Quality Certificate",
  "Hospital Management Certificate",
  "Medical Diagnostics Certificate",
  "Advanced Patient Care",
  "Medical Instructor Certificate",
  "Healthcare Safety Certificate",
  "Medical Documentation Certificate",
  "Medical AI Training Certificate",
  "Telemedicine Certificate",
  "Clinical Operations Certificate",
  "Medical Imaging Certificate",
  "Infection Control Certificate",
  "Healthcare Analytics Certificate",
  "Medical Innovation Award",
  "Professional Medical Achievement",
];

const categoryFor = (i: number): TemplateConfig["category"] => {
  const cats: TemplateConfig["category"][] = [
    "Academic",
    "Hospital",
    "Laboratory",
    "Research",
    "Nursing",
    "Excellence",
    "Training",
    "Conference",
  ];
  return cats[i % cats.length];
};

const layouts: TemplateConfig["layout"][] = [
  "classic",
  "modern",
  "academic",
  "hospital",
  "lab",
  "minimal",
  "framed",
  "corner-deco",
  "ribbon",
];
const backgrounds: TemplateConfig["background"][] = [
  "rose-floral",
  "medical-mandala",
  "convocation-laurel",
  "heartbeat-lines",
  "molecule-grid",
  "rx-pattern",
  "stethoscope-wave",
  "floral",
  "hex",
  "ecg",
  "dna",
  "corner-ornament",
  "caduceus-watermark",
  "gradient",
  "pill-pattern",
  "diagonal",
];
const borders: TemplateConfig["border"][] = [
  "double",
  "thick",
  "rounded",
  "art-deco",
  "minimal",
  "dashed",
];
const icons: TemplateConfig["icon"][] = [
  "shield",
  "caduceus",
  "cross",
  "stethoscope",
  "heart",
  "microscope",
  "dna",
];
const seals: TemplateConfig["sealStyle"][] = ["gold", "red-university", "blue", "silver"];
const paletteKeys = Object.keys(palettes);

export const TEMPLATES: TemplateConfig[] = titles.map((title, i) => {
  const palette = palettes[paletteKeys[i % paletteKeys.length]];
  return {
    id: `tpl-${i + 1}`,
    name: title,
    title,
    category: categoryFor(i),
    orientation: i % 5 === 4 ? "landscape" : "portrait",
    layout: layouts[i % layouts.length],
    palette,
    background: backgrounds[i % backgrounds.length],
    border: borders[i % borders.length],
    icon: icons[i % icons.length],
    sealStyle: seals[i % seals.length],
  };
});

export const EXAMPLE_PICKS = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38];
