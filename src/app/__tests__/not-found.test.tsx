import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('NotFound page', () => {
  it('renders a 404 indicator', () => {
    render(<NotFound />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('renders an informative message', () => {
    render(<NotFound />);
    expect(screen.getAllByText(/page.*not.*found|does not exist/i).length).toBeGreaterThan(0);
  });

  it('renders a link back to home', () => {
    render(<NotFound />);
    expect(screen.getByRole('link', { name: /return to home/i })).toHaveAttribute('href', '/');
  });
});
