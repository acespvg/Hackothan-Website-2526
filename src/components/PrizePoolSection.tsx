"use client";

/* ====================================================================
   Prize Pool Section Component - Fire & Flames Inspired Design
   Features: GSAP animations, fire effects, glowing prize cards
   ==================================================================== */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Medal, Award, Gift, Star, Sparkles, Flame, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/* ======= Prize Tier Interface ======= */
interface PrizeTier {
  id: string;
  position: string;
  title: string;
  amount: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
  perks: string[];
  featured?: boolean;
}

/* ======= Main Prize Tiers Data - Easily modifiable ======= */
const PRIZE_TIERS: PrizeTier[] = [
  {
    id: "second",
    position: "2nd",
    title: "First Runner-up",
    amount: "₹25,000",
    icon: Medal,
    color: "from-gray-300 to-gray-400",
    glowColor: "rgba(156, 163, 175, 0.4)",
    perks: ["Cash Prize", "Certificates", "Swag Kit", "LinkedIn Recommendations"],
  },
  {
    id: "first",
    position: "1st",
    title: "Grand Winner",
    amount: "₹50,000",
    icon: Trophy,
    color: "from-yellow-400 via-orange-500 to-red-500",
    glowColor: "rgba(251, 191, 36, 0.5)",
    perks: ["Cash Prize", "Internship Opportunities", "Premium Swag", "Mentorship Program", "Certificates"],
    featured: true,
  },
  {
    id: "third",
    position: "3rd",
    title: "Second Runner-up",
    amount: "₹15,000",
    icon: Award,
    color: "from-amber-600 to-amber-700",
    glowColor: "rgba(217, 119, 6, 0.4)",
    perks: ["Cash Prize", "Certificates", "Swag Kit"],
  },
];

/* ======= Special Category Prizes ======= */
const SPECIAL_PRIZES = [
  {
    id: "best-ui",
    title: "Best UI/UX Design",
    amount: "₹5,000",
    icon: Sparkles,
    description: "For the most visually appealing and user-friendly design",
  },
  {
    id: "best-innovation",
    title: "Most Innovative",
    amount: "₹5,000",
    icon: Star,
    description: "For the most creative and innovative solution",
  },
  {
    id: "best-freshman",
    title: "Best Freshman Team",
    amount: "₹5,000",
    icon: Gift,
    description: "For the best project by first-year students",
  },
];

/* ======= Fire Embers for Prizes ======= */
function PrizeEmbers() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <div
          key={`ember-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            bottom: `-10%`,
            background: `radial-gradient(circle, ${
              Math.random() > 0.5 ? '#fcd34d' : Math.random() > 0.5 ? '#f97316' : '#fbbf24'
            } 0%, transparent 70%)`,
            animation: `emberRise ${4 + Math.random() * 6}s ease-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
}

/* ======= Prize Card Component ======= */
interface PrizeCardProps {
  prize: PrizeTier;
}

