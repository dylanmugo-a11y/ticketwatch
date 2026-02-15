'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { WHATSAPP_LINKS } from '@/lib/config';

const links = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 glass-strong">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
          TicketWatch
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_LINKS.default}
            className="bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-2 px-5 rounded-full text-sm transition"
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-strong border-t border-white/20 px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm font-medium py-2 ${
                pathname === link.href
                  ? 'text-green-600'
                  : 'text-gray-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_LINKS.default}
            className="block text-center bg-gradient-to-r from-green-500 to-orange-500 text-white font-bold py-3 px-5 rounded-full text-sm transition"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
