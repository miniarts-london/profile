"use client";

import { useEffect, useMemo, useState } from "react";
import {
  achievements,
  education,
  languages,
  life,
  navItems,
  profile,
  roles,
  skillGroups,
  type Role,
} from "@/data/profile";
import { FieldCanvas } from "./FieldCanvas";
import { MagneticCursor } from "./MagneticCursor";
import { Reveal, useReveal } from "./Reveal";

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max <= 0 ? 0 : window.scrollY / max);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

export function ProfileSite() {
  const sectionIds = useMemo(
    () => ["top", ...navItems.map((item) => item.id)],
    [],
  );
  const active = useActiveSection(sectionIds);
  const progress = useScrollProgress();
  const [openRole, setOpenRole] = useState(roles[0]?.id ?? "");
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const highlighted = useMemo(() => {
    if (!activeSkill) return new Set<string>();
    const needle = activeSkill.toLowerCase();
    return new Set(
      roles
        .filter((role) => {
          const haystack = [
            role.title,
            role.company,
            role.summary,
            ...role.highlights,
            ...role.tags,
            ...(role.clients ?? []),
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(needle);
        })
        .map((role) => role.id),
    );
  }, [activeSkill]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="relative">
      <MagneticCursor />
      <div
        className="progress-line pointer-events-none fixed top-0 left-0 z-50 h-[2px] w-full bg-copper"
        style={{ transform: `scaleX(${progress})` }}
      />

      <header className="hero-nav fixed top-4 right-0 left-0 z-40 flex justify-center px-4">
        <nav
          aria-label="Page"
          className="flex items-center gap-1 rounded-full border border-white/10 bg-ink/70 px-2 py-2 shadow-lg backdrop-blur-xl"
        >
          <a
            href="#top"
            className="hidden rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.22em] text-paper/70 uppercase sm:inline"
          >
            MiniArts
          </a>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                active === item.id
                  ? "bg-paper text-ink"
                  : "text-paper/70 hover:text-paper"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section
        id="top"
        className="relative isolate min-h-dvh overflow-hidden bg-ink text-paper"
      >
        <FieldCanvas />
        <div className="hero-veil pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col justify-end px-6 pt-28 pb-16 sm:px-10">
          <p className="hero-kicker mb-6 font-mono text-[11px] tracking-[0.32em] text-gold uppercase">
            {profile.studio} · {profile.location}
          </p>
          <h1 className="font-serif leading-[0.86] tracking-tight">
            <span className="block text-[clamp(2.6rem,8vw,5.5rem)] italic">
              <AnimatedWord text={profile.firstName} />
            </span>
            <span className="mt-1 block text-[clamp(1.6rem,4.8vw,3.2rem)] text-paper/88">
              <AnimatedWord
                text={profile.lastName}
                offset={profile.firstName.length}
              />
            </span>
          </h1>
          <div className="hero-copy mt-10 max-w-xl">
            <p className="text-sm tracking-[0.24em] text-copper uppercase">
              {profile.title}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-paper/75 sm:text-xl">
              {profile.summary}
            </p>
          </div>
          <div className="hero-actions mt-10 flex flex-wrap gap-3">
            <a
              href="#work"
              className="copper-btn rounded-full bg-copper px-5 py-3 text-sm font-medium text-paper transition hover:bg-[#9d4d7e]"
            >
              See the work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-paper/20 px-5 py-3 text-sm text-paper/85 transition hover:border-paper/50"
            >
              Get in touch
            </a>
          </div>
          <dl className="hero-stats mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/10 pt-8 text-sm sm:grid-cols-4">
            <div>
              <dt className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
                Developer
              </dt>
              <dd className="mt-2 font-serif text-3xl italic">
                {profile.stats.developerYears}
              </dd>
              <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-paper/40 uppercase">
                since {profile.stats.developerSince}
              </p>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
                Front-end
              </dt>
              <dd className="mt-2 font-serif text-3xl italic">
                {profile.stats.frontEndYears}
              </dd>
              <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-paper/40 uppercase">
                since {profile.stats.frontEndSince}
              </p>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
                React
              </dt>
              <dd className="mt-2 font-serif text-3xl italic">
                {profile.stats.reactYears}
              </dd>
              <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-paper/40 uppercase">
                since {profile.stats.reactSince}
              </p>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
                Based
              </dt>
              <dd className="mt-2 font-serif text-3xl italic">London</dd>
            </div>
          </dl>
          <a
            href="#work"
            className="scroll-cue mt-12 inline-flex w-fit items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-paper/45 uppercase"
          >
            Scroll
            <span aria-hidden>↓</span>
          </a>
        </div>
      </section>

      <main className="bg-paper text-ink">
        <section id="work" className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
          <Reveal>
            <Header
              kicker="Recent achievements"
              title="Interfaces, migrations, and the reliability work underneath."
            />
          </Reveal>
          <ol className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            {achievements.map((item, index) => (
              <Reveal key={item.id} delay={index * 50}>
                <li className="grid gap-3 py-8 md:grid-cols-[10rem_1fr] md:gap-8">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-copper uppercase">
                    {item.label}
                  </p>
                  <p className="max-w-3xl text-base leading-relaxed text-ink/75 sm:text-lg">
                    {item.copy}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="border-y border-ink/10 bg-paper">
          <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] lg:items-start lg:gap-20">
            <div
              id="skills"
              className="lg:sticky lg:top-28 lg:rounded-[32px] lg:bg-mist/60 lg:px-8 lg:py-10"
            >
              <Reveal>
                <Header
                  kicker="Skills"
                  title="Pick a skill. Matching roles light up."
                />
              </Reveal>
              <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-1">
                {skillGroups.map((group, index) => (
                  <Reveal key={group.id} delay={index * 70}>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.22em] text-sage uppercase">
                      {group.label}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => {
                        const selected = activeSkill === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            data-magnetic
                            onClick={() =>
                              setActiveSkill((current) =>
                                current === item ? null : item,
                              )
                            }
                            className={`rounded-full border px-3 py-1.5 text-sm transition duration-300 hover:-translate-y-0.5 ${
                              selected
                                ? "border-copper bg-copper text-paper"
                                : "border-ink/15 bg-paper/80 hover:border-copper/60"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  </Reveal>
                ))}
              </div>
              {activeSkill ? (
                <p className="mt-8 text-sm text-ink/60">
                  Showing work connected to <strong>{activeSkill}</strong>.{" "}
                  <button
                    type="button"
                    className="underline decoration-copper underline-offset-4"
                    onClick={() => setActiveSkill(null)}
                  >
                    Clear
                  </button>
                </p>
              ) : null}
            </div>

            <div id="experience" className="lg:border-l lg:border-ink/10 lg:pl-16">
              <Reveal>
                <Header
                  kicker="Experience"
                  title="A career built in the seams of product, data, and craft."
                />
              </Reveal>
              <ol className="timeline timeline-compact mt-12">
                {roles.map((role, index) => (
                  <TimelineItem
                    key={role.id}
                    role={role}
                    open={openRole === role.id}
                    dimmed={highlighted.size > 0 && !highlighted.has(role.id)}
                    delay={index * 45}
                    onToggle={() =>
                      setOpenRole((current) =>
                        current === role.id ? "" : role.id,
                      )
                    }
                  />
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="study" className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
          <Reveal>
            <Header
              kicker="Education"
              title="Language, intelligence, and the web — studied in that order."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {education.map((item, index) => (
              <Reveal key={item.id} delay={index * 90}>
              <article
                key={item.id}
                className="rounded-[28px] border border-ink/10 bg-white/50 p-6"
              >
                <p className="font-mono text-[11px] tracking-[0.18em] text-copper uppercase">
                  {item.place}
                </p>
                <h3 className="mt-4 font-serif text-2xl leading-snug">
                  {item.award}
                </h3>
                <p className="mt-2 text-sm font-medium">{item.school}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  {item.note}
                </p>
              </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-6 border-t border-ink/10 pt-8">
            {languages.map((language) => (
              <p key={language.id} className="text-sm">
                <span className="font-medium">{language.name}</span>
                <span className="ml-2 font-mono text-[11px] tracking-[0.16em] text-sage uppercase">
                  {language.level}
                </span>
              </p>
            ))}
          </div>
        </section>

        <section
          id="life"
          className="relative overflow-hidden bg-ink px-6 py-24 text-paper sm:px-10"
        >
          <HorseMark />
          <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.28em] text-gold uppercase">
                {life.heading}
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Dressage, show-jumping, and a stubborn care for animals.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/72">
                {life.copy}
              </p>
            </Reveal>
            <Reveal delay={120}>
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <p className="font-serif text-2xl italic text-gold">BHS Stage 2</p>
              <p className="mt-3 text-sm leading-relaxed text-paper/70">
                Competing with my own horse, and volunteering and donating
                where animal welfare needs a hand.
              </p>
            </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
          <Reveal>
          <p className="font-mono text-[11px] tracking-[0.28em] text-copper uppercase">
            Contact
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] sm:text-7xl">
            Let’s make something precise, and a little bit beautiful.
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-full bg-ink px-6 py-3 text-sm text-paper transition hover:bg-copper"
            >
              {copied ? "Email copied" : profile.email}
            </button>
            <a
              href={profile.blog}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/20 px-6 py-3 text-sm transition hover:border-ink"
            >
              blog-miniarts.vercel.app
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/20 px-6 py-3 text-sm transition hover:border-ink"
            >
              LinkedIn
            </a>
          </div>
          <p className="mt-8 text-sm text-ink/55">{profile.location}</p>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-ink/10 bg-paper px-6 py-8 text-center font-mono text-[11px] tracking-[0.18em] text-ink/45 uppercase">
        © {new Date().getFullYear()} {profile.name} · MiniArts
      </footer>
    </div>
  );
}

function AnimatedWord({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {Array.from(text).map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="hero-letter"
          style={{ ["--i" as string]: offset + index } as React.CSSProperties}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

function Header({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      {kicker ? (
        <p className="font-mono text-[11px] tracking-[0.28em] text-copper uppercase">
          {kicker}
        </p>
      ) : null}
      <h2
        className={`font-serif text-4xl leading-tight sm:text-5xl ${kicker ? "mt-4" : ""}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function TimelineItem({
  role,
  open,
  dimmed,
  delay = 0,
  onToggle,
}: {
  role: Role;
  open: boolean;
  dimmed: boolean;
  delay?: number;
  onToggle: () => void;
}) {
  const panelId = `${role.id}-panel`;
  const reveal = useReveal(delay);
  return (
    <li
      ref={reveal.ref}
      style={reveal.style}
      className={`${reveal.className} timeline-item`}
      data-dimmed={dimmed || undefined}
    >
      <p className="timeline-year">{role.start}</p>
      <span
        className={`timeline-dot ${role.current ? "is-current" : ""}`}
        aria-hidden
      />
      <article className={`timeline-card ${open ? "is-open" : ""}`}>
        <button
          type="button"
          className="flex w-full items-start justify-between gap-4 text-left"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>
            <span className="font-mono text-[11px] tracking-[0.16em] text-sage uppercase">
              {role.period}
            </span>
            <span className="mt-2 block font-serif text-2xl">
              {role.company}
            </span>
            <span className="mt-1 block text-sm text-ink/60">{role.title}</span>
          </span>
          <span
            className={`role-plus mt-1 shrink-0 font-mono text-xs text-copper ${open ? "is-open" : ""}`}
          >
            +
          </span>
        </button>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/75">
          {role.summary}
        </p>
        <div
          id={panelId}
          className={`role-panel ${open ? "is-open" : ""}`}
          aria-hidden={!open}
        >
          <div className="role-panel-inner">
            <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-4 text-sm leading-relaxed text-ink/70">
              {role.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            {role.clients ? (
              <p className="mt-4 text-sm text-ink/55">
                {role.clients.join(" · ")}
              </p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              {role.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-mist px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-ink/70 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

function HorseMark() {
  return (
    <Reveal className="horse-mark pointer-events-none absolute -right-10 -bottom-16 h-[420px] w-[420px] text-white/5">
      <svg className="h-full w-full" viewBox="0 0 200 200" fill="none" aria-hidden>
        <path
          d="M28 148c18-6 32-28 38-48 4-14 18-22 30-18 8 3 12 12 8 20-6 14 4 22 16 18 14-4 28 8 22 22-8 18 8 28 24 22"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M118 86c8-18 28-28 42-18 10 8 8 24-4 30-14 8-18 24-8 36"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="148" cy="64" r="3" fill="currentColor" />
      </svg>
    </Reveal>
  );
}
