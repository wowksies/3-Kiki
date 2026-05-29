'use client';

import { useEffect, useState } from 'react';
import CircularGallery from './CircularGallery';
import { Loader2 } from 'lucide-react';

type MemoryItem = {
  image: string;
  text: string;
  uploader: string;
  uploadedAt: number;
};

export default function MemoriesGallery() {
  const [items, setItems] = useState<MemoryItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/memories', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) setError(data.error);
        setItems(Array.isArray(data.items) ? data.items : []);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Failed to load');
        setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (items === null) {
    return (
      <div className="flex h-full w-full items-center justify-center text-white/60">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading memories…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center text-center text-white/60">
        <p className="text-lg">No memories uploaded yet.</p>
        <p className="mt-1 text-sm">
          Be first — head to <span className="text-amber-300">/upload</span>.
        </p>
        {error && <p className="mt-3 text-xs text-red-400/70">({error})</p>}
      </div>
    );
  }

  return (
    <CircularGallery
      items={items.map((m) => ({ image: m.image, text: m.text }))}
      bend={3}
      borderRadius={0.05}
      scrollSpeed={2}
      scrollEase={0.05}
      textColor="#ffffff"
    />
  );
}
