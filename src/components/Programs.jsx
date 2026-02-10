
import React, { useState } from "react";
import Section from "./reusable/Section";
import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";

const generalPlans = [
    {
        id: 1,
        title: "Monthly General",
        price: "29",
        period: "month",
        features: [
            "Access to gym facilities",
            "Standard equipment usage",
            "Lockers included",
            "Free WiFi",
        ],
        description: "Perfect for those who want flexibility and basic gym access.",
    },
    {
        id: 2,
        title: "Annual General",
        price: "290",
        period: "year",
        features: [
            "All Monthly benefits",
            "2 months free",
            "Priority support",
            "Guest pass (1/month)",
        ],
        description: "Commit to your fitness journey and save with our annual plan.",
    },
];

const supervisedPlans = [
    {
        id: 1,
        title: "Monthly Supervised",
        price: "99",
        period: "month",
        features: [
            "Personal Trainer (2x/week)",
            "Custom workout plan",
            "Nutritional guidance",
            "Progress tracking",
        ],
        description: "Get expert guidance to maximize your monthly progress.",
    },
    {
        id: 2,
        title: "Annual Supervised",
        price: "990",
        period: "year",
        features: [
            "All Monthly benefits",
            "2 months free",
            "Advanced body analysis",
            "Unlimited group classes",
        ],
        description: "Transform your life with a year of dedicated coaching.",
    },
];

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
            <div className="font-gagalin text-2xl xl:text-[32px]">{plan.title}</div>
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
                {plan.features.map((feature, i) => (
                    <li key={i} className="list-inside list-disc">
                        {feature}
                    </li>
                ))}
            </ul>
        </div>

        <div className="text-center text-lg font-bold xl:text-[28px] mt-4">
            {plan.price}$
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

                {/* General Programs Section */}
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

                {/* Supervised Programs Section */}
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

            </motion.div>
        </Section>
    );
};

export default Programs;
