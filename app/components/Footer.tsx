'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WHATSAPP_LINKS } from '@/lib/config';
import ScrollReveal from './animations/ScrollReveal';

export default function Footer() {
  return (
    <footer className="glass-dark mt-20 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <ScrollReveal direction="up" delay={0}>
            <div>
              <motion.h3
                className="text-lg font-bold gradient-text-animated mb-3"
                whileHover={{ scale: 1.02 }}
              >
                TicketWatch
              </motion.h3>
              <p className="text-gray-500 text-sm">
                Instant WhatsApp alerts when concert tickets become available in Ireland.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Pages</h4>
              <div className="space-y-2">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/how-it-works', label: 'How It Works' },
                  { href: '/pricing', label: 'Pricing' },
                  { href: '/testimonials', label: 'Testimonials' },
                  { href: '/about', label: 'About' },
                ].map((link) => (
                  <motion.div key={link.href} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={link.href}
                      className="block text-sm text-gray-500 hover:text-green-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Contact</h4>
              <motion.a
                href={WHATSAPP_LINKS.start}
                className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                whileHover={{ x: 4 }}
              >
                WhatsApp: {WHATSAPP_LINKS.display}
              </motion.a>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={0.3}>
          <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-400">
            <p>TicketWatch &copy; 2026 &middot; Made for Irish Music Fans &middot;{' '}
              <motion.a
                href="#"
                className="text-green-500 hover:text-green-600 inline-block"
                whileHover={{ y: -1 }}
              >
                Privacy
              </motion.a>{' '}&middot;{' '}
              <motion.a
                href="#"
                className="text-green-500 hover:text-green-600 inline-block"
                whileHover={{ y: -1 }}
              >
                Terms
              </motion.a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
