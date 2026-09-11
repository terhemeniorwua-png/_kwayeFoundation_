"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleAlert, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const STEPS = ["Personal", "Skills & Location", "Availability", "Review"];

const INTERESTS = [
  "Women Empowerment",
  "Youth Skills",
  "Community Relief",
  "Media & Storytelling",
  "Admin & Fundraising",
];

const AVAILABILITY = [
  "Weekdays",
  "Weekends",
  "Evenings only",
  "Flexible / remote",
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  skills: "",
  location: "",
  availability: "",
  interest: "",
  preferredRole: "",
  notes: "",
};

function validateField(name, value) {
  const v = value.trim();
  switch (name) {
    case "fullName":
      if (!v) return "Full name is required.";
      if (v.length < 3) return "Enter at least 3 characters.";
      return "";
    case "email":
      if (!v) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        return "Enter a valid email address.";
      return "";
    case "phone":
      if (!v) return "Phone number is required.";
      if (!/^[+0-9\s()-]{8,}$/.test(v))
        return "Enter a valid phone number.";
      return "";
    case "skills":
      if (!v) return "Tell us about your skills or expertise.";
      if (v.length < 10) return "Add a bit more detail (10+ characters).";
      return "";
    case "location":
      if (!v) return "Location is required.";
      return "";
    case "availability":
      if (!v) return "Select your availability.";
      return "";
    case "interest":
      if (!v) return "Select an area of interest.";
      return "";
    default:
      return "";
  }
}

function FieldStatus({ error, touched, value }) {
  if (!touched) return null;
  if (error) {
    return (
      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
        <CircleAlert size={13} />
        {error}
      </p>
    );
  }
  if (value?.trim()) {
    return (
      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-brand-green">
        <CheckCircle2 size={13} />
        Looks good
      </p>
    );
  }
  return null;
}

