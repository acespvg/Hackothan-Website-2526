'use client';

import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faRocket,
  faUtensils,
  faMugHot,
  faChalkboardUser,
  faScrewdriverWrench,
  faClipboardCheck,
  faBullhorn,
  faCertificate,
  faTrophy
} from "@fortawesome/free-solid-svg-icons";

const timelineEvents = [
  { date: "March 22, 2025", time: "8:30 AM", title: "Team Reporting", description: "Team check-in and setting up workstations", icon: faUsers, tag: "Day 1" },
  { date: "March 22, 2025", time: "10:00 AM", title: "Hackathon Begins", description: "Inauguration & 24-hour Hackathon starts",icon: faRocket,  tag: "Day 1" },
  { date: "March 22, 2025", time: "12:00 PM", title: "Lunch Break", description: "Lunch will be provided",icon: faUtensils,  tag: "Day 1" },
  { date: "March 22, 2025", time: "2:30 PM", title: "Mentor Talk", description: "Get guidance from industry experts",icon: faChalkboardUser,  tag: "Day 1" },
  { date: "March 22, 2025", time: "4:00 PM", title: "Tea Break", description: "A short break for relaxation",icon: faMugHot,  tag: "Day 1" },
  { date: "March 22, 2025", time: "7:00 PM", title: "Dinner & Recreational Activities", description: "Have a networking dinner",icon: faUtensils, tag: "Day 1" },
  { date: "March 23, 2025", time: "1:00 AM", title: "Tea Break", description: "Another short break for relaxation",icon: faMugHot,  tag: "Day 2" },
  { date: "March 23, 2025", time: "8:00 AM – 10:00 AM", title: "Final Touches & Breakfast", description: "Last minute adjustments before judging round",icon: faScrewdriverWrench, tag: "Day 2" },
  { date: "March 23, 2025", time: "10:00 AM – 11:30 AM", title: "First Evaluation Round", description: "First Assessment Round of Teams",icon: faClipboardCheck, tag: "Day 2" },
  { date: "March 23, 2025", time: "11:45 AM", title: "Result Declaration – Round 1", description: "Announcement of round 1 selected teams",icon: faBullhorn,  tag: "Day 2" },
  { date: "March 23, 2025", time: "11:45 – 12:00 PM", title: "Certificate & Goodies Distribution", description: "For eliminated teams, certificates and goodies will be distributed.",icon: faCertificate,  tag: "Day 2" },
  { date: "March 23, 2025", time: "12:00 – 12:30 PM", title: "Lunch", description: "Lunch for teams selected for final round",icon: faUtensils, tag: "Day 2" },
  { date: "March 23, 2025", time: "12:30 – 2:00 PM", title: "Final Evaluation Round", description: "Participant presentations and judgment assessments.", icon: faClipboardCheck, tag: "Day 2" },
  { date: "March 23, 2025", time: "2:15 – 3:30 PM", title: "Prize Distribution", description: "Recognition and awarding of winners.", icon: faTrophy,  tag: "Day 2" },
];

