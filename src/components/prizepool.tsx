"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, Building2, ShieldCheck, Sprout } from "lucide-react";

const TOTAL = 180000;

const TRACKS = [
  {
    id: 0,
    color: "#6366f1",
    soft: "rgba(99,102,241,",
    label: "Track I",
    title: "Intelligent Systems",
    Icon: Brain,
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.04) 100%)",
    border: "rgba(99,102,241,0.30)",
    glow: "rgba(99,102,241,0.20)",
    topics: [
      "AI Application",
      "Data Science",
      "Automation",
      "Machine Learning",
      "Predictive Systems",
    ],
  },
  {
    id: 1,
    color: "#38bdf8",
    soft: "rgba(56,189,248,",
    label: "Track II",
    title: "Cyber Security & Smart Urbanization",
    Icon: Building2,
    gradient: "linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.04) 100%)",
    border: "rgba(56,189,248,0.30)",
    glow: "rgba(56,189,248,0.20)",
    topics: [
      "Cyber Security",
      "IoT",
      "Smart City",
      "Sustainability",
      "Gov Tech"      
    ],
  },
  {
    id: 2,
    color: "#a78bfa",
    soft: "rgba(167,139,250,",
    label: "Track III",
    title: "Blockchain",
    Icon: ShieldCheck,
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(167,139,250,0.04) 100%)",
    border: "rgba(167,139,250,0.30)",
    glow: "rgba(167,139,250,0.20)",
    topics: [
      "Decentralized Identity (SSI)",
      "Cyber Forensics & Privacy",
      "Verifiable Credentials (Blockchain)",
      "Zero-Trust Architecture",
      "Anti-Deepfake Technology",
    ],
  },
  {
    id: 3,
    color: "#34d399",
    soft: "rgba(52,211,153,",
    label: "Track IV",
    title: "Future Learning (EduTech & FinTech)",
    Icon: Sprout,
    gradient: "linear-gradient(135deg, rgba(52,211,153,0.15) 0%, rgba(52,211,153,0.04) 100%)",
    border: "rgba(52,211,153,0.30)",
    glow: "rgba(52,211,153,0.20)",
    topics: [
      "Personalized Learning & AI Tutors",
      "Mental Health & Wellness",
      "Gamification in Education",
      "Telemedicine & Remote Care",
      "Accessibility Tech",
    ],
  },
];

const PRIZE_TIERS = [
  { rank: "2nd", amount: "₹15,000", icon: "🥈", label: "Silver", color: "#94a3b8", glow: "rgba(148,163,184,", order: 1, height: "80px" },
  { rank: "1st", amount: "₹20,000", icon: "🥇", label: "Gold",   color: "#fbbf24", glow: "rgba(251,191,36,",  order: 2, height: "110px" },
  { rank: "3rd", amount: "₹10,000", icon: "🥉", label: "Bronze", color: "#f97316", glow: "rgba(249,115,22,",  order: 3, height: "56px" },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

function useCounter(target: number, active: boolean, duration = 2200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [active, target, duration]);
  return val;
}

