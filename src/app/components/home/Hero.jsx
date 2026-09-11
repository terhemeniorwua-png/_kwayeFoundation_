"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [videoOpen]);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/bg2.png"
          alt="Kwaye Foundation community gathering"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-atmosphere opacity-90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/20" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-24 pt-28 sm:px-6 lg:justify-center lg:px-8 lg:pb-20 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-soft">
            Kwaye Foundation
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Empowering Communities, Building Futures
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            We believe in the power of collective action to transform lives.
            Join us in creating lasting impact across Nigeria.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/join-us"
              className="inline-flex items-center justify-center rounded-md bg-brand-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-brand-gold-soft"
            >
              Join Us
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center justify-center rounded-md border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              About Us
            </Link>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-2 rounded-md px-2 py-3 text-sm font-semibold text-white transition hover:text-brand-gold-soft"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/40">
                <Play size={16} fill="currentColor" />
              </span>
              Watch Our Story
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {videoOpen ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Watch Our Story"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setVideoOpen(false)}
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/50 text-white hover:bg-black/70"
                aria-label="Close video"
              >
                <X size={18} />
              </button>
              <div className="relative aspect-video w-full bg-ink">
                <Image
                  src="/bg1.png"
                  alt="Women leaders representing Kwaye Foundation's story"
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 px-6 text-center">
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold-soft">
                    Our Story
                  </p>
                  <h2 className="mt-3 max-w-lg font-display text-2xl font-bold text-white sm:text-3xl">
                    From local circles to national impact
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
                    Kingdom Women And Youth Empowerment Foundation transforms
                    social and economic circumstances for women and youths
                    through skills training, micro-credit, counselling, and
                    peace-building across Nigeria.
                  </p>
                  <Link
                    href="/about-us"
                    className="mt-6 inline-flex rounded-md bg-brand-gold px-5 py-2.5 text-sm font-semibold text-ink hover:bg-brand-gold-soft"
                  >
                    Read our full story
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
