'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL = 180000;

const TRACK_COLORS = [
  { color: '#7c83ff', glow: '#6366f1', soft: 'rgba(124,131,255,',  label: 'Track I',   rgb: '124,131,255',  accent: '#d9ddff' },
  { color: '#3ec7ff', glow: '#0ea5e9', soft: 'rgba(62,199,255,',   label: 'Track II',  rgb: '62,199,255',   accent: '#d6f4ff' },
  { color: '#b892ff', glow: '#a78bfa', soft: 'rgba(184,146,255,',  label: 'Track III', rgb: '184,146,255',  accent: '#efe3ff' },
  { color: '#2ee6b8', glow: '#10b981', soft: 'rgba(46,230,184,',   label: 'Track IV',  rgb: '46,230,184',   accent: '#d4fff1' },
];

const PRIZE_TIERS = [
  { rank: '1st', amount: 20000, icon: '🥇', heightPct: 100 },
  { rank: '2nd', amount: 15000, icon: '🥈', heightPct: 68  },
  { rank: '3rd', amount: 10000, icon: '🥉', heightPct: 46  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function useCounter(target, active, duration = 2600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const ease = (t) => 1 - Math.pow(1 - t, 4);
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(ease(p) * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

function TrackVault({ track, index, active }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView();
  const { color, glow, soft, label, rgb, accent } = track;
  const podiumOrder  = [PRIZE_TIERS[1], PRIZE_TIERS[0], PRIZE_TIERS[2]];
  const podiumDelays = [140, 0, 280];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? (hovered
              ? 'translateY(-14px) scale(1.03) rotateX(3deg)'
              : 'translateY(0) scale(1)')
          : 'translateY(60px) scale(0.93)',
        transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${index * 90}ms,
          transform ${inView ? '0.5s' : '0.75s'} cubic-bezier(.22,1,.36,1) ${inView ? '0ms' : `${index * 90}ms`},
          box-shadow 0.45s ease, border-color 0.45s ease, background 0.45s ease`,
        background: `linear-gradient(155deg, rgba(${rgb},${hovered ? '0.16' : '0.08'}) 0%, rgba(255,255,255,0.02) 60%, rgba(0,0,0,0.1) 100%)`,
        border: `1px solid rgba(${rgb},${hovered ? '0.65' : '0.08'})`,
        borderRadius: '24px',
        backdropFilter: 'blur(28px)',
        boxShadow: hovered
          ? `0 24px 60px rgba(${rgb},0.18),0 0 0 1px rgba(${rgb},0.08),inset 0 1px 0 rgba(255,255,255,0.12),inset 0 -1px 0 rgba(0,0,0,0.25)`
          : `0 8px 48px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.05),inset 0 -1px 0 rgba(0,0,0,0.2)`,
        position: 'relative', overflow: 'hidden', cursor: 'pointer',
        padding: '26px 22px 24px',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Top animated border */}
      <div style={{ position:'absolute',top:0,left:0,right:0,height:'2px',
        background:`linear-gradient(90deg,transparent,${color},${accent},${color},transparent)`,
        opacity: hovered ? 1 : 0.35, transition:'opacity 0.45s ease' }} />
      {/* Top-right bloom */}
      <div style={{ position:'absolute',top:'-70px',right:'-70px',width:'220px',height:'220px',
        background:`radial-gradient(circle,rgba(${rgb},${hovered?'0.28':'0.12'}) 0%,transparent 65%)`,
        borderRadius:'50%',pointerEvents:'none',transition:'all 0.6s ease' }} />
      {/* Bottom-left bloom */}
      <div style={{ position:'absolute',bottom:'-30px',left:'-30px',width:'120px',height:'120px',
        background:`radial-gradient(circle,rgba(${rgb},0.07) 0%,transparent 70%)`,
        borderRadius:'50%',pointerEvents:'none' }} />
      {/* Card texture */}
      <div style={{ position:'absolute',inset:0,opacity:0.012,pointerEvents:'none',
        backgroundImage:`linear-gradient(rgba(${rgb},1) 1px,transparent 1px),linear-gradient(90deg,rgba(${rgb},1) 1px,transparent 1px)`,
        backgroundSize:'22px 22px',borderRadius:'inherit' }} />

      {/* Header */}
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'22px',position:'relative',zIndex:1 }}>
        <div style={{ display:'flex',alignItems:'center',gap:'8px',padding:'5px 14px',borderRadius:'999px',
          background:`rgba(${rgb},0.1)`,border:`1px solid rgba(${rgb},0.28)` }}>
          <span style={{ width:'7px',height:'7px',borderRadius:'50%',background:color,
            boxShadow:`0 0 10px ${color},0 0 20px rgba(${rgb},0.4)`,display:'inline-block',flexShrink:0 }} />
          <span style={{ color:accent,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',
            textTransform:'uppercase',fontFamily:"'Outfit','Trebuchet MS',sans-serif" }}>{label}</span>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ color:color,fontSize:'24px',fontWeight:500,
            fontFamily:"'DM Mono','Courier New',monospace",lineHeight:1,letterSpacing:'-1px',
            textShadow: hovered ? `0 0 30px rgba(${rgb},0.8),0 0 60px rgba(${rgb},0.3)` : `0 0 20px rgba(${rgb},0.3)`,
            transition:'text-shadow 0.4s ease' }}>₹45K</div>
          <div style={{ color:'#fbbf24',fontSize:'8px',fontWeight:700,letterSpacing:'2px',
            textTransform:'uppercase',fontFamily:"'Outfit',sans-serif",marginTop:'2px' }}>PER TRACK</div>
        </div>
      </div>

      {/* Podium */}
      <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'center',
        gap:'8px',height:'130px',marginBottom:'18px',position:'relative',zIndex:1 }}>
        <div style={{ position:'absolute',bottom:0,left:0,right:0,height:'1px',
          background:`linear-gradient(90deg,transparent,rgba(${rgb},0.3),transparent)` }} />
        {podiumOrder.map((tier, pi) => {
          const isFirst  = tier.rank === '1st';
          const isSecond = tier.rank === '2nd';
          const barAlpha = isFirst ? 1 : isSecond ? 0.55 : 0.32;
          return (
            <div key={pi} style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'4px' }}>
              <div style={{ fontSize:isFirst?'11px':'9px',fontWeight:500,
                fontFamily:"'DM Mono',monospace",color:isFirst?accent:`rgba(${rgb},0.5)`,whiteSpace:'nowrap',
                opacity:(active&&inView)?1:0,transform:(active&&inView)?'translateY(0)':'translateY(10px)',
                transition:`opacity 0.55s ease ${podiumDelays[pi]+540}ms,transform 0.55s ease ${podiumDelays[pi]+540}ms` }}>
                ₹{tier.amount/1000}K
              </div>
              <div style={{ fontSize:isFirst?'17px':'13px',lineHeight:1,
                opacity:(active&&inView)?1:0,
                transform:(active&&inView)?'scale(1) rotate(0deg)':'scale(0.3) rotate(-25deg)',
                transition:`opacity 0.45s ease ${podiumDelays[pi]+400}ms,transform 0.5s cubic-bezier(.34,1.56,.64,1) ${podiumDelays[pi]+400}ms` }}>
                {tier.icon}
              </div>
              <div style={{ width:'100%',height:(active&&inView)?`${tier.heightPct}%`:'0%',
                transform:(active&&inView)?'translateY(0)':'translateY(8px)',
                borderRadius:'6px 6px 2px 2px',
                background:isFirst?`linear-gradient(to top,${glow} 0%,${color} 55%,${accent}88 100%)`
                  :`linear-gradient(to top,rgba(${rgb},${barAlpha*0.85}) 0%,rgba(${rgb},${barAlpha*0.22}) 100%)`,
                border:`1px solid rgba(${rgb},${isFirst?0.82:0.18})`,
                boxShadow:isFirst?`0 0 32px rgba(${rgb},0.6),0 0 70px rgba(${rgb},0.22),inset 0 1px 0 rgba(255,255,255,0.32)`:'none',
                transition:`height 0.9s cubic-bezier(.22,1,.36,1) ${podiumDelays[pi]}ms`,
                position:'relative',overflow:'hidden' }}>
                {isFirst && (
                  <>
                    <div style={{ position:'absolute',top:0,left:0,right:0,height:'45%',
                      background:'linear-gradient(to bottom,rgba(255,255,255,0.28),transparent)',borderRadius:'inherit' }} />
                    <div style={{ position:'absolute',inset:0,
                      background:`linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.18) 50%,transparent 65%)`,
                      backgroundSize:'300% 100%',animation:'bar-shimmer 3s ease-in-out infinite 1.2s' }} />
                  </>
                )}
              </div>
              <div style={{ fontSize:'8px',fontWeight:600,letterSpacing:'1.5px',color:`rgba(${rgb},0.42)`,
                fontFamily:"'Outfit',sans-serif",textTransform:'uppercase' }}>{tier.rank}</div>
            </div>
          );
        })}
      </div>

      {/* Separator */}
      <div style={{ height:'1px',marginBottom:'14px',position:'relative',zIndex:1,
        background:`linear-gradient(90deg,transparent,rgba(${rgb},0.25),transparent)` }} />

      {/* Prize rows */}
      <div style={{ position:'relative',zIndex:1 }}>
        {PRIZE_TIERS.map((tier, ti) => (
          <div key={ti} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',
            padding:'8px 12px',borderRadius:'12px',marginBottom:ti<2?'6px':0,
            background:ti===0?`rgba(${rgb},0.1)`:ti===1?`rgba(${rgb},0.04)`:'transparent',
            border:`1px solid rgba(${rgb},${ti===0?'0.22':ti===1?'0.07':'0.03'})` }}>
            <div style={{ display:'flex',alignItems:'center',gap:'9px' }}>
              <span style={{ fontSize:'14px',lineHeight:1 }}>{tier.icon}</span>
              <span style={{ fontSize:'12px',fontWeight:600,fontFamily:"'Outfit',sans-serif",
                color:ti===0?'#f1f5f9':ti===1?'#64748b':'#374151',letterSpacing:'0.2px' }}>{tier.rank} Place</span>
            </div>
            <span style={{ fontSize:'13px',fontWeight:500,fontFamily:"'DM Mono',monospace",
              color:ti===0?color:ti===1?`rgba(${rgb},0.52)`:'#1e293b',letterSpacing:'-0.5px' }}>
              ₹{tier.amount.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCarousel({ active }) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);
  const TOTAL_TRACKS = TRACK_COLORS.length;

  const goTo = useCallback((idx) => {
    setCurrent((idx + TOTAL_TRACKS) % TOTAL_TRACKS);
  }, [TOTAL_TRACKS]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % TOTAL_TRACKS);
    }, 3000);
  }, [TOTAL_TRACKS]);

  useEffect(() => {
    resetAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, [resetAutoPlay]);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setDragOffset(0);
    clearInterval(autoPlayRef.current);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - dragStart;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 60) {
      if (dragOffset < 0) goTo(current + 1);
      else goTo(current - 1);
    }
    setDragOffset(0);
    resetAutoPlay();
  };

  // Mouse drag support too
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
    clearInterval(autoPlayRef.current);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStart);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 60) {
      if (dragOffset < 0) goTo(current + 1);
      else goTo(current - 1);
    }
    setDragOffset(0);
    resetAutoPlay();
  };

  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      {/* Carousel viewport */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab', borderRadius: '24px' }}
      >
        <div style={{
          display: 'flex',
          transform: `translateX(calc(${-current * 100}% + ${dragOffset}px))`,
          transition: isDragging ? 'none' : 'transform 0.55s cubic-bezier(.22,1,.36,1)',
          willChange: 'transform',
        }}>
          {TRACK_COLORS.map((track, i) => (
            <div key={i} style={{ minWidth: '100%', padding: '4px' }}>
              <TrackVault track={track} index={i} active={active} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={() => { goTo(current - 1); resetAutoPlay(); }}
        style={{
          position: 'absolute', left: '-14px', top: '50%', transform: 'translateY(-50%)',
          width: '34px', height: '34px', borderRadius: '50%', border: 'none',
          background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff', fontSize: '16px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          transition: 'background 0.2s ease, transform 0.2s ease',
          zIndex: 10,
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
      >‹</button>
      <button
        onClick={() => { goTo(current + 1); resetAutoPlay(); }}
        style={{
          position: 'absolute', right: '-14px', top: '50%', transform: 'translateY(-50%)',
          width: '34px', height: '34px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff', fontSize: '16px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          transition: 'background 0.2s ease',
          zIndex: 10,
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
      >›</button>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
        {TRACK_COLORS.map((track, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetAutoPlay(); }}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '999px',
              background: i === current ? track.color : 'rgba(255,255,255,0.18)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s cubic-bezier(.22,1,.36,1)',
              boxShadow: i === current ? `0 0 12px ${track.color}88` : 'none',
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div style={{
        height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px',
        marginTop: '12px', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${((current + 1) / TOTAL_TRACKS) * 100}%`,
          background: `linear-gradient(90deg, ${TRACK_COLORS[current].glow}, ${TRACK_COLORS[current].color})`,
          borderRadius: '999px',
          transition: 'width 0.55s cubic-bezier(.22,1,.36,1)',
          boxShadow: `0 0 8px ${TRACK_COLORS[current].color}88`,
        }} />
      </div>

      {/* Swipe hint — only first render */}
      <div style={{
        textAlign: 'center', marginTop: '10px',
        color: 'rgba(255,255,255,0.25)', fontSize: '11px',
        fontFamily: "'Outfit',sans-serif", letterSpacing: '1.5px',
        textTransform: 'uppercase', fontWeight: 500,
      }}>
        swipe or drag to explore
      </div>
    </div>
  );
}

