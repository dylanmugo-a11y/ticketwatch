import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundBlobs from './components/BackgroundBlobs';
import PageTransition from './components/animations/PageTransition';

export const metadata: Metadata = {
  title: 'TicketWatch - Never Miss a Sold-Out Gig in Ireland',
  description: 'Get instant WhatsApp alerts when concert tickets become available. Watch for your favorite artists, set your price limit, and we\'ll notify you the moment tickets drop.',
  keywords: 'tickets, concerts, alerts, ireland, music, ticketmaster, sold-out',
  openGraph: {
    title: 'TicketWatch - Ticket Alerts for Irish Music Fans',
    description: 'Never miss sold-out concert tickets again',
    type: 'website',
    url: 'https://ticketwatch.ie',
    images: [
      {
        url: 'https://ticketwatch.ie/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-[Inter]">
        <BackgroundBlobs />
        <Navbar />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
