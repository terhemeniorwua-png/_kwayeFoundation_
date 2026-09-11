"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Amina Yusuf",
    role: "Skills training graduate · Jos",
    quote:
      "Kwaye Foundation gave me vocational tools and mentorship. Today I run a small enterprise that supports my family.",
    image: "/3.png",
  },
  {
    name: "Chinedu Okeke",
    role: "Youth volunteer · Abuja",
    quote:
      "Volunteering opened my eyes to community organizing. The foundation treats youth as partners, not spectators.",
    image: "/4.png",
  },
  {
    name: "Hauwa Ibrahim",
    role: "Women empowerment beneficiary · Kaduna",
    quote:
      "The micro-credit orientation and peer network helped me rebuild after hardship. I finally feel seen and supported.",
    image: "/5.png",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const active = testimonials[index];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Voices From The Field
          </h2>
          <p className="mt-3 text-muted">
            Beneficiaries and volunteers share what collective action means in
            their communities.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-surface-line bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/60 p-6 sm:p-10">
          <Quote className="mb-4 text-brand-gold" size={28} />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="grid items-center gap-8 md:grid-cols-[1fr_200px]"
            >
              <div>
                <p className="text-lg leading-relaxed text-ink sm:text-xl">
                  “{active.quote}”
                </p>
                <p className="mt-5 font-display text-base font-semibold text-brand-green">
                  {active.name}
                </p>
                <p className="text-sm text-muted">{active.role}</p>
              </div>
              <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-lg md:w-full">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={`Show testimonial from ${item.name}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === index ? "bg-brand-green" : "bg-surface-line"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() =>
                  setIndex(
                    (prev) =>
                      (prev - 1 + testimonials.length) % testimonials.length,
                  )
                }
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-surface-line bg-white text-ink hover:border-brand-green"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() =>
                  setIndex((prev) => (prev + 1) % testimonials.length)
                }
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-surface-line bg-white text-ink hover:border-brand-green"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
