'use client';

import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { WHATSAPP_LINKS } from '@/lib/config';
import ScrollReveal from '../components/animations/ScrollReveal';
import StaggerChildren, { StaggerItem } from '../components/animations/StaggerChildren';
import TextReveal from '../components/animations/TextReveal';
import MagneticButton from '../components/animations/MagneticButton';

const values = [
  {
    letter: 'S',
    title: 'Speed',
    desc: "Alerts within seconds. When tickets drop, you're the first to know.",
    gradient: 'from-green-400 to-green-600',
  },
  {
    letter: 'T',
    title: 'Transparency',
    desc: 'Simple pricing. No hidden fees. Free tier forever. Cancel anytime.',
    gradient: 'from-yellow-400 to-yellow-600',
  },
  {
    letter: 'C',
    title: 'Community',
    desc: 'Built for Irish music fans. We attend the same gigs you do.',
    gradient: 'from-orange-400 to-orange-600',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            <TextReveal text="About TicketWatch" as="span" />
          </h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Built by music fans, for music fans. Right here in Ireland.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <ScrollReveal scale={0.95}>
          <GlassCard className="p-10" variant="strong">
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              <TextReveal text="Our Mission" as="span" />
            </h2>
            <motion.p
              className="text-lg text-gray-600 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              We believe no one should miss out on a live gig just because tickets sold out in 30 seconds. TicketWatch monitors ticket availability across Ireland so you can get alerts the moment tickets become available again.
            </motion.p>
            <motion.p
              className="text-lg text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Whether it&apos;s Electric Picnic, a Fontaines D.C. headline show, or a small venue gig in Galway, we&apos;ve got you covered with instant WhatsApp notifications.
            </motion.p>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Values */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <ScrollReveal>
          <h2 className="text-3xl font-black text-gray-900 text-center mb-10">
            <TextReveal text="What We Stand For" as="span" />
          </h2>
        </ScrollReveal>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {values.map((v) => (
            <StaggerItem key={v.letter}>
              <GlassCard className="p-6" variant="strong">
                <motion.div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center text-white font-bold text-lg mb-4`}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {v.letter}
                </motion.div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* Why WhatsApp */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <ScrollReveal direction="right">
          <GlassCard className="p-10" variant="strong">
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              <TextReveal text="Why WhatsApp?" as="span" />
            </h2>
            <motion.p
              className="text-lg text-gray-600 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              No apps to download. No accounts to create. No passwords to remember. Just message us on WhatsApp - the app you already use every day - and you&apos;re set up in 30 seconds.
            </motion.p>
            <motion.p
              className="text-lg text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              We chose WhatsApp because it&apos;s where Irish people already are. Over 3 million people in Ireland use it daily. Getting a ticket alert feels as natural as getting a message from a friend.
            </motion.p>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ScrollReveal scale={0.95}>
          <GlassCard className="p-12" variant="strong" glow>
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              <TextReveal text="Get Started Today" as="span" />
            </h2>
            <p className="text-gray-600 mb-8">Join the growing community of Irish music fans using TicketWatch.</p>
            <MagneticButton as="a" href={WHATSAPP_LINKS.default} className="inline-block btn-glow bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg">
              Message Us on WhatsApp
            </MagneticButton>
          </GlassCard>
        </ScrollReveal>
      </section>
    </>
  );
}
