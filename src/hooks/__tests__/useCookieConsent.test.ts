import { renderHook, act, waitFor } from '@testing-library/react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

describe('useCookieConsent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default preferences when nothing is stored', async () => {
    const { result } = renderHook(() => useCookieConsent());
    await waitFor(() => expect(result.current.loaded).toBe(true));
    expect(result.current.preferences).toEqual({ essential: true, analytics: false, marketing: false });
  });

  it('loaded starts false and becomes true', async () => {
    const { result } = renderHook(() => useCookieConsent());
    await waitFor(() => expect(result.current.loaded).toBe(true));
  });

  it('consentGiven is false when no preferences are stored', async () => {
    const { result } = renderHook(() => useCookieConsent());
    await waitFor(() => expect(result.current.loaded).toBe(true));
    expect(result.current.consentGiven).toBe(false);
  });

  it('consentGiven is true when preferences exist in localStorage', async () => {
    localStorage.setItem('cookie-preferences', JSON.stringify({ essential: true, analytics: true, marketing: false }));
    const { result } = renderHook(() => useCookieConsent());
    await waitFor(() => expect(result.current.loaded).toBe(true));
    expect(result.current.consentGiven).toBe(true);
  });

  it('loads stored analytics preference', async () => {
    localStorage.setItem('cookie-preferences', JSON.stringify({ analytics: true, marketing: true }));
    const { result } = renderHook(() => useCookieConsent());
    await waitFor(() => expect(result.current.loaded).toBe(true));
    expect(result.current.preferences.analytics).toBe(true);
    expect(result.current.preferences.marketing).toBe(true);
  });

  it('essential is always true regardless of stored value', async () => {
    localStorage.setItem('cookie-preferences', JSON.stringify({ essential: false }));
    const { result } = renderHook(() => useCookieConsent());
    await waitFor(() => expect(result.current.loaded).toBe(true));
    expect(result.current.preferences.essential).toBe(true);
  });

  it('updatePreferences saves to localStorage', async () => {
    const { result } = renderHook(() => useCookieConsent());
    await waitFor(() => expect(result.current.loaded).toBe(true));
    act(() => { result.current.updatePreferences({ analytics: true, marketing: true }); });
    const stored = JSON.parse(localStorage.getItem('cookie-preferences') || '{}');
    expect(stored.analytics).toBe(true);
    expect(stored.marketing).toBe(true);
  });

  it('updatePreferences sets consentGiven to true', async () => {
    const { result } = renderHook(() => useCookieConsent());
    await waitFor(() => expect(result.current.loaded).toBe(true));
    expect(result.current.consentGiven).toBe(false);
    act(() => { result.current.updatePreferences({ analytics: false, marketing: false }); });
    expect(result.current.consentGiven).toBe(true);
  });

  it('handles malformed localStorage data gracefully', async () => {
    localStorage.setItem('cookie-preferences', 'not-valid-json');
    const { result } = renderHook(() => useCookieConsent());
    await waitFor(() => expect(result.current.loaded).toBe(true));
    expect(result.current.preferences).toEqual({ essential: true, analytics: false, marketing: false });
    expect(result.current.consentGiven).toBe(false);
  });

  it('canUseAnalytics reflects analytics preference', async () => {
    localStorage.setItem('cookie-preferences', JSON.stringify({ analytics: true }));
    const { result } = renderHook(() => useCookieConsent());
    await waitFor(() => expect(result.current.loaded).toBe(true));
    expect(result.current.canUseAnalytics).toBe(true);
  });

  it('canUseMarketing reflects marketing preference', async () => {
    localStorage.setItem('cookie-preferences', JSON.stringify({ marketing: true }));
    const { result } = renderHook(() => useCookieConsent());
    await waitFor(() => expect(result.current.loaded).toBe(true));
    expect(result.current.canUseMarketing).toBe(true);
  });
});
