import type { Project } from "../types";

/**
 * PROJECTS DATA
 * ─────────────────────────────────────────────────────────────────────────────
 * Add your real projects here!
 *
 * Example format when adding your real project:
 * {
 *   id: "my-first-project",
 *   title: "Your Project Name",
 *   description: "A short description of what this project does and what you built.",
 *   technologies: ["React", "TypeScript", "Tailwind CSS"],
 *   githubUrl: "https://github.com/Hemanthruttala/your-repo-name",
 *   liveUrl: "https://your-demo-link.com", // optional
 *   image: "/images/projects/your-screenshot.png", // optional
 *   status: "complete", // "complete" | "wip" | "placeholder"
 *   featured: true,
 * }
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project Slot 01",
    description: "This project slot is reserved for an upcoming project. Details and repository links will be published here soon.",
    technologies: [],
    status: "placeholder",
    featured: false,
  },
  {
    id: "project-2",
    title: "Project Slot 02",
    description: "This project slot is reserved for an upcoming project. Details and repository links will be published here soon.",
    technologies: [],
    status: "placeholder",
    featured: false,
  },
  {
    id: "project-3",
    title: "Project Slot 03",
    description: "This project slot is reserved for an upcoming project. Details and repository links will be published here soon.",
    technologies: [],
    status: "placeholder",
    featured: false,
  },
];
