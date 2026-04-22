"use client";

import { useEffect, useState } from "react";

type UploadRecord = {
  id: number;
  filename: string;
  path: string;
  mimeType: string;
  size: number;
};

export default function ImagePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (path: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [uploads, setUploads] = useState<UploadRecord[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/uploads", { cache: "no-store" });
      if (res.ok) setUploads(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) load();
  }, [open]);

  const onUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (res.ok) {
        const rec: UploadRecord = await res.json();
        onChange(rec.path);
        await load();
        setOpen(false);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="img-picker">
        <div
          className="thumb"
          style={value ? { backgroundImage: `url(${value})` } : undefined}
        />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/... or /images/..."
          style={{
            flex: 1,
            background: "#0b0f14",
            border: "1px solid #1f2937",
            color: "#e6edf3",
            padding: "10px 12px",
            borderRadius: 6,
            fontSize: 14,
          }}
        />
        <button
          type="button"
          className="btn ghost"
          onClick={() => setOpen(true)}
        >
          Browse
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#121923",
              border: "1px solid #1f2937",
              borderRadius: 10,
              padding: 24,
              width: "100%",
              maxWidth: 900,
              maxHeight: "85vh",
              overflow: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h3 style={{ margin: 0 }}>Select image</h3>
              <button className="btn ghost" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="btn" style={{ display: "inline-flex" }}>
                {uploading ? "Uploading…" : "Upload new"}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onUpload(f);
                  }}
                />
              </label>
            </div>

            {loading && <p className="section-muted">Loading…</p>}
            {!loading && uploads.length === 0 && (
              <p className="section-muted">No uploads yet.</p>
            )}
            <div className="img-grid">
              {uploads.map((u) => (
                <div
                  key={u.id}
                  className="img-tile"
                  onClick={() => {
                    onChange(u.path);
                    setOpen(false);
                  }}
                >
                  <div
                    className="img-preview"
                    style={{ backgroundImage: `url(${u.path})` }}
                  />
                  <div className="img-info">
                    <span className="name" title={u.filename}>
                      {u.filename}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
