import { create } from "zustand";
import { TEMPLATES } from "@/lib/templates";

export type CertData = {
  recipient: string;
  course: string;
  certificateTitle: string;
  date: string;
  certId: string;
  duration: string;
  instructor: string;
  director: string;
  organization: string;
  description: string;
  hostedBy: string;
  certType: string;
  certData: string;
  footerCompany: string;
  footerAddress: string;
  footerWebsite: string;
  footerEmail: string;
};

export type Uploads = {
  logo?: string;
  seal?: string;
  centerLogo?:string;
  signatureLeft?: string;
  signatureRight?: string;
  hospitalLogo?: string;
  footerLogo?: string;
};

export type LogoSettings = {
  size: number; // px in preview coordinates
  offsetX: number;
  offsetY: number;
};

export type Overrides = {
  sealPreset?: "default" | "university-red";
  backgroundOverride?: import("@/lib/templates").TemplateConfig["background"];
  logoSettings: LogoSettings;
};

type Store = {
  selectedId: string;
  data: CertData;
  uploads: Uploads;
  overrides: Overrides;
  setSelected: (id: string) => void;
  setField: <K extends keyof CertData>(k: K, v: CertData[K]) => void;
  setUpload: <K extends keyof Uploads>(k: K, v: string | undefined) => void;
  setOverride: <K extends keyof Overrides>(k: K, v: Overrides[K]) => void;
  setLogoSetting: <K extends keyof LogoSettings>(k: K, v: LogoSettings[K]) => void;
};

export const useCertStore = create<Store>((set) => ({
  selectedId: TEMPLATES[0].id,
  data: {
    recipient: "Dr. Jane A. Mitchell",
    course: "Advanced Clinical Practice",
    certificateTitle: "Certificate of Achievement",
    date: "June 8, 2026",
    certId: "MEI-2026-0625-001",
    duration: "120 Hours",
    instructor: "Prof. Daniel Okafor, MD",
    director: "Dr. Sofia Reyes, MD, PhD",
    organization: "Lovable Institute of Medical Sciences",
    description:
      "This certificate is awarded in recognition of the successful completion of the program, demonstrating outstanding proficiency, professionalism, and dedication to the practice of medicine.",
    hostedBy: "Dr. Aravind Kumar, Dean",
   certData: new Date().toLocaleDateString('en-US', { 
  month: 'short', 
  day: 'numeric', 
  year: 'numeric' 
}),
// Result: Mon Jun 08 2026 15:30:45 GMT+0530 (India Standard Time)
    certType: "Convocation · Medical Excellence",
    footerCompany: "The Future Med Global LLC",
    footerAddress: "8 The Green Suite B, Dover, Delaware 19901",
    footerWebsite: "thefuturemed.com",
    footerEmail: "certifications@thefuturemed.com",
  },
  uploads: {},
  overrides: {
    sealPreset: "default",
    logoSettings: { size: 56, offsetX: 0, offsetY: 0 },
  },
  setSelected: (id) => set({ selectedId: id }),
  setField: (k, v) => set((s) => ({ data: { ...s.data, [k]: v } })),
  setUpload: (k, v) => set((s) => ({ uploads: { ...s.uploads, [k]: v } })),
  setOverride: (k, v) => set((s) => ({ overrides: { ...s.overrides, [k]: v } })),
  setLogoSetting: (k, v) =>
    set((s) => ({ overrides: { ...s.overrides, logoSettings: { ...s.overrides.logoSettings, [k]: v } } })),
}));
