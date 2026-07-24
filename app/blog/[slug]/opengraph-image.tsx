import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CATEGORY_COLORS: Record<string, string> = {
  'Growth Strategy': '#4C7CFF',
  'AI Automation': '#22d3ee',
  'UX & Conversion': '#4ade80',
  'Analytics': '#fbbf24',
};

export default async function OGImage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  const title = post?.title ?? 'Outrick Blog';
  const category = post?.category ?? 'Growth';
  const readTime = post?.readTime ?? '';
  const accentColor = CATEGORY_COLORS[category] ?? '#4C7CFF';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#03021B',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '64px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: brand + category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ color: '#F0F0F5', fontSize: '18px', fontWeight: 700, letterSpacing: '0.15em' }}>
            OUTRICK
          </span>
          <div style={{ width: '1px', height: '18px', background: '#ffffff20' }} />
          <span
            style={{
              color: accentColor,
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border: `1px solid ${accentColor}40`,
              borderRadius: '9999px',
              padding: '4px 14px',
            }}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            color: '#F0F0F5',
            fontSize: title.length > 60 ? '40px' : '48px',
            fontWeight: 300,
            lineHeight: 1.2,
            margin: '0',
            maxWidth: '900px',
          }}
        >
          {title}
        </h1>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
          <div style={{ width: '32px', height: '2px', background: accentColor }} />
          <span style={{ color: '#6B7280', fontSize: '14px' }}>outrick.net/blog</span>
          {readTime && (
            <>
              <span style={{ color: '#374151', fontSize: '14px' }}>·</span>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>{readTime}</span>
            </>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
