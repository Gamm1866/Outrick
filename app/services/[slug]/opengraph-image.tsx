import { ImageResponse } from 'next/og';
import { getServiceBySlug, getAllServices } from '@/lib/services';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  const title = service?.title ?? 'Services';
  const tagline = service?.tagline ?? 'Data-driven growth for small businesses';
  const accent = service?.accentColor ?? '#7B61FF';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#09090F',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Accent stripe */}
        <div style={{ width: 48, height: 4, background: accent, borderRadius: 2, marginBottom: 40 }} />

        {/* Label */}
        <p style={{ fontSize: 14, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'monospace' }}>
          Outrick · Service
        </p>

        {/* Title */}
        <h1 style={{ fontSize: 56, fontWeight: 300, color: '#F0F0F5', lineHeight: 1.15, marginBottom: 24, maxWidth: 800 }}>
          {title}
        </h1>

        {/* Tagline */}
        <p style={{ fontSize: 22, color: '#A0A0B0', lineHeight: 1.5, maxWidth: 700 }}>
          {tagline}
        </p>

        {/* Bottom brand */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 20, color: '#F0F0F5', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
            OUTRICK
          </p>
          <p style={{ fontSize: 14, color: '#606070', fontFamily: 'monospace' }}>outrick.com/services</p>
        </div>
      </div>
    ),
    { ...size }
  );
}
