import Link from "next/link";

const explore = [
  { href: "/dojos", label: "Find Dojos" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/players", label: "Athletes" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/martialmind", label: "MartialMind AI" },
];

const platform = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/auth/login", label: "Login" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-wide pt-20 pb-10 lg:pt-28">
        <p className="display h-xl">
          One platform.
          <br />
          <span className="text-paper/35">Every fighter.</span>
        </p>

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <img src="/logo.png" alt="Dojo Republic" className="h-14 w-14 object-contain brightness-0 invert" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/60">
              Connecting dojos, athletes, coaches and tournaments across the global martial arts community.
            </p>
          </div>

          <nav aria-label="Explore">
            <h2 className="label mb-6 text-paper/45">Explore</h2>
            <ul className="space-y-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline pb-0.5 text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Platform">
            <h2 className="label mb-6 text-paper/45">Platform</h2>
            <ul className="space-y-3">
              {platform.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline pb-0.5 text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label mb-6 text-paper/45">Contact</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:dojorepublic.official@gmail.com" className="link-underline break-all pb-0.5">
                  dojorepublic.official@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+447353872474" className="link-underline pb-0.5">
                  +44 7353872474
                </a>
              </li>
              <li className="text-paper/60">London, United Kingdom</li>
              <li>
                <a
                  href="https://www.instagram.com/dojorepublic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline pb-0.5"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Dojo Republic. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="link-underline pb-0.5 hover:text-paper">
              Privacy Policy
            </Link>
            <Link href="/terms" className="link-underline pb-0.5 hover:text-paper">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
