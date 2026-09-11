"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const slices = [
  {
    label: "Direct Field Projects",
    value: 85,
    color: "#166534",
    description: "Community programs, outreach, and empowerment delivery.",
  },
  {
    label: "Tools & Training",
    value: 10,
    color: "#EAB308",
    description: "Vocational kits, facilitators, and learning materials.",
  },
  {
    label: "Operations",
    value: 5,
    color: "#6B7280",
    description: "Lean admin that keeps programs running responsibly.",
  },
];

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

export default function FinancialBreakdown() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    let frame;
    const start = performance.now();
    const animate = (now) => {
      const t = Math.min(1, (now - start) / 900);
      setProgress(t);
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  const radius = 70;
  const stroke = 22;
  let cursor = 0;
  const arcs = slices.map((slice) => {
    const sweep = slice.value * 3.6 * progress;
    const startAngle = cursor;
    const endAngle = cursor + sweep;
    cursor += slice.value * 3.6;
    return { ...slice, startAngle, endAngle };
  });

  return (
    <section className="bg-white py-16 sm:py-20" ref={ref}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Where Your Support Goes
          </h2>
          <p className="mt-3 text-muted">
            We prioritize field impact. Explore how every naira is allocated
            across programs, tools, and operations.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-sm">
            <svg viewBox="0 0 200 200" className="h-auto w-full">
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#F3F4F6"
                strokeWidth={stroke}
              />
              {arcs.map((arc, index) => (
                <path
                  key={arc.label}
                  d={describeArc(100, 100, radius, arc.startAngle, arc.endAngle)}
                  fill="none"
                  stroke={arc.color}
                  strokeWidth={active === index ? stroke + 4 : stroke}
                  strokeLinecap="butt"
                  className="cursor-pointer transition-[stroke-width]"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${arc.label}: ${arc.value}%`}
                />
              ))}
              <text
                x="100"
                y="96"
                textAnchor="middle"
                className="fill-ink"
                style={{ fontSize: "28px", fontWeight: 700 }}
              >
                {slices[active].value}%
              </text>
              <text
                x="100"
                y="116"
                textAnchor="middle"
                className="fill-muted"
                style={{ fontSize: "10px" }}
              >
                of funds
              </text>
            </svg>
          </div>

          <div className="space-y-3">
            {slices.map((slice, index) => (
              <motion.button
                key={slice.label}
                type="button"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`flex w-full items-start gap-4 rounded-lg border p-4 text-left transition ${
                  active === index
                    ? "border-brand-green bg-emerald-50/50"
                    : "border-surface-line bg-bg-soft hover:border-brand-green/40"
                }`}
              >
                <span
                  className="mt-1 h-3.5 w-3.5 shrink-0 rounded-sm"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-base font-semibold text-ink">
                      {slice.label}
                    </span>
                    <span className="text-sm font-bold text-brand-green">
                      {slice.value}%
                    </span>
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {slice.description}
                  </span>
                  <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-white">
                    <motion.span
                      className="block h-full rounded-full"
                      style={{ backgroundColor: slice.color }}
                      initial={{ width: 0 }}
                      animate={{ width: inView ? `${slice.value}%` : 0 }}
                      transition={{ duration: 0.9, delay: 0.15 + index * 0.08 }}
                    />
                  </span>
                </span>
              </motion.button>
            ))}

            <div className="pt-2">
              <Link
                href="/join-us"
                className="inline-flex rounded-md bg-brand-gold px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-brand-gold-soft"
              >
                Support field projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
