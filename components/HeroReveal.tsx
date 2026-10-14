"use client";
import { motion } from "motion/react";

export default function HeroReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
