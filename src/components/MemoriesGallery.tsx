'use client';

import { useEffect, useState } from 'react';
import CircularGallery from './CircularGallery';
import Lightbox from './Lightbox';
import { Loader2, ZoomIn } from 'lucide-react';

type MemoryItem = {
  image: string;
  text: string;
  uploader: string;
  uploadedAt: number;
};

export default function MemoriesGallery() {
  const [items, setItems] = useState<MemoryItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
        <p className="text-lg">No memories yet.</p>
        <p className="mt-1 text-sm">
          Be first. Head to <span className="text-amber-300">/upload</span>.
        </p>
        {error && <p className="mt-3 text-xs text-red-400/70">({error})</p>}
      </div>
    );
  }

  const lightboxItems = items.map((m) => ({
    image: m.image,
    text: m.text,
    uploader: m.uploader,
  }));

  const galleryItems = items.map((m) => ({ image: m.image, text: m.text }));

  return (
    <>
      {items.length < 2 ? (
        <SinglePreview item={items[0]} onClick={() => setLightboxIndex(0)} />
      ) : (
        <CircularGallery
          items={galleryItems}
          bend={2}
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.07}
          textColor="#ffffff"
          onItemClick={(i) => setLightboxIndex(i)}
        />
      )}
      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex(
              (idx) => ((idx ?? 0) - 1 + lightboxItems.length) % lightboxItems.length
            )
          }
          onNext={() =>
            setLightboxIndex((idx) => ((idx ?? 0) + 1) % lightboxItems.length)
          }
        />
      )}
    </>
  );
}

function SinglePreview({
  item,
  onClick,
}: {
  item: MemoryItem;
  onClick: () => void;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <button
        onClick={onClick}
        className="group relative flex max-h-full max-w-full flex-col items-center gap-4 focus:outline-none"
        aria-label={`Open ${item.text} full screen`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.text}
            className="max-h-[460px] max-w-[80vw] object-contain transition group-hover:scale-[1.01]"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
            <div className="flex items-center gap-2 rounded-full border border-white/30 bg-black/60 px-4 py-2 text-sm text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
              <ZoomIn className="h-4 w-4" /> Open full
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-white">{item.text}</div>
          {item.uploader && (
            <div className="text-xs text-white/50">by {item.uploader}</div>
          )}
        </div>
      </button>
    </div>
  );
}
