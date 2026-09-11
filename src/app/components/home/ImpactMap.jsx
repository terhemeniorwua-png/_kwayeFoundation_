"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const regions = [
  {
    id: "plateau",
    name: "Plateau State",
    x: 52,
    y: 48,
    projects: "HQ & community training hubs",
    count: 6,
  },
  {
    id: "abuja",
    name: "FCT Abuja",
    x: 48,
    y: 42,
    projects: "Policy advocacy & youth forums",
    count: 3,
  },
  {
    id: "lagos",
    name: "Lagos",
    x: 28,
    y: 62,
    projects: "Skills acquisition workshops",
    count: 4,
  },
  {
    id: "kaduna",
    name: "Kaduna",
    x: 44,
    y: 34,
    projects: "Women micro-enterprise support",
    count: 2,
  },
  {
    id: "benue",
    name: "Benue",
    x: 54,
    y: 54,
    projects: "Agricultural livelihoods",
    count: 2,
  },
  {
    id: "rivers",
    name: "Rivers",
    x: 42,
    y: 72,
    projects: "Youth vocational outreach",
    count: 1,
  },
];

export default function ImpactMap() {
  const [active, setActive] = useState(regions[0]);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Regional Impact Across Nigeria
          </h2>
          <p className="mt-3 text-muted">
            Explore where Kwaye Foundation programs are active. Hover or tap a
            node to see field presence by region.
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6 rounded-lg border border-surface-line bg-bg-soft p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-green">
                Active region
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                {active.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{active.projects}</p>
              <p className="mt-3 text-sm font-semibold text-ink">
                {active.count} project node{active.count > 1 ? "s" : ""}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-surface-line bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-4 sm:aspect-square">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            role="img"
            aria-label="Interactive map of Nigeria showing Kwaye Foundation project locations"
          >
            <defs>
              <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="100%" stopColor="#a7f3d0" />
              </linearGradient>
            </defs>

            {/* Simplified Nigeria outline */}
            <path
              d="M22 28 C28 18, 40 14, 52 16 C64 18, 74 22, 80 30 C86 40, 84 52, 78 60 C74 68, 68 74, 58 78 C48 82, 38 84, 30 78 C22 72, 18 62, 16 52 C14 42, 16 34, 22 28 Z"
              fill="url(#land)"
              stroke="#166534"
              strokeWidth="0.8"
              opacity="0.95"
            />
            <path
              d="M30 78 C34 86, 42 90, 50 88 C56 86, 60 82, 58 78"
              fill="#bbf7d0"
              stroke="#166534"
              strokeWidth="0.6"
            />

            {regions.map((region) => (
              <g
                key={region.id}
                className="cursor-pointer"
                onMouseEnter={() => setActive(region)}
                onFocus={() => setActive(region)}
                onClick={() => setActive(region)}
                tabIndex={0}
                role="button"
                aria-label={`${region.name}: ${region.projects}`}
              >
                <circle
                  cx={region.x}
                  cy={region.y}
                  r={active.id === region.id ? 3.2 : 2.4}
                  className="map-node"
                  fill={active.id === region.id ? "#eab308" : "#166534"}
                  stroke="#fff"
                  strokeWidth="0.6"
                />
                <circle
                  cx={region.x}
                  cy={region.y}
                  r="5"
                  fill="transparent"
                />
              </g>
            ))}
          </svg>

          <div className="pointer-events-none absolute bottom-4 left-4 rounded-md bg-white/90 px-3 py-2 text-xs text-muted shadow-sm">
            Tap nodes for project details
          </div>
        </div>
      </div>
    </section>
  );
}
