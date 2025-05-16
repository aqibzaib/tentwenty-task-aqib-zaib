import React from "react";
import { motion } from "framer-motion";

const textVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export default function SlideDetails({ active, total }) {
  return (
    <>
      <div className="font-work-sans flex  items-center justify-center gap-[9px]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <motion.p className="font-work-sans text-[16px] leading-[110%] font-normal tracking-[0px] text-[#EEF4F9]">
            1
          </motion.p>
        </motion.div>
        <hr className="h-1 w-full max-w-[103px] bg-[#EEF4F9] text-[#EEF4F9]" />
        <p className="font-work-sans text-[16px] leading-[110%] font-normal tracking-[0px] text-[#EEF4F9]">
          {total}
        </p>
      </div>
    </>
  );
}
