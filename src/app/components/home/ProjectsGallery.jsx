"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Visionary African Women Summit",
    location: "International / Rwanda",
    image: "/1.png",
    category: "Women Empowerment",
  },
  {
    title: "Leadership & Advocacy Forum",
    location: "Plateau State",
    image: "/2.png",
    category: "Women Empowerment",
  },
  {
    title: "Community Skills Fair",
    location: "Jos South",
    image: "/3.png",
    category: "Youth Skills",
  },
  {
    title: "Youth Vocational Training",
    location: "Northern Nigeria",
    image: "/4.png",
    category: "Youth Skills",
  },
  {
    title: "Rural Women Enterprise Day",
    location: "Benue / Plateau",
    image: "/5.png",
    category: "Women Empowerment",
  },
  {
    title: "Peace & Reintegration Outreach",
    location: "Middle Belt",
    image: "/6.png",
    category: "Community Relief",
  },
  {
    title: "Micro-Credit Orientation",
    location: "FCT & Plateau",
    image: "/7.png",
    category: "Women Empowerment",
  },
  {
    title: "Volunteer Field Immersion",
    location: "Across Nigeria",
    image: "/8.png",
    category: "Community Relief",
  },
];

export default function ProjectsGallery() {
  return (
    <section className="section-mesh bg-bg-soft py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Our Projects
            </h2>
            <p className="mt-3 text-muted">
              Explore moments from our events, conferences, and community work.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            View All Projects
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (index % 4) * 0.05, duration: 0.4 }}
              className="group overflow-hidden rounded-lg border border-surface-line bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">
                  {project.category}
                </p>
                <h3 className="mt-1 font-display text-base font-semibold text-ink">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs text-muted">{project.location}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
