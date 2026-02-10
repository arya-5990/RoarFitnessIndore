import React from "react";
import Section from "./reusable/Section";
import { heroImg } from "../assets";
import HeroCta from "./HeroCta";


import { motion } from "motion/react";
import { revealFromRight, revealFromTop } from "../motion/hero";

const Hero = () => {
  return (
    <Section className="relative overflow-hidden flex items-center min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-120px)] !py-0">
      <div className="absolute left-0 h-full w-[260px] -translate-x-1/2 rounded-full bg-secondaryVar3 blur-[250px]" />
      <div className="absolute right-0 h-full w-[260px] translate-x-1/2 rounded-full bg-primaryVar4 blur-[250px]" />
      <div className="container space-y-4">
        <div className="flex shrink-0 items-center justify-between gap-1 md:gap-4 lg:gap-8">
          <div className="flex flex-col items-center gap-6 xl:gap-9">
            <motion.div
              variants={revealFromTop}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-4 lg:gap-6 xl:gap-8"
            >
              <div className="text-xl font-semibold sm:text-2xl lg:text-3xl xl:text-[40px]">
                Achieve Your
              </div>
              <div className="font-gagalin text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Fitness Goals
                </span>
              </div>
              <div className="text-xl font-semibold sm:text-3xl lg:text-4xl xl:text-[40px]">
                With Roar Fitness
              </div>
            </motion.div>
            <div className="max-md:hidden">
              <HeroCta />
            </div>
          </div>
          <motion.div
            variants={revealFromRight}
            initial="hidden"
            animate="visible"
            className="relative flex w-fit shrink-0 items-center justify-center lg:row-span-2"
          >
            <div className="absolute inset-0 -z-10 m-auto aspect-square w-[80%] rounded-full bg-gradient-to-l from-primary to-secondary blur-3xl opacity-60" />
            <img
              src={heroImg}
              alt="Bodybuilder posing"
              className="h-auto w-full max-w-[400px] object-contain drop-shadow-2xl sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
            />
          </motion.div>
        </div>
        <div className="md:hidden">
          <HeroCta />
        </div>
      </div>
    </Section>
  );
};

export default Hero;
