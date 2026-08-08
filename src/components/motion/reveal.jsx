"use client";

import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
