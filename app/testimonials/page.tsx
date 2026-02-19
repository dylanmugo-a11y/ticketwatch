'use client';

import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { WHATSAPP_LINKS } from '@/lib/config';
import ScrollReveal from '../components/animations/ScrollReveal';
import StaggerChildren, { StaggerItem } from '../components/animations/StaggerChildren';
import TextReveal, { CountUp } from '../components/animations/TextReveal';
import MagneticButton from '../components/animations/MagneticButton';

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

function AnimatedStarRating({ count, delay = 0 }: { count: number; delay?: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="w-5 h-5 inline-block"
          style={{
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            background: 'linear-gradient(135deg, #eab308, #f97316)',
          }}
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 300,
            delay: delay + i * 0.08,
          }}
          whileHover={{ scale: 1.3, rotate: 20 }}
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            <TextReveal text="Loved by Irish Music Fans" as="span" />
          </h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            See what our users have to say about TicketWatch.
          </motion.p>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <GlassCard className="p-6" variant="strong">
                <AnimatedStarRating count={t.rating} delay={i * 0.1} />
                <motion.p
                  className="text-gray-700 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </motion.p>
                <p className="font-bold text-gray-900">
                  {t.name}, <span className="font-normal text-gray-500">{t.location}</span>
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
          <StaggerItem>
            <GlassCard className="p-8 text-center" variant="strong">
              <div className="text-4xl font-black text-green-600 mb-2">
                <CountUp target={500} suffix="+" />
              </div>
              <div className="text-gray-600">Active Watches</div>
            </GlassCard>
          </StaggerItem>
          <StaggerItem>
            <GlassCard className="p-8 text-center" variant="strong">
              <div className="text-4xl font-black text-orange-500 mb-2">
                <CountUp target={5} suffix="K+" />
              </div>
              <div className="text-gray-600">Events Tracked</div>
            </GlassCard>
          </StaggerItem>
          <StaggerItem>
            <GlassCard className="p-8 text-center" variant="strong">
              <div className="text-4xl font-black text-yellow-500 mb-2">
                <CountUp target={98} suffix="%" />
              </div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </GlassCard>
          </StaggerItem>
        </StaggerChildren>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ScrollReveal scale={0.95}>
          <GlassCard className="p-12" variant="strong" glow>
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              <TextReveal text="Join the Community" as="span" />
            </h2>
            <p className="text-gray-600 mb-8">Hundreds of Irish music fans already trust TicketWatch.</p>
            <MagneticButton as="a" href={WHATSAPP_LINKS.default} className="inline-block btn-glow bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg">
              Start Watching Now
            </MagneticButton>
          </GlassCard>
        </ScrollReveal>
      </section>
    </>
  );
}
