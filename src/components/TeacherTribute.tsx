'use client';

import { Quote } from 'lucide-react';
import { useState } from 'react';

const TRAITS = [
  { label: 'Strict', tint: 'border-amber-300/40 bg-amber-300/10 text-amber-200' },
  { label: 'Warm', tint: 'border-rose-300/40 bg-rose-300/10 text-rose-200' },
  { label: 'Sharp', tint: 'border-sky-300/40 bg-sky-300/10 text-sky-200' },
  { label: 'Family', tint: 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200' },
];

export default function TeacherTribute() {
  const [portraitMissing, setPortraitMissing] = useState(false);

  return (
    <section
      id="maistir"
      className="relative isolate overflow-hidden border-y border-white/5 py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#070713] via-[#0d0a1f] to-[#070713]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.10),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(244,114,182,0.08),transparent_55%)]" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-300">
            The man, the class name
          </div>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Maistir Kirwan
          </h2>
          <p className="mt-3 text-sm uppercase tracking-widest text-white/50">
            Our teacher · 2023 — 2026
          </p>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,360px)_1fr] md:gap-14">
          {/* PORTRAIT */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] shadow-2xl shadow-black/40">
            {!portraitMissing ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/teacher/maistir-kirwan.jpg"
                alt="Maistir Kirwan portrait"
                onError={() => setPortraitMissing(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/5 text-3xl font-bold text-white/40">
                  MK
                </div>
                <div className="text-sm font-medium text-white/70">Portrait coming soon</div>
                <div className="text-[10px] uppercase tracking-widest text-white/30">
                  drop file: public/teacher/maistir-kirwan.jpg
                </div>
              </div>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5">
              <div className="text-xs uppercase tracking-widest text-white/60">3 Kirwan</div>
              <div className="font-semibold text-white">Maistir Kirwan</div>
            </div>
          </div>

          {/* TRIBUTE */}
          <div>
            <Quote className="mb-4 h-8 w-8 text-amber-300/70" />
            <blockquote className="text-2xl font-medium leading-relaxed text-white/90 sm:text-3xl">
              He made us a class, not a class number. Three years later we're still 3 Kirwan —
              because that's what he built.
            </blockquote>

            <div className="mt-8 flex flex-wrap gap-2">
              {TRAITS.map((t) => (
                <span
                  key={t.label}
                  className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-widest ${t.tint}`}
                >
                  {t.label}
                </span>
              ))}
            </div>

            <div className="mt-8 space-y-4 text-white/75">
              <p>
                Strict in the best way. The kind of strict that turned a room of randomers into a
                class — actual character, actual standards, actual respect. Half the reason we
                walked into 3rd year as people instead of just kids in uniforms.
              </p>
              <p>
                He never let us slack off, and he never let us settle for being “just another
                class on the timetable.” He made us feel like we belonged to something. Other
                years had their classes; we had Kirwan.
              </p>
              <p>
                Three years, one teacher, one class. That's not a small thing — that's the whole
                thing. Thanks, Maistir.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm text-white/50">
              <div className="h-px flex-1 bg-white/10" />
              <span className="uppercase tracking-widest">— 3 Kirwan, Class of 2026</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
