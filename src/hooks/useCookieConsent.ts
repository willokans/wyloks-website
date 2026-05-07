'use client';

import { useState, useEffect } from 'react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  essential: true, // Always true as these are necessary
  analytics: false,
  marketing: false,
};

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [loaded, setLoaded] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const storedPreferences = localStorage.getItem('cookie-preferences');
    if (storedPreferences) {
      try {
        const parsed = JSON.parse(storedPreferences);
        setPreferences({
          ...defaultPreferences,
          ...parsed,
          essential: true,
        });
        setConsentGiven(true);
      } catch (e) {
        console.error('Error parsing cookie preferences:', e);
        setPreferences(defaultPreferences);
      }
    }
    setLoaded(true);
  }, []);

  const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
    const updated = {
      ...preferences,
      ...newPreferences,
      essential: true, // Essential cookies can't be disabled
    };
    setPreferences(updated);
    setConsentGiven(true);
    localStorage.setItem('cookie-preferences', JSON.stringify(updated));

    // If analytics is rejected, remove analytics cookies
    if (!updated.analytics) {
      removeAnalyticsCookies();
    }

    // If marketing is rejected, remove marketing cookies
    if (!updated.marketing) {
      removeMarketingCookies();
    }
  };

  const removeAnalyticsCookies = () => {
    // Add specific analytics cookie names here
    const analyticsCookies = ['_ga', '_gid', '_gat'];
    analyticsCookies.forEach(cookieName => {
      document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    });
  };

  const removeMarketingCookies = () => {
    // Add specific marketing cookie names here
    const marketingCookies = ['_fbp', '_gcl_au'];
    marketingCookies.forEach(cookieName => {
      document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    });
  };

  return {
    preferences,
    loaded,
    consentGiven,
    updatePreferences,
    hasConsented: loaded && preferences.essential,
    canUseAnalytics: loaded && preferences.analytics,
    canUseMarketing: loaded && preferences.marketing,
  };
}
