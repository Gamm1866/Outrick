import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ fontSize: 22, background: '#09090F', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7B61FF', fontFamily: 'sans-serif', fontWeight: 700, borderRadius: '6px' }}>
        O
      </div>
    ),
    { ...size }
  )
}
