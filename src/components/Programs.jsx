
import React, { useState, useEffect } from "react";
import Section from "./reusable/Section";
import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const ProgramCard = ({ plan, highlight }) => (
    <div
        className={`relative flex flex-col gap-3 rounded-lg border-2 p-4 xl:gap-4 xl:p-6 transition-all duration-300 hover:scale-[1.02] ${highlight ? "border-primary" : "border-secondary"
            }`}
    >
        <div
            className={`absolute left-1/2 top-4 -z-10 aspect-square w-2/3 -translate-x-1/2 max-lg:blur-[100px] lg:blur-[200px] ${highlight ? "bg-primaryVar4" : "bg-secondaryVar3"
                }`}
        />
        <div className="space-y-2 text-center xl:space-y-3">
            <p
                className={`text-sm lg:text-base ${highlight ? "text-primary" : "text-secondary"
                    }`}
            >
                {plan.period === "month" ? "Monthly Plan" : "Annual Plan"}
            </p>
            <div className="font-gagalin text-2xl xl:text-[32px]">{plan.title || `${plan.period === "month" ? "Monthly" : "Annual"} ${highlight ? "Supervised" : "General"}`}</div>
        </div>

        <div className="space-y-2 xl:space-y-3">
            <p
                className={`text-center text-sm lg:text-base ${highlight ? "text-primary" : "text-secondary"
                    }`}
            >
                Description
            </p>
            <p className="text-xs xl:text-sm text-center">{plan.description}</p>
        </div>

        <div className="flex-1 space-y-2 xl:space-y-3">
            <p
                className={`text-center text-sm lg:text-base ${highlight ? "text-primary" : "text-secondary"
                    }`}
            >
                Features
            </p>
            <ul className="text-xs xl:text-sm space-y-1">
                {plan.features?.map((feature, i) => (
                    <li key={i} className="list-inside list-disc">
                        {feature}
                    </li>
                ))}
            </ul>
        </div>

        <div className="text-center text-lg font-bold xl:text-[28px] mt-4">
            ₹ {plan.price}
            <span className="text-lg font-medium text-greyText">
                /{plan.period === "month" ? "mo" : "yr"}
            </span>
        </div>

        <button
            className={`w-full rounded-[20px] py-3 text-lg font-medium transition-colors ${highlight
                ? "bg-primary hover:bg-primaryVar1 focus:bg-primaryVar2"
                : "bg-secondary hover:bg-secondaryVar1 focus:bg-secondaryVar2"
                }`}
        >
            Select Plan
        </button>
    </div>
);

const Programs = () => {
    const [generalPlans, setGeneralPlans] = useState([]);
    const [supervisedPlans, setSupervisedPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "programs"));
                const fetchedPrograms = querySnapshot.docs.map(doc => {
                    const data = doc.data();

                    // Normalize program type to categorize correctly
                    let type = 'general';
                    const pTypeString = data.programType ? data.programType.toLowerCase() : '';
                    if (pTypeString.includes('supervised')) {
                        type = 'supervised';
                    }

                    // Normalize plan period
                    const planString = data.planType ? data.planType.toLowerCase() : '';
                    const period = planString.includes('year') || planString.includes('annual') ? 'year' : 'month';

                    return {
                        id: doc.id,
                        title: data.title,
                        price: data.price,
                        period: period,
                        features: data.facilities || [],
                        description: data.description,
                        type: type
                    };
                });

                setGeneralPlans(fetchedPrograms.filter(p => p.type === 'general'));
                setSupervisedPlans(fetchedPrograms.filter(p => p.type === 'supervised'));
            } catch (error) {
                console.error("Error fetching programs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    return (
        <Section className="min-h-screen pt-24">
            <motion.div
                variants={revealVar}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="container space-y-12 xl:space-y-16"
            >
                <div className="space-y-4 text-center xl:space-y-6">
                    <h1 className="text-3xl font-bold lg:text-4xl xl:text-5xl font-gagalin">
                        Our <span className="text-primary">Programs</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-sm lg:text-base text-greyText">
                        Explore our diverse range of fitness programs designed to cater to every
                        level and goal. Choose between our flexible General access or our comprehensive Supervised training.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        {/* General Programs Section */}
                        {generalPlans.length > 0 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-greyLight"></div>
                                    <h2 className="text-xl font-bold lg:text-2xl text-secondary">General Programs</h2>
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-greyLight"></div>
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2 lg:w-3/4 mx-auto">
                                    {generalPlans.map((plan) => (
                                        <ProgramCard key={plan.id} plan={plan} highlight={false} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Supervised Programs Section */}
                        {supervisedPlans.length > 0 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-greyLight"></div>
                                    <h2 className="text-xl font-bold lg:text-2xl text-primary">Supervised Programs</h2>
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-greyLight"></div>
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2 lg:w-3/4 mx-auto">
                                    {supervisedPlans.map((plan) => (
                                        <ProgramCard key={plan.id} plan={plan} highlight={true} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {generalPlans.length === 0 && supervisedPlans.length === 0 && (
                            <div className="text-center py-20 text-greyText">
                                <p className="text-xl">No programs available at the moment.</p>
                            </div>
                        )}
                    </>
                )}

            </motion.div>
        </Section>
    );
};

export default Programs;
