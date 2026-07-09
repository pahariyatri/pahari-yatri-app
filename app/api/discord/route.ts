import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK =
  process.env.DISCORD_WEBHOOK_URL ||
  'https://discord.com/api/webhooks/1524662033814130749/0hRPt1mgcyjiBYz4Z7UN-2tCtCQRW3W5t10WpiQHZ5fUmFMMA3-0J1-tlN2AI_M1IQKY'

function buildLeadEmbed(data: Record<string, any>) {
  const tags = Array.isArray(data.tags) ? data.tags.join(', ') : '—'
  return {
    title: '🏔️ New Yatri Circle Lead',
    color: 0x1E6B3A,
    fields: [
      { name: '👤 Name',    value: data.fullName        || '—', inline: true },
      { name: '📱 Phone',   value: data.phone           || '—', inline: true },
      { name: '📧 Email',   value: data.email           || '—', inline: true },
      { name: '🧭 Intent',  value: data.intent          || '—', inline: true },
      { name: '🌲 Region',  value: data.preferredRegion || '—', inline: true },
      { name: '🔗 Channel', value: data.joinPath        || '—', inline: true },
      { name: '🏷️ Tags',   value: tags },
    ],
    footer: { text: 'Pahari Yatri · /apply' },
    timestamp: new Date().toISOString(),
  }
}

function buildStoryEmbed(data: Record<string, any>) {
  return {
    title: '📖 New Story Submission',
    color: 0x9B59B6,
    fields: [
      { name: 'Title',  value: data.title      || '—' },
      { name: 'Author', value: data.authorName || '—', inline: true },
      { name: 'Email',  value: data.authorEmail || '—', inline: true },
    ],
    footer: { text: 'Pahari Yatri · Story Submission' },
    timestamp: new Date().toISOString(),
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, any>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { type, ...data } = body

  const embed =
    type === 'apply' ? buildLeadEmbed(data) :
    type === 'story' ? buildStoryEmbed(data) :
    {
      title: '📨 Submission',
      color: 0x95A5A6,
      description: JSON.stringify(data, null, 2).slice(0, 2000),
      timestamp: new Date().toISOString(),
    }

  try {
    const res = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username:   'Pahari Yatri',
        avatar_url: 'https://pahariyatri.com/static/images/logo.png',
        embeds:     [embed],
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('[Discord webhook] failed:', res.status, text)
      // Return 200 to client — Discord failure is non-fatal for the user
      return NextResponse.json({ success: false, note: 'Discord delivery failed' })
    }
  } catch (err) {
    console.error('[Discord webhook] network error:', err)
    // Still return 200 so the user's submission is not blocked
    return NextResponse.json({ success: false, note: 'Discord network error' })
  }

  return NextResponse.json({ success: true })
}
