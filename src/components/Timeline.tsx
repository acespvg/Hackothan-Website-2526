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
  faTrophy,
  faFilePowerpoint,
  faUserCheck,
  faEnvelopeOpenText,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

/* ─────────────────────────────────────────────
   Round 1 — Online / Pre-event
───────────────────────────────────────────── */
const round1Events = [
  {
    title: "Registration & Submission",
    description: "Participants register and submit their project idea along with a PPT presentation through the registration portal.",
    icon: faFilePowerpoint,
    tag: "Round 1",
  },
  {
    title: "PPT Review",
    description: "A panel of judges evaluates all submitted presentations based on innovation, feasibility, and relevance to the chosen track.",
    icon: faFilePowerpoint,
    tag: "Round 1",
  },
  {
    title: "Shortlisting of Teams",
    description: "Top teams are shortlisted from each track after a thorough evaluation of their idea, approach, and presentation quality.",
    icon: faUserCheck,
    tag: "Round 1",
  },
  {
    title: "Selection Notification",
    description: "Selected teams receive an official notification via email with instructions, venue details, and guidelines for Round 2 — the 24-hour on-site hackathon.",
    icon: faEnvelopeOpenText,
    tag: "Round 1",
  },
];

/* ─────────────────────────────────────────────
   Round 2 — On-site 24-hour Hackathon
───────────────────────────────────────────── */
const timelineEvents = [
  { date: "April 3, 2026", time: "8:30 AM",           title: "Team Reporting",                    description: "Team check-in and setting up workstations",                                        icon: faUsers,           tag: "Day 1" },
  { date: "April 3, 2026", time: "10:00 AM",           title: "Hackathon Begins",                  description: "Inauguration & 24-hour Hackathon starts",                                          icon: faRocket,          tag: "Day 1" },
  { date: "April 3, 2026", time: "12:00 PM",           title: "Lunch Break",                       description: "Lunch will be provided",                                                           icon: faUtensils,        tag: "Day 1" },
  { date: "April 3, 2026", time: "2:30 PM",            title: "Mentor Talk",                       description: "Get guidance from industry experts",                                               icon: faChalkboardUser,  tag: "Day 1" },
  { date: "April 3, 2026", time: "4:00 PM",            title: "Tea Break",                         description: "A short break for relaxation",                                                     icon: faMugHot,          tag: "Day 1" },
  { date: "April 3, 2026", time: "7:00 PM",            title: "Dinner & Recreational Activities",  description: "Have a networking dinner",                                                         icon: faUtensils,        tag: "Day 1" },
  { date: "April 4, 2026", time: "1:00 AM",            title: "Tea Break",                         description: "Another short break for relaxation",                                               icon: faMugHot,          tag: "Day 2" },
  { date: "April 4, 2026", time: "8:00 AM – 10:00 AM", title: "Final Touches & Breakfast",         description: "Last minute adjustments before judging round",                                     icon: faScrewdriverWrench, tag: "Day 2" },
  { date: "April 4, 2026", time: "10:00 AM – 1:00 PM",title: "Result declaration of top 24",            description: "First Assessment Round of Teams",                                                  icon: faClipboardCheck,  tag: "Day 2" },
  { date: "April 4, 2026", time: "1:00 PM – 3:00 PM",  title: "Lunch Break",                description: "Lunch for committee and top 24 teams",                                       icon: faUtensils,        tag: "Day 2" },
  { date: "April 4, 2026", time: "3:00 PM – 5:00 PM",  title: "Final results & Prize distribution",         description: "Final results declared and prizes given to winners of each track",                                       icon: faTrophy,        tag: "Day 2" },
];

