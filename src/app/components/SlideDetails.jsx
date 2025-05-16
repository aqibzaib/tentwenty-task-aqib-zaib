import React from "react";
import { motion } from "framer-motion";

const textVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export default function SlideDetails({ id, title, subtitle }) {
  return (
    <>
      <div className="font-work-sans absolute top-[50%] left-[50%] z-50 flex w-full max-w-[174px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[9px]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <motion.p className="font-work-sans text-[16px] leading-[110%] font-normal tracking-[0px] text-[#EEF4F9]">
            01
          </motion.p>
        </motion.div>
        <hr className="bg-grey-[#EEF4F9] h-1 w-full max-w-[103px]" />
        <p className="font-work-sans text-[16px] leading-[110%] font-normal tracking-[0px] text-[#EEF4F9]">
          04
        </p>
      </div>
    </>
  );
}
