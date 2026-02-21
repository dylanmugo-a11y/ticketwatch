'use client';

import Link from 'next/link';
import { WHATSAPP_LINKS } from '@/lib/config';
import TicketBarcode from './TicketBarcode';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="glass-strong mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <hr className="tear-line tear-line-coral" />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-3">
              <Logo size="sm" />
            </div>
            <p className="text-gray-500 text-sm">
              Instant WhatsApp alerts when concert tickets become available in Ireland.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Pages</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-gray-500 hover:text-summer-coral transition">Home</Link>
              <Link href="/how-it-works" className="block text-sm text-gray-500 hover:text-summer-coral transition">How It Works</Link>
              <Link href="/pricing" className="block text-sm text-gray-500 hover:text-summer-coral transition">Pricing</Link>
              <Link href="/testimonials" className="block text-sm text-gray-500 hover:text-summer-coral transition">Testimonials</Link>
              <Link href="/about" className="block text-sm text-gray-500 hover:text-summer-coral transition">About</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Contact</h4>
            <a
              href={WHATSAPP_LINKS.start}
              className="text-sm text-gray-500 hover:text-summer-coral transition"
            >
              WhatsApp: {WHATSAPP_LINKS.display}
            </a>
          </div>
        </div>
        <TicketBarcode className="mb-4 opacity-50" slim label="TÉ-2026" />
        <div className="border-t border-summer-coral/10 pt-6 text-center text-sm text-gray-400">
          <p>TicéadWatch &copy; 2026 &middot; Made for Irish Music Fans &middot;{' '}
            <Link href="/privacy" className="text-summer-pink hover:text-summer-coral transition">Privacy</Link> &middot;{' '}
            <Link href="/terms" className="text-summer-pink hover:text-summer-coral transition">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
