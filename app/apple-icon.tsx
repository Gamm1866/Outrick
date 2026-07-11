import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ fontSize: 120, background: '#03021B', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4C7CFF', fontFamily: 'sans-serif', fontWeight: 700, borderRadius: '40px' }}>
        O
      </div>
    ),
    { ...size }
  )
}
