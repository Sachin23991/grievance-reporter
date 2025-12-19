import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, ArrowRight, TrendingUp, Users, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero3D from '../components/Hero3D';

const LandingPage = () => {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 bg-gradient-to-b from-green-50 to-white">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="md:w-1/2 space-y-6 z-10"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase mb-2">
                        Smart Public Grievance System
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-tight">
                        Raise Responsible <br />
                        <span className="text-green-800 italic">Complaints.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
                        A transparent, citizen-centric platform connecting you directly with authorities.
                        Track every action, ensure accountability, and build a better community.
                    </p>

                    <div className="flex gap-4 pt-4">
                        <Link to="/register">
                            <button className="btn-primary px-8 py-3 text-lg shadow-green-900/20">
                                Get Started
                            </button>
                        </Link>
                        <Link to="/about">
                            <button className="btn-outline px-8 py-3 text-lg">
                                Learn More
                            </button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="md:w-1/2 flex justify-center"
                >
                    <Hero3D />
                </motion.div>
            </section>

            {/* Metrics Section */}
            <section className="px-6 md:px-20 -mt-16 z-20 relative">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border border-gray-100">
                    <MetricCard
                        icon={<CheckCircle className="w-10 h-10 text-green-600 mb-4 mx-auto" />}
                        number="1,240+"
                        label="Complaints Resolved"
                    />
                    <MetricCard
                        icon={<Clock className="w-10 h-10 text-yellow-600 mb-4 mx-auto" />}
                        number="12 Hours"
                        label="Avg Response Time"
                    />
                    <MetricCard
                        icon={<Building className="w-10 h-10 text-blue-600 mb-4 mx-auto" />}
                        number="15+"
                        label="Active Departments"
                    />
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 px-6 md:px-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Where does your issue belong?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Select the right category to ensure your complaint reaches the correct department immediately.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <CategoryCard
                        title="Roads & Infrastructure"
                        icon={<TrendingUp className="w-12 h-12 text-yellow-600" />}
                        desc="Potholes, broken streetlights, waterlogging repairs."
                    />
                    <CategoryCard
                        title="Sanitation & Waste"
                        icon={<Users className="w-12 h-12 text-green-600" />}
                        desc="Garbage collection, public toilet maintenance, cleaning."
                    />
                    <CategoryCard
                        title="Public Transport"
                        icon={<Clock className="w-12 h-12 text-blue-600" />}
                        desc="Bus delays, rude conduct, route issues."
                    />
                </div>
            </section>

            {/* Lifecycle Section - Visual Timeline SVG */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-serif font-bold text-center mb-16">How It Works</h2>

                    <div className="relative">
                        {/* Simple SVG Timeline Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <Step number="01" title="Raised" desc="Submit details & proof" />
                            <Step number="02" title="Review" desc="Authority verifies validity" />
                            <Step number="03" title="Action" desc="Field officer assigned" />
                            <Step number="04" title="Resolved" desc="Verification & Closure" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const MetricCard = ({ icon, number, label }) => (
    <div className="hover:transform hover:-translate-y-2 transition-transform duration-300">
        {icon}
        <h3 className="text-3xl font-bold text-gray-800 mb-2">{number}</h3>
        <p className="text-gray-500 font-medium">{label}</p>
    </div>
);

const CategoryCard = ({ title, icon, desc }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 group cursor-pointer"
    >
        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-50 transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-green-800 transition-colors">{title}</h3>
        <p className="text-gray-500 mb-6 leading-relaxed">{desc}</p>
        <div className="flex items-center gap-2 text-green-700 font-semibold group-hover:gap-3 transition-all">
            Read Guidelines <ArrowRight size={18} />
        </div>
    </motion.div>
);

const Step = ({ number, title, desc }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm relative text-center md:text-left">
        <div className="text-5xl font-black text-gray-100 absolute -top-4 -right-2 select-none">{number}</div>
        <div className="w-4 h-4 bg-green-500 rounded-full mb-4 mx-auto md:mx-0 relative z-10 border-4 border-white shadow-sm"></div>
        <h3 className="text-xl font-bold mb-2 relative z-10">{title}</h3>
        <p className="text-gray-500 text-sm relative z-10">{desc}</p>
    </div>
);

export default LandingPage;
