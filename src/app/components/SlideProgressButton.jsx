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

  // Calculate next slide index (looping)
  const nextIndex = (activeIndex + 1) % slides.length;
  const nextImage = slides[nextIndex]?.image || "";

  useEffect(() => {
    controls.set({ strokeDashoffset: 100 });
    controls.start({
      strokeDashoffset: 0,
      transition: { duration: duration / 1000, ease: "linear" },
    });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(onNext, duration);

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
    <button
      onClick={handleClick}
      className="group absolute right-8 bottom-8 z-50"
      aria-label="Next Slide"
    >
      <div className="relative flex h-[138px] w-[138px] items-center justify-center border border-[#EEF4F9] p-6">
        {nextImage && (
          <>
            <div className="relative flex h-[97px] w-[97px] items-center justify-center overflow-hidden">
              <AnimatePresence>
                <motion.div
                  key={activeIndex}
                  initial={{ clipPath: "inset(40% 0% 40% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 z-20"
                >
                  <img
                    src={nextImage}
                    alt={"title"}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold text-white select-none">
            Next
          </span>
        </div>
      </div>
    </button>
  );
}
