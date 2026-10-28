import React, { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const buttonSpringTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 17,
};

export interface MotionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, className = "", disabled, onClick, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
      return (
        <button
          ref={ref}
          disabled={disabled}
          onClick={onClick}
          className={className}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        whileHover={disabled ? undefined : { scale: 1.04, y: -2 }}
        whileTap={disabled ? undefined : { scale: 0.94 }}
        transition={buttonSpringTransition}
        className={className}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);
MotionButton.displayName = "MotionButton";

export interface MotionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export const MotionLink = forwardRef<HTMLAnchorElement, MotionLinkProps>(
  ({ children, className = "", href, target, rel, onClick, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
      return (
        <a
          ref={ref}
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={className}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.94 }}
        transition={buttonSpringTransition}
        className={className}
        {...(props as any)}
      >
        {children}
      </motion.a>
    );
  }
);
MotionLink.displayName = "MotionLink";
