"use client";
import { url } from "inspector";
import { useEffect, useRef, useState } from "react";

const diamondSponsors = [
  {
    name: "Persistent",
    image: "/Persistent logo 2.jpg.jpeg",
    url: "https://www.persistent.com",
  },
  {
    name: "Algorand",
    image: "/algorand_full_logo_white.png",
    url: "https://www.algorand.com/",
  },
  {
    name: "PMTrack",
    image: "/PMTrack_logo-01-1.png",
    url: "https://www.pmtrackerp.in/",
  },
];

const goldSponsors = [
  {
    name: "Vidhit",
    image: "/vidhit.jpg",
    url: "https://www.linkedin.com/company/vidhit-technologies",
  },
];

const silverSponsors = [
  {
    name: "Sinarmas",
    image: "/sinarmas.png",
    url: "https://www.sinarmas.com/",
  },
  {
    name: "RVTechLearn",
    image: "/RVTechLearn.png",
    url: "https://www.rvtechlearn.com/",
  },
];

const bronzeSponsors = [
  {
    name: "Vulnuris",
    image: "/vulnuris.webp",
    url: "https://www.vulnuris.in/",
  },
  {
    name: "Weboreel",
    image: "/weboreel.webp",
    url: "https://www.weboreel.com/",
  },
  {
    name: "Shivam Engineers",
    image: "/Shivam Engineers Logo.png",
    url: "https://shivamgroups.in/index.php",
  },
  {
    name: "Shree Engineers",
    image: "/Shree Engineers Logo.jpeg",
    url: "https://www.shreeengineeringkatrajpune.in/",
  },
];

const diamondHover = {
  glow: "rgba(183, 241, 253,0.35)",
  bg: "rgba(255,255,255,0.08)",
  border: "rgba(255,255,255,0.65)",
};
const goldHover = {
  glow: "rgba(234,179,8,0.35)",
  bg: "rgba(234,179,8,0.07)",
  border: "rgba(234,179,8,0.7)",
};
const silverHover = {
  glow: "rgba(148,163,184,0.3)",
  bg: "rgba(148,163,184,0.06)",
  border: "rgba(148,163,184,0.6)",
};
const bronzeHover = {
  glow: "rgba(205,127,50,0.35)",
  bg: "rgba(205,127,50,0.07)",
  border: "rgba(205,127,50,0.7)",
};
const partnerHover = {
  glow: "rgba(34,211,238,0.3)",
  bg: "rgba(34,211,238,0.06)",
  border: "rgba(34,211,238,0.6)",
};

const css = `
  .sg-diamond {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 75%;
    margin: 0 auto;
    gap: 20px;
  }

  .sg-gold {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .sg-silver {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .sg-bronze {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 66.66%;
    margin: 0 auto;
  }
  .sg-community {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 66.66%;
    margin: 0 auto;
  }

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
    /* All transitions use the same easing curve */
    transition:
      border 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      background 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Overlay that fades in to add inner depth on hover */
  .sponsor-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    z-index: 1;
  }

  .sponsor-card:hover::before {
    opacity: 1;
  }

  .sponsor-card img {
    max-width: 55%;
    max-height: 65%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
    pointer-events: none;
    position: relative;
    z-index: 2;
    transition:
      filter 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sponsor-card:hover img {
    transform: scale(1.05);
    filter: brightness(1.15) saturate(1.1) drop-shadow(0 0 10px rgba(255,255,255,0.18));
  }

  /* Top-edge shimmer line */
  .sponsor-card .shimmer {
    position: absolute;
    top: 0;
    left: 20%;
    right: 20%;
    height: 1px;
    z-index: 3;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sponsor-card:hover .shimmer {
    opacity: 1;
  }

  /* Sponsor button hover */
  .sponsor-btn {
    padding: 10px 28px;
    border-radius: 999px;
    border: 1px solid rgba(99,102,241,0.5);
    background: rgba(99,102,241,0.12);
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 14px;
    letter-spacing: 0.5px;
    transition:
      background 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sponsor-btn:hover {
    background: rgba(99,102,241,0.28);
    border-color: rgba(99,102,241,0.85);
    box-shadow: 0 0 24px rgba(99,102,241,0.35);
    transform: translateY(-2px);
  }

  .sponsor-btn:active {
    transform: translateY(0px);
    transition-duration: 0.1s;
  }

  /* ── Tablet ── */
  @media (max-width: 900px) {
    .sg-silver { grid-template-columns: repeat(2, 1fr); }
    .sg-community { width: 80%; }
    .sponsor-card { aspect-ratio: 16 / 7; }
    .sponsor-card img { max-width: 60%; max-height: 70%; }
  }

  /* ── Mobile ── */
  @media (max-width: 600px) {
    .sg-gold, .sg-silver, .sg-community {
      grid-template-columns: 1fr;
      gap: 12px;
      width: 100%;
    }
    .sponsor-card { aspect-ratio: 16 / 6; }
    .sponsor-card img { max-width: 55%; max-height: 65%; }
  }
`;

