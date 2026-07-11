import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Outrick — Real Growth Backed by Data'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
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
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#4C7CFF',
              marginRight: '12px',
            }}
          />
          <span style={{ color: '#4C7CFF', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Data-Driven Growth Consulting
          </span>
        </div>
        <h1
          style={{
            color: '#F0F0F5',
            fontSize: '64px',
            fontWeight: 700,
            lineHeight: 1.1,
            margin: '0 0 24px 0',
            maxWidth: '800px',
          }}
        >
          Real Growth Backed by Data
        </h1>
        <p
          style={{
            color: '#9CA3AF',
            fontSize: '22px',
            margin: '0 0 48px 0',
            maxWidth: '700px',
          }}
        >
          Performance metrics, UX optimization, AI automation for SMBs. Hollywood, FL.
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              background: '#4C7CFF',
              color: '#fff',
              padding: '12px 28px',
              borderRadius: '9999px',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            Get Your Free Score →
          </div>
          <span style={{ color: '#6B7280', fontSize: '14px' }}>outrick.com</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
