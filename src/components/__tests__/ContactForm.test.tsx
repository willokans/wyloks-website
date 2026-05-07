import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '@/components/ContactForm';

jest.mock('react-google-recaptcha', () => {
  const ReCAPTCHA = React.forwardRef((_props: unknown, _ref: unknown) => (
    <div data-testid="recaptcha" />
  ));
  ReCAPTCHA.displayName = 'ReCAPTCHA';
  return ReCAPTCHA;
});

const mockExecuteRecaptcha = jest.fn().mockResolvedValue('mock-token');
const mockResetRecaptcha = jest.fn();

jest.mock('@/hooks/useRecaptcha', () => ({
  useRecaptcha: () => ({
    recaptchaRef: { current: null },
    executeRecaptcha: mockExecuteRecaptcha,
    resetRecaptcha: mockResetRecaptcha,
  }),
}));

jest.mock('@/components/LoadingSpinner', () => {
  const Spinner = () => <span data-testid="spinner" />;
  Spinner.displayName = 'Spinner';
  return Spinner;
});

function fillForm() {
  fireEvent.change(screen.getByLabelText(/name/i),    { target: { name: 'name',    value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/email/i),   { target: { name: 'email',   value: 'john@example.com' } });
  fireEvent.change(screen.getByLabelText(/subject/i), { target: { name: 'subject', value: 'General Inquiry' } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { name: 'message', value: 'This is a test message long enough.' } });
}

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  describe('rendering', () => {
    it('renders Name field', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });

    it('renders Email field', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('renders Phone field', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    });

    it('renders Subject select', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    });

    it('renders Message textarea', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('renders the reCAPTCHA widget', () => {
      render(<ContactForm />);
      expect(screen.getByTestId('recaptcha')).toBeInTheDocument();
    });

    it('renders the Send Message button', () => {
      render(<ContactForm />);
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('shows 1000 characters remaining initially', () => {
      render(<ContactForm />);
      expect(screen.getByText('1000 characters remaining')).toBeInTheDocument();
    });
  });

  describe('character counter', () => {
    it('decrements as the user types in the message field', () => {
      render(<ContactForm />);
      fireEvent.change(screen.getByLabelText(/message/i), { target: { name: 'message', value: 'Hello' } });
      expect(screen.getByText('995 characters remaining')).toBeInTheDocument();
    });
  });

  describe('blur validation', () => {
    it('shows an error when name is too short on blur', () => {
      render(<ContactForm />);
      const input = screen.getByLabelText(/name/i);
      fireEvent.change(input, { target: { name: 'name', value: 'J' } });
      fireEvent.blur(input, { target: { name: 'name' } });
      expect(screen.getByText(/at least 2 characters/i)).toBeInTheDocument();
    });

    it('shows an error for invalid email on blur', () => {
      render(<ContactForm />);
      const input = screen.getByLabelText(/email/i);
      fireEvent.change(input, { target: { name: 'email', value: 'bad-email' } });
      fireEvent.blur(input, { target: { name: 'email' } });
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });

    it('clears the error once the user fixes the input', () => {
      render(<ContactForm />);
      const input = screen.getByLabelText(/name/i);
      fireEvent.change(input, { target: { name: 'name', value: 'J' } });
      fireEvent.blur(input, { target: { name: 'name' } });
      expect(screen.getByText(/at least 2 characters/i)).toBeInTheDocument();
      fireEvent.change(input, { target: { name: 'name', value: 'John' } });
      expect(screen.queryByText(/at least 2 characters/i)).not.toBeInTheDocument();
    });
  });

  describe('form submission', () => {
    it('shows a success message after successful API call', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
      render(<ContactForm />);
      fillForm();
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!);
      await waitFor(() => expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument());
    });

    it('shows an error message when the API call fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      render(<ContactForm />);
      fillForm();
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!);
      await waitFor(() => expect(screen.getByText(/an error occurred/i)).toBeInTheDocument());
    });

    it('shows a reCAPTCHA error when recaptcha returns null', async () => {
      mockExecuteRecaptcha.mockResolvedValueOnce(null);
      render(<ContactForm />);
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!);
      await waitFor(() => expect(screen.getByText(/recaptcha/i)).toBeInTheDocument());
    });

    it('resets the form fields after successful submission', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
      render(<ContactForm />);
      fillForm();
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!);
      await waitFor(() => {
        expect((screen.getByLabelText(/name/i) as HTMLInputElement).value).toBe('');
      });
    });

    it('calls resetRecaptcha after successful submission', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
      render(<ContactForm />);
      fillForm();
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!);
      await waitFor(() => expect(mockResetRecaptcha).toHaveBeenCalled());
    });
  });
});
