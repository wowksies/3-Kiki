'use client';

import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, User } from 'lucide-react';

type Item = {
  image: string;
  text: string;
  uploader?: string;
};

type Props = {
  items: Item[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ items, index, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  const item = items[index];
  if (!item) return null;

  const hasMany = items.length > 1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:border-white/40 hover:bg-black/70"
      >
        <X className="h-5 w-5" />
      </button>

      {hasMany && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous"
            className="absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:border-white/40 hover:bg-black/70 sm:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next"
            className="absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:border-white/40 hover:bg-black/70 sm:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div
        className="relative flex max-h-[90vh] max-w-[92vw] flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.text}
          className="max-h-[78vh] max-w-[92vw] rounded-lg object-contain shadow-2xl shadow-black"
        />
        <div className="flex w-full flex-col items-center gap-1 text-center text-white">
          <div className="text-lg font-semibold">{item.text}</div>
          {item.uploader && (
            <div className="inline-flex items-center gap-1.5 text-xs text-white/60">
              <User className="h-3 w-3" /> {item.uploader}
            </div>
          )}
          {hasMany && (
            <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
              {index + 1} / {items.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
