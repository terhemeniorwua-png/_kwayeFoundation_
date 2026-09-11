"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  CircleAlert,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useMemo, useState } from "react";

const initial = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

function validate(name, value) {
  const v = value.trim();
  switch (name) {
    case "fullName":
      if (!v) return "Full name is required.";
      if (v.length < 3) return "Enter at least 3 characters.";
      return "";
    case "email":
      if (!v) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email.";
      return "";
    case "subject":
      if (!v) return "Subject is required.";
      if (v.length < 4) return "Subject is too short.";
      return "";
    case "message":
      if (!v) return "Message is required.";
      if (v.length < 20) return "Please share a bit more detail (20+ characters).";
      return "";
    default:
      return "";
  }
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.19l-4.84-6.33L5.4 22H2.64l6.97-7.97L2 2h6.34l4.37 5.8L18.244 2zm-1.09 18h1.71L7.01 3.94H5.18L17.154 20z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ContactFormSection() {
  const [form, setForm] = useState(initial);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [banner, setBanner] = useState(null);

  const errors = useMemo(() => {
    const next = {};
    Object.keys(initial).forEach((key) => {
      next[key] = validate(key, form[key]);
    });
    return next;
  }, [form]);

  const update = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setBanner(null);
  };

  const inputClass = (name) => {
    const base =
      "mt-1.5 w-full rounded-md border bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-gray-400";
    if (!touched[name]) return `${base} border-surface-line focus:border-brand-green`;
    if (errors[name]) return `${base} border-red-400 focus:border-red-500`;
    return `${base} border-brand-green/60 focus:border-brand-green`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const mark = {};
    Object.keys(initial).forEach((k) => {
      mark[k] = true;
    });
    setTouched(mark);

    const invalid = Object.values(errors).some(Boolean);
    if (invalid) {
      setBanner({
        type: "error",
        message: "Please fix the highlighted fields before sending.",
      });
      return;
    }

    setStatus("submitting");
    setBanner({ type: "info", message: "Sending your message…" });
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("success");
    setBanner({
      type: "success",
      message: "Message sent. Our team will reply within 1–2 working days.",
    });
  };

  return (
    <section className="bg-bg-soft py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Contact details
          </h2>
          <p className="mt-3 text-muted">
            Reach the Kwaye Foundation desk for partnerships, donations, media,
            and general inquiries.
          </p>

          <ul className="mt-8 space-y-5">
            <li className="flex gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-brand-green">
                <Mail size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Email</p>
                <a
                  href="mailto:info@kwayefoundation.org"
                  className="text-sm text-brand-green hover:underline"
                >
                  info@kwayefoundation.org
                </a>
                <p className="mt-0.5 text-xs text-muted">
                  General inquiries and partnerships.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-brand-green">
                <Phone size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Phone</p>
                <p className="text-sm text-muted">
                  <a href="tel:+2349081380112" className="hover:text-brand-green">
                    +234 9081380112
                  </a>
                </p>
                <p className="text-sm text-muted">
                  <a href="tel:+2349081300113" className="hover:text-brand-green">
                    +234 9081300113
                  </a>
                  ,{" "}
                  <a href="tel:+2349081300114" className="hover:text-brand-green">
                    +234 9081300114
                  </a>
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-brand-green">
                <MapPin size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Address</p>
                <p className="text-sm leading-relaxed text-muted">
                  Chris Giwa Shopping Complex
                  <br />
                  Bukuru Express, Jos South, Plateau State
                  <br />
                  Nigeria
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amber-50 text-brand-gold">
                <Clock size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Office hours</p>
                <p className="text-sm text-muted">Mon – Fri, 9 AM – 5 PM WAT</p>
              </div>
            </li>
          </ul>

          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold text-ink">Social media</p>
            <div className="flex gap-2">
              {[
                { href: "https://facebook.com", label: "Facebook", icon: FacebookIcon },
                { href: "https://twitter.com", label: "Twitter", icon: TwitterIcon },
                { href: "https://instagram.com", label: "Instagram", icon: InstagramIcon },
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-surface-line text-brand-green transition hover:border-brand-green hover:bg-brand-green hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-surface-line bg-white p-6 shadow-sm shadow-black/[0.03] sm:p-8">
          <h2 className="font-display text-2xl font-bold text-ink">
            Send us a message
          </h2>
          <p className="mt-2 text-sm text-muted">
            We read every note. Expect a response within 1–2 working days.
          </p>

          <AnimatePresence>
            {banner ? (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-5 flex items-start gap-2 rounded-md border px-4 py-3 text-sm ${
                  banner.type === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : banner.type === "info"
                      ? "border-amber-200 bg-amber-50 text-amber-900"
                      : "border-emerald-200 bg-emerald-50 text-emerald-800"
                }`}
              >
                {banner.type === "error" ? (
                  <CircleAlert size={16} className="mt-0.5 shrink-0" />
                ) : (
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                )}
                <span>{banner.message}</span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {status === "success" ? (
            <div className="mt-8 text-center">
              <CheckCircle2 className="mx-auto text-brand-green" size={40} />
              <p className="mt-4 font-display text-xl font-bold text-ink">
                Thanks, {form.fullName.split(" ")[0]}!
              </p>
              <p className="mt-2 text-sm text-muted">
                Your message about “{form.subject}” is with our team.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm(initial);
                  setTouched({});
                  setStatus("idle");
                  setBanner(null);
                }}
                className="mt-6 rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
              <div>
                <label htmlFor="fullName" className="text-sm font-semibold text-ink">
                  Full Name
                </label>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  className={inputClass("fullName")}
                  placeholder="Your full name"
                  autoComplete="name"
                />
                {touched.fullName && errors.fullName ? (
                  <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-ink">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass("email")}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {touched.email && errors.email ? (
                  <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="subject" className="text-sm font-semibold text-ink">
                  Subject
                </label>
                <input
                  id="subject"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className={inputClass("subject")}
                  placeholder="Partnership, donation, media…"
                />
                {touched.subject && errors.subject ? (
                  <p className="mt-1.5 text-xs text-red-600">{errors.subject}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-semibold text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={inputClass("message")}
                  placeholder="Tell us how we can help or collaborate…"
                />
                {touched.message && errors.message ? (
                  <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-70 sm:w-auto"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
