"use client";
import { motion } from "framer-motion";

const Slide = ({
  slide,
  index,
  centerIndex,
  setCenterIndex,
  slidesLength,
  getTransform,
}) => {
  const offset = index - centerIndex;
  const isCenter = offset === 0;

  if (Math.abs(offset) > 1) return null;

  return (
    <motion.div
      key={index}
      className="absolute transition-[z-index] transition-transform duration-[600ms] ease-in-out"
      drag={isCenter ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.3}
      onDragEnd={(e, info) => {
        if (!isCenter) return;
        if (info.offset.x < -50 && centerIndex < slidesLength - 1) {
          setCenterIndex(centerIndex + 1);
        } else if (info.offset.x > 50 && centerIndex > 0) {
          setCenterIndex(centerIndex - 1);
        }
      }}
      animate={{ transform: getTransform(index) }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <img
        src={slide.image}
        alt={`Image ${index}`}
        className="pointer-events-none h-[619.21px] w-[434.9px] rounded-2xl"
      />
    </motion.div>
  );
};

export default Slide;
