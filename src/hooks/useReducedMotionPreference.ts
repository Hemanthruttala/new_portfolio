import { useEffect, useState } from "react";

/**
 * Returns true when the user has requested reduced motion via their OS or
 * browser accessibility settings.  Components can use this to skip or
 * simplify animations.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}
