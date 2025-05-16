"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideProgressButton from "./SlideProgressButton"; // <- Import here
import SlideDetails from "./SlideDetails";
import SlideWithProgress from "./SlideWithProgress";
import HeroSlideContent from "./HeroSlideContent";

const slides = [
  {
    id: 1,
    title: "Welcome",
    subtitle: "Intro",
    image: "/images/hero-background.webp",
  },
  {
    id: 2,
    title: "Stunning",
    subtitle: "Transitions",
    image: "/images/hero-background1.jpg",
  },
  {
    id: 3,
    title: "Built With",
    subtitle: "Framer Motion",
    image: "/images/hero-background2.jpg",
  },
  {
    id: 4,
    title: "Welcome",
    subtitle: "Intro",
    image: "/images/hero-background.webp",
  },
  {
    id: 5,
    title: "Stunning",
    subtitle: "Transitions",
    image: "/images/hero-background1.jpg",
  },
  {
    id: 6,
    title: "Built With",
    subtitle: "Framer Motion",
    image: "/images/hero-background2.jpg",
  },
  {
    id: 7,
    title: "Welcome",
    subtitle: "Intro",
    image: "/images/hero-background.webp",
  },
  {
    id: 8,
    title: "Stunning",
    subtitle: "Transitions",
    image: "/images/hero-background1.jpg",
  },
  {
    id: 9,
    title: "Built With",
    subtitle: "Framer Motion",
    image: "/images/hero-background2.jpg",
  },
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [animating, setAnimating] = useState(false);
  const swiperRef = useRef(null);
  const animationTimeout = useRef();
  const firstLoad = useRef(true);

  const handleNext = () => {
    if (animating) return; // Prevent multiple calls
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

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
    }, 0); // Adjusted to 0 for immediate reset
  }

  useEffect(() => {
    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 999999 }} // delay handled manually
        onSlideChange={onSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="h-screen"
      >
        {slides.map(({ id, title, subtitle, image }, index) => (
          <SwiperSlide key={id}>
            <div className="relative h-screen w-full overflow-hidden">
              {/* Previous Image */}
              <AnimatePresence>
                {!firstLoad && animating && prevIndex === index && (
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

              {/* Active Image */}
              <AnimatePresence>
                {activeIndex === index &&
                  (firstLoad && index === 0 ? (
                    // No animation for first image
                    <div className="absolute inset-0 z-20">
                      <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
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
                  ))}
              </AnimatePresence>

              {/* Overlay */}
              <div className="absolute inset-0 z-30" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <HeroSlideContent />

      <SlideWithProgress
        onNext={goNext}
        duration={5000}
        activeIndex={activeIndex}
        slides={slides}
      />
    </div>
  );
}
