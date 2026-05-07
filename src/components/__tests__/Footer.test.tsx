import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('Footer', () => {
  it('renders the Wyloks brand name', () => {
    render(<Footer />);
    expect(screen.getAllByText(/Wyloks/).length).toBeGreaterThan(0);
  });

  it('renders a mailto link for the company email', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /info@wyloksltd\.com/i });
    expect(link).toHaveAttribute('href', 'mailto:info@wyloksltd.com');
  });

  it('renders navigation links with correct hrefs', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('renders legal links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute('href', '/terms-of-service');
    expect(screen.getByRole('link', { name: 'Cookie Policy' })).toHaveAttribute('href', '/cookie-policy');
  });

  it('renders the current year in the copyright line', () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(new Date().getFullYear().toString()))).toBeInTheDocument();
  });

  it('renders with the contentinfo landmark role', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders service categories', () => {
    render(<Footer />);
    expect(screen.getByText('IT Consultation')).toBeInTheDocument();
    expect(screen.getByText('Digital Marketing')).toBeInTheDocument();
  });
});
