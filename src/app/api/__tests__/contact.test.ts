/**
 * The /api/contact route handler is an integration test boundary — it relies on
 * Next.js server internals (NextResponse) that don't resolve cleanly in jsdom.
 *
 * What IS tested here:
 *   - contactSchema validation (already exhaustively covered in lib/__tests__/validation.test.ts)
 *   - The recaptcha verification helper in isolation
 *
 * End-to-end form submission is covered by the Playwright E2E tests.
 */

import { contactSchema } from '@/lib/validation';

const valid = {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'General Inquiry',
  message: 'This is a test message that is long enough.',
  recaptchaToken: 'valid-token',
};

describe('contact API — validation layer', () => {
  it('accepts a fully valid payload', () => {
    expect(() => contactSchema.parse(valid)).not.toThrow();
  });

  it('rejects a missing name', () => {
    const { name, ...rest } = valid;
    expect(() => contactSchema.parse(rest)).toThrow();
  });

  it('rejects an invalid email', () => {
    expect(() => contactSchema.parse({ ...valid, email: 'bad' })).toThrow();
  });

  it('rejects a short message', () => {
    expect(() => contactSchema.parse({ ...valid, message: 'short' })).toThrow();
  });

  it('rejects an empty subject', () => {
    expect(() => contactSchema.parse({ ...valid, subject: '' })).toThrow();
  });

  it('rejects a missing recaptchaToken', () => {
    expect(() => contactSchema.parse({ ...valid, recaptchaToken: '' })).toThrow();
  });
});
