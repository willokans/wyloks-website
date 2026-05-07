import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  phone: z.string()
    .regex(/^(\+?\d{1,3}[-.]?)?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 'Please enter a valid phone number')
    .optional(),
  subject: z.string()
    .min(1, 'Please select a subject'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
  recaptchaToken: z.string()
    .min(1, 'reCAPTCHA verification is required')
});

export type ContactFormData = z.infer<typeof contactSchema>;
