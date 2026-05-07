import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CookieConsent from '@/components/CookieConsent';

const mockUpdatePreferences = jest.fn();

const defaultHookState = {
  preferences: { essential: true, analytics: false, marketing: false },
  loaded: true,
  consentGiven: false,
  updatePreferences: mockUpdatePreferences,
  hasConsented: true,
  canUseAnalytics: false,
  canUseMarketing: false,
};

let mockState = { ...defaultHookState };

jest.mock('@/hooks/useCookieConsent', () => ({
  useCookieConsent: () => mockState,
}));

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('CookieConsent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockState = { ...defaultHookState, updatePreferences: mockUpdatePreferences };
  });

  it('shows the banner when loaded and consent not yet given', () => {
    render(<CookieConsent />);
    expect(screen.getByText(/We use cookies/i)).toBeInTheDocument();
  });

  it('hides the banner when consent has already been given', () => {
    mockState = { ...mockState, consentGiven: true };
    render(<CookieConsent />);
    expect(screen.queryByText(/We use cookies/i)).not.toBeInTheDocument();
  });

  it('hides the banner until loaded', () => {
    mockState = { ...mockState, loaded: false };
    render(<CookieConsent />);
    expect(screen.queryByText(/We use cookies/i)).not.toBeInTheDocument();
  });

  it('calls updatePreferences with analytics and marketing true on Accept all', () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText('Accept all'));
    expect(mockUpdatePreferences).toHaveBeenCalledWith({ analytics: true, marketing: true });
  });

  it('calls updatePreferences with analytics and marketing false on Reject all', () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText('Reject all'));
    expect(mockUpdatePreferences).toHaveBeenCalledWith({ analytics: false, marketing: false });
  });

  it('opens the preferences panel when Manage is clicked', () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText('Manage'));
    expect(screen.getByText('Cookie Preferences')).toBeInTheDocument();
  });

  it('shows Essential, Analytics, and Marketing categories in the panel', () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText('Manage'));
    expect(screen.getByText('Essential')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
  });

  it('calls updatePreferences when Save preferences is clicked', () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText('Manage'));
    fireEvent.click(screen.getByText('Save preferences'));
    expect(mockUpdatePreferences).toHaveBeenCalledWith(mockState.preferences);
  });

  it('closes the preferences panel with the ✕ button', () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText('Manage'));
    expect(screen.getByText('Cookie Preferences')).toBeInTheDocument();
    fireEvent.click(screen.getByText('✕'));
    expect(screen.queryByText('Cookie Preferences')).not.toBeInTheDocument();
  });

  it('renders a Cookie policy link', () => {
    render(<CookieConsent />);
    expect(screen.getByRole('link', { name: /cookie policy/i })).toHaveAttribute('href', '/cookie-policy');
  });

  it('renders at the bottom of the screen', () => {
    const { container } = render(<CookieConsent />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('fixed');
    expect(wrapper.className).toContain('bottom-0');
  });
});
