import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { TemplateConfig } from "@/lib/templates";
import type { CertData, Uploads, Overrides } from "@/store/certificateStore";

const A4 = { w: 794, h: 1123 }; // 210x297mm @ 96dpi

type Props = {
  template: TemplateConfig;
  data: CertData;
  uploads: Uploads;
  overrides: Overrides;
};

function Background({ kind, palette }: { kind: TemplateConfig["background"]; palette: TemplateConfig["palette"] }) {
  const id = Math.random().toString(36).slice(2, 8);
  const accent = palette.accent;
  const gold = palette.gold;
  switch (kind) {
    case "hex":
      return (
        <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.08 }}>
          <defs>
            <pattern id={`hex-${id}`} width="48" height="42" patternUnits="userSpaceOnUse">
              <polygon points="24,2 46,14 46,38 24,50 2,38 2,14" fill="none" stroke={accent} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#hex-${id})`} />
        </svg>
      );
    case "ecg":
      return (
        <svg className="absolute inset-x-0 h-32" style={{ top: "55%", opacity: 0.18 }} viewBox="0 0 800 100" preserveAspectRatio="none">
          <polyline
            points="0,50 80,50 100,50 120,20 140,80 160,50 240,50 260,30 280,70 300,50 400,50 420,10 440,90 460,50 600,50 620,30 640,70 660,50 800,50"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />
        </svg>
      );
    case "dna":
      return (
        <svg className="absolute right-6 top-1/4 h-2/3 w-24" style={{ opacity: 0.1 }} viewBox="0 0 80 400">
          {Array.from({ length: 20 }).map((_, i) => (
            <g key={i}>
              <circle cx={20 + Math.sin(i / 2) * 20} cy={i * 20 + 10} r="3" fill={accent} />
              <circle cx={60 - Math.sin(i / 2) * 20} cy={i * 20 + 10} r="3" fill={gold} />
              <line
                x1={20 + Math.sin(i / 2) * 20}
                y1={i * 20 + 10}
                x2={60 - Math.sin(i / 2) * 20}
                y2={i * 20 + 10}
                stroke={accent}
                strokeWidth="1"
              />
            </g>
          ))}
        </svg>
      );
    case "floral":
      return (
        <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.07 }}>
          <defs>
            <pattern id={`fl-${id}`} width="120" height="120" patternUnits="userSpaceOnUse">
              <g fill="none" stroke={gold} strokeWidth="1">
                <circle cx="60" cy="60" r="8" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx="60"
                    cy="40"
                    rx="6"
                    ry="14"
                    transform={`rotate(${i * 45} 60 60)`}
                  />
                ))}
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#fl-${id})`} />
        </svg>
      );
    case "corner-ornament":
      return (
        <>
          {[
            "top-4 left-4",
            "top-4 right-4 rotate-90",
            "bottom-4 right-4 rotate-180",
            "bottom-4 left-4 -rotate-90",
          ].map((c, i) => (
            <svg key={i} className={`absolute h-24 w-24 ${c}`} viewBox="0 0 100 100" style={{ opacity: 0.55 }}>
              <path d="M0,40 Q10,10 40,0 M0,60 Q10,20 60,10 M0,80 Q20,30 80,20" fill="none" stroke={gold} strokeWidth="1.2" />
            </svg>
          ))}
        </>
      );
    case "caduceus-watermark":
      return (
        <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.05 }}>
          <Caduceus color={accent} size={420} />
        </div>
      );
    case "gradient":
      return (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at top, ${palette.bgSoft}, ${palette.bg} 70%)`,
          }}
        />
      );
    case "diagonal":
      return (
        <>
          <div
            className="absolute -left-20 top-0 h-40 w-96"
            style={{ background: palette.primary, transform: "rotate(-15deg)", opacity: 0.85 }}
          />
          <div
            className="absolute -right-20 bottom-0 h-40 w-96"
            style={{ background: palette.gold, transform: "rotate(-15deg)", opacity: 0.85 }}
          />
        </>
      );
    case "rose-floral":
      return (
        <>
          <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.06 }}>
            <defs>
              <pattern id={`rose-${id}`} width="160" height="160" patternUnits="userSpaceOnUse">
                <g fill="none" stroke={gold} strokeWidth="1.1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <path
                      key={i}
                      d="M80 80 Q70 60 80 40 Q90 60 80 80 Z"
                      transform={`rotate(${i * 30} 80 80)`}
                    />
                  ))}
                  <circle cx="80" cy="80" r="6" fill={accent} />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#rose-${id})`} />
          </svg>
          {["top-0 left-0", "top-0 right-0 scale-x-[-1]", "bottom-0 right-0 rotate-180", "bottom-0 left-0 scale-y-[-1]"].map((c, i) => (
            <svg key={i} className={`absolute h-56 w-56 ${c}`} viewBox="0 0 200 200" style={{ opacity: 0.5 }}>
              <g fill="none" stroke={gold} strokeWidth="1.4">
                <path d="M10 190 Q40 140 30 90 Q60 110 80 70 Q70 110 110 100 Q90 140 140 130 Q110 160 150 180" />
                {Array.from({ length: 6 }).map((_, k) => (
                  <g key={k} transform={`translate(${30 + k * 18} ${170 - k * 20})`}>
                    <circle r="6" fill={accent} fillOpacity="0.5" />
                    <path d="M-6 0 Q0 -8 6 0 Q0 8 -6 0" fill={gold} fillOpacity="0.3" />
                  </g>
                ))}
              </g>
            </svg>
          ))}
        </>
      );
    case "medical-mandala":
      return (
        <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.07 }}>
          <svg viewBox="0 0 400 400" className="h-[90%] w-[90%]">
            <g fill="none" stroke={accent} strokeWidth="1">
              {Array.from({ length: 24 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 15} 200 200)`}>
                  <path d="M200 40 Q220 100 200 160 Q180 100 200 40 Z" />
                  <circle cx="200" cy="50" r="3" fill={gold} />
                </g>
              ))}
              <circle cx="200" cy="200" r="60" stroke={gold} strokeWidth="1.5" />
              <circle cx="200" cy="200" r="100" />
              <circle cx="200" cy="200" r="150" strokeDasharray="2 4" />
              <path d="M200 170 V230 M170 200 H230" stroke={gold} strokeWidth="3" />
            </g>
          </svg>
        </div>
      );
    case "convocation-laurel":
      return (
        <>
          <svg className="absolute bottom-8 left-1/2 -translate-x-1/2 h-40 w-[420px]" viewBox="0 0 420 160" style={{ opacity: 0.18 }}>
            <g fill="none" stroke={gold} strokeWidth="1.4">
              <path d="M210 150 Q120 130 60 60" />
              <path d="M210 150 Q300 130 360 60" />
              {Array.from({ length: 10 }).map((_, i) => {
                const t = i / 10;
                return (
                  <g key={`l${i}`}>
                    <ellipse cx={60 + t * 150} cy={60 + t * 80} rx="10" ry="4" transform={`rotate(${-40 + t * 30} ${60 + t * 150} ${60 + t * 80})`} fill={accent} fillOpacity="0.4" />
                    <ellipse cx={360 - t * 150} cy={60 + t * 80} rx="10" ry="4" transform={`rotate(${40 - t * 30} ${360 - t * 150} ${60 + t * 80})`} fill={accent} fillOpacity="0.4" />
                  </g>
                );
              })}
            </g>
          </svg>
          <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.04 }}>
            <defs>
              <pattern id={`conv-${id}`} width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill={accent} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#conv-${id})`} />
          </svg>
        </>
      );
    case "pill-pattern":
      return (
        <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.07 }}>
          <defs>
            <pattern id={`pill-${id}`} width="70" height="70" patternUnits="userSpaceOnUse">
              <g transform="rotate(35 35 35)">
                <rect x="15" y="28" width="40" height="14" rx="7" fill="none" stroke={accent} strokeWidth="1" />
                <line x1="35" y1="28" x2="35" y2="42" stroke={accent} strokeWidth="1" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#pill-${id})`} />
        </svg>
      );
    case "heartbeat-lines":
      return (
        <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.09 }} viewBox="0 0 800 1120" preserveAspectRatio="none">
          {Array.from({ length: 9 }).map((_, row) => (
            <polyline
              key={row}
              points={`0,${80 + row * 120} 120,${80 + row * 120} 150,${50 + row * 120} 180,${110 + row * 120} 210,${80 + row * 120} 380,${80 + row * 120} 410,${40 + row * 120} 440,${120 + row * 120} 470,${80 + row * 120} 800,${80 + row * 120}`}
              fill="none"
              stroke={accent}
              strokeWidth="1.4"
            />
          ))}
        </svg>
      );
    case "molecule-grid":
      return (
        <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.1 }}>
          <defs>
            <pattern id={`mol-${id}`} width="110" height="110" patternUnits="userSpaceOnUse">
              <g fill="none" stroke={accent} strokeWidth="1">
                <circle cx="20" cy="20" r="4" fill={accent} />
                <circle cx="90" cy="30" r="4" fill={gold} />
                <circle cx="55" cy="70" r="4" fill={accent} />
                <circle cx="20" cy="95" r="4" fill={gold} />
                <line x1="20" y1="20" x2="55" y2="70" />
                <line x1="90" y1="30" x2="55" y2="70" />
                <line x1="55" y1="70" x2="20" y2="95" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#mol-${id})`} />
        </svg>
      );
    case "rx-pattern":
      return (
        <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.06 }}>
          <defs>
            <pattern id={`rx-${id}`} width="90" height="90" patternUnits="userSpaceOnUse">
              <g fill={accent} fontFamily="serif" fontSize="28" fontWeight="700">
                <text x="20" y="48">℞</text>
              </g>
              <circle cx="68" cy="68" r="2" fill={gold} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#rx-${id})`} />
        </svg>
      );
    case "stethoscope-wave":
      return (
        <>
          <svg className="absolute inset-x-0 top-1/3 h-48" viewBox="0 0 800 200" preserveAspectRatio="none" style={{ opacity: 0.08 }}>
            <path d="M0 100 Q200 20 400 100 T800 100" fill="none" stroke={accent} strokeWidth="2" />
            <path d="M0 120 Q200 40 400 120 T800 120" fill="none" stroke={gold} strokeWidth="1.5" />
            <path d="M0 140 Q200 60 400 140 T800 140" fill="none" stroke={accent} strokeWidth="1" opacity="0.7" />
          </svg>
          <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.05 }}>
            <defs>
              <pattern id={`st-${id}`} width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.2" fill={accent} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#st-${id})`} />
          </svg>
        </>
      );
    default:
      return null;
  }
}

