import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE_CUBIC = [0.16, 1, 0.3, 1] as const;

export const revealGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const revealItemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASE_CUBIC,
    },
  },
};

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}

export function RevealGroup({
  children,
  className = "",
  delayChildren = 0.05,
  staggerChildren = 0.08,
}: RevealGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = "", delay }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // If delay is provided standalone without a parent RevealGroup
  const standaloneVariants = delay !== undefined
    ? {
        hidden: { opacity: 0, y: 24, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: EASE_CUBIC, delay },
        },
      }
    : revealItemVariants;

  return (
    <motion.div
      variants={standaloneVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Standalone element reveal triggered when scrolled into view */
export function RevealSingle({ children, className = "", delay = 0 }: RevealSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE_CUBIC, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
