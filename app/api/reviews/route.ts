// app/api/reviews/route.js
import { NextResponse } from 'next/server'

export async function GET() {
  const placeId = 'ChIJqxUQgZUF2YgRiuQT1s2z6b4'
  const apiKey  = process.env.GOOGLE_PLACES_KEY

  const url = `https://maps.googleapis.com/maps/api/place/details/json` +
              `?place_id=${placeId}&fields=reviews,review_rating&key=${apiKey}`

  const res = await fetch(url)
  if (!res.ok) {
    return NextResponse.json({ error: 'Google API error' }, { status: 502 })
  }
  const { result } = await res.json()
  return NextResponse.json(result.reviews || [])
}
