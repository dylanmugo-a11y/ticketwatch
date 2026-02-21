'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

// --- Animation Variants ---

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const springTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 12,
};

const smoothTransition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

// --- Animated Counter Component ---

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 2,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [isInView, count, target]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      setDisplay(v >= 1000 ? `${(v / 1000).toFixed(v >= target ? 0 : 1)}K` : String(v));
    });
    return unsubscribe;
  }, [rounded, target]);

  return (
    <span ref={ref}>
      {target >= 1000 ? display : display}
      {suffix}
    </span>
  );
}

// --- Main Page ---

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="border-b border-purple-800 bg-black/50 backdrop-blur"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2 text-2xl font-bold text-purple-400"
            whileHover={{ scale: 1.05 }}
          >
            🎫 TicketWatch
          </motion.div>
          <div className="text-sm text-purple-300">Irish Music Fans</div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              transition={{ ...smoothTransition, delay: 0.2 }}
              className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight"
            >
              Never Miss a{' '}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springTransition, delay: 0.7 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
              >
                Sold-Out Gig
              </motion.span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8"
            >
              Get instant WhatsApp alerts when concert tickets become available in Ireland. Watch for your favorite artists, set your price limit, and we'll notify you the moment tickets drop.
            </motion.p>

            <motion.div
              className="space-y-4 mb-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              transition={{ delayChildren: 0.6 }}
            >
              {[
                { emoji: '🎵', title: 'Search Events', desc: 'Find concerts, festivals, and events across Ireland' },
                { emoji: '⏰', title: 'Set Price Alerts', desc: 'Watch for tickets under your budget' },
                { emoji: '🚨', title: 'Instant Notifications', desc: 'Get WhatsApp alerts seconds after tickets drop' },
                { emoji: '💰', title: 'Completely Free to Start', desc: '1 active watch on free tier, unlimited on Premium' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInLeft}
                  transition={smoothTransition}
                  className="flex items-start gap-3"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href="https://wa.me/353858536569?text=Hi%20TicketWatch%20I%20want%20to%20start%20watching%20for%20tickets"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.1, 1] }}
              transition={{ delay: 1.2, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition mb-4 cta-glow"
            >
              Start Watching Now →
            </motion.a>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-sm text-gray-400"
            >
              Takes 30 seconds. No credit card needed.
            </motion.p>
          </div>

          {/* Right: WhatsApp QR + Features */}
          <div className="flex flex-col items-center space-y-8">
            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotate: 3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ ...springTransition, delay: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)' }}
              className="bg-white p-6 rounded-lg shadow-xl"
            >
              <p className="text-center text-sm font-bold text-gray-800 mb-4">Start on WhatsApp</p>
              <motion.a
                href="https://wa.me/353858536569?text=Hi%20TicketWatch"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg text-center transition mb-4"
              >
                💬 Message us on WhatsApp
              </motion.a>
              <p className="text-center text-xs text-gray-600">+353 85 853 6569</p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 w-full"
              initial="hidden"
              animate="visible"
              variants={staggerContainerFast}
              transition={{ delayChildren: 0.8 }}
            >
              {[
                { value: 500, suffix: '+', label: 'Active Watches' },
                { value: 5000, suffix: '+', label: 'Events Tracked' },
                { value: 100, suffix: '%', label: 'Free Tier' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  transition={springTransition}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-purple-800/50 p-4 rounded-lg text-center"
                >
                  <div className="text-2xl font-bold text-purple-300">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-black/50 border-y border-purple-800 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={smoothTransition}
            className="text-4xl font-black text-white text-center mb-12"
          >
            Simple Pricing
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              transition={{ ...smoothTransition, duration: 0.7 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <p className="text-gray-400 mb-6">Perfect for getting started</p>
              <div className="text-3xl font-black text-white mb-6">€0<span className="text-lg text-gray-400">/month</span></div>
              <motion.ul
                className="space-y-3 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                transition={{ delayChildren: 0.3 }}
              >
                {[
                  { check: true, text: '1 active watch' },
                  { check: true, text: 'Unlimited searches' },
                  { check: true, text: 'Instant alerts' },
                  { check: false, text: 'Multiple watches' },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    transition={smoothTransition}
                    className={`flex items-center gap-2 ${item.check ? 'text-gray-300' : 'text-gray-500'}`}
                  >
                    <span>{item.check ? '✓' : '✗'}</span> {item.text}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.a
                href="https://wa.me/353858536569?text=Hi%20TicketWatch%20I%20want%20to%20start%20free"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition text-center"
              >
                Start Free
              </motion.a>
            </motion.div>

            {/* Premium Tier */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              transition={{ ...smoothTransition, duration: 0.7 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)' }}
              className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-lg border border-purple-400 relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...springTransition, delay: 0.5 }}
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black font-bold px-4 py-1 rounded-full text-sm"
              >
                Most Popular
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <p className="text-white/80 mb-6">For serious music fans</p>
              <div className="text-3xl font-black text-white mb-6">€4.99<span className="text-lg text-white/70">/month</span></div>
              <motion.ul
                className="space-y-3 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                transition={{ delayChildren: 0.3 }}
              >
                {[
                  'Unlimited watches',
                  'Unlimited searches',
                  'Instant alerts',
                  'Priority support',
                ].map((text, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    transition={smoothTransition}
                    className="flex items-center gap-2 text-white"
                  >
                    <span>✓</span> {text}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.a
                href="https://wa.me/353858536569?text=Hi%20TicketWatch%20I%20want%20to%20upgrade%20to%20premium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full bg-white hover:bg-gray-100 text-purple-600 font-bold py-2 px-4 rounded transition text-center"
              >
                Upgrade Now
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={smoothTransition}
          className="text-4xl font-black text-white text-center mb-12"
        >
          How It Works
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {[
            { step: '1', title: 'Message on WhatsApp', desc: '"Watch for Fred Again under €80"' },
            { step: '2', title: 'We Confirm the Event', desc: 'Show you venue, date, current price' },
            { step: '3', title: 'Say "Yes" to Create', desc: 'Your watch is now active' },
            { step: '4', title: 'Get Instant Alerts', desc: 'When tickets drop, we notify you' },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.8 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={springTransition}
              className="text-center"
            >
              <motion.div
                variants={{
                  hidden: { scale: 0 },
                  visible: { scale: 1 },
                }}
                transition={{ ...springTransition, stiffness: 200 }}
                className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg"
              >
                {item.step}
              </motion.div>
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="bg-black/50 border-y border-purple-800 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={smoothTransition}
            className="text-4xl font-black text-white text-center mb-12"
          >
            Loved by Irish Music Fans
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {[
              { quote: '"Finally got tickets to Electric Picnic! TicketWatch saved me."', name: 'Sarah, Dublin' },
              { quote: '"Best €4.99 I\'ve spent. Been to 5 gigs I thought were sold out."', name: 'Liam, Cork' },
              { quote: '"Works exactly as promised. No spam, just the alerts I need."', name: 'Emma, Galway' },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={smoothTransition}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(147, 51, 234, 0.2)' }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 transition-colors"
              >
                <motion.div
                  className="flex gap-1 mb-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.05 } },
                  }}
                >
                  {[...Array(5)].map((_, j) => (
                    <motion.span
                      key={j}
                      variants={{
                        hidden: { opacity: 0, scale: 0, rotate: -180 },
                        visible: { opacity: 1, scale: 1, rotate: 0 },
                      }}
                      transition={springTransition}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </motion.div>
                <p className="text-gray-300 mb-4">{testimonial.quote}</p>
                <p className="font-bold text-white">{testimonial.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleIn}
          transition={{ ...springTransition, stiffness: 80 }}
          className="text-4xl font-black text-white mb-6"
        >
          Ready to Never Miss a Gig?
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ ...smoothTransition, delay: 0.2 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Join hundreds of Irish music fans who've already found their next favorite concert.
        </motion.p>

        <motion.a
          href="https://wa.me/353858536569?text=Hi%20TicketWatch%20I%20want%20to%20start%20watching%20for%20tickets"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: [0, 1.15, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition mb-6 cta-glow"
        >
          Start Watching Now (Free)
        </motion.a>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ ...smoothTransition, delay: 0.5 }}
          className="text-gray-400"
        >
          30 seconds to set up. No credit card needed.
        </motion.p>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-purple-800 bg-black py-8"
      >
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>TicketWatch © 2026 • Made for Irish Music Fans • <a href="#" className="text-purple-400 hover:text-purple-300 transition">Privacy</a> • <a href="#" className="text-purple-400 hover:text-purple-300 transition">Terms</a></p>
        </div>
      </motion.footer>
    </div>
  );
}
