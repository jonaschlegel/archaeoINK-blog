import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const requestBody = await req.json()
  console.log('Received request body:', requestBody)

  console.log('Environment Variables:', {
    apiKey: process.env.CONVERTKIT_PUBLIC_API_KEY,
    formId: process.env.CONVERTKIT_SUBSCRIBE_FORM_ID,
  })

  const { email } = requestBody

  if (!email) {
     
    const jsonStringify = (globalThis as any).JSON.stringify
    return new Response(jsonStringify({ message: 'No email address provided.' }), { status: 400 })
  }

  const api_key = process.env.CONVERTKIT_PUBLIC_API_KEY
  const formId = process.env.CONVERTKIT_SUBSCRIBE_FORM_ID

  if (!api_key || !formId) {
     
    const jsonStringify = (globalThis as any).JSON.stringify
    return new Response(jsonStringify({ message: 'Server configuration error.' }), { status: 500 })
  }

  const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`
  const tags = [4456684]

  try {
     
    const jsonStringify = (globalThis as any).JSON.stringify
    const body = jsonStringify({ api_key, email, tags })

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body,
    })

    const data = await res.json()
     
    const jsonStringify2 = (globalThis as any).JSON.stringify
    return new Response(jsonStringify2(data), { status: 200 })
  } catch (e) {
     
    const jsonStringify = (globalThis as any).JSON.stringify
    return new Response(jsonStringify({ message: 'Internal server error.' }), { status: 500 })
  }
}
