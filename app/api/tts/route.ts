import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

const VOICE_ID = 'pNInz6obpgDQGcFmaJgB' // Adam — deep, calm
const API_KEY  = 'sk_f6fe041178ede12f0366928818d62552eeea564aad9358e4'
const MODEL    = 'eleven_turbo_v2_5'

export async function POST(req: NextRequest) {
  const { text } = await req.json().catch(() => ({ text: '' }))
  if (!text) return NextResponse.json({ error: 'no text' }, { status: 400 })

  const safe = text.trim().slice(0, 800)

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: { 'xi-api-key': API_KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
      body: JSON.stringify({
        text: safe,
        model_id: MODEL,
        voice_settings: { stability: 0.82, similarity_boost: 0.75, style: 0.0, use_speaker_boost: true },
      }),
    }
  )

  if (!res.ok) return NextResponse.json({ error: 'TTS failed' }, { status: 502 })
  const audio = await res.arrayBuffer()
  return new NextResponse(audio, { headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store' } })
}
