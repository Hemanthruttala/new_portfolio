import { Sparkles, GraduationCap, Link, Monitor, BookOpen, Globe } from "lucide-react";
import { siteConfig } from "../config/site";
import { RevealGroup, Reveal, RevealSingle } from "./motion/Reveal";
import { InteractiveCard } from "./motion/InteractiveCard";

const highlights = [
  {
    icon: Link,
    title: "Blockchain & Decentralization",
    description:
      "Exploring how trustless systems, smart contracts, and consensus mechanisms reshape digital infrastructure.",
    color: "var(--accent-violet)",
    bg: "rgba(155, 107, 255, 0.12)",
    border: "rgba(155, 107, 255, 0.25)",
  },
  {
    icon: Monitor,
    title: "Building for the Web",
    description:
      "Creating responsive, accessible, and visually engaging user interfaces with modern frontend tools.",
    color: "var(--accent-cyan)",
    bg: "rgba(59, 216, 240, 0.12)",
    border: "rgba(59, 216, 240, 0.25)",
  },
  {
    icon: BookOpen,
    title: "Learning & Problem-Solving",
    description:
      "Strengthening programming, data structures, algorithms, and practical coding skills through projects.",
    color: "var(--accent-blue)",
    bg: "rgba(91, 140, 255, 0.12)",
    border: "rgba(91, 140, 255, 0.25)",
  },
];

const eduFields = [
  { label: "Degree", value: siteConfig.degree },
  { label: "Specialization", value: siteConfig.specialization },
  { label: "University", value: `${siteConfig.university}, ${siteConfig.universityLocation}` },
  { label: "Expected Graduation", value: String(siteConfig.graduationYear) },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      aria-label="About section"
    >
      <div className="section-container relative z-10">
        {/* Section header */}
        <RevealSingle className="text-center mb-16">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 shadow-md"
            style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}
          >
            <Sparkles size={22} className="text-white" aria-hidden="true" />
          </div>
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-[var(--accent-blue)] mb-2">
            Who I Am
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)]">
            About <span className="gradient-text">Me</span>
          </h2>
        </RevealSingle>

        {/* Staggered cards reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ── Left Column ── */}
          <RevealGroup className="flex flex-col gap-6">
            {/* Summary card */}
            <Reveal>
              <InteractiveCard accent="blue" className="p-7">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: "rgba(91, 140, 255, 0.15)" }}
                  >
                    ✨
                  </span>
                  A bit about me
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                  I'm a Computer Science Engineering student specializing in Blockchain at VIT-AP University, Amaravati.
                  I enjoy the intersection of decentralized technology and user-friendly software — building DApps,
                  exploring smart contracts, and crafting intuitive frontends.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base mt-3">
                  With a growing foundation in Python, Java, and data structures, I'm continuously evolving as a developer
                  and actively seeking internship opportunities to contribute and grow.
                </p>
              </InteractiveCard>
            </Reveal>

            {/* Education card */}
            <Reveal>
              <InteractiveCard accent="blue" className="p-7">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                      style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}
                    >
                      <GraduationCap size={20} className="text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] text-base">
                      Education
                    </h3>
                  </div>

                  <dl className="flex flex-col gap-4">
                    {eduFields.map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 group/item border-b border-[var(--border)] pb-3 last:border-b-0 last:pb-0"
                      >
                        <dt className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] sm:w-44 shrink-0">
                          {label}
                        </dt>
                        <dd className="text-[var(--text-primary)] text-sm font-medium leading-relaxed group-hover/item:text-[var(--accent-blue)] transition-colors duration-200">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </InteractiveCard>
            </Reveal>
          </RevealGroup>

          {/* ── Right Column ── */}
          <RevealGroup className="flex flex-col gap-5">
            {highlights.map((item) => (
              <Reveal key={item.title}>
                <InteractiveCard accent="blue" className="p-6">
                  <div className="relative z-10 flex items-start gap-4">
                    <span
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200"
                      style={{ background: item.bg, border: `1px solid ${item.border}` }}
                    >
                      <item.icon size={20} style={{ color: item.color }} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)] text-base mb-1.5 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </InteractiveCard>
              </Reveal>
            ))}

            {/* Location card */}
            <Reveal>
              <InteractiveCard accent="blue" className="p-5">
                <div className="flex items-center gap-4">
                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{
                      background: "rgba(155, 107, 255, 0.12)",
                      border: "1px solid rgba(155, 107, 255, 0.3)",
                    }}
                  >
                    <Globe size={20} className="text-[var(--accent-violet)]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-0.5">
                      Based in
                    </p>
                    <p className="text-[var(--text-primary)] text-sm font-bold">
                      {siteConfig.location}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      Studying at {siteConfig.university}
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            </Reveal>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
