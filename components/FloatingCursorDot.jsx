"use client";
import { motion } from "framer-motion";

const FloatingCursorDot = ({ animatedX, animatedY }) => {
  return (
    <motion.div
      className="pointer-events-none absolute left-100 z-100 flex h-12 w-12 items-center justify-center rounded-full border border-white bg-black/50 p-4 opacity-50 mix-blend-difference grayscale-50"
      style={{
        left: 0,
        top: 0,
        translateX: animatedX,
        translateY: animatedY,
      }}
    >
      <svg
        className="h-6 w-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
        />
      </svg>
      <svg
        className="h-6 w-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
        />
      </svg>
    </motion.div>
  );
};

export default FloatingCursorDot;
