import { useState } from "react";
import { Award, ExternalLink, Calendar, Building2, Image as ImageIcon, X } from "lucide-react";
import { MotionLink, MotionButton } from "./motion/MotionButton";
import { InteractiveCard } from "./motion/InteractiveCard";
import type { Certification } from "../types";

interface CertificateCardProps {
  cert: Certification;
}

export default function CertificateCard({ cert }: CertificateCardProps) {
  const [imgError, setImgError] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const isPlaceholder = cert.name.toLowerCase().includes("coming soon");

  return (
    <>
      <InteractiveCard
        as="article"
        accent="violet"
        className="overflow-hidden flex flex-col group shadow-lg h-full"
        aria-label={`Certification: ${cert.name}`}
      >
        {/* Certificate Image or Badge Area */}
        <div
          className="h-36 relative flex items-center justify-center overflow-hidden shrink-0 bg-[#0B0F1A]"
          style={{
            background:
              "linear-gradient(135deg, rgba(155,107,255,0.18), rgba(91,140,255,0.12))",
          }}
        >
          {/* Radial pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(155,107,255,0.5) 0, transparent 65%)",
            }}
            aria-hidden="true"
          />

          {cert.image && !imgError ? (
            <>
              <img
                src={cert.image}
                alt={`${cert.name} certificate from ${cert.provider}`}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                onError={() => setImgError(true)}
                loading="lazy"
              />
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-violet)] cursor-pointer"
                aria-label={`View ${cert.name} certificate image`}
              >
                <span className="flex items-center gap-1.5 text-white text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/30 shadow-md">
                  <ImageIcon size={13} aria-hidden="true" /> View Full
                </span>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform duration-200">
              <Award size={40} className="text-[var(--accent-violet)]" aria-hidden="true" />
              {isPlaceholder && (
                <span className="text-xs text-[var(--text-muted)] font-medium">
                  Coming soon
                </span>
              )}
            </div>
          )}
        </div>

        {/* Details Content */}
        <div className="flex flex-col flex-1 p-5 gap-3.5">
          <div>
            <h3 className="font-bold text-[var(--text-primary)] text-base mb-1.5 leading-snug group-hover:text-[var(--accent-violet)] transition-colors">
              {cert.name}
            </h3>
            {cert.description && (
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 font-normal">
                {cert.description}
              </p>
            )}
          </div>

          {/* Issuer & Date */}
          <div className="flex flex-col gap-1.5 mt-auto">
            {cert.provider && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
                <Building2 size={13} aria-hidden="true" className="shrink-0 text-[var(--accent-violet)]" />
                <span>{cert.provider}</span>
              </div>
            )}
            {cert.date && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
                <Calendar size={13} aria-hidden="true" className="shrink-0" />
                <span>{cert.date}</span>
              </div>
            )}
          </div>

          {/* Action button */}
          {cert.credentialUrl ? (
            <MotionLink
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-1.5 !py-2.5 !text-xs sm:!text-sm font-bold shadow-sm mt-1"
              aria-label={`View ${cert.name} credential (opens in new tab)`}
            >
              <ExternalLink size={13} aria-hidden="true" />
              <span>View Certificate</span>
            </MotionLink>
          ) : (
            <MotionButton
              disabled
              className="btn-ghost flex items-center justify-center gap-1.5 !py-2.5 !text-xs sm:!text-sm font-medium mt-1"
              aria-disabled="true"
            >
              <ExternalLink size={13} aria-hidden="true" />
              <span>{isPlaceholder ? "Upcoming" : "No credential link"}</span>
            </MotionButton>
          )}
        </div>
      </InteractiveCard>

      {/* Preview Modal */}
      {previewOpen && cert.image && !imgError && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${cert.name} certificate preview`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setPreviewOpen(false)}
          tabIndex={-1}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={cert.image}
              alt={`${cert.name} certificate full view`}
              className="w-full rounded-2xl shadow-2xl border border-white/20"
            />
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              className="absolute -top-3 -right-3 w-9 h-9 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] cursor-pointer"
              style={{ background: "var(--surface)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
              aria-label="Close certificate preview"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
