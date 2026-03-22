'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { JSX } from 'react';

const NAV_LINKS: { label: string; href: string; download?: string }[] = [
  { label: 'Home', href: '#home' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Rulebook', href: '/rulebook.pdf', download: 'HackVerse_Rulebook.pdf' },
];

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ignitionhackverse/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ignition-hackverse-5985523b2/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer(): JSX.Element {
  return (
    <footer
      className="relative text-gray-400 overflow-hidden"
      // Inline style for background avoids Tailwind's arbitrary-value
      // opacity parsing which can differ between Chromium builds
      style={{ backgroundColor: 'rgb(4, 8, 18)' }}
    >
      {/* Top gradient border — use inline style; Tailwind bg-gradient classes
          with via-* and opacity modifiers render inconsistently across
          Chromium versions and Brave's shield layer */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(99,102,241,0.5), transparent)',
        }}
      />

      {/* Background glows — replaced Tailwind blur-[] arbitrary values with
          inline filter:blur() which is universally supported */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            top: '-8rem',
            left: '25%',
            width: '500px',
            height: '400px',
            background: 'rgba(49,46,129,0.35)',
            filter: 'blur(120px)',
            // willChange keeps the blur on the GPU compositor consistently
            willChange: 'transform',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: '-5rem',
            right: '25%',
            width: '300px',
            height: '300px',
            background: 'rgba(88,28,135,0.25)',
            filter: 'blur(100px)',
            willChange: 'transform',
          }}
        />

        {/* Subtle grid — SVG data-URI is pixel-perfect across all browsers;
            backgroundImage with rgba() strings can anti-alias differently */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M60 0H0v60' fill='none' stroke='rgba(99,102,241,0.5)' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative container mx-auto px-6 lg:px-12">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* ───── Brand ───── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-5 space-y-6"
          >
            <div className="flex items-center gap-3">
              {/* Logo wrapper: explicit width/height avoids Next/Image
                  layout-shift differences between browsers */}
              <div
                className="relative rounded-xl border flex items-center justify-center"
                style={{
                  width: 40,
                  height: 40,
                  background:
                    'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))',
                  borderColor: 'rgba(99,102,241,0.2)',
                }}
              >
                <Image
                  src="/igF2.png"
                  alt="HackVerse Logo"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </div>

              {/* bg-clip-text + background-clip: text needs -webkit- prefix
                  in some Chromium versions; inline style guarantees it */}
              <span className="text-2xl font-black text-white tracking-tight">
                IGNITION{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(to right, #60a5fa, #818cf8, #c084fc)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                >
                  HackVerse
                </span>
              </span>
            </div>

            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              A next-generation hackathon experience designed to ignite innovation,
              creativity, and technical excellence across the globe.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 transition-colors duration-200 hover:text-white"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(99,102,241,0.2)';
                    el.style.borderColor = 'rgba(99,102,241,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(255,255,255,0.05)';
                    el.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ───── Spacer ───── */}
          <div className="hidden md:block md:col-span-1" aria-hidden="true" />

          {/* ───── Quick Links ───── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-5"
          >
            <h3 className="text-white font-semibold tracking-widest text-xs uppercase">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                  viewport={{ once: true }}
                >
                  {link.download ? (
                    <a
                      href={link.href}
                      download={link.download}
                      className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors duration-200"
                    >
                      <span
                        className="w-1 h-1 rounded-full transition-all duration-200 group-hover:scale-150"
                        style={{ backgroundColor: 'rgba(99,102,241,0.5)' }}
                      />
                      {link.label}
                      <svg
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors duration-200"
                    >
                      <span
                        className="w-1 h-1 rounded-full transition-all duration-200 group-hover:scale-150"
                        style={{ backgroundColor: 'rgba(99,102,241,0.5)' }}
                      />
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ───── Contact ───── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-5"
          >
            <h3 className="text-white font-semibold tracking-widest text-xs uppercase">
              Contact
            </h3>

            <div className="space-y-4">
              <motion.a
                href="mailto:ignitionhackverse@pvgcoet.ac.in"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="group flex items-start gap-3 text-sm text-gray-500 hover:text-white transition-colors duration-200"
              >
                <div
                  className="mt-0.5 w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.2)',
                  }}
                >
                  <svg
                    className="w-3.5 h-3.5 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-400 group-hover:text-white transition-colors text-xs">
                    Email us
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    ignitionhackverse@pvgcoet.ac.in
                  </div>
                </div>
              </motion.a>
            </div>
            <div className="space-y-4">
              <motion.a
                href="tel:+919405610000"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="group flex items-start gap-3 text-sm text-gray-500 hover:text-white transition-colors duration-200"
              >
                <div
                  className="mt-0.5 w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.2)',
                  }}
                >
                  <svg
                    className="w-3.5 h-3.5 text-indigo-400 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-400 group-hover:text-white transition-colors text-xs">
                    Call or WhatsApp
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    +91 94056 10000
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
        

        {/* ───── Bottom Bar ───── */}
        <div
          className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="flex items-center gap-1.5">
            <span style={{ color: 'rgba(99,102,241,0.6)' }}>©</span>
            {new Date().getFullYear()} IGNITION HackVerse. All rights reserved.
          </p>

          <div className="flex items-center gap-1">
            {['Privacy Policy', 'Terms & Conditions'].map((item, i) => (
              <span key={item} className="flex items-center gap-1">
                {i > 0 && <span className="text-gray-700">·</span>}
                <Link
                  href="#"
                  className="hover:text-white transition-colors duration-200 px-2 py-1 rounded hover:bg-white/5"
                >
                  {item}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}