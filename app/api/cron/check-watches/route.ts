import { NextRequest, NextResponse } from 'next/server';
import { getActiveWatches, getUser, recordAlert, updateWatchStatus } from '@/lib/mongodb';
import { checkAvailability } from '@/lib/ticketmaster';
import { sendWhatsApp } from '@/lib/twilio';

export async function GET(request: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('=== Starting watch check ===');

  try {
    const watches = await getActiveWatches();
    console.log(`Checking ${watches.length} active watches`);

    let alertsSent = 0;
    let errors = 0;

    for (const watch of watches) {
      try {
        const result = await checkAvailability(watch.eventId, watch.maxPrice, watch.quantity);

        // Update last checked
        await updateWatchStatus(watch._id.toString(), 'active');

        if (result.available) {
          console.log(`MATCH! ${watch.eventName} has tickets available`);

          const user = await getUser(watch.userId);
          if (!user) {
            console.error(`User ${watch.userId} not found`);
            continue;
          }

          // Format alert message
          const priceInfo = watch.maxPrice
            ? `€${result.price} (you wanted under €${watch.maxPrice})`
            : `€${result.price}`;

          const message =
            `TICKETS AVAILABLE!\n\n` +
            `*${watch.eventName}*\n` +
            `${watch.venue}\n` +
            `${watch.dateStart}\n` +
            `${priceInfo}\n` +
            `${watch.quantity}x tickets\n\n` +
            `Act fast - these won't last!\n` +
            (watch.buyUrl ? `\nBuy now: ${watch.buyUrl}` : '');

          // Send WhatsApp alert
          const sendResult = await sendWhatsApp(watch.userId, message);

          if (sendResult.success) {
            await recordAlert(
              watch._id.toString(),
              watch.userId,
              watch.eventName,
              result.price || 0
            );
            alertsSent++;
            console.log(`Alert sent for ${watch.eventName}`);
          } else {
            console.error(`Failed to send alert: ${sendResult.error}`);
            errors++;
          }
        }
      } catch (err: any) {
        console.error(`Error checking watch ${watch._id}: ${err.message}`);
        errors++;
      }
    }

    console.log(`=== Check complete: ${watches.length} checked, ${alertsSent} alerts, ${errors} errors ===`);

    return NextResponse.json({
      status: 'ok',
      checked: watches.length,
      alertsSent,
      errors,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
