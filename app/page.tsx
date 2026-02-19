'use client';

import { motion } from 'framer-motion';
import GlassCard from './components/GlassCard';
import { WHATSAPP_LINKS } from '@/lib/config';
import ScrollReveal from './components/animations/ScrollReveal';
import StaggerChildren, { StaggerItem } from './components/animations/StaggerChildren';
import TextReveal, { CountUp } from './components/animations/TextReveal';
import MagneticButton from './components/animations/MagneticButton';

const features = [
  { letter: 'S', title: 'Search Events', desc: 'Find concerts, festivals, and events across Ireland', gradient: 'from-green-400 to-green-600' },
  { letter: 'P', title: 'Set Price Alerts', desc: 'Watch for tickets under your budget', gradient: 'from-yellow-400 to-yellow-600' },
  { letter: 'N', title: 'Instant Notifications', desc: 'Get WhatsApp alerts seconds after tickets drop', gradient: 'from-orange-400 to-orange-600' },
  { letter: 'F', title: 'Completely Free to Start', desc: '1 active watch on free tier, unlimited on Premium', gradient: 'from-green-400 to-yellow-500' },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                <TextReveal text="Never Miss a" as="span" />
                <br />
                <span className="gradient-text-animated">
                  <TextReveal text="Sold-Out Gig" as="span" delay={0.3} />
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Get instant WhatsApp alerts when concert tickets become available in Ireland. Watch for your favorite artists, set your price limit, and we&apos;ll notify you the moment tickets drop.
            </motion.p>

            <StaggerChildren className="space-y-4 mb-8" staggerDelay={0.08}>
              {features.map((f) => (
                <StaggerItem key={f.letter}>
                  <div className="flex items-start gap-3 group">
                    <motion.div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {f.letter}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">{f.title}</h3>
                      <p className="text-gray-500">{f.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton as="a" href={WHATSAPP_LINKS.default} className="inline-block btn-glow bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg animate-glow-pulse">
                Start Watching Now
              </MagneticButton>
              <motion.p
                className="text-sm text-gray-400 mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Takes 30 seconds. No credit card needed.
              </motion.p>
            </motion.div>
          </div>

          {/* Right: WhatsApp CTA + Stats */}
          <div className="flex flex-col items-center space-y-8">
            <ScrollReveal direction="right" delay={0.3}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <GlassCard className="p-8 w-full max-w-sm" variant="strong" glow>
                  <p className="text-center text-sm font-bold text-gray-700 mb-4">Start on WhatsApp</p>
                  <MagneticButton as="a" href={WHATSAPP_LINKS.start} className="block btn-glow bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-center shadow-lg mb-4">
                    Message us on WhatsApp
                  </MagneticButton>
                  <p className="text-center text-xs text-gray-500">{WHATSAPP_LINKS.display}</p>
                </GlassCard>
              </motion.div>
            </ScrollReveal>

            {/* Stats */}
            <StaggerChildren className="grid grid-cols-3 gap-4 w-full" staggerDelay={0.15}>
              <StaggerItem>
                <GlassCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    <CountUp target={500} suffix="+" />
                  </div>
                  <div className="text-xs text-gray-500">Active Watches</div>
                </GlassCard>
              </StaggerItem>
              <StaggerItem>
                <GlassCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">
                    <CountUp target={5} suffix="K+" />
                  </div>
                  <div className="text-xs text-gray-500">Events Tracked</div>
                </GlassCard>
              </StaggerItem>
              <StaggerItem>
                <GlassCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    <CountUp target={100} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-500">Free Tier</div>
                </GlassCard>
              </StaggerItem>
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Quick How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal>
          <h2 className="text-4xl font-black text-gray-900 text-center mb-12">
            <TextReveal text="How It Works" as="span" />
          </h2>
        </ScrollReveal>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-4 gap-6" staggerDelay={0.12}>
          {[
            { step: '1', title: 'Message on WhatsApp', desc: '"Watch for Fred Again under 80"' },
            { step: '2', title: 'We Confirm the Event', desc: 'Show you venue, date, current price' },
            { step: '3', title: 'Say "Yes" to Create', desc: 'Your watch is now active' },
            { step: '4', title: 'Get Instant Alerts', desc: 'When tickets drop, we notify you' },
          ].map((item) => (
            <StaggerItem key={item.step}>
              <GlassCard className="p-6 text-center" variant="strong">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-orange-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg"
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ duration: 0.6, type: 'spring' }}
                >
                  {item.step}
                </motion.div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <ScrollReveal scale={0.95}>
          <GlassCard className="p-12" variant="strong" glow>
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              <TextReveal text="Ready to Never Miss a Gig?" as="span" />
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of Irish music fans who&apos;ve already found their next favorite concert.
            </p>
            <MagneticButton as="a" href={WHATSAPP_LINKS.default} className="inline-block btn-glow bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg mb-4">
              Start Watching Now (Free)
            </MagneticButton>
            <p className="text-gray-400">30 seconds to set up. No credit card needed.</p>
          </GlassCard>
        </ScrollReveal>
      </section>
    </>
  );
}
