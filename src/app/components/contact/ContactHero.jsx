"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden pt-24">
      <div className="absolute inset-0">
        <Image
          src="/bg1.png"
          alt="Kwaye Foundation community and partners"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-atmosphere opacity-85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/40 to-black/25" />
      </div>

      <div className="relative mx-auto flex min-h-[50vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-soft">
            Contact
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Have questions, ideas, or want to partner with us? We&apos;d love to
            hear from you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
