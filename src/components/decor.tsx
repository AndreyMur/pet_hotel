import React, { useCallback, useEffect, useRef, useState } from "react";

/* ================= hooks ================= */

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, shown };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  dir,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  dir?: "left" | "right" | "zoom";
  as?: any;
}) {
  const { ref, shown } = useInView<HTMLDivElement>(0.12);
  return (
    <Tag
      ref={ref}
      className={`reveal-base ${dir === "left" ? "rv-left" : dir === "right" ? "rv-right" : dir === "zoom" ? "rv-zoom" : ""} ${
        shown ? "is-shown" : ""
      } ${className}`}
      style={{ ["--rv-delay" as any]: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}

export function useCountUp(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduced]);
  return val;
}

export function useTilt3D(max = 10) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el || reduced) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add("tilting");
      el.style.transform = `perspective(1100px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale(1.02)`;
    },
    [max, reduced]
  );
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("tilting");
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);
  return { ref, onMove, onLeave };
}

export function TiltCard({
  children,
  className = "",
  max = 9,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const { ref, onMove, onLeave } = useTilt3D(max);
  return (
    <div className={`persp ${className}`}>
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="tilt-3d h-full">
        {children}
      </div>
    </div>
  );
}

/* ================= icons (hand-drawn SVG) ================= */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const PawIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <ellipse cx="6" cy="9" rx="2.1" ry="2.6" />
    <ellipse cx="18" cy="9" rx="2.1" ry="2.6" />
    <ellipse cx="9.2" cy="5.4" rx="2" ry="2.6" />
    <ellipse cx="14.8" cy="5.4" rx="2" ry="2.6" />
    <path d="M12 10.5c-3.1 0-5.8 2.6-5.8 5.3 0 1.9 1.4 3.2 3.2 3.2 1 0 1.8-.5 2.6-.5s1.6.5 2.6.5c1.8 0 3.2-1.3 3.2-3.2 0-2.7-2.7-5.3-5.8-5.3z" />
  </svg>
);

export const BoneIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M8.6 10.2 13.8 15.4M7 8.6a2.3 2.3 0 1 1-3.2-3.2A2.3 2.3 0 1 1 7 2.2c.4.9.3 1.9-.2 2.7l.4.4c.8-.5 1.8-.6 2.7-.2a2.3 2.3 0 1 1-3.2 3.2M17 15.4a2.3 2.3 0 1 0 3.2 3.2 2.3 2.3 0 1 0-3.2 3.2c-.4-.9-.3-1.9.2-2.7l-.4-.4c-.8.5-1.8.6-2.7.2a2.3 2.3 0 1 0 3.2-3.2" transform="translate(1 1)" />
  </svg>
);

export const ScissorsIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <circle cx="6" cy="6" r="2.6" />
    <circle cx="6" cy="18" r="2.6" />
    <path d="M8.2 7.4 20 19M8.2 16.6 20 5M13.3 12.7l.9.9" />
  </svg>
);

export const StethoIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M5 3v5a5 5 0 0 0 10 0V3M5 3H3.8M15 3h1.2M10 13v3.5a4.5 4.5 0 0 0 9 0V14" />
    <circle cx="19" cy="11.5" r="2.5" />
    <path d="M19 10.6v1l.7.5" strokeWidth="1.6" />
  </svg>
);

export const CameraIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <rect x="2.5" y="6" width="19" height="13" rx="3" />
    <circle cx="12" cy="12.5" r="3.6" />
    <path d="M8.5 6 10 3.5h4L15.5 6M17.8 9.3h.01" strokeWidth="2.4" />
  </svg>
);

export const CarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M3 13.5 4.6 8a2 2 0 0 1 1.9-1.5h9a2 2 0 0 1 1.9 1.4L19 13.5M3 13.5h18v4.5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-.8H6.5v.8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zM6.8 16.5h.01M17.2 16.5h.01" />
    <path d="M7 10.5h6" />
  </svg>
);

