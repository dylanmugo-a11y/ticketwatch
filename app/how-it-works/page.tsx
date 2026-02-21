'use client';

import GlassCard from '../components/GlassCard';
import TicketBarcode from '../components/TicketBarcode';
import TearLine from '../components/TearLine';
import { WHATSAPP_LINKS } from '@/lib/config';

export default function HowItWorksPage() {
  const steps = [
    {
      step: '1',
      title: 'Message on WhatsApp',
      desc: 'Send us a message like "Watch for Fred Again under 80". It takes just a few seconds.',
      color: 'bg-summer-coral',
      border: 'border-l-2 border-summer-coral',
    },
    {
      step: '2',
      title: 'We Confirm the Event',
      desc: 'We search for matching events and show you the venue, date, and current ticket price.',
      color: 'bg-summer-teal',
      border: 'border-l-2 border-summer-teal',
    },
    {
      step: '3',
      title: 'Say "Yes" to Create',
      desc: 'Confirm and your watch is live. We start monitoring ticket availability immediately.',
      color: 'bg-summer-yellow',
      border: 'border-l-2 border-summer-yellow',
    },
    {
      step: '4',
      title: 'Get Instant Alerts',
      desc: 'The moment tickets become available or drop below your price, you get a WhatsApp notification.',
      color: 'bg-summer-orange',
      border: 'border-l-2 border-summer-orange',
    },
  ];

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-4">How It Works</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Four simple steps to never miss a sold-out gig again.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {steps.map((item, i) => (
            <GlassCard key={item.step} className={`p-8 ${item.border}`} variant="strong" ticket>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="shrink-0 text-center">
                  <span className="ticket-label block mb-1">STEP</span>
                  <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-white font-display font-bold text-2xl`}>
                    {item.step}
                  </div>
                  <span className="ticket-serial block mt-1">TW-S{item.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-lg">{item.desc}</p>
                </div>
                <div className="hidden md:block shrink-0">
                  <div className="barcode-slim" />
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center md:justify-start md:ml-8 mt-4">
                  <div className="w-0.5 h-8 bg-summer-coral/20" />
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Example conversation */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-10">Example Conversation</h2>
        <GlassCard className="p-8 holo-foil" variant="strong" ticket>
          <span className="ticket-label block mb-4">LIVE DEMO</span>
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex justify-end">
              <div className="bg-summer-teal/10 text-summer-teal border border-summer-teal/20 px-4 py-2 rounded-2xl rounded-br-sm text-sm max-w-[80%]">
                Watch for Fred Again under 80
              </div>
            </div>
            <div className="flex justify-start">
              <div className="glass-strong px-4 py-2 rounded-2xl rounded-bl-sm text-sm max-w-[80%] text-gray-800 border border-white/40">
                Found: Fred Again - 3Arena, Dublin - March 15. Current price: 89.50. Watch for under 80?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-summer-teal/10 text-summer-teal border border-summer-teal/20 px-4 py-2 rounded-2xl rounded-br-sm text-sm max-w-[80%]">
                Yes
              </div>
            </div>
            <div className="flex justify-start">
              <div className="glass-strong px-4 py-2 rounded-2xl rounded-bl-sm text-sm max-w-[80%] text-gray-800 border border-white/40">
                Watch created! We&apos;ll alert you when tickets drop below 80. Checking continuously.
              </div>
            </div>
          </div>
          <TearLine className="mt-6 mb-3" />
          <TicketBarcode slim className="mx-auto max-w-[200px]" label="TW-DEMO-001" />
        </GlassCard>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <GlassCard className="p-12 holo-foil" variant="coral" ticket>
          <span className="ticket-label text-summer-coral block mb-3">GENERAL ADMISSION</span>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Ready to Try?</h2>
          <TearLine color="coral" className="my-4 max-w-xs mx-auto" />
          <p className="text-gray-600 mb-8">It takes 30 seconds to set up your first watch.</p>
          <a
            href={WHATSAPP_LINKS.default}
            className="inline-block bg-summer-coral text-white font-bold py-4 px-10 rounded-full text-lg transition-all hover:shadow-summer-coral"
          >
            Start on WhatsApp
          </a>
          <TicketBarcode slim label="TW-HIW-CTA" className="mt-6 mx-auto max-w-[200px] opacity-50" />
        </GlassCard>
      </section>
    </>
  );
}