function TrackCard({ track, visible, delay }: { track: typeof TRACKS[0]; visible: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "18px",
        padding: "26px 24px 24px",
        background: hovered ? track.gradient : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? track.border : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered
          ? `0 0 48px ${track.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`
          : "0 2px 20px rgba(0,0,0,0.4)",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms, border 0.35s ease, background 0.35s ease, box-shadow 0.35s ease`,
        overflow: "hidden",
        flex: "1 1 220px",
        minWidth: 0,
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: "absolute", top: 0, left: "15%", right: "15%", height: "1px",
        background: hovered
          ? `linear-gradient(90deg, transparent, ${track.color}90, transparent)`
          : "transparent",
        transition: "background 0.35s ease",
      }} />

      {/* Corner glow orb */}
      <div style={{
        position: "absolute", top: "-40px", right: "-40px",
        width: "120px", height: "120px", borderRadius: "50%",
        background: `radial-gradient(circle, ${track.glow} 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />

      {/* Track label pill */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "3px 12px", borderRadius: "999px",
        background: `${track.soft}0.10)`,
        border: `1px solid ${track.soft}0.25)`,
        marginBottom: "14px",
      }}>
        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: track.color, display: "block", boxShadow: `0 0 6px ${track.color}` }} />
        <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "2.5px", color: track.color, fontFamily: "'Trebuchet MS', sans-serif" }}>
          {track.label}
        </span>
      </div>

      {/* Lucide icon */}
      <div style={{ marginBottom: "10px", lineHeight: 1 }}>
        <track.Icon size={32} color={track.color} strokeWidth={1.5} style={{ filter: `drop-shadow(0 0 8px ${track.color}80)` }} />
      </div>

      {/* Title */}
      <h3 style={{
        margin: "0 0 18px",
        fontSize: "clamp(14px, 1.8vw, 16px)",
        fontWeight: 800,
        fontFamily: "'Trebuchet MS', sans-serif",
        color: "#fff",
        lineHeight: 1.3,
        letterSpacing: "-0.3px",
      }}>
        {track.title}
      </h3>

      {/* Divider */}
      <div style={{
        height: "1px",
        background: `linear-gradient(90deg, ${track.color}40, transparent)`,
        marginBottom: "16px",
      }} />

      {/* Topics */}
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
        {track.topics.map((topic, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
            <span style={{
              width: "5px", height: "5px", borderRadius: "50%",
              background: track.color, flexShrink: 0, marginTop: "6px",
              boxShadow: `0 0 5px ${track.color}80`,
            }} />
            <span style={{
              fontSize: "12.5px", color: "rgba(255,255,255,0.58)",
              fontFamily: "'Trebuchet MS', sans-serif", lineHeight: 1.5,
            }}>
              {topic}
            </span>
          </li>
        ))}
      </ul>

      {/* Prize pill at bottom */}
      <div style={{
        marginTop: "20px",
        display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "5px 14px", borderRadius: "999px",
        background: `${track.soft}0.08)`,
        border: `1px solid ${track.soft}0.20)`,
      }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: track.color, fontFamily: "'Trebuchet MS', sans-serif" }}>
          ₹45,000 Prize Pool
        </span>
      </div>
    </div>
  );
}