/* ─────────────────────────────────────────────
   Hooks
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* ─────────────────────────────────────────────
   Round 1 Step Card
───────────────────────────────────────────── */
function Round1Card({ event, index }: { event: typeof round1Events[0]; index: number }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '1 1 220px',
        padding: '24px 22px',
        borderRadius: '16px',
        background: hovered ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.035)',
        border: hovered ? '1px solid rgba(99,102,241,0.45)' : '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: hovered
          ? '0 8px 40px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        position: 'relative',
        overflow: 'hidden',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms, background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease`,
        cursor: 'default',
      }}
    >
      {/* top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: hovered
          ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(56,189,248,0.6), transparent)'
          : 'transparent',
        transition: 'background 0.3s',
      }} />

      {/* Step number */}
      <div style={{
        fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px',
        color: 'rgba(99,102,241,0.6)', fontFamily: "'Trebuchet MS', sans-serif",
        marginBottom: '14px',
      }}>
        STEP {String(index + 1).padStart(2, '0')}
      </div>

      {/* Icon */}
      <div style={{
        width: '44px', height: '44px', borderRadius: '12px',
        background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '16px',
        boxShadow: hovered ? '0 0 20px rgba(99,102,241,0.3)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}>
        <FontAwesomeIcon icon={event.icon} style={{ color: '#818cf8', fontSize: '18px' }} />
      </div>

      {/* Title */}
      <h3 style={{
        color: '#fff', fontSize: '15px', fontWeight: 700,
        fontFamily: "'Trebuchet MS', sans-serif",
        margin: '0 0 8px', lineHeight: 1.3,
      }}>
        {event.title}
      </h3>

      {/* Description */}
      <p style={{
        color: '#64748b', fontSize: '13px', lineHeight: 1.65,
        fontFamily: "'Trebuchet MS', sans-serif", margin: 0,
      }}>
        {event.description}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Round 2 Timeline Item (original logic)
───────────────────────────────────────────── */
function TimelineItem({ event, index }: { event: typeof timelineEvents[0]; index: number }) {
  const isLeft = index % 2 === 0;
  const [ref, inView] = useInView();
  const isDay2Start = event.tag === "Day 2" && (index === 0 || timelineEvents[index - 1].tag !== "Day 2");

  return (
    <>
      {isDay2Start && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 10, margin: '48px 0 32px', gap: '16px',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.4))' }} />
          <div className="day-divider-pill" style={{
            padding: '6px 20px', borderRadius: '999px',
            background: '#0b1220', border: '1px solid rgba(56,189,248,0.4)',
            color: '#38bdf8', fontSize: '15px', fontWeight: 700,
            letterSpacing: '5px', textTransform: 'uppercase' as const,
            fontFamily: "'Trebuchet MS', sans-serif", whiteSpace: 'nowrap' as const,
          }}>April 4 · Day 2</div>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(56,189,248,0.4))' }} />
        </div>
      )}

      <div
        ref={ref}
        className="tl-item-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 60px 1fr',
          alignItems: 'start',
          marginBottom: '28px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateX(0)' : isLeft ? 'translateX(-40px)' : 'translateX(40px)',
          transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${index * 60}ms, transform 0.6s cubic-bezier(.22,1,.36,1) ${index * 60}ms`,
        }}
      >
        <div style={{ gridColumn: isLeft ? '1' : '3', gridRow: 1, display: 'flex', justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
          <Card event={event} isLeft={isLeft} />
        </div>

        <div style={{
          gridColumn: 2, gridRow: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: '18px', position: 'relative', zIndex: 2,
        }}>
          <div style={{ width: '50px', height: '50px' }} />
          <div className="tl-node-circle" style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #38bdf8)',
            border: '3px solid #060c1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px',
            boxShadow: '0 0 0 4px rgba(99,102,241,0.25), 0 0 24px rgba(99,102,241,0.4)',
            flexShrink: 0, transition: 'box-shadow 0.3s',
          }}>
            <FontAwesomeIcon icon={event.icon} style={{ color: '#fff' }} />
          </div>
        </div>

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
        maxWidth: '340px', width: '100%',
        padding: '18px 22px', borderRadius: '16px',
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
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: hovered
          ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(56,189,248,0.8), transparent)'
          : 'transparent',
        transition: 'background 0.3s',
      }} />

      <div className="tl-time-pill" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '3px 10px', borderRadius: '999px',
        background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)',
        marginBottom: '10px', maxWidth: '100%', overflow: 'hidden',
      }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block', flexShrink: 0 }} />
        <span className="tl-card-time-text" style={{
          color: '#38bdf8', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px',
          fontFamily: "'Trebuchet MS', sans-serif",
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {event.time}
        </span>
      </div>

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

      <p className="tl-card-desc" style={{
        color: '#94a3b8', fontSize: '13px', margin: 0, lineHeight: 1.6,
        fontFamily: "'Trebuchet MS', sans-serif",
      }}>
        {event.description}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Export
───────────────────────────────────────────── */
export default function Timeline() {
  const [r1Ref, r1InView] = useInView(0.05);
  const [r2Ref, r2InView] = useInView(0.05);

  return (
    <>
      <style>{`
        @keyframes line-grow    { from{height:0;} to{height:100%;} }
        @keyframes title-reveal { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        @keyframes pulse-ring   { 0%{box-shadow:0 0 0 0 rgba(99,102,241,0.5);} 70%{box-shadow:0 0 0 10px rgba(99,102,241,0);} 100%{box-shadow:0 0 0 0 rgba(99,102,241,0);} }
        @keyframes orb-drift    { 0%,100%{transform:translate(0,0) scale(1);opacity:.18;} 50%{transform:translate(30px,-20px) scale(1.08);opacity:.28;} }
        @keyframes grid-scroll  { 0%{transform:translateY(0);} 100%{transform:translateY(60px);} }
        @keyframes float-chip   { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-8px);} }
        @keyframes arrow-pulse  { 0%,100%{opacity:0.5;transform:translateX(0);} 50%{opacity:1;transform:translateX(4px);} }

        .tl-line-inner { animation: line-grow 1.5s cubic-bezier(.22,1,.36,1) 0.3s both; }
        .day-chip      { animation: float-chip 4s ease-in-out infinite; }
        .arrow-pulse   { animation: arrow-pulse 1.6s ease-in-out infinite; }

        /* Round transition bridge */
        .round-bridge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin: 56px 0;
          position: relative;
          z-index: 2;
        }
        .round-bridge-line {
          width: 2px;
          height: 60px;
          background: linear-gradient(to bottom, rgba(99,102,241,0.6), rgba(56,189,248,0.6));
          border-radius: 2px;
        }
        .round-bridge-arrow {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #38bdf8);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 24px rgba(99,102,241,0.5);
        }

        /* Round section header */
        .round-section-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }
        .round-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 20px; border-radius: 999px; white-space: nowrap;
          font-family: "'Trebuchet MS', sans-serif"; font-weight: 700;
          font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase;
        }

        /* Round 1 cards flex layout */
        .r1-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        @media (max-width: 700px) {
          .tl-item-grid { grid-template-columns: 1fr 32px 1fr !important; }
          .tl-node-circle { width:28px !important; height:28px !important; font-size:13px !important; }
          .tl-card { padding:10px 12px !important; border-radius:12px !important; }
          .tl-card-time-text { font-size:9px !important; letter-spacing:0 !important; }
          .tl-card-title { font-size:12px !important; margin-bottom:4px !important; }
          .tl-card-desc { font-size:10px !important; line-height:1.5 !important; }
          .tl-time-pill { padding:2px 6px !important; margin-bottom:6px !important; }
          .day-divider-pill { font-size:8px !important; letter-spacing:1.5px !important; padding:5px 10px !important; }
          .tl-section { padding:60px 0 80px !important; }
          .tl-header-section { margin-bottom:48px !important; }
          .r1-cards > * { flex: 1 1 100% !important; }
          .round-section-header { flex-direction: column; align-items: flex-start; gap: 10px; }
        }

        @media (max-width: 400px) {
          .tl-item-grid { grid-template-columns: 1fr 24px 1fr !important; }
          .tl-node-circle { width:20px !important; height:20px !important; font-size:10px !important; border-width:2px !important; }
          .tl-card { padding:8px 8px !important; }
          .tl-card-time-text { font-size:7px !important; }
          .tl-card-title { font-size:10px !important; }
          .tl-card-desc { font-size:9px !important; }
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
            backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            animation: 'grid-scroll 10s linear infinite',
          }} />
        </div>

        {/* Orbs */}
        <div style={{ position: 'absolute', top: '-100px', right: '-150px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', borderRadius: '50%', animation: 'orb-drift 8s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-150px', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(56,189,248,0.14) 0%, transparent 70%)', borderRadius: '50%', animation: 'orb-drift 10s ease-in-out infinite reverse', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

          {/* ── Main Header ── */}
          <div className="tl-header-section" style={{ textAlign: 'center', marginBottom: '72px' }}>
            <div className="day-chip" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 18px', borderRadius: '999px',
              background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.35)',
              marginBottom: '24px',
            }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'cyan', display: 'inline-block', animation: 'pulse-ring 2s infinite' }} />
              <span style={{ color: '#83dfe9', fontSize: '20px', fontWeight: 600, letterSpacing: '5px', textTransform: 'uppercase', fontFamily: "'Trebuchet MS', sans-serif" }}>2-Round Format</span>
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
              color: '#22D3EE', fontSize: '16px', fontFamily: "'Trebuchet MS', sans-serif",
              maxWidth: '460px', margin: '0 auto', lineHeight: 1.7,
              animation: 'title-reveal 0.8s cubic-bezier(.22,1,.36,1) 0.15s both',
            }}>
              From online screening to an on-site 24-hour build — two rounds, one winner.
            </p>
          </div>

          {/* ══════════════════════════════════════
              ROUND 1 — Online Screening
          ══════════════════════════════════════ */}
          <div ref={r1Ref}>
            {/* Round 1 header */}
            <div className="round-section-header">
              <div className="round-badge" style={{
                background: 'rgba(99,102,241,0.10)',
                border: '1px solid rgba(99,102,241,0.35)',
                color: '#818cf8',
                fontFamily: "'Trebuchet MS', sans-serif",
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#818cf8', display: 'block', boxShadow: '0 0 8px #818cf8', flexShrink: 0 }} />
                Round 1
              </div>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,102,241,0.4), transparent)' }} />
            </div>

            {/* Round 1 title */}
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{
                fontFamily: "'Trebuchet MS', sans-serif",
                fontSize: 'clamp(22px, 3.5vw, 32px)',
                fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.5px',
                opacity: r1InView ? 1 : 0,
                transform: r1InView ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}>
                Online Screening
              </h3>
              <p style={{
                color: '#475569', fontSize: '14px', margin: 0,
                fontFamily: "'Trebuchet MS', sans-serif", lineHeight: 1.6,
                opacity: r1InView ? 1 : 0,
                transition: 'opacity 0.6s ease 0.1s',
              }}>
                Submit your PPT during registration. Top teams get selected for the on-site hackathon.
              </p>
            </div>

            {/* Round 1 step cards */}
            <div className="r1-cards">
              {round1Events.map((event, i) => (
                <Round1Card key={i} event={event} index={i} />
              ))}
            </div>

            {/* "Only selected teams advance" note */}
            <div style={{
              marginTop: '24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              padding: '12px 20px', borderRadius: '12px',
              background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.18)',
              opacity: r1InView ? 1 : 0,
              transition: 'opacity 0.6s ease 0.4s',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34d399', display: 'block', boxShadow: '0 0 8px #34d399', flexShrink: 0 }} />
              <span style={{ color: '#6ee7b7', fontSize: '13px', fontWeight: 600, fontFamily: "'Trebuchet MS', sans-serif" }}>
                Only shortlisted teams from Round 1 advance to the 24-hour on-site hackathon.
              </span>
            </div>
          </div>

          {/* ── Transition bridge between rounds ── */}
          <div className="round-bridge">
            <div className="round-bridge-line" />
            <div className="round-bridge-arrow arrow-pulse">
              <FontAwesomeIcon icon={faArrowRight} style={{ color: '#fff', fontSize: '14px', transform: 'rotate(90deg)' }} />
            </div>
            <div className="round-bridge-line" />
            <div style={{
              padding: '8px 22px', borderRadius: '999px',
              background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.28)',
              color: '#38bdf8', fontSize: '11px', fontWeight: 700,
              letterSpacing: '2.5px', textTransform: 'uppercase' as const,
              fontFamily: "'Trebuchet MS', sans-serif",
            }}>
              Selected teams proceed to Round 2
            </div>
          </div>

          {/* ══════════════════════════════════════
              ROUND 2 — On-site 24-hour Hackathon
          ══════════════════════════════════════ */}
          <div ref={r2Ref}>
            {/* Round 2 header */}
            <div className="round-section-header">
              <div className="round-badge" style={{
                background: 'rgba(56,189,248,0.08)',
                border: '1px solid rgba(56,189,248,0.35)',
                color: '#38bdf8',
                fontFamily: "'Trebuchet MS', sans-serif",
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#38bdf8', display: 'block', boxShadow: '0 0 8px #38bdf8', flexShrink: 0 }} />
                Round 2
              </div>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(56,189,248,0.4), transparent)' }} />
            </div>

            {/* Round 2 title */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{
                fontFamily: "'Trebuchet MS', sans-serif",
                fontSize: 'clamp(22px, 3.5vw, 32px)',
                fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.5px',
                opacity: r2InView ? 1 : 0,
                transform: r2InView ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}>
                24-Hour On-site Hackathon
              </h3>
              <p style={{
                color: '#475569', fontSize: '14px', margin: 0,
                fontFamily: "'Trebuchet MS', sans-serif", lineHeight: 1.6,
                opacity: r2InView ? 1 : 0,
                transition: 'opacity 0.6s ease 0.1s',
              }}>
                April 3–4, 2026 · PVGCOET&M · Build, pitch, and win.
              </p>
            </div>

            {/* Day 1 label */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.4))' }} />
              <div className="day-divider-pill" style={{
                padding: '6px 20px', borderRadius: '999px',
                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.4)',
                color: '#22D3EE', fontSize: '18px', fontWeight: 800, letterSpacing: '3px',
                textTransform: 'uppercase', fontFamily: "'Trebuchet MS', sans-serif", whiteSpace: 'nowrap',
              }}>April 3 · Day 1</div>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(99,102,241,0.4))' }} />
            </div>

            {/* Timeline items */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '50%', top: 0, bottom: 0,
                width: '3px', transform: 'translateX(-50%)',
                background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden',
              }}>
                <div className="tl-line-inner" style={{
                  width: '100%',
                  background: 'linear-gradient(to bottom, #6366f1, #38bdf8, #a78bfa)',
                  borderRadius: '5px',
                }} />
              </div>

              {timelineEvents.map((event, i) => (
                <TimelineItem key={i} event={event} index={i} />
              ))}
            </div>
          </div>

          {/* Bottom accent */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)', marginTop: '40px' }} />
        </div>
      </section>
    </>
  );
}