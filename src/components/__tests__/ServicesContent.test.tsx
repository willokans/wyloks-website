import React from 'react';
import { render, screen } from '@testing-library/react';
import ServicesContent from '@/components/ServicesContent';
import { SERVICE_ITEMS } from '@/lib/constants';

jest.mock('next/link', () => {
  const MockLink: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('ServicesContent', () => {
  it('renders the hero section with correct text', () => {
    render(<ServicesContent />);
    
    expect(screen.getByText('Our')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(
      screen.getByText(/Comprehensive digital solutions/i)
    ).toBeInTheDocument();
  });

  it('renders all service cards from SERVICE_ITEMS', () => {
    render(<ServicesContent />);
    
    SERVICE_ITEMS.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
    });
  });

  it('renders the CTA section with link to contact', () => {
    render(<ServicesContent />);
    
    expect(
      screen.getByText('Ready to Transform Your Business?')
    ).toBeInTheDocument();
    
    const ctaLink = screen.getByText('Get Started Today');
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink.closest('a')).toHaveAttribute('href', '/contact');
  });
});
