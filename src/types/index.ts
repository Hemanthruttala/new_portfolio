// ── Types used across the portfolio ──────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  /** Path relative to /public, e.g. "/images/projects/my-project.png" */
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  /** "placeholder" | "wip" | "complete" */
  status: "placeholder" | "wip" | "complete";
  featured?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  date?: string;
  credentialUrl?: string;
  /** Path relative to /public, e.g. "/images/certificates/aws-cert.jpg" */
  image?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  category: "web3" | "development" | "foundations" | "professional";
}

export type Theme = "dark" | "light";
