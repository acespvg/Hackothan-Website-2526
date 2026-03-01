'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqData = [
  {
    question: "Is the Hackathon online or offline?",
    answer: "First, an online elimination round will be conducted, followed by an offline Hackathon conducted at PVG's COET&M, Pune."
  },
  {
    question: "Who can participate?",
    answer: "Students from all departments and years can participate."
  },
  {
    question: "What is the allowed team size?",
    answer: "Teams can have 2 to 4 members. Solo participation is not allowed."
  },
  {
    question: "Is there any registration fee?",
    answer: "Registration fee of ₹1000 will be there"
  },
  {
    question: "Whom can we contact for queries?",
    answer: "Please reach out to the organizing team through official department communication channels."
  }
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function FAQItem({ question, answer, isOpen, onClick, index }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
  index: number;
}) {
  return (
    <div 
      className={`border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white/[0.06] border-indigo-500/30' : 'bg-white/[0.02] hover:bg-white/[0.04] hover:border-indigo-500/20'}`}
      style={{
        backdropFilter: 'blur(12px)',
        boxShadow: isOpen ? '0 8px 32px rgba(99, 102, 241, 0.15)' : 'none'
      }}
    >
      <button
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-bold text-white/90 font-['Trebuchet_MS',_sans-serif]">
          <span className="text-indigo-400 mr-3 opacity-50">0{index + 1}.</span>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20"
        >
          <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-6 text-slate-400 leading-relaxed font-['Trebuchet_MS',_sans-serif]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [ref, inView] = useInView();

  return (
    <section 
      ref={ref}
      className="relative py-24 overflow-hidden" 
      style={{ background: 'linear-gradient(180deg, #060c1a 0%, #0a1228 50%, #060c1a 100%)' }}
      id="faq"
    >
      {/* Background patterns similar to other sections */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Header section consistent with Timeline/PrizePool */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-[0.2em] font-['Trebuchet_MS',_sans-serif]">
              Common Queries
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-white mb-6 font-['Trebuchet_MS',_sans-serif] tracking-tight"
          >
            Frequently Asked <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">Questions</span>
          </motion.h2>
          
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={inView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-slate-500 max-w-md mx-auto font-['Trebuchet_MS',_sans-serif]"
          >
            Everything you need to know about Ignition HackVerse 2026.
          </motion.p>
        </div>

        {/* FAQ List */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          {faqData.map((item, i) => (
            <FAQItem
              key={i}
              index={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* Bottom accent line */}
        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
