import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'TicéadWatch - Never Miss a Sold Out Gig in Ireland';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFF8F0 0%, #FFFDF7 40%, #FFF0F0 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 107, 107, 0.15)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: 'rgba(0, 191, 166, 0.12)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 80px',
            borderRadius: 24,
            border: '3px dashed rgba(255, 107, 107, 0.3)',
            background: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: '0.3em',
              color: '#FF6B6B',
              textTransform: 'uppercase',
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            ADMIT ONE
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#1a1a1a',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span style={{ color: '#FF6B6B' }}>Ticéad</span>Watch
          </div>

          <div
            style={{
              fontSize: 28,
              color: '#6b7280',
              marginBottom: 24,
            }}
          >
            Never Miss a Sold-Out Gig in Ireland
          </div>

          <div
            style={{
              display: 'flex',
              gap: 3,
              opacity: 0.4,
            }}
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i % 3 === 0 ? 4 : 2,
                  height: 30,
                  background: '#1a1a1a',
                  borderRadius: 1,
                }}
              />
            ))}
          </div>

          <div
            style={{
              fontSize: 14,
              letterSpacing: '0.2em',
              color: '#9ca3af',
              marginTop: 12,
              fontFamily: 'monospace',
            }}
          >
            TÉ-2026-IRELAND
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 18,
            color: '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          WhatsApp Ticket Alerts
        </div>
      </div>
    ),
    { ...size }
  );
}
