import { NextRequest, NextResponse } from 'next/server'

const COLORS = {
  apply: 0x2DC653,
  story: 0x9B59B6,
}

function buildApplyEmbed(data: Record<string, any>) {
  return {
    title: '🏔️ New Yatri Application',
    color: COLORS.apply,
    fields: [
      { name: 'Name', value: data.fullName || '—', inline: true },
      { name: 'Email', value: data.email || '—', inline: true },
      { name: 'Phone', value: data.phone || '—', inline: true },
      { name: 'What Calls Them', value: data.calling || '—' },
      { name: 'Season', value: data.season || '—', inline: true },
      { name: 'Companionship', value: data.companionship || '—', inline: true },
      { name: 'Energy Level', value: `${data.energy ?? '—'} / 5`, inline: true },
      { name: 'Past Experiences', value: data.pastExperiences || '—' },
      { name: 'Expectations', value: data.expectations || '—' },
    ],
    footer: { text: 'Pahari Yatri · /apply' },
    timestamp: new Date().toISOString(),
  }
}

function buildStoryEmbed(data: Record<string, any>) {
  return {
    title: '📖 New Story Submission',
    color: COLORS.story,
    fields: [
      { name: 'Story Title', value: data.title || '—' },
      { name: 'Author', value: data.authorName || '—', inline: true },
      { name: 'Email', value: data.authorEmail || '—', inline: true },
      { name: 'Chapter', value: data.chapter || '—', inline: true },
      { name: 'Excerpt', value: data.excerpt || '—' },
      { name: 'Story (first 500 chars)', value: (data.content || '').slice(0, 500) || '—' },
    ],
    footer: { text: 'Pahari Yatri · Story Submission' },
    timestamp: new Date().toISOString(),
  }
}

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json({ error: 'Discord webhook not configured' }, { status: 500 })
  }

  let body: Record<string, any>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { type, ...data } = body

  let embed: Record<string, any>
  switch (type) {
    case 'apply':
      embed = buildApplyEmbed(data)
      break
    case 'story':
      embed = buildStoryEmbed(data)
      break
    default:
      embed = {
        title: '📨 New Submission',
        color: 0x95A5A6,
        description: JSON.stringify(data, null, 2).slice(0, 2000),
        timestamp: new Date().toISOString(),
      }
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Pahari Yatri',
      avatar_url: 'https://pahariyatri.com/static/images/logo.png',
      embeds: [embed],
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('Discord webhook error:', text)
    return NextResponse.json({ error: 'Discord delivery failed' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
