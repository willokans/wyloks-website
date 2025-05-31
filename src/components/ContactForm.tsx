'use client';

import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import LoadingSpinner from './LoadingSpinner';
import { contactSchema } from '@/lib/validation';
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
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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
      const schema = name === 'phone' 
        ? contactSchema.shape.phone
        : contactSchema.shape[name as keyof Omit<FormData, 'phone'>];
      
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setValidationErrors({});

    // Set all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
      recaptcha: true
    });

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await recaptchaRef.current?.executeAsync();
      if (!recaptchaToken) {
        setValidationErrors(prev => ({ ...prev, recaptcha: 'Please complete the reCAPTCHA verification' }));
        setIsSubmitting(false);
        return;
      }

      // Validate all form data
      contactSchema.parse({
        ...formData,
        recaptchaToken
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setValidationErrors(data.errors as ValidationErrors);
          setErrorMessage('Please correct the errors in the form.');
        } else {
          throw new Error(data.message || 'Failed to send message');
        }
        return;
      }

      // Track successful form submission
      window.gtag?.('event', 'form_submission', {
        event_category: 'Contact',
        event_label: formData.subject,
      });

      setShowSuccessMessage(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTouched({
        name: false,
        email: false,
        phone: false,
        subject: false,
        message: false,
        recaptcha: false
      });
      recaptchaRef.current?.reset();
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, curr) => {
          const path = curr.path[0];
          if (typeof path === 'string') {
            acc[path as FormFields] = curr.message;
          }
          return acc;
        }, {} as ValidationErrors);
        setValidationErrors(errors);
        setErrorMessage('Please correct the errors in the form.');
      } else {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 bg-white rounded-xl shadow-sm p-6 sm:p-8">
      {/* Messages */}
      {showSuccessMessage && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-purple-50 text-purple-700 rounded-lg text-sm sm:text-base border border-purple-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            Thank you for your message! We&apos;ll get back to you soon.
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {errorMessage}
          </div>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`mt-1 block w-full rounded-md shadow-sm text-base sm:text-lg p-2 sm:p-3 transition-colors duration-200 ${
            touched.name && validationErrors.name 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 hover:border-purple-300 focus:border-purple-500 focus:ring-purple-500'
          }`}
        />
        {touched.name && validationErrors.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {validationErrors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`mt-1 block w-full rounded-md shadow-sm text-base sm:text-lg p-2 sm:p-3 transition-colors duration-200 ${
            touched.email && validationErrors.email 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 hover:border-purple-300 focus:border-purple-500 focus:ring-purple-500'
          }`}
        />
        {touched.email && validationErrors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {validationErrors.email}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm sm:text-base font-medium text-gray-700">
          Phone Number <span className="text-gray-500">(Optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+1 (555) 555-5555"
          className={`mt-1 block w-full rounded-md shadow-sm text-base sm:text-lg p-2 sm:p-3 transition-colors duration-200 ${
            touched.phone && validationErrors.phone 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 hover:border-purple-300 focus:border-purple-500 focus:ring-purple-500'
          }`}
        />
        {touched.phone && validationErrors.phone && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {validationErrors.phone}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm sm:text-base font-medium text-gray-700">
          Subject <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`mt-1 block w-full rounded-md shadow-sm text-base sm:text-lg p-2 sm:p-3 transition-colors duration-200 ${
            touched.subject && validationErrors.subject 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 hover:border-purple-300 focus:border-purple-500 focus:ring-purple-500'
          }`}
        >
          <option value="">Select a subject</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
        {touched.subject && validationErrors.subject && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {validationErrors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm sm:text-base font-medium text-gray-700">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`mt-1 block w-full rounded-md shadow-sm text-base sm:text-lg p-2 sm:p-3 transition-colors duration-200 ${
            touched.message && validationErrors.message 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 hover:border-purple-300 focus:border-purple-500 focus:ring-purple-500'
          }`}
        />
        <div className="mt-1 flex justify-between items-center">
          <span className={`text-sm ${remainingChars < 0 ? 'text-red-600' : 'text-gray-500'} flex items-center`}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            {remainingChars} characters remaining
          </span>
          {touched.message && validationErrors.message && (
            <p className="text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {validationErrors.message}
            </p>
          )}
        </div>
      </div>

      {/* reCAPTCHA */}
      <div className="flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          size="normal"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          onChange={() => {
            if (validationErrors.recaptcha) {
              setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.recaptcha;
                return newErrors;
              });
            }
          }}
        />
      </div>
      {validationErrors.recaptcha && (
        <p className="mt-1 text-sm text-red-600 flex items-center justify-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {validationErrors.recaptcha}
        </p>
      )}

      {/* Submit Button */}
      <div className="flex justify-center sm:justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 border border-transparent 
            text-sm sm:text-base font-medium rounded-md shadow-sm text-white w-full sm:w-auto
            ${isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner className="h-5 w-5 mr-2" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
