'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL = 180000;

const TRACK_COLORS = [
  { color: '#6366f1', soft: 'rgba(99,102,241,',  label: 'Track I'   },
  { color: '#38bdf8', soft: 'rgba(56,189,248,',   label: 'Track II'  },
  { color: '#a78bfa', soft: 'rgba(167,139,250,',  label: 'Track III' },
  { color: '#34d399', soft: 'rgba(52,211,153,',   label: 'Track IV'  },
];

const PRIZE_TIERS = [
  { rank: '1st', amount: 25000, icon: '🥇', heightPct: 100 },
  { rank: '2nd', amount: 15000, icon: '🥈', heightPct: 68  },
  { rank: '3rd', amount: 10000, icon: '🥉', heightPct: 46  },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold }
    );
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

/* ── Single track vault card ── */
function TrackVault({ track, index, active }: {
  track: typeof TRACK_COLORS[0];
  index: number;
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView();
  const { color, soft, label } = track;

  // Podium order: 2nd | 1st | 3rd
  const podiumOrder = [PRIZE_TIERS[1], PRIZE_TIERS[0], PRIZE_TIERS[2]];
  const podiumHeights = [PRIZE_TIERS[1].heightPct, PRIZE_TIERS[0].heightPct, PRIZE_TIERS[2].heightPct];
  const podiumDelays = [120, 0, 240];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? (hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)')
          : 'translateY(40px) scale(0.96)',
        transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${index * 110}ms,
                     transform 0.5s cubic-bezier(.22,1,.36,1)`,
        background: hovered
          ? `linear-gradient(155deg, ${soft}0.16) 0%, ${soft}0.06) 60%, rgba(255,255,255,0.02) 100%)`
          : `linear-gradient(155deg, ${soft}0.08) 0%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid ${hovered ? `${soft}0.5)` : `${soft}0.2)`}`,
        borderRadius: '22px',
        backdropFilter: 'blur(14px)',
        boxShadow: hovered
          ? `0 24px 64px ${soft}0.22), 0 0 0 1px ${soft}0.08), inset 0 1px 0 rgba(255,255,255,0.1)`
          : `inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.3)`,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        padding: '22px 18px 20px',
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: '2px',
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: hovered ? 1 : 0.35,
        transition: 'opacity 0.4s',
        borderRadius: '999px',
      }} />

      {/* Radial corner bloom */}
      <div style={{
        position: 'absolute', top: '-20px', right: '-20px',
        width: '120px', height: '120px',
        background: `radial-gradient(circle, ${soft}0.18) 0%, transparent 70%)`,
        pointerEvents: 'none',
        transition: 'opacity 0.4s',
        opacity: hovered ? 1 : 0.5,
      }} />

      {/* Track label + total */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div style={{
          padding: '4px 12px', borderRadius: '999px',
          background: `${soft}0.12)`,
          border: `1px solid ${soft}0.28)`,
          color: color,
          fontSize: '10px', fontWeight: 800, letterSpacing: '2.5px',
          textTransform: 'uppercase', fontFamily: "'Trebuchet MS',sans-serif",
        }}>{label}</div>

        <div style={{ textAlign: 'right' }}>
          <div style={{
            color: color, fontSize: '20px', fontWeight: 900,
            fontFamily: "'Trebuchet MS',sans-serif", lineHeight: 1,
            textShadow: hovered ? `0 0 20px ${soft}0.6)` : 'none',
            transition: 'text-shadow 0.3s',
          }}>₹45K</div>
          <div style={{ color: '#334155', fontSize: '8px', fontWeight: 700, letterSpacing: '1.5px', fontFamily: "'Trebuchet MS',sans-serif" }}>
            PER TRACK
          </div>
        </div>
      </div>

      {/* ── Podium bars ── */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        gap: '6px', height: '108px', marginBottom: '14px',
      }}>
        {podiumOrder.map((tier, pi) => {
          const isFirst = tier.rank === '1st';
          const h = podiumHeights[pi];
          return (
            <div key={pi} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              {/* Amount above bar */}
              <div style={{
                fontSize: isFirst ? '10px' : '9px',
                fontWeight: 800, color: isFirst ? color : `${soft}0.55)`,
                fontFamily: "'Trebuchet MS',sans-serif",
                whiteSpace: 'nowrap',
                opacity: (active && inView) ? 1 : 0,
                transform: (active && inView) ? 'translateY(0)' : 'translateY(6px)',
                transition: `opacity 0.5s ease ${podiumDelays[pi] + 500}ms, transform 0.5s ease ${podiumDelays[pi] + 500}ms`,
              }}>
                ₹{tier.amount / 1000}K
              </div>
              {/* Emoji */}
              <div style={{
                fontSize: isFirst ? '14px' : '11px',
                opacity: (active && inView) ? 1 : 0,
                transition: `opacity 0.4s ease ${podiumDelays[pi] + 400}ms`,
              }}>{tier.icon}</div>
              {/* Bar */}
              <div style={{
                width: '100%', borderRadius: '5px 5px 2px 2px',
                height: (active && inView) ? `${h}%` : '0%',
                minHeight: (active && inView) ? `${Math.round(h * 1.08)}px` : '0px',
                background: isFirst
                  ? `linear-gradient(to top, ${color} 0%, ${soft}0.55) 100%)`
                  : `linear-gradient(to top, ${soft}0.4) 0%, ${soft}0.15) 100%)`,
                border: `1px solid ${isFirst ? `${soft}0.7)` : `${soft}0.25)`}`,
                boxShadow: isFirst ? `0 0 20px ${soft}0.45), inset 0 1px 0 rgba(255,255,255,0.2)` : 'none',
                transition: `min-height 0.75s cubic-bezier(.22,1,.36,1) ${podiumDelays[pi]}ms`,
                position: 'relative', overflow: 'hidden',
              }}>
                {isFirst && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 55%)',
                    borderRadius: 'inherit',
                  }} />
                )}
              </div>
              {/* Rank */}
              <div style={{
                fontSize: '8px', fontWeight: 800, letterSpacing: '1px',
                color: `${soft}0.5)`, fontFamily: "'Trebuchet MS',sans-serif",
              }}>{tier.rank}</div>
            </div>
          );
        })}
      </div>

      {/* Separator */}
      <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${soft}0.25), transparent)`, marginBottom: '12px' }} />

      {/* Prize row list */}
      {PRIZE_TIERS.map((tier, ti) => (
        <div key={ti} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '5px 8px', borderRadius: '7px', marginBottom: ti < 2 ? '4px' : 0,
          background: ti === 0 ? `${soft}0.1)` : 'transparent',
          border: ti === 0 ? `1px solid ${soft}0.18)` : '1px solid transparent',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px' }}>{tier.icon}</span>
            <span style={{
              fontSize: '11px', fontWeight: 700, fontFamily: "'Trebuchet MS',sans-serif",
              color: ti === 0 ? '#e2e8f0' : '#475569',
            }}>{tier.rank} Place</span>
          </div>
          <span style={{
            fontSize: '12px', fontWeight: 800, fontFamily: "'Trebuchet MS',sans-serif",
            color: ti === 0 ? color : '#374151',
          }}>₹{tier.amount.toLocaleString('en-IN')}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Main ── */
export default function PrizePool() {
  const [secRef, secInView] = useInView(0.05);
  const total = useCounter(TOTAL, secInView, 2400);

  return (
    <>
      <style>{`
        @keyframes grid-scroll { 0%{transform:translateY(0)} 100%{transform:translateY(60px)} }
        @keyframes orb-drift   { 0%,100%{transform:translate(0,0) scale(1);opacity:.14;} 50%{transform:translate(24px,-18px) scale(1.07);opacity:.22;} }
        @keyframes reveal-up   { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        @keyframes chip-float  { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-5px);} }
        @keyframes pulse-dot   { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.65);} 70%{box-shadow:0 0 0 9px rgba(99,102,241,0);} }
        @keyframes total-glow  { 0%,100%{text-shadow:0 0 40px rgba(99,102,241,0.35);} 50%{text-shadow:0 0 80px rgba(99,102,241,0.65),0 0 120px rgba(56,189,248,0.25);} }
        @keyframes shimmer-sweep { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
        @keyframes float-badge { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }

        .total-num { animation: total-glow 3s ease-in-out infinite; }

        .tracks-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 1080px) {
          .tracks-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
        @media (max-width: 540px) {
          .tracks-grid { grid-template-columns: 1fr; gap: 12px; }
        }

        /* Equal prizes strip */
        .equal-strip {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 14px;
        }
      `}</style>

      <section
        ref={secRef}
        id="prizes"
        style={{
          background: 'linear-gradient(180deg,#060c1a 0%,#080f20 55%,#060c1a 100%)',
          position: 'relative', padding: '88px 0 104px', overflow: 'hidden',
        }}
      >
        {/* BG grid */}
        <div style={{ position:'absolute',inset:0,opacity:0.04,pointerEvents:'none' }}>
          <div style={{
            position:'absolute',inset:0,
            backgroundImage:`linear-gradient(rgba(99,102,241,0.6) 1px,transparent 1px),
                             linear-gradient(90deg,rgba(99,102,241,0.6) 1px,transparent 1px)`,
            backgroundSize:'60px 60px',
            animation:'grid-scroll 12s linear infinite',
          }}/>
        </div>

        {/* Orbs */}
        <div style={{position:'absolute',top:'-120px',right:'-120px',width:'520px',height:'520px',background:'radial-gradient(circle,rgba(99,102,241,0.16) 0%,transparent 70%)',borderRadius:'50%',animation:'orb-drift 9s ease-in-out infinite',pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:'-120px',left:'-120px',width:'480px',height:'480px',background:'radial-gradient(circle,rgba(56,189,248,0.12) 0%,transparent 70%)',borderRadius:'50%',animation:'orb-drift 11s ease-in-out infinite reverse',pointerEvents:'none'}}/>
        <div style={{position:'absolute',top:'35%',left:'50%',transform:'translate(-50%,-50%)',width:'700px',height:'300px',background:'radial-gradient(ellipse,rgba(99,102,241,0.05) 0%,transparent 70%)',pointerEvents:'none'}}/>

        <div style={{ maxWidth:'1160px', margin:'0 auto', padding:'0 20px', position:'relative', zIndex:1 }}>

          {/* ── Header ── */}
          <div style={{ textAlign:'center', marginBottom:'52px', animation:'reveal-up 0.8s ease both' }}>

            {/* Badge chip */}
            <div style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'5px 16px', borderRadius:'999px',
              background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.3)',
              marginBottom:'22px', animation:'chip-float 4s ease-in-out infinite',
            }}>
              <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#818cf8',display:'inline-block',boxShadow:'0 0 8px #818cf8',animation:'pulse-dot 2s infinite'}}/>
              <span style={{color:'#a5b4fc',fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',fontFamily:"'Trebuchet MS',sans-serif"}}>4 Tracks · ₹45,000 Each</span>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily:"'Trebuchet MS',sans-serif",
              fontSize:'clamp(34px,6vw,58px)',
              fontWeight:900, letterSpacing:'-2px', lineHeight:1, margin:'0 0 28px', color:'#fff',
            }}>
              Prize{' '}
              <span style={{
                background:'linear-gradient(90deg,#6366f1,#38bdf8,#a78bfa)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>Pool</span>
            </h2>

            {/* ── Big total counter ── */}
            <div style={{
              display:'inline-flex', flexDirection:'column', alignItems:'center',
              padding:'28px 56px', borderRadius:'24px',
              background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(99,102,241,0.2)',
              backdropFilter:'blur(14px)',
              boxShadow:'0 0 80px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.07)',
              position:'relative', overflow:'hidden',
            }}>
              {/* Inner top shimmer */}
              <div style={{
                position:'absolute',top:0,left:'20%',right:'20%',height:'1px',
                background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.6),rgba(56,189,248,0.4),transparent)',
              }}/>

              <div style={{ color:'#334155', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', fontFamily:"'Trebuchet MS',sans-serif", marginBottom:'8px' }}>
                Total Prize Money
              </div>
              <div style={{ display:'flex', alignItems:'baseline', gap:'6px', lineHeight:1 }}>
                <span style={{ fontSize:'clamp(22px,4vw,36px)', fontWeight:900, color:'rgba(99,102,241,0.65)', fontFamily:"'Trebuchet MS',sans-serif" }}>₹</span>
                <span
                  className="total-num"
                  style={{
                    fontSize:'clamp(52px,9vw,92px)', fontWeight:900,
                    color:'#fff', fontFamily:"'Trebuchet MS',sans-serif",
                    letterSpacing:'-4px', lineHeight:1,
                  }}
                >{total.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ color:'#475569', fontSize:'13px', fontWeight:500, fontFamily:"'Trebuchet MS',sans-serif", marginTop:'8px' }}>
                in exciting prizes up for grabs
              </div>

              {/* 4 equal badge pills */}
              <div className="equal-strip">
                {TRACK_COLORS.map((t, i) => (
                  <div key={i} style={{
                    padding:'4px 14px', borderRadius:'999px',
                    background:`${t.soft}0.1)`,
                    border:`1px solid ${t.soft}0.28)`,
                    color: t.color,
                    fontSize:'11px', fontWeight:700,
                    fontFamily:"'Trebuchet MS',sans-serif",
                    letterSpacing:'0.5px',
                    animation:`float-badge ${3.5 + i * 0.4}s ease-in-out infinite`,
                    animationDelay:`${i * 0.25}s`,
                  }}>
                    {t.label} · ₹45K
                  </div>
                ))}
              </div>
            </div>

            {/* Structure hint */}
            <p style={{
              color:'#334155', fontSize:'13px',
              fontFamily:"'Trebuchet MS',sans-serif",
              marginTop:'18px', letterSpacing:'0.3px',
            }}>
              Each track: &nbsp;
              <span style={{color:'#fbbf24', fontWeight:700}}>🥇 ₹25,000</span>
              &nbsp;+&nbsp;
              <span style={{color:'#94a3b8', fontWeight:700}}>🥈 ₹15,000</span>
              &nbsp;+&nbsp;
              <span style={{color:'#92400e', fontWeight:700}}>🥉 ₹10,000</span>
            </p>
          </div>

          {/* ── Track vaults grid ── */}
          <div className="tracks-grid">
            {TRACK_COLORS.map((track, i) => (
              <TrackVault key={i} track={track} index={i} active={secInView} />
            ))}
          </div>

          {/* Bottom note */}
          <div style={{
            marginTop:'36px', padding:'13px 20px', borderRadius:'12px',
            background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)',
            display:'flex', alignItems:'flex-start', gap:'10px',
            maxWidth:'660px', margin:'36px auto 0',
          }}>
            <span style={{fontSize:'15px',flexShrink:0}}>📌</span>
            <span style={{color:'#334155',fontSize:'12px',fontFamily:"'Trebuchet MS',sans-serif",lineHeight:1.6}}>
              Prizes are awarded per track independently. Goodies &amp; certificates will be distributed to all participants regardless of ranking.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}