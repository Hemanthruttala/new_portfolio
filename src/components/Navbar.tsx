import { useState, useEffect, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig } from "../config/site";
import { useTheme } from "../hooks/useTheme";
import { GithubIcon } from "./SocialIcons";
import ResumeButton from "./ResumeButton";
import { MotionLink } from "./motion/MotionButton";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Code", href: "#code-studio" },
  { label: "Projects", href: "#projects" },
  { label: "Terminal", href: "#terminal-zone" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    const offset = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileOpen(false);
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl border-b border-[var(--border)] shadow-md"
            : "border-b border-transparent"
        }`}
        style={{
          backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
        }}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] rounded-xl group cursor-pointer"
            aria-label="Go to home section"
          >
            <span
              className="relative w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-md transition-transform group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}
            >
              HS
            </span>
            <span className="hidden sm:block font-bold text-[var(--text-primary)] text-sm tracking-tight group-hover:text-[var(--accent-blue)] transition-colors">
              {siteConfig.shortName}
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1.5" role="list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] cursor-pointer ${
                      isActive
                        ? "text-[var(--accent-blue)] bg-[var(--pill-bg)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                        style={{
                          background: "linear-gradient(90deg, var(--accent-blue), var(--accent-violet))",
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors border border-[var(--border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] cursor-pointer shadow-sm overflow-hidden"
              style={{ backgroundColor: "var(--surface)", color: "var(--text-primary)" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -180, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 180, opacity: 0, scale: 0.6 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 18,
                      duration: 0.5,
                    }}
                    className="inline-flex"
                  >
                    <Sun size={17} className="text-amber-400" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: -180, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 180, opacity: 0, scale: 0.6 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 18,
                      duration: 0.5,
                    }}
                    className="inline-flex"
                  >
                    <Moon size={17} className="text-[var(--accent-violet)]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Desktop Resume Button */}
            <div className="hidden sm:block">
              <ResumeButton className="btn-primary text-xs !py-2 !px-3.5 shadow-md font-bold" />
            </div>

            {/* Hamburger button: 3 lines morph into X with spring */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--border)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] cursor-pointer"
              style={{ backgroundColor: "var(--surface)", color: "var(--text-primary)" }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <motion.line
                  x1="2"
                  y1="4.5"
                  x2="16"
                  y2="4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={
                    mobileOpen && !shouldReduceMotion
                      ? { rotate: 45, y: 4.5, x: 0 }
                      : { rotate: 0, y: 0, x: 0 }
                  }
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  style={{ transformOrigin: "9px 9px" }}
                />
                <motion.line
                  x1="2"
                  y1="9"
                  x2="16"
                  y2="9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={
                    mobileOpen && !shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 1 }
                  }
                  transition={{ duration: 0.15 }}
                />
                <motion.line
                  x1="2"
                  y1="13.5"
                  x2="16"
                  y2="13.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={
                    mobileOpen && !shouldReduceMotion
                      ? { rotate: -45, y: -4.5, x: 0 }
                      : { rotate: 0, y: 0, x: 0 }
                  }
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  style={{ transformOrigin: "9px 9px" }}
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden backdrop-blur-2xl border-b border-[var(--border)] shadow-2xl"
            style={{ backgroundColor: "var(--surface)" }}
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <nav className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] ${
                      isActive
                        ? "bg-[var(--pill-bg)] text-[var(--accent-blue)]"
                        : "text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-3 pb-1 border-t border-[var(--border)] flex flex-col gap-2.5 mt-2">
                <ResumeButton
                  className="btn-primary w-full !py-3 shadow-md font-bold"
                  showLabel={true}
                />
                <MotionLink
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="btn-ghost flex items-center justify-center gap-2 !py-2.5 font-bold"
                  aria-label="View GitHub Profile (opens in new tab)"
                >
                  <GithubIcon size={16} />
                  <span>GitHub Profile</span>
                </MotionLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
