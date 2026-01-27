import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ======= SEO Metadata Configuration ======= */
export const metadata: Metadata = {
  title: "Hackverse 2026 | ACES PVG's COET",
  description: "Join Hackverse 2026 - The ultimate hackathon experience organized by ACES PVG's COET. 36 hours of innovation, coding, and creativity await!",
  keywords: ["hackathon", "hackverse", "ACES", "PVG", "COET", "coding", "innovation", "tech event"],
  authors: [{ name: "ACES PVG's COET" }],
  openGraph: {
    title: "Hackverse 2026 | ACES PVG's COET",
    description: "Join Hackverse 2026 - The ultimate hackathon experience organized by ACES PVG's COET",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
