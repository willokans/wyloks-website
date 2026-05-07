import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('@/components/Navigation', () => {
  const MockNavigation = () => <nav data-testid="navigation" />;
  MockNavigation.displayName = 'MockNavigation';
  return MockNavigation;
});

describe('Header', () => {
  it('renders the Wyloks logo', () => {
    render(<Header />);
    expect(screen.getByText(/wyloks/i)).toBeInTheDocument();
  });

  it('logo links to the home page', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /wyloks/i })).toHaveAttribute('href', '/');
  });

  it('renders the Navigation component', () => {
    render(<Header />);
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('is a fixed-position header', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('header')).toHaveClass('fixed');
  });

  it('has full width', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('header')).toHaveClass('w-full');
  });
});
