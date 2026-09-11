"use client";

import { motion } from "framer-motion";

const MAP_QUERY =
  "Chris+Giwa+Shopping+Complex+Bukuru+Express+Jos+South+Plateau+State+Nigeria";

export default function ContactMap() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Visit our headquarters
          </h2>
          <p className="mt-3 text-muted">
            Chris Giwa Shopping Complex, Bukuru Express, Jos South, Plateau
            State, Nigeria.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-lg border border-surface-line shadow-sm"
        >
          <div className="aspect-[16/9] w-full bg-bg-soft sm:aspect-[21/9]">
            <iframe
              title="Kwaye Foundation headquarters map"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col gap-3 border-t border-surface-line bg-bg-soft px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-muted">
              Interactive map of our Jos South office location.
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex text-sm font-semibold text-brand-green hover:text-emerald-700"
            >
              Open in Google Maps →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
