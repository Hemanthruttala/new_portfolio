import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { buttonSpringTransition } from "./motion/MotionButton";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isShooting, setIsShooting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handler = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress =
        totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleClick = () => {
    if (!shouldReduceMotion) {
      setIsShooting(true);
      setTimeout(() => setIsShooting(false), 500);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          transition={buttonSpringTransition}
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] cursor-pointer group overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))",
            boxShadow: "0 8px 25px rgba(91, 140, 255, 0.40)",
          }}
          aria-label="Back to top of page"
        >
          {/* Circular progress stroke */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 p-1 pointer-events-none"
            viewBox="0 0 36 36"
            aria-hidden="true"
          >
            <path
              className="text-white/20"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-white"
              strokeDasharray={`${scrollProgress}, 100`}
              strokeWidth="2.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>

          {/* Arrow icon: lifts up on hover and shoots up on click */}
          <motion.span
            className="inline-flex items-center justify-center text-white"
            animate={
              isShooting && !shouldReduceMotion
                ? { y: [-4, -28, 28, 0], opacity: [1, 0, 0, 1] }
                : {}
            }
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <motion.span
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="inline-flex"
            >
              <ArrowUp size={18} aria-hidden="true" />
            </motion.span>
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
