import Link from 'next/link';
import { WHATSAPP_LINKS } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="glass-dark mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent mb-3">
              TicketWatch
            </h3>
            <p className="text-gray-500 text-sm">
              Instant WhatsApp alerts when concert tickets become available in Ireland.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Pages</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-gray-500 hover:text-green-600 transition">Home</Link>
              <Link href="/how-it-works" className="block text-sm text-gray-500 hover:text-green-600 transition">How It Works</Link>
              <Link href="/pricing" className="block text-sm text-gray-500 hover:text-green-600 transition">Pricing</Link>
              <Link href="/testimonials" className="block text-sm text-gray-500 hover:text-green-600 transition">Testimonials</Link>
              <Link href="/about" className="block text-sm text-gray-500 hover:text-green-600 transition">About</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Contact</h4>
            <a
              href={WHATSAPP_LINKS.start}
              className="text-sm text-gray-500 hover:text-green-600 transition"
            >
              WhatsApp: {WHATSAPP_LINKS.display}
            </a>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-400">
          <p>TicketWatch &copy; 2026 &middot; Made for Irish Music Fans &middot;{' '}
            <a href="#" className="text-green-500 hover:text-green-600">Privacy</a> &middot;{' '}
            <a href="#" className="text-green-500 hover:text-green-600">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
