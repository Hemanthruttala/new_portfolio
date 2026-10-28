import { Zap } from "lucide-react";
import { skills, skillCategories } from "../data/skills";
import SkillCard from "./SkillCard";
import { RevealGroup, Reveal, RevealSingle } from "./motion/Reveal";

const MARQUEE_ITEMS = [
  "Blockchain",
  "Solidity",
  "React",
  "Python",
  "Java",
  "Web3",
  "DApps",
  "TypeScript",
  "DSA",
  "Node.js",
  "CSS",
  "HTML",
  "Git",
  "Ethereum",
  "Tailwind",
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden"
      aria-label="Skills section"
    >
      <div className="section-container relative z-10">
        {/* Section header */}
        <RevealSingle className="text-center mb-16">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 shadow-md"
            style={{ background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))" }}
          >
            <Zap size={22} className="text-white" aria-hidden="true" />
          </div>
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-[var(--accent-cyan)] mb-2">
            What I Know
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mb-3">
            Technical <span className="gradient-text">Strengths</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm sm:text-base font-normal">
            Building a foundation for thoughtful, useful technology.
          </p>
        </RevealSingle>

        {/* Skills by category */}
        {skillCategories.map((cat) => {
          const categorySkills = skills.filter((s) => s.category === cat.key);
          if (!categorySkills.length) return null;

          return (
            <div key={cat.key} className="mb-12">
              <RevealSingle className="flex items-center gap-4 mb-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-primary)] whitespace-nowrap">
                  {cat.label}
                </h3>
                <div
                  className="flex-1 h-px bg-[var(--border)]"
                  role="presentation"
                />
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  {categorySkills.length} skills
                </span>
              </RevealSingle>

              <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categorySkills.map((skill) => (
                  <Reveal key={skill.id} className="h-full">
                    <SkillCard skill={skill} />
                  </Reveal>
                ))}
              </RevealGroup>
            </div>
          );
        })}

        {/* Footer note */}
        <RevealSingle className="text-center text-sm text-[var(--text-muted)] mt-8 italic">
          ✨ Continuously learning and expanding my development toolkit.
        </RevealSingle>
      </div>

      {/* Scrolling marquee */}
      <div className="mt-16 overflow-hidden" aria-hidden="true">
        <div className="flex gap-6 animate-marquee w-max select-none">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full glass-card text-[var(--text-secondary)] border border-[var(--border)] whitespace-nowrap shadow-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
