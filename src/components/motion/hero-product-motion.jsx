"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { HeroScene } from "@/components/product/scenes";

const states = [
  "Documents received",
  "Evidence extracted",
  "Financial signals",
  "Policy evaluated",
  "Recommendation ready",
];

export function HeroProductMotion() {
  const reducedMotion = useReducedMotion();
  const [activeState, setActiveState] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (reducedMotion || isPaused) return undefined;
    timer.current = window.setInterval(() => setActiveState((value) => (value + 1) % states.length), 5200);
    return () => window.clearInterval(timer.current);
  }, [isPaused, reducedMotion]);

  function selectState(index) {
    setActiveState(index);
    setIsPaused(true);
  }

  return <div className="hero-motion" data-stage={activeState}>
    <div className="hero-motion__controls" role="group" aria-label="Document-to-decision states">
      {states.map((label, index) => <button key={label} type="button" aria-pressed={activeState === index} onClick={() => selectState(index)}>
        <span>{String(index + 1).padStart(2, "0")}</span>{label}
      </button>)}
      {!reducedMotion && <button className="hero-motion__pause" type="button" onClick={() => setIsPaused((value) => !value)} aria-pressed={isPaused}>
        {isPaused ? "Play sequence" : "Pause sequence"}
      </button>}
    </div>
    <motion.div
      className="hero-motion__canvas"
      animate={reducedMotion ? {} : { y: [0, -3, 0], rotateX: [0, 0.25, 0] }}
      transition={{ duration: 5.2, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatDelay: 0.2 }}
    >
      <HeroScene activeStage={activeState} />
    </motion.div>
  </div>;
}
