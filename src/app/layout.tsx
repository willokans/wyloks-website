import React from 'react';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import ClientLayout from '@/components/ClientLayout';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.wyloksltd.com'),
  title: {
    template: '%s | Wyloks',
    default: 'Wyloks — IT Consultation & Digital Growth',
  },
  description: 'A UK-based consultancy helping businesses build better digital products through IT consultation and digital growth.',
  keywords: ['IT Consultation', 'Software Development', 'Digital Marketing', 'Affiliate Marketing'],
  authors: [{ name: 'Wyloks Ltd' }],
  creator: 'Wyloks Ltd',
  publisher: 'Wyloks Ltd',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} ${jetbrains.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen bg-cream text-ink font-body">
        <ClientLayout>
          <main>{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}
