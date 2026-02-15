import GlassCard from '../components/GlassCard';
import { WHATSAPP_LINKS } from '@/lib/config';

const testimonials = [
  {
    name: 'Sarah',
    location: 'Dublin',
    quote: 'Finally got tickets to Electric Picnic! TicketWatch saved me.',
    rating: 5,
  },
  {
    name: 'Liam',
    location: 'Cork',
    quote: "Best 4.99 I've spent. Been to 5 gigs I thought were sold out.",
    rating: 5,
  },
  {
    name: 'Emma',
    location: 'Galway',
    quote: 'Works exactly as promised. No spam, just the alerts I need.',
    rating: 5,
  },
  {
    name: 'Cian',
    location: 'Limerick',
    quote: 'Set it up in under a minute. Got tickets to Fontaines D.C. the next day.',
    rating: 5,
  },
  {
    name: 'Aoife',
    location: 'Waterford',
    quote: 'So simple to use. Just message and done. Love that it uses WhatsApp.',
    rating: 5,
  },
  {
    name: 'Ronan',
    location: 'Belfast',
    quote: 'Premium is worth every cent. I have 8 watches running right now.',
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-5 h-5 inline-block"
          style={{
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            background: 'linear-gradient(135deg, #eab308, #f97316)',
          }}
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-4">Loved by Irish Music Fans</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          See what our users have to say about TicketWatch.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <GlassCard key={i} className="p-6" variant="strong">
              <StarRating count={t.rating} />
              <p className="text-gray-700 mb-4">"{t.quote}"</p>
              <p className="font-bold text-gray-900">
                {t.name}, <span className="font-normal text-gray-500">{t.location}</span>
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-8 text-center" variant="strong">
            <div className="text-4xl font-black text-green-600 mb-2">500+</div>
            <div className="text-gray-600">Active Watches</div>
          </GlassCard>
          <GlassCard className="p-8 text-center" variant="strong">
            <div className="text-4xl font-black text-orange-500 mb-2">5K+</div>
            <div className="text-gray-600">Events Tracked</div>
          </GlassCard>
          <GlassCard className="p-8 text-center" variant="strong">
            <div className="text-4xl font-black text-yellow-500 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <GlassCard className="p-12" variant="strong">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Join the Community</h2>
          <p className="text-gray-600 mb-8">Hundreds of Irish music fans already trust TicketWatch.</p>
          <a
            href={WHATSAPP_LINKS.default}
            className="inline-block bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg transition shadow-lg"
          >
            Start Watching Now
          </a>
        </GlassCard>
      </section>
    </>
  );
}
