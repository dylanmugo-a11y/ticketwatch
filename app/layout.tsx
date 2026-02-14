import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
