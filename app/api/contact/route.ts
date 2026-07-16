import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, projectType, message } = await request.json();

    await resend.emails.send({
      from: 'RollingRover <web@rollingrover.co.za>', // Change to your verified domain
      to: 'web@rollingrover.co.za', // ← YOUR EMAIL HERE
      subject: `New Design Request: ${projectType} from ${name}`,
      html: `
        <h2>New Client Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project:</strong> ${projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}