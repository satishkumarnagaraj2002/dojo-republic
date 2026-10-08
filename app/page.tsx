import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import Backdrop from '@/components/ui/Backdrop';
import { martialArts } from '@/lib/constants';

const pillars = [
  { href: '/dojos', title: 'Dojos', text: 'Discover schools by style, city and schedule.' },
  { href: '/tournaments', title: 'Tournaments', text: 'Register, compete and build a record.' },
  { href: '/players', title: 'Athletes', text: 'Profiles, achievements and a career in one place.' },
  { href: '/marketplace', title: 'Marketplace', text: 'Equipment and uniforms from trusted sellers.' },
];

const figures = [
  { value: '500+', label: 'Dojos' },
  { value: '10,000+', label: 'Athletes' },
  { value: '200+', label: 'Tournaments' },
  { value: '50+', label: 'Cities' },
];

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-none stroke-current" strokeWidth="1.5">
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

function PrimaryLink({ href, children, tone = 'light' }: { href: string; children: React.ReactNode; tone?: 'light' | 'dark' }) {
  const styles =
    tone === 'light'
      ? 'bg-paper text-ink hover:bg-accent hover:text-white'
      : 'bg-ink text-paper hover:bg-accent hover:text-white';
  return (
    <Link href={href} className={`label inline-flex items-center gap-4 px-7 py-4 transition-colors duration-300 ${styles}`}>
      {children}
      <Arrow />
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="bg-paper text-ink">
      {/* 1. Hero */}
      <section className="relative isolate flex min-h-[640px] h-svh flex-col justify-end overflow-hidden bg-ink text-paper">
        <Backdrop className="absolute inset-0 -z-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(11,11,12,0.75)_0%,rgba(11,11,12,0)_55%)]" />

        <div className="container-wide pb-10 pt-32 sm:pb-14">
          <p className="label mb-6 flex items-center gap-4 text-paper/80 [animation:fade-in_1.2s_0.3s_both]">
            <span className="h-px w-10 bg-accent" />
            Dojo Republic &mdash; The Home of Combat Sports
          </p>
          <h1 className="display h-mega">
            <span className="mask-line">
              <span style={{ ['--line-delay' as string]: '200ms' }}>One platform.</span>
            </span>
            <span className="mask-line">
              <span style={{ ['--line-delay' as string]: '380ms' }} className="text-paper/60">
                Every fighter.
              </span>
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-8 border-t border-white/20 pt-6 [animation:fade-in_1.2s_0.9s_both] md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-paper/75 sm:text-base">
              A unified home for dojos, athletes, coaches and tournaments &mdash; connecting the martial arts community worldwide.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <PrimaryLink href="/dojos">Find a dojo</PrimaryLink>
              <Link
                href="/tournaments"
                className="label inline-flex items-center gap-4 border border-white/40 px-7 py-4 transition-colors duration-300 hover:bg-white hover:text-ink"
              >
                Tournaments
              </Link>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="absolute bottom-10 right-5 hidden flex-col items-center gap-3 sm:right-10 lg:flex">
          <span className="label [writing-mode:vertical-rl] text-paper/60">Scroll</span>
          <span className="h-14 w-px bg-white/60 [animation:scroll-cue_2.4s_ease-in-out_infinite] motion-reduce:animate-none" />
        </div>
      </section>

      {/* 2. Introduction */}
      <section className="container-wide py-24 sm:py-32 lg:py-44">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="label text-stone">01 &mdash; The Republic</p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 className="display h-xl">
                Discipline, respect
                <br />
                and growth &mdash; <span className="text-accent">united.</span>
              </h2>
            </Reveal>
            <Reveal delay={150} className="mt-12 grid gap-8 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-ink/80">
                Martial arts teaches discipline, respect and growth. Dojo Republic was created to strengthen those values by
                uniting the entire ecosystem into one platform &mdash; so every dojo and every fighter can focus on progress.
              </p>
              <p className="label self-end text-stone">&mdash; Founder &amp; CEO, Dojo Republic</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Disciplines */}
      <section className="border-t border-ink/15 bg-white" aria-labelledby="disciplines-heading">
        <div className="container-wide py-24 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="label text-stone">02 &mdash; Disciplines</p>
                <h2 id="disciplines-heading" className="display h-lg mt-6">
                  Ten ways
                  <br />
                  to train.
                </h2>
                <p className="mt-8 max-w-xs leading-relaxed text-ink/70">
                  From striking to grappling, every discipline has a home on the platform &mdash; with more joining as the republic grows.
                </p>
              </Reveal>
            </div>
            <ol className="lg:col-span-8 border-t border-ink/15">
              {martialArts.map((art, i) => (
                <li key={art}>
                  <Link
                    href="/dojos"
                    className="group flex items-baseline justify-between gap-6 border-b border-ink/15 py-5 transition-[padding,color] duration-500 hover:pl-4 hover:text-accent sm:py-6"
                  >
                    <span className="flex items-baseline gap-5 sm:gap-8">
                      <span className="label w-6 text-stone group-hover:text-accent">{String(i + 1).padStart(2, '0')}</span>
                      <span className="display text-[clamp(1.75rem,5vw,3.5rem)]">{art}</span>
                    </span>
                    <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Arrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 4. Featured experience: full-bleed image with overlapping panel */}
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <Backdrop variant="ember" className="absolute inset-0 -z-20" />
        <div className="absolute inset-0 -z-10 bg-ink/30" />
        <div className="container-wide py-24 sm:py-32 lg:py-44">
          <Reveal>
            <p className="label text-paper/70">03 &mdash; The Experience</p>
            <h2 className="display h-mega mt-6">
              Train.
              <br />
              Compete.
              <br />
              <span className="text-accent">Belong.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="container-wide relative z-10 -mt-12 pb-24 sm:-mt-24 sm:pb-32 lg:-mt-32">
        <div className="grid grid-cols-1 gap-px bg-ink/15 sm:grid-cols-2 lg:ml-[16.666%] lg:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.href} delay={i * 80} className="min-w-0 bg-paper">
              <Link
                href={p.href}
                className="group flex h-full min-h-56 flex-col justify-between p-8 transition-colors duration-500 hover:bg-ink hover:text-paper sm:p-10"
              >
                <span className="label text-stone group-hover:text-paper/60">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="display flex items-center justify-between gap-4 text-3xl sm:text-4xl">
                    {p.title}
                    <span className="-translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                      <Arrow />
                    </span>
                  </span>
                  <span className="mt-3 block max-w-xs text-sm leading-relaxed opacity-70">{p.text}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. Philosophy */}
      <section className="bg-ink text-paper">
        <div className="container-wide py-28 sm:py-40 lg:py-52">
          <Reveal>
            <p className="label mb-10 text-paper/50">04 &mdash; Philosophy</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="display h-xl max-w-6xl">
              Respect on the mat.
              <br />
              <span className="text-paper/35">Progress in every belt.</span>
              <br />
              One community.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6. Achievements */}
      <section className="container-wide py-24 sm:py-32" aria-labelledby="figures-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label text-stone">05 &mdash; Achievements</p>
            <h2 id="figures-heading" className="display h-lg mt-6">
              A growing
              <br />
              republic.
            </h2>
          </Reveal>
          <dl className="lg:col-span-8">
            {figures.map((f, i) => (
              <Reveal key={f.label} delay={i * 80} className="flex items-end justify-between gap-6 border-t border-ink/15 py-6 last:border-b">
                <dd className="display order-2 text-[clamp(3rem,9vw,7rem)] text-ink">{f.value}</dd>
                <dt className="label order-1 pb-3 text-stone">{f.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* 7. Events */}
      <section className="bg-accent text-white">
        <div className="container-wide grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <p className="label mb-6 text-white/80">06 &mdash; Events</p>
            <h2 className="display h-xl">
              Step onto
              <br />
              the floor.
            </h2>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-4">
            <p className="mb-8 max-w-sm leading-relaxed text-white/90">
              Browse upcoming championships, choose your category, register and compete &mdash; kata, kumite and beyond.
            </p>
            <PrimaryLink href="/tournaments" tone="dark">
              View tournaments
            </PrimaryLink>
          </Reveal>
        </div>
      </section>

      {/* 8. Community */}
      <section className="container-wide py-24 sm:py-32" aria-labelledby="community-heading">
        <Reveal>
          <p className="label text-stone">07 &mdash; Community</p>
          <h2 id="community-heading" className="display h-lg mt-6 max-w-3xl">
            The people behind every belt.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-px bg-ink/15 md:grid-cols-12">
          <Reveal className="bg-paper md:col-span-7">
            <Link href="/players" className="group flex min-h-80 flex-col justify-between p-8 transition-colors duration-500 hover:bg-ink hover:text-paper sm:p-12 md:min-h-[26rem]">
              <span className="label text-stone group-hover:text-paper/60">Athletes</span>
              <span>
                <span className="display block text-[clamp(2.5rem,6vw,5rem)]">Meet the fighters</span>
                <span className="mt-4 flex items-center gap-4 label">
                  Browse profiles <Arrow />
                </span>
              </span>
            </Link>
          </Reveal>
          <Reveal delay={120} className="bg-paper md:col-span-5">
            <Link href="/dojos" className="group flex min-h-80 flex-col justify-between p-8 transition-colors duration-500 hover:bg-accent hover:text-white sm:p-12 md:min-h-[26rem]">
              <span className="label text-stone group-hover:text-white/70">Dojos</span>
              <span>
                <span className="display block text-[clamp(2.5rem,5vw,4rem)]">Find your dojo</span>
                <span className="mt-4 flex items-center gap-4 label">
                  Explore schools <Arrow />
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 9. Call to action */}
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <Backdrop variant="ring" className="absolute inset-0 -z-20" />
        <div className="absolute inset-0 -z-10 bg-ink/30" />
        <div className="container-wide py-28 text-center sm:py-40 lg:py-52">
          <Reveal>
            <p className="label mb-8 text-paper/70">Join today</p>
            <h2 className="display h-xl">
              Join the
              <br />
              republic.
            </h2>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <PrimaryLink href="/auth/register">Get started</PrimaryLink>
              <Link
                href="/about"
                className="label inline-flex items-center border border-white/40 px-7 py-4 transition-colors duration-300 hover:bg-white hover:text-ink"
              >
                Learn more
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
