"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-transparent pointer-events-none overflow-hidden z-40">
      <motion.div
        className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.9)] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
