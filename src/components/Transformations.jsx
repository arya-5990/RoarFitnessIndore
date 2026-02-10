import React, { useState, useEffect } from "react";
import Section from "./reusable/Section";
import { motion, AnimatePresence } from "motion/react";
import { revealVar } from "../motion/opacityReveal";
import { close } from "../assets";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

// Dummy Data - Commented out for reference
// const transformations = [
//     {
//         id: 1,
//         name: "Alex Johnson",
//         duration: "12 Weeks",
//         beforeImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop",
//         afterImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop",
//         description: "I lost 15kg in just 3 months! The structured plan and constant support were game changers.",
//         achievement: "Weight Loss & Muscle Gain"
//     },
//     {
//         id: 2,
//         name: "Sarah Davis",
//         duration: "6 Months",
//         beforeImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
//         afterImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
//         description: "From feeling lethargic to running my first marathon. This program completely transformed my lifestyle.",
//         achievement: "Cardio & Endurance"
//     },
//     {
//         id: 3,
//         name: "Michael Chen",
//         duration: "16 Weeks",
//         beforeImage: "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=2070&auto=format&fit=crop",
//         afterImage: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop",
//         description: "Building muscle was always hard for me until I started this program. The nutrition guide was key.",
//         achievement: "Muscle Hypertrophy"
//     },
//     {
//         id: 4,
//         name: "Emily Wilson",
//         duration: "10 Weeks",
//         beforeImage: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop",
//         afterImage: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop",
//         description: "Post-pregnancy weight loss seemed impossible, but the gentle, progressive workouts helped me bounce back.",
//         achievement: "Post-natal Fitness"
//     },
//     {
//         id: 5,
//         name: "David Miller",
//         duration: "20 Weeks",
//         beforeImage: "https://images.unsplash.com/photo-1506197061617-7f5c0b093236?q=80&w=2000&auto=format&fit=crop",
//         afterImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
//         description: "I wanted to get shredded for my wedding. Mission accomplished thanks to the high-intensity interval training.",
//         achievement: "Fat Loss & Definition"
//     },
//     {
//         id: 6,
//         name: "Jessica Taylor",
//         duration: "14 Weeks",
//         beforeImage: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop",
//         afterImage: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1977&auto=format&fit=crop",
//         description: "Gained significant strength and confidence. I can now deadlift twice my body weight!",
//         achievement: "Strength & Power"
//     },
// ];

const Transformations = () => {
    const [selectedTransformation, setSelectedTransformation] = useState(null);
    const [transformations, setTransformations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransformations = async () => {
            try {
                const q = query(collection(db, "transformations"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Optionally sort if needed, for instance by id if numeric or custom order
                // data.sort((a, b) => a.id - b.id);
                setTransformations(data);
            } catch (error) {
                console.error("Error fetching transformations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransformations();
    }, []);

    return (
        <Section className="min-h-screen pt-24 pb-12 relative">
            <motion.div
                variants={revealVar}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="container space-y-12 xl:space-y-16"
            >
                <div className="space-y-4 text-center xl:space-y-6 max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold lg:text-5xl xl:text-6xl font-gagalin">
                        Real <span className="text-primary">Results</span>
                    </h1>
                    <p className="text-base lg:text-lg text-greyText leading-relaxed">
                        See how real people achieved their dream physiques with our proven programs.
                        Your transformation could be next.
                    </p>
                </div>


                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : transformations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {transformations.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedTransformation(item)}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
                            >
                                <div className="flex h-64 w-full relative">
                                    <div className="w-1/2 relative h-full border-r border-white/10">
                                        <div className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded">
                                            Before
                                        </div>
                                        <img
                                            src={item.beforeImage}
                                            alt={`Before ${item.name}`}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.style.backgroundColor = '#1D1D1D';
                                            }}
                                        />
                                    </div>
                                    <div className="w-1/2 relative h-full">
                                        <div className="absolute top-2 right-2 z-10 bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded">
                                            After
                                        </div>
                                        <img
                                            src={item.afterImage}
                                            alt={`After ${item.name}`}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.style.backgroundColor = '#1D1D1D';
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                            {item.name || item.title || "Untitled"}
                                        </h3>
                                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                                            {item.duration || "N/A"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-greyText">
                                        {item.category || item.achievement || ""}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-greyText">
                        <p className="text-xl">No transformations found.</p>
                        <p className="text-sm mt-2">Check back soon for inspiring stories!</p>
                    </div>
                )}
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {selectedTransformation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setSelectedTransformation(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-greyLight border border-white/10 shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedTransformation(null)}
                                className="absolute right-4 top-4 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-primary transition-colors"
                            >
                                <img src={close} alt="Close" className="h-6 w-6" />
                            </button>

                            <div className="flex flex-col md:flex-row h-[80vh] md:h-[600px]">
                                {/* Images Side */}
                                <div className="md:w-1/2 h-1/2 md:h-full flex flex-row">
                                    <div className="w-1/2 h-full relative border-r border-white/10">
                                        <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded shadow-lg">
                                            Before
                                        </div>
                                        <img
                                            src={selectedTransformation.beforeImage}
                                            alt="Before"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="w-1/2 h-full relative">
                                        <div className="absolute top-4 right-4 z-10 bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded shadow-lg shadow-primary/20">
                                            After
                                        </div>
                                        <img
                                            src={selectedTransformation.afterImage}
                                            alt="After"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="md:w-1/2 h-1/2 md:h-full p-8 md:p-10 flex flex-col justify-center overflow-y-auto">
                                    <div className="mb-2">
                                        <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                                            {selectedTransformation.category || selectedTransformation.achievement}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-gagalin text-white mb-2">
                                        {selectedTransformation.title || selectedTransformation.name}
                                    </h2>
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium">
                                            Duration: {selectedTransformation.duration}
                                        </span>
                                    </div>

                                    <div className="space-y-4 text-gray-300 leading-relaxed">
                                        <p>
                                            {selectedTransformation.description}
                                        </p>
                                        {selectedTransformation.quote && (
                                            <p className="opacity-70 text-sm italic border-l-2 border-primary pl-4">
                                                "{selectedTransformation.quote}"
                                            </p>
                                        )}
                                    </div>

                                    {selectedTransformation.howWeDidIt && (
                                        <div className="mt-8 pt-6 border-t border-white/10">
                                            <h4 className="text-white font-bold mb-3 uppercase text-sm tracking-wider">How We Did It</h4>
                                            <p className="text-sm text-greyText">
                                                {selectedTransformation.howWeDidIt}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
};

export default Transformations;
