import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Pahari Yatri'
  const sub = searchParams.get('sub') || 'Transformative Himalayan Treks & Spiritual Journeys'
  const type = searchParams.get('type') || 'default'

  const accentColor =
    type === 'chapter' ? '#c8a96e' :
    type === 'story'   ? '#a89bc0' :
    type === 'book'    ? '#7aab8a' :
    '#c8a96e'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, #0b0c10 0%, #131720 50%, #0d1117 100%)',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Starfield dots */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: i % 3 === 0 ? '2px' : '1px',
              height: i % 3 === 0 ? '2px' : '1px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.5)',
              top: `${(i * 137.5) % 50}%`,
              left: `${(i * 97.3) % 100}%`,
            }}
          />
        ))}

        {/* Mountain silhouette */}
        <svg
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Distant range */}
          <path
            d="M0,240 L120,160 L200,200 L300,100 L420,170 L520,80 L620,150 L700,60 L800,130 L900,50 L1000,140 L1100,90 L1200,160 L1200,300 L0,300 Z"
            fill="rgba(255,255,255,0.04)"
          />
          {/* Near range */}
          <path
            d="M0,280 L80,220 L180,250 L280,180 L400,240 L500,170 L600,210 L700,140 L820,200 L920,160 L1040,220 L1120,180 L1200,230 L1200,300 L0,300 Z"
            fill="rgba(255,255,255,0.07)"
          />
          {/* Snow caps */}
          <path
            d="M520,80 L540,95 L560,78 L580,90 L600,75 L620,90 L640,80 L620,150 L520,80 Z"
            fill="rgba(255,255,255,0.15)"
          />
          <path
            d="M880,50 L900,65 L920,48 L940,62 L900,130 L880,50 Z"
            fill="rgba(255,255,255,0.12)"
          />
        </svg>

        {/* Accent line */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '3px',
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          }}
        />

        {/* Brand label */}
        <div
          style={{
            position: 'absolute',
            top: '44px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '1px',
              background: accentColor,
            }}
          />
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: accentColor,
              fontFamily: 'Georgia, serif',
            }}
          >
            Pahari Yatri
          </span>
          <div
            style={{
              width: '28px',
              height: '1px',
              background: accentColor,
            }}
          />
        </div>

        {/* Type badge */}
        {type !== 'default' && (
          <div
            style={{
              position: 'absolute',
              top: '80px',
              padding: '4px 14px',
              border: `1px solid ${accentColor}40`,
              borderRadius: '999px',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: `${accentColor}`,
            }}
          >
            {type === 'chapter' ? 'Journey' : type === 'book' ? 'Edition' : type === 'story' ? 'Story' : ''}
          </div>
        )}

        {/* Main title */}
        <div
          style={{
            fontSize: title.length > 40 ? '52px' : title.length > 25 ? '62px' : '72px',
            fontWeight: 'bold',
            color: '#f5f0e8',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
            marginBottom: '20px',
            zIndex: 1,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '20px',
            color: 'rgba(245,240,232,0.55)',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: '1.5',
            fontStyle: 'italic',
            zIndex: 1,
          }}
        >
          {sub.length > 100 ? sub.slice(0, 100) + '…' : sub}
        </div>

        {/* Bottom: URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em',
          }}
        >
          pahariyatri.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
