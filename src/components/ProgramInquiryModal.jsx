import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ProgramInquiryModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        user_name: '',
        user_age: '',
        user_contact: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const q = query(collection(db, 'user_data'), orderBy('Data_id', 'desc'), limit(1));
            const querySnapshot = await getDocs(q);
            let newId = 1;

            if (!querySnapshot.empty) {
                const lastData = querySnapshot.docs[0].data();
                if (lastData.Data_id) {
                    newId = Number(lastData.Data_id) + 1;
                }
            }

            await addDoc(collection(db, 'user_data'), {
                Data_id: newId,
                user_name: formData.user_name,
                user_age: formData.user_age,
                user_contact: formData.user_contact,
                created_at: new Date()
            });

            setLoading(false);
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                navigate('/programs');
            }, 2000);
        } catch (error) {
            console.error('Error submitting form: ', error);
            setLoading(false);
            alert('Failed to submit form. Please try again.');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="w-full max-w-md overflow-hidden rounded-2xl bg-[#1a1a1a] p-6 shadow-2xl ring-1 ring-white/10 sm:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                    className="mb-6 rounded-full bg-green-500/20 p-4 ring-1 ring-green-500/50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </motion.div>
                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="mb-2 text-2xl font-bold text-white"
                                >
                                    Success!
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-gray-400"
                                >
                                    Redirecting you to programs...
                                </motion.p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Start Your Journey</h2>
                                        <p className="text-sm text-gray-400 mt-1">Fill in your details to explore our programs</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-300">Name</label>
                                        <input
                                            type="text"
                                            name="user_name"
                                            required
                                            value={formData.user_name}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-primary focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-primary"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-300">Age</label>
                                        <input
                                            type="number"
                                            name="user_age"
                                            required
                                            min="1"
                                            max="120"
                                            value={formData.user_age}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-primary focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-primary"
                                            placeholder="Enter your age"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-300">Mobile Number</label>
                                        <input
                                            type="tel"
                                            name="user_contact"
                                            required
                                            pattern="[0-9]{10}"
                                            title="Please enter a valid 10-digit mobile number"
                                            value={formData.user_contact}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-primary focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-primary"
                                            placeholder="Enter your mobile number"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-2 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:bg-primaryVar1 hover:shadow-[0_0_25px_theme('colors.primary')] disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            'Submit & Explore Programs'
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProgramInquiryModal;
