import { Award } from "lucide-react";
import { certifications } from "../data/certifications";
import CertificateCard from "./CertificateCard";
import { RevealGroup, Reveal, RevealSingle } from "./motion/Reveal";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="section-padding relative overflow-hidden"
      aria-label="Certifications section"
    >
      <div className="section-container relative z-10">
        {/* Section header */}
        <RevealSingle className="text-center mb-16">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 shadow-md"
            style={{ background: "linear-gradient(135deg, var(--accent-violet), var(--accent-blue))" }}
          >
            <Award size={22} className="text-white" aria-hidden="true" />
          </div>
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-[var(--accent-violet)] mb-2">
            Milestones
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mb-3">
            Certifications &{" "}
            <span className="gradient-text-magenta">Achievements</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm sm:text-base font-normal">
            Documenting the journey, one milestone at a time.
          </p>
        </RevealSingle>

        {/* Staggered cards reveal */}
        {certifications.length > 0 ? (
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Reveal key={cert.id} className="h-full">
                <CertificateCard cert={cert} />
              </Reveal>
            ))}
          </RevealGroup>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center glass-card shadow-md">
              <Award size={28} className="text-[var(--text-muted)]" />
            </div>
            <p className="text-[var(--text-secondary)] font-medium">
              Certifications will appear here once earned.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
