"use client";

/* ====================================================================
   Navbar Component - Fire & Flames Inspired Design
   Features: Smooth scroll, mobile menu, GSAP animations, fire effects
   ==================================================================== */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Flame } from "lucide-react";

/* ======= Navigation Links Configuration ======= */
// Easily modifiable navigation items - add/remove links here
const NAV_LINKS = [
  { href: "#home", label: "Home", isAnchor: true },
  { href: "#about", label: "About", isAnchor: true },
  { href: "#timeline", label: "Timeline", isAnchor: true },
  { href: "#prizes", label: "Prizes", isAnchor: true },
  { href: "/register", label: "Register", isAnchor: false },
] as const;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  /* ======= Scroll Detection Effect ======= */
  useEffect(() => {
    const handleScroll = () => {
      // Add background blur when scrolled past 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ======= Initial Animation Effect ======= */
  useEffect(() => {
    // Animate navbar entrance
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  /* ======= Mobile Menu Animation Effect ======= */
  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        // Slide down mobile menu
        gsap.fromTo(
          menuRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      } else {
        // Collapse mobile menu
        gsap.to(menuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  }, [isMenuOpen]);

  /* ======= Smooth Scroll Handler ======= */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor: boolean) => {
    if (!isAnchor) return; // Let Next.js handle page navigation
    
    e.preventDefault();
    setIsMenuOpen(false);
    
    // If not on home page, navigate to home page with anchor
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "fire-glass border-b border-orange-500/20"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* ======= Logo Section ======= */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <Flame className="w-8 h-8 text-orange-500 group-hover:text-yellow-400 transition-colors group-hover:animate-pulse" />
            <span className="text-xl font-black fire-gradient-text">HACKVERSE</span>
          </Link>

          {/* ======= Desktop Navigation Links ======= */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isAnchor)}
                  className="relative text-orange-200/80 hover:text-orange-400 transition-colors duration-200 group font-semibold"
                >
                  {link.label}
                  {/* Animated underline on hover - Fire gradient */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-orange-200/80 hover:text-orange-400 transition-colors duration-200 group font-semibold"
                >
                  {link.label}
                  {/* Animated underline on hover - Fire gradient */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
                </Link>
              )
            ))}
            
            {/* Register CTA Button - Fire Theme */}
            <Link
              href="/register"
              className="group relative px-6 py-2 rounded-lg bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-[length:200%_100%] text-white font-black uppercase tracking-wider hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 animate-gradient overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Flame className="w-4 h-4" />
                Register Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </div>

          {/* ======= Mobile Menu Toggle Button ======= */}
          <button
            className="md:hidden p-2 text-orange-400 hover:text-orange-300 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* ======= Mobile Navigation Menu ======= */}
        <div
          ref={menuRef}
          className="md:hidden overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="py-4 space-y-4 border-t border-orange-500/30">
            {NAV_LINKS.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isAnchor)}
                  className="block text-orange-200/80 hover:text-orange-400 transition-colors py-2 font-semibold"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-orange-200/80 hover:text-orange-400 transition-colors py-2 font-semibold"
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-white font-black uppercase tracking-wider"
            >
              <span className="flex items-center justify-center gap-2">
                <Flame className="w-4 h-4" />
                Register Now
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
