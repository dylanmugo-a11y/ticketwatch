'use client';

import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { WHATSAPP_LINKS } from '@/lib/config';
import ScrollReveal from '../components/animations/ScrollReveal';
import StaggerChildren, { StaggerItem } from '../components/animations/StaggerChildren';
import TextReveal from '../components/animations/TextReveal';
import MagneticButton from '../components/animations/MagneticButton';

const steps = [
  {
    step: '1',
    title: 'Message on WhatsApp',
    desc: 'Send us a message like "Watch for Fred Again under 80". It takes just a few seconds.',
    color: 'from-green-400 to-green-600',
  },
  {
    step: '2',
    title: 'We Confirm the Event',
    desc: 'We search for matching events and show you the venue, date, and current ticket price.',
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    step: '3',
    title: 'Say "Yes" to Create',
    desc: 'Confirm and your watch is live. We start monitoring ticket availability immediately.',
    color: 'from-orange-400 to-orange-600',
  },
  {
    step: '4',
    title: 'Get Instant Alerts',
    desc: 'The moment tickets become available or drop below your price, you get a WhatsApp notification.',
    color: 'from-green-500 to-orange-500',
  },
];

const chatMessages = [
  { side: 'right', text: 'Watch for Fred Again under 80' },
  { side: 'left', text: 'Found: Fred Again - 3Arena, Dublin - March 15. Current price: 89.50. Watch for under 80?' },
  { side: 'right', text: 'Yes' },
  { side: 'left', text: "Watch created! We'll alert you when tickets drop below 80. Checking continuously." },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            <TextReveal text="How It Works" as="span" />
          </h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Four simple steps to never miss a sold-out gig again.
          </motion.p>
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {steps.map((item, i) => (
            <ScrollReveal key={item.step} direction="left" delay={i * 0.1}>
              <GlassCard className="p-8" variant="strong">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-black text-2xl shrink-0`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {item.step}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-lg">{item.desc}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <motion.div
                    className="flex justify-center md:justify-start md:ml-8 mt-4"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ transformOrigin: 'top' }}
                  >
                    <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent" />
                  </motion.div>
                )}
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Example conversation */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <ScrollReveal>
          <h2 className="text-3xl font-black text-gray-900 text-center mb-10">
            <TextReveal text="Example Conversation" as="span" />
          </h2>
        </ScrollReveal>
        <ScrollReveal scale={0.95}>
          <GlassCard className="p-8" variant="strong">
            <div className="space-y-4 max-w-md mx-auto">
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.side === 'right' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, x: msg.side === 'right' ? 30 : -30, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] ${
                    msg.side === 'right'
                      ? 'bg-green-100 text-green-900 rounded-br-sm'
                      : 'bg-white/60 text-gray-800 rounded-bl-sm border border-gray-200'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ScrollReveal scale={0.95}>
          <GlassCard className="p-12" variant="strong" glow>
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              <TextReveal text="Ready to Try?" as="span" />
            </h2>
            <p className="text-gray-600 mb-8">It takes 30 seconds to set up your first watch.</p>
            <MagneticButton as="a" href={WHATSAPP_LINKS.default} className="inline-block btn-glow bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg">
              Start on WhatsApp
            </MagneticButton>
          </GlassCard>
        </ScrollReveal>
      </section>
    </>
  );
}
