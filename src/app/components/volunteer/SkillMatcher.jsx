"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Camera,
  HeartHandshake,
  Laptop,
  Stethoscope,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";

const SKILLS = [
  { id: "teaching", label: "Teaching / Facilitation", icon: BookOpen },
  { id: "trades", label: "Trades / Vocational", icon: Wrench },
  { id: "health", label: "Health / Counselling", icon: Stethoscope },
  { id: "media", label: "Media / Storytelling", icon: Camera },
  { id: "tech", label: "Tech / Digital", icon: Laptop },
  { id: "care", label: "Care / Community Support", icon: HeartHandshake },
];

const ROLES = [
  {
    id: "skills-trainer",
    title: "Field Skills Trainer",
    match: ["teaching", "trades"],
    mode: "On-site",
    description:
      "Lead vocational sessions and mentor trainees in community training hubs.",
  },
  {
    id: "counsellor",
    title: "Psychosocial Support Aide",
    match: ["health", "care"],
    mode: "On-site / Hybrid",
    description:
      "Support counselling drives, referral pathways, and survivor-centred listening spaces.",
  },
  {
    id: "storyteller",
    title: "Impact Storyteller",
    match: ["media", "tech"],
    mode: "Remote / Field",
    description:
      "Document project moments, edit short films, and amplify beneficiary voices.",
  },
  {
    id: "logistics",
    title: "Outreach Logistics Lead",
    match: ["care", "trades", "tech"],
    mode: "On-site",
    description:
      "Coordinate kits, venues, and volunteer rotations for immersion days.",
  },
  {
    id: "digital-mentor",
    title: "Digital Skills Mentor",
    match: ["tech", "teaching"],
    mode: "Remote",
    description:
      "Coach youth cohorts on digital literacy, freelancing basics, and online safety.",
  },
  {
    id: "enterprise-coach",
    title: "Women Enterprise Coach",
    match: ["teaching", "care", "trades"],
    mode: "Hybrid",
    description:
      "Guide cooperatives on bookkeeping, market linkage, and peer accountability.",
  },
];

export default function SkillMatcher({ onSelectRole }) {
  const [selected, setSelected] = useState([]);

  const ranked = useMemo(() => {
    if (selected.length === 0) return [];
    return ROLES.map((role) => {
      const hits = role.match.filter((s) => selected.includes(s)).length;
      const score = Math.round((hits / role.match.length) * 100);
      return { ...role, score, hits };
    })
      .filter((r) => r.hits > 0)
      .sort((a, b) => b.score - a.score);
  }, [selected]);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Find where you fit best
          </h2>
          <p className="mt-3 text-muted">
            Select the skills you bring. We will match you to the volunteer
            roles where your strengths create the most impact.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            const active = selected.includes(skill.id);
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => toggle(skill.id)}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                  active
                    ? "border-brand-green bg-emerald-50 text-ink"
                    : "border-surface-line bg-bg-soft text-muted hover:border-brand-green/40"
                }`}
              >
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-md ${
                    active
                      ? "bg-brand-green text-white"
                      : "bg-white text-brand-green"
                  }`}
                >
                  <Icon size={18} />
                </span>
                <span className="text-sm font-semibold">{skill.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {selected.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg border border-dashed border-surface-line bg-bg-soft px-5 py-6 text-sm text-muted"
              >
                Pick one or more skills above to reveal your best-fit roles.
              </motion.p>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid gap-4 md:grid-cols-2"
              >
                {ranked.map((role) => (
                  <article
                    key={role.id}
                    className="rounded-lg border border-surface-line bg-bg-soft p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-ink">
                          {role.title}
                        </h3>
                        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-brand-green">
                          {role.mode}
                        </p>
                      </div>
                      <span className="rounded-md bg-brand-gold/20 px-2.5 py-1 text-xs font-bold text-ink">
                        {role.score}% match
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {role.description}
                    </p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-brand-green"
                        style={{ width: `${role.score}%` }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectRole?.(role.title)}
                      className="mt-4 text-sm font-semibold text-brand-green hover:text-emerald-700"
                    >
                      Use this role in my application →
                    </button>
                  </article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
