'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