function SectionLabel({ label, color }: { label: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        marginBottom: "20px",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "3.5px",
          textTransform: "uppercase",
          fontFamily: "'Trebuchet MS', sans-serif",
          color,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(90deg, ${color}55, transparent)`,
        }}
      />
    </div>
  );
}

function SponsorCard({
  sponsor,
  hoverStyle,
  visible,
  delay = 0,
}: {
  sponsor: { name: string; image: string; url: string };
  hoverStyle: { glow: string; bg: string; border: string };
  visible: boolean;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div
        className="sponsor-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: `1px solid ${hovered ? hoverStyle.border : "rgba(255,255,255,0.08)"}`,
          background: hovered ? hoverStyle.bg : "rgba(255,255,255,0.03)",
          boxShadow: hovered
            ? `0 0 40px 6px ${hoverStyle.glow}, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`
            : "0 4px 20px rgba(0,0,0,0.5)",
          /* Entry animation only — hover transitions handled by CSS class */
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: `
          border 0.35s cubic-bezier(0.4, 0, 0.2, 1),
          background 0.35s cubic-bezier(0.4, 0, 0.2, 1),
          box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),
          opacity 0.6s ease ${delay}ms,
          transform 0.6s ease ${delay}ms
        `,
        }}
      >
        {/* Top shimmer line — color comes from hoverStyle */}
        <div
          className="shimmer"
          style={{
            background: `linear-gradient(90deg, transparent, ${hoverStyle.border}, transparent)`,
          }}
        />
        <img
          src={sponsor.image}
          alt={sponsor.name}
          style={{
            /* base filter — hover handled by CSS */
            filter: hovered
              ? undefined /* let CSS :hover rule take over */
              : "brightness(0.85) saturate(0.75)",
          }}
        />
      </div>
    </a>
  );
}

function getGridInlineStyle(itemCount: number, maxCols: number) {
  // When there are fewer items than the target number of columns, keep the grid
  // content centered instead of left-aligned.
  if (itemCount < maxCols && itemCount > 0) {
    const cols = Math.max(1, itemCount);
    return {
      gridTemplateColumns: `repeat(${cols}, minmax(220px, 420px))`,
      justifyContent: "center",
    };
  }
  return {};
}

export default function Sponser() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
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
          width: "100%",
          boxSizing: "border-box",
          padding: "clamp(32px, 5vw, 72px) clamp(16px, 3vw, 36px)",
          background:
            "linear-gradient(135deg, #0b0f1e 0%, #080c18 60%, #060914 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding:
              "clamp(24px, 3.5vw, 52px) clamp(18px, 3.5vw, 52px) clamp(28px, 4vw, 60px)",
            borderRadius: "24px",
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(99,102,241,0.04) 100%)",
            border: "1px solid rgba(99,102,241,0.18)",
            backdropFilter: "blur(16px)",
            boxShadow:
              "0 0 100px rgba(99,102,241,0.09), inset 0 1px 0 rgba(255,255,255,0.06)",
            position: "relative",
            overflow: "hidden",
            width: "100%",
            boxSizing: "border-box",
            transition: "opacity 0.8s ease, transform 0.8s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(36px)",
          }}
        >
          {/* Decorative edges */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "20%",
              right: "20%",
              height: "1px",
              background:
                "linear-gradient(90deg,transparent,rgba(99,102,241,0.65),rgba(56,189,248,0.45),transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              pointerEvents: "none",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-80px",
              left: "-80px",
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              pointerEvents: "none",
              background:
                "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)",
            }}
          />

          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              marginBottom: "clamp(24px, 3vw, 48px)",
              alignSelf: "center",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 0.1s",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "5px 16px",
                borderRadius: "999px",
                background: "rgba(99,102,241,0.11)",
                border: "1px solid rgba(99,102,241,0.28)",
                marginBottom: "4px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#6366f1",
                  display: "block",
                }}
              />
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "2.5px",
                  color: "#818cf8",
                  fontWeight: 700,
                  fontFamily: "'Trebuchet MS', sans-serif",
                }}
              >
                PARTNERSHIPS
              </span>
            </div>
            <div
              style={{
                fontSize: "clamp(20px, 3vw, 32px)",
                fontWeight: 700,
                fontFamily: "'Trebuchet MS', sans-serif",
                color: "#fff",
              }}
            >
              Our Valuable{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #818cf8, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Sponsors
              </span>
            </div>
            <p
              style={{
                fontSize: "clamp(11px, 1.5vw, 14px)",
                color: "rgba(255,255,255,0.38)",
                fontFamily: "'Trebuchet MS', sans-serif",
                textAlign: "center",
                margin: 0,
              }}
            >
              Empowering innovation through strategic collaborations.
            </p>
          </div>

          {/* diamond */}
          <div style={{ marginBottom: "clamp(20px, 3vw, 40px)" }}>
            <SectionLabel label="diamond Sponsors" color="#00D7FF" />
            <div
              className="sg-diamond"
              style={getGridInlineStyle(diamondSponsors.length, 2)}
            >
              {diamondSponsors.map((s, i) => (
                <SponsorCard
                  key={i}
                  sponsor={s}
                  hoverStyle={diamondHover}
                  visible={visible}
                  delay={i * 80}
                />
              ))}
            </div>
          </div>
          {/* Gold */}
          <div style={{ marginBottom: "clamp(20px, 3vw, 40px)" }}>
            <SectionLabel label="Gold Sponsors" color="#eab308" />
            <div
              className="sg-gold"
              style={getGridInlineStyle(goldSponsors.length, 3)}
            >
              {goldSponsors.map((s, i) => (
                <SponsorCard
                  key={i}
                  sponsor={s}
                  hoverStyle={goldHover}
                  visible={visible}
                  delay={i * 80}
                />
              ))}
            </div>
          </div>

          {/* Silver */}
          <div style={{ marginBottom: "clamp(20px, 3vw, 40px)" }}>
            <SectionLabel label="Silver Sponsors" color="#94a3b8" />
            <div
              className="sg-silver"
              style={getGridInlineStyle(silverSponsors.length, 3)}
            >
              {silverSponsors.map((s, i) => (
                <SponsorCard
                  key={i}
                  sponsor={s}
                  hoverStyle={silverHover}
                  visible={visible}
                  delay={i * 80}
                />
              ))}
            </div>
          </div>
          {/* Bronze */}
          <div style={{ marginBottom: "clamp(20px, 3vw, 40px)" }}>
            <SectionLabel label="Bronze Sponsors" color="#CD7F32" />
            <div className="sg-bronze">
              {bronzeSponsors.map((s, i) => (
                <SponsorCard
                  key={i}
                  sponsor={s}
                  hoverStyle={bronzeHover}
                  visible={visible}
                  delay={i * 80}
                />
              ))}
            </div>
          </div>
          {/* Community */}
          <div style={{ marginBottom: "clamp(20px, 3vw, 40px)" }}>
            <SectionLabel label="Community Sponsors" color="#22d3ee" />
            <div className="sg-community">
              {/*{communitySponsors.map((s, i) => (
                <SponsorCard key={i} sponsor={s} hoverStyle={bronzeHover} visible={visible} delay={i * 80} />
              ))} */}
            </div>
          </div>

          {/* Contribute Section */}
          <div
            style={{ marginTop: "clamp(32px, 4vw, 60px)", textAlign: "center" }}
          >
            <h2
              style={{
                fontSize: "clamp(18px, 2.5vw, 28px)",
                fontWeight: 700,
                fontFamily: "'Trebuchet MS', sans-serif",
                color: "#fff",
                marginBottom: "14px",
              }}
            >
              Want to Contribute to the{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #818cf8, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Hackathon?
              </span>
            </h2>
            <p
              style={{
                fontSize: "clamp(11px, 1.5vw, 14px)",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "'Trebuchet MS', sans-serif",
                marginBottom: "20px",
              }}
            >
              Partner with us to empower innovation and connect with emerging
              talent.
            </p>
            <button
              className="sponsor-btn"
              onClick={() =>
                (window.location.href =
                  "mailto:ignitionhackverse@pvgcoet.ac.in?subject=Sponsorship%20Inquiry%20and%20Deliverables-%20Ignition%20HackVerse%202026")
              }
            >
              Become a Sponsor
            </button>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "30%",
              right: "30%",
              height: "1px",
              background:
                "linear-gradient(90deg,transparent,rgba(99,102,241,0.35),transparent)",
            }}
          />
        </div>
      </section>
    </>
  );
}