function Border({ kind, palette }: { kind: TemplateConfig["border"]; palette: TemplateConfig["palette"] }) {
  const common = "absolute inset-4 pointer-events-none";
  switch (kind) {
    case "double":
      return (
        <>
          <div className={common} style={{ border: `2px solid ${palette.primary}` }} />
          <div className="absolute inset-6 pointer-events-none" style={{ border: `1px solid ${palette.gold}` }} />
        </>
      );
    case "thick":
      return <div className={common} style={{ border: `6px solid ${palette.primary}` }} />;
    case "rounded":
      return (
        <div className={common} style={{ border: `3px solid ${palette.primary}`, borderRadius: 18 }} />
      );
    case "art-deco":
      return (
        <>
          <div className={common} style={{ border: `2px solid ${palette.gold}` }} />
          <div className="absolute inset-7 pointer-events-none" style={{ border: `1px solid ${palette.gold}` }} />
          {["top-4 left-4", "top-4 right-4", "bottom-4 right-4", "bottom-4 left-4"].map((c, i) => (
            <div key={i} className={`absolute ${c} h-8 w-8`} style={{ background: palette.gold }} />
          ))}
        </>
      );
    case "minimal":
      return <div className={common} style={{ border: `1px solid ${palette.muted}` }} />;
    case "dashed":
      return <div className={common} style={{ border: `2px dashed ${palette.accent}` }} />;
  }
}

