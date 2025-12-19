import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, Check, ChevronLeft } from 'lucide-react';

const GrievanceForm = () => {
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState('');
    const [agreed, setAgreed] = useState(false);

    const categories = ['Roads & Infrastructure', 'Sanitation', 'Water Supply', 'Electricity', 'Other'];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-serif font-bold text-gray-900">Raise a New Complaint</h2>
                    <p className="mt-2 text-gray-500">Step {step} of 3</p>
                </div>

                {/* Progress Bar */}
                <div className="flex justify-between mb-12 relative max-w-xl mx-auto">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0 transform -translate-y-1/2"></div>
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-green-600 -z-0 transform -translate-y-1/2 transition-all duration-500"
                        style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                    ></div>

                    {[1, 2, 3].map((num) => (
                        <div key={num} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= num ? 'bg-green-600 text-white scale-110' : 'bg-gray-200 text-gray-500'
                            }`}>
                            {step > num ? <Check size={20} /> : num}
                        </div>
                    ))}
                </div>

                {/* Step 1: Category */}
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-6 text-gray-900">Select Complaint Category</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`p-4 rounded-xl text-left font-medium transition-all duration-200 border-2 ${category === cat
                                                ? 'border-green-600 bg-green-50 text-green-900 shadow-md'
                                                : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-green-200 hover:bg-white'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button
                                    disabled={!category}
                                    onClick={() => setStep(2)}
                                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next Step <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Guidelines */}
                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="bg-orange-50 p-8 rounded-2xl border-l-4 border-orange-500 shadow-sm">
                            <h3 className="text-xl font-bold text-orange-800 flex items-center gap-2 mb-4">
                                <AlertTriangle className="text-orange-600" /> Guidelines for {category}
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-orange-900 mb-6">
                                <li>Ensure the issue falls under public jurisdiction.</li>
                                <li>Do not raise duplicate complaints for the same issue.</li>
                                <li>Provide clear photographic evidence if possible.</li>
                                <li>False reporting may lead to account suspension.</li>
                            </ul>

                            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-orange-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="w-5 h-5 text-green-600 rounded focus:ring-green-500 border-gray-300"
                                />
                                <span className="font-medium text-gray-800">I confirm my complaint is valid and truthful.</span>
                            </label>
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-800 font-medium flex items-center gap-2">
                                <ChevronLeft size={18} /> Back
                            </button>
                            <button
                                disabled={!agreed}
                                onClick={() => setStep(3)}
                                className="btn-primary disabled:opacity-50"
                            >
                                Proceed to Form
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold mb-6">Complaint Details</h3>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Complaint Submitted!"); }}>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="Brief summary" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none h-32" placeholder="Detailed explanation..."></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="Where is the issue located?" />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between items-center">
                                <button type="button" onClick={() => setStep(2)} className="text-gray-500 hover:text-gray-800 font-medium">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary px-8 py-3 shadow-lg shadow-green-900/20">
                                    Submit Complaint
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default GrievanceForm;
