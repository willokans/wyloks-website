'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Load components with client-side interactivity dynamically
const Header = dynamic(() => import('./Header'));
const Footer = dynamic(() => import('./Footer'));

interface TemplateProps {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Template;