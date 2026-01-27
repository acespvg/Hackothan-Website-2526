"use client";

/* ====================================================================
   Hero Section Component - Aggressive Fire & Flames Inspired Design
   Features: GSAP animations, countdown timer, fire particles, ember effects
   ==================================================================== */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Calendar, MapPin, Users, ChevronDown, Flame, Zap } from "lucide-react";

/* ======= Dynamic import for 3D Logo (SSR disabled) ======= */
const Logo3D = dynamic(() => import("./Logo3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
      <div className="w-24 h-24 border-4 border-(--color-fire-orange) border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

/* ======= Event Configuration - Easy to modify ======= */
const EVENT_CONFIG = {
  name: "HACKVERSE",
  tagline: "2026",
  subtitle: "IGNITE YOUR CODE. UNLEASH THE INFERNO.",
  description: "Join 500+ innovators for 36 hours of intense coding, creativity, and collaboration. Transform your ideas into blazing reality at PVG's COET's flagship hackathon.",
  date: new Date("2026-03-15T09:00:00"),
  venue: "PVG's COET, Pune",
  participants: "500+",
  duration: "36 Hours",
};

/* ======= Countdown Timer Component ======= */
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = EVENT_CONFIG.date.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HRS" },
    { value: timeLeft.minutes, label: "MIN" },
    { value: timeLeft.seconds, label: "SEC" },
  ];

  return (
    <div className="flex gap-3 md:gap-4">
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="flex flex-col items-center"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="fire-glass rounded-lg p-3 md:p-4 min-w-14 md:min-w-18 text-center fire-glow-box relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent" />
            <span className="text-2xl md:text-3xl font-black fire-gradient-text relative z-10">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] md:text-xs text-orange-400/80 mt-2 font-bold tracking-widest">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ======= Fire Ember Particles ======= */
function FireEmbers() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rising Embers */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`ember-${i}`}
          className="absolute rounded-full ember-particle"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            bottom: `-10%`,
            background: `radial-gradient(circle, ${
              Math.random() > 0.5 ? '#ff6b35' : Math.random() > 0.5 ? '#ffa500' : '#ff4500'
            } 0%, transparent 70%)`,
            animation: `emberRise ${4 + Math.random() * 6}s ease-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
      {/* Floating Sparks */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`spark-${i}`}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `sparkle ${1 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            boxShadow: '0 0 6px 2px rgba(255, 165, 0, 0.8)',
          }}
        />
      ))}
    </div>
  );
}

/* ======= Flame Wave Animation ======= */
function FlameWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none opacity-30">
      <div className="absolute bottom-0 left-0 right-0 h-full flame-wave" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-0 left-0 right-0 h-full flame-wave" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-0 left-0 right-0 h-full flame-wave" style={{ animationDelay: '1s' }} />
    </div>
  );
}

