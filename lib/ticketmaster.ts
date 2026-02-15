const TM_API_KEY = process.env.TICKETMASTER_API_KEY || '';
const TM_BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const TM_COUNTRY_CODE = 'IE';
const TM_TIMEOUT = 10000;

const DEMO_MODE = !TM_API_KEY;

// Mock data for testing without API key
const MOCK_EVENTS = [
  {
    id: 'Z698xZaZeEe11',
    name: 'Fred Again',
    dates: { start: { localDate: '2026-03-15', localTime: '20:00' }, status: { code: 'onsale' } },
    _embedded: { venues: [{ name: '3Arena Dublin', city: { name: 'Dublin' } }] },
    priceRanges: [{ min: 65.0, max: 145.0 }],
    url: 'https://www.ticketmaster.ie/fred-again-dublin-03-15-2026/event/12345',
  },
  {
    id: 'Z123xZaZeEe22',
    name: 'The 1975',
    dates: { start: { localDate: '2026-04-20', localTime: '19:30' }, status: { code: 'offsale' } },
    _embedded: { venues: [{ name: 'O2 Dublin', city: { name: 'Dublin' } }] },
    priceRanges: [{ min: 75.0, max: 125.0 }],
    url: 'https://www.ticketmaster.ie/the-1975-dublin-04-20-2026/event/67890',
  },
  {
    id: 'Z456xZaZeEe33',
    name: 'Electric Picnic',
    dates: { start: { localDate: '2026-09-05', localTime: '11:00' }, status: { code: 'offsale' } },
    _embedded: { venues: [{ name: 'Laois Picnic', city: { name: 'Laois' } }] },
    priceRanges: [{ min: 125.0, max: 185.0 }],
    url: 'https://www.ticketmaster.ie/electric-picnic-laois-09-05-2026/event/11111',
  },
];

export interface FormattedEvent {
  id: string;
  name: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  priceMin: number | null;
  priceMax: number | null;
  status: string;
  url: string;
}

export async function searchEvents(query: string, size = 10): Promise<any[]> {
  if (DEMO_MODE) {
    const q = query.toLowerCase();
    const results = MOCK_EVENTS.filter((e) => e.name.toLowerCase().includes(q));
    return results.length > 0 ? results : MOCK_EVENTS.slice(0, 3);
  }

  const params = new URLSearchParams({
    apikey: TM_API_KEY,
    keyword: query,
    countryCode: TM_COUNTRY_CODE,
    size: String(size),
    sort: 'date,asc',
  });

  try {
    const resp = await fetch(`${TM_BASE_URL}/events.json?${params}`, {
      signal: AbortSignal.timeout(TM_TIMEOUT),
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    return data?._embedded?.events || [];
  } catch {
    return [];
  }
}

export async function getEvent(eventId: string): Promise<any | null> {
  if (DEMO_MODE) {
    return MOCK_EVENTS.find((e) => e.id === eventId) || null;
  }

  const params = new URLSearchParams({ apikey: TM_API_KEY });
  try {
    const resp = await fetch(`${TM_BASE_URL}/events/${eventId}.json?${params}`, {
      signal: AbortSignal.timeout(TM_TIMEOUT),
    });
    if (!resp.ok) return null;
    return resp.json();
  } catch {
    return null;
  }
}

export function formatEvent(event: any): FormattedEvent | null {
  if (!event) return null;

  let venue = 'TBA';
  let city = '';
  if (event._embedded?.venues?.[0]) {
    venue = event._embedded.venues[0].name || 'TBA';
    city = event._embedded.venues[0].city?.name || '';
  }

  const dates = event.dates?.start || {};
  const priceMin = event.priceRanges?.[0]?.min ?? null;
  const priceMax = event.priceRanges?.[0]?.max ?? null;
  const status = event.dates?.status?.code || 'unknown';

  return {
    id: event.id,
    name: event.name,
    venue,
    city,
    date: dates.localDate || 'TBA',
    time: dates.localTime || '',
    priceMin,
    priceMax,
    status,
    url: event.url || '',
  };
}

export async function checkAvailability(
  eventId: string,
  maxPrice: number | null,
  quantity: number
): Promise<{ available: boolean; price?: number; priceMax?: number; status: string; details: string }> {
  const event = await getEvent(eventId);
  if (!event) {
    return { available: false, status: 'not_found', details: 'Event not found' };
  }

  const eventStatus = event.dates?.status?.code || 'unknown';
  if (eventStatus !== 'onsale') {
    return { available: false, status: eventStatus, details: `Event status: ${eventStatus}` };
  }

  const priceRanges = event.priceRanges || [];
  if (!priceRanges.length) {
    return { available: false, status: 'no_pricing', details: 'No pricing information available' };
  }

  const minPrice = priceRanges[0].min;
  const maxAvailable = priceRanges[0].max;

  if (maxPrice && minPrice) {
    if (minPrice <= maxPrice) {
      return {
        available: true,
        status: 'onsale',
        price: minPrice,
        priceMax: maxAvailable,
        details: `Tickets available from €${minPrice}`,
      };
    }
    return {
      available: false,
      status: 'above_target',
      price: minPrice,
      details: `Cheapest ticket €${minPrice} (your target: €${maxPrice})`,
    };
  }

  return {
    available: true,
    status: 'onsale',
    price: minPrice,
    priceMax: maxAvailable,
    details: `Tickets available from €${minPrice}`,
  };
}
