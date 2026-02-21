import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundBlobs from './components/BackgroundBlobs';

export const metadata: Metadata = {
  title: 'TicéadWatch - Never Miss a Sold Out Gig in Ireland',
  description: 'Get instant WhatsApp alerts when concert tickets become available. Watch for your favorite artists, set your price limit, and we\'ll notify you the moment tickets drop.',
  keywords: 'tickets, concerts, alerts, ireland, music, ticketmaster, sold-out',
  openGraph: {
    title: 'TicéadWatch - Ticket Alerts for Irish Music Fans',
    description: 'Never miss sold-out concert tickets again',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-summer-sand text-gray-800">
        <BackgroundBlobs />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
