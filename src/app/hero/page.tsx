'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'motion/react';

/* ─── Floating particle dot ─── */
function Particle({ delay, duration, x, y, size }: { delay: number; duration: number; x: number; y: number; size: number }) {
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
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = end / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 20);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Typewriter ─── */
function Typewriter({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1600);
        } else {
          setCharIndex(c => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex(w => (w + 1) % words.length);
          setCharIndex(0);
        } else {
          setCharIndex(c => c - 1);
        }
      }
    }, deleting ? 55 : 90);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
      {displayed}
      <span className="animate-blink text-blue-400">|</span>
    </span>
  );
}

/* ─── Spark that flies outward from the logo ─── */
function LogoSpark({ angle, delay, radius }: { angle: number; delay: number; radius: number }) {
  const rad = (angle * Math.PI) / 180;
  const tx = Math.cos(rad) * radius;
  const ty = Math.sin(rad) * radius;
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 5,
        height: 5,
        top: '50%',
        left: '50%',
        marginTop: -2.5,
        marginLeft: -2.5,
        background: `hsl(${(angle * 1.2 + 200) % 360}, 90%, 70%)`,
        boxShadow: `0 0 8px 2px hsl(${(angle * 1.2 + 200) % 360}, 90%, 65%)`,
      }}
      animate={{
        x: [0, tx * 0.4, tx],
        y: [0, ty * 0.4, ty],
        scale: [0, 1.4, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        repeatDelay: 2.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  );
}

/* ─── Rotating energy beam arc around the logo ─── */
function EnergyBeam({ radius, duration, color, startAngle }: { radius: number; duration: number; color: string; startAngle: number }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      style={{ rotate: startAngle }}
    >
      <svg
        className="absolute"
        width={radius * 2 + 20}
        height={radius * 2 + 20}
        viewBox={`0 0 ${radius * 2 + 20} ${radius * 2 + 20}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id={`beam-blur-${radius}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
          </filter>
        </defs>
        {/* Main arc */}
        <path
          d={`M ${radius + 10} 10 A ${radius} ${radius} 0 0 1 ${radius * 2 + 10} ${radius + 10}`}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Blurred glow clone */}
        <path
          d={`M ${radius + 10} 10 A ${radius} ${radius} 0 0 1 ${radius * 2 + 10} ${radius + 10}`}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.3"
          filter={`url(#beam-blur-${radius})`}
        />
        {/* Bright tip dot */}
        <circle cx={radius + 10} cy={10} r={4} fill={color} opacity="0.9" />
        <circle cx={radius + 10} cy={10} r={8} fill={color} opacity="0.2" filter={`url(#beam-blur-${radius})`} />
      </svg>
    </motion.div>
  );
}

