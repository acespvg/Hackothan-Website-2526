// ====================================================================
// HACKVERSE 2026 - Registration Page
// Dedicated registration page for the hackathon
// ====================================================================

import { Navbar, RegistrationForm, Footer } from "@/components";

export const metadata = {
  title: "Register | Hackverse 2026",
  description: "Register for Hackverse 2026 - Join 500+ innovators for 36 hours of coding, creativity, and collaboration.",
};

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
      {/* ======= Fixed Navigation Bar ======= */}
      <Navbar />
      
      {/* ======= Registration Form Section ======= */}
      <RegistrationForm />
      
      {/* ======= Footer Section ======= */}
      <Footer />
    </main>
  );
}
