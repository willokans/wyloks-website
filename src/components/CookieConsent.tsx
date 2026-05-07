'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCookieConsent, type CookiePreferences } from '@/hooks/useCookieConsent';

export default function CookieConsent() {
  const { preferences, updatePreferences, loaded, consentGiven } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);

  if (!loaded || consentGiven) return null;

  const handleAcceptAll = () => {
    updatePreferences({ analytics: true, marketing: true });
    setShowPreferences(false);
  };

  const handleReject = () => {
    updatePreferences({ analytics: false, marketing: false });
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    updatePreferences(preferences);
    setShowPreferences(false);
  };

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return;
    updatePreferences({ [key]: !preferences[key] });
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{ backgroundColor: 'var(--ink)', borderColor: 'rgba(245,241,234,0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-14 lg:px-24 py-5">
        {!showPreferences ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <p className="font-body text-sm leading-relaxed flex-grow" style={{ color: 'rgba(245,241,234,0.6)' }}>
              We use cookies to enhance your experience. Some are essential for the site to work;
              others help us understand how it&apos;s used.{' '}
              <Link
                href="/cookie-policy"
                className="transition-colors duration-200"
                style={{ color: 'var(--terra)', textDecoration: 'none' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--cream)'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--terra)'; }}
              >
                Cookie policy
              </Link>
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setShowPreferences(true)}
                className="font-mono text-xs tracking-widest uppercase px-4 py-2.5 transition-colors duration-200"
                style={{ color: 'rgba(245,241,234,0.5)', border: '1px solid rgba(245,241,234,0.15)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--cream)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,241,234,0.4)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,241,234,0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,241,234,0.15)'; }}
              >
                Manage
              </button>
              <button
                onClick={handleReject}
                className="font-mono text-xs tracking-widest uppercase px-4 py-2.5 transition-colors duration-200"
                style={{ color: 'rgba(245,241,234,0.5)', border: '1px solid rgba(245,241,234,0.15)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--cream)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,241,234,0.4)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,241,234,0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,241,234,0.15)'; }}
              >
                Reject all
              </button>
              <button
                onClick={handleAcceptAll}
                className="font-mono text-xs tracking-widest uppercase px-4 py-2.5 transition-colors duration-200"
                style={{ backgroundColor: 'var(--terra)', color: 'var(--cream)', border: '1px solid var(--terra)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--terra-dark)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--terra-dark)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--terra)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--terra)'; }}
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-2">
            <div className="flex items-center justify-between">
              <p className="label-tag" style={{ color: 'rgba(245,241,234,0.35)' }}>Cookie Preferences</p>
              <button
                onClick={() => setShowPreferences(false)}
                className="font-mono text-xs transition-colors duration-200"
                style={{ color: 'rgba(245,241,234,0.4)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--cream)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,241,234,0.4)'; }}
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ backgroundColor: 'rgba(245,241,234,0.08)' }}>
              {[
                { key: 'essential' as keyof CookiePreferences, label: 'Essential', desc: 'Required for the site to function', locked: true },
                { key: 'analytics' as keyof CookiePreferences, label: 'Analytics', desc: 'Help us understand how the site is used', locked: false },
                { key: 'marketing' as keyof CookiePreferences, label: 'Marketing', desc: 'Used for targeted advertising', locked: false },
              ].map(({ key, label, desc, locked }) => (
                <div key={key} className="p-5 flex items-start justify-between gap-4" style={{ backgroundColor: 'var(--ink)' }}>
                  <div>
                    <p className="font-body text-sm font-semibold mb-1" style={{ color: 'var(--cream)' }}>{label}</p>
                    <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(245,241,234,0.45)' }}>{desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences[key]}
                    disabled={locked}
                    onChange={() => handleTogglePreference(key)}
                    className={locked ? 'opacity-40 cursor-not-allowed mt-0.5 flex-shrink-0' : 'cursor-pointer mt-0.5 flex-shrink-0 accent-terra'}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleReject}
                className="font-mono text-xs tracking-widest uppercase px-4 py-2.5 transition-colors duration-200"
                style={{ color: 'rgba(245,241,234,0.5)', border: '1px solid rgba(245,241,234,0.15)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--cream)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,241,234,0.4)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,241,234,0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,241,234,0.15)'; }}
              >
                Reject all
              </button>
              <button
                onClick={handleSavePreferences}
                className="font-mono text-xs tracking-widest uppercase px-4 py-2.5 transition-colors duration-200"
                style={{ backgroundColor: 'var(--terra)', color: 'var(--cream)', border: '1px solid var(--terra)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--terra-dark)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--terra)'; }}
              >
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
