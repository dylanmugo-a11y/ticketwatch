'use client';

import GlassCard from '../components/GlassCard';
import TicketBarcode from '../components/TicketBarcode';
import TearLine from '../components/TearLine';
import { WHATSAPP_LINKS } from '@/lib/config';

export default function PricingPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-4">Simple Pricing</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Start free, upgrade when you need more. No hidden fees.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <GlassCard className="p-8" variant="strong" ticket>
            <span className="ticket-label block mb-2">FREE ADMISSION</span>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Free</h3>
            <p className="text-gray-400 mb-4">Perfect for getting started</p>
            <div className="text-4xl font-display font-bold text-gray-900 mb-4">
              &euro;0<span className="text-lg text-gray-400 font-normal">/month</span>
            </div>
            <TearLine className="mb-6" />
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-600">
                <span className="w-6 h-6 rounded-full bg-summer-teal/10 text-summer-teal flex items-center justify-center text-sm font-bold">&#10003;</span>
                1 active watch
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <span className="w-6 h-6 rounded-full bg-summer-teal/10 text-summer-teal flex items-center justify-center text-sm font-bold">&#10003;</span>
                Unlimited searches
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <span className="w-6 h-6 rounded-full bg-summer-teal/10 text-summer-teal flex items-center justify-center text-sm font-bold">&#10003;</span>
                Instant alerts
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-bold">&#10007;</span>
                Multiple watches
              </li>
            </ul>
            <a
              href={WHATSAPP_LINKS.free}
              className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full transition"
            >
              Start Free
            </a>
            <TicketBarcode slim className="mt-6" label="TW-FREE-TIER" />
          </GlassCard>

          {/* Premium Tier */}
          <div className="relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-summer-pink text-white font-bold px-5 py-1 rounded-full text-xs z-10 tracking-[0.15em] uppercase">
              SOLD OUT SAVER
            </div>
            <GlassCard className="p-8 ring-2 ring-summer-coral/30 holo-foil" variant="coral" ticket>
              <span className="ticket-label text-summer-coral block mb-2">VIP ACCESS</span>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <p className="text-gray-400 mb-4">For serious music fans</p>
              <div className="text-4xl font-display font-bold text-summer-coral mb-4">
                &euro;4.99<span className="text-lg text-gray-400 font-normal">/month</span>
              </div>
              <TearLine color="coral" className="mb-6" />
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-summer-teal/10 text-summer-teal flex items-center justify-center text-sm font-bold">&#10003;</span>
                  Unlimited watches
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-summer-teal/10 text-summer-teal flex items-center justify-center text-sm font-bold">&#10003;</span>
                  Unlimited searches
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-summer-teal/10 text-summer-teal flex items-center justify-center text-sm font-bold">&#10003;</span>
                  Instant alerts
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-summer-orange/10 text-summer-orange flex items-center justify-center text-sm font-bold">&#10003;</span>
                  Priority support
                </li>
              </ul>
              <a
                href={WHATSAPP_LINKS.premium}
                className="block w-full text-center bg-summer-coral text-white font-bold py-3 px-6 rounded-full transition-all hover:shadow-summer-coral"
              >
                Upgrade Now
              </a>
              <TicketBarcode slim className="mt-6" label="TW-PREMIUM-VIP" />
            </GlassCard>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your Premium subscription at any time. No commitment required.' },
            { q: 'How fast are the alerts?', a: 'We check continuously and send WhatsApp alerts within seconds of tickets becoming available.' },
            { q: 'What events do you cover?', a: 'We cover concerts, festivals, and live events across Ireland from major ticketing platforms.' },
            { q: 'Is it really free to start?', a: 'Absolutely. The free tier gives you 1 active watch with instant alerts at no cost.' },
          ].map((faq, i) => (
            <GlassCard key={i} className="p-6" variant="strong">
              <h3 className="font-display font-bold text-gray-900 mb-2">{faq.q}</h3>
              <TearLine className="mb-3" />
              <p className="text-gray-600">{faq.a}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}
