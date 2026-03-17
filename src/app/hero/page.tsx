"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "motion/react";
import Link from "next/link";

/* ─── Floating particle dot ─── */
function Particle({
  delay,
  duration,
  x,
  y,
  size,
}: {
  delay: number;
  duration: number;
  x: number;
  y: number;
  size: number;
}) {
  return (
    <div
      className="absolute rounded-full bg-blue-400/30 animate-float"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

/* ─── Animated counter ─── */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = end / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else setCount(Math.floor(start));
        }, 20);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Typewriter ─── */
function Typewriter({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplayed(current.slice(0, charIndex + 1));
          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), 1600);
          } else {
            setCharIndex((c) => c + 1);
          }
        } else {
          setDisplayed(current.slice(0, charIndex - 1));
          if (charIndex - 1 === 0) {
            setDeleting(false);
            setWordIndex((w) => (w + 1) % words.length);
            setCharIndex(0);
          } else {
            setCharIndex((c) => c - 1);
          }
        }
      },
      deleting ? 55 : 90,
    );
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words]);

  return (
    <>
      <span
        style={{
          display: "inline-block",
          backgroundImage: "linear-gradient(90deg, #60a5fa 0%, #818cf8 50%, #67e8f9 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          transform: "translateZ(0)",
        }}
      >
        {displayed}
      </span>
      <span
        className="animate-blink"
        style={{ color: "#60a5fa", WebkitTextFillColor: "#60a5fa" }}
      >
        |
      </span>
    </>
  );
}

