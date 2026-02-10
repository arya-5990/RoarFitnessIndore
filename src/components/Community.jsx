import { revealVar } from "../motion/opacityReveal";
import Section from "./reusable/Section";

import { motion } from "motion/react";

const Community = () => {
  return (
    <Section>
      <motion.div
        variants={revealVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container flex flex-col gap-6 items-center"
      >
        <div className="relative flex flex-col items-center gap-4 w-full max-w-6xl mx-auto text-center">
          <div className="absolute left-1/2 top-1/2 -z-10 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primaryVar5 blur-[150px]" />
          <h2 className="text-xl font-semibold lg:text-2xl lg:font-bold xl:text-3xl">
            Join Our <span className="text-primary">Fitness Community</span>
          </h2>
          <p className="max-w-2xl max-xl:text-xs text-greyText">
            Join us now to unlock exclusive access to personalized workout
            plans, expert coaching, and a supportive community that will help
            you achieve your fitness goals.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-4">
            <div className="rounded-lg bg-grey p-4 xl:p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-grey/80 cursor-default">
              <h4 className="mb-2 text-center font-medium max-xl:text-sm xl:mb-3">
                Expert <span className="text-primary">Coaching</span>
              </h4>
              <p className="text-xs text-greyText">
                Customized routines that match your fitness level and goals,
                ensuring you achieve the best results in the most efficient way.
              </p>
            </div>
            <div className="rounded-lg bg-grey p-4 xl:p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-grey/80 cursor-default">
              <h4 className="mb-2 text-center font-medium max-xl:text-sm xl:mb-3">
                <span className="text-primary">Personalized</span> Workout Plans
              </h4>
              <p className="text-xs text-greyText">
                Work with certified trainers who will guide you every step of
                the way to ensure you're on the right track.
              </p>
            </div>
            <div className="rounded-lg bg-grey p-4 xl:p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-grey/80 cursor-default">
              <h4 className="mb-2 text-center font-medium max-xl:text-sm xl:mb-3">
                <span className="text-primary">Community </span> Support
              </h4>
              <p className="text-xs text-greyText">
                Join a vibrant community of fitness enthusiasts where you can
                share experiences, get motivated, and stay inspired.
              </p>
            </div>
            <div className="rounded-lg bg-grey p-4 xl:p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-grey/80 cursor-default">
              <h4 className="mb-2 text-center font-medium max-xl:text-sm xl:mb-3">
                Exclusive <span className="text-primary">Resources</span>
              </h4>
              <p className="text-xs text-greyText">
                Access premium content, including video tutorials, nutrition
                guides, and member-only discounts on fitness gear.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Community;
