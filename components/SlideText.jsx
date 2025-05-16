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
        <h2 className="font-work-sans mt-[47.73px] mb-[20px] text-center text-[24px] leading-[40px] font-medium tracking-[-1px] text-black md:mt-[54.9px] md:text-[36px] md:leading-[60px] md:font-normal">
          {slides[centerIndex].title}
        </h2>
        <p className="font-work-sans pb-[100px] text-center text-[16px] leading-[22px] font-medium text-[#7A7777] md:pb-[174px] md:text-[24px] md:leading-[100%] md:font-normal">
          {slides[centerIndex].subtitle}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default SlideText;
