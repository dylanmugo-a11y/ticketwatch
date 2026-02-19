import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

let client: twilio.Twilio | null = null;

function getClient(): twilio.Twilio {
  if (!client) {
    if (!accountSid || !authToken) {
      throw new Error('TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN must be set');
    }
    client = twilio(accountSid, authToken);
  }
  return client;
}

export async function sendWhatsApp(to: string, message: string): Promise<{ success: boolean; sid?: string; error?: string }> {
  try {
    const twilioClient = getClient();
    const result = await twilioClient.messages.create({
      from: whatsappNumber,
      to: to.startsWith('whatsapp:') ? to : `whatsapp:${to}`,
      body: message,
    });
    return { success: true, sid: result.sid };
  } catch (error: any) {
    console.error('Twilio send error:', error.message);
    return { success: false, error: error.message };
  }
}

export function validateTwilioSignature(
  url: string,
  params: Record<string, string>,
  signature: string
): boolean {
  if (!authToken) return false;
  return twilio.validateRequest(authToken, signature, url, params);
}

export function generateTwimlResponse(message: string): string {
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(message);
  return twiml.toString();
}