export default function VolunteerForm({ preferredRole = "" }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(() => ({
    ...initialForm,
    preferredRole,
  }));
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    if (preferredRole && preferredRole !== form.preferredRole) {
      setForm((prev) => ({ ...prev, preferredRole }));
      setBanner({
        type: "success",
        message: `Role preference set to “${preferredRole}”.`,
      });
    }
  }, [preferredRole]); // eslint-disable-line react-hooks/exhaustive-deps -- sync matcher role into form

  const errors = useMemo(() => {
    const next = {};
    Object.keys(initialForm).forEach((key) => {
      if (key === "preferredRole" || key === "notes") return;
      next[key] = validateField(key, form[key]);
    });
    return next;
  }, [form]);

  const stepFields = [
    ["fullName", "email", "phone"],
    ["skills", "location", "interest"],
    ["availability"],
    [],
  ];

  const stepValid = stepFields[step].every((field) => !errors[field]);

  const update = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setBanner(null);
  };

  const blur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const goNext = () => {
    const fields = stepFields[step];
    const mark = {};
    fields.forEach((f) => {
      mark[f] = true;
    });
    setTouched((prev) => ({ ...prev, ...mark }));

    if (!stepValid) {
      setBanner({
        type: "error",
        message: "Please fix the highlighted fields before continuing.",
      });
      return;
    }
    setBanner({ type: "success", message: "Step saved. Continue when ready." });
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const goBack = () => {
    setBanner(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const submit = async (e) => {
    e.preventDefault();
    const allRequired = [
      "fullName",
      "email",
      "phone",
      "skills",
      "location",
      "availability",
      "interest",
    ];
    const mark = {};
    allRequired.forEach((f) => {
      mark[f] = true;
    });
    setTouched(mark);

    const invalid = allRequired.some((f) => errors[f]);
    if (invalid) {
      setBanner({
        type: "error",
        message: "Some required fields still need attention.",
      });
      setStep(0);
      return;
    }

    setStatus("submitting");
    setBanner({ type: "info", message: "Submitting your application…" });
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("success");
    setBanner({
      type: "success",
      message:
        "Application received. Our volunteer desk will contact you within 3–5 working days.",
    });
  };

  const inputClass = (name) => {
    const base =
      "mt-1.5 w-full rounded-md border bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-gray-400";
    if (!touched[name]) return `${base} border-surface-line focus:border-brand-green`;
    if (errors[name]) return `${base} border-red-400 focus:border-red-500`;
    return `${base} border-brand-green/60 focus:border-brand-green`;
  };

  if (status === "success") {
    return (
      <section id="apply" className="section-mesh bg-bg-soft py-16 sm:py-20">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg border border-surface-line bg-white p-8 shadow-sm"
          >
            <CheckCircle2 className="mx-auto text-brand-green" size={40} />
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">
              Thank you, {form.fullName.split(" ")[0]}!
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Your volunteer application for{" "}
              <span className="font-semibold text-ink">
                {form.interest}
              </span>{" "}
              has been logged
              {form.preferredRole
                ? ` with a preference for “${form.preferredRole}”`
                : ""}
              .
            </p>
            <button
              type="button"
              onClick={() => {
                setForm({ ...initialForm });
                setTouched({});
                setStep(0);
                setStatus("idle");
                setBanner(null);
              }}
              className="mt-6 rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Submit another application
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="section-mesh bg-bg-soft py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Volunteer Application
          </h2>
          <p className="mt-3 text-muted">
            Complete the steps below. Validation updates as you type so you can
            catch issues early.
          </p>
        </div>

        <div className="mb-6 flex gap-2">
          {STEPS.map((label, index) => (
            <div key={label} className="min-w-0 flex-1">
              <div
                className={`h-1.5 rounded-full ${
                  index <= step ? "bg-brand-green" : "bg-surface-line"
                }`}
              />
              <p
                className={`mt-2 truncate text-[11px] font-semibold uppercase tracking-wide ${
                  index === step ? "text-brand-green" : "text-muted"
                }`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {banner ? (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-5 flex items-start gap-2 rounded-md border px-4 py-3 text-sm ${
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

        <form
          onSubmit={submit}
          className="rounded-lg border border-surface-line bg-white p-6 shadow-sm shadow-black/[0.03] sm:p-8"
          noValidate
        >
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="fullName" className="text-sm font-semibold text-ink">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    onBlur={() => blur("fullName")}
                    className={inputClass("fullName")}
                    placeholder="Adaeze Okonkwo"
                    autoComplete="name"
                  />
                  <FieldStatus
                    error={errors.fullName}
                    touched={touched.fullName}
                    value={form.fullName}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-semibold text-ink">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => blur("email")}
                    className={inputClass("email")}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  <FieldStatus
                    error={errors.email}
                    touched={touched.email}
                    value={form.email}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-semibold text-ink">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    onBlur={() => blur("phone")}
                    className={inputClass("phone")}
                    placeholder="+234 800 000 0000"
                    autoComplete="tel"
                  />
                  <FieldStatus
                    error={errors.phone}
                    touched={touched.phone}
                    value={form.phone}
                  />
                </div>
              </motion.div>
            ) : null}

            {step === 1 ? (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="skills" className="text-sm font-semibold text-ink">
                    Skills / Expertise
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    rows={3}
                    value={form.skills}
                    onChange={(e) => update("skills", e.target.value)}
                    onBlur={() => blur("skills")}
                    className={inputClass("skills")}
                    placeholder="e.g. Fashion design facilitation, counselling, photography…"
                  />
                  <FieldStatus
                    error={errors.skills}
                    touched={touched.skills}
                    value={form.skills}
                  />
                </div>
                <div>
                  <label htmlFor="location" className="text-sm font-semibold text-ink">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    onBlur={() => blur("location")}
                    className={inputClass("location")}
                    placeholder="City / State, Nigeria"
                  />
                  <FieldStatus
                    error={errors.location}
                    touched={touched.location}
                    value={form.location}
                  />
                </div>
                <div>
                  <label htmlFor="interest" className="text-sm font-semibold text-ink">
                    Area of Interest
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={form.interest}
                    onChange={(e) => update("interest", e.target.value)}
                    onBlur={() => blur("interest")}
                    className={inputClass("interest")}
                  >
                    <option value="">Select an area</option>
                    {INTERESTS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <FieldStatus
                    error={errors.interest}
                    touched={touched.interest}
                    value={form.interest}
                  />
                </div>
                {form.preferredRole ? (
                  <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                    Preferred matched role:{" "}
                    <strong>{form.preferredRole}</strong>
                  </p>
                ) : null}
              </motion.div>
            ) : null}

            {step === 2 ? (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="space-y-4"
              >
                <fieldset>
                  <legend className="text-sm font-semibold text-ink">
                    Availability
                  </legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {AVAILABILITY.map((item) => {
                      const active = form.availability === item;
                      return (
                        <label
                          key={item}
                          className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-3 text-sm transition ${
                            active
                              ? "border-brand-green bg-emerald-50 font-semibold text-ink"
                              : "border-surface-line text-muted hover:border-brand-green/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="availability"
                            value={item}
                            checked={active}
                            onChange={() => update("availability", item)}
                            className="accent-brand-green"
                          />
                          {item}
                        </label>
                      );
                    })}
                  </div>
                  <FieldStatus
                    error={errors.availability}
                    touched={touched.availability}
                    value={form.availability}
                  />
                </fieldset>
                <div>
                  <label htmlFor="notes" className="text-sm font-semibold text-ink">
                    Anything else we should know?{" "}
                    <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    className={inputClass("notes")}
                    placeholder="Travel constraints, languages, prior NGO experience…"
                  />
                </div>
              </motion.div>
            ) : null}

            {step === 3 ? (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="space-y-3 text-sm"
              >
                <h3 className="font-display text-lg font-semibold text-ink">
                  Review your application
                </h3>
                {[
                  ["Full Name", form.fullName],
                  ["Email", form.email],
                  ["Phone", form.phone],
                  ["Skills", form.skills],
                  ["Location", form.location],
                  ["Interest", form.interest],
                  ["Availability", form.availability],
                  ["Preferred role", form.preferredRole || "—"],
                  ["Notes", form.notes || "—"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-col gap-0.5 border-b border-surface-line py-2 sm:flex-row sm:justify-between"
                  >
                    <span className="font-medium text-muted">{label}</span>
                    <span className="text-ink sm:max-w-[60%] sm:text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0 || status === "submitting"}
              className="rounded-md border border-surface-line px-4 py-2.5 text-sm font-semibold text-ink disabled:opacity-40"
            >
              Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 rounded-md bg-brand-gold px-5 py-2.5 text-sm font-semibold text-ink hover:bg-brand-gold-soft disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit application"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