// ── FIX 1: No explicit return type annotation — TypeScript infers it safely.
// ── FIX 2: Return `as const` so destructuring gives a typed [Ref, boolean] tuple
//           instead of the wider (Ref | boolean)[] union type.
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    // ── FIX 3: Guard with `ref.current` before observing (already present, kept)
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function TimelineItem({ event, index }: { event: typeof timelineEvents[0]; index: number }) {
  const isLeft = index % 2 === 0;
  const [ref, inView] = useInView();
  const isDay2Start = event.tag === "Day 2" && (index === 0 || timelineEvents[index - 1].tag !== "Day 2");

  return (
    <>
      {isDay2Start && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10,
          margin: '48px 0 32px',
          gap: '16px',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.4))' }} />
          <div className="day-divider-pill" style={{
            padding: '6px 20px',
            borderRadius: '999px',
            background: '#0b1220',
            border: '1px solid rgba(56,189,248,0.4)',
            color: '#38bdf8',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase' as const,
            fontFamily: "'Trebuchet MS', sans-serif",
            whiteSpace: 'nowrap' as const,
          }}>March 23 · Day 2</div>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(56,189,248,0.4))' }} />
        </div>
      )}

      <div
        ref={ref}
        className="tl-item-grid"
        style={{
          // ── Same 3-column alternating grid on ALL screen sizes (mobile + desktop).
          // On mobile the center column shrinks via CSS class override below.
          display: 'grid',
          gridTemplateColumns: '1fr 60px 1fr',
          alignItems: 'start',
          marginBottom: '28px',
          opacity: inView ? 1 : 0,
          // ── Slide direction always matches card side — same on mobile and desktop
          transform: inView
            ? 'translateX(0)'
            : isLeft ? 'translateX(-40px)' : 'translateX(40px)',
          transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${index * 60}ms, transform 0.6s cubic-bezier(.22,1,.36,1) ${index * 60}ms`,
        }}
      >
        {/* Content — left or right depending on index, identical on all screen sizes */}
        <div style={{ gridColumn: isLeft ? '1' : '3', gridRow: 1, display: 'flex', justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
          <Card event={event} isLeft={isLeft} />
        </div>

        {/* Center node */}
        <div style={{
          gridColumn: 2,
          gridRow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '18px',
          position: 'relative',
          zIndex: 2,
        }}>
          <div className="tl-node-circle" style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #38bdf8)',
            border: '3px solid #060c1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            boxShadow: '0 0 0 4px rgba(99,102,241,0.25), 0 0 24px rgba(99,102,241,0.4)',
            flexShrink: 0,
            transition: 'box-shadow 0.3s',
          }}>
            { <FontAwesomeIcon icon={event.icon} style={{ color: '#fff' }} />}
          </div>
        </div>

        {/* Empty opposite side */}
        <div style={{ gridColumn: isLeft ? '3' : '1', gridRow: 1 }} />
      </div>
    </>
  );
}

function Card({ event, isLeft }: { event: typeof timelineEvents[0]; isLeft: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="tl-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        maxWidth: '340px',
        width: '100%',
        padding: '18px 22px',
        borderRadius: '16px',
        background: hovered ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.04)',
        border: hovered ? '1px solid rgba(99,102,241,0.45)' : '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: hovered
          ? '0 8px 40px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(.22,1,.36,1)',
        cursor: 'default',
        textAlign: isLeft ? 'right' : 'left',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shimmer line on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: hovered
          ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(56,189,248,0.8), transparent)'
          : 'transparent',
        transition: 'background 0.3s',
      }} />

      {/* Time pill */}
      <div className="tl-time-pill" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '3px 10px', borderRadius: '999px',
        background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)',
        marginBottom: '10px',
        maxWidth: '100%',
        overflow: 'hidden',
      }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block', flexShrink: 0 }} />
        <span className="tl-card-time-text" style={{
          color: '#38bdf8', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px',
          fontFamily: "'Trebuchet MS', sans-serif",
          // ── Truncate on very narrow cards instead of overflowing
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {event.time}
        </span>
      </div>

      {/* Title */}
      <h3 className="tl-card-title" style={{
        color: '#fff', fontSize: '16px', fontWeight: 700, margin: '0 0 6px',
        fontFamily: "'Trebuchet MS', sans-serif", lineHeight: 1.3,
        background: hovered ? 'linear-gradient(90deg, #93c5fd, #a5b4fc)' : 'none',
        WebkitBackgroundClip: hovered ? 'text' : 'unset',
        WebkitTextFillColor: hovered ? 'transparent' : 'white',
        backgroundClip: hovered ? 'text' : 'unset',
        transition: 'all 0.3s',
      }}>
        {event.title}
      </h3>

      {/* Description */}
      <p className="tl-card-desc" style={{
        color: '#94a3b8', fontSize: '13px', margin: 0, lineHeight: 1.6,
        fontFamily: "'Trebuchet MS', sans-serif",
      }}>
        {event.description}
      </p>
    </div>
  );
}

export default function Timeline() {
  return (
    <>
      <style>{`
        @keyframes line-grow {
          from { height: 0; }
          to   { height: 100%; }
        }
        @keyframes title-reveal {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(99,102,241,0.5); }
          70%  { box-shadow: 0 0 0 10px rgba(99,102,241,0); }
          100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
        }
        @keyframes orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.18; }
          50%       { transform: translate(30px, -20px) scale(1.08); opacity: 0.28; }
        }
        @keyframes grid-scroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        @keyframes float-chip {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .tl-line-inner {
          animation: line-grow 1.5s cubic-bezier(.22,1,.36,1) 0.3s both;
        }
        .day-chip {
          animation: float-chip 4s ease-in-out infinite;
        }

        /* ── Mobile (≤ 700px): keep the SAME alternating left/right layout as desktop.
              Only shrink the center spine column + node circle + card text
              so both halves still fit on a narrow screen ── */
        @media (max-width: 700px) {
          /* Narrow center spine column: 60px → 32px */
          .tl-item-grid {
            grid-template-columns: 1fr 32px 1fr !important;
          }

          /* Shrink node circle to fit the tighter column */
          .tl-node-circle {
            width: 28px !important;
            height: 28px !important;
            font-size: 13px !important;
          }

          /* Cards: reduce padding and font sizes to fit half the screen width */
          .tl-card {
            padding: 10px 12px !important;
            border-radius: 12px !important;
          }
          .tl-card-time-text {
            font-size: 9px !important;
            letter-spacing: 0 !important;
          }
          .tl-card-title {
            font-size: 12px !important;
            margin-bottom: 4px !important;
          }
          .tl-card-desc {
            font-size: 10px !important;
            line-height: 1.5 !important;
          }
          .tl-time-pill {
            padding: 2px 6px !important;
            margin-bottom: 6px !important;
          }

          /* Day-divider pills: shrink text so they don't overflow */
          .day-divider-pill {
            font-size: 8px !important;
            letter-spacing: 1.5px !important;
            padding: 5px 10px !important;
          }

          /* Reduce outer section padding on small screens */
          .tl-section {
            padding: 60px 0 80px !important;
          }

          /* Tighten header bottom margin */
          .tl-header-section {
            margin-bottom: 48px !important;
          }
        }

        /* ── Extra-small screens (≤ 400px) ── */
        @media (max-width: 400px) {
          /* Further shrink center to 24px */
          .tl-item-grid {
            grid-template-columns: 1fr 24px 1fr !important;
          }
          .tl-node-circle {
            width: 20px !important;
            height: 20px !important;
            font-size: 10px !important;
            border-width: 2px !important;
          }
          .tl-card {
            padding: 8px 8px !important;
          }
          .tl-card-time-text {
            font-size: 7px !important;
          }
          .tl-card-title {
            font-size: 10px !important;
          }
          .tl-card-desc {
            font-size: 9px !important;
          }
        }
      `}</style>

      <section className="tl-section" style={{
        background: 'linear-gradient(180deg, #060c1a 0%, #0a1228 50%, #060c1a 100%)',
        position: 'relative',
        padding: '100px 0 120px',
        overflow: 'hidden',
      }}>
        {/* Background grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            animation: 'grid-scroll 10s linear infinite',
          }} />
        </div>

        {/* Orbs */}
        <div style={{ position: 'absolute', top: '-100px', right: '-150px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', borderRadius: '50%', animation: 'orb-drift 8s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-150px', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(56,189,248,0.14) 0%, transparent 70%)', borderRadius: '50%', animation: 'orb-drift 10s ease-in-out infinite reverse', pointerEvents: 'none' }} />

        {/* ── Horizontal padding reduced on mobile (0 16px) vs desktop (0 24px) via inline + CSS override */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div className="tl-header-section" style={{ textAlign: 'center', marginBottom: '72px' }}>
            <div className="day-chip" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 18px', borderRadius: '999px',
              background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.35)',
              marginBottom: '24px',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#818cf8', display: 'inline-block', animation: 'pulse-ring 2s infinite' }} />
              <span style={{ color: '#a5b4fc', fontSize: '12px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', fontFamily: "'Trebuchet MS', sans-serif" }}>24-Hour Schedule</span>
            </div>

            <h2 style={{
              fontFamily: "'Trebuchet MS', sans-serif",
              fontSize: 'clamp(36px, 6vw, 60px)',
              fontWeight: 900, letterSpacing: '-2px', lineHeight: 1, margin: '0 0 16px',
              animation: 'title-reveal 0.8s cubic-bezier(.22,1,.36,1) both',
            }}>
              <span style={{ color: '#fff' }}>Event </span>
              <span style={{ background: 'linear-gradient(90deg, #6366f1, #38bdf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Timeline</span>
            </h2>

            <p style={{
              color: '#64748b', fontSize: '16px', fontFamily: "'Trebuchet MS', sans-serif",
              maxWidth: '420px', margin: '0 auto', lineHeight: 1.7,
              animation: 'title-reveal 0.8s cubic-bezier(.22,1,.36,1) 0.15s both',
            }}>
              March 22–23, 2025 · From kickoff to prize stage — every moment mapped.
            </p>
          </div>

          {/* Day 1 label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.4))' }} />
            <div className="day-divider-pill" style={{
              padding: '6px 20px', borderRadius: '999px',
              background: '#0b1220', border: '1px solid rgba(99,102,241,0.4)',
              color: '#a5b4fc', fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
              textTransform: 'uppercase', fontFamily: "'Trebuchet MS', sans-serif",
              whiteSpace: 'nowrap',
            }}>March 22 · Day 1</div>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(99,102,241,0.4))' }} />
          </div>

          {/* Timeline items */}
          <div style={{ position: 'relative' }}>
            {/* Center spine — stays at 50% on all screen sizes, matching the center node column */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: '3px', transform: 'translateX(-50%)',
              background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden',
            }}>
              <div className="tl-line-inner" style={{
                width: '100%',
                background: 'linear-gradient(to bottom, #6366f1, #38bdf8, #a78bfa)',
                borderRadius: '2px',
              }} />
            </div>

            {timelineEvents.map((event, i) => (
              <TimelineItem key={i} event={event} index={i} />
            ))}
          </div>

          {/* Bottom accent */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)', marginTop: '40px' }} />
        </div>
      </section>
    </>
  );
}
