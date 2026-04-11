import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  interest: z.string().min(1),
  message: z.string().min(10),
  carRef: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const resend = new Resend(process.env.RESEND_API_KEY);
    // TODO: Replace TO address with client email
    const toEmail = process.env.ENQUIRY_EMAIL ?? 'enquiries@classica.co.uk';

    await resend.emails.send({
      from: 'CLASSICA Website <noreply@classica.co.uk>',
      to: toEmail,
      replyTo: data.email,
      subject: `New Enquiry${data.carRef ? ` — ${data.carRef}` : ''} from ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : null,
        `Interest: ${data.interest}`,
        data.carRef ? `Car Reference: ${data.carRef}` : null,
        '',
        'Message:',
        data.message,
      ]
        .filter(Boolean)
        .join('\n'),
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="font-size: 24px; border-bottom: 1px solid #e5e5e5; padding-bottom: 16px; margin-bottom: 24px;">
            New Enquiry — CLASSICA
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0;"><strong>${data.name}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;">Interest</td><td style="padding: 8px 0;">${data.interest}</td></tr>
            ${data.carRef ? `<tr><td style="padding: 8px 0; color: #666;">Car Ref</td><td style="padding: 8px 0;">${data.carRef}</td></tr>` : ''}
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f9f9f9; border-left: 3px solid #ccc;">
            <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }
    console.error('Enquiry email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
