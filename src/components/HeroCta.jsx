import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";
const HeroCta = () => {
  return (
    <motion.div
      variants={revealVar}
      initial="hidden"
      animate="visible"
      className="space-y-4 max-lg:col-span-2 lg:row-start-2 lg:space-y-6 xl:space-y-9"
    >
      <div className="text-base font-medium leading-relaxed text-gray-300 xl:text-lg">
        "Join the Roar Fitness community and transform your fitness journey. Our
        expert coaches and personalized programs are designed to help you
        achieve your goals and exceed your expectations. Ready to make a
        change?"
      </div>
      <div className="flex items-center justify-between gap-3">
        <button className="w-full rounded-xl bg-primary py-3 text-sm font-light transition-all duration-300 hover:bg-primaryVar1 hover:shadow-[0_0_15px_theme('colors.primary')] lg:rounded-2xl lg:text-base lg:font-medium xl:rounded-[20px] xl:text-lg">
          Start Your Journey
        </button>
        <button className="w-full rounded-xl border border-white/20 bg-transparent py-3 text-sm font-light text-white transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] lg:rounded-2xl lg:text-base lg:font-medium xl:rounded-[20px] xl:text-lg">
          Explore Programs
        </button>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-300 lg:text-base">
        <span>⭐</span>
        <span>Join 500+ transformed members in Indore</span>
      </div>
    </motion.div>
  );
};

export default HeroCta;
