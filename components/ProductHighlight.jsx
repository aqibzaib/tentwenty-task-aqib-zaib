import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const ProductHighlight = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} className="mx-auto max-w-4xl px-6 py-16 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className="space-y-6"
      >
        <motion.h2
          variants={item}
          className="font-work-sans text-center text-[30px] leading-[40px] font-normal tracking-[-1px] text-black md:text-[56px] md:leading-[72px]"
        >
          Quality Products
        </motion.h2>
        <motion.p
          variants={item}
          className="font-work-sans text-center text-[16px] leading-[100%] font-normal tracking-normal text-[#7A7777] md:text-[24px]"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ProductHighlight;
