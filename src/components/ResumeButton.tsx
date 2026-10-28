import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import { siteConfig } from "../config/site";

interface ResumeButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function ResumeButton({
  className = "",
  showLabel = true,
}: ResumeButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [shake, setShake] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent) => {
    if (siteConfig.resumeAvailable) {
      setIsDownloading(true);
      const a = document.createElement("a");
      a.href = siteConfig.resumeUrl;
      a.download = "Hemanth_Resume.pdf";
      a.click();
      setTimeout(() => setIsDownloading(false), 550);
    } else {
      e.preventDefault();
      // Gentle horizontal shake
      setShake((prev) => prev + 1);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2600);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <motion.button
        type="button"
        onClick={handleClick}
        animate={
          !shouldReduceMotion && shake > 0
            ? { x: [0, -6, 6, -4, 4, 0] }
            : { x: 0 }
        }
        transition={{ duration: 0.4 }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
        className={`relative inline-flex items-center justify-center gap-2 cursor-pointer font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] ${className}`}
        aria-label={
          siteConfig.resumeAvailable
            ? "Download Resume PDF"
            : "Resume not yet available"
        }
        aria-disabled={!siteConfig.resumeAvailable}
      >
        <span className="relative inline-flex items-center justify-center w-4 h-4 overflow-hidden">
          <motion.span
            animate={
              isDownloading && !shouldReduceMotion
                ? { y: [0, 16, -16, 0], opacity: [1, 0, 0, 1] }
                : { y: 0, opacity: 1 }
            }
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="inline-flex"
          >
            <Download size={15} aria-hidden="true" />
          </motion.span>
        </span>
        {showLabel && (
          <span>
            {siteConfig.resumeAvailable ? "Download Resume" : "Resume"}
          </span>
        )}
      </motion.button>

      {/* Accessible Tooltip for Unavailable State */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute -bottom-11 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shadow-xl pointer-events-none glass-card text-[var(--text-primary)] border border-[var(--border)]"
          >
            Resume will be available shortly
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-l border-t border-[var(--border)]" style={{ backgroundColor: "var(--surface)" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
