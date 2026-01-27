"use client";

/* ====================================================================
   Timeline Section Component - Modern Immersive Design
   Features: GSAP scroll animations, day-based grouping, 3D cards,
             flowing timeline, glowing effects, interactive hover states
   ==================================================================== */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  Users,
  Code,
  Coffee,
  Presentation,
  Trophy,
  Clock,
  PartyPopper,
  Utensils,
  Moon,
  Sun,
  Flame,
  Zap,
  Sparkles,
  Rocket,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/* ======= Timeline Event Interface ======= */
interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: LucideIcon;
  type: "milestone" | "activity" | "break";
}

interface DayGroup {
  day: string;
  date: string;
  events: TimelineEvent[];
}

/* ======= Timeline Events Data - Grouped by Day ======= */
const TIMELINE_DATA: DayGroup[] = [
  {
    day: "Day 1",
    date: "March 15, 2026",
    events: [
      {
        id: "day1-registration",
        time: "08:00 AM",
        title: "Registration & Check-in",
        description: "Arrive at the venue, complete registration, and collect your swag kit. Meet your fellow hackers!",
        icon: Calendar,
        type: "milestone",
      },
      {
        id: "day1-opening",
        time: "09:30 AM",
        title: "Opening Ceremony",
        description: "Welcome address by organizers, introduction to sponsors, and keynote speech by industry leaders.",
        icon: Users,
        type: "milestone",
      },
      {
        id: "day1-hacking-starts",
        time: "10:30 AM",
        title: "Hacking Begins! 🚀",
        description: "The 36-hour countdown starts! Form your teams and start building your innovative projects.",
        icon: Rocket,
        type: "milestone",
      },
      {
        id: "day1-lunch",
        time: "01:00 PM",
        title: "Lunch Break",
        description: "Refuel with delicious food. Networking time with other participants and mentors.",
        icon: Utensils,
        type: "break",
      },
      {
        id: "day1-workshop1",
        time: "03:00 PM",
        title: "Workshop: AI/ML Basics",
        description: "Learn the fundamentals of AI and Machine Learning with hands-on examples.",
        icon: Presentation,
        type: "activity",
      },
      {
        id: "day1-mentoring1",
        time: "05:00 PM",
        title: "Mentoring Session",
        description: "One-on-one guidance from industry experts. Get feedback on your project ideas.",
        icon: Users,
        type: "activity",
      },
      {
        id: "day1-dinner",
        time: "08:00 PM",
        title: "Dinner",
        description: "Evening meal with entertainment and fun activities to keep the energy high!",
        icon: Coffee,
        type: "break",
      },
      {
        id: "day1-midnight",
        time: "12:00 AM",
        title: "Midnight Snacks & Games",
        description: "Take a break with fun games, midnight snacks, and energy drinks.",
        icon: Moon,
        type: "break",
      },
    ],
  },
  {
    day: "Day 2",
    date: "March 16, 2026",
    events: [
      {
        id: "day2-breakfast",
        time: "07:00 AM",
        title: "Breakfast",
        description: "Start your day with a hearty breakfast. Keep coding strong!",
        icon: Sun,
        type: "break",
      },
      {
        id: "day2-checkpoint",
        time: "10:00 AM",
        title: "Progress Check",
        description: "Mid-hackathon checkpoint. Share your progress with mentors and get valuable feedback.",
        icon: Clock,
        type: "activity",
      },
      {
        id: "day2-workshop2",
        time: "12:00 PM",
        title: "Workshop: Cloud Deployment",
        description: "Learn how to deploy your projects to the cloud with hands-on guidance.",
        icon: Presentation,
        type: "activity",
      },
      {
        id: "day2-lunch",
        time: "02:00 PM",
        title: "Lunch Break",
        description: "Final lunch of the hackathon. Prepare for the home stretch!",
        icon: Utensils,
        type: "break",
      },
      {
        id: "day2-submission",
        time: "04:00 PM",
        title: "Submissions Close",
        description: "Final deadline for project submissions. Make sure to submit your project on time!",
        icon: Code,
        type: "milestone",
      },
      {
        id: "day2-judging",
        time: "04:30 PM",
        title: "Judging Rounds",
        description: "Present your projects to the judges. Show off what you've built in 36 hours!",
        icon: Presentation,
        type: "milestone",
      },
      {
        id: "day2-closing",
        time: "07:00 PM",
        title: "Closing Ceremony & Awards",
        description: "Winner announcements, prize distribution, and closing remarks. Celebrate your achievements!",
        icon: Trophy,
        type: "milestone",
      },
      {
        id: "day2-celebration",
        time: "08:30 PM",
        title: "Celebration & Networking",
        description: "Celebrate the end of an amazing hackathon! Connect with fellow hackers and sponsors.",
        icon: PartyPopper,
        type: "milestone",
      },
    ],
  },
];

/* ======= Floating Particles Background ======= */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              ['#f97316', '#fbbf24', '#ef4444', '#fb923c'][Math.floor(Math.random() * 4)]
            } 0%, transparent 70%)`,
            animation: `floatParticle ${8 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
}

