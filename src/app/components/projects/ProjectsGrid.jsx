"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PROJECT_CATEGORIES, PROJECTS } from "./projectData";

export default function ProjectsGrid() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    if (category === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === category);
  }, [category]);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section className="bg-bg-soft py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Projects Across Nigeria
            </h2>
            <p className="mt-3 text-muted">
              Filter by focus area, then open any project for the full story and
              ways to support.
            </p>
          </div>
          <p className="text-sm font-medium text-muted">
            Showing{" "}
            <span className="font-semibold text-brand-green">
              {filtered.length}
            </span>{" "}
            initiative{filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        <div
          className="mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Project categories"
        >
          {PROJECT_CATEGORIES.map((tab) => {
            const selected = category === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setCategory(tab)}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                  selected
                    ? "bg-brand-green text-white"
                    : "border border-surface-line bg-white text-muted hover:border-brand-green/40 hover:text-ink"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.button
                key={project.id}
                type="button"
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: (index % 6) * 0.04, duration: 0.35 }}
                onClick={() => setActive(project)}
                className="group overflow-hidden rounded-lg border border-surface-line bg-white text-left shadow-sm shadow-black/[0.03] transition hover:-translate-y-0.5 hover:border-brand-green/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                      project.status === "Ongoing"
                        ? "bg-brand-gold text-ink"
                        : "bg-white/95 text-brand-green"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">
                    {project.category}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                    <MapPin size={13} className="shrink-0" />
                    {project.location}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-brand-green">
                    View details →
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.28 }}
              className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-xl bg-white shadow-2xl sm:rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/50 text-white hover:bg-black/70"
                aria-label="Close project details"
              >
                <X size={18} />
              </button>

              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-brand-green">
                    {active.category}
                  </span>
                  <span
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                      active.status === "Ongoing"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-gray-100 text-muted"
                    }`}
                  >
                    {active.status}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-bold text-ink">
                  {active.title}
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin size={14} />
                  {active.location}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-surface-line px-2.5 py-1 text-xs font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
                  {active.narrative}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/join-us"
                    className="inline-flex rounded-md bg-brand-gold px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-brand-gold-soft"
                  >
                    Support this project
                  </Link>
                  <Link
                    href="/volunteer"
                    className="inline-flex rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Volunteer here
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="inline-flex rounded-md border border-surface-line px-5 py-2.5 text-sm font-semibold text-ink hover:bg-bg-soft"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
