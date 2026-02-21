'use client';

import GlassCard from './components/GlassCard';
import TicketBarcode from './components/TicketBarcode';
import TearLine from './components/TearLine';
import { WHATSAPP_LINKS } from '@/lib/config';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="ticket-label text-summer-coral tracking-[0.2em]">ADMIT ONE</span>
            <span className="ticket-label">|</span>
            <span className="ticket-label">Ticket alerts for Irish music fans</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-[0.95]">
            Never Miss a{' '}
            <span className="text-summer-coral">Sold-Out Gig</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl">
            Get instant WhatsApp alerts when concert tickets become available. Set your price, we do the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href={WHATSAPP_LINKS.default}
              className="bg-summer-coral text-white font-bold py-4 px-10 rounded-full text-lg transition-all hover:shadow-summer-coral"
            >
              Start Watching Now
            </a>
            <span className="text-gray-400 text-sm self-center">Takes 30 seconds. No card needed.</span>
          </div>

          <TicketBarcode slim label="TW-2026-SUMMER" className="mt-8 opacity-40" />

          <div className="mt-12 animate-float">
            <svg className="w-6 h-6 text-summer-coral/40 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Why TicéadWatch?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { variant: 'coral' as const, wristband: 'wristband-coral', title: 'Search Events', desc: 'Find concerts, festivals, and events across Ireland in seconds.', titleColor: 'text-summer-coral' },
            { variant: 'teal' as const, wristband: 'wristband-teal', title: 'Set Price Alerts', desc: 'Watch for tickets under your budget. We track price drops for you.', titleColor: 'text-summer-teal' },
            { variant: 'yellow' as const, wristband: 'wristband-yellow', title: 'Instant Notifications', desc: 'Get WhatsApp alerts seconds after tickets drop or prices change.', titleColor: 'text-summer-orange' },
            { variant: 'pink' as const, wristband: 'wristband-pink', title: 'Free to Start', desc: '1 active watch on free tier. Upgrade to Premium for unlimited.', titleColor: 'text-summer-pink' },
          ].map((item) => (
            <GlassCard
              key={item.title}
              className={`p-6 ${item.wristband}`}
              variant={item.variant}
              ticket
              ticketStub={
                <div className="flex flex-col items-center gap-2">
                  <span className="ticket-stub-text">{item.title.toUpperCase()}</span>
                  <div className="barcode-slim" />
                </div>
              }
            >
              <h3 className={`font-display font-bold text-lg ${item.titleColor} mb-2`}>{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <GlassCard className="p-8 md:p-12 holo-foil" variant="strong" ticket>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <span className="ticket-label block mb-1">SECTION A</span>
              <div className="text-3xl md:text-5xl font-display font-bold text-summer-coral">500+</div>
              <div className="text-sm text-gray-500 mt-2">Active Watches</div>
            </div>
            <div>
              <span className="ticket-label block mb-1">SECTION B</span>
              <div className="text-3xl md:text-5xl font-display font-bold text-summer-teal">5K+</div>
              <div className="text-sm text-gray-500 mt-2">Events Tracked</div>
            </div>
            <div>
              <span className="ticket-label block mb-1">SECTION C</span>
              <div className="text-3xl md:text-5xl font-display font-bold text-summer-orange">100%</div>
              <div className="text-sm text-gray-500 mt-2">Free Tier</div>
            </div>
          </div>
          <TicketBarcode className="mt-6" label="TW-STATS-2026" />
        </GlassCard>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Message on WhatsApp', desc: '"Watch for Fred Again tickets under €80"', color: 'bg-summer-coral' },
            { step: '2', title: 'We Confirm the Event', desc: 'Show you venue, date, current price', color: 'bg-summer-teal' },
            { step: '3', title: 'Say "Yes" to Create', desc: 'Your watch is now active', color: 'bg-summer-yellow' },
            { step: '4', title: 'Get Instant Alerts', desc: 'When tickets drop, we notify you', color: 'bg-summer-orange' },
          ].map((item) => (
            <GlassCard key={item.step} className="p-6 text-center" variant="strong" ticket>
              <span className="ticket-label block mb-1">STEP {item.step}</span>
              <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mx-auto mb-4 text-white font-display font-bold text-lg`}>
                {item.step}
              </div>
              <h3 className="font-display font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <GlassCard className="p-10 md:p-16 text-center holo-foil" variant="coral" ticket>
          <span className="ticket-label text-summer-coral block mb-4">GENERAL ADMISSION</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Never Miss a Gig?
          </h2>
          <TearLine color="coral" className="my-6 max-w-xs mx-auto" />
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of Irish music fans who never miss sold-out tickets again.
          </p>
          <a
            href={WHATSAPP_LINKS.default}
            className="inline-block bg-summer-coral text-white font-bold py-4 px-10 rounded-full text-lg transition-all hover:shadow-summer-coral mb-4"
          >
            Start Watching Now (Free)
          </a>
          <p className="text-gray-400 text-sm mb-6">30 seconds to set up. No credit card needed.</p>
          <TicketBarcode slim label="TW-CTA-001" className="mx-auto max-w-[200px] opacity-50" />
        </GlassCard>
      </section>
    </>
  );
}
