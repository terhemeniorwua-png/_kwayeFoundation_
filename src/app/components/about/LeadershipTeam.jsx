"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-surface-line text-brand-green transition hover:border-brand-green hover:bg-brand-green hover:text-white"
    >
      {children}
    </a>
  );
}

const leaders = [
  {
    name: "Dr. Aisha Bello",
    role: "Founder & Executive Director",
    bio: "Leads strategy for women-centered skills programs, micro-credit schemes, and advocacy across Plateau and beyond.",
    image: "/1.png",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Engr. Musa Danjuma",
    role: "Board Chair",
    bio: "Guides governance and partnerships that keep field programs accountable, transparent, and community-owned.",
    image: "/2.png",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Grace Okafor",
    role: "Director of Programs",
    bio: "Designs youth vocational pathways, IDP reintegration support, and peace-building interventions nationwide.",
    image: "/bg3.png",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Ibrahim Sani",
    role: "Head of Community Outreach",
    bio: "Coordinates rural outreach, volunteer immersion, and local facilitator networks in the Middle Belt.",
    image: "/6.png",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Ngozi Eze",
    role: "Finance & Stewardship Lead",
    bio: "Ensures donor funds flow primarily to field projects, tools, and training with clear reporting.",
    image: "/5.png",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Fatima Abdullahi",
    role: "Women Enterprise Advisor",
    bio: "Mentors cooperatives and market-ready enterprises emerging from Kwaye skills-acquisition cohorts.",
    image: "/7.png",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
];

export default function LeadershipTeam() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Leadership & Executive Team
            </h2>
            <p className="mt-3 text-muted">
              Seasoned professionals in conflict resolution, peace-building,
              skills training, and community development guiding our mandate.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-md border border-brand-green px-4 py-2.5 text-sm font-semibold text-brand-green transition hover:bg-brand-green hover:text-white"
          >
            Partner with leadership
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((person, index) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: (index % 3) * 0.05, duration: 0.4 }}
              className="overflow-hidden rounded-lg border border-surface-line bg-bg-soft"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {person.name}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-brand-green">
                  {person.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {person.bio}
                </p>
                <div className="mt-4 flex gap-2">
                  <SocialLink href={person.socials.linkedin} label={`${person.name} on LinkedIn`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.94 8.5H3.75V20h3.19V8.5zM5.35 3.5a1.85 1.85 0 100 3.7 1.85 1.85 0 000-3.7zM20.25 20h-3.18v-5.6c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95V20H9.88V8.5h3.05v1.57h.04c.43-.8 1.47-1.65 3.02-1.65 3.23 0 3.83 2.13 3.83 4.9V20z" />
                    </svg>
                  </SocialLink>
                  <SocialLink href={person.socials.twitter} label={`${person.name} on Twitter`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.19l-4.84-6.33L5.4 22H2.64l6.97-7.97L2 2h6.34l4.37 5.8L18.244 2zm-1.09 18h1.71L7.01 3.94H5.18L17.154 20z" />
                    </svg>
                  </SocialLink>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
