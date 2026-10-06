import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ status: 'Contact API operational' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // TODO: Connect external transactional email provider (e.g. Resend, SendGrid, or EmailJS)
    // Example:
    // await resend.emails.send({
    //   from: 'portfolio@yourdomain.com',
    //   to: 'rai.praveen1058@gmail.com',
    //   subject: `Portfolio Inquiry from ${name}`,
    //   text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    // });

    console.log('[Contact API] Received submission:', {
      name,
      email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received successfully! Rai Praveen will be in touch shortly.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API] Error handling request:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred while processing your message' },
      { status: 500 }
    );
  }
}