export const BowlIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M3.5 12h17c0 3.2-2 5.8-5 6.8l.3 1.2H8.2l.3-1.2c-3-1-5-3.6-5-6.8z" />
    <path d="M7 9.5c1-1.6 2.4-2 3.6-1.6M12 7.5c.4-1.4 1.8-2.3 3.4-1.9" />
    <circle cx="16.6" cy="8.6" r="0.4" fill="currentColor" />
  </svg>
);

export const StarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 16.9 6.3 20l1.2-6.3L2.8 9.3l6.4-.8z" />
  </svg>
);

export const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={2.6}>
    <path d="M4.5 12.8 9.5 18 19.5 6.5" />
  </svg>
);

export const PhoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M5 3.8h3.2l1.6 4-2 1.5a12.8 12.8 0 0 0 6.9 6.9l1.5-2 4 1.6V19a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3 6 2 2 0 0 1 5 3.8z" />
  </svg>
);

export const PinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M12 21.5s7-6.6 7-11.5a7 7 0 1 0-14 0c0 4.9 7 11.5 7 11.5z" />
    <circle cx="12" cy="9.8" r="2.6" />
  </svg>
);

export const ClockIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.4 2" />
  </svg>
);

export const ArrowIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={2.4}>
    <path d="M4 12h15M13.5 5.5 20 12l-6.5 6.5" />
  </svg>
);

export const ChevronIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={2.4}>
    <path d="M5 9l7 7 7-7" />
  </svg>
);

export const SERVICE_ICONS: Record<string, (p: { className?: string }) => JSX.Element> = {
  paw: PawIcon,
  bowl: BowlIcon,
  scissors: ScissorsIcon,
  stetho: StethoIcon,
  camera: CameraIcon,
  car: CarIcon,
};

/* ================= decorative pieces ================= */

export function RotatingBadge({
  text = "МЫ ЛЮБИМ ХВОСТАТЫХ • С 2012 ГОДА • ",
  className = "w-32 h-32",
  inner,
}: {
  text?: string;
  className?: string;
  inner?: React.ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full anim-spin-slow">
        <defs>
          <path id="badge-circle" d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
        </defs>
        <text className="font-display" fontSize="10.5" letterSpacing="2.5" fill="currentColor">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {inner ?? <PawIcon className="w-9 h-9" />}
      </div>
    </div>
  );
}

export function FloatingPaws({ count = 6, color = "text-pine" }: { count?: number; color?: string }) {
  const spots = [
    { t: "8%", l: "4%", s: "w-10 h-10", r: "-18deg", d: "0s", o: 0.14 },
    { t: "70%", l: "7%", s: "w-6 h-6", r: "24deg", d: "1.2s", o: 0.12 },
    { t: "18%", l: "88%", s: "w-8 h-8", r: "12deg", d: "0.6s", o: 0.14 },
    { t: "62%", l: "93%", s: "w-12 h-12", r: "-8deg", d: "1.8s", o: 0.1 },
    { t: "85%", l: "40%", s: "w-7 h-7", r: "30deg", d: "2.4s", o: 0.12 },
    { t: "40%", l: "48%", s: "w-5 h-5", r: "-30deg", d: "3s", o: 0.1 },
    { t: "5%", l: "55%", s: "w-6 h-6", r: "8deg", d: "1.5s", o: 0.12 },
    { t: "48%", l: "15%", s: "w-9 h-9", r: "40deg", d: "0.9s", o: 0.08 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {spots.slice(0, count).map((p, i) => (
        <div
          key={i}
          className={`absolute anim-floaty-x ${p.s} ${color}`}
          style={{ top: p.t, left: p.l, opacity: p.o, animationDelay: p.d, ["--fl-rot" as any]: p.r }}
        >
          <PawIcon className="w-full h-full" />
        </div>
      ))}
    </div>
  );
}

export function SquiggleUnderline({ className = "text-tangerine" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 14" className={`w-full h-3 ${className}`} preserveAspectRatio="none" aria-hidden>
      <path d="M3 10 C 30 2, 55 2, 78 8 S 130 14, 155 7 S 205 3, 217 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="dash-path" />
    </svg>
  );
}
