import { FolderGit2 } from "lucide-react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { RevealGroup, Reveal, RevealSingle } from "./motion/Reveal";

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
      aria-label="Projects section"
    >
      <div className="section-container relative z-10">
        {/* Section header */}
        <RevealSingle className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 shadow-md"
            style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))" }}
          >
            <FolderGit2 size={22} className="text-white" aria-hidden="true" />
          </div>
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-[var(--accent-blue)] mb-2">
            What I Build
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mb-3">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm sm:text-base font-normal">
            Projects will be added here as I build and develop them.
          </p>
        </RevealSingle>

        {/* Empty project placeholder cards */}
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Reveal key={project.id} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
