import type { Certification } from "../types";

/**
 * CERTIFICATIONS DATA
 * ─────────────────────────────────────────────────────────────────────────────
 * How to add a real certificate:
 *  1. Save your certificate image to  public/images/certificates/my-cert.jpg
 *  2. Copy one of the placeholder objects below, fill in real details, and
 *     remove or replace the placeholder entry.
 *  3. Add credentialUrl if you have a verifiable credential link.
 *  4. Save the file — the website automatically renders the new card.
 *
 * Example of a completed certificate:
 * {
 *   id: "nptel-python",
 *   name: "Programming in Python",
 *   provider: "NPTEL",
 *   date: "March 2024",
 *   credentialUrl: "https://nptel.ac.in/...",
 *   image: "/images/certificates/nptel-python.jpg",
 *   description: "12-week online certification on Python programming.",
 * }
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const certifications: Certification[] = [
  {
    id: "cert-placeholder-1",
    name: "Certification Coming Soon",
    provider: "Provider",
    description:
      "A certification is planned in this area. Details will be added once earned.",
  },
  {
    id: "cert-placeholder-2",
    name: "Certification Coming Soon",
    provider: "Provider",
    description:
      "Another certification is being pursued. Will be documented and verified upon completion.",
  },
  {
    id: "cert-placeholder-3",
    name: "Certification Coming Soon",
    provider: "Provider",
    description:
      "A third achievement is on the roadmap. Stay tuned for updates.",
  },
];
