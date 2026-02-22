'use client'
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
const goldSponsors = [
  { name: 'Sponsor 1', image: '/sponser1.jpg' },
  { name: 'Sponsor 2', image: '/sponser2.png' },
];

const silverSponsors = [
  { name: 'Sponsor 3', image: '/sponser3.png' },
  { name: 'Sponsor 4', image: '/sponser4.jpg' },
  { name: 'Sponsor 5', image: '/sponser5.png' },
];

const communityPartners = [
  { name: 'Sponsor 6', image: '/sponser6.jpg' },
  { name: 'Sponsor 7', image: '/sponser7.jpg' },
];

const goldHover    = { glow: 'rgba(234,179,8,0.55)',   bg: 'rgba(234,179,8,0.07)',   border: 'rgba(234,179,8,0.85)'   };
const silverHover  = { glow: 'rgba(148,163,184,0.45)', bg: 'rgba(148,163,184,0.06)', border: 'rgba(148,163,184,0.75)' };
const partnerHover = { glow: 'rgba(34,211,238,0.4)',   bg: 'rgba(34,211,238,0.06)',  border: 'rgba(34,211,238,0.75)'  };

const css = `
  /* ── Grid layouts ── */
  .sg-gold {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .sg-silver {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .sg-community {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 66.66%;
    margin: 0 auto;
  }

  /* ── Card: aspect-ratio keeps height proportional to width ── */
  .sponsor-card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    cursor: pointer;
    overflow: hidden;
    aspect-ratio: 16 / 6;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
  }

  .sponsor-card img {
    max-width: 55%;
    max-height: 65%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
    transition: filter 0.22s ease;
    pointer-events: none;
  }

  /* ── Tablet ── */
  @media (max-width: 900px) {
    .sg-silver {
      grid-template-columns: repeat(2, 1fr);
    }
    .sg-community {
      width: 80%;
    }
    .sponsor-card {
      aspect-ratio: 16 / 7;
    }
    .sponsor-card img {
      max-width: 60%;
      max-height: 70%;
    }
  }

  /* ── Mobile ── */
  @media (max-width: 600px) {
    .sg-gold,
    .sg-silver,
    .sg-community {
      grid-template-columns: 1fr;
      gap: 12px;
      width: 100%;
    }
    .sponsor-card {
      aspect-ratio: 16 / 6;
    }
    .sponsor-card img {
      max-width: 55%;
      max-height: 65%;
    }
  }
`;

function SectionLabel({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
      <span style={{
        fontSize: '11px', fontWeight: 700, letterSpacing: '3.5px',
        textTransform: 'uppercase', fontFamily: "'Trebuchet MS', sans-serif",
        color, whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${color}55, transparent)` }} />
    </div>
  );
}

function SponsorCard({
  sponsor, hoverStyle, visible, delay = 0,
}: {
  sponsor: { name: string; image: string };
  hoverStyle: { glow: string; bg: string; border: string };
  visible: boolean;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="sponsor-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? hoverStyle.border : 'rgba(255,255,255,0.09)'}`,
        background: hovered ? hoverStyle.bg : 'rgba(255,255,255,0.04)',
        boxShadow: hovered
          ? `0 0 32px 4px ${hoverStyle.glow}, inset 0 1px 0 rgba(255,255,255,0.09)`
          : '0 4px 20px rgba(0,0,0,0.55)',
        transition: `border 0.22s ease, background 0.22s ease, box-shadow 0.22s ease, opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
        background: hovered
          ? `linear-gradient(90deg, transparent, ${hoverStyle.border}, transparent)`
          : 'transparent',
        transition: 'background 0.22s ease',
      }} />
      <img
        src={sponsor.image}
        alt={sponsor.name}
        style={{
          filter: hovered
            ? 'brightness(1.12) saturate(1.08) drop-shadow(0 0 8px rgba(255,255,255,0.15))'
            : 'brightness(0.88) saturate(0.8)',
        }}
      />
    </div>
  );
}

export default function Sponser() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <section
        ref={sectionRef}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: 'clamp(32px, 5vw, 72px) clamp(16px, 3vw, 36px)',
          background: 'linear-gradient(135deg, #0b0f1e 0%, #080c18 60%, #060914 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 'clamp(24px, 3.5vw, 52px) clamp(18px, 3.5vw, 52px) clamp(28px, 4vw, 60px)',
            borderRadius: '24px',
            background: 'linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(99,102,241,0.04) 100%)',
            border: '1px solid rgba(99,102,241,0.18)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 100px rgba(99,102,241,0.09), inset 0 1px 0 rgba(255,255,255,0.06)',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            boxSizing: 'border-box',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(36px)',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
            background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.65),rgba(56,189,248,0.45),transparent)',
          }} />
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px', width: '260px', height: '260px',
            borderRadius: '50%', pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-80px', left: '-80px', width: '240px', height: '240px',
            borderRadius: '50%', pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)',
          }} />

          {/* Header */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '10px', marginBottom: 'clamp(24px, 3vw, 48px)', alignSelf: 'center',
            opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.1s',
            textAlign: 'center',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '5px 16px', borderRadius: '999px',
              background: 'rgba(99,102,241,0.11)', border: '1px solid rgba(99,102,241,0.28)',
              marginBottom: '4px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', display: 'block' }} />
              <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#818cf8', fontWeight: 700, fontFamily: "'Trebuchet MS', sans-serif" }}>
                PARTNERSHIPS
              </span>
            </div>
            <div style={{
              fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 700,
              fontFamily: "'Trebuchet MS', sans-serif", color: '#fff',
            }}>
              Our Valuable{' '}
              <span style={{
                background: 'linear-gradient(90deg, #818cf8, #a78bfa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Sponsors
              </span>
            </div>
            <p style={{
              fontSize: 'clamp(11px, 1.5vw, 14px)', color: 'rgba(255,255,255,0.38)',
              fontFamily: "'Trebuchet MS', sans-serif", textAlign: 'center', margin: 0,
            }}>
              Empowering innovation through strategic collaborations.
            </p>
          </div>

          {/* Gold */}
          <div style={{ marginBottom: 'clamp(20px, 3vw, 40px)' }}>
            <SectionLabel label="Gold Sponsors" color="#eab308" />
            <div className="sg-gold">
              {goldSponsors.map((s, i) => (
                <SponsorCard key={i} sponsor={s} hoverStyle={goldHover} visible={visible} delay={i * 80} />
              ))}
            </div>
          </div>

          {/* Silver */}
          <div style={{ marginBottom: 'clamp(20px, 3vw, 40px)' }}>
            <SectionLabel label="Silver Sponsors" color="#94a3b8" />
            <div className="sg-silver">
              {silverSponsors.map((s, i) => (
                <SponsorCard key={i} sponsor={s} hoverStyle={silverHover} visible={visible} delay={160 + i * 70} />
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <SectionLabel label="Community Partners" color="#22d3ee" />
            <div className="sg-community">
              {communityPartners.map((s, i) => (
                <SponsorCard key={i} sponsor={s} hoverStyle={partnerHover} visible={visible} delay={370 + i * 70} />
              ))}
            </div>
          </div>

          <div style={{
            position: 'absolute', bottom: 0, left: '30%', right: '30%', height: '1px',
            background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.35),transparent)',
          }} />
        </div>
      </section>
    </>
  );
}