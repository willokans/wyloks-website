import { contactSchema } from '@/lib/validation';

const valid = {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'General Inquiry',
  message: 'This is a test message that is long enough.',
  recaptchaToken: 'token',
};

describe('contactSchema', () => {
  it('accepts valid data', () => {
    expect(() => contactSchema.parse(valid)).not.toThrow();
  });

  describe('name', () => {
    it('rejects name shorter than 2 characters', () => {
      expect(() => contactSchema.parse({ ...valid, name: 'J' })).toThrow('Name must be at least 2 characters');
    });

    it('rejects name longer than 50 characters', () => {
      expect(() => contactSchema.parse({ ...valid, name: 'A'.repeat(51) })).toThrow('Name must not exceed 50 characters');
    });

    it('accepts exactly 2 characters', () => {
      expect(() => contactSchema.parse({ ...valid, name: 'Jo' })).not.toThrow();
    });
  });

  describe('email', () => {
    it('rejects an invalid email', () => {
      expect(() => contactSchema.parse({ ...valid, email: 'not-an-email' })).toThrow('Please enter a valid email address');
    });

    it('accepts a valid email', () => {
      expect(() => contactSchema.parse({ ...valid, email: 'user@domain.co.uk' })).not.toThrow();
    });
  });

  describe('phone', () => {
    it('is optional — accepts data without phone', () => {
      const { phone, ...withoutPhone } = { ...valid, phone: undefined };
      expect(() => contactSchema.parse(valid)).not.toThrow();
    });

    it('accepts an empty string', () => {
      expect(() => contactSchema.parse({ ...valid, phone: '' })).not.toThrow();
    });

    it('accepts a valid US phone number', () => {
      expect(() => contactSchema.parse({ ...valid, phone: '555-867-5309' })).not.toThrow();
    });

    it('rejects a clearly invalid phone string', () => {
      expect(() => contactSchema.parse({ ...valid, phone: 'not-a-phone' })).toThrow('Please enter a valid phone number');
    });
  });

  describe('subject', () => {
    it('rejects an empty subject', () => {
      expect(() => contactSchema.parse({ ...valid, subject: '' })).toThrow('Please select a subject');
    });
  });

  describe('message', () => {
    it('rejects a message shorter than 10 characters', () => {
      expect(() => contactSchema.parse({ ...valid, message: 'Short' })).toThrow('Message must be at least 10 characters');
    });

    it('rejects a message longer than 1000 characters', () => {
      expect(() => contactSchema.parse({ ...valid, message: 'A'.repeat(1001) })).toThrow('Message must not exceed 1000 characters');
    });

    it('accepts exactly 10 characters', () => {
      expect(() => contactSchema.parse({ ...valid, message: 'A'.repeat(10) })).not.toThrow();
    });
  });

  describe('recaptchaToken', () => {
    it('rejects an empty token', () => {
      expect(() => contactSchema.parse({ ...valid, recaptchaToken: '' })).toThrow('reCAPTCHA verification is required');
    });
  });
});
