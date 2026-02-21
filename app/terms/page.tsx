import GlassCard from '../components/GlassCard';
import TearLine from '../components/TearLine';

export default function TermsPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
      <p className="text-gray-500 mb-2">Last updated: 17 February 2026</p>
      <TearLine color="coral" className="mb-10" />

      <GlassCard className="p-8 md:p-10 space-y-8" ticket>
        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">1. Service Description</h2>
          <p className="text-gray-600 leading-relaxed">
            TicéadWatch is a ticket availability monitoring service for concerts and live events in Ireland. We check ticket platforms (including Ticketmaster) for availability and send WhatsApp notifications when tickets matching your criteria become available. We do not sell tickets directly.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">2. Eligibility</h2>
          <p className="text-gray-600 leading-relaxed">
            You must be at least 16 years old to use TicéadWatch. By using the service, you confirm that you meet this requirement and that the information you provide is accurate.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">3. Service Tiers</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Free tier</strong> — monitor 1 event at a time, daily availability checks, WhatsApp alerts</li>
            <li><strong>Premium tier (&euro;4.99/month)</strong> — unlimited watches, more frequent checks, priority alerts</li>
          </ul>
          <p className="text-gray-600 mt-3">
            We reserve the right to modify pricing and tier features with 30 days&apos; notice to existing subscribers.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">4. No Guarantee of Tickets</h2>
          <p className="text-gray-600 leading-relaxed">
            <strong>TicéadWatch does not guarantee that you will be able to purchase tickets.</strong> We notify you when tickets appear to be available based on data from ticket platforms. Availability can change at any moment, and tickets may sell out before you complete a purchase. We are not responsible for missed tickets, pricing changes, or platform outages.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">5. Acceptable Use</h2>
          <p className="text-gray-600 leading-relaxed mb-3">You agree not to:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Use the service for ticket scalping or resale at inflated prices</li>
            <li>Create multiple accounts to circumvent free tier limits</li>
            <li>Send abusive, threatening, or spam messages to our WhatsApp bot</li>
            <li>Attempt to reverse-engineer, scrape, or interfere with our systems</li>
          </ul>
          <p className="text-gray-600 mt-3">
            We reserve the right to suspend or terminate accounts that violate these terms.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">6. Payments &amp; Cancellation</h2>
          <p className="text-gray-600 leading-relaxed">
            Premium subscriptions are billed monthly via Stripe. You can cancel at any time by messaging &quot;cancel subscription&quot; on WhatsApp. Cancellation takes effect at the end of your current billing period. We do not offer refunds for partial months.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">
            TicéadWatch is provided &quot;as is&quot; without warranties of any kind. To the maximum extent permitted by Irish law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service, including but not limited to missed ticket purchases, incorrect pricing information, or service interruptions.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">8. Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed">
            Our service relies on third-party platforms including Ticketmaster, Twilio (WhatsApp), and Stripe (payments). We are not responsible for the availability, accuracy, or policies of these platforms. Links to ticket purchase pages are provided for your convenience and are governed by the respective platform&apos;s terms.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">9. Changes to Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update these terms from time to time. Continued use of the service after changes are posted constitutes acceptance of the updated terms. For significant changes, we will notify active users via WhatsApp.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">10. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">
            These terms are governed by the laws of Ireland. Any disputes shall be subject to the jurisdiction of the Irish courts.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">11. Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            Questions about these terms? Contact us via WhatsApp or email at <a href="mailto:hello@ticketwatch.ie" className="text-summer-coral hover:underline">hello@ticketwatch.ie</a>.
          </p>
        </div>
      </GlassCard>
    </section>
  );
}
