import React from 'react';
import { render, screen } from '@testing-library/react';
import ServicesHero from '@/components/services/ServicesHero';

describe('ServicesHero', () => {
  it('renders the "What We Offer" label', () => {
    render(<ServicesHero />);
    expect(screen.getByText('What We Offer')).toBeInTheDocument();
  });

  it('renders "Services built" heading text', () => {
    render(<ServicesHero />);
    expect(screen.getByText(/Services built/i)).toBeInTheDocument();
  });

  it('renders "results." in the heading', () => {
    render(<ServicesHero />);
    expect(screen.getByText('results.')).toBeInTheDocument();
  });

  it('renders the description paragraph', () => {
    render(<ServicesHero />);
    expect(screen.getByText(/Comprehensive digital solutions/i)).toBeInTheDocument();
  });

  it('wraps content in a section element', () => {
    const { container } = render(<ServicesHero />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('renders an h1', () => {
    render(<ServicesHero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
