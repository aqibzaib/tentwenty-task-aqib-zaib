"use client";
import { AnimatePresence, motion } from "framer-motion";

const SlideText = ({ centerIndex, slides }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={centerIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-work-sans mb-5 text-center text-[36px] leading-[60px] font-normal tracking-[-1px] text-black">
          {slides[centerIndex].title}
        </h2>
        <p className="font-work-sans text-center text-[24px] leading-[100%] font-normal text-[#7A7777]">
          {slides[centerIndex].subtitle}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default SlideText;
