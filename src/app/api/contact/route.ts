import { NextRequest, NextResponse } from 'next/server'

interface ContactPayload {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
  consent: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json()

    // Basic server-side validation
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!body.consent) {
      return NextResponse.json(
        { error: 'Consent is required' },
        { status: 400 }
      )
    }

    // TODO: Integrate email service (e.g., Resend)
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({ from: '...', to: '...', subject: '...', html: '...' })

    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      service: body.service,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
