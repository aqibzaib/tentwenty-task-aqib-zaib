"use client";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import FloatingCursorDot from "./FloatingCursorDot";
import ProductHighlight from "./ProductHighlight";
import Slide from "./Slide";
import SlideText from "./SlideText";

const slides = [
  {
    image: "https://picsum.photos/id/1015/1200/800",
    title: "Aaliyah Khan",
    subtitle: "Dubai, United Arab Emirates",
  },
  {
    image: "https://picsum.photos/id/1016/1200/800",
    title: "James Miller",
    subtitle: "New York, United States",
  },
  {
    image: "https://picsum.photos/id/1018/1200/800",
    title: "Sophie Turner",
    subtitle: "London, United Kingdom",
  },
  {
    image: "https://picsum.photos/id/1020/1200/800",
    title: "Étienne Dupont",
    subtitle: "Paris, France",
  },
  {
    image: "https://picsum.photos/id/1024/1200/800",
    title: "Li Wei",
    subtitle: "Singapore",
  },
  {
    image: "https://picsum.photos/id/1035/1200/800",
    title: "Jack Thompson",
    subtitle: "Sydney, Australia",
  },
  {
    image: "https://picsum.photos/id/1040/1200/800",
    title: "Amelia Chen",
    subtitle: "Toronto, Canada",
  },
  {
    image: "https://picsum.photos/id/1052/1200/800",
    title: "Lukas Schneider",
    subtitle: "Munich, Germany",
  },
  {
    image: "https://picsum.photos/id/1062/1200/800",
    title: "Faisal Al-Mansoori",
    subtitle: "Doha, Qatar",
  },
];

const ProductCarousel = () => {
  const [centerIndex, setCenterIndex] = useState(5);
  const [showCursor, setShowCursor] = useState(false); // Track cursor visibility
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  const animatedX = useTransform(springX, (x) => x - 12);
  const animatedY = useTransform(springY, (y) => y - 12);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const getTransform = (index) => {
    const offset = index - centerIndex;
    if (offset === 0) {
      return "translateY(-30px) translateZ(0px) rotateZ(0deg) scale(1)";
    } else if (Math.abs(offset) === 1) {
      const direction = offset < 0 ? -1 : 1;
      return `translateX(${direction * 525}px) translateY(40px) translateZ(-80px) rotateZ(${direction * 15}deg) scale(1)`;
    } else {
      return "scale(0)";
    }
  };

  return (
    <>
      <ProductHighlight />
      <div
        ref={containerRef}
        className="relative h-[620px] w-full perspective-[1200px]"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowCursor(true)} // Show on enter
        onMouseLeave={() => setShowCursor(false)} // Hide on leave
      >
        <div className="transform-style-preserve-3d relative flex h-full w-full items-center justify-center">
          {slides.map((slide, index) => {
            // Calculate offset with wrap-around for infinite loop
            let offset = index - centerIndex;
            if (offset > Math.floor(slides.length / 2)) offset -= slides.length;
            if (offset < -Math.floor(slides.length / 2))
              offset += slides.length;

            if (Math.abs(offset) > 1) return null;

            return (
              <Slide
                key={index}
                slide={slide}
                index={index}
                centerIndex={centerIndex}
                setCenterIndex={setCenterIndex}
                slidesLength={slides.length}
                getTransform={getTransform}
              />
            );
          })}
        </div>
        {showCursor && (
          <FloatingCursorDot animatedX={animatedX} animatedY={animatedY} />
        )}
      </div>
      <div>
        <SlideText centerIndex={centerIndex} slides={slides} />
      </div>
    </>
  );
};

export default ProductCarousel;
