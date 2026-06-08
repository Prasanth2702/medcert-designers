import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TemplateSidebar } from "@/components/TemplateSidebar";
import { PreviewPanel } from "@/components/PreviewPanel";
import { FormPanel } from "@/components/FormPanel";
import { ExampleTemplatesDialog } from "@/components/ExampleTemplatesDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CertificatePreview } from "@/components/CertificatePreview";
import { useCertStore } from "@/store/certificateStore";
import { TEMPLATES } from "@/lib/templates";
import { Toaster } from "@/components/ui/sonner";
import { Stethoscope } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedCert Studio — Medical Certificate Generator" },
      { name: "description", content: "Design, customize, and export premium medical certificates as PDF, PNG, or SVG. 40 healthcare-themed templates." },
    ],
  }),
  component: Page,
});

function Page() {
  const [examplesOpen, setExamplesOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const { selectedId, data, uploads, overrides } = useCertStore();
  const template = TEMPLATES.find((t) => t.id === selectedId) ?? TEMPLATES[0];

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b bg-card px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">MedCert Studio</h1>
            <p className="text-[11px] text-muted-foreground">Premium medical certificate generator · A4 / Letter ready</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">40 templates · PDF · PNG · SVG export</div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <TemplateSidebar onOpenExamples={() => setExamplesOpen(true)} />
        <main className="flex-1 overflow-hidden">
          <PreviewPanel onFullscreen={() => setFullscreen(true)} />
        </main>
        <FormPanel />
      </div>

      <ExampleTemplatesDialog open={examplesOpen} onOpenChange={setExamplesOpen} />

      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent className="max-w-[95vw] overflow-auto p-2">
          <div className="flex justify-center overflow-auto">
            <CertificatePreview template={template} data={data} uploads={uploads} overrides={overrides} />
          </div>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}
