"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    title: "Welcome to Our Site",
    subtitle: "Smooth animated hero banner with Next.js",
    image: "/images/hero-background.webp",
  },
  {
    id: 2,
    title: "Stunning Transitions",
    subtitle: "Text and images fade smoothly",
    image: "/images/hero-background1.jpg",
  },
  {
    id: 3,
    title: "Built with Tailwind & Framer Motion",
    subtitle: "Modern, fast, and beautiful",
    image: "/images/hero-background2.jpg",
  },
  {
    id: 4,
    title: "Welcome to Our Site",
    subtitle: "Smooth animated hero banner with Next.js",
    image: "/images/hero-background.webp",
  },
  {
    id: 5,
    title: "Stunning Transitions",
    subtitle: "Text and images fade smoothly",
    image: "/images/hero-background1.jpg",
  },
  {
    id: 6,
    title: "Built with Tailwind & Framer Motion",
    subtitle: "Modern, fast, and beautiful",
    image: "/images/hero-background2.jpg",
  },
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [animating, setAnimating] = useState(false);
  const animationTimeout = useRef(null);
  const firstLoad = useRef(true);

  function onSlideChange(swiper) {
    const newIndex = swiper.realIndex;
    setPrevIndex(activeIndex);
    setActiveIndex(newIndex);
    setAnimating(true);

    if (firstLoad.current) {
      firstLoad.current = false;
    }

    if (animationTimeout.current) clearTimeout(animationTimeout.current);

    animationTimeout.current = setTimeout(() => {
      setAnimating(false);
      setPrevIndex(null);
    }, 2000);
  }

  useEffect(() => {
    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
    };
  }, []);

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      onSlideChange={onSlideChange}
      className="h-screen"
    >
      {slides.map(({ id, title, subtitle, image }, index) => (
        <SwiperSlide key={id}>
          <div className="relative h-screen w-full overflow-hidden">
            {/* Previous slide image */}
            <AnimatePresence>
              {animating && prevIndex === index && (
                <motion.img
                  key={"prev-" + id}
                  src={image}
                  alt={title}
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 z-10 h-full w-full object-cover"
                />
              )}
            </AnimatePresence>

            {/* Active slide with clip reveal */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  key={"active-" + id}
                  initial={{ clipPath: "inset(40% 0% 40% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 z-20"
                >
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Overlay */}
            <div className="absolute inset-0 z-30 bg-black/30" />

            {/* Optional text */}
            {/* 
            <div className="relative z-40 flex h-full items-center justify-center">
              <div className="max-w-3xl px-4 text-center">
                <h1 className="mb-4 text-5xl font-bold text-white">{title}</h1>
                <p className="mb-8 text-xl text-white">{subtitle}</p>
                <button className="rounded bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200">
                  Contact Us
                </button>
              </div>
            </div>
            */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
