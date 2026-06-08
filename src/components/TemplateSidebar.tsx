import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { TEMPLATES } from "@/lib/templates";
import { useCertStore } from "@/store/certificateStore";
import { CertificatePreview } from "@/components/CertificatePreview";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Academic", "Hospital", "Laboratory", "Research", "Nursing", "Excellence", "Training", "Conference"] as const;

export function TemplateSidebar({ onOpenExamples }: { onOpenExamples: () => void }) {
  const { selectedId, setSelected, data, uploads, overrides } = useCertStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const list = useMemo(
    () =>
      TEMPLATES.filter(
        (t) =>
          (cat === "All" || t.category === cat) &&
          (q === "" || t.name.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, cat],
  );

  return (
    <aside className="flex h-full w-[320px] flex-col border-r bg-card">
      <div className="space-y-3 border-b p-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Templates</div>
          <div className="text-lg font-semibold">40 Medical Designs</div>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search templates" className="pl-8" />
        </div>
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map((c) => (
            <Badge
              key={c}
              variant={cat === c ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setCat(c)}
            >
              {c}
            </Badge>
          ))}
        </div>
        <Button className="w-full" variant="secondary" onClick={onOpenExamples}>
          ✨ Premium Examples (20)
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-2 gap-3 p-3">
          {list.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={cn(
                "group relative overflow-hidden rounded-md border bg-background text-left transition hover:border-primary",
                selectedId === t.id && "border-primary ring-2 ring-primary/30",
              )}
            >
              <div className="relative h-32 overflow-hidden">
                <div
                  style={{
                    transform: "scale(0.16)",
                    transformOrigin: "top left",
                    width: t.orientation === "landscape" ? 1123 : 794,
                  }}
                >
                  <CertificatePreview template={t} data={data} uploads={uploads} overrides={overrides} />
                </div>
              </div>
              <div className="border-t p-2">
                <div className="line-clamp-1 text-[11px] font-semibold">{t.name}</div>
                <div className="text-[10px] text-muted-foreground">{t.category} · {t.orientation}</div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
