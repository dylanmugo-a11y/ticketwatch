'use client';

import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { WHATSAPP_LINKS } from '@/lib/config';
import ScrollReveal from '../components/animations/ScrollReveal';
import StaggerChildren, { StaggerItem } from '../components/animations/StaggerChildren';
import TextReveal from '../components/animations/TextReveal';
import MagneticButton from '../components/animations/MagneticButton';

const faqs = [
  { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your Premium subscription at any time. No commitment required.' },
  { q: 'How fast are the alerts?', a: 'We check continuously and send WhatsApp alerts within seconds of tickets becoming available.' },
  { q: 'What events do you cover?', a: 'We cover concerts, festivals, and live events across Ireland from major ticketing platforms.' },
  { q: 'Is it really free to start?', a: 'Absolutely. The free tier gives you 1 active watch with instant alerts at no cost.' },
];

function FeatureItem({ included, children, delay }: { included: boolean; children: React.ReactNode; delay: number }) {
  return (
    <motion.li
      className={`flex items-center gap-3 ${included ? 'text-gray-700' : 'text-gray-400'}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
          included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
        }`}
        whileHover={{ scale: 1.2 }}
      >
        {included ? '\u2713' : '\u2717'}
      </motion.span>
      {children}
    </motion.li>
  );
}

export default function PricingPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            <TextReveal text="Simple Pricing" as="span" />
          </h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Start free, upgrade when you need more. No hidden fees.
          </motion.p>
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <ScrollReveal direction="left" delay={0.1}>
            <GlassCard className="p-8" variant="strong">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-gray-500 mb-6">Perfect for getting started</p>
              <motion.div
                className="text-4xl font-black text-gray-900 mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
              >
                &euro;0<span className="text-lg text-gray-400 font-normal">/month</span>
              </motion.div>
              <ul className="space-y-3 mb-8">
                <FeatureItem included delay={0.1}>1 active watch</FeatureItem>
                <FeatureItem included delay={0.15}>Unlimited searches</FeatureItem>
                <FeatureItem included delay={0.2}>Instant alerts</FeatureItem>
                <FeatureItem included={false} delay={0.25}>Multiple watches</FeatureItem>
              </ul>
              <motion.a
                href={WHATSAPP_LINKS.free}
                className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-full transition"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Free
              </motion.a>
            </GlassCard>
          </ScrollReveal>

          {/* Premium Tier */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              <motion.div
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-orange-500 text-white font-bold px-5 py-1 rounded-full text-sm z-10"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.5 }}
                animate={{ y: [0, -4, 0] }}
              >
                Most Popular
              </motion.div>
              <GlassCard className="p-8 ring-2 ring-green-400/50" variant="strong" glow>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                <p className="text-gray-500 mb-6">For serious music fans</p>
                <motion.div
                  className="text-4xl font-black text-gray-900 mb-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
                >
                  &euro;4.99<span className="text-lg text-gray-400 font-normal">/month</span>
                </motion.div>
                <ul className="space-y-3 mb-8">
                  <FeatureItem included delay={0.15}>Unlimited watches</FeatureItem>
                  <FeatureItem included delay={0.2}>Unlimited searches</FeatureItem>
                  <FeatureItem included delay={0.25}>Instant alerts</FeatureItem>
                  <motion.li
                    className="flex items-center gap-3 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.span
                      className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold"
                      whileHover={{ scale: 1.2 }}
                    >
                      &#10003;
                    </motion.span>
                    Priority support
                  </motion.li>
                </ul>
                <MagneticButton as="a" href={WHATSAPP_LINKS.premium} className="block w-full text-center btn-glow bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg">
                  Upgrade Now
                </MagneticButton>
              </GlassCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <ScrollReveal>
          <h2 className="text-3xl font-black text-gray-900 text-center mb-10">
            <TextReveal text="Frequently Asked Questions" as="span" />
          </h2>
        </ScrollReveal>
        <StaggerChildren className="space-y-4" staggerDelay={0.1}>
          {faqs.map((faq, i) => (
            <StaggerItem key={i}>
              <GlassCard className="p-6" variant="strong">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>
    </>
  );
}
