"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";

const RAISED = 3500000;
const GOAL = 5000000;
const percent = Math.min(100, Math.round((RAISED / GOAL) * 100));

function formatNaira(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DonationProgress() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.45 }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-green/20 bg-white/95 px-3 py-3 shadow-[0_-8px_30px_rgba(17,24,39,0.08)] backdrop-blur-md sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">
              Community fund progress
            </p>
            <p className="text-xs font-medium text-muted sm:text-sm">
              {formatNaira(RAISED)} / {formatNaira(GOAL)} goal
            </p>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-emerald-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-green to-brand-gold"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ delay: 1.3, duration: 0.9, ease: "easeOut" }}
            />
          </div>
          <p className="mt-1 text-[11px] text-muted sm:text-xs">
            {percent}% funded — help us close the gap for field programs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Link
            href="/join-us"
            className="inline-flex items-center justify-center rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-ink transition hover:bg-brand-gold-soft"
          >
            Donate now
          </Link>
          <button
            type="button"
            aria-label="Dismiss donation progress"
            onClick={() => setVisible(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-bg-soft hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
