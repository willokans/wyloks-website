import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { contactSchema } from '@/lib/validation';

async function verifyRecaptcha(token: string) {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY || '',
        response: token,
      }),
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function buildEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Georgia, serif; background: #f5f1ea; margin: 0; padding: 32px; }
    .card { background: #ffffff; max-width: 560px; margin: 0 auto; padding: 40px; border-top: 3px solid #c9622f; }
    .label { font-family: monospace; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #7a6e60; margin-bottom: 4px; }
    .value { font-size: 15px; color: #16120b; margin-bottom: 24px; }
    .message-box { background: #f5f1ea; padding: 20px; font-size: 15px; color: #16120b; line-height: 1.7; white-space: pre-wrap; }
    .footer { margin-top: 32px; font-size: 11px; color: #7a6e60; border-top: 1px solid #ece7de; padding-top: 16px; }
    h2 { font-size: 20px; color: #16120b; margin: 0 0 32px; font-style: italic; font-weight: 400; }
    .terra { color: #c9622f; }
  </style>
</head>
<body>
  <div class="card">
    <h2>New enquiry via <span class="terra">Wyloks.</span></h2>

    <div class="label">Name</div>
    <div class="value">${data.name}</div>

    <div class="label">Email</div>
    <div class="value"><a href="mailto:${data.email}" style="color:#c9622f">${data.email}</a></div>

    ${data.phone ? `
    <div class="label">Phone</div>
    <div class="value">${data.phone}</div>
    ` : ''}

    <div class="label">Subject</div>
    <div class="value">${data.subject}</div>

    <div class="label">Message</div>
    <div class="message-box">${data.message}</div>

    <div class="footer">
      Sent from the contact form at wyloks.com
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = contactSchema.parse(body);

    const isRecaptchaValid = await verifyRecaptcha(validatedData.recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { errors: { recaptcha: 'reCAPTCHA verification failed. Please try again.' }, success: false },
        { status: 400 }
      );
    }

    const smtpReady = process.env.SMTP_PASS && process.env.SMTP_USER;

    if (smtpReady) {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"Wyloks Contact Form" <${process.env.SMTP_USER}>`,
        to: 'info@wyloks.com',
        replyTo: validatedData.email,
        subject: `[Wyloks] ${validatedData.subject} — ${validatedData.name}`,
        html: buildEmailHtml(validatedData),
        text: [
          `Name: ${validatedData.name}`,
          `Email: ${validatedData.email}`,
          validatedData.phone ? `Phone: ${validatedData.phone}` : '',
          `Subject: ${validatedData.subject}`,
          `\nMessage:\n${validatedData.message}`,
        ].filter(Boolean).join('\n'),
      });
    } else {
      // SMTP not configured — log submission locally (dev only)
      console.log('[Contact form submission]', {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message,
      });
    }

    return NextResponse.json({
      message: "Thank you for your message! We'll get back to you soon.",
      success: true,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, curr) => {
        const path = curr.path[0] as string;
        acc[path] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      return NextResponse.json({ errors, success: false }, { status: 400 });
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'An error occurred. Please try again later.', success: false },
      { status: 500 }
    );
  }
}