/* ======= Glowing Line Connector ======= */
function GlowingConnector({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative h-12 md:h-16 flex items-center justify-center">
      <div 
        className={`w-0.5 h-full rounded-full transition-all duration-500 ${
          isActive 
            ? 'bg-gradient-to-b from-orange-500 via-amber-400 to-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]' 
            : 'bg-gradient-to-b from-orange-500/30 via-amber-400/20 to-orange-500/30'
        }`}
      />
      {/* Animated pulse on the line */}
      <div 
        className={`absolute w-2 h-2 rounded-full bg-orange-400 transition-opacity duration-300 ${
          isActive ? 'opacity-100 animate-pulse' : 'opacity-0'
        }`}
        style={{
          boxShadow: '0 0 10px #f97316, 0 0 20px #f97316',
        }}
      />
    </div>
  );
}

/* ======= Timeline Event Card Component ======= */
interface TimelineCardProps {
  event: TimelineEvent;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function TimelineCard({ event, index, isExpanded, onToggle }: TimelineCardProps) {
  const isLeft = index % 2 === 0;

  // Enhanced color schemes based on event type
  const typeStyles = {
    milestone: {
      gradient: "from-orange-500 via-red-500 to-rose-600",
      glow: "shadow-orange-500/40",
      border: "border-orange-500/40 hover:border-orange-400",
      bg: "from-orange-950/40 via-red-950/30 to-rose-950/40",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-600",
      badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    },
    activity: {
      gradient: "from-amber-500 via-yellow-500 to-orange-500",
      glow: "shadow-amber-500/40",
      border: "border-amber-500/40 hover:border-amber-400",
      bg: "from-amber-950/40 via-yellow-950/30 to-orange-950/40",
      iconBg: "bg-gradient-to-br from-amber-500 to-yellow-600",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
    break: {
      gradient: "from-yellow-500 via-amber-400 to-yellow-600",
      glow: "shadow-yellow-500/30",
      border: "border-yellow-500/30 hover:border-yellow-400",
      bg: "from-yellow-950/30 via-amber-950/20 to-yellow-950/30",
      iconBg: "bg-gradient-to-br from-yellow-500 to-amber-500",
      badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    },
  };

  const styles = typeStyles[event.type];

  return (
    <div
      className={`timeline-card group relative flex items-start gap-4 md:gap-6 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* ======= Content Card ======= */}
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
        <div
          onClick={onToggle}
          className={`
            relative cursor-pointer overflow-hidden
            rounded-2xl p-5 md:p-6
            bg-gradient-to-br ${styles.bg}
            border ${styles.border}
            backdrop-blur-xl
            transition-all duration-500 ease-out
            hover:scale-[1.02] hover:shadow-2xl hover:${styles.glow}
            ${isExpanded ? `scale-[1.02] shadow-2xl ${styles.glow}` : ''}
            max-w-sm ${isLeft ? "md:ml-auto" : "md:mr-auto"}
          `}
        >
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </div>

          {/* Top glow line */}
          <div className={`absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

          {/* Time Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${styles.badge} text-xs font-bold mb-3`}>
            <Flame className="w-3 h-3" />
            {event.time}
          </div>

          {/* Title */}
          <h4 className="text-lg md:text-xl font-black text-white mb-2 flex items-center gap-2 flex-wrap">
            {event.title}
            {event.type === "milestone" && (
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            )}
          </h4>

          {/* Description - Expandable */}
          <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-40' : 'max-h-12'}`}>
            <p className={`text-sm text-gray-300/80 leading-relaxed ${!isExpanded && 'line-clamp-2'}`}>
              {event.description}
            </p>
          </div>

          {/* Expand indicator */}
          <div className={`flex items-center gap-1 mt-2 text-xs text-orange-400/60 transition-all duration-300 ${isLeft ? 'md:justify-end' : ''}`}>
            <span>{isExpanded ? 'Less' : 'More'}</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>

      {/* ======= Center Icon Node ======= */}
      <div className="relative flex flex-col items-center shrink-0">
        {/* Icon Circle with glow */}
        <div
          className={`
            relative w-14 h-14 md:w-16 md:h-16 rounded-full ${styles.iconBg}
            flex items-center justify-center z-10
            shadow-lg group-hover:shadow-xl
            transition-all duration-500
            group-hover:scale-110
          `}
          style={{
            boxShadow: `0 0 20px rgba(249, 115, 22, 0.3), 0 0 40px rgba(249, 115, 22, 0.1)`,
          }}
        >
          {/* Rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20 animate-[spin_15s_linear_infinite]" />
          
          {/* Icon */}
          <event.icon className="w-6 h-6 md:w-7 md:h-7 text-white relative z-10" />
          
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-white/10 blur-sm" />
        </div>
      </div>

      {/* ======= Spacer for alternating layout ======= */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

/* ======= Day Header Component ======= */
interface DayHeaderProps {
  day: string;
  date: string;
  isFirst: boolean;
}

function DayHeader({ day, date, isFirst }: DayHeaderProps) {
  return (
    <div className={`day-header relative flex items-center justify-center ${!isFirst ? 'mt-16' : ''} mb-8`}>
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 bg-orange-500/10 rounded-full blur-[80px]" />
      </div>
      
      {/* Day badge */}
      <div className="relative">
        <div className="flex flex-col items-center gap-2">
          {/* Decorative lines */}
          <div className="flex items-center gap-4">
            <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-orange-500/50" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 to-red-500 animate-pulse" />
            <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-orange-500/50" />
          </div>
          
          {/* Day label */}
          <div className="px-8 py-4 rounded-2xl bg-gradient-to-br from-orange-950/60 via-red-950/50 to-amber-950/60 border border-orange-500/30 backdrop-blur-xl">
            <h3 className="text-2xl md:text-3xl font-black fire-gradient-text">
              {day}
            </h3>
            <p className="text-sm text-orange-300/70 text-center font-medium mt-1">
              {date}
            </p>
          </div>
          
          {/* Decorative lines */}
          <div className="flex items-center gap-4">
            <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-orange-500/50" />
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-amber-500 to-orange-500" />
            <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-orange-500/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======= Main Timeline Section Component ======= */
export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  /* ======= GSAP Scroll Animations ======= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Day headers animation
      const dayHeaders = timelineRef.current?.querySelectorAll(".day-header");
      if (dayHeaders) {
        gsap.fromTo(
          dayHeaders,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.3,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Timeline cards staggered animation with better easing
      const timelineCards = timelineRef.current?.querySelectorAll(".timeline-card");
      if (timelineCards) {
        timelineCards.forEach((card, index) => {
          const isLeft = index % 2 === 0;
          gsap.fromTo(
            card,
            { 
              x: isLeft ? -80 : 80, 
              opacity: 0,
              rotateY: isLeft ? -10 : 10,
            },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardToggle = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Calculate global index for alternating layout
  let globalIndex = 0;

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-b from-neutral-950 via-black to-neutral-950"
    >
      {/* ======= Background Elements ======= */}
      <div className="absolute inset-0">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-950/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #f97316 1px, transparent 1px),
              linear-gradient(to bottom, #f97316 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* ======= Section Title ======= */}
        <div ref={titleRef} className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-600/20 via-red-600/20 to-amber-600/20 border border-orange-500/30 text-orange-400 text-sm font-bold mb-6 backdrop-blur-sm">
            <Flame className="w-4 h-4 animate-pulse" />
            <span>36 Hours of Intense Coding</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="fire-gradient-text">Event Timeline</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Your journey through the hackathon inferno — from check-in to celebration
          </p>

          {/* Decorative element */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-12 h-1 rounded-full bg-gradient-to-r from-transparent to-orange-500" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 to-red-500 animate-pulse" />
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 animate-pulse" />
            <div className="w-12 h-1 rounded-full bg-gradient-to-l from-transparent to-orange-500" />
          </div>
        </div>

        {/* ======= Timeline Container ======= */}
        <div ref={timelineRef} className="max-w-4xl mx-auto">
          {TIMELINE_DATA.map((dayGroup, dayIndex) => (
            <div key={dayGroup.day}>
              {/* Day Header */}
              <DayHeader
                day={dayGroup.day}
                date={dayGroup.date}
                isFirst={dayIndex === 0}
              />

              {/* Events for this day */}
              <div className="space-y-2">
                {dayGroup.events.map((event, eventIndex) => {
                  const currentGlobalIndex = globalIndex++;
                  const isLastEvent = dayIndex === TIMELINE_DATA.length - 1 && 
                                      eventIndex === dayGroup.events.length - 1;
                  
                  return (
                    <div key={event.id}>
                      <TimelineCard
                        event={event}
                        index={currentGlobalIndex}
                        isExpanded={expandedCard === event.id}
                        onToggle={() => handleCardToggle(event.id)}
                      />
                      {/* Connector line */}
                      {!isLastEvent && (
                        <div className="flex justify-center">
                          <GlowingConnector isActive={expandedCard === event.id} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ======= Download Schedule CTA ======= */}
        <div className="text-center mt-20">
          <button className="group relative px-10 py-5 rounded-2xl overflow-hidden font-bold uppercase tracking-wider transition-all duration-500 hover:scale-105">
            {/* Button background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 via-red-600/30 to-amber-600/30 border-2 border-orange-500/50 rounded-2xl transition-all duration-300 group-hover:border-orange-400 group-hover:from-orange-600/40 group-hover:via-red-600/40 group-hover:to-amber-600/40" />
            
            {/* Animated glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 40px rgba(249, 115, 22, 0.4)' }} />
            
            {/* Button content */}
            <span className="relative flex items-center gap-3 text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
              <Calendar className="w-5 h-5" />
              <span>Download Full Schedule</span>
              <Flame className="w-5 h-5 group-hover:animate-pulse" />
            </span>
          </button>
        </div>
      </div>

      {/* ======= Decorative Glow Orbs ======= */}
      <div className="absolute -left-40 top-1/4 w-80 h-80 bg-orange-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -right-40 top-1/2 w-80 h-80 bg-red-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-1/4 w-60 h-60 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
    </section>
  );
}