/* ─── Spark that flies outward from the logo ─── */
function LogoSpark({ angle, delay, radius }: { angle: number; delay: number; radius: number }) {
  const rad = (angle * Math.PI) / 180;
  const tx = Math.cos(rad) * radius;
  const ty = Math.sin(rad) * radius;
  return (
    <motion.div
      className="absolute rounded-full logo-spark"
      style={{
        width: 5, height: 5,
        top: "50%", left: "50%",
        marginTop: -2.5, marginLeft: -2.5,
        background: `hsl(${(angle * 1.2 + 200) % 360}, 90%, 70%)`,
        boxShadow: `0 0 8px 2px hsl(${(angle * 1.2 + 200) % 360}, 90%, 65%)`,
      }}
      animate={{ x: [0, tx * 0.4, tx], y: [0, ty * 0.4, ty], scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 1.8, delay, repeat: Infinity, repeatDelay: 2.4, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/* ─── Pulsing color-cycling glow corona ─── */
function GlowCorona() {
  const hue = useMotionValue(220);
  const color = useTransform(hue, (h) => `hsla(${h}, 90%, 60%, 0.55)`);
  const outerColor = useTransform(hue, (h) => `hsla(${h}, 80%, 55%, 0.20)`);
  useAnimationFrame((t) => { hue.set(220 + Math.sin(t / 2000) * 40); });
  return (
    <>
      <motion.div className="absolute inset-[-8px] rounded-full pointer-events-none"
        style={{ boxShadow: color }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute inset-[-24px] rounded-full pointer-events-none blur-xl"
        style={{ background: outerColor }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
      <motion.div className="absolute inset-[-56px] rounded-full pointer-events-none blur-3xl"
        style={{ background: outerColor }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
    </>
  );
}

/* ─── Logo floating animation wrapper (desktop only) ─── */
function LogoFloat({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, -14, 0], rotate: [-0.5, 0.5, -0.5] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

const SPARK_ANGLES = Array.from({ length: 16 }, (_, i) => ({
  angle: i * 22.5,
  delay: i * 0.22,
  radius: 180 + Math.sin(i) * 40,
}));

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 6,
  duration: Math.random() * 6 + 6,
}));

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50%       { transform: translateY(-28px) scale(1.15); opacity: 0.7; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes orb-pulse {
          0%, 100% { transform: scale(1); opacity: 0.18; }
          50%       { transform: scale(1.12); opacity: 0.28; }
        }
        @keyframes grid-move {
          0%   { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badge-pop {
          from { opacity: 0; transform: scale(0.75); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer-move {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes ring-spin     { from { transform: rotate(0deg);    } to { transform: rotate(360deg);  } }
        @keyframes ring-spin-rev { from { transform: rotate(0deg);    } to { transform: rotate(-360deg); } }

        .animate-float     { animation: float linear infinite; }
        .animate-blink     { animation: blink 1s step-end infinite; }
        .animate-orb-pulse { animation: orb-pulse 6s ease-in-out infinite; }
        .animate-grid-move { animation: grid-move 8s linear infinite; }
        .animate-ring-spin { animation: ring-spin 12s linear infinite; }
        .animate-ring-rev  { animation: ring-spin-rev 18s linear infinite; }
        .slide-up          { animation: slide-up 0.75s cubic-bezier(.22,1,.36,1) both; }
        .badge-pop         { animation: badge-pop 0.5s cubic-bezier(.34,1.56,.64,1) both; }

        .grad-hackverse {
          display: inline-block;
          background-image: linear-gradient(
            90deg,
            #93c5fd 0%,
            #6366f1 30%,
            #c4b5fd 50%,
            #6366f1 70%,
            #93c5fd 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
                  background-clip: text;
          -webkit-text-fill-color: transparent;
                  color: transparent;
          transform: translateZ(0);
          will-change: background-position;
          animation: shimmer-move 2.5s linear infinite;
        }

        .grad-2026 {
          display: inline-block;
          background-image: linear-gradient(90deg, #60a5fa 0%, #818cf8 100%);
          -webkit-background-clip: text;
                  background-clip: text;
          -webkit-text-fill-color: transparent;
                  color: transparent;
          transform: translateZ(0);
        }

        .btn-primary { position: relative; overflow: hidden; }
        .btn-primary::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.18) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer-move 2.2s linear infinite;
        }

        /* Mobile layout: image on top, text below */
        @media (max-width: 1023px) {
          .hero-grid { display: flex !important; flex-direction: column !important; }
          .hero-logo-col { order: -1; }
          .hero-text-col { order:  1; }
        }

        /* Mobile: strip every decoration around the image */
        @media (max-width: 1023px) {
          .ring-outer,
          .ring-mid,
          .ring-inner,
          .logo-spark,
          .orbit-dot,
          .glow-corona-wrapper { display: none !important; }
        }

        /* ─── LARGE SCREEN FIXES (>= 1920px / 2K / 4K / big TVs) ─── */

        @media (min-width: 1920px) {
          .hero-bg-grid { background-size: 80px 80px !important; }
        }
        @media (min-width: 2560px) {
          .hero-bg-grid { background-size: 120px 120px !important; }
        }
        @media (min-width: 3840px) {
          .hero-bg-grid { background-size: 180px 180px !important; }
        }

        @media (min-width: 1920px) {
          .hero-container { max-width: 1800px !important; }
        }
        @media (min-width: 2560px) {
          .hero-container { max-width: 2400px !important; }
        }
        @media (min-width: 3840px) {
          .hero-container { max-width: 3400px !important; }
        }

        @media (min-width: 1920px) {
          .hero-title { font-size: clamp(5rem, 7vw, 10rem) !important; }
          .hero-subtitle { font-size: clamp(1.5rem, 2vw, 3rem) !important; }
          .hero-desc { font-size: clamp(1.25rem, 1.5vw, 2.2rem) !important; max-width: 640px !important; }
          .hero-stat-val { font-size: clamp(2rem, 2.5vw, 3.5rem) !important; }
          .hero-stat-label { font-size: clamp(0.75rem, 0.9vw, 1.2rem) !important; }
          .hero-badge { font-size: clamp(0.75rem, 0.9vw, 1.1rem) !important; padding: 0.75rem 1.5rem !important; }
          .hero-cta { padding: 1.25rem 2.5rem !important; font-size: clamp(1rem, 1.2vw, 1.5rem) !important; }
          .hero-logo-wrapper { max-width: min(700px, 45vw) !important; }
        }

        @media (min-width: 2560px) {
          .hero-title { font-size: clamp(7rem, 8vw, 13rem) !important; }
          .hero-subtitle { font-size: clamp(2rem, 2.5vw, 4rem) !important; }
          .hero-desc { font-size: clamp(1.5rem, 1.8vw, 2.8rem) !important; max-width: 900px !important; }
          .hero-stat-val { font-size: clamp(2.5rem, 3vw, 5rem) !important; }
          .hero-stat-label { font-size: clamp(0.9rem, 1vw, 1.5rem) !important; letter-spacing: 0.2em !important; }
          .hero-badge { font-size: clamp(0.9rem, 1vw, 1.4rem) !important; padding: 1rem 2rem !important; }
          .hero-cta { padding: 1.5rem 3.5rem !important; font-size: clamp(1.2rem, 1.5vw, 2rem) !important; border-radius: 1.25rem !important; }
          .hero-logo-wrapper { max-width: min(900px, 42vw) !important; }
        }

        @media (min-width: 3840px) {
          .hero-title { font-size: clamp(10rem, 10vw, 18rem) !important; }
          .hero-subtitle { font-size: clamp(3rem, 3.5vw, 6rem) !important; }
          .hero-desc { font-size: clamp(2rem, 2.2vw, 4rem) !important; max-width: 1400px !important; }
          .hero-stat-val { font-size: clamp(3.5rem, 4vw, 7rem) !important; }
          .hero-stat-label { font-size: clamp(1.2rem, 1.3vw, 2.2rem) !important; letter-spacing: 0.25em !important; }
          .hero-badge { font-size: clamp(1.2rem, 1.4vw, 2rem) !important; padding: 1.5rem 3rem !important; border-radius: 9999px !important; }
          .hero-cta { padding: 2rem 5rem !important; font-size: clamp(1.6rem, 2vw, 3rem) !important; border-radius: 1.5rem !important; }
          .hero-logo-wrapper { max-width: min(1300px, 40vw) !important; }
          .hero-stats-gap { gap: 5rem !important; }
        }

        @media (min-width: 1920px) {
          .orb-top-right  { width: 900px !important; height: 900px !important; }
          .orb-bottom-left { width: 800px !important; height: 800px !important; }
        }
        @media (min-width: 2560px) {
          .orb-top-right  { width: 1200px !important; height: 1200px !important; }
          .orb-bottom-left { width: 1100px !important; height: 1100px !important; }
        }
        @media (min-width: 3840px) {
          .orb-top-right  { width: 2000px !important; height: 2000px !important; top: -400px !important; right: -400px !important; }
          .orb-bottom-left { width: 1800px !important; height: 1800px !important; bottom: -500px !important; left: -400px !important; }
        }

        @media (min-width: 2560px) {
          .animate-float { min-width: 8px !important; min-height: 8px !important; }
        }
        @media (min-width: 3840px) {
          .animate-float { min-width: 14px !important; min-height: 14px !important; }
        }

        @media (min-width: 1920px) {
          .hero-grid { gap: 8rem !important; }
        }
        @media (min-width: 2560px) {
          .hero-grid { gap: 12rem !important; }
        }
        @media (min-width: 3840px) {
          .hero-grid { gap: 18rem !important; }
        }
      `}</style>

      <section className="relative min-h-screen bg-gradient-to-br from-[#060c1a] via-[#0a1228] to-[#07091a] overflow-hidden flex items-center">

        {/* ─── Animated grid background ─── */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div
            className="absolute inset-0 animate-grid-move hero-bg-grid"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* ─── Big radial orbs ─── */}
        <div className="orb-top-right absolute top-[-180px] right-[-180px] w-[640px] h-[640px] bg-blue-600/20 rounded-full blur-[200px] animate-orb-pulse" />
        <div
          className="orb-bottom-left absolute bottom-[-200px] left-[-180px] w-[540px] h-[540px] bg-indigo-600/20 rounded-full blur-[180px] animate-orb-pulse"
          style={{ animationDelay: "3s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/[0.06] rounded-full blur-[220px]" />

        {/* ─── Floating particles ─── */}
        {PARTICLES.map((p) => (
          <Particle key={p.id} x={p.x} y={p.y} size={p.size} delay={p.delay} duration={p.duration} />
        ))}

        {/* ─── Horizontal line accents ─── */}
        <div className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="absolute bottom-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />

        {/* ─── Main content ─── */}
        <div className="hero-container relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 sm:pt-32 lg:pt-24 pb-20">
          <div className="hero-grid grid lg:grid-cols-2 gap-16 items-center">

            {/* ══ LEFT CONTENT ══ */}
            <div className="hero-text-col space-y-8">

              {/* Badge */}
              <div
                className={`hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm badge-pop ${mounted ? "" : "opacity-0"}`}
                style={{ animationDelay: "0.1s" }}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span
                  className="text-sm font-medium tracking-widest uppercase hero-badge"
                  style={{ color: "#a5b4fc", WebkitTextFillColor: "#a5b4fc" }}
                >
                  Registration Open
                </span>
              </div>

              {/* Title */}
              <div className={`slide-up ${mounted ? "" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
                <h1
                  className="hero-title text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tighter"
                  style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                >
                  <span
                    style={{
                      display: "block",
                      color: "#ffffff",
                      WebkitTextFillColor: "#ffffff",
                    }}
                  >
                    Ignition
                  </span>
                  <span className="grad-hackverse">HackVerse</span>
                  <span style={{ display: "block" }}>
                    <span className="grad-2026">2026</span>
                  </span>
                </h1>
              </div>

              {/* Typewriter subheading */}
              <div
                className={`hero-subtitle text-xl sm:text-2xl font-semibold slide-up ${mounted ? "" : "opacity-0"}`}
                style={{ animationDelay: "0.35s" }}
              >
                <span style={{ color: "#e5e7eb", WebkitTextFillColor: "#e5e7eb" }}>
                  Where developers{" "}
                </span>
                <Typewriter
                  words={[
                    "build the future.",
                    "ignite ideas.",
                    "ship in 24hrs.",
                    "change the world.",
                  ]}
                />
              </div>

              {/* Description */}
              <p
                className={`hero-desc text-lg sm:text-2xl max-w-md leading-relaxed slide-up ${mounted ? "" : "opacity-0"}`}
                style={{
                  animationDelay: "0.5s",
                  color: "#d1d5db",
                  WebkitTextFillColor: "#d1d5db",
                }}
              >
                A 24-hour coding marathon where ideas ignite, innovation
                thrives, and developers collaborate to build solutions that
                matter.
              </p>

              {/* Stats row */}
              <div
                className={`hero-stats-gap flex gap-8 slide-up ${mounted ? "" : "opacity-0"}`}
                style={{ animationDelay: "0.6s" }}
              >
                {[
                  { value: 500, suffix: "+",   label: "Participants"    },
                  { value: 1.8, suffix: "lac",  label: "Prize Pool" },
                  { value: 24,  suffix: "h",    label: "Hackathon"  },
                ].map(({ value, suffix, label }) => (
                  <div key={label} className="text-center">
                    <div
                      className="hero-stat-val text-2xl font-extrabold"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                    >
                      <Counter end={value} suffix={suffix} />
                    </div>
                    <div
                      className="hero-stat-label text-xs uppercase tracking-widest mt-0.5"
                      style={{ color: "#22d3ee", WebkitTextFillColor: "#22d3ee" }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div
                className={`flex flex-col sm:flex-row gap-4 pt-2 slide-up ${mounted ? "" : "opacity-0"}`}
                style={{ animationDelay: "0.75s" }}
              >
                <Link
                  href="/register"
                  className="hero-cta btn-primary group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 font-bold text-base shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_50px_rgba(99,102,241,0.55)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 inline-flex"
                  style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Register Now
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
                <br />
                <p className={`hero-desc text-lg sm:text-2xl max-w-md leading-relaxed slide-up ${mounted ? "" : "opacity-0"}`}>Last date to register: <span className="font-bold">March 22, 2026</span></p>
              </div>

            </div>

            {/* ══ RIGHT — LOGO ══ */}
            <motion.div
              className="hero-logo-col relative flex flex-col items-center lg:items-end"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-logo-wrapper relative w-full" style={{ maxWidth: "min(500px, 80vw)" }}>

                {/* ── Desktop-only decorations ── */}
                {!isMobile && (
                  <>
                    {/* CSS spinning rings */}
                    <div className="ring-outer absolute inset-[-32px] rounded-full border border-indigo-500/15 animate-ring-spin" />
                    <div className="ring-mid   absolute inset-[-64px] rounded-full border border-blue-500/10 animate-ring-rev" />
                    <div
                      className="ring-inner absolute inset-[-20px] rounded-full animate-ring-spin"
                      style={{ border: "1px dashed rgba(99,102,241,0.18)", animationDuration: "24s" }}
                    />

                    {/* Orbit dots */}
                    {[
                      { deg: 0,   color: "#60a5fa", size: 10 },
                      { deg: 90,  color: "#818cf8", size: 7  },
                      { deg: 180, color: "#34d399", size: 10 },
                      { deg: 270, color: "#a78bfa", size: 7  },
                    ].map(({ deg, color, size }, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full orbit-dot"
                        style={{
                          width: size, height: size,
                          top: "50%", left: "50%",
                          marginTop: -(size / 2), marginLeft: -(size / 2),
                          background: color,
                          boxShadow: `0 0 14px 4px ${color}`,
                          translateX: Math.cos((deg * Math.PI) / 180) * 260,
                          translateY: Math.sin((deg * Math.PI) / 180) * 260,
                        }}
                        animate={{ rotate: 360, scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{
                          rotate:  { duration: 12,  repeat: Infinity, ease: "linear" },
                          scale:   { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 },
                          opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 },
                        }}
                      />
                    ))}

                    {/* Sparks */}
                    {SPARK_ANGLES.map((s, i) => (
                      <LogoSpark key={i} angle={s.angle} delay={s.delay} radius={s.radius} />
                    ))}

                    {/* Glow corona */}
                    <div className="glow-corona-wrapper absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <GlowCorona />
                      </div>
                    </div>
                  </>
                )}

                {/* Logo image — animated float on desktop, static on mobile */}
                <div className="relative z-10">
                  {isMobile ? (
                    <Image
                      src="/IgnitionHeroSection-removebg-preview.png"
                      alt="Ignition HackVerse 2026 Logo"
                      width={600}
                      height={700}
                      priority
                      className="w-full h-auto"
                    />
                  ) : (
                    <LogoFloat>
                      <Image
                        src="/IgnitionHeroSection-removebg-preview.png"
                        alt="Ignition HackVerse 2026 Logo"
                        width={600}
                        height={700}
                        priority
                        className="w-full h-auto"
                      />
                    </LogoFloat>
                  )}
                </div>

              </div>
            </motion.div>

          </div>
        </div>

        {/* ─── Bottom fade ─── */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060c1a] to-transparent" />
      </section>
    </>
  );
}