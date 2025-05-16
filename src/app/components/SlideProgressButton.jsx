"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";

export default function SlideProgressButton({
  onNext,
  duration = 5000,
  activeIndex,
  slides = [],
}) {
  const controls = useAnimation();
  const timeoutRef = useRef(null);
  const firstLoad = useRef(true); // 👈 New

  const nextIndex = (activeIndex + 1) % slides.length;
  const nextImage = slides[nextIndex]?.image || "";

  useEffect(() => {
    // Skip animation on first load
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      controls.set({ strokeDashoffset: 100 });
      controls.start({
        strokeDashoffset: 0,
        transition: { duration: duration / 1000, ease: "linear" },
      });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(onNext, duration);
    }

    return () => {
      controls.stop();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, onNext, duration, controls]);

  const handleClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    controls.set({ strokeDashoffset: 100 });
    controls.start({
      strokeDashoffset: 0,
      transition: { duration: duration / 1000, ease: "linear" },
    });

    onNext();
  };

  return (
    <section
      onClick={handleClick}
      className="group absolute right-8 bottom-8 z-50"
      aria-label="Next Slide"
    >
      <div className="relative flex h-[138px] w-[138px] items-center justify-center p-6 before:absolute before:inset-0 before:border before:border-[#2E3C4C] after:absolute after:inset-0 after:z-10 after:border-[4px] after:border-[#EEF4F9]">
        {nextImage && (
          <div className="relative flex h-[97px] w-[97px] items-center justify-center overflow-hidden">
            <AnimatePresence>
              <motion.div
                key={activeIndex}
                initial={
                  firstLoad.current
                    ? false
                    : { clipPath: "inset(40% 0% 40% 0%)" }
                }
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 z-20"
              >
                <img
                  src={nextImage}
                  alt="Next"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
        <div className="absolute inset-0 z-70 flex flex-col items-center justify-center">
          <button
            className="font-work-sans cursor-pointer text-[16px] leading-[110%] font-normal tracking-[0px] text-[#EEF4F9] select-none"
            onClick={handleClick}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
