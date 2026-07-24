import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Services | Outrick — AI Automation, Growth Marketing & UX';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#03021B',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Accent stripe */}
        <div style={{ width: 48, height: 4, background: '#4C7CFF', borderRadius: 2, marginBottom: 40 }} />

        {/* Label */}
        <p style={{ fontSize: 14, color: '#4C7CFF', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'monospace' }}>
          Outrick · Services
        </p>

        {/* Title */}
        <h1 style={{ fontSize: 56, fontWeight: 300, color: '#F0F0F5', lineHeight: 1.15, marginBottom: 24, maxWidth: 800 }}>
          Services Built for Real Business Growth
        </h1>

        {/* Description */}
        <p style={{ fontSize: 22, color: '#A0A0B0', lineHeight: 1.5, maxWidth: 700 }}>
          AI automation, data-driven growth marketing, and UX optimization. Engagements measured by results, not activity.
        </p>

        {/* Bottom brand */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 20, color: '#F0F0F5', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
            OUTRICK
          </p>
          <p style={{ fontSize: 14, color: '#606070', fontFamily: 'monospace' }}>outrick.net/services</p>
        </div>
      </div>
    ),
    { ...size }
  );
}
