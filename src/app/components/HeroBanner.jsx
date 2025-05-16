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

const textVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeIn" } },
};

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
                  animate={{ scaleY: 1, scaleX: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 z-10 h-full w-full origin-center object-cover"
                />
              )}
            </AnimatePresence>

            {/* Current slide image */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.img
                  key={"active-" + id}
                  src={image}
                  alt={title}
                  initial={
                    firstLoad.current && index === 0
                      ? false
                      : { scaleY: 0.3, scaleX: 1, opacity: 1 }
                  }
                  animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 40,
                    damping: 30,
                    mass: 1,
                    opacity: { duration: 1, ease: "linear" },
                  }}
                  className="absolute inset-0 z-20 h-full w-full origin-center object-cover"
                />
              )}
            </AnimatePresence>

            <div className="absolute inset-0 z-30 bg-black/30" />

            {/* <div className="relative z-40 flex h-full items-center justify-center">
              <motion.div
                key={id + "-text"}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
                className="max-w-3xl px-4 text-center"
              >
                <motion.h1
                  className="mb-4 text-5xl font-bold text-white"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                >
                  {title}
                </motion.h1>

                <motion.p
                  className="mb-8 text-xl text-white"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                >
                  {subtitle}
                </motion.p>

                <motion.button
                  className="rounded bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                >
                  Contact Us
                </motion.button>
              </motion.div>
            </div> */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
