import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { siteConfig } from "../config/site";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Mail, MapPin } from "lucide-react";
import { buttonSpringTransition } from "./motion/MotionButton";

export default function Footer() {
  const year = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative border-t border-[var(--border)] bg-transparent"
      role="contentinfo"
    >
      {/* Top Animated Gradient Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] animated-border"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 items-start">
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-3.5">
            <motion.button
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              transition={buttonSpringTransition}
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] rounded-xl group w-fit cursor-pointer"
              aria-label="Back to top"
            >
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-md"
                style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}
              >
                HS
              </span>
              <div className="text-left">
                <span className="font-bold text-[var(--text-primary)] text-base tracking-tight block">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-[var(--accent-blue)] font-semibold">
                  {siteConfig.headline}
                </span>
              </div>
            </motion.button>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-md font-normal">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-medium mt-1">
              <MapPin size={13} className="text-[var(--accent-cyan)]" />
              <span>{siteConfig.university} · {siteConfig.universityLocation}</span>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation" className="flex flex-col gap-2.5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-1">
              Quick Navigation
            </p>
            {["home", "about", "skills", "projects", "certifications", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left w-fit capitalize font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] rounded"
              >
                {id}
              </button>
            ))}
          </nav>

          {/* Connect & Social */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-1">
              Connect With Me
            </p>
            <motion.a
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              transition={buttonSpringTransition}
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] rounded p-1"
              aria-label="GitHub profile (opens in new tab)"
            >
              <GithubIcon size={16} />
              <span>GitHub / Hemanthruttala</span>
            </motion.a>
            <motion.a
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              transition={buttonSpringTransition}
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] rounded p-1"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn Profile</span>
            </motion.a>
            <motion.a
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              transition={buttonSpringTransition}
              href={`mailto:${siteConfig.personalEmail}`}
              className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] rounded p-1"
              aria-label={`Send email to ${siteConfig.personalEmail}`}
            >
              <Mail size={15} className="text-[var(--accent-blue)]" />
              <span>Email Personal</span>
            </motion.a>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)] font-medium">
          <p>
            © {year} <span className="font-bold text-[var(--text-primary)]">{siteConfig.name}</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart size={13} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span>for Web3 & Decentralized Future</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
