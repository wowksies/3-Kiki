import Link from 'next/link';
import {
  ChevronDown,
  GraduationCap,
  Heart,
  ImageIcon,
  MapPin,
  Sparkles,
  Star,
  Upload,
  Users,
} from 'lucide-react';
import MemoriesGallery from '@/components/MemoriesGallery';
import ClassPhotoCard from '@/components/ClassPhotoCard';
import TeacherTribute from '@/components/TeacherTribute';

const SCHOOL = 'Coláiste na Mí';
const CLASS_NAME = '3 Kirwan';
const TEACHER = 'Maistir Kirwan';
const YEARS = '2023 – 2026';

const classYears = [
  {
    year: '1st Year',
    range: '2023 / 24',
    image: '/class-photos/1st-year.jpg',
    blurb: 'The year we walked in not knowing anyone. New uniforms, new lockers, new friends.',
    accent: 'from-emerald-400/70 to-emerald-600/40',
    slug: '1st-year',
  },
  {
    year: '2nd Year',
    range: '2024 / 25',
    image: '/class-photos/2nd-year.jpg',
    blurb: 'Class trips, sports days, and finally feeling like we owned the place a bit.',
    accent: 'from-amber-400/70 to-amber-600/40',
    slug: '2nd-year',
  },
  {
    year: '3rd Year',
    range: '2025 / 26',
    image: '/class-photos/3rd-year.jpg',
    blurb: 'Junior Cert grind, last days of Junior Cycle, and three years done together.',
    accent: 'from-fuchsia-400/70 to-fuchsia-600/40',
    slug: '3rd-year',
  },
];

const highlights = [
  {
    icon: GraduationCap,
    title: 'Junior Cycle, done',
    body: 'Three years of homework, copybooks, mocks, and Junior Cert. We made it through every one.',
  },
  {
    icon: Users,
    title: 'One class, three years',
    body: 'Same room. Same names called every morning. Same family that grew up together since 1st year.',
  },
  {
    icon: Star,
    title: 'Built different',
    body: 'Other classes were just classes. We were 3 Kirwan. There’s a difference and we all know it.',
  },
];

export default function HomePage() {
  return (
    <main className="relative bg-[#070713] text-white">
      {/* HERO */}
      <section className="relative isolate min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#0b1024] via-[#0a0a1a] to-black" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.22),transparent_55%),radial-gradient(circle_at_85%_75%,rgba(244,114,182,0.16),transparent_55%),radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.08),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:64px_64px]" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <GraduationCap className="h-5 w-5 text-amber-300" />
            <span>{CLASS_NAME}</span>
          </div>
          <div className="hidden items-center gap-6 text-sm text-white/70 sm:flex">
            <a href="#maistir" className="transition hover:text-white">
              Maistir
            </a>
            <a href="#timeline" className="transition hover:text-white">
              Timeline
            </a>
            <a href="#memories" className="transition hover:text-white">
              Memories
            </a>
          </div>
          <Link
            href="/upload"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-amber-300/60 hover:bg-white/10"
          >
            <Upload className="h-4 w-4" /> Upload
          </Link>
        </nav>

        <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-amber-300" />
            <span>Junior Cycle · {YEARS}</span>
          </div>

          <h1 className="font-[family-name:var(--font-figtree)] text-5xl font-black tracking-tight sm:text-7xl md:text-8xl">
            <span className="block bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
              Three Years
            </span>
            <span className="block bg-gradient-to-br from-amber-200 via-amber-300 to-fuchsia-300 bg-clip-text text-transparent">
              of {CLASS_NAME}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-base text-white/70 sm:text-lg">
            A small corner of the internet for our class. Three years at {SCHOOL} with{' '}
            <span className="text-amber-200">{TEACHER}</span>, the people we shared them with, and
            every awkward, brilliant, stupid memory in between.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#memories"
              className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              <ImageIcon className="h-4 w-4" /> Browse memories
            </a>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-amber-300/60 hover:bg-white/10"
            >
              <Upload className="h-4 w-4" /> Add yours
            </Link>
          </div>

          <div className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-4 text-center">
            <Stat value="3" label="years" />
            <Stat value="1" label="class · 1 teacher" />
            <Stat value="∞" label="memories" />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40">
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS STRIP */}
      <section className="border-y border-white/5 bg-white/[0.02] py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-300/15 text-amber-200">
                <h.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{h.title}</h3>
              <p className="mt-1 text-sm text-white/65">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAISTIR KIRWAN */}
      <TeacherTribute />

      {/* CLASS PHOTOS TIMELINE */}
      <section id="timeline" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-amber-300">The timeline</div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">From 1st to 3rd year</h2>
          <p className="mt-3 text-white/70">
            One class photo a year. Same faces, different uniforms, three years of getting taller
            and (probably) dumber in the best way.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {classYears.map((y) => (
            <ClassPhotoCard
              key={y.year}
              year={y.year}
              range={y.range}
              image={y.image}
              blurb={y.blurb}
              accent={y.accent}
              slug={y.slug}
              className={CLASS_NAME}
            />
          ))}
        </div>
      </section>

      {/* MEMORIES GALLERY */}
      <section id="memories" className="relative border-t border-white/5 px-6 py-24">
        <div className="mx-auto mb-10 max-w-7xl">
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-amber-300">The memories</div>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Everything else</h2>
              <p className="mt-3 text-white/70">
                Every pic anyone in the class uploaded. Trips, lunches, mocks, randomness. Drag,
                scroll, or swipe to spin through them.
              </p>
            </div>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              <Upload className="h-4 w-4" /> Add a memory
            </Link>
          </div>
        </div>

        <div className="relative mx-auto h-[600px] w-full max-w-[1600px] overflow-hidden rounded-2xl border border-white/5 bg-black/40">
          <MemoriesGallery />
        </div>
      </section>

      {/* SIGN-OFF */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.10),transparent_60%)]" />
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 text-xs uppercase tracking-[0.3em] text-amber-300">Sign-off</div>
          <h2 className="text-balance text-3xl font-bold leading-tight sm:text-5xl">
            Three years done. <br className="hidden sm:block" />
            We were never just another class.
          </h2>
          <p className="mt-6 text-balance text-white/65">
            Wherever everyone ends up next — different schools, different subjects, different
            lives — this is where 3 Kirwan lives. Drop a memory whenever you remember one. The
            site stays.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              <Upload className="h-4 w-4" /> Add a memory
            </Link>
            <a
              href="#memories"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-300/60 hover:bg-white/10"
            >
              <ImageIcon className="h-4 w-4" /> Back to the gallery
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-6 py-12 text-center text-sm text-white/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3">
          <div className="inline-flex items-center gap-1.5">
            Made with <Heart className="h-4 w-4 text-rose-400" /> for {CLASS_NAME} & {TEACHER}
          </div>
          <div className="inline-flex items-center gap-1.5 text-white/40">
            <MapPin className="h-3 w-3" /> {SCHOOL} · Junior Cycle Class of 2026
          </div>
        </div>
      </footer>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-4 backdrop-blur-sm">
      <div className="text-3xl font-bold sm:text-4xl">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-white/50">{label}</div>
    </div>
  );
}
