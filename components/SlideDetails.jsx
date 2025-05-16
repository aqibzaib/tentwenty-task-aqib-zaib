import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SlideDetails({ active, total }) {
  // Defensive: fallback to 0 if undefined
  const safeActive = typeof active === "number" && !isNaN(active) ? active : 0;
  const safeTotal = typeof total === "number" && !isNaN(total) ? total : 1;

  const current = String(safeActive + 1).padStart(2, "0");
  const totalStr = String(safeTotal).padStart(2, "0");

  return (
    <div className="font-work-sans flex items-center justify-center gap-[9px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-work-sans text-[14px] md:text-[16px] leading-[110%] font-normal tracking-[0px] text-[#EEF4F9]"
        >
          {current}
        </motion.p>
      </AnimatePresence>
      <hr className="h-1 w-full max-w-[100px] md:max-w-[103px] bg-[#EEF4F9] text-[#EEF4F9]" />
      <p className="font-work-sans text-[14px] md:text-[16px] leading-[110%] font-normal tracking-[0px] text-[#EEF4F9]">
        {totalStr}
      </p>
    </div>
  );
}
