'use client';

import React from 'react';
import Image from 'next/image';
export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050A1F]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-600px h-600px bg-[#1B2B5A]/30 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 left-1/4 w-500px h-500px bg-[#1B2B5A]/20 rounded-full blur-[100px] animate-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-400px h-400px bg-[#2A3F6F]/20 rounded-full blur-[90px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(27,43,90,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(27,43,90,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
        <div className="absolute top-20 left-10 w-4 h-4 bg-[#4A90E2] rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-[#4A90E2]/60 rounded-full animate-float" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-[#4A90E2]/80 rounded-full animate-float-delayed" />
      </div>
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 text-left">
            <div className="space-y-3 animate-slide-up">
              <h1 className="text-4xl sm:text-6xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[0.95]" style={{ fontFamily: '"Fredoka", "Poppins", sans-serif' }}>
                <span className="block text-white">
                  IGNITION
                </span>
                <span className="block text-white">
                  HACKVERSE
                </span>
                <span className="block text-[#4A90E2] text-3xl sm:text-7xl lg:text-8xl xl:text-9xl mt-2 drop-shadow-[0_0_30px_rgba(74,144,226,0.5)]">
                  2026
                </span>
              </h1>
            </div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white animate-slide-up-delayed tracking-tight" style={{ fontFamily: '"Poppins", sans-serif' }}>
              Ignite. Innovate. <span className="text-[#4A90E2]">Dominate.</span>
            </p>
            <p className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed animate-fade-in-delayed" style={{ fontFamily: '"Poppins", sans-serif' }}>
              Join the hackathon to collaborate, ignite and innovate cutting-edge solutions in a 24-hour coding marathon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delayed-2 pt-2">
              <button className="group relative px-8 py-4 bg-[#4A90E2] hover:bg-[#3A7BC8] rounded-full font-bold text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#4A90E2]/50 transform hover:-rotate-1" style={{ fontFamily: '"Poppins", sans-serif' }}>
                <span className="relative z-10">Register Now</span>
              </button>
              
              <button className="px-8 py-4 border-2 border-[#4A90E2] rounded-full font-bold text-white text-lg hover:bg-[#4A90E2]/20 hover:border-[#3A7BC8] transition-all duration-300 hover:scale-105 transform hover:rotate-1" style={{ fontFamily: '"Poppins", sans-serif' }}>
                View Prizes 🏆
              </button>
            </div>

            </div>
          <div className="relative flex items-center justify-center lg:justify-end animate-float-slow">
            <div className="absolute w-600px h-600px bg-[#4A90E2]/20 rounded-full blur-[140px] animate-pulse-slow" />
            <div className="relative z-10 w-full flex justify-center lg:justify-end items-center pl-20">
              <Image
                src="/logo_BgGone.png"
                alt="Ignition HackVerse 2026 Logo"
                width={600}
                height={700}
                className="w-full h-auto max-w-450px sm:max-w-550px lg:max-w-600px xl:max-w-700px drop-shadow-[0_0_80px_rgba(74,144,226,0.6)] hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#050A1F] to-transparent" />
    </section>
  );
}