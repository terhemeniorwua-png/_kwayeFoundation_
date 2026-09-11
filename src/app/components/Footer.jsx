import Image from "next/image";
import Link from "next/link";

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function TwitterIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.19l-4.84-6.33L5.4 22H2.64l6.97-7.97L2 2h6.34l4.37 5.8L18.244 2zm-1.09 18h1.71L7.01 3.94H5.18L17.154 20z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/about-us", label: "About Us" },
      { href: "/projects", label: "Projects" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { href: "/join-us", label: "Join Us" },
      { href: "/volunteer", label: "Volunteer" },
      { href: "/contact-us", label: "Contact" },
    ],
  },
  {
    title: "Programs",
    links: [
      { href: "/projects", label: "Women Empowerment" },
      { href: "/projects", label: "Youth Skills" },
      { href: "/projects", label: "Community Relief" },
    ],
  },
];

const socials = [
  {
    href: "https://web.facebook.com/philip.iorwua.9",
    label: "Facebook",
    icon: FacebookIcon,
  },
  {
    href: "https://x.com/PIorwua12080",
    label: "Twitter",
    icon: TwitterIcon,
  },
  {
    href: "https://www.linkedin.com/feed/",
    label: "Instagram",
    icon: InstagramIcon,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1f71]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/logo.png"
              alt="Kwaye Foundation"
              width={110}
              height={52}
              className="mb-4 h-[52px] w-auto rounded-md object-contain"
            />
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              Kingdom Women And Youth Empowerment Foundation is dedicated to
              empowering communities through skills acquisition, sustainable
              development, and meaningful partnerships across Nigeria.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/50 transition hover:bg-white/20 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/30">
            © 2026 Kwaye Foundation. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Kingdom Women And Youth Empowerment Foundation
          </p>
        </div>
      </div>
    </footer>
  );
}