function PrizeCard({ prize }: PrizeCardProps) {
  return (
    <div
      className={`prize-card relative ${
        prize.featured ? "md:-mt-8 scale-105 z-10" : ""
      }`}
    >
      {/* Featured Badge */}
      {prize.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-white text-sm font-black z-20 shadow-lg shadow-orange-500/50 flex items-center gap-1">
          <Flame className="w-4 h-4" />
          🏆 Grand Prize
          <Flame className="w-4 h-4" />
        </div>
      )}

      <div
        className={`fire-glass rounded-3xl p-8 border-2 transition-all duration-500 hover:scale-105 ${
          prize.featured
            ? "border-orange-500/70 shadow-2xl"
            : "border-orange-500/20 hover:border-orange-500/50"
        }`}
        style={{
          boxShadow: prize.featured
            ? `0 0 60px ${prize.glowColor}, 0 0 120px rgba(234, 88, 12, 0.2)`
            : `0 0 30px ${prize.glowColor}`,
        }}
      >
        {/* Position Badge */}
        <div className="text-center mb-6">
          <div
            className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${prize.color} flex items-center justify-center mb-4 shadow-lg ${prize.featured ? 'animate-fire-pulse' : ''}`}
          >
            <prize.icon className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <span className="text-4xl font-black fire-gradient-text">
            {prize.position}
          </span>
        </div>

        {/* Prize Title */}
        <h3
          className={`text-xl font-black text-center mb-2 ${
            prize.featured ? "text-orange-400" : "text-orange-100"
          }`}
        >
          {prize.title}
        </h3>

        {/* Prize Amount */}
        <div className="text-center mb-6">
          <span
            className={`text-4xl md:text-5xl font-black ${
              prize.featured ? "fire-gradient-text" : "text-orange-100"
            }`}
          >
            {prize.amount}
          </span>
        </div>

        {/* Perks List */}
        <ul className="space-y-3">
          {prize.perks.map((perk, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-orange-200/80"
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-sm shadow-orange-500/50" />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ======= Special Prize Card Component ======= */
interface SpecialPrizeCardProps {
  prize: typeof SPECIAL_PRIZES[0];
}

function SpecialPrizeCard({ prize }: SpecialPrizeCardProps) {
  return (
    <div className="special-prize-card fire-glass rounded-2xl p-6 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-105">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30">
          <prize.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-black text-orange-100 mb-1">
            {prize.title}
          </h4>
          <p className="text-2xl font-black fire-gradient-text mb-2">{prize.amount}</p>
          <p className="text-sm text-orange-200/70">
            {prize.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ======= Main Prize Pool Section Component ======= */
export default function PrizePoolSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mainPrizesRef = useRef<HTMLDivElement>(null);
  const specialPrizesRef = useRef<HTMLDivElement>(null);

  /* ======= GSAP Scroll Animations ======= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

      // Main prize cards animation
      const prizeCards = mainPrizesRef.current?.querySelectorAll(".prize-card");
      if (prizeCards) {
        gsap.fromTo(
          prizeCards,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: mainPrizesRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Special prize cards animation
      const specialCards = specialPrizesRef.current?.querySelectorAll(".special-prize-card");
      if (specialCards) {
        gsap.fromTo(
          specialCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: specialPrizesRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Calculate total prize pool
  const totalPrizePool = "₹1,00,000+";

  return (
    <section
      ref={sectionRef}
      id="prizes"
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-red-950/20"
    >
      {/* ======= Background Elements ======= */}
      <div className="absolute inset-0 aggressive-lines opacity-5" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      {/* Fire Embers */}
      <PrizeEmbers />

      {/* ======= Animated Background Glow ======= */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        {/* ======= Section Title ======= */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 text-orange-400 text-sm font-bold mb-4">
            <Trophy className="w-4 h-4" />
            Win Big, Dream Bigger
            <Flame className="w-4 h-4 animate-pulse" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="fire-gradient-text">Prize Pool</span>
          </h2>
          <p className="text-xl text-orange-200/80 mb-6 font-semibold">
            Compete for blazing prizes worth
          </p>
          <div className="text-5xl md:text-7xl font-black fire-gradient-text animate-fire-pulse inline-block drop-shadow-[0_0_30px_rgba(255,100,0,0.5)]">
            {totalPrizePool}
          </div>
        </div>

        {/* ======= Main Prize Tiers ======= */}
        <div
          ref={mainPrizesRef}
          className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16 items-end"
        >
          {PRIZE_TIERS.map((prize) => (
            <PrizeCard key={prize.id} prize={prize} />
          ))}
        </div>

        {/* ======= Special Category Prizes ======= */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-black text-orange-100 mb-2 flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Special Category Prizes
            <Zap className="w-6 h-6 text-yellow-500" />
          </h3>
          <p className="text-orange-200/70 font-semibold">
            Additional prizes for exceptional achievements
          </p>
        </div>

        <div
          ref={specialPrizesRef}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {SPECIAL_PRIZES.map((prize) => (
            <SpecialPrizeCard key={prize.id} prize={prize} />
          ))}
        </div>

        {/* ======= Sponsor Mention ======= */}
        <div className="text-center mt-16">
          <p className="text-orange-200/70 mb-4 font-semibold">
            Prizes sponsored by our amazing partners
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            {/* Placeholder for sponsor logos - easily replaceable */}
            {["Sponsor 1", "Sponsor 2", "Sponsor 3", "Sponsor 4"].map((sponsor) => (
              <div
                key={sponsor}
                className="px-6 py-3 rounded-lg fire-glass border border-orange-500/20 text-orange-200/70 font-semibold hover:border-orange-500/50 transition-all"
              >
                {sponsor}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======= Decorative Fire Glow Orbs ======= */}
      <div className="absolute -left-32 top-1/4 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-32 bottom-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
