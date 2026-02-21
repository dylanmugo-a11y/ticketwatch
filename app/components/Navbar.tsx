'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { WHATSAPP_LINKS } from '@/lib/config';
import Logo from './Logo';

const links = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-lg'
          : 'glass-strong'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="barcode-slim hidden sm:block" style={{ width: '40px', height: '16px' }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-summer-coral'
                  : 'text-gray-500 hover:text-summer-coral'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <motion.a
            href={WHATSAPP_LINKS.default}
            className="bg-summer-coral text-white font-bold py-2 px-5 rounded-full text-sm transition-all hover:shadow-summer-coral"
          >
            Get Started
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-summer-coral transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-summer-coral transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-summer-coral transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-strong border-t border-white/40 px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm font-medium py-2 ${
                pathname === link.href
                  ? 'text-summer-coral'
                  : 'text-gray-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_LINKS.default}
            className="block text-center bg-summer-coral text-white font-bold py-3 px-5 rounded-full text-sm transition-all hover:shadow-summer-coral"
          >
            Get Started
          </a>
        </div>
      )}
    </motion.nav>
  );
}
