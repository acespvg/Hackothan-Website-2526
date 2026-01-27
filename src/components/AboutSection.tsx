"use client";

/* ====================================================================
   About Section Component - Fire & Flames Inspired Design
   Features: GSAP scroll animations, fire particles, ember effects
   ==================================================================== */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Users,
  Trophy,
  Clock,
  MapPin,
  Lightbulb,
  Rocket,
  Coffee,
  Wifi,
  Flame,
  Zap,
} from "lucide-react";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/* ======= About Content Configuration ======= */
const ABOUT_CONTENT = {
  title: "About Hackverse",
  subtitle: "Where Code Ignites Into Reality",
  description: `Hackverse 2026 is the flagship hackathon event organized by ACES (Association of Computer Engineering Students) at PVG's College of Engineering and Technology, Pune. This 36-hour innovation marathon brings together the brightest minds to solve real-world problems through technology.

Whether you're a seasoned developer or a curious beginner, Hackverse provides the perfect platform to learn, innovate, and network with like-minded individuals. Join us for an unforgettable experience of coding, creativity, and collaboration!`,
  organizer: "ACES PVG's COET",
};

/* ======= Event Statistics Data ======= */
const STATISTICS = [
  { icon: Users, value: "500+", label: "Participants" },
  { icon: Trophy, value: "₹1,00,000+", label: "Prize Pool" },
  { icon: Clock, value: "36", label: "Hours" },
  { icon: Code2, value: "50+", label: "Projects" },
];

/* ======= Event Highlights/Features ======= */
const HIGHLIGHTS = [
  {
    icon: Lightbulb,
    title: "Mentorship",
    description: "Get guidance from industry experts and experienced developers throughout the event.",
  },
  {
    icon: Rocket,
    title: "Workshops",
    description: "Participate in hands-on workshops covering the latest technologies and tools.",
  },
  {
    icon: Coffee,
    title: "Refreshments",
    description: "Stay energized with unlimited food, snacks, and beverages throughout the hackathon.",
  },
  {
    icon: Wifi,
    title: "Resources",
    description: "Access high-speed internet, power outlets, and all necessary development resources.",
  },
];

/* ======= Venue Information ======= */
const VENUE_INFO = {
  name: "PVG's College of Engineering and Technology",
  address: "44, Vidya Nagari, Shivdarshan, Parvati, Pune, Maharashtra 411009",
  facilities: ["Large Auditorium", "Dedicated Workspaces", "24/7 Power Backup", "Parking Available"],
};

/* ======= Fire Sparks Component ======= */
function FireSparks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={`spark-${i}`}
          className="absolute w-1 h-1 bg-orange-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `sparkle ${1.5 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            boxShadow: '0 0 6px 2px rgba(255, 165, 0, 0.6)',
          }}
        />
      ))}
    </div>
  );
}

/* ======= Main About Section Component ======= */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  /* ======= GSAP Scroll Animations ======= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation on scroll
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Statistics counter animation
      gsap.fromTo(
        statsRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Feature cards staggered animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-red-950/20"
    >
      {/* ======= Background Elements ======= */}
      <div className="absolute inset-0 aggressive-lines opacity-5" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      
      {/* Fire Sparks */}
      <FireSparks />

      <div className="container mx-auto px-4 relative z-10">
        {/* ======= Section Title ======= */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 text-orange-400 text-sm font-bold mb-4">
            <Flame className="w-4 h-4 animate-pulse" />
            {ABOUT_CONTENT.organizer}
            <Flame className="w-4 h-4 animate-pulse" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="fire-gradient-text">{ABOUT_CONTENT.title}</span>
          </h2>
          <p className="text-xl text-orange-200/80 font-semibold">
            {ABOUT_CONTENT.subtitle}
          </p>
        </div>

        {/* ======= Statistics Grid ======= */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16"
        >
          {STATISTICS.map((stat) => (
            <div
              key={stat.label}
              className="fire-glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 group fire-glow-box"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-orange-500 group-hover:text-yellow-400 transition-colors" />
              <div className="text-3xl md:text-4xl font-black fire-gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-orange-200/70 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ======= Main Content Grid ======= */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* ======= Description Column ======= */}
          <div className="space-y-6">
            <div className="fire-glass rounded-2xl p-8 border border-orange-500/30 fire-glow-box">
              <h3 className="text-2xl font-black mb-4 text-orange-100 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                What is Hackverse?
              </h3>
              <div className="text-orange-100/80 leading-relaxed whitespace-pre-line">
                {ABOUT_CONTENT.description}
              </div>
            </div>

            {/* ======= Venue Information Card ======= */}
            <div className="fire-glass rounded-2xl p-8 border border-orange-500/30 fire-glow-box">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-black text-orange-100">
                  Venue
                </h3>
              </div>
              <p className="text-lg font-bold text-orange-200 mb-2">
                {VENUE_INFO.name}
              </p>
              <p className="text-orange-100/70 mb-4">
                {VENUE_INFO.address}
              </p>
              <div className="flex flex-wrap gap-2">
                {VENUE_INFO.facilities.map((facility) => (
                  <span
                    key={facility}
                    className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-semibold"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ======= Highlights Column ======= */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4">
            {HIGHLIGHTS.map((highlight) => (
              <div
                key={highlight.title}
                className="fire-glass rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-orange-500/20 hover:scale-105"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:shadow-orange-500/50">
                  <highlight.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-black text-orange-100 mb-2">
                  {highlight.title}
                </h4>
                <p className="text-sm text-orange-200/70">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ======= Decorative Fire Glow Orbs ======= */}
        <div className="absolute -left-32 top-1/4 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -right-32 bottom-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      </div>
    </section>
  );
}
