import React from 'react';
import { render, screen } from '@testing-library/react';
import ServiceCard from '@/components/services/ServiceCard';

jest.mock('next/dynamic', () => (_fn: unknown, _opts: unknown) => {
  const MockIcon = () => <svg data-testid="service-icon" />;
  MockIcon.displayName = 'MockIcon';
  return MockIcon;
});

const base = {
  title: 'IT Consultation',
  description: 'Expert technology guidance.',
  iconType: 'ITConsulting' as const,
};

describe('ServiceCard', () => {
  it('renders the service title', () => {
    render(<ServiceCard {...base} />);
    expect(screen.getByText('IT Consultation')).toBeInTheDocument();
  });

  it('renders the service description', () => {
    render(<ServiceCard {...base} />);
    expect(screen.getByText('Expert technology guidance.')).toBeInTheDocument();
  });

  it('renders 01 for ITConsulting', () => {
    render(<ServiceCard {...base} />);
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders 02 for SoftwareDevelopment', () => {
    render(<ServiceCard {...base} iconType="SoftwareDevelopment" title="Software Development" />);
    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('renders 03 for DigitalMarketing', () => {
    render(<ServiceCard {...base} iconType="DigitalMarketing" title="Digital Marketing" />);
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<ServiceCard {...base} />);
    expect(screen.getByTestId('service-icon')).toBeInTheDocument();
  });

  it('applies the card-editorial CSS class', () => {
    const { container } = render(<ServiceCard {...base} />);
    expect(container.firstChild).toHaveClass('card-editorial');
  });
});
