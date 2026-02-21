import GlassCard from '../components/GlassCard';
import TearLine from '../components/TearLine';

export default function PrivacyPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
      <p className="text-gray-500 mb-2">Last updated: 17 February 2026</p>
      <TearLine color="coral" className="mb-10" />

      <GlassCard className="p-8 md:p-10 space-y-8" ticket>
        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">1. Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            TicéadWatch (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a ticket alert service based in Ireland. We monitor concert ticket availability and send WhatsApp notifications to our users. This policy explains how we collect, use, and protect your personal data in accordance with the General Data Protection Regulation (GDPR).
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">2. Data We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-3">We collect and process the following data:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Phone number</strong> — your WhatsApp number, used to send you alerts and communicate with you</li>
            <li><strong>Watch preferences</strong> — event names, venues, dates, price limits, and ticket quantities you ask us to monitor</li>
            <li><strong>Conversation data</strong> — messages you send to our WhatsApp bot to set up and manage watches</li>
            <li><strong>Usage data</strong> — timestamps of when watches were created, checked, and when alerts were sent</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">3. How We Use Your Data</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>To monitor ticket availability for events you&apos;ve requested</li>
            <li>To send you WhatsApp alerts when tickets become available</li>
            <li>To manage your account (free or premium tier)</li>
            <li>To improve and maintain the service</li>
          </ul>
          <p className="text-gray-600 mt-3">
            <strong>Legal basis:</strong> We process your data based on your consent (you initiate contact and request alerts) and our legitimate interest in providing the service.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed mb-3">We use the following third-party services to operate TicéadWatch:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Twilio</strong> (US) — processes WhatsApp messages</li>
            <li><strong>MongoDB Atlas</strong> (EU/Ireland region) — stores your account data, watches, and alert history</li>
            <li><strong>Ticketmaster</strong> (IE) — we query their public API to check ticket availability. We do not share your personal data with Ticketmaster</li>
            <li><strong>Vercel</strong> (US) — hosts our website and API</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">5. Data Retention</h2>
          <p className="text-gray-600 leading-relaxed">
            We retain your data for as long as your account is active. Watch data for completed or cancelled watches is kept for 12 months for your reference, then deleted. If you stop using the service for 6 months with no active watches, your account data will be automatically deleted.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">6. Your Rights (GDPR)</h2>
          <p className="text-gray-600 leading-relaxed mb-3">Under GDPR, you have the right to:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Access</strong> — request a copy of all data we hold about you</li>
            <li><strong>Rectification</strong> — correct any inaccurate data</li>
            <li><strong>Erasure</strong> — request deletion of your data (&quot;right to be forgotten&quot;)</li>
            <li><strong>Portability</strong> — receive your data in a machine-readable format</li>
            <li><strong>Withdraw consent</strong> — stop receiving alerts at any time by messaging &quot;stop&quot; on WhatsApp</li>
          </ul>
          <p className="text-gray-600 mt-3">
            To exercise any of these rights, send &quot;delete my data&quot; via WhatsApp or email us at the address below.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">7. Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We use industry-standard security measures including encrypted connections (TLS), secure database hosting with MongoDB Atlas (EU region), and access controls. We do not store payment card details — all payments are processed securely by Stripe.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">8. Cookies</h2>
          <p className="text-gray-600 leading-relaxed">
            Our website does not use tracking cookies or analytics cookies. We use only essential cookies required for the website to function.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this privacy policy from time to time. We will notify active users via WhatsApp of any significant changes. The &quot;last updated&quot; date at the top of this page reflects the most recent revision.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">10. Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this privacy policy or your data, contact us via WhatsApp or email at <a href="mailto:privacy@ticketwatch.ie" className="text-summer-coral hover:underline">privacy@ticketwatch.ie</a>.
          </p>
        </div>
      </GlassCard>
    </section>
  );
}
