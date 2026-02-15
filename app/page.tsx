import GlassCard from './components/GlassCard';
import { WHATSAPP_LINKS } from '@/lib/config';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Never Miss a{' '}
              <span className="bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Sold-Out Gig
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Get instant WhatsApp alerts when concert tickets become available in Ireland. Watch for your favorite artists, set your price limit, and we'll notify you the moment tickets drop.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm shrink-0">S</div>
                <div>
                  <h3 className="font-bold text-gray-900">Search Events</h3>
                  <p className="text-gray-500">Find concerts, festivals, and events across Ireland</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-sm shrink-0">P</div>
                <div>
                  <h3 className="font-bold text-gray-900">Set Price Alerts</h3>
                  <p className="text-gray-500">Watch for tickets under your budget</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shrink-0">N</div>
                <div>
                  <h3 className="font-bold text-gray-900">Instant Notifications</h3>
                  <p className="text-gray-500">Get WhatsApp alerts seconds after tickets drop</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-yellow-500 flex items-center justify-center text-white font-bold text-sm shrink-0">F</div>
                <div>
                  <h3 className="font-bold text-gray-900">Completely Free to Start</h3>
                  <p className="text-gray-500">1 active watch on free tier, unlimited on Premium</p>
                </div>
              </div>
            </div>

            <a
              href={WHATSAPP_LINKS.default}
              className="inline-block bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition shadow-lg hover:shadow-xl"
            >
              Start Watching Now
            </a>
            <p className="text-sm text-gray-400 mt-3">Takes 30 seconds. No credit card needed.</p>
          </div>

          {/* Right: WhatsApp CTA + Stats */}
          <div className="flex flex-col items-center space-y-8">
            <GlassCard className="p-8 w-full max-w-sm" variant="strong">
              <p className="text-center text-sm font-bold text-gray-700 mb-4">Start on WhatsApp</p>
              <a
                href={WHATSAPP_LINKS.start}
                className="block bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-center transition shadow-lg mb-4"
              >
                Message us on WhatsApp
              </a>
              <p className="text-center text-xs text-gray-500">{WHATSAPP_LINKS.display}</p>
            </GlassCard>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 w-full">
              <GlassCard className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">500+</div>
                <div className="text-xs text-gray-500">Active Watches</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">5K+</div>
                <div className="text-xs text-gray-500">Events Tracked</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-500">100%</div>
                <div className="text-xs text-gray-500">Free Tier</div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Quick How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-black text-gray-900 text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Message on WhatsApp', desc: '"Watch for Fred Again under 80"' },
            { step: '2', title: 'We Confirm the Event', desc: 'Show you venue, date, current price' },
            { step: '3', title: 'Say "Yes" to Create', desc: 'Your watch is now active' },
            { step: '4', title: 'Get Instant Alerts', desc: 'When tickets drop, we notify you' },
          ].map((item) => (
            <GlassCard key={item.step} className="p-6 text-center" variant="strong">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-orange-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                {item.step}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <GlassCard className="p-12" variant="strong">
          <h2 className="text-4xl font-black text-gray-900 mb-6">Ready to Never Miss a Gig?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of Irish music fans who've already found their next favorite concert.
          </p>
          <a
            href={WHATSAPP_LINKS.default}
            className="inline-block bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg transition shadow-lg hover:shadow-xl mb-4"
          >
            Start Watching Now (Free)
          </a>
          <p className="text-gray-400">30 seconds to set up. No credit card needed.</p>
        </GlassCard>
      </section>
    </>
  );
}
