import { useEffect, useState, useRef } from "react";
import { Code, Award, ShieldCheck, Zap } from "lucide-react";
import { RevealGroup, Reveal } from "./motion/Reveal";
import { useReducedMotion } from "framer-motion";

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  subtext: string;
  icon: any;
  accent: string;
}

const STATS: StatItem[] = [
  {
    id: "languages",
    label: "Languages Mastered",
    value: 5,
    suffix: "+",
    subtext: "Solidity, TypeScript, Python, Java, C++",
    icon: Code,
    accent: "var(--accent-blue)",
  },
  {
    id: "projects",
    label: "DApps & Web Apps",
    value: 12,
    suffix: "+",
    subtext: "Decentralized & Full-stack Builds",
    icon: Zap,
    accent: "var(--accent-violet)",
  },
  {
    id: "dsa",
    label: "DSA Problems Solved",
    value: 250,
    suffix: "+",
    subtext: "Algorithmic & LeetCode challenges",
    icon: Award,
    accent: "var(--accent-cyan)",
  },
  {
    id: "safety",
    label: "Type Safety & Coverage",
    value: 100,
    suffix: "%",
    subtext: "Strict TypeScript & Reentrancy Guards",
    icon: ShieldCheck,
    accent: "var(--accent-green)",
  },
];

function CountUpNumber({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 1600; // ms
          const startTime = performance.now();

          const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(update);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, shouldReduceMotion]);

  return (
    <span ref={ref} className="font-black tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-12 relative z-10" aria-label="Key Developer Metrics">
      <div className="section-container">
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat) => (
            <Reveal key={stat.id}>
              <div className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-[var(--border)] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200"
                    style={{
                      backgroundColor: "rgba(91, 140, 255, 0.12)",
                      border: `1px solid ${stat.accent}`,
                    }}
                  >
                    <stat.icon size={20} style={{ color: stat.accent }} aria-hidden="true" />
                  </span>
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: stat.accent }} />
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] mb-1 leading-none tracking-tight">
                    <CountUpNumber end={stat.value} suffix={stat.suffix} />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
                    {stat.subtext}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
