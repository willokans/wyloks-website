import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPage from '@/app/error';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

const mockReset = jest.fn();
const testError = new Error('Test error');

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore?.();
});

describe('Error page', () => {
  it('renders an error heading', () => {
    render(<ErrorPage error={testError} reset={mockReset} />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders a Try again button', () => {
    render(<ErrorPage error={testError} reset={mockReset} />);
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('calls reset() when Try again is clicked', () => {
    render(<ErrorPage error={testError} reset={mockReset} />);
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('renders a Go home link', () => {
    render(<ErrorPage error={testError} reset={mockReset} />);
    expect(screen.getByRole('link', { name: /go home/i })).toHaveAttribute('href', '/');
  });

  it('shows the error digest when provided', () => {
    const errorWithDigest = Object.assign(new Error('Test'), { digest: 'abc-123' });
    render(<ErrorPage error={errorWithDigest} reset={mockReset} />);
    expect(screen.getByText(/abc-123/)).toBeInTheDocument();
  });
});
