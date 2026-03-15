import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ fontSize: 120, background: '#09090F', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7B61FF', fontFamily: 'sans-serif', fontWeight: 700, borderRadius: '40px' }}>
        O
      </div>
    ),
    { ...size }
  )
}
