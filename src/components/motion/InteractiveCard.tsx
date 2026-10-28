import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

export type CardAccent =
  | "blue"
  | "violet"
  | "cyan"
  | "green"
  | "gradient-blue-violet"
  | "gradient-cyan-blue";

export interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  accent?: CardAccent;
  as?: "div" | "article" | "a" | "button" | "form";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  onSubmit?: (e: React.FormEvent<any>) => void;
  onFocus?: (e: React.FocusEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  tabIndex?: number;
  role?: string;
  "aria-label"?: string;
  "aria-disabled"?: boolean;
  disabled?: boolean;
  [key: string]: any;
}

const ACCENT_STYLES: Record<
  CardAccent,
  {
    solidBorder: string;
    isGradient: boolean;
    gradientBorder: string;
    pulseColor: string;
    glow: string;
  }
> = {
  blue: {
    solidBorder: "var(--accent-blue)",
    isGradient: false,
    gradientBorder: "",
    pulseColor: "var(--accent-blue)",
    glow: "var(--glow-blue-card)",
  },
  violet: {
    solidBorder: "var(--accent-violet)",
    isGradient: false,
    gradientBorder: "",
    pulseColor: "var(--accent-violet)",
    glow: "var(--glow-violet-card)",
  },
  cyan: {
    solidBorder: "var(--accent-cyan)",
    isGradient: false,
    gradientBorder: "",
    pulseColor: "var(--accent-cyan)",
    glow: "var(--glow-cyan-card)",
  },
  green: {
    solidBorder: "var(--accent-green)",
    isGradient: false,
    gradientBorder: "",
    pulseColor: "var(--accent-green)",
    glow: "var(--glow-green-card)",
  },
  "gradient-blue-violet": {
    solidBorder: "var(--accent-blue)",
    isGradient: true,
    gradientBorder: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))",
    pulseColor: "var(--accent-blue)",
    glow: "var(--glow-blue-card)",
  },
  "gradient-cyan-blue": {
    solidBorder: "var(--accent-cyan)",
    isGradient: true,
    gradientBorder: "linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))",
    pulseColor: "var(--accent-cyan)",
    glow: "var(--glow-cyan-card)",
  },
};