function Caduceus({ color, size = 56 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 4v56" stroke={color} strokeWidth="2" />
      <path d="M32 10c-8 4-12 10-12 18s4 14 12 18M32 10c8 4 12 10 12 18s-4 14-12 18" stroke={color} strokeWidth="2" />
      <path d="M22 6l10 6 10-6M22 14l10 6 10-6" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function IconBadge({ kind, palette }: { kind: TemplateConfig["icon"]; palette: TemplateConfig["palette"] }) {
  const c = palette.primary;
  const g = palette.gold;
  return (
    <svg width="72" height="80" viewBox="0 0 72 80">
      <path d="M36 2 L70 12 V40 Q70 64 36 78 Q2 64 2 40 V12 Z" fill={c} stroke={g} strokeWidth="2" />
      <g transform="translate(20 18)" fill="none" stroke={g} strokeWidth="2.5" strokeLinecap="round">
        {kind === "cross" || kind === "shield" ? (
          <>
            <path d="M16 4 V28 M4 16 H28" />
          </>
        ) : kind === "heart" ? (
          <path d="M16 28 L4 16 Q4 6 12 6 Q16 6 16 12 Q16 6 20 6 Q28 6 28 16 Z" />
        ) : kind === "caduceus" ? (
          <>
            <path d="M16 4 V28" />
            <path d="M10 8 Q16 12 22 8 M10 16 Q16 20 22 16" />
          </>
        ) : kind === "stethoscope" ? (
          <>
            <path d="M8 6 V14 Q8 22 16 22 Q24 22 24 14 V6" />
            <circle cx="16" cy="26" r="3" />
          </>
        ) : kind === "microscope" ? (
          <>
            <path d="M12 6 L20 6 L20 14 L12 14 Z M14 14 L14 22 M6 26 H26" />
          </>
        ) : (
          <>
            <path d="M8 6 Q24 14 8 22 Q24 30 8 38" transform="scale(0.7) translate(2 0)" />
          </>
        )}
      </g>
    </svg>
  );
}

function Seal({ palette, preset }: { palette: TemplateConfig["palette"]; preset?: "default" | "university-red" }) {
  const isUni = preset === "university-red";
  const ring = isUni ? "#a31621" : palette.primary;
  const accent = isUni ? "#d4af37" : palette.gold;
  const ribbon = isUni ? "#7a0f1a" : palette.accent;
  return (
    <svg width="128" height="148" viewBox="0 0 128 148">
      <path d="M40 100 L28 142 L52 128 L64 142 L76 128 L100 142 L88 100 Z" fill={ribbon} />
      <path d="M40 100 L28 142 L52 128 L64 142 L76 128 L100 142 L88 100 Z" fill="none" stroke={accent} strokeWidth="1" />
      <circle cx="64" cy="60" r="56" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="2 3" />
      <circle cx="64" cy="60" r="46" fill={ring} />
      <circle cx="64" cy="60" r="46" fill="none" stroke={accent} strokeWidth="2" />
      <circle cx="64" cy="60" r="38" fill="none" stroke={accent} strokeWidth="0.8" />
      <g fill={accent} fillOpacity="0.95">
        {Array.from({ length: 7 }).map((_, i) => {
          const a = -110 + i * 14;
          const x = 64 + Math.cos((a * Math.PI) / 180) * 42;
          const y = 60 + Math.sin((a * Math.PI) / 180) * 42;
          return <ellipse key={`l${i}`} cx={x} cy={y} rx="5" ry="2.2" transform={`rotate(${a + 90} ${x} ${y})`} />;
        })}
        {Array.from({ length: 7 }).map((_, i) => {
          const a = -70 - i * 14;
          const x = 64 + Math.cos((a * Math.PI) / 180) * 42;
          const y = 60 + Math.sin((a * Math.PI) / 180) * 42;
          return <ellipse key={`r${i}`} cx={x} cy={y} rx="5" ry="2.2" transform={`rotate(${a - 90} ${x} ${y})`} />;
        })}
      </g>
      <g transform="translate(64 60)">
        <rect x="-5" y="-18" width="10" height="36" fill={accent} rx="1.5" />
        <rect x="-18" y="-5" width="36" height="10" fill={accent} rx="1.5" />
      </g>
      <text x="64" y="104" textAnchor="middle" fontSize="6.2" fill={accent} fontFamily="serif" letterSpacing="2" fontWeight="700">
        {isUni ? "UNIVERSITAS · MEDICINAE" : "OFFICIALLY · VERIFIED"}
      </text>
    </svg>
  );
}

function DefaultTopLogo({ palette }: { palette: TemplateConfig["palette"] }) {
  const red = "#c1121f";
  const dark = "#7a0f17";
  const gold = palette.gold;
  return (
    <svg width="68" height="78" viewBox="0 0 68 78">
      <path d="M34 2 L64 12 V40 Q64 62 34 76 Q4 62 4 40 V12 Z" fill={red} stroke={gold} strokeWidth="2" />
      <path d="M34 8 L58 16 V40 Q58 58 34 70 Q10 58 10 40 V16 Z" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1" />
      <path d="M22 20 V34 Q22 44 34 44 Q46 44 46 34 V20" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M34 44 V50" stroke="#fff" strokeWidth="2" />
      <circle cx="34" cy="55" r="6" fill="#fff" stroke={gold} strokeWidth="1.2" />
      <rect x="32.5" y="51.5" width="3" height="7" fill={dark} />
      <rect x="30.5" y="53.5" width="7" height="3" fill={dark} />
      <text x="34" y="74" textAnchor="middle" fontSize="5" fill={gold} fontFamily="serif" letterSpacing="1.6" fontWeight="700">MEDICUS</text>
    </svg>
  );
}

function Signature({ name, role }: { name: string; role: string }) {
  return (
    <div className="text-center">
      {/* <div className="mb-1 italic text-slate-700" style={{ fontFamily: "'Great Vibes', cursive", fontSize: 22 }}>
        {name.split(" ")[0]}
      </div> */}
      <div className="mx-auto mb-1 h-px w-40 bg-current opacity-60" />
      <div className="text-[11px] font-semibold">{name}</div>
      <div className="text-[9px] uppercase tracking-widest opacity-70">{role}</div>
    </div>
  );
}

export const CertificatePreview = forwardRef<HTMLDivElement, Props>(function CertificatePreview(
  { template, data, uploads, overrides },
  ref,
) {
  const { palette } = template;
  const isLandscape = template.orientation === "landscape";
  const w = isLandscape ? A4.h : A4.w;
  const h = isLandscape ? A4.w : A4.h;
  const bgKind = overrides.backgroundOverride ?? template.background;
  const ls = overrides.logoSettings;

  return (
    <div
      ref={ref}
      data-certificate
      className="relative overflow-hidden font-serif text-slate-900 shadow-2xl"
      style={{
        width: w,
        height: h,
        background: palette.bg,
        color: palette.text,
      }}
    >
      <Background kind={bgKind} palette={palette} />
      <Border kind={template.border} palette={palette} />

      {/* Top LEFT logo (uploaded or default red medical emblem) */}
      <div
        style={{
          position: "absolute",
          top: 28 + ls.offsetY,
          left: 36 + ls.offsetX,
          width: ls.size,
          height: ls.size,
        }}
      >
        {uploads.logo ? (
          <img src={uploads.logo} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <DefaultTopLogo palette={palette} />
        )}
      </div>
      {uploads.hospitalLogo && (
        <img
          src={uploads.hospitalLogo}
          alt=""
          style={{ position: "absolute", top: 30, right: 36, width: 44, height: 44, objectFit: "contain" }}
        />
      )}

      {/* Top RIGHT certificate ID badge */}
      <div
        className="absolute top-7 right-7 rounded-md px-3 py-1.5 text-right"
        style={{ border: `1px solid ${palette.gold}`, background: `${palette.bgSoft}` }}
      >
        <div className="text-[8px] uppercase tracking-[0.25em]" style={{ color: palette.muted }}>Certificate ID</div>
        <div className="text-[11px] font-semibold" style={{ color: palette.primary, fontFamily: "'Playfair Display', serif" }}>{data.certId}</div>
      </div>

      <div className="relative flex h-full flex-col items-center px-16 pt-20 pb-14 text-center">
        {/* Header */}
        {uploads.centerLogo ? (
          <img src={uploads.centerLogo} alt="Logo" style={{ width: "100%", height: "10%", objectFit: "contain" }} />
        ) : (
          <>
        <IconBadge kind={template.icon} palette={palette} />
        </>
      )}
        <div className="mt-3 text-[20px] font-semibold " style={{ color: palette.accent , fontFamily: "'Great Vibes', 'Brush Script MT', cursive",}}>
        {/* <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: palette.accent , fontFamily: "'Great Vibes', 'Brush Script MT', cursive",}}> */}
          {data.organization}
        </div>

        {/* Stylized title block — "This is to certify that" + script title with gold rules */}
        <div className="mt-5 flex w-full max-w-2xl flex-col items-center">
          <div className="flex w-full items-center justify-center gap-3">
            <span className="h-px flex-1" style={{ background: palette.gold }} />
            <span
              className="italic"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: palette.muted,
                fontSize: 13,
                letterSpacing: "0.08em",
              }}
            >
              This is to certify that
            </span>
            <span className="h-px flex-1" style={{ background: palette.gold }} />
          </div>
          <h1
            className="mt-1 leading-none"
            style={{
              color: "#c1121f",
              fontSize : 50,
              // fontSize: isLandscape ? 50 : 60,
              // fontFamily: "'Great Vibes', 'Brush Script MT', cursive",
              fontWeight: 400,
              // letterSpacing: "0.01em",
            }}
          >
            {data.certificateTitle}
          </h1>
        </div>

        <div className="my-3 flex items-center gap-3 text-xs uppercase tracking-[0.4em]" style={{ color: palette.gold }}>
          <span className="h-px w-12" style={{ background: palette.gold }} />
          {template.category}
          <span className="h-px w-12" style={{ background: palette.gold }} />
        </div>


        <div className="mt-2 text-sm" style={{ color: palette.muted }}>
          This certificate is proudly presented to
        </div>

        <div
          className="mt-3"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: isLandscape ? 40 : 46,
            color: palette.primary,
            fontWeight: 700,
            letterSpacing: "0.02em",
            lineHeight: 1.1,
          }}
        >
          {data.recipient}
        </div>
        <div className="mx-auto mt-2 h-px w-2/3" style={{ background: palette.gold }} />

        <p className="mt-5 max-w-2xl text-[13px] leading-relaxed" style={{ color: palette.text }}>
          {data.description}
        </p>

        <div className="mt-5 text-sm" style={{ color: palette.muted }}>
          for successfully completing
        </div>
        <div
          className="mt-4 mb-4"
          style={{
            // fontFamily: "'Great Vibes', 'Brush Script MT', cursive",
            // fontSize: isLandscape ? 48 : 56,
            fontSize: 40,
            color: palette.accent,
            lineHeight: 1,
          }}
        >
          {data.course}
        </div>

        {/* Meta row — Date/Hours centered on top gold rule; QR + ID on left */}
        <div
          className="relative mt-6 grid w-full grid-cols-2 items-center gap-3 px-2 pt-5 pb-3"
          style={{ borderTop: `1px solid ${palette.gold}`, borderBottom: `1px solid ${palette.gold}` }}
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-1 text-center"
            style={{ background: palette.bg, border: `1px solid ${palette.gold}` }}
          >
            <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: palette.muted }}>Date</span>
            <span className="mx-1.5 text-[10px] font-semibold" style={{ color: palette.primary }}>{data.date}</span>
            <span style={{ color: palette.gold }}>·</span>
            <span className="mx-1.5 text-[9px] uppercase tracking-[0.3em]" style={{ color: palette.muted }}>Hours</span>
            <span className="text-[10px] font-semibold" style={{ color: palette.accent }}>{data.duration}</span>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="rounded-sm bg-white p-1" style={{ border: `1px solid ${palette.gold}` }}>
              <QRCodeSVG value={`CERT:${data.certId}`} size={56} level="M" fgColor={palette.primary} bgColor="#ffffff" />
            </div>
            <div>
              <div className="text-[8px] uppercase tracking-[0.25em]" style={{ color: palette.muted }}>Certificate ID</div>
              <div className="text-[11px] font-semibold" style={{ color: palette.primary, fontFamily: "'Playfair Display', serif" }}>{data.certId}</div>
              <div className="mt-1 text-[8px] uppercase tracking-[0.2em]" style={{ color: palette.muted }}>Scan to Verify</div>
            </div>
          </div>
          {/* <div className="text-center">
            <div className="text-[8px] uppercase tracking-[0.3em]" style={{ color: palette.muted }}>Hosted By</div>
            <div
              className="text-[15px]"
              style={{ color: palette.primary, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
              {data.hostedBy}
            </div>
          </div> */}
          
          <div className="text-right">
            <div className="text-[8px] uppercase tracking-[0.3em]" style={{ color: palette.muted }}>Completion Date</div>
            <div
              className="text-[13px]"
              style={{ color: palette.accent, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              {data.certData}
            </div>
          </div>
          {/* <div className="text-right">
            <div className="text-[8px] uppercase tracking-[0.3em]" style={{ color: palette.muted }}>Certificate Type</div>
            <div
              className="text-[13px]"
              style={{ color: palette.accent, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              {data.certType}
            </div>
          </div> */}
        </div>
      

      {/* <div
  className="relative mt-6 grid w-full grid-cols-3 gap-3 px-2 pt-5 pb-3"
  style={{
    borderTop: `1px solid ${palette.gold}`,
    borderBottom: `1px solid ${palette.gold}`,
  }}
> */}
  <div className="flex flex-col items-center justify-center text-center mt-5">
    <div
      className="text-[8px] uppercase tracking-[0.3em]"
      style={{ color: palette.muted }}
    >
      Hosted By
    </div>

    <div
      className="text-[15px]"
      style={{
        color: palette.primary,
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
      }}
    >
      {data.hostedBy}
    </div>
  </div>
{/* </div> */}


        {/* Footer */}
        <div className="mt-auto grid w-full grid-cols-3 items-end gap-4">
          <div>
            {uploads.signatureLeft && (
              <img src={uploads.signatureLeft} alt="" className="mx-auto mb-1 h-10 object-contain" />
            )}
            <Signature name={data.instructor} role="Instructor" />
          </div>
          <div className="flex justify-center">
            {uploads.seal ? (
              <img src={uploads.seal} alt="seal" className="h-24 w-24 object-contain" />
            ) : (
              <Seal palette={palette} preset={overrides.sealPreset} />
            )}
          </div>
          <div>
            {uploads.signatureRight && (
              <img src={uploads.signatureRight} alt="" className="mx-auto mb-1 h-10 object-contain" />
            )}
            <Signature name={data.director} role="Director" />
          </div>
        </div>

        {/* Company footer — centered */}
        <div
          className="mt-5 flex w-full flex-col items-center gap-1 pt-3 text-center"
          style={{ borderTop: `1px solid ${palette.gold}` }}
        >
          {uploads.footerLogo && (
            <img src={uploads.footerLogo} alt="" className="mb-1 h-8 object-contain" />
          )}
          <div
            className="text-[12px] font-bold"
            style={{ color: palette.primary, fontFamily: "'Playfair Display', serif", letterSpacing: "0.08em" }}
          >
            {data.footerCompany}
          </div>
          <div className="text-[10px]" style={{ color: palette.muted }}>
            {data.footerAddress}
          </div>
          <div className="flex items-center gap-2 text-[10px]" style={{ color: palette.accent }}>
            <span>{data.footerWebsite}</span>
            {/* <span style={{ color: palette.gold }}>·</span>
            <span>{data.footerEmail}</span> */}
          </div>
          <div className="flex items-center gap-2 text-[10px]" style={{ color: palette.accent }}>
            {/* <span>{data.footerWebsite}</span>
            <span style={{ color: palette.gold }}>·</span> */}
            <span>{data.footerEmail}</span>
          </div>
        </div>

      </div>
    </div>
  );
});