export default function PrizePool() {
  const [secRef, secInView] = useInView(0.05);
  const total = useCounter(TOTAL, secInView, 2400);

  return (
    <>
      <style>{`
        @keyframes grid-scroll  { 0%{transform:translateY(0)} 100%{transform:translateY(60px)} }
        @keyframes orb-drift    { 0%,100%{transform:translate(0,0) scale(1);opacity:.14;} 50%{transform:translate(24px,-18px) scale(1.07);opacity:.22;} }
        @keyframes reveal-up    { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        @keyframes chip-float   { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-5px);} }
        @keyframes pulse-dot    { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.65);} 70%{box-shadow:0 0 0 9px rgba(99,102,241,0);} }
        @keyframes total-glow   { 0%,100%{text-shadow:0 0 40px rgba(99,102,241,0.35);} 50%{text-shadow:0 0 80px rgba(99,102,241,0.65),0 0 120px rgba(56,189,248,0.25);} }
        @keyframes float-badge  { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
        @keyframes podium-rise  { from{opacity:0;transform:translateY(30px) scaleY(0.7);} to{opacity:1;transform:translateY(0) scaleY(1);} }
        @keyframes medal-bounce { 0%,100%{transform:translateY(0) scale(1);} 40%{transform:translateY(-8px) scale(1.1);} }
        @keyframes scan-line    { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }

        .total-num { animation: total-glow 3s ease-in-out infinite; }

        .equal-strip { display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-top:14px; }

        .tracks-flex {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .tracks-flex > * {
          flex: 1 1 calc(25% - 12px);
          min-width: 200px;
        }

        .podium-wrapper { display:flex; align-items:flex-end; justify-content:center; gap:10px; margin-top:36px; }
        .podium-item    { display:flex; flex-direction:column; align-items:center; gap:0; animation:podium-rise 0.7s cubic-bezier(0.34,1.56,0.64,1) both; }
        .podium-item:nth-child(1){animation-delay:0.15s;}
        .podium-item:nth-child(2){animation-delay:0s;}
        .podium-item:nth-child(3){animation-delay:0.3s;}
        .podium-medal   { font-size:32px; margin-bottom:6px; animation:medal-bounce 2.5s ease-in-out infinite; filter:drop-shadow(0 4px 12px var(--glow-color)); }
        .podium-amount  { font-family:'Trebuchet MS',sans-serif; font-weight:900; font-size:18px; letter-spacing:-0.5px; margin-bottom:4px; }
        .podium-rank-label { font-family:'Trebuchet MS',sans-serif; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; opacity:.7; margin-bottom:8px; }
        .podium-block   { width:100px; border-radius:10px 10px 4px 4px; display:flex; align-items:center; justify-content:center; font-family:'Trebuchet MS',sans-serif; font-size:13px; font-weight:800; letter-spacing:1px; position:relative; overflow:hidden; }
        .podium-block::before { content:''; position:absolute; inset:0; background:linear-gradient(180deg,rgba(255,255,255,0.12) 0%,transparent 60%); pointer-events:none; }
        .podium-divider { display:flex; align-items:center; gap:16px; margin-top:32px; opacity:.85; }
        .podium-divider-line { flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent); }
        .podium-divider-text { font-family:'Trebuchet MS',sans-serif; font-size:11px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:#4f5f7a; }

        @media (max-width: 900px) {
          .tracks-flex > * { flex: 1 1 calc(50% - 8px); }
        }
        @media (max-width: 540px) {
          .tracks-flex > * { flex: 1 1 100%; }
          .podium-block { width:76px; }
          .podium-amount { font-size:14px; }
        }
      `}</style>

      <section
        ref={secRef}
        id="prizes"
        style={{
          background: "linear-gradient(180deg,#060c1a 0%,#080f20 55%,#060c1a 100%)",
          position: "relative",
          padding: "88px 0 104px",
          overflow: "hidden",
        }}
      >
        {/* BG grid */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(99,102,241,0.6) 1px,transparent 1px), linear-gradient(90deg,rgba(99,102,241,0.6) 1px,transparent 1px)`,
            backgroundSize: "60px 60px",
            animation: "grid-scroll 12s linear infinite",
          }} />
        </div>

        {/* Orbs */}
        <div style={{ position:"absolute", top:"-120px", right:"-120px", width:"520px", height:"520px", background:"radial-gradient(circle,rgba(99,102,241,0.16) 0%,transparent 70%)", borderRadius:"50%", animation:"orb-drift 9s ease-in-out infinite", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-120px", left:"-120px", width:"480px", height:"480px", background:"radial-gradient(circle,rgba(56,189,248,0.12) 0%,transparent 70%)", borderRadius:"50%", animation:"orb-drift 11s ease-in-out infinite reverse", pointerEvents:"none" }} />

        <div style={{ maxWidth:"1160px", margin:"0 auto", padding:"0 20px", position:"relative", zIndex:1 }}>

          {/* ── Header ── */}
          <div style={{ textAlign:"center", marginBottom:"52px", animation:"reveal-up 0.8s ease both" }}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              padding:"5px 16px", borderRadius:"999px",
              background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.3)",
              marginBottom:"22px", animation:"chip-float 4s ease-in-out infinite",
            }}>
              <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#818cf8", display:"inline-block", boxShadow:"0 0 8px #818cf8", animation:"pulse-dot 2s infinite" }} />
              <span style={{ color:"#a5b4fc", fontSize:"11px", fontWeight:700, letterSpacing:"3px", textTransform:"uppercase", fontFamily:"'Trebuchet MS',sans-serif" }}>
                4 Tracks · ₹45,000 Each
              </span>
            </div>

            <h2 style={{ fontFamily:"'Trebuchet MS',sans-serif", fontSize:"clamp(34px,6vw,58px)", fontWeight:900, letterSpacing:"-2px", lineHeight:1, margin:"0 0 28px", color:"#fff" }}>
              Prize{" "}
              <span style={{ background:"linear-gradient(90deg,#6366f1,#38bdf8,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Pool
              </span>
            </h2>

            {/* Big total counter */}
            <div style={{
              display:"inline-flex", flexDirection:"column", alignItems:"center",
              padding:"28px 56px", borderRadius:"24px",
              background:"rgba(255,255,255,0.03)", border:"1px solid rgba(99,102,241,0.2)",
              backdropFilter:"blur(14px)",
              boxShadow:"0 0 80px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.07)",
              position:"relative", overflow:"hidden",
            }}>
              <div style={{ position:"absolute", top:0, left:"20%", right:"20%", height:"1px", background:"linear-gradient(90deg,transparent,rgba(99,102,241,0.6),rgba(56,189,248,0.4),transparent)" }} />
              <div style={{ color:"#64748b", fontSize:"11px", fontWeight:700, letterSpacing:"3px", textTransform:"uppercase", fontFamily:"'Trebuchet MS',sans-serif", marginBottom:"8px" }}>
                Total Prize Money
              </div>
              <div style={{ display:"flex", alignItems:"baseline", gap:"6px", lineHeight:1 }}>
                <span style={{ fontSize:"clamp(22px,4vw,36px)", fontWeight:900, color:"rgba(99,102,241,0.65)", fontFamily:"'Trebuchet MS',sans-serif" }}>₹</span>
                <span className="total-num" style={{ fontSize:"clamp(52px,9vw,92px)", fontWeight:900, color:"#fff", fontFamily:"'Trebuchet MS',sans-serif", letterSpacing:"-4px", lineHeight:1 }}>
                  {total.toLocaleString("en-IN")}
                </span>
              </div>
              <div style={{ color:"#475569", fontSize:"13px", fontWeight:500, fontFamily:"'Trebuchet MS',sans-serif", marginTop:"8px" }}>
                in exciting prizes up for grabs
              </div>
              <div className="equal-strip">
                {TRACKS.map((t, i) => (
                  <div key={i} style={{
                    padding:"4px 14px", borderRadius:"999px",
                    background:`${t.soft}0.1)`, border:`1px solid ${t.soft}0.28)`,
                    color:t.color, fontSize:"11px", fontWeight:700,
                    fontFamily:"'Trebuchet MS',sans-serif", letterSpacing:"0.5px",
                    animation:`float-badge ${3.5 + i * 0.4}s ease-in-out infinite`,
                    animationDelay:`${i * 0.25}s`,
                  }}>
                    {t.label} · ₹45K
                  </div>
                ))}
              </div>
            </div>

            {/* Podium divider */}
            <div className="podium-divider">
              <div className="podium-divider-line" />
              <span className="podium-divider-text">Per-Track Prize Structure</span>
              <div className="podium-divider-line" />
            </div>

            {/* Podium */}
            <div className="podium-wrapper">
              {PRIZE_TIERS.map((tier, i) => (
                <div key={i} className="podium-item" style={{ "--glow-color":`${tier.glow}0.5)` } as React.CSSProperties}>
                  <div className="podium-medal" style={{ animationDelay:`${i * 0.4}s` }}>{tier.icon}</div>
                  <div className="podium-amount" style={{ color:tier.color }}>{tier.amount}</div>
                  <div className="podium-rank-label" style={{ color:tier.color }}>{tier.rank} Place</div>
                  <div className="podium-block" style={{
                    height:tier.height,
                    background:`linear-gradient(180deg, ${tier.glow}0.18) 0%, ${tier.glow}0.06) 100%)`,
                    border:`1px solid ${tier.glow}0.35)`,
                    color:tier.color,
                    boxShadow:`0 0 24px ${tier.glow}0.15), inset 0 1px 0 ${tier.glow}0.2)`,
                  }}>
                    {tier.rank}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tracks Section ── */}
          <div>
            {/* Section heading */}
            <div style={{ textAlign:"center", marginBottom:"36px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"16px" }}>
                <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg, transparent, rgba(99,102,241,0.4))" }} />
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:"8px",
                  padding:"6px 20px", borderRadius:"999px",
                  background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.22)",
                }}>
                  <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#818cf8", display:"block", boxShadow:"0 0 6px #818cf8" }} />
                  <span style={{ fontSize:"10px", fontWeight:700, letterSpacing:"3px", color:"#818cf8", fontFamily:"'Trebuchet MS', sans-serif" }}>
                    COMPETITION TRACKS
                  </span>
                </div>
                <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />
              </div>
              <p style={{ margin:0, fontSize:"13px", color:"rgba(255,255,255,0.32)", fontFamily:"'Trebuchet MS', sans-serif" }}>
                Choose your domain and build solutions that matter
              </p>
            </div>

            {/* Track cards */}
            <div className="tracks-flex">
              {TRACKS.map((track, i) => (
                <TrackCard key={track.id} track={track} visible={secInView} delay={i * 100} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}