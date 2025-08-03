import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const requestBody = await req.json()
  console.log('Received request body:', requestBody)

  console.log('Environment Variables:', {
    apiKey: process.env.CONVERTKIT_PUBLIC_API_KEY,
    formId: process.env.CONVERTKIT_SUBSCRIBE_FORM_ID,
  })

  const { email } = requestBody

  if (!email) {
    return new Response(JSON.stringify({ message: 'No email address provided.' }), { status: 400 })
  }

  const api_key = process.env.CONVERTKIT_PUBLIC_API_KEY
  const formId = process.env.CONVERTKIT_SUBSCRIBE_FORM_ID

  if (!api_key || !formId) {
    return new Response(JSON.stringify({ message: 'Server configuration error.' }), { status: 500 })
  }

  const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`
  const tags = [4456684]

  try {
    const body = JSON.stringify({ api_key, email, tags })

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body,
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 })
  }
}
