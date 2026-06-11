'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCENES } from './scenes';

const Globe = dynamic(() => import('./Globe'), { ssr: false });

export interface LandingProps {
  counts: { artists: number; labels: number; subgenres: number; edges: number; events: number; sources: number };
  featured: string[];
  subgenres: { title: string; slug: string }[];
  sceneCounts: Record<string, number>;
}

const fmt = (n: number) => n.toLocaleString('en-US');

export default function LandingExperience({ counts, featured, subgenres, sceneCounts }: LandingProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = root.current;
    if (!el || reduce) return; // reduced-motion users keep the fully-visible SSR content

    let ctx: gsap.Context | undefined;
    let safety: ReturnType<typeof setTimeout> | undefined;

    const run = () => {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        // Hero intro
        const hero = el.querySelectorAll('[data-hero]');
        gsap.set(hero, { y: 26, opacity: 0 });
        gsap.to(hero, { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: 'power3.out', delay: 0.15 });

        // Scroll reveals
        el.querySelectorAll<HTMLElement>('.reveal').forEach((node) => {
          gsap.set(node, { y: 34, opacity: 0 });
          gsap.to(node, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: node, start: 'top 88%', once: true },
          });
        });

        // Count-up stats
        el.querySelectorAll<HTMLElement>('[data-count]').forEach((node) => {
          const target = Number(node.dataset.count || '0');
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: node, start: 'top 95%', once: true },
            onUpdate: () => { node.textContent = fmt(Math.floor(obj.v)); },
          });
        });
      }, el);

      // Fail-safe: if rAF is throttled (background tab) and the hero never reveals,
      // force it visible so content is never stuck hidden.
      safety = setTimeout(() => {
        gsap.to(el.querySelectorAll('[data-hero]'), { y: 0, opacity: 1, duration: 0.3, overwrite: true });
      }, 1600);
    };

    // Don't hide content in a backgrounded tab (its rAF is paused); animate once visible.
    if (document.hidden) {
      const onVis = () => {
        if (!document.hidden) {
          document.removeEventListener('visibilitychange', onVis);
          run();
        }
      };
      document.addEventListener('visibilitychange', onVis);
      return () => {
        document.removeEventListener('visibilitychange', onVis);
        ctx?.revert();
        if (safety) clearTimeout(safety);
      };
    }

    run();
    return () => {
      ctx?.revert();
      if (safety) clearTimeout(safety);
    };
  }, []);

  return (
    <div
      ref={root}
      className="relative left-1/2 right-1/2 -mx-[50vw] w-screen -mt-8 overflow-x-clip text-zinc-100"
    >
      {/* ============== HERO ============== */}
      <section className="relative">
        <div className="absolute inset-0 landing-aurora pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 pt-16 pb-12 lg:pt-24 lg:pb-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p data-hero className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent2 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent2 animate-pulse" />
              World Famous House Crew
            </p>
            <h1 data-hero className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.04] tracking-tight">
              House music has a<br />
              <span className="gradient-text">memory.</span> We built it.
            </h1>
            <p data-hero className="mt-6 text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed">
              The authoritative, AI-citable intelligence database for house music — its artists,
              labels, venues, scenes and subgenres, traced back to the{' '}
              <span className="text-white font-medium">Black and queer underground</span> that
              started it all. Built to serve the culture, and the agents now answering questions about it.
            </p>
            <div data-hero className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/?browse=1"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(124,92,255,0.7)] hover:bg-accent/90 transition"
              >
                Explore the database
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/knowledge"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:border-accent transition"
              >
                Read the history
              </Link>
            </div>

            <dl data-hero className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-lg">
              {[
                { label: 'Artists', value: counts.artists },
                { label: 'Labels', value: counts.labels },
                { label: 'Subgenre histories', value: counts.subgenres },
                { label: 'Graph connections', value: counts.edges },
              ].map((s) => (
                <div key={s.label}>
                  <dd className="text-2xl sm:text-3xl font-bold tabular-nums text-white" data-count={s.value}>
                    {fmt(s.value)}
                  </dd>
                  <dt className="text-[11px] uppercase tracking-wide text-muted mt-1">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Globe */}
          <div data-hero className="relative">
            <div className="relative h-[300px] sm:h-[420px] lg:h-[560px] w-full">
              <Globe />
              <div className="pointer-events-none absolute inset-0 rounded-full" />
            </div>
            <p className="text-center text-xs text-muted mt-2 font-mono">
              From a Chicago warehouse to the world — drag to spin
            </p>
          </div>
        </div>

        {/* featured marquee */}
        {featured.length > 0 && (
          <div className="border-y border-edge/60 bg-ink/40 py-3 marquee-mask overflow-hidden">
            <div className="marquee-track text-sm text-muted">
              {[...featured, ...featured].map((name, i) => (
                <span key={i} className="mx-5 inline-flex items-center gap-5">
                  <span className="text-zinc-300">{name}</span>
                  <span className="text-accent/50">✦</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ============== MISSION ============== */}
      <section className="max-w-5xl mx-auto px-5 py-20 lg:py-28">
        <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-accent2 mb-6">Why this exists</p>
        <h2 className="reveal text-2xl sm:text-3xl lg:text-[2.6rem] font-semibold leading-[1.18] tracking-tight">
          House was born on dancefloors that the mainstream tried to erase. This is a
          <span className="text-white"> source of truth </span>
          that gives the culture, its founders, and its lineage the
          <span className="gradient-text"> permanent record </span>
          they were never given.
        </h2>
        <div className="reveal mt-10 grid sm:grid-cols-3 gap-5 text-sm text-zinc-300">
          <p className="glass rounded-2xl p-5 leading-relaxed">
            <span className="block text-white font-semibold mb-1.5">For the community</span>
            Dancers, DJs, diggers and journalists get an accurate, cited map of who made what,
            where it came from, and who connects to whom.
          </p>
          <p className="glass rounded-2xl p-5 leading-relaxed">
            <span className="block text-white font-semibold mb-1.5">For the founders</span>
            Every page credits the Black and queer originators and the cities and labels that
            carried the sound — sourced and verifiable.
          </p>
          <p className="glass rounded-2xl p-5 leading-relaxed">
            <span className="block text-white font-semibold mb-1.5">For the machines</span>
            Clean HTML, Markdown and JSON per entity so AI agents cite the real story instead of
            inventing one.
          </p>
        </div>
      </section>

      {/* ============== GLOBE / SCENES ============== */}
      <section className="relative border-y border-edge/60 bg-gradient-to-b from-ink/0 via-panel/20 to-ink/0">
        <div className="max-w-6xl mx-auto px-5 py-20 lg:py-24">
          <div className="reveal max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent2 mb-4">Connected, globally</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              One genre, a thousand scenes.
            </h2>
            <p className="mt-4 text-zinc-300 leading-relaxed">
              House left Chicago and took root everywhere — Detroit&apos;s soul, London&apos;s acid,
              Paris&apos; filter, Berlin&apos;s minimalism, Johannesburg&apos;s afro house, Pretoria&apos;s
              amapiano. Tap a city to travel the directory and meet the people moving it there.
            </p>
          </div>
          <div className="reveal mt-8 flex flex-wrap gap-2">
            {SCENES.map((s) => {
              const c = sceneCounts[s.city] || 0;
              return (
                <Link
                  key={s.name}
                  href={s.city === 'Los Angeles' ? '/la' : `/?city=${encodeURIComponent(s.city)}`}
                  title={s.note}
                  className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                    s.origin
                      ? 'border-accent2/60 bg-accent2/10 text-accent2 hover:bg-accent2/20'
                      : 'border-edge text-zinc-300 hover:border-accent hover:text-white'
                  }`}
                >
                  {s.origin && <span className="text-[10px] uppercase tracking-wide">origin</span>}
                  {s.name}
                  {c > 0 && <span className="text-xs text-muted tabular-nums group-hover:text-accent2">{c}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== WHAT'S INSIDE ============== */}
      <section className="max-w-6xl mx-auto px-5 py-20 lg:py-24">
        <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-accent2 mb-4">What&apos;s inside</p>
        <h2 className="reveal text-2xl sm:text-3xl font-semibold tracking-tight mb-10">
          A database that thinks like the culture.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: 'Artist profiles', d: 'DJs & producers with origins, genres, labels, links and popularity scoring.', href: '/?browse=1', tag: `${fmt(counts.artists)} artists` },
            { t: 'Label histories', d: 'Imprints, rosters and the scenes they built — from Trax to Purveyor Underground.', href: '/labels', tag: `${fmt(counts.labels)} labels` },
            { t: 'Subgenre encyclopedia', d: 'Origins, founders, key artists and influence for every major strain of house.', href: '/genres', tag: `${fmt(counts.subgenres)} histories` },
            { t: 'Knowledge graph', d: 'Typed, sourced connections — who pioneered, popularized, collaborated and influenced.', href: '/knowledge', tag: `${fmt(counts.edges)} edges` },
            { t: 'Agent-first endpoints', d: 'Every page available as clean HTML, Markdown and JSON, plus an OpenAPI spec.', href: '/for-agents', tag: 'HTML · MD · JSON' },
            { t: 'Open datasets', d: 'CSV, JSON and NDJSON exports for researchers building on the record.', href: '/datasets', tag: `${fmt(counts.sources)} sources` },
          ].map((f) => (
            <Link key={f.t} href={f.href} className="reveal group glass rounded-2xl p-6 hover:border-accent transition flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{f.t}</h3>
                <span className="text-accent transition-transform group-hover:translate-x-0.5">→</span>
              </div>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed flex-1">{f.d}</p>
              <span className="mt-4 inline-block text-[11px] font-mono uppercase tracking-wide text-accent2">{f.tag}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============== SEARCH ============== */}
      <section className="relative border-y border-edge/60">
        <div className="absolute inset-0 landing-aurora opacity-60 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-5 py-20 lg:py-24 text-center">
          <h2 className="reveal text-2xl sm:text-3xl font-semibold tracking-tight">Find your people.</h2>
          <p className="reveal mt-3 text-zinc-300">Search {fmt(counts.artists)} artists by name, sound or city.</p>
          <form action="/" method="get" className="reveal mt-7 flex gap-2 max-w-xl mx-auto">
            <input
              name="q"
              placeholder="Search artists, e.g. Black Coffee, Demuir, Moodymann…"
              aria-label="Search artists"
              className="flex-1 bg-ink/70 border border-edge rounded-full px-5 py-3 text-sm outline-none focus:border-accent"
            />
            <button className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent/90 transition">
              Search
            </button>
          </form>
          <div className="reveal mt-6 flex flex-wrap gap-2 justify-center">
            {['Afro House', 'Deep House', 'Jackin House', 'Tech House', 'Soulful House', 'Tribal House', 'Disco House'].map((g) => (
              <Link key={g} href={`/?genre=${encodeURIComponent(g)}`} className="rounded-full border border-edge px-4 py-1.5 text-xs text-zinc-300 hover:border-accent hover:text-white transition">
                {g}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============== HISTORIES ============== */}
      <section className="max-w-6xl mx-auto px-5 py-20 lg:py-24">
        <div className="reveal flex items-end justify-between flex-wrap gap-3 mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent2 mb-3">The lineage</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Read where the sound came from.</h2>
          </div>
          <Link href="/genres" className="text-sm text-accent hover:text-white">All genres →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {subgenres.map((s) => (
            <Link key={s.slug} href={`/topic/${s.slug}`} className="reveal group flex items-center justify-between rounded-xl border border-edge px-5 py-4 hover:border-accent hover:bg-panel/40 transition">
              <span className="font-medium">{s.title}</span>
              <span className="text-xs font-mono text-muted group-hover:text-accent">history →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============== CLOSING ============== */}
      <section className="relative">
        <div className="absolute inset-0 landing-aurora pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-5 py-24 lg:py-32 text-center">
          <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">
            Built by the <span className="gradient-text">House Crew</span>,<br />for the house community.
          </h2>
          <p className="reveal mt-6 text-zinc-300 max-w-xl mx-auto leading-relaxed">
            A living, cited record of the music we love — open to read, free to reference, and growing
            every week.
          </p>
          <div className="reveal mt-9 flex flex-wrap gap-3 justify-center">
            <Link href="/?browse=1" className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white hover:bg-accent/90 transition">
              Enter the database
            </Link>
            <Link href="/about" className="rounded-full glass px-7 py-3 text-sm font-semibold hover:border-accent transition">
              About the project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
