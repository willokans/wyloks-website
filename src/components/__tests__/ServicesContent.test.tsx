import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ServicesContent from '@/components/ServicesContent';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('@/components/services/ServicesHero', () => {
  const MockHero = () => <div data-testid="services-hero" />;
  MockHero.displayName = 'MockHero';
  return MockHero;
});

jest.mock('@/components/services/ServiceCard', () => {
  const MockCard = ({ title, description }: { title: string; description: string }) => (
    <div data-testid="service-card">
      <span>{title}</span>
      <p>{description}</p>
    </div>
  );
  MockCard.displayName = 'MockCard';
  return MockCard;
});

jest.mock('@/components/services/ServicesList', () => ({
  getServices: jest.fn().mockResolvedValue([
    { title: 'IT Consultation',     description: 'Expert guidance',     iconType: 'ITConsulting' },
    { title: 'Software Development', description: 'Custom software',     iconType: 'SoftwareDevelopment' },
    { title: 'Digital Marketing',   description: 'Strategic marketing', iconType: 'DigitalMarketing' },
  ]),
}));

describe('ServicesContent', () => {
  it('renders the hero section', () => {
    render(<ServicesContent />);
    expect(screen.getByTestId('services-hero')).toBeInTheDocument();
  });

  it('shows a loading spinner initially', () => {
    const { container } = render(<ServicesContent />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('hides the spinner once services are loaded', async () => {
    const { container } = render(<ServicesContent />);
    await waitFor(() => expect(container.querySelector('.animate-spin')).not.toBeInTheDocument());
  });

  it('renders all three service cards after loading', async () => {
    render(<ServicesContent />);
    await waitFor(() => expect(screen.getAllByTestId('service-card')).toHaveLength(3));
  });

  it('renders each service title', async () => {
    render(<ServicesContent />);
    await waitFor(() => {
      expect(screen.getByText('IT Consultation')).toBeInTheDocument();
      expect(screen.getByText('Software Development')).toBeInTheDocument();
      expect(screen.getByText('Digital Marketing')).toBeInTheDocument();
    });
  });

  it('renders the CTA heading', async () => {
    render(<ServicesContent />);
    await waitFor(() => expect(screen.getByText('Ready to get started?')).toBeInTheDocument());
  });

  it('renders a contact CTA link', async () => {
    render(<ServicesContent />);
    await waitFor(() => {
      const link = screen.getByRole('link', { name: /start the conversation/i });
      expect(link).toHaveAttribute('href', '/contact');
    });
  });
});
