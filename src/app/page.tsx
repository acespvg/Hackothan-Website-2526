// ====================================================================
// HACKVERSE 2026 - Main Page
// Official Hackathon Website for ACES PVG's COET
// Page Structure: Navbar, Hero, About, Timeline, Prizes, Footer
// ====================================================================

import {
  Navbar,
  HeroSection,
  AboutSection,
  TimelineSection,
  PrizePoolSection,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ======= Fixed Navigation Bar ======= */}
      <Navbar />
      
      {/* ======= Hero Section - Landing with 3D Logo ======= */}
      <HeroSection />
      
      {/* ======= About Section - Event Details ======= */}
      <AboutSection />
      
      {/* ======= Timeline Section - Event Schedule ======= */}
      <TimelineSection />
      
      {/* ======= Prize Pool Section - Rewards ======= */}
      <PrizePoolSection />
      
      {/* ======= Footer Section ======= */}
      <Footer />
    </main>
  );
}
