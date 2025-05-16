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
    title: "Client 1",
    subtitle: "Dubai, United Arab Emirates",
  },
  {
    image: "https://picsum.photos/id/1016/1200/800",
    title: "Client 2",
    subtitle: "New York, United States",
  },
  {
    image: "https://picsum.photos/id/1018/1200/800",
    title: "Client 3",
    subtitle: "London, United Kingdom",
  },
  {
    image: "https://picsum.photos/id/1020/1200/800",
    title: "Client 4",
    subtitle: "Paris, France",
  },
  {
    image: "https://picsum.photos/id/1024/1200/800",
    title: "Client 5",
    subtitle: "Singapore",
  },
  {
    image: "https://picsum.photos/id/1035/1200/800",
    title: "Client 6",
    subtitle: "Sydney, Australia",
  },
  {
    image: "https://picsum.photos/id/1040/1200/800",
    title: "Client 7",
    subtitle: "Toronto, Canada",
  },
  {
    image: "https://picsum.photos/id/1052/1200/800",
    title: "Client 8",
    subtitle: "Munich, Germany",
  },
  {
    image: "https://picsum.photos/id/1062/1200/800",
    title: "Client 9",
    subtitle: "Doha, Qatar",
  },
];
const ProductCarousel = () => {
  const [centerIndex, setCenterIndex] = useState(2);
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
      return "translateY(-40px) translateZ(0px) rotateZ(0deg) scale(1)";
    } else if (Math.abs(offset) === 1) {
      const direction = offset < 0 ? -1 : 1;
      return `translateX(${direction * 475}px) translateY(40px) translateZ(-80px) rotateZ(${direction * 15}deg) scale(0.9)`;
    } else {
      return "scale(0)";
    }
  };

  return (
    <>
      <ProductHighlight />
      <div
        ref={containerRef}
        className="relative h-[520px] w-full perspective-[1200px]"
        onMouseMove={handleMouseMove}
      >
        <div className="transform-style-preserve-3d relative flex h-full w-full items-center justify-center">
          {slides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              centerIndex={centerIndex}
              setCenterIndex={setCenterIndex}
              slidesLength={slides.length}
              getTransform={getTransform}
            />
          ))}
        </div>

        <FloatingCursorDot animatedX={animatedX} animatedY={animatedY} />

        <div>
          <SlideText centerIndex={centerIndex} slides={slides} />
        </div>
      </div>
    </>
  );
};

export default ProductCarousel;
