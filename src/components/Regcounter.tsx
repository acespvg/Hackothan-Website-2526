"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TimeUnit = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="relative flex items-center justify-center w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(99,102,241,0.25)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 0 30px rgba(99,102,241,0.12)",
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="text-2xl md:text-3xl font-bold tracking-tight text-white tabular-nums"
          style={{
            fontFamily: "'Trebuchet MS', sans-serif",
            textShadow: "0 0 20px rgba(99,102,241,0.5)",
          }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
    </div>

    <p
      className="text-center"
      style={{
        fontSize: "10px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#64748b",
        fontWeight: 700,
        fontFamily: "'Trebuchet MS', sans-serif",
      }}
    >
      {label}
    </p>
  </div>
);

export default function CountdownTimer() {
  const targetDate = new Date("February 26, 2026 00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = targetDate - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <section
      className="w-full flex justify-center"
      style={{
        background:
          "linear-gradient(180deg,#060c1a 0%,#080f20 55%,#060c1a 100%)",
        padding: "80px 20px 60px",
      }}
    >
      {/* CENTER CONTAINER */}
      <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center">
        
        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-slate-400 text-xs md:text-sm uppercase tracking-[0.4em] mb-8 font-bold"
        >
          Registrations Start In
        </motion.p>

        {/* Counter Box */}
        <div
          className="flex justify-center gap-4 px-8 py-8 rounded-3xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(99,102,241,0.2)",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 0 60px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          <TimeUnit label="Days" value={days} />
          <TimeUnit label="Hrs" value={hours} />
          <TimeUnit label="Min" value={minutes} />
          <TimeUnit label="Sec" value={seconds} />
        </div>
      </div>
    </section>
  );
}