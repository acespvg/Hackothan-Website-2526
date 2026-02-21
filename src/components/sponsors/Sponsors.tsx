'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const SPONSOR_TIERS = [
    {
        name: 'Gold Sponsors',
        color: '#fbbf24', // Amber/Gold
        softColor: 'rgba(251, 191, 36, 0.1)',
        cardSize: 'h-48 w-full md:w-80',
        gridCols: 'grid-cols-1 md:grid-cols-2',
        sponsors: [
            { name: 'Tech Giant', logoText: 'LOGO 1' },
            { name: 'Cloud Hero', logoText: 'LOGO 2' },
        ]
    },
    {
        name: 'Silver Sponsors',
        color: '#94a3b8', // Slate/Silver
        softColor: 'rgba(148, 163, 184, 0.1)',
        cardSize: 'h-36 w-full md:w-64',
        gridCols: 'grid-cols-2 md:grid-cols-3',
        sponsors: [
            { name: 'Innovate AI', logoText: 'LOGO 3' },
            { name: 'Future Systems', logoText: 'LOGO 4' },
            { name: 'Soft Solutions', logoText: 'LOGO 5' },
        ]
    },
    {
        name: 'Community Partners',
        color: '#38bdf8', // Sky/Community
        softColor: 'rgba(56, 189, 248, 0.1)',
        cardSize: 'h-24 w-full md:w-48',
        gridCols: 'grid-cols-2 md:grid-cols-4',
        sponsors: [
            { name: 'Dev Community', logoText: 'LOGO 6' },
            { name: 'College Hub', logoText: 'LOGO 7' },
            { name: 'Code Base', logoText: 'LOGO 8' },
            { name: 'Tech Forum', logoText: 'LOGO 9' },
        ]
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

function SponsorCard({ sponsor, color, softColor, size }: {
    sponsor: { name: string; logoText: string };
    color: string;
    softColor: string;
    size: string;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative ${size} rounded-2xl flex flex-col items-center justify-center p-4 transition-all duration-500 overflow-hidden cursor-default`}
            style={{
                background: hovered ? `${softColor}` : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${hovered ? color + '4d' : 'rgba(255, 255, 255, 0.05)'}`,
                backdropFilter: 'blur(12px)',
                boxShadow: hovered ? `0 20px 40px ${color}1a` : 'none'
            }}
            whileHover={{ y: -5, scale: 1.02 }}
        >
            {/* Top shimmer line */}
            <div
                className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
                style={{
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    opacity: hovered ? 1 : 0.2
                }}
            />

            {/* Dummy Logo Box */}
            <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center mb-3 transition-transform duration-500"
                style={{
                    background: `linear-gradient(135deg, ${color}33, ${color}0d)`,
                    border: `1px solid ${color}4d`,
                    transform: hovered ? 'scale(1.1)' : 'scale(1)'
                }}
            >
                <span className="text-white font-black text-xs md:text-sm tracking-widest opacity-60">
                    {sponsor.logoText}
                </span>
            </div>

            <span
                className="text-xs md:text-sm font-bold tracking-wider font-['Trebuchet_MS',_sans-serif]"
                style={{ color: hovered ? '#fff' : '#94a3b8' }}
            >
                {sponsor.name}
            </span>

            {/* Subtle corner glow */}
            <div
                className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ background: color }}
            />
        </motion.div>
    );
}

export default function Sponsors() {
    const [ref, inView] = useInView();

    return (
        <section
            ref={ref}
            id="sponsors"
            className="relative pt-12 pb-24 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #060c1a 0%, #080f20 50%, #060c1a 100%)' }}
        >
            {/* Background Animated Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)`,
                        backgroundSize: '80px 80px',
                    }}
                />
            </div>

            {/* Decorative Orbs */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Thin top divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-16" />

                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-[0.2em] font-['Trebuchet_MS',_sans-serif]">
                            Partnerships
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-white mb-6 font-['Trebuchet_MS',_sans-serif] tracking-tight"
                    >
                        Our Valuable <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">Sponsors</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-500 max-w-sm mx-auto font-['Trebuchet_MS',_sans-serif]"
                    >
                        Empowering innovation through strategic collaborations.
                    </motion.p>
                </div>

                {/* Tiers List */}
                <div className="space-y-24 flex flex-col items-center">
                    {SPONSOR_TIERS.map((tier, ti) => (
                        <div key={ti} className="w-full flex flex-col items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 + ti * 0.1 }}
                                className="flex items-center gap-4 mb-10 w-full max-w-5xl px-4"
                            >
                                <h3
                                    className="text-sm font-black uppercase tracking-[0.3em] font-['Trebuchet_MS',_sans-serif] whitespace-nowrap"
                                    style={{ color: tier.color }}
                                >
                                    {tier.name}
                                </h3>
                                <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${tier.color}33, transparent)` }} />
                            </motion.div>

                            <div className={`grid ${tier.gridCols} gap-6 md:gap-10 w-full max-w-6xl px-4 justify-items-center`}>
                                {tier.sponsors.map((sponsor, si) => (
                                    <SponsorCard
                                        key={si}
                                        sponsor={sponsor}
                                        color={tier.color}
                                        softColor={tier.softColor}
                                        size={tier.cardSize}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Line */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-32 text-center"
                >
                    <div className="inline-flex flex-col md:flex-row items-center gap-4 py-6 px-10 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
                        <span className="text-slate-400 font-['Trebuchet_MS',_sans-serif]">Interested in sponsoring?</span>
                        <a href="mailto:contact@hackverse.com" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline underline-offset-4 decoration-indigo-400/30">
                            Contact the organizing team
                        </a>
                    </div>
                </motion.div>

                {/* Bottom accent line */}
                <div className="mt-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
        </section>
    );
}
