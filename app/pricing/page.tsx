import GlassCard from '../components/GlassCard';
import { WHATSAPP_LINKS } from '@/lib/config';

export default function PricingPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-4">Simple Pricing</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start free, upgrade when you need more. No hidden fees.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <GlassCard className="p-8" variant="strong">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
            <p className="text-gray-500 mb-6">Perfect for getting started</p>
            <div className="text-4xl font-black text-gray-900 mb-6">
              &euro;0<span className="text-lg text-gray-400 font-normal">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">&#10003;</span>
                1 active watch
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">&#10003;</span>
                Unlimited searches
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">&#10003;</span>
                Instant alerts
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-sm font-bold">&#10007;</span>
                Multiple watches
              </li>
            </ul>
            <a
              href={WHATSAPP_LINKS.free}
              className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-full transition"
            >
              Start Free
            </a>
          </GlassCard>

          {/* Premium Tier */}
          <div className="relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-orange-500 text-white font-bold px-5 py-1 rounded-full text-sm z-10">
              Most Popular
            </div>
            <GlassCard className="p-8 ring-2 ring-green-400/50" variant="strong">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <p className="text-gray-500 mb-6">For serious music fans</p>
              <div className="text-4xl font-black text-gray-900 mb-6">
                &euro;4.99<span className="text-lg text-gray-400 font-normal">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">&#10003;</span>
                  Unlimited watches
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">&#10003;</span>
                  Unlimited searches
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">&#10003;</span>
                  Instant alerts
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">&#10003;</span>
                  Priority support
                </li>
              </ul>
              <a
                href={WHATSAPP_LINKS.premium}
                className="block w-full text-center bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-full transition shadow-lg"
              >
                Upgrade Now
              </a>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your Premium subscription at any time. No commitment required.' },
            { q: 'How fast are the alerts?', a: 'We check continuously and send WhatsApp alerts within seconds of tickets becoming available.' },
            { q: 'What events do you cover?', a: 'We cover concerts, festivals, and live events across Ireland from major ticketing platforms.' },
            { q: 'Is it really free to start?', a: 'Absolutely. The free tier gives you 1 active watch with instant alerts at no cost.' },
          ].map((faq, i) => (
            <GlassCard key={i} className="p-6" variant="strong">
              <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}
