'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const navItems = [
  { href: '/dojos', label: 'Dojos' },
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/players', label: 'Athletes' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/martialmind', label: 'MartialMind AI' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const solid = !isHome || scrolled || isMenuOpen;

  useEffect(() => {
    checkAuth();
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const dashboardHref = user?.role === 'admin' ? '/admin' : '/dashboard';

  return (
    <header
      className={`${isHome ? 'fixed inset-x-0' : 'sticky'} top-0 z-50 text-paper transition-[background-color,backdrop-filter,border-color] duration-500 border-b ${
        solid ? 'bg-ink/90 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="container-wide flex h-16 items-center justify-between lg:h-20">
        <Link href="/" className="relative z-[60] flex items-center gap-3" aria-label="Dojo Republic home">
          <img src="/logo.png" alt="" className="h-9 w-9 object-contain brightness-0 invert lg:h-10 lg:w-10" />
          <span className="display text-xl tracking-normal lg:text-2xl">
            Dojo <span className="text-paper/60">Republic</span>
          </span>
        </Link>

        <ul className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`label link-underline pb-1 whitespace-nowrap transition-opacity hover:opacity-100 ${
                  isActive(item.href) ? 'opacity-100' : 'opacity-70'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden xl:flex items-center gap-6">
          {loading ? (
            <span className="h-4 w-24" />
          ) : user ? (
            <>
              <Link href={dashboardHref} className="label link-underline pb-1">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="label link-underline pb-1 opacity-70 hover:opacity-100">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="label link-underline pb-1">
                Login
              </Link>
              <Link
                href="/auth/register"
                className="label bg-paper px-5 py-3 text-ink transition-colors duration-300 hover:bg-accent hover:text-white"
              >
                Join
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="relative z-[60] -mr-2 flex h-11 w-11 items-center justify-center xl:hidden"
          onClick={() => setIsMenuOpen((o) => !o)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="relative block h-3 w-7">
            <span
              className={`absolute left-0 h-px w-7 bg-current transition-all duration-500 ${
                isMenuOpen ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 h-px w-7 bg-current transition-all duration-500 ${
                isMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        inert={!isMenuOpen}
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-[55] flex h-dvh flex-col overflow-y-auto bg-ink px-5 pb-8 pt-24 transition-[clip-path,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10 xl:hidden ${
          isMenuOpen ? 'opacity-100 [clip-path:inset(0_0_0_0)]' : 'opacity-0 [clip-path:inset(0_0_100%_0)]'
        }`}
      >
        <ul className="flex flex-1 flex-col justify-center gap-1">
          {navItems.map((item, i) => (
            <li key={item.href} className="overflow-hidden">
              <Link
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                aria-current={isActive(item.href) ? 'page' : undefined}
                style={{ transitionDelay: isMenuOpen ? `${150 + i * 45}ms` : '0ms' }}
                className={`display block py-1 text-[clamp(2rem,9vw,3.5rem)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                } ${isActive(item.href) ? 'text-accent' : 'text-paper hover:text-paper/60'}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6">
          {loading ? null : user ? (
            <>
              <span className="label w-full text-paper/50">Signed in as {user.name}</span>
              <Link href={dashboardHref} onClick={() => setIsMenuOpen(false)} className="label bg-paper px-6 py-3.5 text-ink">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="label text-paper/70">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/register" onClick={() => setIsMenuOpen(false)} className="label bg-paper px-6 py-3.5 text-ink">
                Join
              </Link>
              <Link href="/auth/login" onClick={() => setIsMenuOpen(false)} className="label text-paper/70">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
