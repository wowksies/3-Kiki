'use client';

type Props = {
  year: string;
  range: string;
  image: string;
  blurb: string;
  accent: string;
  slug: string;
  className: string;
};

export default function ClassPhotoCard({ year, range, image, blurb, accent, slug }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-white/25">
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`${year} class photo`}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = '0';
          }}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-30 mix-blend-overlay`}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-widest backdrop-blur-sm">
          {range}
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6 text-center text-[10px] uppercase tracking-widest text-white/30">
          {`drop file: public/class-photos/${slug}.jpg`}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-bold">{year}</h3>
          <span className="text-xs text-white/50">{range}</span>
        </div>
        <p className="mt-2 text-sm text-white/70">{blurb}</p>
      </div>
    </article>
  );
}
