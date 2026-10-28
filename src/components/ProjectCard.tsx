import { useState } from "react";
import { ExternalLink, Clock, CheckCircle2, Code, Star } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { MotionLink, MotionButton } from "./motion/MotionButton";
import { InteractiveCard } from "./motion/InteractiveCard";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

const STATUS_CONFIG = {
  placeholder: {
    label: "Upcoming",
    Icon: Clock,
  },
  wip: {
    label: "In Progress",
    Icon: Code,
  },
  complete: {
    label: "Complete",
    Icon: CheckCircle2,
  },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const status = STATUS_CONFIG[project.status];
  const StatusIcon = status.Icon;

  return (
    <InteractiveCard
      as="article"
      accent="gradient-blue-violet"
      className="overflow-hidden flex flex-col group shadow-lg h-full"
      aria-label={`Project: ${project.title}`}
    >
      {/* Dark preview image area (kept dark as specified) */}
      <div className="relative h-48 overflow-hidden shrink-0 bg-[#0B0F1A]">
        {project.image && !imgError ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full relative overflow-hidden flex items-center justify-center"
            style={{
              background:
                project.status === "placeholder"
                  ? "linear-gradient(135deg, #0A0F1E, #141A2E)"
                  : "linear-gradient(135deg, rgba(91,140,255,0.18), rgba(155,107,255,0.18))",
            }}
          >
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(91,140,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(91,140,255,0.5) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
              aria-hidden="true"
            />
            <svg
              width="64"
              height="64"
              viewBox="0 0 72 72"
              fill="none"
              aria-hidden="true"
              className="group-hover:scale-110 transition-transform duration-300 opacity-70"
            >
              <rect x="8" y="8" width="24" height="24" rx="4" fill="#5B8CFF" opacity="0.7" />
              <rect x="40" y="8" width="24" height="24" rx="4" fill="#9B6BFF" opacity="0.6" />
              <rect x="8" y="40" width="24" height="24" rx="4" fill="#3BD8F0" opacity="0.6" />
              <rect x="40" y="40" width="24" height="24" rx="4" fill="#E65BFF" opacity="0.5" />
              <line x1="20" y1="32" x2="20" y2="40" stroke="#5B8CFF" strokeWidth="1.5" opacity="0.5" />
              <line x1="52" y1="32" x2="52" y2="40" stroke="#9B6BFF" strokeWidth="1.5" opacity="0.5" />
              <line x1="32" y1="20" x2="40" y2="20" stroke="#3BD8F0" strokeWidth="1.5" opacity="0.5" />
              <line x1="32" y1="52" x2="40" y2="52" stroke="#E65BFF" strokeWidth="1.5" opacity="0.5" />
              <circle cx="36" cy="36" r="4" fill="white" opacity="0.5" />
            </svg>
            {project.status === "placeholder" && (
              <div className="absolute bottom-3 left-0 right-0 text-center text-xs text-[#A9B3CC] font-medium">
                Coming soon
              </div>
            )}
          </div>
        )}

        {/* Status badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border border-[var(--border)]"
          style={{
            background: "var(--surface)",
            color: "var(--text-primary)",
          }}
        >
          <StatusIcon size={12} aria-hidden="true" />
          {status.label}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm"
            style={{
              background: "rgba(250,204,21,0.18)",
              border: "1px solid rgba(250,204,21,0.45)",
              color: "#D97706",
            }}
          >
            <Star size={11} fill="currentColor" aria-hidden="true" />
            Featured
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-4">
        <div>
          <h3 className="font-bold text-[var(--text-primary)] text-lg mb-2 leading-snug group-hover:text-[var(--accent-blue)] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Technologies tags using pill tokens */}
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="pill-token text-xs px-2.5 py-1 rounded-lg font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2.5 mt-auto pt-2">
          {project.githubUrl ? (
            <MotionLink
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost flex-1 flex items-center justify-center gap-1.5 !py-2.5 !text-xs sm:!text-sm font-bold shadow-sm"
              aria-label={`View ${project.title} on GitHub (opens in new tab)`}
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
            </MotionLink>
          ) : (
            <MotionButton
              disabled
              className="btn-ghost flex-1 flex items-center justify-center gap-1.5 !py-2.5 !text-xs sm:!text-sm font-medium"
              aria-disabled="true"
            >
              <GithubIcon size={15} />
              <span>Upcoming</span>
            </MotionButton>
          )}

          {project.liveUrl ? (
            <MotionLink
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 flex items-center justify-center gap-1.5 !py-2.5 !text-xs sm:!text-sm font-bold shadow-sm"
              aria-label={`View ${project.title} live demo (opens in new tab)`}
            >
              <ExternalLink size={14} aria-hidden="true" />
              <span>Live Demo</span>
            </MotionLink>
          ) : (
            <MotionButton
              disabled
              className="btn-primary flex-1 flex items-center justify-center gap-1.5 !py-2.5 !text-xs sm:!text-sm font-medium opacity-50 cursor-not-allowed"
              aria-disabled="true"
            >
              <ExternalLink size={14} aria-hidden="true" />
              <span>Upcoming</span>
            </MotionButton>
          )}
        </div>
      </div>
    </InteractiveCard>
  );
}
