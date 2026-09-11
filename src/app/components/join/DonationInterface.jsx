"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const TIERS = [
  { id: 5000, amount: 5000, label: "₦5,000", blurb: "Seed a training day snack & materials pack." },
  { id: 20000, amount: 20000, label: "₦20,000", blurb: "Equip 1 youth with vocational tools.", featured: true },
  { id: 50000, amount: 50000, label: "₦50,000", blurb: "Sponsor a micro-enterprise starter kit." },
  { id: "custom", amount: null, label: "Custom Amount", blurb: "Choose any amount that fits your capacity." },
];

function formatNaira(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function getImpact(amount, frequency) {
  const a = Number(amount) || 0;
  const monthlyNote =
    frequency === "monthly"
      ? " Each month this gift renews automatically until you pause it."
      : "";

  if (a <= 0) {
    return {
      headline: "Select an amount to see your impact",
      detail: "Your gift funds field projects, tools, and training across Nigeria.",
    };
  }
  if (a < 5000) {
    return {
      headline: `${formatNaira(a)} supports outreach logistics`,
      detail: `Helps cover transport and materials for community sessions.${monthlyNote}`,
    };
  }
  if (a < 20000) {
    const packs = Math.max(1, Math.floor(a / 5000));
    return {
      headline: `${formatNaira(a)} funds ~${packs} training support pack${packs > 1 ? "s" : ""}`,
      detail: `Covers learning materials and facilitation aids for skills sessions.${monthlyNote}`,
    };
  }
  if (a < 50000) {
    const youths = Math.floor(a / 20000);
    const remainder = a % 20000;
    return {
      headline:
        youths >= 1
          ? `${formatNaira(a)} equips ${youths} youth${youths > 1 ? "s" : ""} with vocational tools`
          : `${formatNaira(a)} equips 1 youth with vocational tools`,
      detail:
        remainder > 0
          ? `Plus ${formatNaira(remainder)} toward facilitation and follow-up mentoring.${monthlyNote}`
          : `Starter toolkit and orientation for vocational pathways.${monthlyNote}`,
    };
  }
  const kits = Math.floor(a / 50000);
  const extraYouth = Math.floor((a % 50000) / 20000);
  return {
    headline:
      kits >= 1
        ? `${formatNaira(a)} sponsors ${kits} enterprise starter kit${kits > 1 ? "s" : ""}`
        : `${formatNaira(a)} sponsors enterprise support`,
    detail:
      extraYouth > 0
        ? `Also covers tools for ${extraYouth} additional youth trainee${extraYouth > 1 ? "s" : ""}.${monthlyNote}`
        : `Capital and coaching for women-led micro-enterprises.${monthlyNote}`,
  };
}

export default function DonationInterface() {
  const [tierId, setTierId] = useState(20000);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [provider, setProvider] = useState("paystack");
  const [phase, setPhase] = useState("form");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const amount = useMemo(() => {
    if (tierId === "custom") {
      const n = Number(String(customAmount).replace(/,/g, ""));
      return Number.isFinite(n) ? n : 0;
    }
    return Number(tierId);
  }, [tierId, customAmount]);

  const impact = useMemo(
    () => getImpact(amount, frequency),
    [amount, frequency],
  );

  useEffect(() => {
    if (!checkoutOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape" && phase !== "processing") setCheckoutOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [checkoutOpen, phase]);

  const openCheckout = () => {
    if (!amount || amount < 1000) return;
    setPhase("form");
    setErrors({});
    setCheckoutOpen(true);
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim() || form.name.trim().length < 3) {
      next.name = "Enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email.";
    }
    if (!/^[+0-9\s()-]{8,}$/.test(form.phone.trim())) {
      next.phone = "Enter a valid phone number.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const processPayment = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setPhase("processing");
    await new Promise((r) => setTimeout(r, 1600));
    setPhase("success");
  };

  const closeCheckout = () => {
    if (phase === "processing") return;
    setCheckoutOpen(false);
    if (phase === "success") {
      setPhase("form");
      setForm({ name: "", email: "", phone: "" });
    }
  };

  return (
    <section className="bg-bg-soft py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Choose your gift
          </h2>
          <p className="mt-3 text-muted">
            Give once or monthly. Watch the impact calculator update as you
            select an amount.
          </p>
        </div>

        <div className="mb-8 inline-flex rounded-md border border-surface-line bg-white p-1">
          {[
            { id: "one-time", label: "One-time" },
            { id: "monthly", label: "Monthly" },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFrequency(opt.id)}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                frequency === opt.id
                  ? "bg-brand-green text-white"
                  : "text-muted hover:text-ink"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {TIERS.map((tier) => {
              const selected = tierId === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setTierId(tier.id)}
                  className={`rounded-lg border p-5 text-left transition ${
                    selected
                      ? "border-brand-green bg-white shadow-sm ring-1 ring-brand-green/30"
                      : "border-surface-line bg-white hover:border-brand-green/40"
                  } ${tier.featured ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-xl font-bold text-ink">
                      {tier.label}
                    </p>
                    {tier.featured ? (
                      <span className="rounded-md bg-brand-gold/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink">
                        Popular
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-muted">{tier.blurb}</p>
                  {tier.id === "custom" && selected ? (
                    <div className="mt-4">
                      <label
                        htmlFor="customAmount"
                        className="text-xs font-semibold uppercase tracking-wide text-muted"
                      >
                        Enter amount (₦)
                      </label>
                      <input
                        id="customAmount"
                        type="number"
                        min="1000"
                        step="500"
                        value={customAmount}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="e.g. 15000"
                        className="mt-1.5 w-full rounded-md border border-surface-line px-3 py-2.5 text-sm outline-none focus:border-brand-green"
                      />
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            <motion.div
              key={`${amount}-${frequency}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-surface-line bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-green">
                Real-time impact calculator
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-ink">
                {impact.headline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {impact.detail}
              </p>
              <div className="mt-5 rounded-md bg-bg-soft px-4 py-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-muted">Gift total</span>
                  <span className="font-semibold text-ink">
                    {formatNaira(amount)}
                    {frequency === "monthly" ? " / month" : ""}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={openCheckout}
                disabled={!amount || amount < 1000}
                className="mt-5 w-full rounded-md bg-brand-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-brand-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
              >
                Proceed to secure checkout
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
                <Lock size={12} />
                Encrypted checkout UI · Paystack & Flutterwave ready
              </p>
            </motion.div>

            <div className="rounded-lg border border-surface-line bg-white p-5">
              <p className="text-sm font-semibold text-ink">Prefer bank transfer?</p>
              <dl className="mt-3 space-y-2 text-sm text-muted">
                <div className="flex justify-between gap-3">
                  <dt>Account name</dt>
                  <dd className="text-right font-medium text-ink">
                    Kingdom Women and Youth Foundation
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Bank</dt>
                  <dd className="font-medium text-ink">First Bank</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Account number</dt>
                  <dd className="font-medium text-ink">2030037122</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Type</dt>
                  <dd className="font-medium text-ink">Current</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {checkoutOpen ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCheckout}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Secure donation checkout"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.28 }}
              className="relative w-full max-w-lg overflow-hidden rounded-t-xl bg-white shadow-2xl sm:rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-surface-line px-5 py-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-brand-green" size={18} />
                  <h3 className="font-display text-base font-semibold text-ink">
                    Secure checkout
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeCheckout}
                  disabled={phase === "processing"}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-bg-soft hover:text-ink disabled:opacity-40"
                  aria-label="Close checkout"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-5 py-5">
                {phase === "success" ? (
                  <div className="py-6 text-center">
                    <CheckCircle2 className="mx-auto text-brand-green" size={40} />
                    <p className="mt-4 font-display text-xl font-bold text-ink">
                      Payment confirmed
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      {formatNaira(amount)}
                      {frequency === "monthly" ? " monthly" : ""} via{" "}
                      {provider === "paystack" ? "Paystack" : "Flutterwave"} is
                      recorded. A receipt will be sent to {form.email}.
                    </p>
                    <button
                      type="button"
                      onClick={closeCheckout}
                      className="mt-6 rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-5 rounded-md bg-bg-soft px-4 py-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted">Amount</span>
                        <span className="font-semibold text-ink">
                          {formatNaira(amount)}
                          {frequency === "monthly" ? " / mo" : ""}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-muted">{impact.headline}</p>
                    </div>

                    <div className="mb-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                        Payment provider
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "paystack", label: "Paystack" },
                          { id: "flutterwave", label: "Flutterwave" },
                        ].map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setProvider(p.id)}
                            disabled={phase === "processing"}
                            className={`rounded-md border px-3 py-2.5 text-sm font-semibold transition ${
                              provider === p.id
                                ? "border-brand-green bg-emerald-50 text-brand-green"
                                : "border-surface-line text-muted hover:border-brand-green/40"
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={processPayment} className="space-y-3" noValidate>
                      <div>
                        <label htmlFor="donorName" className="text-sm font-semibold text-ink">
                          Full name
                        </label>
                        <input
                          id="donorName"
                          value={form.name}
                          disabled={phase === "processing"}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className="mt-1.5 w-full rounded-md border border-surface-line px-3 py-2.5 text-sm outline-none focus:border-brand-green disabled:opacity-60"
                          placeholder="Your name"
                        />
                        {errors.name ? (
                          <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                        ) : null}
                      </div>
                      <div>
                        <label htmlFor="donorEmail" className="text-sm font-semibold text-ink">
                          Email
                        </label>
                        <input
                          id="donorEmail"
                          type="email"
                          value={form.email}
                          disabled={phase === "processing"}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="mt-1.5 w-full rounded-md border border-surface-line px-3 py-2.5 text-sm outline-none focus:border-brand-green disabled:opacity-60"
                          placeholder="you@example.com"
                        />
                        {errors.email ? (
                          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                        ) : null}
                      </div>
                      <div>
                        <label htmlFor="donorPhone" className="text-sm font-semibold text-ink">
                          Phone
                        </label>
                        <input
                          id="donorPhone"
                          type="tel"
                          value={form.phone}
                          disabled={phase === "processing"}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          className="mt-1.5 w-full rounded-md border border-surface-line px-3 py-2.5 text-sm outline-none focus:border-brand-green disabled:opacity-60"
                          placeholder="+234…"
                        />
                        {errors.phone ? (
                          <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                        ) : null}
                      </div>

                      <button
                        type="submit"
                        disabled={phase === "processing"}
                        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-70"
                      >
                        {phase === "processing" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Connecting to{" "}
                            {provider === "paystack" ? "Paystack" : "Flutterwave"}…
                          </>
                        ) : (
                          <>
                            <CreditCard size={16} />
                            Pay {formatNaira(amount)} securely
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
