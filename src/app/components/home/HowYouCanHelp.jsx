"use client";

import { motion } from "framer-motion";
import { HandHeart, Handshake, Users } from "lucide-react";
import Link from "next/link";

const ways = [
  {
    title: "Volunteer",
    description:
      "Lend your skills and passion to our projects on the ground or remotely.",
    href: "/volunteer",
    icon: Users,
    cta: "Apply to volunteer",
  },
  {
    title: "Donate",
    description:
      "Your financial contribution directly fuels our programs and initiatives.",
    href: "/join-us",
    icon: HandHeart,
    cta: "Make a donation",
  },
  {
    title: "Partner",
    description:
      "Collaborate with us to amplify our impact and reach more communities.",
    href: "/contact-us",
    icon: Handshake,
    cta: "Start a partnership",
  },
];

export default function HowYouCanHelp() {
  return (
    <section className="section-mesh bg-bg-soft py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            How You Can Help
          </h2>
          <p className="mt-3 text-muted">
            Every action strengthens the circle of empowerment for women and
            youth.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {ways.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
                className="flex flex-col rounded-lg border border-surface-line bg-white p-6 shadow-sm shadow-black/[0.03] transition hover:-translate-y-0.5 hover:border-brand-green/30"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-brand-green">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-5 text-sm font-semibold text-brand-green hover:text-emerald-700"
                >
                  {item.cta} →
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
