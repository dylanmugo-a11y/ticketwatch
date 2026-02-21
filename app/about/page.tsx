'use client';

import GlassCard from '../components/GlassCard';
import { WHATSAPP_LINKS } from '@/lib/config';

export default function AboutPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-4">About TicéadWatch</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Built by music fans, for music fans. Right here in Ireland.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <GlassCard className="p-10" variant="strong">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-4">
            We believe no one should miss out on a live gig just because tickets sold out in 30 seconds. TicéadWatch monitors ticket availability across Ireland so you can get alerts the moment tickets become available again.
          </p>
          <p className="text-lg text-gray-600">
            Whether it&apos;s Electric Picnic, a Fontaines D.C. headline show, or a small venue gig in Galway, we&apos;ve got you covered with instant WhatsApp notifications.
          </p>
        </GlassCard>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-10">What We Stand For</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { letter: 'S', title: 'Speed', desc: "Alerts within seconds. When tickets drop, you're the first to know.", color: 'bg-summer-coral' },
            { letter: 'T', title: 'Transparency', desc: 'Simple pricing. No hidden fees. Free tier forever. Cancel anytime.', color: 'bg-summer-yellow' },
            { letter: 'C', title: 'Community', desc: 'Built for Irish music fans. We attend the same gigs you do.', color: 'bg-summer-teal' },
          ].map((v) => (
            <GlassCard key={v.letter} className="p-6" variant="strong">
              <div className={`w-12 h-12 rounded-2xl ${v.color} flex items-center justify-center text-white font-bold text-lg mb-4`}>
                {v.letter}
              </div>
              <h3 className="font-display font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-gray-600 text-sm">{v.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <GlassCard className="p-10" variant="strong">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">Why WhatsApp?</h2>
          <p className="text-lg text-gray-600 mb-4">
            No apps to download. No accounts to create. No passwords to remember. Just message us on WhatsApp - the app you already use every day - and you&apos;re set up in 30 seconds.
          </p>
          <p className="text-lg text-gray-600">
            We chose WhatsApp because it&apos;s where Irish people already are. Over 3 million people in Ireland use it daily. Getting a ticket alert feels as natural as getting a message from a friend.
          </p>
        </GlassCard>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <GlassCard className="p-12" variant="strong">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Get Started Today</h2>
          <p className="text-gray-600 mb-8">Join the growing community of Irish music fans using TicéadWatch.</p>
          <a
            href={WHATSAPP_LINKS.default}
            className="inline-block bg-summer-coral text-white font-bold py-4 px-10 rounded-full text-lg transition-all hover:shadow-summer-coral"
          >
            Message Us on WhatsApp
          </a>
        </GlassCard>
      </section>
    </>
  );
}
