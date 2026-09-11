"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const metrics = [
  { value: 500, suffix: "+", label: "Lives Impacted" },
  { value: 15, suffix: "+", label: "Sustainable Projects" },
  { value: 200, suffix: "+", label: "Volunteers" },
];

function AnimatedNumber({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 20 });
  const displayRef = useRef(null);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${Math.round(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [spring, suffix]);

  return (
    <span ref={ref}>
      <span ref={displayRef}>0{suffix}</span>
    </span>
  );
}

export default function Metrics() {
  return (
    <section className="relative border-y border-surface-line bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Numbers That Matter
          </h2>
          <p className="mt-3 text-muted">
            Measurable change driven by women, youth, and community partners
            across Nigeria.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {metrics.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="border-l-2 border-brand-gold pl-5"
            >
              <p className="font-display text-4xl font-bold text-brand-green sm:text-5xl">
                <AnimatedNumber value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-muted">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
