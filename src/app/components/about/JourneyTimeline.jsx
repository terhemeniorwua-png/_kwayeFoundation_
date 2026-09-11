"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const milestones = [
  {
    year: "2016",
    title: "Foundation established",
    detail:
      "KWAYE Foundation launches in Plateau State to empower rural women and youths through a bottom-up approach.",
  },
  {
    year: "2018",
    title: "Skills & micro-credit expansion",
    detail:
      "In-house professionals begin structured skill-acquisition training paired with micro-credit for economic emancipation.",
  },
  {
    year: "2020",
    title: "Protection & counselling mandate",
    detail:
      "Programs widen to human-rights protection, substance-abuse counselling, and rehabilitation for survivors of domestic abuse.",
  },
  {
    year: "2022",
    title: "Peace-building & IDP reintegration",
    detail:
      "Seasoned practitioners lead conflict resolution and reintegration of internally displaced persons into wider society.",
  },
  {
    year: "2024",
    title: "Multi-state field presence",
    detail:
      "Active project nodes expand across Plateau, FCT, Lagos, Kaduna, Benue, and Rivers through partners and volunteers.",
  },
  {
    year: "2026",
    title: "National partnership era",
    detail:
      "Deepening sustainable development partnerships to scale vocational tools, enterprise hubs, and community relief.",
  },
];

export default function JourneyTimeline() {
  const [active, setActive] = useState(0);
  const current = milestones[active];

  return (
    <section className="section-mesh bg-bg-soft py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Our Journey Across Nigeria
          </h2>
          <p className="mt-3 text-muted">
            An interactive timeline of milestones—from local beginnings to
            multi-state expansion.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative">
            <div className="absolute bottom-3 left-[15px] top-3 w-px bg-surface-line sm:left-[19px]" />
            <ul className="space-y-3">
              {milestones.map((item, index) => {
                const isActive = index === active;
                return (
                  <li key={item.year}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      className={`relative flex w-full items-start gap-4 rounded-lg border px-3 py-3 text-left transition sm:px-4 ${
                        isActive
                          ? "border-brand-green bg-white shadow-sm"
                          : "border-transparent hover:border-surface-line hover:bg-white/70"
                      }`}
                    >
                      <span
                        className={`mt-1 inline-flex h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-bg-soft sm:h-4 sm:w-4 ${
                          isActive ? "bg-brand-gold" : "bg-brand-green"
                        }`}
                      />
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-wider text-brand-green">
                          {item.year}
                        </span>
                        <span className="mt-0.5 block font-display text-base font-semibold text-ink">
                          {item.title}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.year}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col justify-center rounded-lg border border-surface-line bg-white p-6 sm:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
                Milestone · {current.year}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                {current.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                {current.detail}
              </p>
              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  disabled={active === 0}
                  onClick={() => setActive((v) => Math.max(0, v - 1))}
                  className="rounded-md border border-surface-line px-3 py-2 text-sm font-medium text-ink disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={active === milestones.length - 1}
                  onClick={() =>
                    setActive((v) => Math.min(milestones.length - 1, v + 1))
                  }
                  className="rounded-md bg-brand-green px-3 py-2 text-sm font-semibold text-white disabled:opacity-40"
                >
                  Next milestone
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
