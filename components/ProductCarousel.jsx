"use client";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import FloatingCursorDot from "./FloatingCursorDot";
import ProductHighlight from "./ProductHighlight";
import Slide from "./Slide";
import SlideText from "./SlideText";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1745752727106-356ebbd8e297?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Aaliyah Khan",
    subtitle: "Dubai, United Arab Emirates",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1688901653255-88753dbcb6ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "James Miller",
    subtitle: "New York, United States",
  },
  {
    image:
      "https://images.unsplash.com/photo-1532135468830-e51699205b70?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Sophie Turner",
    subtitle: "London, United Kingdom",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618059485046-161ace8b928d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // vivid colors
    title: "Étienne Dupont",
    subtitle: "Paris, France",
  },
  {
    image:
      "https://images.unsplash.com/photo-1745276243806-273cf314e281?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // high contrast
    title: "Li Wei",
    subtitle: "Singapore",
  },
  {
    image:
      "https://images.unsplash.com/photo-1744400363852-d2eb4908b9a8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Jack Thompson",
    subtitle: "Sydney, Australia",
  },
  {
    image:
      "https://images.unsplash.com/photo-1569511850437-6dfab062c00b?q=80&w=1959&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Amelia Chen",
    subtitle: "Toronto, Canada",
  },
  {
    image:
      "https://images.unsplash.com/photo-1745752727106-356ebbd8e297?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Lukas Schneider",
    subtitle: "Munich, Germany",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1688901653255-88753dbcb6ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Faisal Al-Mansoori",
    subtitle: "Doha, Qatar",
  },
];

const ProductCarousel = () => {
  const [centerIndex, setCenterIndex] = useState(5);
  const [showCursor, setShowCursor] = useState(false);
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
