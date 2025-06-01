'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCookieConsent, type CookiePreferences } from '@/hooks/useCookieConsent';

export default function CookieConsent() {
  const { preferences, updatePreferences, loaded } = useCookieConsent();
  const [showBanner, setShowBanner] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);

  if (!loaded || !showBanner) return null;

  const handleAcceptAll = () => {
    updatePreferences({
      analytics: true,
      marketing: true
    });
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleReject = () => {
    updatePreferences({
      analytics: false,
      marketing: false
    });
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    updatePreferences(preferences);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Essential cookies cannot be toggled
    updatePreferences({
      [key]: !preferences[key]
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto">
        {!showPreferences ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-grow">
              <p className="text-sm">
                We use cookies to enhance your experience. Some cookies are essential for the site to work, while others help us improve your experience.{' '}
                <Link href="/cookie-policy" className="text-purple-400 hover:text-purple-300 underline">
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowPreferences(true)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Cookie Settings
              </button>
              <button
                onClick={handleReject}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Cookie Preferences</h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Essential Cookies</p>
                    <p className="text-sm text-gray-400">Required for the website to function properly</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences.essential}
                      disabled
                      className="opacity-50 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics Cookies</p>
                    <p className="text-sm text-gray-400">Help us improve our website</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => handleTogglePreference('analytics')}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Cookies</p>
                    <p className="text-sm text-gray-400">Used for targeted advertising</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => handleTogglePreference('marketing')}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleReject}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleSavePreferences}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