export const InteractiveCard = forwardRef<HTMLElement, InteractiveCardProps>(
  (
    {
      children,
      className = "",
      style = {},
      accent = "blue",
      as = "div",
      href,
      target,
      rel,
      onClick,
      onSubmit,
      onFocus,
      onBlur,
      tabIndex,
      role,
      "aria-label": ariaLabel,
      "aria-disabled": ariaDisabled,
      disabled,
      ...rest
    },
    forwardedRef
  ) => {
    const cardRef = useRef<HTMLElement | null>(null);
    const shouldReduceMotion = useReducedMotion();

    // Hover, Focus, Active States
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isPulseActive, setIsPulseActive] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Glare coordinates
    const [glarePos, setGlarePos] = useState({ x: 0, y: 0 });

    // 3D Tilt Motion Values
    const rawRotateX = useMotionValue(0);
    const rawRotateY = useMotionValue(0);

    // Spring interpolation for tilt (smooth return to 0)
    const springRotateX = useSpring(rawRotateX, { stiffness: 300, damping: 20 });
    const springRotateY = useSpring(rawRotateY, { stiffness: 300, damping: 20 });

    // Detect touch device (hover: none)
    useEffect(() => {
      const checkTouch = () => {
        setIsTouchDevice(window.matchMedia("(hover: none)").matches);
      };
      checkTouch();
      window.addEventListener("resize", checkTouch);
      return () => window.removeEventListener("resize", checkTouch);
    }, []);

    // RAF-throttled pointer move
    const rafId = useRef<number | null>(null);

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLElement>) => {
        if (shouldReduceMotion || isTouchDevice) return;
        const targetEl = cardRef.current;
        if (!targetEl) return;

        const rect = targetEl.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;

        if (rafId.current) cancelAnimationFrame(rafId.current);

        rafId.current = requestAnimationFrame(() => {
          const x = clientX - rect.left;
          const y = clientY - rect.top;

          setGlarePos({ x, y });

          // Calculate tilt angle (-6 to +6 degrees)
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const tiltY = ((x - centerX) / centerX) * 6;
          const tiltX = -((y - centerY) / centerY) * 6;

          rawRotateX.set(tiltX);
          rawRotateY.set(tiltY);
        });
      },
      [shouldReduceMotion, isTouchDevice, rawRotateX, rawRotateY]
    );

    const handlePointerEnter = useCallback(() => {
      setIsHovered(true);
    }, []);

    const handlePointerLeave = useCallback(() => {
      setIsHovered(false);
      setIsPressed(false);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rawRotateX.set(0);
      rawRotateY.set(0);
    }, [rawRotateX, rawRotateY]);

    // Border pulse trigger on click/tap
    const triggerPulse = useCallback(() => {
      if (shouldReduceMotion) return;
      setIsPulseActive(true);
      setTimeout(() => setIsPulseActive(false), 450);
    }, [shouldReduceMotion]);

    const handleClick = useCallback(
      (e: React.MouseEvent<any>) => {
        triggerPulse();
        if (onClick) onClick(e);
      },
      [triggerPulse, onClick]
    );

    const handlePointerDown = useCallback(() => {
      setIsPressed(true);
      triggerPulse();
    }, [triggerPulse]);

    const handlePointerUp = useCallback(() => {
      setIsPressed(false);
    }, []);

    const handleFocus = useCallback(
      (e: React.FocusEvent<any>) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<any>) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
      },
      [onBlur]
    );

    const cfg = ACCENT_STYLES[accent as CardAccent] || ACCENT_STYLES.blue;

    const isHighlighted = isHovered || isPressed || isFocused;

    // Active border color (using theme tokens)
    const activeBorder = isHighlighted
      ? cfg.isGradient
        ? cfg.gradientBorder
        : cfg.solidBorder
      : "var(--border)";

    // Motion component selection
    const MotionComponent: any =
      as === "a"
        ? motion.a
        : as === "article"
        ? motion.article
        : as === "button"
        ? motion.button
        : as === "form"
        ? motion.form
        : motion.div;

    // Lift and squish animation configuration
    const motionProps = shouldReduceMotion
      ? {}
      : {
          whileHover: {
            y: -8,
            scale: 1.02,
            transition: { type: "spring" as const, stiffness: 300, damping: 20 },
          },
          whileTap: {
            scale: 0.97,
            transition: { type: "spring" as const, stiffness: 400, damping: 17 },
          },
        };

    return (
      <div
        style={{
          perspective: shouldReduceMotion || isTouchDevice ? undefined : 900,
        }}
        className="w-full h-full"
      >
        <MotionComponent
          ref={(node: HTMLElement | null) => {
            cardRef.current = node;
            if (typeof forwardedRef === "function") forwardedRef(node);
            else if (forwardedRef) (forwardedRef as any).current = node;
          }}
          href={href}
          target={target}
          rel={rel}
          onClick={handleClick}
          onSubmit={onSubmit}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          tabIndex={tabIndex}
          role={role}
          aria-label={ariaLabel}
          aria-disabled={ariaDisabled}
          disabled={disabled}
          {...motionProps}
          style={{
            transformStyle:
              shouldReduceMotion || isTouchDevice ? undefined : "preserve-3d",
            rotateX: shouldReduceMotion || isTouchDevice ? 0 : springRotateX,
            rotateY: shouldReduceMotion || isTouchDevice ? 0 : springRotateY,
            willChange: isHovered && !shouldReduceMotion ? "transform" : "auto",
            backgroundColor: isHighlighted ? "var(--surface-hover)" : "var(--surface)",
            borderColor: activeBorder,
            borderWidth: isPressed ? "2px" : "1px",
            borderStyle: "solid",
            boxShadow: isHighlighted ? cfg.glow : "var(--card-shadow)",
            transition:
              "border-color 250ms ease, box-shadow 250ms ease, background-color 250ms ease, border-width 150ms ease",
            ...style,
          }}
          className={`glass-card relative rounded-2xl overflow-hidden cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] focus-visible:ring-offset-2 ${className}`}
          {...rest}
        >
          {/* Moving Glare / Spotlight inside card (cursor follower) */}
          {isHovered && !shouldReduceMotion && !isTouchDevice && (
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 z-0"
              style={{
                background: `radial-gradient(circle 240px at ${glarePos.x}px ${glarePos.y}px, var(--card-glare), transparent 70%)`,
              }}
              aria-hidden="true"
            />
          )}

          {/* Gradient Border Overlay for Gradient Accents */}
          {cfg.isGradient && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-250 z-10"
              style={{
                padding: isPressed ? "2px" : "1px",
                background: cfg.gradientBorder,
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                opacity: isHighlighted ? 1 : 0,
              }}
              aria-hidden="true"
            />
          )}

          {/* Border Pulse: Expanding ring flash on click / tap (450ms) */}
          <AnimatePresence>
            {isPulseActive && (
              <motion.div
                initial={{ opacity: 0.85, scale: 1 }}
                animate={{ opacity: 0, scale: 1.03 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0 rounded-2xl pointer-events-none z-20"
                style={{
                  border: `2px solid ${cfg.pulseColor}`,
                  boxShadow: `0 0 16px ${cfg.pulseColor}`,
                }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          {/* Card Inner Content */}
          <div className="relative z-10 w-full h-full flex flex-col">
            {children}
          </div>
        </MotionComponent>
      </div>
    );
  }
);

InteractiveCard.displayName = "InteractiveCard";
