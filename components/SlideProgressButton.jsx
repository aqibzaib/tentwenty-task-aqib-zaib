"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SlideProgressButton({
  onNext,
  duration = 5000,
  activeIndex,
  slides = [],
  disabled = false,
}) {
  const timeoutRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const nextIndex = (activeIndex + 1) % slides.length;
  const nextImage = slides[nextIndex]?.image || "";

  // Fixed values for a 138x138 coordinate system
  const baseStroke = 4;
  const animatedStroke = 8;
  const borderInset = animatedStroke / 2;
  const perimeter = useMemo(() => {
    return 2 * (138 - animatedStroke) + 2 * (138 - animatedStroke);
  }, []);

  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setProgress(perimeter);

    const start = performance.now();
    function animate(now) {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(perimeter * (1 - pct));
      if (pct < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    }
    animationFrameRef.current = requestAnimationFrame(animate);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(onNext, duration);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [activeIndex, perimeter, duration, onNext]);

  const handleClick = (e) => {
    if (disabled) return;
    e.stopPropagation();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current);
    onNext();
  };

  return (
    <section
      onClick={handleClick}
      className={` group cursor-pointer ${disabled ? "pointer-events-none opacity-50" : ""}`}
      aria-label="Next Slide"
    >
      <div className="relative flex h-[115px] w-[115px] items-center justify-center md:h-[138px] md:w-[138px]">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 138 138"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background border */}
          <rect
            x={baseStroke / 2}
            y={baseStroke / 2}
            width={138 - baseStroke}
            height={138 - baseStroke}
            stroke="#EEF4F9"
            strokeWidth={baseStroke}
            opacity="0.5"
          />
          {/* Animated progress border */}
          <motion.rect
            x={borderInset}
            y={borderInset}
            width={138 - animatedStroke}
            height={138 - animatedStroke}
            stroke="#EEF4F9"
            strokeWidth={animatedStroke}
            strokeDasharray={perimeter}
            strokeDashoffset={progress}
            strokeLinecap="round"
            transition={{ type: "tween", ease: "linear", duration: 0 }}
          />
        </svg>

        {nextImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence>
              <motion.div
                key={activeIndex}
                initial={{ clipPath: "inset(40% 0% 40% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 z-20 flex items-center justify-center"
              >
                <img
                  src={nextImage}
                  alt="Next"
                  className="h-[77.5px] w-[77.5px] md:h-[97px] md:w-[97px] object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <button
            className="font-work-sans pointer-events-none text-[16px] text-[#EEF4F9] select-none"
            disabled={disabled}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
