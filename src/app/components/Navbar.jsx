"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/join-us", label: "Join Us" },
  { href: "/projects", label: "Projects" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact-us", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-sm shadow-black/5" : ""
      }`}
    >
      <div className="h-8 overflow-hidden bg-[#1a1f71]">
        <div className="floating-text-track flex h-full items-center whitespace-nowrap text-[11px] font-medium tracking-wide text-white/90 sm:text-xs">
          <span className="floating-text-group inline-flex items-center gap-10 px-6">
            <span>Kingdom Women And Youth Empowerment Foundation</span>
            <span className="text-brand-gold-soft">•</span>
            <span>Empowering communities through skills acquisition across Nigeria</span>
            <span className="text-brand-gold-soft">•</span>
            <span>Volunteer · Donate · Partner with us today</span>
            <span className="text-brand-gold-soft">•</span>
            <span>Jos South, Plateau State · info@kwayefoundation.org</span>
            <span className="text-brand-gold-soft">•</span>
          </span>
          <span
            className="floating-text-group inline-flex items-center gap-10 px-6"
            aria-hidden="true"
          >
            <span>Kingdom Women And Youth Empowerment Foundation</span>
            <span className="text-brand-gold-soft">•</span>
            <span>Empowering communities through skills acquisition across Nigeria</span>
            <span className="text-brand-gold-soft">•</span>
            <span>Volunteer · Donate · Partner with us today</span>
            <span className="text-brand-gold-soft">•</span>
            <span>Jos South, Plateau State · info@kwayefoundation.org</span>
            <span className="text-brand-gold-soft">•</span>
          </span>
        </div>
      </div>
      <nav className="glass-nav border-b border-white/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="relative flex shrink-0 items-center gap-2">
            <Image
              src="/logo.png"
              alt="Kwaye Foundation"
              width={100}
              height={48}
              className="h-12 w-auto rounded-md object-contain"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-brand-green"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/join-us"
              className="hidden rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:inline-flex"
            >
              Register
            </Link>
            <button
              type="button"
              className="inline-flex rounded-md p-2 text-ink lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden border-t border-surface-line bg-white lg:hidden"
            >
              <ul className="flex flex-col gap-1 px-4 py-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-bg-soft"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    href="/join-us"
                    className="block rounded-md bg-brand-green px-3 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  );
}
