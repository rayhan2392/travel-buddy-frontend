import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Travel Buddy - Find Your Perfect Travel Companion'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: 'linear-gradient(to bottom right, #3b82f6, #9333ea, #8b5cf6)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
                    ✈️ Travel Buddy
                </div>
                <div style={{ fontSize: 40, opacity: 0.9 }}>
                    Find Your Perfect Travel Companion
                </div>
                <div
                    style={{
                        fontSize: 28,
                        opacity: 0.8,
                        marginTop: 20,
                        display: 'flex',
                        gap: 30,
                    }}
                >
                    <span>🌍 10,000+ Travelers</span>
                    <span>📍 85+ Countries</span>
                    <span>⭐ 4.8 Rating</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