/* ======= Main Hero Section Component ======= */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  /* ======= GSAP Entrance Animations ======= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Animate content from left
      tl.fromTo(
        titleRef.current,
        { x: -150, opacity: 0, skewX: 10 },
        { x: 0, opacity: 1, skewX: 0, duration: 1.4 }
      )
        .fromTo(
          subtitleRef.current,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          ctaRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          logoRef.current,
          { x: 100, opacity: 0, scale: 0.8 },
          { x: 0, opacity: 1, scale: 1, duration: 1.2 },
          "-=1.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ======= Smooth Scroll Handler ======= */
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden hero-fire-bg"
    >
      {/* ======= Dark Gradient Overlay ======= */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-red-950/40" />
      
      {/* ======= Aggressive Diagonal Lines ======= */}
      <div className="absolute inset-0 aggressive-lines opacity-10" />
      
      {/* ======= Fire Embers ======= */}
      <FireEmbers />

      {/* ======= Bottom Flame Waves ======= */}
      <FlameWaves />

      {/* ======= Main Content Container - Two Column Layout ======= */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[80vh]">
          
          {/* ======= Left Column - Text Content ======= */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            
            {/* ======= Event Title ======= */}
            <div ref={titleRef}>
              {/* Fire Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 mb-6">
                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                <span className="text-sm font-bold text-orange-400 tracking-wider uppercase">
                  {EVENT_CONFIG.duration} of Intense Coding
                </span>
                <Zap className="w-4 h-4 text-yellow-500" />
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-2 leading-none">
                <span className="fire-gradient-text drop-shadow-[0_0_30px_rgba(255,100,0,0.5)]">
                  {EVENT_CONFIG.name}
                </span>
              </h1>
              <div className="flex items-center gap-4 justify-center lg:justify-start mb-6">
                <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full" />
                <span className="text-4xl md:text-6xl font-black text-orange-500 tracking-tight">
                  {EVENT_CONFIG.tagline}
                </span>
                <div className="h-1 w-16 md:w-24 bg-gradient-to-l from-orange-500 to-red-600 rounded-full" />
              </div>
            </div>

            {/* ======= Subtitle ======= */}
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl lg:text-2xl font-bold text-orange-200/90 max-w-xl mx-auto lg:mx-0 mb-8 tracking-wide"
            >
              {EVENT_CONFIG.subtitle}
            </p>

            {/* ======= Event Quick Info ======= */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-orange-500/20">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span className="text-orange-100 font-semibold">March 15-16, 2026</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-orange-500/20">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="text-orange-100 font-semibold">{EVENT_CONFIG.venue}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-orange-500/20">
                <Users className="w-5 h-5 text-yellow-500" />
                <span className="text-orange-100 font-semibold">{EVENT_CONFIG.participants} Hackers</span>
              </div>
            </div>

            {/* ======= Countdown Timer ======= */}
            <div className="mb-10">
              <p className="text-xs md:text-sm text-orange-400/80 mb-4 uppercase tracking-[0.3em] font-bold flex items-center justify-center lg:justify-start gap-2">
                <Flame className="w-4 h-4" />
                The Blaze Begins In
                <Flame className="w-4 h-4" />
              </p>
              <div className="flex justify-center lg:justify-start">
                <CountdownTimer />
              </div>
            </div>

            {/* ======= CTA Buttons ======= */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/register"
                className="fire-btn-primary group relative px-8 py-4 rounded-lg bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-[length:200%_100%] text-white font-black text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 animate-gradient"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Flame className="w-5 h-5 group-hover:animate-bounce" />
                  Register Now
                  <Flame className="w-5 h-5 group-hover:animate-bounce" style={{ animationDelay: '0.1s' }} />
                </span>
                {/* Flame particles */}
                <span className="flame-particle" style={{ left: '20%', bottom: '0', ['--x' as string]: '0.2', animationDelay: '0s' } as React.CSSProperties} />
                <span className="flame-particle" style={{ left: '40%', bottom: '0', ['--x' as string]: '0.6', animationDelay: '0.2s' } as React.CSSProperties} />
                <span className="flame-particle" style={{ left: '60%', bottom: '0', ['--x' as string]: '0.3', animationDelay: '0.4s' } as React.CSSProperties} />
                <span className="flame-particle" style={{ left: '80%', bottom: '0', ['--x' as string]: '0.8', animationDelay: '0.6s' } as React.CSSProperties} />
              </Link>
              <button
                onClick={() => scrollToSection("#about")}
                className="fire-btn-secondary px-8 py-4 rounded-lg bg-black/60 text-orange-400 font-bold text-lg uppercase tracking-wider border-2 border-orange-500/50 transition-all duration-300 hover:scale-105 hover:text-orange-300"
              >
                Explore More
              </button>
            </div>
          </div>

          {/* ======= Right Column - 3D Logo ======= */}
          <div ref={logoRef} className="order-1 lg:order-2 relative">
            {/* Glow behind 3D object */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-radial from-orange-600/30 via-red-600/10 to-transparent rounded-full blur-3xl animate-pulse" />
            </div>
            <div className="relative z-10">
              <Logo3D />
            </div>
            {/* Fire ring effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] border-2 border-orange-500/20 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />
              <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] border border-red-500/10 rounded-full animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
            </div>
          </div>
        </div>

        {/* ======= Scroll Down Indicator ======= */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection("#about")}
            className="text-orange-500/70 hover:text-orange-400 transition-colors p-2"
            aria-label="Scroll to learn more"
          >
            <ChevronDown className="w-10 h-10" />
          </button>
        </div>
      </div>

      {/* ======= Decorative Fire Glow Effects ======= */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[200px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[150px] pointer-events-none translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-yellow-600/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
