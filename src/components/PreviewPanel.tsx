import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, FileImage, FileCode, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CertificatePreview } from "@/components/CertificatePreview";
import { useCertStore } from "@/store/certificateStore";
import { TEMPLATES } from "@/lib/templates";
import { toast } from "sonner";

export function PreviewPanel({ onFullscreen }: { onFullscreen: () => void }) {
  const { selectedId, data, uploads, overrides } = useCertStore();
  const template = TEMPLATES.find((t) => t.id === selectedId) ?? TEMPLATES[0];
  const ref = useRef<HTMLDivElement>(null);

  const exportPng = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 3, backgroundColor: "#ffffff", useCORS: true });
    const link = document.createElement("a");
    link.download = `${template.name}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success("PNG downloaded");
  };

  const exportPdf = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 3, backgroundColor: "#ffffff", useCORS: true });
    const img = canvas.toDataURL("image/png");
    const orientation = template.orientation === "landscape" ? "landscape" : "portrait";
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation });
    const w = orientation === "landscape" ? 297 : 210;
    const h = orientation === "landscape" ? 210 : 297;
    pdf.addImage(img, "PNG", 0, 0, w, h, undefined, "FAST");
    pdf.save(`${template.name}.pdf`);
    toast.success("PDF downloaded");
  };

  const exportSvg = async () => {
    if (!ref.current) return;
    const el = ref.current;
    const { width, height } = el.getBoundingClientRect();
    const cloned = el.cloneNode(true) as HTMLElement;
    cloned.style.transform = "";
    const xml = new XMLSerializer().serializeToString(cloned);
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">${xml}</div></foreignObject>
</svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.name}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("SVG downloaded");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-card px-4 py-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Preview</div>
          <div className="font-semibold">{template.name}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={onFullscreen}>
            <Maximize2 className="mr-2 h-4 w-4" /> Fullscreen
          </Button>
          <Button size="sm" variant="outline" onClick={exportPng}>
            <FileImage className="mr-2 h-4 w-4" /> PNG
          </Button>
          <Button size="sm" variant="outline" onClick={exportSvg}>
            <FileCode className="mr-2 h-4 w-4" /> SVG
          </Button>
          <Button size="sm" onClick={exportPdf}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-muted/40 p-6">
        <div className="mx-auto" style={{ width: "fit-content" }}>
          <div
            style={{
              transform: "scale(0.7)",
              transformOrigin: "top center",
            }}
          >
            <CertificatePreview ref={ref} template={template} data={data} uploads={uploads} overrides={overrides} />
          </div>
        </div>
      </div>
    </div>
  );
}
