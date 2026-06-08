import { useCertStore } from "@/store/certificateStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import type { Uploads } from "@/store/certificateStore";

const BG_OPTIONS = [
  "plain",
  "rose-floral",
  "medical-mandala",
  "convocation-laurel",
  "heartbeat-lines",
  "molecule-grid",
  "rx-pattern",
  "stethoscope-wave",
  "pill-pattern",
  "hex",
  "ecg",
  "dna",
  "floral",
  "corner-ornament",
  "caduceus-watermark",
  "gradient",
  "diagonal",
] as const;

function UploadField({
  label,
  field,
}: {
  label: string;
  field: keyof Uploads;
}) {
  const { uploads, setUpload } = useCertStore();
  const value = uploads[field];
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <div className="flex items-center gap-2">
        <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-md border bg-background px-3 py-2 text-xs hover:bg-accent">
          <Upload className="h-3.5 w-3.5" />
          <span className="truncate">{value ? "Replace" : "Upload"}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const r = new FileReader();
              r.onload = () => setUpload(field, r.result as string);
              r.readAsDataURL(f);
            }}
          />
        </label>
        {value && (
          <Button size="icon" variant="ghost" onClick={() => setUpload(field, undefined)}>
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
        {value && <img src={value} alt="" className="h-8 w-8 rounded border object-contain" />}
      </div>
    </div>
  );
}

export function FormPanel() {
  const { data, setField, overrides, setOverride, setLogoSetting } = useCertStore();

  const f = (k: keyof typeof data, label: string, type = "text") => (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <Input type={type} value={data[k]} onChange={(e) => setField(k, e.target.value)} />
    </div>
  );

  return (
    <aside className="flex h-full w-[340px] flex-col border-l bg-card">
      <div className="border-b p-4">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Configure</div>
        <div className="text-lg font-semibold">Certificate Details</div>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          {f("recipient", "Recipient Name")}
          {f("organization", "Organization Name")}
          {f("certificateTitle", "Certificate Title")}
          {/* {f("hostedBy", "Host Name")} */}
          {f("course", "Course Name")}
          <div className="grid grid-cols-2 gap-3">
            {f("date", "Date")}
            {f("duration", "Duration")}
          </div>
          {f("certId", "Certificate ID")}
          {f("hostedBy", "Hosted By (center)")}
          {f("certType", "Certificate Type (right)")}
          {f("organization", "Organization")}
          <div className="space-y-1.5">
            <Label className="text-xs">Description</Label>
            <Textarea
              rows={3}
              value={data.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-3">
            {f("instructor", "Instructor")}
            {f("director", "Director")}
          </div>

          <Separator />
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Style</div>

          <div className="space-y-1.5">
            <Label className="text-xs">Seal preset</Label>
            <Select
              value={overrides.sealPreset ?? "default"}
              onValueChange={(v) => setOverride("sealPreset", v as "default" | "university-red")}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default (Template color)</SelectItem>
                <SelectItem value="university-red">University Red + Gold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Background override</Label>
            <Select
              value={overrides.backgroundOverride ?? "__none"}
              onValueChange={(v) =>
                setOverride("backgroundOverride", v === "__none" ? undefined : (v as (typeof BG_OPTIONS)[number]))
              }
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="__none">Use template default</SelectItem>
                {BG_OPTIONS.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Uploads</div>
          <UploadField label="Top-right logo" field="logo" />
          <UploadField label="center-right logo" field="centerLogo" />
          <UploadField label="Hospital / Institute logo (top-left)" field="hospitalLogo" />
          <UploadField label="Center seal (replaces default)" field="seal" />
          <UploadField label="Signature (left)" field="signatureLeft" />
          <UploadField label="Signature (right)" field="signatureRight" />
          <UploadField label="Footer logo (centered)" field="footerLogo" />

          <Separator />
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Footer</div>
          {f("footerCompany", "Company")}
          {f("footerAddress", "Address")}
          <div className="grid grid-cols-2 gap-3">
            {f("footerWebsite", "Website")}
            {f("footerEmail", "Email")}
          </div>

          <div className="space-y-2 rounded-md border bg-background p-3">
            <div className="text-xs font-semibold">Logo position & size</div>
            <div>
              <Label className="text-[11px]">Size: {overrides.logoSettings.size}px</Label>
              <Slider
                value={[overrides.logoSettings.size]}
                min={32}
                max={140}
                step={2}
                onValueChange={(v) => setLogoSetting("size", v[0])}
              />
            </div>
            <div>
              <Label className="text-[11px]">Offset X: {overrides.logoSettings.offsetX}px</Label>
              <Slider
                value={[overrides.logoSettings.offsetX]}
                min={-60}
                max={60}
                step={1}
                onValueChange={(v) => setLogoSetting("offsetX", v[0])}
              />
            </div>
            <div>
              <Label className="text-[11px]">Offset Y: {overrides.logoSettings.offsetY}px</Label>
              <Slider
                value={[overrides.logoSettings.offsetY]}
                min={-30}
                max={60}
                step={1}
                onValueChange={(v) => setLogoSetting("offsetY", v[0])}
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
