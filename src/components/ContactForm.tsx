'use client';

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import LoadingSpinner from './LoadingSpinner';
import { contactSchema } from '@/lib/validation';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { z } from 'zod';

type FormFields = 'name' | 'email' | 'phone' | 'subject' | 'message' | 'recaptcha';
type ValidationErrors = Partial<Record<FormFields, string>>;
type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export const subjects = [
  'General Inquiry',
  'IT Consultation',
  'Project Discussion',
  'Partnership Opportunity',
  'Technical Support',
  'Other'
] as const;

export const ContactForm = () => {
  const { recaptchaRef, executeRecaptcha, resetRecaptcha } = useRecaptcha();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<FormFields, boolean>>({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false,
    recaptcha: false
  });
  const [remainingChars, setRemainingChars] = useState(1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'message') {
      setRemainingChars(1000 - value.length);
    }
    
    // Clear validation error when user starts typing
    if (validationErrors[name as FormFields]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as FormFields];
        return newErrors;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate field on blur
    try {
      const clientSchema = contactSchema.omit({ recaptchaToken: true });
      const schema = clientSchema.shape[name as keyof typeof clientSchema.shape];
      
      schema.parse(formData[name as keyof FormData]);
      
      // Clear validation error if valid
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as FormFields];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors[0];
        setValidationErrors(prev => ({
          ...prev,
          [name as FormFields]: fieldError.message
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setValidationErrors({});

    try {
      let recaptchaValue: string | null = null;
      try {
        recaptchaValue = await executeRecaptcha();
      } catch {
        setErrorMessage('reCAPTCHA failed to load. Please refresh the page and try again.');
        setIsSubmitting(false);
        return;
      }
      if (!recaptchaValue) {
        setErrorMessage('Please complete the reCAPTCHA verification.');
        setIsSubmitting(false);
        return;
      }

      const validatedData = contactSchema.omit({ recaptchaToken: true }).parse(formData);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...validatedData,
          recaptchaToken: recaptchaValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setShowSuccessMessage(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      resetRecaptcha();
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: ValidationErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as FormFields] = err.message;
          }
        });
        setValidationErrors(errors);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldBase = `mt-1 block w-full font-body text-sm px-3 py-3 transition-colors duration-200 border focus:outline-none`;
  const fieldNormal = `${fieldBase} border-ink/20 focus:border-ink/50`;
  const fieldError  = `${fieldBase} border-red-400 focus:border-red-500`;
  const fieldStyle  = { backgroundColor: 'var(--cream-dark)', color: 'var(--ink)' };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">

      {showSuccessMessage && (
        <div className="p-4 border text-sm" style={{ borderColor: 'var(--terra)', color: 'var(--terra)', backgroundColor: 'rgba(201,98,47,0.05)' }}>
          Thank you for your message — we&apos;ll be in touch within 48 hours.
        </div>
      )}
      {errorMessage && (
        <div className="p-4 border border-red-300 text-sm text-red-700 bg-red-50">
          {errorMessage}
        </div>
      )}

      {/* Name + Email — side by side on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--ink-muted)' }}>
            Name <span style={{ color: 'var(--terra)' }}>*</span>
          </label>
          <input
            type="text" id="name" name="name"
            value={formData.name} onChange={handleChange} onBlur={handleBlur}
            className={touched.name && validationErrors.name ? fieldError : fieldNormal}
            style={fieldStyle}
          />
          {touched.name && validationErrors.name && (
            <p className="mt-1 text-xs" style={{ color: 'var(--terra)' }}>{validationErrors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--ink-muted)' }}>
            Email <span style={{ color: 'var(--terra)' }}>*</span>
          </label>
          <input
            type="email" id="email" name="email"
            value={formData.email} onChange={handleChange} onBlur={handleBlur}
            className={touched.email && validationErrors.email ? fieldError : fieldNormal}
            style={fieldStyle}
          />
          {touched.email && validationErrors.email && (
            <p className="mt-1 text-xs" style={{ color: 'var(--terra)' }}>{validationErrors.email}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--ink-muted)' }}>
          Phone <span className="normal-case font-body text-xs" style={{ color: 'var(--ink-muted)' }}>(optional)</span>
        </label>
        <input
          type="tel" id="phone" name="phone"
          value={formData.phone} onChange={handleChange} onBlur={handleBlur}
          placeholder="+44 7XXX XXX XXX"
          className={touched.phone && validationErrors.phone ? fieldError : fieldNormal}
          style={fieldStyle}
        />
        {touched.phone && validationErrors.phone && (
          <p className="mt-1 text-xs" style={{ color: 'var(--terra)' }}>{validationErrors.phone}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--ink-muted)' }}>
          Subject <span style={{ color: 'var(--terra)' }}>*</span>
        </label>
        <div className="relative mt-1">
          <select
            id="subject" name="subject"
            value={formData.subject} onChange={handleChange} onBlur={handleBlur}
            className={`appearance-none pr-10 block w-full font-body text-sm px-3 py-3 transition-colors duration-200 border focus:outline-none ${
              touched.subject && validationErrors.subject
                ? 'border-red-400 focus:border-red-500'
                : 'border-ink/20 focus:border-ink/50'
            }`}
            style={{ ...fieldStyle, color: formData.subject ? 'var(--ink)' : 'var(--ink-muted)' }}
          >
            <option value="">Select a subject</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--ink-muted)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {touched.subject && validationErrors.subject && (
          <p className="mt-1 text-xs" style={{ color: 'var(--terra)' }}>{validationErrors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--ink-muted)' }}>
          Message <span style={{ color: 'var(--terra)' }}>*</span>
        </label>
        <textarea
          id="message" name="message" rows={6}
          value={formData.message} onChange={handleChange} onBlur={handleBlur}
          className={touched.message && validationErrors.message ? fieldError : fieldNormal}
          style={fieldStyle}
        />
        <div className="mt-1.5 flex justify-between items-center">
          <span className="font-mono text-xs" style={{ color: remainingChars < 0 ? 'var(--terra)' : 'var(--ink-muted)' }}>
            {remainingChars} characters remaining
          </span>
          {touched.message && validationErrors.message && (
            <p className="text-xs" style={{ color: 'var(--terra)' }}>{validationErrors.message}</p>
          )}
        </div>
      </div>

      {/* reCAPTCHA */}
      <div>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="normal"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-ink w-full sm:w-auto"
          style={isSubmitting ? { backgroundColor: 'var(--ink-muted)', color: 'var(--cream)', cursor: 'not-allowed' } : { backgroundColor: 'var(--terra)', color: 'var(--cream)' }}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner className="h-4 w-4" />
              Sending…
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </div>

    </form>
  );
};

export default ContactForm;
