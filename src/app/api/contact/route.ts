import { NextResponse } from 'next/server';
import { z } from 'zod';
import { contactSchema } from '@/lib/validation';

async function verifyRecaptcha(token: string) {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input using the schema
    const validatedData = contactSchema.parse(body);
    
    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(validatedData.recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { errors: { recaptcha: 'reCAPTCHA verification failed. Please try again.' }, success: false },
        { status: 400 }
      );
    }
    
    // TODO: Send email, store in database, etc.
    // For now, we'll simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({
      message: 'Thank you for your message! We\'ll get back to you soon.',
      success: true
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, curr) => {
        const path = curr.path[0] as string;
        acc[path] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      
      return NextResponse.json(
        { errors, success: false },
        { status: 400 }
      );
    }
    
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'An error occurred. Please try again later.', success: false },
      { status: 500 }
    );
  }
}
