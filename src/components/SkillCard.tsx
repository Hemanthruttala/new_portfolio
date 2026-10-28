import { Link, Globe, Monitor, Code2, Coffee, BrainCircuit, MessageSquare, Database, GitBranch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Skill } from "../types";
import { InteractiveCard, type CardAccent } from "./motion/InteractiveCard";

const ICON_MAP: Record<string, LucideIcon> = {
  Link,
  Globe,
  Monitor,
  Code2,
  Coffee,
  BrainCircuit,
  MessageSquare,
  Database,
  GitBranch,
};

const CATEGORY_CONFIG: Record<
  string,
  { gradient: string; iconBg: string }
> = {
  web3: {
    gradient: "from-[var(--accent-violet)] to-[var(--accent-blue)]",
    iconBg: "linear-gradient(135deg, #8957ff, #a855f7)",
  },
  development: {
    gradient: "from-[var(--accent-blue)] to-[var(--accent-cyan)]",
    iconBg: "linear-gradient(135deg, #4385ff, #06b6d4)",
  },
  foundations: {
    gradient: "from-[var(--accent-cyan)] to-[var(--accent-blue)]",
    iconBg: "linear-gradient(135deg, #06b6d4, #14b8a6)",
  },
  professional: {
    gradient: "from-[var(--accent-violet)] to-[var(--accent-cyan)]",
    iconBg: "linear-gradient(135deg, #ec4899, #f43f5e)",
  },
};

const ACCENT_MAP: Record<string, CardAccent> = {
  web3: "violet",
  development: "blue",
  foundations: "cyan",
  professional: "gradient-cyan-blue",
};

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const Icon = ICON_MAP[skill.icon] ?? Code2;
  const cfg = CATEGORY_CONFIG[skill.category] ?? CATEGORY_CONFIG["development"];
  const accent = ACCENT_MAP[skill.category] ?? "blue";

  return (
    <InteractiveCard
      as="article"
      accent={accent}
      className="p-5 h-full flex flex-col group"
      tabIndex={0}
      role="article"
      aria-label={`${skill.name}: ${skill.description}`}
    >
      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cfg.gradient}`}
        aria-hidden="true"
      />

      {/* Icon tile */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0"
        style={{ background: cfg.iconBg }}
      >
        <Icon size={20} className="text-white" aria-hidden="true" />
      </div>

      {/* Category pill using pill tokens */}
      <span className="pill-token inline-block w-fit text-xs px-2.5 py-0.5 rounded-full font-semibold mb-2.5">
        {skill.category === "web3"
          ? "Web3"
          : skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
      </span>

      {/* Name */}
      <h3 className="font-bold text-[var(--text-primary)] text-base mb-1.5 leading-snug">
        {skill.name}
      </h3>

      {/* Description */}
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-auto font-normal">
        {skill.description}
      </p>
    </InteractiveCard>
  );
}
