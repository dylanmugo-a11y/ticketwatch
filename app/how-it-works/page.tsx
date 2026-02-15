import GlassCard from '../components/GlassCard';
import { WHATSAPP_LINKS } from '@/lib/config';

export default function HowItWorksPage() {
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

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-4">How It Works</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Four simple steps to never miss a sold-out gig again.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {steps.map((item, i) => (
            <GlassCard key={item.step} className="p-8" variant="strong">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-black text-2xl shrink-0`}>
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-lg">{item.desc}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center md:justify-start md:ml-8 mt-4">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent" />
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Example conversation */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-gray-900 text-center mb-10">Example Conversation</h2>
        <GlassCard className="p-8" variant="strong">
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex justify-end">
              <div className="bg-green-100 text-green-900 px-4 py-2 rounded-2xl rounded-br-sm text-sm max-w-[80%]">
                Watch for Fred Again under 80
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white/60 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-sm text-sm max-w-[80%] border border-gray-200">
                Found: Fred Again - 3Arena, Dublin - March 15. Current price: 89.50. Watch for under 80?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-green-100 text-green-900 px-4 py-2 rounded-2xl rounded-br-sm text-sm max-w-[80%]">
                Yes
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white/60 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-sm text-sm max-w-[80%] border border-gray-200">
                Watch created! We'll alert you when tickets drop below 80. Checking continuously.
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <GlassCard className="p-12" variant="strong">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Ready to Try?</h2>
          <p className="text-gray-600 mb-8">It takes 30 seconds to set up your first watch.</p>
          <a
            href={WHATSAPP_LINKS.default}
            className="inline-block bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg transition shadow-lg"
          >
            Start on WhatsApp
          </a>
        </GlassCard>
      </section>
    </>
  );
}
