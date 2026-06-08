import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TEMPLATES, EXAMPLE_PICKS } from "@/lib/templates";
import { CertificatePreview } from "@/components/CertificatePreview";
import { useCertStore } from "@/store/certificateStore";

export function ExampleTemplatesDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { data, uploads, overrides, setSelected } = useCertStore();
  const picks = EXAMPLE_PICKS.map((i) => TEMPLATES[i]).filter(Boolean);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Premium Example Templates</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh]">
          <div className="grid grid-cols-2 gap-4 p-1 md:grid-cols-4">
            {picks.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setSelected(t.id);
                  onOpenChange(false);
                }}
                className="group overflow-hidden rounded-lg border bg-background text-left transition hover:border-primary hover:shadow-lg"
              >
                <div className="relative h-44 overflow-hidden bg-muted/30">
                  <div
                    style={{
                      transform: "scale(0.22)",
                      transformOrigin: "top left",
                      width: t.orientation === "landscape" ? 1123 : 794,
                    }}
                  >
                    <CertificatePreview template={t} data={data} uploads={uploads} overrides={overrides} />
                  </div>
                </div>
                <div className="border-t p-2">
                  <div className="line-clamp-1 text-xs font-semibold">{t.name}</div>
                  <div className="text-[10px] text-muted-foreground">{t.category}</div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
