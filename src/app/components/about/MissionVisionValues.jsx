"use client";

import { motion } from "framer-motion";
import { Eye, HeartHandshake, Leaf, ShieldCheck, Target, Users } from "lucide-react";

const pillars = [
  {
    title: "Our Mission",
    icon: Target,
    body: "To transform the social, economic, psychological, political, and legal circumstances of women and youths in Nigeria through bottom-up empowerment, skills acquisition, and sustainable community partnerships.",
  },
  {
    title: "Our Vision",
    icon: Eye,
    body: "A Nigeria where women and youth lead self-sustaining communities—equipped with skills, protected in dignity, and connected through meaningful opportunity.",
  },
];

const values = [
  {
    title: "Integrity",
    icon: ShieldCheck,
    body: "Transparent stewardship of resources and honest relationships with every community we serve.",
  },
  {
    title: "Sustainability",
    icon: Leaf,
    body: "Programs designed for lasting livelihoods—skills, micro-credit, and local ownership over short-term aid.",
  },
  {
    title: "Women & Youth Inclusion",
    icon: Users,
    body: "Centering rural women and youths as decision-makers, not just beneficiaries of our work.",
  },
  {
    title: "Collective Care",
    icon: HeartHandshake,
    body: "Counselling, rehabilitation, peace-building, and reintegration for those escaping abuse or displacement.",
  },
];

export default function MissionVisionValues() {
  return (
    <section className="bg-bg-soft py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Mission, Vision & Core Values
          </h2>
          <p className="mt-3 text-muted">
            Kingdom Women and Youths Empowerment (KWAYE) Foundation is a
            non-profit organization using deeply involving thematic processes to
            eradicate social vices that harm Nigerian women and youths.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="rounded-lg border border-surface-line bg-white p-6 shadow-sm shadow-black/[0.03]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-brand-green">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.05 + index * 0.05, duration: 0.35 }}
                className="rounded-lg border border-surface-line bg-white p-5"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-amber-50 text-brand-gold">
                  <Icon size={18} />
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