/* ─── Pulsing color-cycling glow corona ─── */
function GlowCorona() {
  const hue = useMotionValue(220);
  const color = useTransform(hue, (h) => `hsla(${h}, 90%, 60%, 0.55)`);
  const outerColor = useTransform(hue, (h) => `hsla(${h}, 80%, 55%, 0.20)`);

  useAnimationFrame((t) => {
    hue.set(220 + Math.sin(t / 2000) * 40); // cycles between blue-indigo and cyan
  });

  return (
    <>
      {/* Inner tight corona */}
      <motion.div
        className="absolute inset-[-8px] rounded-full pointer-events-none"
        style={{ boxShadow: color }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Mid bloom */}
      <motion.div
        className="absolute inset-[-24px] rounded-full pointer-events-none blur-xl"
        style={{ background: outerColor }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      {/* Outer far bloom */}
      <motion.div
        className="absolute inset-[-56px] rounded-full pointer-events-none blur-3xl"
        style={{ background: outerColor }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
    </>
  );
}

/* ─── Logo floating animation wrapper ─── */
function LogoFloat({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, -14, 0], rotate: [-0.5, 0.5, -0.5] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
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

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-28px) scale(1.15); opacity: 0.7; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes orb-pulse {
          0%, 100% { transform: scale(1); opacity: 0.18; }
          50% { transform: scale(1.12); opacity: 0.28; }
        }
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes badge-pop {
          from { opacity: 0; transform: scale(0.75); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ring-spin-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes image-glow {
          0%, 100% { filter: drop-shadow(0 0 40px rgba(59,130,246,0.35)); }
          50%       { filter: drop-shadow(0 0 70px rgba(99,102,241,0.55)); }
        }
        @keyframes countdown-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(99,102,241,0); }
        }

        .animate-float      { animation: float linear infinite; }
        .animate-blink      { animation: blink 1s step-end infinite; }
        .animate-orb-pulse  { animation: orb-pulse 6s ease-in-out infinite; }
        .animate-grid-move  { animation: grid-move 8s linear infinite; }
        .animate-ring-spin  { animation: ring-spin 12s linear infinite; }
        .animate-ring-rev   { animation: ring-spin-rev 18s linear infinite; }
        .animate-image-glow { animation: image-glow 4s ease-in-out infinite; }
        .animate-shimmer    { animation: shimmer 2.5s linear infinite; }
        .animate-countdown-pulse { animation: countdown-pulse 2s ease-in-out infinite; }

        .slide-up   { animation: slide-up 0.75s cubic-bezier(.22,1,.36,1) both; }
        .slide-right { animation: slide-right 0.85s cubic-bezier(.22,1,.36,1) both; }
        .badge-pop  { animation: badge-pop 0.5s cubic-bezier(.34,1.56,.64,1) both; }

        .shimmer-text {
          background: linear-gradient(90deg,
            #93c5fd 0%, #6366f1 30%, #c4b5fd 50%, #6366f1 70%, #93c5fd 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 2.2s linear infinite;
        }

        /* ── FIX 1: Mobile — logo first, then text content below ── */
        @media (max-width: 1023px) {
          .hero-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .hero-logo-col {
            order: -1;
          }
          .hero-text-col {
            order: 1;
          }
        }
      `}</style>

      <section className="relative min-h-screen bg-gradient-to-br from-[#060c1a] via-[#0a1228] to-[#07091a] overflow-hidden flex items-center">

        {/* ─── Animated grid background ─── */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* ─── Big radial orbs ─── */}
        <div className="absolute top-[-180px] right-[-180px] w-[640px] h-[640px] bg-blue-600/20 rounded-full blur-[200px] animate-orb-pulse" />
        <div className="absolute bottom-[-200px] left-[-180px] w-[540px] h-[540px] bg-indigo-600/20 rounded-full blur-[180px] animate-orb-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/6 rounded-full blur-[220px]" />

        {/* ─── Floating particles ─── */}
        {PARTICLES.map(p => (
          <Particle key={p.id} x={p.x} y={p.y} size={p.size} delay={p.delay} duration={p.duration} />
        ))}

        {/* ─── Horizontal line accents ─── */}
        <div className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="absolute bottom-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />

        {/* ─── Main content ─── */}
        {/*
          FIX 2: Added top padding so content clears the navbar.
          - pt-28 on mobile (taller effective navbar area on small screens)
          - sm:pt-32 on small breakpoint
          - lg:pt-24 on desktop (less needed since content is vertically centered and taller)
          pb-20 retained from original py-20 (which applied to both top & bottom).
        */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-28 sm:pt-32 lg:pt-24 pb-20">

          {/* hero-grid: flex-column on mobile (logo first via order), lg:grid on desktop */}
          <div className="hero-grid grid lg:grid-cols-2 gap-16 items-center">

            {/* ══ LEFT CONTENT — hero-text-col: order:1 on mobile so it appears below the logo ══ */}
            <div className="hero-text-col space-y-8">

              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm badge-pop ${mounted ? '' : 'opacity-0'}`}
                style={{ animationDelay: '0.1s' }}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-medium text-indigo-300 tracking-widest uppercase">Registration Open</span>
              </div>

              {/* Title */}
              <div
                className={`slide-up ${mounted ? '' : 'opacity-0'}`}
                style={{ animationDelay: '0.2s' }}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tighter text-white" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                  Ignition
                  <br />
                  <span className="shimmer-text animate-shimmer">HackVerse</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    2026
                  </span>
                </h1>
              </div>

              {/* Typewriter subheading */}
              <div
                className={`text-xl sm:text-2xl font-semibold text-gray-200 slide-up ${mounted ? '' : 'opacity-0'}`}
                style={{ animationDelay: '0.35s' }}
              >
                Where developers{' '}
                <Typewriter words={['build the future.', 'ignite ideas.', 'ship in 24hrs.', 'change the world.']} />
              </div>

              {/* Description */}
              <p
                className={`text-base sm:text-lg text-gray-400 max-w-md leading-relaxed slide-up ${mounted ? '' : 'opacity-0'}`}
                style={{ animationDelay: '0.5s' }}
              >
                A 24-hour coding marathon where ideas ignite, innovation thrives,
                and developers collaborate to build solutions that matter.
              </p>

              {/* Stats row */}
              <div
                className={`flex gap-8 slide-up ${mounted ? '' : 'opacity-0'}`}
                style={{ animationDelay: '0.6s' }}
              >
                {[
                  { value: 500, suffix: '+', label: 'Hackers' },
                  { value: 50, suffix: 'k+', label: 'Prize Pool' },
                  { value: 24, suffix: 'h', label: 'Hackathon' },
                ].map(({ value, suffix, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-extrabold text-white">
                      <Counter end={value} suffix={suffix} />
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-4 pt-2 slide-up ${mounted ? '' : 'opacity-0'}`}
                style={{ animationDelay: '0.75s' }}
              >
                <button className="btn-primary group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-base shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_50px_rgba(99,102,241,0.55)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    Register Now
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>

                <button className="group px-8 py-3.5 rounded-xl border border-white/15 backdrop-blur-md bg-white/5 text-white font-bold text-base hover:bg-white/10 hover:border-white/30 hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                  View Prizes
                </button>
              </div>
            </div>

            {/* ══ RIGHT — MOTION-ENHANCED LOGO — hero-logo-col: order:-1 on mobile so it appears first ══ */}
            <motion.div
              className="hero-logo-col relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full max-w-[500px]">

                {/* ── Energy beam arcs (Framer Motion) ── */}
                <EnergyBeam radius={280} duration={7}  color="rgba(99,102,241,0.75)"  startAngle={0}   />
                <EnergyBeam radius={300} duration={11} color="rgba(56,189,248,0.60)"  startAngle={120} />
                <EnergyBeam radius={260} duration={9}  color="rgba(167,139,250,0.65)" startAngle={240} />

                {/* ── CSS spinning rings (kept for layered depth) ── */}
                <div className="absolute inset-[-32px] rounded-full border border-indigo-500/15 animate-ring-spin" />
                <div className="absolute inset-[-64px] rounded-full border border-blue-500/10 animate-ring-rev" />
                <div
                  className="absolute inset-[-20px] rounded-full animate-ring-spin"
                  style={{ border: '1px dashed rgba(99,102,241,0.18)', animationDuration: '24s' }}
                />

                {/* ── Orbit dots (motion) ── */}
                {[
                  { deg: 0,   color: '#60a5fa', size: 10 },
                  { deg: 90,  color: '#818cf8', size: 7  },
                  { deg: 180, color: '#34d399', size: 10 },
                  { deg: 270, color: '#a78bfa', size: 7  },
                ].map(({ deg, color, size }, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: size,
                      height: size,
                      top: '50%',
                      left: '50%',
                      marginTop: -(size / 2),
                      marginLeft: -(size / 2),
                      background: color,
                      boxShadow: `0 0 14px 4px ${color}`,
                      translateX: Math.cos((deg * Math.PI) / 180) * 260,
                      translateY: Math.sin((deg * Math.PI) / 180) * 260,
                    }}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
                      scale:  { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 },
                      opacity:{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 },
                    }}
                  />
                ))}

                {/* ── Sparks flying outward ── */}
                {SPARK_ANGLES.map((s, i) => (
                  <LogoSpark key={i} angle={s.angle} delay={s.delay} radius={s.radius} />
                ))}

                {/* ── Color-cycling glow corona (Framer Motion) ── */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <GlowCorona />
                  </div>
                </div>

                {/* ── Logo with float ── */}
                <div className="relative z-10">
                  <LogoFloat>
                    <div className="relative">
                      <Image
                        src="/IgnitionHeroSection-removebg-preview.png"
                        alt="Ignition HackVerse 2026 Logo"
                        width={600}
                        height={700}
                        priority
                        className="w-full h-auto"
                      />
                    </div>
                  </LogoFloat>
                </div>

                {/* ── Floating info badge — top right (motion) ── */}
                <motion.div
                  className="absolute top-4 right-[-16px] z-20 px-3 py-2 rounded-xl bg-[#0e1630]/80 border border-indigo-500/30 backdrop-blur-md shadow-xl"
                  initial={{ opacity: 0, scale: 0.75, x: 12 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.5, type: 'spring', bounce: 0.45 }}
                  whileHover={{ scale: 1.06, boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏆</span>
                    <div>
                      <div className="text-xs text-gray-400">Prize Pool</div>
                      <div className="text-sm font-bold text-white">$50,000+</div>
                    </div>
                  </div>
                </motion.div>

                {/* ── Floating info badge — bottom left (motion) ── */}
                <motion.div
                  className="absolute bottom-8 left-[-16px] z-20 px-3 py-2 rounded-xl bg-[#0e1630]/80 border border-blue-500/30 backdrop-blur-md shadow-xl"
                  initial={{ opacity: 0, scale: 0.75, x: -12 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5, type: 'spring', bounce: 0.45 }}
                  whileHover={{ scale: 1.06, boxShadow: '0 0 20px rgba(59,130,246,0.4)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    <div>
                      <div className="text-xs text-gray-400">Duration</div>
                      <div className="text-sm font-bold text-white">24 Hours</div>
                    </div>
                  </div>
                </motion.div>

                {/* ── Live badge (motion) ── */}
                <motion.div
                  className="absolute top-[-8px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40"
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.5, type: 'spring', bounce: 0.5 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-xs font-bold text-red-300 uppercase tracking-widest">Live Soon</span>
                </motion.div>

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