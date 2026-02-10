import React, { useState, useEffect } from "react";
import Section from "./reusable/Section";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";

const Plans = () => {
  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "programs"));
        const fetchedPlans = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          // Determine type for fallback title/categorization
          let type = 'general';
          const pTypeString = data.programType ? data.programType.toLowerCase() : '';
          if (pTypeString.includes('supervised')) {
            type = 'supervised';
          }

          return {
            id: doc.id,
            ...data,
            type,
            // Normalize for filter
            periodNormalized: data.planType?.toLowerCase().includes("year") || data.planType?.toLowerCase().includes("annual")
              ? "annual"
              : "monthly"
          };
        });
        setPlansData(fetchedPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const filteredPlans = plansData.filter(plan => plan.periodNormalized === selectedPeriod);

  return (
    <Section>
      <motion.div
        variants={revealVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container space-y-4 xl:space-y-6"
      >
        <div className="space-y-4 text-center xl:space-y-6">
          <h2 className="text-xl font-semibold lg:text-2xl lg:font-bold xl:text-3xl">
            Our <span className="text-primary">Plans</span>
          </h2>
          <p className="text-xs lg:text-sm xl:text-base">
            Select the plan that suits your fitness goals and let our expert
            coaches guide you every step of the way.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="mx-auto flex w-fit cursor-pointer items-center justify-between rounded-[40px] border-2 border-secondary text-xs md:text-sm overflow-hidden p-1 gap-2">
          <div
            onClick={() => setSelectedPeriod("monthly")}
            className={`rounded-[40px] px-8 py-3 transition-colors ${selectedPeriod === "monthly" ? "bg-primary text-white" : "bg-transparent text-greyText hover:text-white"}`}
          >
            Monthly
          </div>
          <div
            onClick={() => setSelectedPeriod("annual")}
            className={`rounded-[40px] px-8 py-3 transition-colors ${selectedPeriod === "annual" ? "bg-primary text-white" : "bg-transparent text-greyText hover:text-white"}`}
          >
            Yearly
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-greyText">Loading plans...</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-9">
            {filteredPlans.map((plan, i) => {
              // Highlight logic: Highlight the 2nd item if there are 3, or basic logic
              // Original used plan.id === 2. We'll simulate this by highlighting index 1 (middle)
              const isHighlight = i === 1;

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col gap-3 rounded-lg border-2 p-4 xl:gap-4 xl:p-6 ${isHighlight
                    ? "border-primary max-sm:-order-1"
                    : "border-secondary"
                    }`}
                >
                  <div
                    className={`absolute left-1/2 top-4 -z-10 aspect-square w-2/3 -translate-x-1/2 max-lg:blur-[100px] lg:blur-[200px] ${isHighlight ? "bg-primaryVar4" : "bg-secondaryVar3"
                      }`}
                  />
                  <div className="space-y-2 text-center xl:space-y-3">
                    <p
                      className={`text-sm lg:text-base ${isHighlight ? "text-primary" : "text-secondary"
                        }`}
                    >
                      Package
                    </p>
                    <div className="font-gagalin text-2xl xl:text-[32px] capitalize">
                      {plan.title || plan.package || plan.name || `${plan.periodNormalized === 'annual' ? 'Annual' : 'Monthly'} ${plan.type === 'supervised' ? 'Supervised' : 'General'}`}
                    </div>
                  </div>

                  <div className="space-y-2 xl:space-y-3">
                    <p
                      className={`text-center text-sm lg:text-base ${isHighlight ? "text-primary" : "text-secondary"
                        }`}
                    >
                      Description
                    </p>
                    <p className="text-xs xl:text-sm text-center">{plan.description}</p>
                  </div>
                  <div className="flex-1 space-y-2 xl:space-y-3">
                    <p
                      className={`text-center text-sm lg:text-base ${isHighlight ? "text-primary" : "text-secondary"
                        }`}
                    >
                      Features
                    </p>
                    <ul className="text-xs xl:text-sm space-y-1">
                      {plan.facilities && plan.facilities.map((feature, idx) => (
                        <li key={idx} className="list-inside list-disc">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-center text-lg font-bold xl:text-[28px] mt-4">
                    ₹ {plan.price}
                    <span className="text-lg font-medium text-greyText">/INR</span>
                  </div>
                  <button
                    className={`w-full rounded-[20px] py-4 text-lg font-medium transition-colors ${isHighlight
                      ? "bg-primary hover:bg-primaryVar1 focus:bg-primaryVar2"
                      : "bg-secondary hover:bg-secondaryVar1 focus:bg-secondaryVar2"
                      }`}
                  >
                    Choose This Plan
                  </button>
                </div>
              );
            })}

            {filteredPlans.length === 0 && (
              <div className="col-span-full text-center py-10 text-greyText">
                No plans available for this period.
              </div>
            )}
          </div>
        )}
      </motion.div>
    </Section>
  );
};

export default Plans;
