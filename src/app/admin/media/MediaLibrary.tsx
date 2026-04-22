"use client";

import { useEffect, useState } from "react";

type UploadRecord = {
  id: number;
  filename: string;
  path: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

function fmtSize(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function MediaLibrary() {
  const [uploads, setUploads] = useState<UploadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

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
    load();
  }, []);

  const doUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (res.ok) await load();
      else {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setToast(body.error || "Upload failed");
      }
    } finally {
      setUploading(false);
      setTimeout(() => setToast(null), 2500);
    }
  };

  const del = async (id: number) => {
    if (!confirm("Delete this file?")) return;
    const res = await fetch(`/api/admin/uploads/${id}`, { method: "DELETE" });
    if (res.ok) await load();
  };

  const copy = async (path: string) => {
    await navigator.clipboard.writeText(path);
    setToast("Copied");
    setTimeout(() => setToast(null), 1500);
  };

  return (
    <>
      <header className="admin-header">
        <h1>Media library</h1>
        <label className="btn">
          {uploading ? "Uploading…" : "Upload file"}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) doUpload(f);
            }}
          />
        </label>
      </header>

      {loading && <p className="section-muted">Loading…</p>}
      {!loading && uploads.length === 0 && (
        <p className="section-muted">No uploads yet. Drop a file above.</p>
      )}

      <div className="img-grid">
        {uploads.map((u) => (
          <div key={u.id} className="img-tile">
            <div
              className="img-preview"
              style={{ backgroundImage: `url(${u.path})` }}
              onClick={() => copy(u.path)}
              title="Click to copy path"
            />
            <div className="img-info">
              <span className="name" title={u.filename}>
                {u.filename}
              </span>
              <button className="del" onClick={() => del(u.id)}>
                delete
              </button>
            </div>
            <div
              style={{
                padding: "4px 10px 8px",
                fontSize: 11,
                color: "#6b7280",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{fmtSize(u.size)}</span>
              <span>{u.mimeType}</span>
            </div>
          </div>
        ))}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
