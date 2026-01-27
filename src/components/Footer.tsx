"use client";

/* ====================================================================
   Footer Component - Fire & Flames Inspired Design
   Features: Fire effects, glowing elements, social links
   ==================================================================== */

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Send,
  Heart,
  ExternalLink,
  Flame,
} from "lucide-react";

/* ======= Footer Links Configuration ======= */
const FOOTER_LINKS = {
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Timeline", href: "#timeline" },
    { label: "Prizes", href: "#prizes" },
    { label: "Register", href: "#register" },
  ],
  resources: [
    { label: "FAQs", href: "#" },
    { label: "Rules & Guidelines", href: "#" },
    { label: "Code of Conduct", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
  ],
};

/* ======= Social Media Links ======= */
const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/aces-pvg", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/aces_pvg", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/aces-pvg", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/aces_pvg", label: "Instagram" },
];

/* ======= Contact Information ======= */
const CONTACT_INFO = {
  email: "hackverse@acespvg.co.in",
  phone: "+91 98765 43210",
  address: "PVG's COET, Vidya Nagari, Parvati, Pune - 411009",
};

/* ======= Main Footer Component ======= */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  /* ======= Newsletter Subscription Handler ======= */
  // NOTE: Prepared for future API integration
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);

    try {
      // TODO: Replace with actual API call
      // await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      // Simulated API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  /* ======= Smooth Scroll Handler ======= */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative bg-linear-to-b from-neutral-950 to-black border-t border-orange-500/20">
      {/* ======= Fire Glow at Top ======= */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-32 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* ======= Main Footer Content ======= */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* ======= Brand Column ======= */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4 group">
              <Flame className="w-8 h-8 text-orange-500 group-hover:animate-pulse" />
              <span className="text-2xl font-black fire-gradient-text">HACKVERSE</span>
            </a>
            <p className="text-orange-200/70 mb-6 leading-relaxed">
              The flagship hackathon event by ACES PVG&apos;s COET. Where innovation meets
              reality and dreams ignite into code.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full fire-glass flex items-center justify-center text-orange-300/70 hover:text-orange-400 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/20"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* ======= Quick Links Column ======= */}
          <div>
            <h4 className="text-lg font-black text-orange-100 mb-4 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-orange-200/70 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm shadow-orange-500/50" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ======= Resources Column ======= */}
          <div>
            <h4 className="text-lg font-black text-orange-100 mb-4 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              Resources
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-orange-200/70 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm shadow-orange-500/50" />
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ======= Contact & Newsletter Column ======= */}
          <div>
            <h4 className="text-lg font-black text-orange-100 mb-4 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              Contact Us
            </h4>
            <ul className="space-y-4 mb-6">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-orange-200/70 hover:text-orange-400 transition-colors duration-200 flex items-start gap-3"
                >
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-500" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-orange-200/70 hover:text-orange-400 transition-colors duration-200 flex items-start gap-3"
                >
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-500" />
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="text-orange-200/70 flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-500" />
                {CONTACT_INFO.address}
              </li>
            </ul>

            {/* Newsletter Signup */}
            <h5 className="text-sm font-bold text-orange-100 mb-3">
              Subscribe for Updates
            </h5>
            {isSubscribed ? (
              <p className="text-green-400 text-sm flex items-center gap-2">
                <Flame className="w-4 h-4" />
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg fire-glass border border-orange-500/30 focus:border-orange-500/60 focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-transparent text-orange-100 text-sm placeholder-orange-300/40"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-70 hover:scale-105"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ======= Bottom Bar ======= */}
      <div className="border-t border-orange-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-orange-200/70">
            <p>
              © {new Date().getFullYear()} Hackverse. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> by{" "}
              <a
                href="https://acespvg.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 hover:underline font-semibold"
              >
                ACES PVG&apos;s COET
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* ======= Decorative Gradient ======= */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
    </footer>
  );
}
