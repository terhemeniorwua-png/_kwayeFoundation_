"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

const OPEN_POSITIONS = 24;

function LiveCounter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 22 });
  const displayRef = useRef(null);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = String(Math.round(latest));
      }
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref}>
      <span ref={displayRef}>0</span>
    </span>
  );
}

export default function VolunteerHero() {
  return (
    <section className="relative isolate overflow-hidden pt-24">
      <div className="absolute inset-0">
        <Image
          src="/8.png"
          alt="Volunteers supporting Kwaye Foundation field work"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-atmosphere opacity-85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/40 to-black/25" />
      </div>

      <div className="relative mx-auto flex min-h-[54vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-soft">
            Serve with us
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
            Become a Volunteer
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Your time and skills can transform communities across Nigeria.
          </p>

          <div className="mt-8 inline-flex items-center gap-4 rounded-lg border border-white/25 bg-white/10 px-5 py-4 backdrop-blur-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold-soft">
                Open roles right now
              </p>
              <p className="font-display text-3xl font-bold text-white">
                <LiveCounter value={OPEN_POSITIONS} />
                <span className="ml-1 text-lg font-semibold text-white/80">
                  positions
                </span>
              </p>
            </div>
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-gold opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-gold" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