function Sparkle({ x, y, color, delay }) {
  return (
    <div style={{ position:'absolute',left:x,top:y,width:'3px',height:'3px',borderRadius:'50%',
      background:color,boxShadow:`0 0 8px ${color},0 0 16px ${color}`,
      animation:`sparkle-fade 3s ease-in-out infinite`,animationDelay:delay,
      pointerEvents:'none',zIndex:0 }} />
  );
}

export default function PrizePool() {
  const [secRef, secInView] = useInView(0.05);
  const [isMobile, setIsMobile] = useState(false);
  const total = useCounter(TOTAL, secInView, 2600);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const sparkles = [
    { x:'6%',  y:'14%', color:'#818cf8', delay:'0s'   },
    { x:'93%', y:'9%',  color:'#38bdf8', delay:'0.7s' },
    { x:'14%', y:'80%', color:'#c4b5fd', delay:'1.4s' },
    { x:'87%', y:'75%', color:'#34d399', delay:'0.4s' },
    { x:'50%', y:'4%',  color:'#fbbf24', delay:'2s'   },
    { x:'2%',  y:'50%', color:'#818cf8', delay:'1s'   },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Outfit:wght@400;500;600;700;800;900&display=swap');

        @keyframes grid-scroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(70px); }
        }
        @keyframes orb-float {
          0%,100% { transform: translate(0,0) scale(1); }
          33%     { transform: translate(22px,-28px) scale(1.06); }
          66%     { transform: translate(-18px,12px) scale(0.97); }
        }
        @keyframes reveal-up {
          from { opacity:0; transform:translateY(44px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes counter-in {
          from { opacity:0; transform:translateY(24px) scale(0.96); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes chip-bob {
          0%,100% { transform:translateY(0) rotate(-0.5deg); }
          50%      { transform:translateY(-6px) rotate(0.5deg); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(99,102,241,0.85); }
          70%  { box-shadow: 0 0 0 10px rgba(99,102,241,0); }
          100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
        }
        @keyframes total-breathe {
          0%,100% { text-shadow: 0 0 80px rgba(99,102,241,0.45), 0 6px 0 rgba(0,0,0,0.6); }
          50%      { text-shadow: 0 0 130px rgba(99,102,241,0.78), 0 0 250px rgba(56,189,248,0.28), 0 6px 0 rgba(0,0,0,0.6); }
        }
        @keyframes badge-bob {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-5px); }
        }
        @keyframes bar-shimmer {
          0%   { background-position: -300% 0; }
          100% { background-position: 300% 0; }
        }
        @keyframes sparkle-fade {
          0%,100% { opacity:0; transform:scale(0.4); }
          45%,55% { opacity:1; transform:scale(1.6); }
        }
        @keyframes card-sweep {
          from { transform:translateX(-200%) skewX(-15deg); }
          to   { transform:translateX(400%) skewX(-15deg); }
        }

        .prize-section {
          background: linear-gradient(180deg, #060c1a 0%, #080f20 55%, #060c1a 100%);
          position: relative;
          padding: 104px 0 128px;
          overflow: hidden;
        }

        .tracks-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 18px;
        }
        @media (max-width: 1120px) {
          .tracks-grid { grid-template-columns: repeat(2,1fr); gap: 16px; }
        }
        @media (max-width: 640px) {
          .tracks-grid { display: none; }
          .prize-section { padding: 72px 0 88px; }
          .counter-card  { padding: 26px 20px !important; }
        }
        @media (max-width: 400px) {
          .counter-card { padding: 20px 14px !important; }
        }

        .mobile-carousel-wrapper {
          display: none;
        }
        @media (max-width: 640px) {
          .mobile-carousel-wrapper {
            display: block;
            padding: 0 28px;
          }
        }

        .counter-num {
          font-family: 'Bebas Neue', 'Trebuchet MS', sans-serif !important;
          font-weight: 400 !important;
          letter-spacing: 1px;
          animation: total-breathe 4.5s ease-in-out infinite;
        }
        .f-display { font-family: 'Bebas Neue', 'Trebuchet MS', sans-serif; font-weight: 400; }
        .f-body    { font-family: 'Outfit', 'Trebuchet MS', sans-serif; }
        .f-mono    { font-family: 'DM Mono', 'Courier New', monospace; }

        .equal-strip {
          display: flex; gap: 8px;
          justify-content: center; flex-wrap: wrap;
          margin-top: 22px;
        }
        .track-pill {
          transition: transform 0.28s cubic-bezier(.34,1.56,.64,1), box-shadow 0.28s ease;
        }
        .track-pill:hover { transform: translateY(-5px) scale(1.07) !important; }

        .bottom-note {
          margin: 44px auto 0; max-width: 720px;
          padding: 18px 24px; border-radius: 18px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: flex-start; gap: 12px;
          backdrop-filter: blur(12px);
        }
        .hint-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(255,255,255,0.1); flex-shrink: 0; align-self: center;
        }
      `}</style>

      <section ref={secRef} id="prizes" className="prize-section">

        {/* Grid */}
        <div style={{ position:'absolute',inset:0,opacity:0.018,pointerEvents:'none' }}>
          <div style={{ position:'absolute',inset:0,
            backgroundImage:`linear-gradient(rgba(99,102,241,0.9) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.9) 1px,transparent 1px)`,
            backgroundSize:'54px 54px',animation:'grid-scroll 16s linear infinite' }} />
        </div>

        {/* Orbs */}
        {[
          { s:{ top:'-200px',right:'-130px',width:'700px',height:'700px' }, c:'rgba(99,102,241,0.11)', d:'11s', r:false },
          { s:{ bottom:'-200px',left:'-130px',width:'620px',height:'620px' }, c:'rgba(56,189,248,0.07)', d:'14s', r:true },
          { s:{ top:'25%',left:'-250px',width:'500px',height:'500px' }, c:'rgba(167,139,250,0.05)', d:'17s', r:false },
          { s:{ top:'25%',right:'-250px',width:'460px',height:'460px' }, c:'rgba(52,211,153,0.04)', d:'13s', r:true },
        ].map((o, i) => (
          <div key={i} style={{ position:'absolute',...o.s,borderRadius:'50%',pointerEvents:'none',
            background:`radial-gradient(circle,${o.c} 0%,transparent 65%)`,
            animation:`orb-float ${o.d} ease-in-out infinite ${o.r?'reverse':''}` }} />
        ))}

        {/* Sparkles */}
        {sparkles.map((s, i) => <Sparkle key={i} {...s} />)}

        {/* Edge lines */}
        <div style={{ position:'absolute',top:0,left:0,right:0,height:'1px',
          background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.45),rgba(56,189,248,0.35),transparent)' }} />
        <div style={{ position:'absolute',bottom:0,left:0,right:0,height:'1px',
          background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.2),transparent)' }} />

        <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 24px',position:'relative',zIndex:1 }}>

          {/* HEADER */}
          <div style={{ textAlign:'center',marginBottom:'72px',animation:'reveal-up 0.95s cubic-bezier(.22,1,.36,1) both' }}>

            {/* Eyebrow */}
            <div style={{ display:'inline-flex',alignItems:'center',gap:'10px',padding:'7px 20px',borderRadius:'999px',
              background:'rgba(99,102,241,0.09)',border:'1px solid rgba(99,102,241,0.3)',
              backdropFilter:'blur(12px)',marginBottom:'30px',animation:'chip-bob 5s ease-in-out infinite' }}>
              <span style={{ width:'8px',height:'8px',borderRadius:'50%',background:'#818cf8',display:'inline-block',
                flexShrink:0,animation:'pulse-ring 2.5s infinite' }} />
              <span className="f-body" style={{ color:'#a5b4fc',fontSize:'11px',fontWeight:700,
                letterSpacing:'3px',textTransform:'uppercase' }}>4 Tracks · ₹45,000 Each</span>
            </div>

            {/* Title */}
            <h2 className="f-display" style={{
              fontSize:'clamp(64px,11vw,118px)',
              color:'rgba(255,255,255,0.82)',
              margin:'0 0 38px',
              lineHeight:0.9,
              letterSpacing:'3px',
              fontWeight:400
            }}>
              PRIZE{' '}
              <span style={{ background:'linear-gradient(130deg,#818cf8 0%,#38bdf8 35%,#c4b5fd 65%,#34d399 100%)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>POOL</span>
            </h2>

            {/* Counter card */}
            <div className="counter-card" style={{ display:'inline-flex',flexDirection:'column',alignItems:'center',
              padding:'38px 76px',borderRadius:'32px',
              background:`linear-gradient(150deg,rgba(99,102,241,0.1) 0%,rgba(255,255,255,0.02) 50%,rgba(0,0,0,0.18) 100%)`,
              border:'1px solid rgba(99,102,241,0.22)',backdropFilter:'blur(36px)',
              boxShadow:`
  0 40px 120px rgba(99,102,241,0.12),
  0 80px 160px rgba(0,0,0,0.6),
  inset 0 1px 0 rgba(255,255,255,0.1),
  inset 0 -1px 0 rgba(0,0,0,0.22)
`,
              position:'relative',overflow:'hidden',animation:'counter-in 1s cubic-bezier(.22,1,.36,1) 0.25s both' }}>
              {/* Top line */}
              <div style={{ position:'absolute',top:0,left:'8%',right:'8%',height:'1px',
                background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.85),rgba(56,189,248,0.65),transparent)' }} />
              {/* Sweep */}
              <div style={{ position:'absolute',top:0,bottom:0,width:'45%',pointerEvents:'none',
                background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.035),transparent)',
                animation:'card-sweep 6s ease-in-out infinite 2s' }} />

              <div className="f-body" style={{ color:'#fbbf24',fontSize:'13px',fontWeight:700,
                letterSpacing:'2.5px',textTransform:'uppercase',marginBottom:'12px' }}>Total Prize Money</div>

              <div style={{ display:'flex',alignItems:'baseline',gap:'4px',lineHeight:1 }}>
                <span className="f-mono" style={{ fontSize:'clamp(28px,5vw,50px)',fontWeight:400,
                  color:'rgba(99,102,241,0.65)',alignSelf:'flex-start',paddingTop:'10px' }}>₹</span>
                <span className="counter-num" style={{ fontSize:'clamp(72px,13vw,128px)',color:'#fff',lineHeight:1 }}>
                  {total.toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{
                fontSize:'12px',
                color:'#94a3b8',
                marginTop:'6px',
                fontFamily:"'Outfit',sans-serif",
                letterSpacing:'0.3px'
              }}>
                ₹45,000 guaranteed per track
              </div>

              <div className="f-body" style={{ color:'#475569',fontSize:'14px',fontWeight:500,marginTop:'10px',letterSpacing:'0.5px' }}>
                in exciting prizes up for grabs
              </div>

              {/* Track pills */}
              <div className="equal-strip">
                {TRACK_COLORS.map((t, i) => (
                  <div key={i} className="track-pill" style={{ padding:'6px 16px',borderRadius:'999px',
                    background:`${t.soft}0.1)`,border:`1px solid ${t.soft}0.3)`,
                    color:t.color,fontSize:'11px',fontWeight:700,
                    fontFamily:"'Outfit',sans-serif",letterSpacing:'0.3px',
                    animation:`badge-bob ${3.6+i*0.5}s ease-in-out infinite`,
                    animationDelay:`${i*0.28}s` }}>
                    {t.label} · ₹45K
                  </div>
                ))}
              </div>
            </div>

            {/* Structure hint */}
            <div className="f-body" style={{ display:'flex',alignItems:'center',justifyContent:'center',
              gap:'8px',flexWrap:'wrap',fontSize:'14px',marginTop:'24px' }}>
              <span style={{ color:'#475569',fontWeight:500 }}>Each track:</span>
              <div className="hint-dot"/>
              <span style={{ color:'#fbbf24',fontWeight:700 }}>🥇 ₹20,000</span>
              <div className="hint-dot"/>
              <span style={{ color:'#94a3b8',fontWeight:700 }}>🥈 ₹15,000</span>
              <div className="hint-dot"/>
              <span style={{ color:'#78350f',fontWeight:700 }}>🥉 ₹10,000</span>
            </div>
          </div>

          {/* DESKTOP CARDS GRID */}
          <div className="tracks-grid">
            {TRACK_COLORS.map((track, i) => (
              <TrackVault key={i} track={track} index={i} active={secInView} />
            ))}
          </div>

          {/* MOBILE CAROUSEL */}
          <div className="mobile-carousel-wrapper">
            <MobileCarousel active={secInView} />
          </div>

          {/* Bottom note */}
          <div className="bottom-note f-body">
            <span style={{ fontSize:'18px',flexShrink:0,marginTop:'2px' }}>📌</span>
            <span style={{ color:'#64748b',fontSize:'14px',lineHeight:1.72,fontWeight:500 }}>
              Prizes to be awarded per track independently.{' '}
              <span style={{ color:'#22d3ee',fontWeight:600 }}>Goodies &amp; certificates</span>{' '}
              will be distributed to all participants regardless of ranking.
            </span>
          </div>

        </div>
      </section>
    </>
  );
}