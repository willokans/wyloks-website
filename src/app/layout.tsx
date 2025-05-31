import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.wyloksltd.com'),
  title: {
    template: '%s | Wyloks Ltd',
    default: 'Wyloks Ltd - IT Consultation & Services',
  },
  description: 'Professional IT consultation and services for businesses.',
  keywords: ['IT Consultation', 'Software Development', 'Digital Marketing', 'Affiliate Marketing'],
  authors: [{ name: 'Wyloks Ltd' }],
  creator: 'Wyloks Ltd',
  publisher: 'Wyloks Ltd',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen bg-white font-sans">
        <ClientLayout>
          <main>{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}
