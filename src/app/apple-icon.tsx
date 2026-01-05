import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 100,
                    background: 'linear-gradient(to bottom right, #3b82f6, #9333ea, #8b5cf6)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '22%',
                }}
            >
                ✈️
            </div>
        ),
        {
            ...size,
        }
    )
}
