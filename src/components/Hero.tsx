import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Sparkles, MapPin, BookOpen } from "lucide-react";
import { siteConfig } from "../config/site";
import Hero3DScene from "./Hero3DScene";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { MotionLink } from "./motion/MotionButton";
import ResumeButton from "./ResumeButton";

const ROLES = [
  "Blockchain & Web3 Specialist",
  "Solidity Smart Contract Developer",
  "TypeScript & React Frontend Architect",
  "Python & Cryptography Engineer",
  "Java & Distributed Systems Builder",
];

const GREETINGS = [
  { text: "HELLO, I'M", lang: "EN" },
  { text: "నమస్కారం, నేను", lang: "TE" },
  { text: "नमस्ते, मैं हूँ", lang: "HI" },
  { text: "HOLA, SOY", lang: "ES" },
  { text: "BONJOUR, JE SUIS", lang: "FR" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Multi-lingual greeting cycle (every 4 seconds)
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Screen size check for mobile parallax reduction
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parallax depth via useScroll & useTransform (capped to max 50px)
  const { scrollY } = useScroll();
  const maxTravel = shouldReduceMotion || isMobile ? 0 : 50;

  // Background glow moves slowly (0.15x scroll speed)
  const bgGlowY = useTransform(scrollY, [0, 600], [0, maxTravel * 0.4]);
  // Text column moves at normal speed
  const textY = useTransform(scrollY, [0, 600], [0, maxTravel * 0.3]);
  // 3D visual moves at slightly different speed (0.8x of travel) creating depth feel
  const visualY = useTransform(scrollY, [0, 600], [0, maxTravel * 0.8]);

  // Spring mouse parallax for desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 120, damping: 20 };
  const smoothRotateX = useSpring(useTransform(mouseY, [-200, 200], [7, -7]), springCfg);
  const smoothRotateY = useSpring(useTransform(mouseX, [-200, 200], [-7, 7]), springCfg);

  // Typewriter effect
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(ROLES[roleIndex]);
      return;
    }
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayedText.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayedText(current.slice(0, displayedText.length + 1));
        }, 70);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(current.slice(0, displayedText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, shouldReduceMotion]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (shouldReduceMotion || window.innerWidth < 1024) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  }, [mouseX, mouseY, shouldReduceMotion]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    const reset = () => { mouseX.set(0); mouseY.set(0); };
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [handleMouseMove, mouseX, mouseY]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Parallax background soft glow layer */}
      <motion.div
        style={{ y: bgGlowY }}
        className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-60 animate-blob"
          style={{ background: "radial-gradient(circle, var(--glow-1), transparent)" }}
        />
        <div
          className="absolute top-1/3 -right-20 w-[450px] h-[450px] rounded-full blur-3xl opacity-60 animate-blob"
          style={{
            background: "radial-gradient(circle, var(--glow-2), transparent)",
            animationDelay: "4s",
          }}
        />
      </motion.div>

      <div className="section-container w-full py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* ── Left Column: Introduction & Call-to-actions ── */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 text-center lg:text-left will-change-transform"
          >
            {/* Introductory label with multi-language greeting */}
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                style={{
                  background: "rgba(91, 140, 255, 0.12)",
                  border: "1px solid rgba(91, 140, 255, 0.25)",
                }}
              >
                <Sparkles size={16} className="text-[var(--accent-blue)]" aria-hidden="true" />
              </span>
              <button
                type="button"
                onClick={() => setGreetingIndex((prev) => (prev + 1) % GREETINGS.length)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer group"
                title="Click to cycle greeting language"
              >
                <span>{GREETINGS[greetingIndex].text}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-[var(--accent-blue)] border border-white/10 group-hover:bg-[var(--accent-blue)] group-hover:text-white transition-colors">
                  {GREETINGS[greetingIndex].lang}
                </span>
              </button>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-[1.15]">
              Ruttala Hemanth{" "}
              <span className="gradient-text block sm:inline">
                Sri Satya Sai
              </span>
            </h1>

            {/* Rotating Title */}
            <div
              className="flex items-center gap-2 justify-center lg:justify-start min-h-[36px]"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="text-lg sm:text-xl font-bold text-[var(--accent-cyan)]">
                {displayedText}
              </span>
              {!shouldReduceMotion && (
                <span className="w-0.5 h-5 bg-[var(--accent-cyan)] cursor-blink rounded" />
              )}
            </div>

            {/* University & Location Badges */}
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
              <span className="glass-card inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-[var(--border)] shadow-sm">
                <BookOpen size={13} className="text-[var(--accent-violet)]" aria-hidden="true" />
                <span className="text-[var(--text-primary)]">VIT-AP University · Blockchain CSE</span>
              </span>
              <span className="glass-card inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-[var(--border)] shadow-sm">
                <MapPin size={13} className="text-[var(--accent-cyan)]" aria-hidden="true" />
                <span className="text-[var(--text-primary)]">Andhra Pradesh, India</span>
              </span>
            </div>

            {/* Availability Badge */}
            <div className="flex justify-center lg:justify-start">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-sm"
                style={{
                  background: "rgba(16, 185, 129, 0.12)",
                  color: "#10B981",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                Open to internships & opportunities
              </span>
            </div>

            {/* Professional Introduction */}
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              {siteConfig.introText}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3.5 justify-center lg:justify-start items-center pt-2">
              <ResumeButton className="btn-primary !py-3 !px-5 shadow-lg" />

              <MotionLink
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex items-center gap-2 !py-3 !px-5 shadow-sm font-bold"
                aria-label="View GitHub profile (opens in new tab)"
              >
                <GithubIcon size={17} />
                <span>View GitHub</span>
              </MotionLink>

              <MotionLink
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex items-center gap-2 !py-3 !px-5 shadow-sm font-bold"
                aria-label="Connect on LinkedIn (opens in new tab)"
              >
                <LinkedinIcon size={17} />
                <span>Connect on LinkedIn</span>
              </MotionLink>
            </div>
          </motion.div>

          {/* ── Right Column: 3D Scene with Parallax Depth ── */}
          <motion.div
            style={{ y: visualY }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center will-change-transform"
          >
            <div
              style={{ perspective: shouldReduceMotion ? undefined : 900 }}
              className="relative"
            >
              <motion.div
                style={{
                  rotateX: shouldReduceMotion ? 0 : smoothRotateX,
                  rotateY: shouldReduceMotion ? 0 : smoothRotateY,
                }}
              >
                <Hero3DScene />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
