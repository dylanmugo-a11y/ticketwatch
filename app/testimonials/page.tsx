'use client';

import GlassCard from '../components/GlassCard';
import TicketBarcode from '../components/TicketBarcode';
import TearLine from '../components/TearLine';
import { WHATSAPP_LINKS } from '@/lib/config';

const testimonials = [
  { name: 'Sarah', location: 'Dublin', quote: 'Finally got tickets to Electric Picnic! TicéadWatch saved me.', rating: 5, wristband: 'wristband-coral', variant: 'coral' as const },
  { name: 'Liam', location: 'Cork', quote: "Best 4.99 I've spent. Been to 5 gigs I thought were sold out.", rating: 5, wristband: 'wristband-pink', variant: 'pink' as const },
  { name: 'Emma', location: 'Galway', quote: 'Works exactly as promised. No spam, just the alerts I need.', rating: 5, wristband: 'wristband-teal', variant: 'strong' as const },
  { name: 'Cian', location: 'Limerick', quote: 'Set it up in under a minute. Got tickets to Fontaines D.C. the next day.', rating: 5, wristband: 'wristband-orange', variant: 'teal' as const },
  { name: 'Aoife', location: 'Waterford', quote: 'So simple to use. Just message and done. Love that it uses WhatsApp.', rating: 5, wristband: 'wristband-coral', variant: 'strong' as const },
  { name: 'Ronan', location: 'Belfast', quote: 'Premium is worth every cent. I have 8 watches running right now.', rating: 5, wristband: 'wristband-yellow', variant: 'yellow' as const },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-summer-orange">&#9733;</span>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-4">Loved by Irish Music Fans</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          See what our users have to say about TicéadWatch.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <GlassCard key={i} className={`p-6 ${t.wristband}`} variant={t.variant} ticket>
              <span className="ticket-label block mb-2">FAN REVIEW</span>
              <StarRating count={t.rating} />
              <p className="text-gray-800 mb-4">&ldquo;{t.quote}&rdquo;</p>
              <TearLine className="mb-3" />
              <div className="flex items-center justify-between">
                <p className="font-bold text-gray-900">
                  {t.name}, <span className="font-normal text-gray-400">{t.location}</span>
                </p>
                <div className="barcode-slim" />
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-8 text-center" variant="strong" ticket>
            <span className="ticket-label block mb-1">SECTION A</span>
            <div className="text-4xl font-display font-bold text-summer-coral mb-2">500+</div>
            <div className="text-gray-400">Active Watches</div>
          </GlassCard>
          <GlassCard className="p-8 text-center" variant="strong" ticket>
            <span className="ticket-label block mb-1">SECTION B</span>
            <div className="text-4xl font-display font-bold text-summer-teal mb-2">5K+</div>
            <div className="text-gray-400">Events Tracked</div>
          </GlassCard>
          <GlassCard className="p-8 text-center" variant="strong" ticket>
            <span className="ticket-label block mb-1">SECTION C</span>
            <div className="text-4xl font-display font-bold text-summer-orange mb-2">98%</div>
            <div className="text-gray-400">Satisfaction Rate</div>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <GlassCard className="p-12 holo-foil" variant="coral" ticket>
          <span className="ticket-label text-summer-coral block mb-3">GENERAL ADMISSION</span>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Join the Community</h2>
          <TearLine color="coral" className="my-4 max-w-xs mx-auto" />
          <p className="text-gray-600 mb-8">Hundreds of Irish music fans already trust TicéadWatch.</p>
          <a
            href={WHATSAPP_LINKS.default}
            className="inline-block bg-summer-coral text-white font-bold py-4 px-10 rounded-full text-lg transition-all hover:shadow-summer-coral"
          >
            Start Watching Now
          </a>
          <TicketBarcode slim label="TW-FANS-001" className="mt-6 mx-auto max-w-[200px] opacity-50" />
        </GlassCard>
      </section>
    </>
  );
}
