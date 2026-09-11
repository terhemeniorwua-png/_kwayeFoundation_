"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    id: "partner",
    question: "How can my organization partner with Kwaye Foundation?",
    answer:
      "Email info@kwayefoundation.org with your organization profile, proposed collaboration area (skills training, micro-credit, peace-building, or relief), and preferred geography. Our programs team reviews proposals weekly and will schedule an intro call.",
  },
  {
    id: "donate",
    question: "How do donations reach field projects?",
    answer:
      "About 85% of gifts fund direct field projects, 10% tools and training, and 5% lean operations. You can give online via Paystack or Flutterwave on our Join Us page, or transfer to First Bank account 2030037122 (Kingdom Women and Youth Foundation).",
  },
  {
    id: "receipt",
    question: "Will I receive a donation receipt?",
    answer:
      "Yes. Online gifts generate an emailed confirmation. For bank transfers, send your payment proof and preferred email through the contact form with subject “Donation receipt” and we will acknowledge within 1–2 working days.",
  },
  {
    id: "volunteer",
    question: "Can I volunteer remotely?",
    answer:
      "Absolutely. Roles such as digital skills mentoring and impact storytelling can be remote or hybrid. Use the Volunteer page skill matcher to find a fit, then submit an application.",
  },
  {
    id: "visit",
    question: "Do I need an appointment to visit the office?",
    answer:
      "Walk-ins are welcome during Mon–Fri, 9 AM–5 PM WAT, but we recommend emailing ahead for partnership meetings so the right team member is available at Chris Giwa Shopping Complex, Bukuru Express, Jos South.",
  },
];

export default function ContactFaq() {
  const [openId, setOpenId] = useState(FAQS[0].id);

  return (
    <section className="section-mesh bg-bg-soft py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-muted">
            Quick answers on partnerships, donations, volunteering, and office
            visits.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item) => {
            const open = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg border border-surface-line bg-white"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? "" : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-base font-semibold text-ink">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-brand-green transition ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-surface-line px-5 py-4 text-sm leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
