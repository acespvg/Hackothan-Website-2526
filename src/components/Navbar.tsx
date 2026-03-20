'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const NAV_LINKS: {
  label: string;
  href: string;
  comingSoon: boolean;
  download?: string;
}[] = [
  { label: 'Home',              href: '#home',              comingSoon: false },
  { label: 'Prizes',            href: '#prizes',            comingSoon: false },
  { label: 'Timeline',          href: '#timeline',          comingSoon: false },
  { label: 'Problem Statement', href: '#problem-statement', comingSoon: true  },
  { label: 'Rulebook',          href: '/IGNITION-HACKVERSE_RULEBOOK.pdf',      comingSoon: false, download: 'Ignition_HackVerse_Rulebook.pdf' },
];

export default function NavBar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [tooltip, setTooltip]       = useState<string | null>(null);

  const router = useRouter();

  const handleRegisterClick = () => router.push('/register');

  /* ── Nav click handler ── */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    comingSoon: boolean,
    label: string,
    download?: string,
  ) => {
    // If it's a download link, let the browser handle it natively — no preventDefault
    if (download) {
      setMenuOpen(false);
      return;
    }

    e.preventDefault();

    if (comingSoon) {
      setTooltip(label);
      setTimeout(() => setTooltip(null), 2000);
      return;
    }

    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveLink(id);
    setMenuOpen(false);
  };

  /* ── Shrink/frost on scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @keyframes nav-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes nav-slide-down {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes orb-drift {
          0%, 100% { transform: translateX(0) scale(1);   opacity: 0.12; }
          50%       { transform: translateX(20px) scale(1.1); opacity: 0.2; }
        }
        @keyframes grid-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(60px); }
        }
        @keyframes dot-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,220,255,0.6); }
          50%       { box-shadow: 0 0 0 5px rgba(99,220,255,0); }
        }
        @keyframes tooltip-pop {
          0%   { opacity: 0; transform: translateY(6px) translateX(-50%); }
          100% { opacity: 1; transform: translateY(0)  translateX(-50%); }
        }
        .nav-shimmer-btn { position: relative; overflow: hidden; }
        .nav-shimmer-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: nav-shimmer 2.4s linear infinite;
        }
        .nav-link-item { position: relative; }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0; right: 0;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #60a5fa, #818cf8);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.28s cubic-bezier(.22,1,.36,1);
        }
        .nav-link-item:hover::after,
        .nav-link-item.active::after { transform: scaleX(1); }
        .nav-animate-in {
          animation: nav-slide-down 0.6s cubic-bezier(.22,1,.36,1) both;
        }
        .mobile-link-glow:hover { text-shadow: 0 0 12px rgba(99,102,241,0.8); }
        .dot-pulse { animation: dot-pulse 2s ease-in-out infinite; }
        .coming-soon-tooltip {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.4);
          backdrop-filter: blur(10px);
          color: #a5b4fc;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 6px;
          pointer-events: none;
          animation: tooltip-pop 0.2s ease both;
          z-index: 100;
        }
        /* Download icon fade-in on hover */
        .rulebook-dl-icon {
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .nav-link-item:hover .rulebook-dl-icon,
        .mobile-link-glow:hover .rulebook-dl-icon {
          opacity: 1;
        }
      `}</style>

      {/* ─── Main nav bar ─── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative transition-all duration-500 p-2"
          style={{
            background: scrolled ? 'rgba(6,12,26,0.92)' : 'rgba(6,12,26,0.65)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            borderBottom: scrolled
              ? '1px solid rgba(99,102,241,0.20)'
              : '1px solid rgba(99,102,241,0.10)',
            boxShadow: scrolled
              ? '0 4px 40px rgba(6,12,26,0.7), 0 0 0 1px rgba(99,102,241,0.08)'
              : 'none',
          }}
        >
          {/* Animated grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
              animation: 'grid-drift 10s linear infinite',
            }}
          />
          {/* Orbs */}
          <div className="absolute top-[-40px] left-[-60px] w-[220px] h-[120px] rounded-full blur-7xl pointer-events-none"
            style={{ background: 'rgba(59,130,246,0.15)', animation: 'orb-drift 7s ease-in-out infinite' }} />
          <div className="absolute top-[-40px] right-[-60px] w-[200px] h-[120px] rounded-full blur-7xl pointer-events-none"
            style={{ background: 'rgba(99,102,241,0.12)', animation: 'orb-drift 9s ease-in-out infinite reverse' }} />

          <div className="relative container mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between transition-all duration-300"
              style={{ height: scrolled ? '64px' : '76px' }}>

              {/* Logo */}
              <motion.a href="#home" className="flex items-center gap-3 group"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                onClick={(e) => handleNavClick(e as React.MouseEvent<HTMLAnchorElement>, '#home', false, 'Home')}
              >
                <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                  <Image src="/igF2.png" alt="Logo" fill className="object-contain" priority />
                </div>
                <div style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                  <span className="text-3xl font-black text-white tracking-tight leading-none">
                    IGNITION{' '}
                    <span style={{
                      background: 'linear-gradient(90deg, #60a5fa, #818cf8, #a5b4fc)',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      animation: 'nav-shimmer 3s linear infinite',
                    }}>HackVerse</span>
                  </span>
                </div>
              </motion.a>

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map(({ label, href, comingSoon, download }, i) => {
                  const id = href.replace('#', '');
                  const isActive = activeLink === id;
                  return (
                    <div key={label} className="relative">
                      <motion.a
                        href={href}
                        {...(download ? { download } : {})}
                        onClick={(e) => handleNavClick(e, href, comingSoon, label, download)}
                        className={`nav-link-item${isActive ? ' active' : ''} nav-animate-in px-3 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 flex items-center gap-1.5
                          ${comingSoon ? 'cursor-not-allowed opacity-50' : ''}
                          ${isActive ? 'text-blue-500' : 'text-gray-400 hover:text-white'}`}
                        style={{
                          fontFamily: "'Trebuchet MS', sans-serif",
                          animationDelay: `${0.1 + i * 0.07}s`,
                        }}
                        whileHover={{ y: comingSoon ? 0 : -1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      >
                        {label}
                        {comingSoon && (
                          <span style={{
                            marginLeft: '5px',
                            fontSize: '9px',
                            background: 'rgba(99,102,241,0.25)',
                            border: '1px solid rgba(99,102,241,0.4)',
                            color: '#a5b4fc',
                            borderRadius: '4px',
                            padding: '1px 5px',
                            verticalAlign: 'middle',
                            letterSpacing: '0.05em',
                          }}>
                            SOON
                          </span>
                        )}
                        {/* Download icon for Rulebook */}
                        {download && (
                          <svg
                            className="rulebook-dl-icon w-3 h-3 text-indigo-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        )}
                      </motion.a>
                      {/* Tooltip on click for coming soon */}
                      {tooltip === label && (
                        <div className="coming-soon-tooltip">🚧 Coming Soon</div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-3 nav-animate-in" style={{ animationDelay: '0.55s' }}>
                <motion.button
                  className="nav-shimmer-btn relative px-6 py-2.5 rounded-xl font-bold text-sm text-white tracking-wide"
                  style={{
                    fontFamily: "'Trebuchet MS', sans-serif",
                    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    boxShadow: '0 0 24px rgba(99,102,241,0.35)',
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(99,102,241,0.6)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  onClick={handleRegisterClick}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Register Now
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.button>
              </div>

              {/* Mobile hamburger */}
              <motion.button
                className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                onClick={() => setMenuOpen(o => !o)}
                whileTap={{ scale: 0.9 }}
              >
                <motion.span className="block w-6 h-[2px] rounded-full bg-white origin-center"
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
                <motion.span className="block w-6 h-[2px] rounded-full bg-white"
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} />
                <motion.span className="block w-6 h-[2px] rounded-full bg-white origin-center"
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
              </motion.button>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.5) 30%, rgba(59,130,246,0.5) 70%, transparent 100%)',
            opacity: scrolled ? 1 : 0.4,
            transition: 'opacity 0.5s',
          }} />
        </div>
      </motion.nav>

      {/* ─── Mobile menu drawer ─── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-[320px] md:hidden flex flex-col"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              style={{
                background: 'rgba(6,12,26,0.97)',
                backdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(99,102,241,0.20)',
                boxShadow: '-8px 0 40px rgba(6,12,26,0.8)',
              }}
            >
              <div className="absolute top-[-60px] right-[-60px] w-[220px] h-[220px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(99,102,241,0.15)' }} />

              <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                <span className="text-base font-black text-white" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                  IGNITION{' '}
                  <span style={{
                    background: 'linear-gradient(90deg, #60a5fa, #818cf8)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>HackVerse</span>
                </span>
                <motion.button onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-indigo-500/40 transition-colors"
                  whileTap={{ scale: 0.9 }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <nav className="flex-1 flex flex-col px-4 py-6 gap-1 overflow-y-auto">
                {NAV_LINKS.map(({ label, href, comingSoon, download }, i) => {
                  const id = href.replace('#', '');
                  const isActive = activeLink === id;
                  return (
                    <div key={label} className="relative">
                      <motion.a
                        href={href}
                        {...(download ? { download } : {})}
                        onClick={(e) => handleNavClick(e, href, comingSoon, label, download)}
                        className={`mobile-link-glow flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200
                          ${comingSoon ? 'opacity-50 cursor-not-allowed' : ''}
                          ${isActive
                            ? 'text-blue-300 bg-blue-500/10 border border-blue-500/25'
                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                          }`}
                        style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: comingSoon ? 0.5 : 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-blue-400' : 'bg-white/20'}`} />
                        {label}
                        {comingSoon && (
                          <span style={{
                            marginLeft: 'auto',
                            fontSize: '9px',
                            background: 'rgba(99,102,241,0.25)',
                            border: '1px solid rgba(99,102,241,0.4)',
                            color: '#a5b4fc',
                            borderRadius: '4px',
                            padding: '2px 6px',
                            letterSpacing: '0.05em',
                          }}>SOON</span>
                        )}
                        {/* Download icon for Rulebook in mobile */}
                        {download && (
                          <svg
                            className="rulebook-dl-icon ml-auto w-3.5 h-3.5 text-indigo-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        )}
                      </motion.a>
                      {tooltip === label && (
                        <div className="coming-soon-tooltip">🚧 Coming Soon</div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="px-4 py-6 border-t border-white/8 space-y-3">
                <div className="flex items-center gap-2 justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 dot-pulse" />
                  <span className="text-xs font-semibold text-indigo-300 tracking-widest uppercase">Registration Open</span>
                </div>
                <motion.button
                  className="nav-shimmer-btn relative w-full px-6 py-2.5 rounded-xl font-bold text-sm text-white tracking-wide"
                  style={{
                    fontFamily: "'Trebuchet MS', sans-serif",
                    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    boxShadow: '0 0 24px rgba(99,102,241,0.35)',
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(99,102,241,0.6)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  onClick={() => { handleRegisterClick(); setMenuOpen(false); }}
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    Register Now
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}