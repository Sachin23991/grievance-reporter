import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, ArrowRight, TrendingUp, Users, Building, Shield, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero3D from '../components/Hero3D';

// --- Utility Components for Animations ---

const FadeInUp = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

const SplitText = ({ children, className = "", delay = 0 }) => {
    return (
        <span className={className}>
            {children.split("").map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: delay + i * 0.03, ease: "easeOut" }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
};

const ParallaxText = ({ children, baseVelocity = 100 }) => {
    const { scrollY } = useScroll();
    const scrollVelocity = useSpring(scrollY, { stiffness: 400, damping: 90 });
    const x = useTransform(scrollY, [0, 1000], [0, baseVelocity]);

    return (
        <div className="overflow-hidden flex flex-nowrap whitespace-nowrap gap-8 py-4 opacity-10 select-none pointer-events-none">
            <motion.div style={{ x }} className="flex gap-8 text-8xl font-black uppercase text-transparent stroke-text">
                {Array(4).fill(children).map((text, i) => (
                    <span key={i} className="tracking-tighter" style={{ WebkitTextStroke: "2px #1a472a" }}>{text}</span>
                ))}
            </motion.div>
        </div>
    );
};

const TiltCard = ({ children, className = "" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
    const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={onMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className={`relative transition-all duration-200 ease-linear ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

// --- Main Page Component ---

const LandingPage = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <div className="bg-[#f8f9fa] text-gray-900 overflow-hidden font-sans selection:bg-green-200">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-[#c5a059] origin-left z-50"
                style={{ scaleX }}
            />

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-radial-gradient from-green-50 to-white opacity-80" />

                {/* Decorative Blobs */}
                <motion.div
                    animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-200/30 rounded-full blur-3xl opacity-50"
                />
                <motion.div
                    animate={{ x: [0, -80, 0], y: [0, 50, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#c5a059]/10 rounded-full blur-3xl opacity-50"
                />

                <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                    <div className="space-y-8">
                        <FadeInUp delay={0.2}>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="h-px w-12 bg-[#c5a059]" />
                                <span className="text-[#c5a059] font-bold tracking-[0.2em] text-sm uppercase">Official Grievance Portal</span>
                            </div>
                        </FadeInUp>

                        <div className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] tracking-tight">
                            <SplitText delay={0.2} className="block text-gray-900">Voice of</SplitText>
                            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#1a472a] to-[#2e7d32]">
                                <SplitText delay={0.5}>Justice.</SplitText>
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#c5a059] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </span>
                        </div>

                        <FadeInUp delay={0.8}>
                            <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-light">
                                Empowering citizens with a transparent, efficient, and accountable platform.
                                Your grievances, heard and resolved.
                            </p>
                        </FadeInUp>

                        <FadeInUp delay={1.0} className="flex flex-wrap gap-4">
                            <Link to="/register">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-[#1a472a] text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg shadow-green-900/20 flex items-center gap-2 group hover:ring-2 hover:ring-offset-2 hover:ring-[#1a472a] transition-all"
                                >
                                    File a Complaint
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link to="/about">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-full font-medium text-lg border border-gray-300 hover:border-[#1a472a] hover:text-[#1a472a] transition-colors bg-white/50 backdrop-blur-sm"
                                >
                                    How it works
                                </motion.button>
                            </Link>
                        </FadeInUp>

                    </div>

                    <div className="relative h-[600px] w-full hidden md:block">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1.2, delay: 0.2, type: "spring" }}
                            className="absolute inset-0 z-10"
                        >
                            <Hero3D />
                        </motion.div>
                        {/* Abstract backdrop for 3D elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-green-100/50 to-transparent rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </section>

            {/* --- MARQUEE SEPARATOR --- */}
            <div className="relative py-12 bg-[#1a472a] text-[#c5a059] flex items-center overflow-hidden rotate-1 mt-10 -mx-4 shadow-2xl">
                <ParallaxText baseVelocity={-5}>TRANSPARENCY • ACCOUNTABILITY • SPEED • JUSTICE • </ParallaxText>
            </div>

            {/* --- FEATURES SECTION --- */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                        <div className="max-w-2xl">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-[#c5a059] font-bold tracking-widest uppercase mb-4 block"
                            >
                                Why Choose Us
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl md:text-6xl font-serif font-bold text-[#1a472a]"
                            >
                                Redefining Public Service.
                            </motion.h2>
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-500 max-w-md mt-6 md:mt-0 text-lg"
                        >
                            Advanced tools and dedicated officers working in sync to ensure your community thrives.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Real-time Tracking", icon: <Clock className="w-10 h-10" />, desc: "Monitor your complaint status every step of the way with live updates.", bg: "bg-blue-50 text-blue-700" },
                            { title: "Direct Action", icon: <Zap className="w-10 h-10" />, desc: "Complaints are routed directly to the responsible field officer.", bg: "bg-yellow-50 text-yellow-700" },
                            { title: "Public Analytics", icon: <TrendingUp className="w-10 h-10" />, desc: "View heatmaps and statistics of grievances in your area.", bg: "bg-purple-50 text-purple-700" }
                        ].map((item, index) => (
                            <TiltCard key={index} className="h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="h-full bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-start gap-6 hover:border-[#1a472a]/20 transition-colors"
                                >
                                    <div className={`p-4 rounded-2xl ${item.bg}`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-lg">{item.desc}</p>
                                </motion.div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CATEGORIES PARALLAX SECTION --- */}
            <section className="py-32 bg-[#1a472a] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-serif font-bold mb-6">Departments</h2>
                        <p className="text-green-200 text-xl max-w-2xl mx-auto">We cover every aspect of civic life. Select your concern area.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { name: "Sanitation", icon: Users },
                            { name: "Roadworks", icon: Building },
                            { name: "Lighting", icon: Zap },
                            { name: "Water Supply", icon: CheckCircle },
                            { name: "Transport", icon: Clock },
                            { name: "Health", icon: AlertCircle },
                            { name: "Law & Order", icon: Shield },
                            { name: "Education", icon: Award }
                        ].map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer backdrop-blur-sm"
                            >
                                <cat.icon className="w-8 h-8 text-[#c5a059]" />
                                <span className="font-semibold tracking-wide">{cat.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-[#c5a059] rounded-[3rem] p-16 md:p-24 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-black/5 pattern-dots opacity-20"></div>
                        <motion.div
                            style={{ y: useTransform(scrollYProgress, [0.6, 1], [0, -100]) }}
                            className="relative z-10"
                        >
                            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1a472a] mb-8">Ready to make a change?</h2>
                            <p className="text-[#1a472a] text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-medium">Join thousands of citizens building a better tomorrow, one complaint at a time.</p>
                            <Link to="/register">
                                <button className="bg-[#1a472a] text-white px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                    Get Started Now
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
