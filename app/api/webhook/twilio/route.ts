import { NextRequest, NextResponse } from 'next/server';
import { handleMessage } from '@/lib/handler';
import { generateTwimlResponse } from '@/lib/twilio';

export async function POST(request: NextRequest) {
  try {
    // Twilio sends form-urlencoded data
    const formData = await request.formData();
    const from = formData.get('From') as string; // e.g. "whatsapp:+353858536569"
    const body = formData.get('Body') as string;

    if (!from || !body) {
      return new NextResponse('Missing From or Body', { status: 400 });
    }

    // Extract phone number from Twilio format
    const phone = from.replace('whatsapp:', '');
    const userId = from; // Use full Twilio ID as userId

    console.log(`Incoming WhatsApp from ${phone}: ${body}`);

    // Process the message
    const response = await handleMessage(userId, phone, body);

    // Return TwiML response
    return new NextResponse(generateTwimlResponse(response), {
      headers: { 'Content-Type': 'text/xml' },
    });
  } catch (error: any) {
    console.error('Webhook error:', error);

    // Still return a valid TwiML response on error
    return new NextResponse(
      generateTwimlResponse('Sorry, something went wrong. Please try again.'),
      { headers: { 'Content-Type': 'text/xml' } }
    );
  }
}

// Twilio may send GET for verification
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'TicketWatch WhatsApp Bot' });
}
