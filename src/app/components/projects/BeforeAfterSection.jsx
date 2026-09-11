"use client";

import { motion } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { BEFORE_AFTER } from "./projectData";

function BeforeAfterSlider({ item }) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(98, Math.max(2, next)));
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <article className="overflow-hidden rounded-lg border border-surface-line bg-white shadow-sm shadow-black/[0.03]">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] cursor-ew-resize select-none touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="img"
        aria-label={`Before and after comparison for ${item.title}`}
      >
        <Image
          src={item.afterImage}
          alt={`${item.title} — after`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          draggable={false}
        />

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={item.beforeImage}
            alt={`${item.title} — before`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
          />
        </div>

        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-white shadow"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-green text-white shadow-md">
            <ChevronsLeftRight size={16} />
          </div>
        </div>

        <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          Before
        </span>
        <span className="absolute right-3 top-3 rounded-md bg-brand-green/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          After
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-ink">
          {item.title}
        </h3>
        <p className="mt-1 text-xs font-medium text-brand-green">
          {item.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {item.description}
        </p>
        <label className="mt-4 flex items-center gap-3 text-xs text-muted">
          <span className="shrink-0">Drag</span>
          <input
            type="range"
            min="2"
            max="98"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="w-full accent-brand-green"
            aria-label={`Adjust before and after slider for ${item.title}`}
          />
        </label>
      </div>
    </article>
  );
}

export default function BeforeAfterSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Before & After
          </h2>
          <p className="mt-3 text-muted">
            Drag the slider to see how key community spaces evolved through
            Kwaye Foundation interventions.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {BEFORE_AFTER.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <BeforeAfterSlider item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
