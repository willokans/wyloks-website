import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@/components/Navigation';

jest.mock('next/link', () => {
  const MockLink = ({ children, href, className, onClick }: {
    children: React.ReactNode; href: string; className?: string; onClick?: () => void;
  }) => <a href={href} className={className} onClick={onClick}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('next/navigation', () => ({ usePathname: () => '/' }));

describe('Navigation', () => {
  it('renders Home, About, and Services desktop links', () => {
    render(<Navigation />);
    expect(screen.getAllByRole('link', { name: 'Home' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'About' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Services' }).length).toBeGreaterThan(0);
  });

  it('renders a Contact button', () => {
    render(<Navigation />);
    const contactLinks = screen.getAllByRole('link', { name: 'Contact' });
    expect(contactLinks.length).toBeGreaterThan(0);
    expect(contactLinks[0]).toHaveAttribute('href', '/contact');
  });

  it('shows the mobile toggle button', () => {
    render(<Navigation />);
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
  });

  it('toggle starts closed (aria-expanded false)', () => {
    render(<Navigation />);
    expect(screen.getByLabelText('Toggle menu')).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens the mobile drawer when toggle is clicked', () => {
    render(<Navigation />);
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    expect(screen.getByLabelText('Toggle menu')).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies active class to the current route link', () => {
    render(<Navigation />);
    const homeLinks = screen.getAllByRole('link', { name: 'Home' });
    const activeLink = homeLinks.find(l => l.className.includes('active'));
    expect(activeLink).toBeDefined();
  });

  it('closes the drawer when a mobile nav link is clicked', () => {
    render(<Navigation />);
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    expect(screen.getByLabelText('Toggle menu')).toHaveAttribute('aria-expanded', 'true');
    // Click a link in the drawer
    const drawerLinks = screen.getAllByRole('link', { name: 'About' });
    fireEvent.click(drawerLinks[drawerLinks.length - 1]);
    expect(screen.getByLabelText('Toggle menu')).toHaveAttribute('aria-expanded', 'false');
  });
});
