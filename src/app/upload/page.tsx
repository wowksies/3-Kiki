'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, ImagePlus, Loader2, Lock, ShieldCheck, X } from 'lucide-react';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'ok' }
  | { kind: 'error'; message: string };

export default function UploadPage() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [preview, setPreview] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      setFilename(null);
      return;
    }
    setFilename(file.name);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: 'submitting' });
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ kind: 'error', message: data.error || `Upload failed (${res.status})` });
        return;
      }
      setStatus({ kind: 'ok' });
      (e.target as HTMLFormElement).reset();
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      setFilename(null);
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Network error',
      });
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b1024] via-[#0a0a1a] to-black px-4 py-12 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.18),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(244,114,182,0.12),transparent_50%)]" />

      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to memories
        </Link>

        <header className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-white/70">
            <Lock className="h-3 w-3" /> Class-only upload
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Add a memory</h1>
          <p className="mt-3 text-white/70">
            Upload a pic from the last three years. It commits straight to our class repo and shows up in the
            gallery on the homepage.
          </p>
        </header>

        <form
          onSubmit={onSubmit}
          className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
        >
          <Field label="Class PIN" hint="Ask in the group chat if you don't have it.">
            <input
              name="pin"
              type="password"
              required
              autoComplete="off"
              inputMode="numeric"
              placeholder="••••••"
              className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/30"
            />
          </Field>

          <Field label="Your name" hint="Shows under the pic. Up to 40 chars.">
            <input
              name="uploader"
              type="text"
              maxLength={40}
              placeholder="e.g. Kajus"
              className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/30"
            />
          </Field>

          <Field label="Caption" hint="Up to 80 chars. Appears under the photo in the gallery.">
            <input
              name="caption"
              type="text"
              maxLength={80}
              placeholder="e.g. 2nd year geography trip"
              className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/30"
            />
          </Field>

          <Field label="Photo" hint="JPG / PNG / WebP / GIF / HEIC. Max 8 MB.">
            <label
              htmlFor="file"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white/20 bg-black/20 px-6 py-10 text-center transition hover:border-amber-300/60 hover:bg-black/30"
            >
              {preview ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="preview"
                    className="max-h-40 rounded-md object-contain"
                  />
                  <span className="text-xs text-white/60">{filename}</span>
                  <span className="text-xs text-amber-300">Click to swap</span>
                </>
              ) : (
                <>
                  <ImagePlus className="h-8 w-8 text-white/60" />
                  <span className="text-sm text-white/70">Click or drag a photo</span>
                </>
              )}
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif"
              required
              className="hidden"
              onChange={onFileChange}
            />
          </Field>

          <button
            type="submit"
            disabled={status.kind === 'submitting'}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-300 px-4 py-3 font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status.kind === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Uploading…
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" /> Upload to class repo
              </>
            )}
          </button>

          {status.kind === 'ok' && (
            <p className="rounded-md border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm text-emerald-200">
              Uploaded. It may take a few seconds before it shows up on the homepage.
            </p>
          )}
          {status.kind === 'error' && (
            <p className="flex items-start gap-2 rounded-md border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">
              <X className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{status.message}</span>
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-xs text-white/40">
          Photos are public in the GitHub repo. Don't upload anything you wouldn't post in the class group chat.
        </p>
      </div>
    </main>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-white/90">{label}</label>
      {hint && <p className="mb-2 text-xs text-white/50">{hint}</p>}
      {children}
    </div>
  );
}
