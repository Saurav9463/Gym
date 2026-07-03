import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Loader2, X } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  /** Storage subfolder, e.g. "trainers" or "gallery" — keeps the bucket organized */
  folder: string;
  label?: string;
}

const MAX_SIZE_MB = 5;
const BUCKET = "media";

export default function ImageUpload({ value, onChange, folder, label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, WEBP).");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be under ${MAX_SIZE_MB}MB.`);
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err: any) {
      console.error("Image upload failed:", err);
      // Most common cause: the "media" bucket doesn't exist yet, or storage
      // policies aren't set up — see seed-storage-bucket.sql.
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
        {label}
      </label>

      <div className="flex items-start gap-4">
        <div className="w-24 h-24 shrink-0 bg-[#0a0a0a] border border-border flex items-center justify-center overflow-hidden">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="font-mono text-[9px] text-muted-foreground text-center px-1">No image</span>
          )}
        </div>

        <div className="flex-1 space-y-2 min-w-0">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="ghost-gold-btn px-4 py-2 text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? "Uploading…" : value ? "Replace Image" : "Upload Image"}
            </button>
            {value && !uploading && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-destructive text-xs font-mono uppercase tracking-widest flex items-center gap-1 hover:underline px-2"
              >
                <X className="w-3 h-3" /> Remove
              </button>
            )}
          </div>
          {error && <p className="text-destructive text-xs">{error}</p>}
          <p className="text-muted-foreground text-[10px]">JPG/PNG/WEBP, up to {MAX_SIZE_MB}MB.</p>
        </div>
      </div>
    </div>
  );
}
